/**
 * BioLab Insight · 后端服务
 * 仅使用 Node.js 内置模块，无第三方运行时依赖。
 * 监听 PORT 环境变量（默认 3000），绑定 0.0.0.0，便于云端部署。
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const KB = require('./lib/knowledge-base');
const PROTOCOL_KB = require('./lib/protocol-knowledge');
const QA = require('./lib/qa-engine');
const analyzer = require('./lib/analyzer');
const store = require('./lib/store');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

function send(res, status, data, type) {
  res.writeHead(status, {
    'Content-Type': type || 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(typeof data === 'string' || Buffer.isBuffer(data) ? data : JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => {
      body += c;
      if (body.length > 2 * 1024 * 1024) { reject(new Error('请求体过大')); req.destroy(); }
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (e) { reject(new Error('JSON 解析失败')); }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res, pathname) {
  let rel = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
  const full = path.join(PUBLIC_DIR, rel);
  if (!full.startsWith(PUBLIC_DIR)) return send(res, 403, { error: 'Forbidden' });
  fs.readFile(full, (err, data) => {
    if (err) {
      // 浏览器默认会请求 /favicon.ico，直接回落到 png 图标，避免 404
      if (pathname === '/favicon.ico') return serveFile(res, path.join(PUBLIC_DIR, 'favicon.png'));
      // 无扩展名的路径（路由式地址、反向代理拼接出的路径）回落到首页，
      // 否则分享域名/预览面板访问时会直接看到 Not found
      if (!path.extname(pathname)) return serveFile(res, path.join(PUBLIC_DIR, 'index.html'));
      return send(res, 404, { error: 'Not found' });
    }
    send(res, 200, data, MIME[path.extname(full).toLowerCase()] || 'application/octet-stream');
  });
}

function serveFile(res, full) {
  fs.readFile(full, (err, data) => {
    if (err) return send(res, 404, { error: 'Not found' });
    send(res, 200, data, MIME[path.extname(full).toLowerCase()] || 'application/octet-stream');
  });
}

/** 校验实验指标：数值型不得为负、不得为 NaN/Infinity；返回错误文案或 null */
function validateMetrics(type, metrics) {
  const def = KB.getExperimentType(type);
  if (!def) return '无效的实验类型';
  if (!metrics || typeof metrics !== 'object') return null;
  for (const m of def.metrics) {
    if (m.type === 'enum') continue;
    if (!(m.key in metrics)) continue;
    const raw = metrics[m.key];
    const arr = Array.isArray(raw) ? raw : [raw];
    if (!arr.length) continue;
    for (const v of arr) {
      const n = Number(v);
      if (!Number.isFinite(n)) return `${m.label} 不是有效数值`;
      if (n < 0) return `${m.label} 不能为负数（当前 ${n}）`;
    }
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;

  if (req.method === 'OPTIONS') return send(res, 204, '');

  try {
    // ---------- API ----------
    if (p === '/api/health' && req.method === 'GET') {
      return send(res, 200, { ok: true, service: 'BioLab Insight', time: new Date().toISOString() });
    }

    if (p === '/api/types' && req.method === 'GET') {
      return send(res, 200, { types: KB.listExperimentTypes() });
    }

    if (p === '/api/protocols' && req.method === 'GET') {
      return send(res, 200, { protocols: PROTOCOL_KB.listProtocols() });
    }

    if (p.startsWith('/api/protocols/') && req.method === 'GET') {
      const id = decodeURIComponent(p.split('/').pop());
      const protocol = PROTOCOL_KB.getProtocol(id);
      if (!protocol) return send(res, 404, { error: '知识库条目不存在' });
      return send(res, 200, { protocol });
    }

    if (p === '/api/qa/suggestions' && req.method === 'GET') {
      return send(res, 200, QA.suggestions());
    }

    if (p === '/api/qa' && req.method === 'POST') {
      const body = await readBody(req);
      const question = String(body.question || '').trim();
      if (!question) return send(res, 400, { error: '问题不能为空' });
      if (question.length > 200) return send(res, 400, { error: '问题过长（上限 200 字）' });
      return send(res, 200, QA.ask(question, { context: body.context || {} }));
    }

    if (p === '/api/experiments' && req.method === 'GET') {
      const type = url.searchParams.get('type') || '';
      return send(res, 200, { records: store.list(type), stats: store.stats() });
    }

    if (p === '/api/experiments' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.type || !KB.getExperimentType(body.type)) {
        return send(res, 400, { error: '无效的实验类型' });
      }
      if (!String(body.title || '').trim()) {
        return send(res, 400, { error: '请填写实验标题' });
      }
      const metricErr = validateMetrics(body.type, body.metrics);
      if (metricErr) return send(res, 400, { error: metricErr });
      const analysis = analyzer.analyze(body, store.history(body.type, null));
      const rec = store.create({ ...body, analysis });
      return send(res, 201, { record: rec, analysis });
    }

    if (p.startsWith('/api/experiments/') && req.method === 'GET') {
      const id = p.split('/').pop();
      const rec = store.get(id);
      if (!rec) return send(res, 404, { error: '记录不存在' });
      return send(res, 200, { record: rec });
    }

    if (p.startsWith('/api/experiments/') && req.method === 'DELETE') {
      const id = p.split('/').pop();
      const ok = store.remove(id);
      return send(res, ok ? 200 : 404, { ok });
    }

    if (p === '/api/analyze' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.type || !KB.getExperimentType(body.type)) {
        return send(res, 400, { error: '无效的实验类型' });
      }
      const metricErr = validateMetrics(body.type, body.metrics);
      if (metricErr) return send(res, 400, { error: metricErr });
      const history = store.history(body.type, body.excludeId || null);
      const analysis = analyzer.analyze(body, history);
      return send(res, 200, { analysis });
    }

    if (p === '/api/stats' && req.method === 'GET') {
      return send(res, 200, store.stats());
    }

    if (p === '/api/seed' && req.method === 'POST') {
      const count = store.stats().total;
      if (count > 0) return send(res, 200, { ok: true, message: '已有数据，跳过初始化', total: count });
      const samples = require('./lib/seed-data');
      for (const s of samples) {
        const analysis = analyzer.analyze(s, store.history(s.type, null));
        store.create({ ...s, analysis });
      }
      return send(res, 201, { ok: true, total: store.stats().total });
    }

    if (p.startsWith('/api/')) return send(res, 404, { error: '接口不存在' });

    // ---------- 静态资源 ----------
    return serveStatic(req, res, p);
  } catch (e) {
    return send(res, 500, { error: e.message || '服务器内部错误' });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`BioLab Insight running at http://0.0.0.0:${PORT}`);
});

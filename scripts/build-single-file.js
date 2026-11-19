'use strict';

/* 把 BioLab Insight 打包成一个可离线打开的单文件 HTML。
   做法：内联 CSS / JS / 图片 / 知识库数据，并把后端 API 换成内存实现。 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUB = path.join(ROOT, 'public');
const OUT = path.resolve(ROOT, '..', 'BioLab Insight-Demo-单文件版.html');

const read = p => fs.readFileSync(p, 'utf8');
const b64 = p => 'data:' + mime(p) + ';base64,' + fs.readFileSync(p).toString('base64');
function mime(p) {
  const e = path.extname(p).toLowerCase();
  return e === '.png' ? 'image/png' : e === '.jpg' || e === '.jpeg' ? 'image/jpeg' : e === '.svg' ? 'image/svg+xml' : 'application/octet-stream';
}

/* ---------- 1. 数据 ---------- */
const KB = require(path.join(ROOT, 'lib/knowledge-base'));
const { PROTOCOLS } = require(path.join(ROOT, 'lib/protocol-knowledge'));
const { REAGENTS } = require(path.join(ROOT, 'lib/reagent-glossary'));
const seedDb = JSON.parse(read(path.join(ROOT, 'data/experiments.json')));

const DATA = {
  KB: {
    EXPERIMENT_TYPES: KB.EXPERIMENT_TYPES,
    GENERAL_RULES: KB.GENERAL_RULES,
    SEVERITY_WEIGHT: KB.SEVERITY_WEIGHT
  },
  PROTOCOLS,
  REAGENTS,
  RECORDS: seedDb.records
};

/* ---------- 2. 规则引擎（把 CommonJS 转成浏览器内联脚本） ---------- */
function browserizeAnalyzer(src) {
  src = src.replace("const KB = require('./knowledge-base');",
    "const KB = { EXPERIMENT_TYPES: SINGLE_DATA.KB.EXPERIMENT_TYPES, GENERAL_RULES: SINGLE_DATA.KB.GENERAL_RULES, SEVERITY_WEIGHT: SINGLE_DATA.KB.SEVERITY_WEIGHT };");
  src = src.replace(/module\.exports\s*=\s*[^;]+;/,
    'return { analyze, evaluateMetric, cv, mean, stdev, round };');
  return 'const ANALYZER = (function () {\n' + src + '\n})();';
}

function browserizeQa(src) {
  src = src.replace("const PROTOCOL_KB = require('./protocol-knowledge');", `
const PROTOCOL_KB = {
  PROTOCOLS: SINGLE_DATA.PROTOCOLS,
  listProtocols() {
    return SINGLE_DATA.PROTOCOLS.map(p => ({ id: p.id, name: p.name, category: p.category, short: p.short,
      stepCount: p.steps.length, pitfallCount: p.steps.reduce((n, s) => n + s.pitfalls.length, 0) }));
  },
  getProtocol(id) {
    const p = SINGLE_DATA.PROTOCOLS.find(x => x.id === id);
    return p ? { ...p, reagents: SINGLE_DATA.REAGENTS } : null;
  }
};`);
  src = src.replace("const { REAGENTS } = require('./reagent-glossary');", 'const REAGENTS = SINGLE_DATA.REAGENTS;');
  src = src.replace("const KB = require('./knowledge-base');", 'const KB = SINGLE_DATA.KB;');
  src = src.replace(/module\.exports\s*=\s*[^;]+;/, 'return { ask, suggestions };');
  return 'const QA_ENGINE = (function () {\n' + src + '\n})();';
}

const engineScript = `
/* ===== 内嵌数据（由 scripts/build-single-file.js 生成） ===== */
const SINGLE_DATA = ${JSON.stringify(DATA)};

/* ===== 内嵌分析引擎 ===== */
${browserizeAnalyzer(read(path.join(ROOT, 'lib/analyzer.js')))}
const analyzeRecord = ANALYZER.analyze;

/* ===== 内嵌问答引擎 ===== */
${browserizeQa(read(path.join(ROOT, 'lib/qa-engine.js')))}
`;

/* ---------- 3. 用内存 API 替换 fetch ---------- */
const appSrc = read(path.join(PUB, 'app.js'));
const apiStart = appSrc.indexOf('async function api(');
const apiEnd = appSrc.indexOf('\nfunction toast(');
if (apiStart < 0 || apiEnd < 0) throw new Error('无法定位 app.js 的 api() 函数');

const localApi = `async function api(path, opts = {}) {
  const method = (opts.method || 'GET').toUpperCase();
  const body = opts.body || {};
  const [pathname, queryString] = path.split('?');
  const params = new URLSearchParams(queryString || '');
  const db = SINGLE_STORE;
  const fail = (status, error) => { const e = new Error(error); e.status = status; throw e; };
  const clone = o => JSON.parse(JSON.stringify(o));

  function summary(r) {
    if (!r) return null;
    return { ...r, analysis: r.analysis ? {
      healthScore: r.analysis.healthScore,
      riskLevel: r.analysis.riskLevel,
      typeName: r.analysis.typeName,
      findings: (r.analysis.findings || []).map(f => ({ title: f.title, likelihood: f.likelihood, severity: f.severity }))
    } : null };
  }
  function stats() {
    const byType = {}; let critical = 0, high = 0;
    for (const r of db.records) {
      byType[r.type] = (byType[r.type] || 0) + 1;
      const k = r.analysis && r.analysis.riskLevel && r.analysis.riskLevel.key;
      if (k === 'critical') critical++;
      if (k === 'high') high++;
    }
    const scores = db.records.map(r => r.analysis && r.analysis.healthScore).filter(s => typeof s === 'number');
    return { total: db.records.length, byType, criticalCount: critical, highCount: high,
      avgHealth: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null };
  }
  function history(type, excludeId, limit = 10) {
    return db.records.filter(r => r.type === type && r.id !== excludeId)
      .sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || ''))).slice(-limit);
  }
  function newId() { return 'exp_' + Date.now().toString(36) + '_' + Math.random().toString(16).slice(2, 10); }

  // 模拟网络延迟，保持与线上版本一致的加载体验
  await new Promise(r => setTimeout(r, 30));

  if (pathname === '/api/types' && method === 'GET') {
    return { types: SINGLE_DATA.KB_TYPES_LIST };
  }
  if (pathname === '/api/protocols' && method === 'GET') {
    return { protocols: SINGLE_DATA.PROTOCOL_LIST };
  }
  if (pathname.startsWith('/api/protocols/') && method === 'GET') {
    const id = decodeURIComponent(pathname.split('/').pop());
    const p = SINGLE_DATA.PROTOCOLS.find(x => x.id === id);
    if (!p) fail(404, '知识库条目不存在');
    return { protocol: { ...clone(p), reagents: SINGLE_DATA.REAGENTS } };
  }
  if (pathname === '/api/qa/suggestions' && method === 'GET') {
    return QA_ENGINE.suggestions();
  }
  if (pathname === '/api/qa' && method === 'POST') {
    const q = String(body.question || '').trim();
    if (!q) fail(400, '问题不能为空');
    if (q.length > 200) fail(400, '问题过长（上限 200 字）');
    return QA_ENGINE.ask(q, { context: body.context || {} });
  }
  if (pathname === '/api/experiments' && method === 'GET') {
    const type = params.get('type') || '';
    const list = db.records.slice().filter(r => !type || r.type === type)
      .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || ''))).map(summary);
    return { records: list, stats: stats() };
  }
  if (pathname === '/api/experiments' && method === 'POST') {
    if (!body.type || !SINGLE_DATA.KB.EXPERIMENT_TYPES[body.type]) fail(400, '无效的实验类型');
    const analysis = analyzeRecord(body, history(body.type, null));
    const rec = { id: newId(), type: body.type, title: body.title || '未命名实验', batch: body.batch || '',
      date: body.date || new Date().toISOString().slice(0, 10), operator: body.operator || '',
      objective: body.objective || '', metrics: body.metrics || {}, observations: body.observations || '',
      createdAt: new Date().toISOString(), analysis };
    db.records.unshift(rec);
    return { record: summary(rec), analysis };
  }
  if (pathname.startsWith('/api/experiments/') && method === 'GET') {
    const id = pathname.split('/').pop();
    const rec = db.records.find(r => r.id === id);
    if (!rec) fail(404, '记录不存在');
    return { record: clone(rec) };
  }
  if (pathname.startsWith('/api/experiments/') && method === 'DELETE') {
    const id = pathname.split('/').pop();
    const i = db.records.findIndex(r => r.id === id);
    if (i < 0) fail(404, '记录不存在');
    db.records.splice(i, 1);
    return { ok: true };
  }
  if (pathname === '/api/analyze' && method === 'POST') {
    if (!body.type || !SINGLE_DATA.KB.EXPERIMENT_TYPES[body.type]) fail(400, '无效的实验类型');
    return { analysis: analyzeRecord(body, history(body.type, body.excludeId || null)) };
  }
  if (pathname === '/api/stats' && method === 'GET') return stats();
  if (pathname === '/api/seed' && method === 'POST') {
    return { ok: true, message: '单文件版已内置演示数据', total: db.records.length };
  }
  fail(404, '单文件版不支持该接口：' + pathname);
}`;

const storeScript = `
/* 单文件版：内存数据存储（不写浏览器存储，刷新即恢复内置演示数据） */
const SINGLE_STORE = { records: JSON.parse(JSON.stringify(SINGLE_DATA.RECORDS)) };
SINGLE_DATA.KB_TYPES_LIST = (function () {
  const kb = SINGLE_DATA.KB.EXPERIMENT_TYPES;
  return Object.keys(kb).map(id => ({ id, ...kb[id] }));
})();
SINGLE_DATA.PROTOCOL_LIST = SINGLE_DATA.PROTOCOLS.map(p => ({
  id: p.id, name: p.name, category: p.category, short: p.short,
  stepCount: p.steps.length, pitfallCount: p.steps.reduce((n, s) => n + s.pitfalls.length, 0)
}));
`;

const appFinal = storeScript + '\n' + appSrc.slice(0, apiStart) + localApi + appSrc.slice(apiEnd);

/* ---------- 4. 内联资源 ---------- */
let html = read(path.join(PUB, 'index.html'));
const css = read(path.join(PUB, 'styles.css'));
html = html.replace('<link rel="stylesheet" href="styles.css">', () => '<style>\n' + css + '\n</style>');
const faviconUri = b64(path.join(PUB, 'favicon.png'));
html = html.replace('<link rel="icon" type="image/png" href="favicon.png">',
  () => '<link rel="icon" type="image/png" href="' + faviconUri + '">');
const logoUri = b64(path.join(PUB, 'brand-logo.png'));
html = html.replace('src="brand-logo.png"', () => 'src="' + logoUri + '"');

let ops = read(path.join(PUB, 'operations.js'));
ops = ops.replace(/images\/op-[a-z-]+\.jpg/g, m => b64(path.join(PUB, m)));

html = html.replace('<script src="operations.js"></script>',
  () => '<script>\n' + ops + '\n</script>\n<script>\n' + engineScript + '\n</script>');
html = html.replace('<script src="app.js"></script>', () => '<script>\n' + appFinal + '\n</script>');

html = html.replace('<p class="muted">版本 1.1',
  '<p class="muted">单文件离线版：CSS、脚本、知识库数据、配图全部内嵌，双击即可打开；不需要服务器与网络，刷新后恢复内置演示数据。</p>\n        <p class="muted">版本 1.1');

fs.writeFileSync(OUT, html, 'utf8');
console.log('已生成：' + OUT);
console.log('大小：' + (fs.statSync(OUT).size / 1024 / 1024).toFixed(2) + ' MB');

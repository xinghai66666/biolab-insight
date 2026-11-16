/**
 * BioLab Insight · 服务端持久化存储层
 * ------------------------------------------------------------
 * 使用服务端 JSON 文件持久化全部业务数据，浏览器端不保存任何业务数据。
 * 采用原子写入（临时文件 + rename）避免并发写导致文件损坏。
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'experiments.json');

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ version: 1, records: [], createdAt: new Date().toISOString() }, null, 2), 'utf8');
  }
}

function read() {
  ensure();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const db = JSON.parse(raw);
    if (!Array.isArray(db.records)) db.records = [];
    return db;
  } catch (e) {
    // 极端情况下文件损坏，备份后重建，避免数据静默丢失
    try { fs.copyFileSync(DB_FILE, DB_FILE + '.corrupt.' + Date.now()); } catch (_) {}
    const fresh = { version: 1, records: [], createdAt: new Date().toISOString() };
    fs.writeFileSync(DB_FILE, JSON.stringify(fresh, null, 2), 'utf8');
    return fresh;
  }
}

function write(db) {
  ensure();
  db.updatedAt = new Date().toISOString();
  const tmp = DB_FILE + '.tmp.' + process.pid;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), 'utf8');
  fs.renameSync(tmp, DB_FILE);
}

function genId() {
  return 'exp_' + Date.now().toString(36) + '_' + crypto.randomBytes(4).toString('hex');
}

function list(type) {
  const db = read();
  let records = db.records.slice();
  if (type) records = records.filter(r => r.type === type);
  records.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  return records.map(r => ({ ...r, analysis: undefined }));
}

function get(id) {
  return read().records.find(r => r.id === id) || null;
}

function create(payload) {
  const db = read();
  const now = new Date().toISOString();
  const rec = {
    id: genId(),
    type: payload.type,
    title: payload.title || '未命名实验',
    batch: payload.batch || '',
    date: payload.date || now.slice(0, 10),
    operator: payload.operator || '',
    objective: payload.objective || '',
    metrics: payload.metrics || {},
    observations: payload.observations || '',
    createdAt: now,
    analysis: payload.analysis || null
  };
  db.records.push(rec);
  write(db);
  return rec;
}

function remove(id) {
  const db = read();
  const before = db.records.length;
  db.records = db.records.filter(r => r.id !== id);
  if (db.records.length === before) return false;
  write(db);
  return true;
}

function clear() {
  const db = read();
  db.records = [];
  write(db);
  return true;
}

function stats() {
  const db = read();
  const byType = {};
  let critical = 0, high = 0;
  for (const r of db.records) {
    byType[r.type] = (byType[r.type] || 0) + 1;
    const risk = r.analysis && r.analysis.riskLevel && r.analysis.riskLevel.key;
    if (risk === 'critical') critical++;
    if (risk === 'high') high++;
  }
  const scores = db.records.map(r => r.analysis && r.analysis.healthScore).filter(s => typeof s === 'number');
  return {
    total: db.records.length,
    byType,
    criticalCount: critical,
    highCount: high,
    avgHealth: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
  };
}

/** 历史同类记录（不含当前记录），按时间正序 */
function history(type, excludeId, limit = 10) {
  const db = read();
  return db.records
    .filter(r => r.type === type && r.id !== excludeId)
    .sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''))
    .slice(-limit);
}

module.exports = { list, get, create, remove, clear, stats, history, DB_FILE };

/**
 * BioLab Insight · 智能分析推理引擎
 * ------------------------------------------------------------
 * 输入一条实验记录，输出：结构化总结、异常清单、疑似问题（含可能性排序）、
 * 健康度评分与预警等级、排查建议。
 *
 * 推理流程：指标状态判定 → 规则匹配（含组合规则）→ 证据强度计算 →
 * 可能性评分 → 历史趋势对比 → 健康度/预警 → 结构化总结生成。
 */

'use strict';

const KB = require('./knowledge-base');
const { EXPERIMENT_TYPES, GENERAL_RULES, SEVERITY_WEIGHT } = KB;

const RISK_LEVELS = [
  { key: 'low', label: '低', min: 85 },
  { key: 'medium', label: '中', min: 70 },
  { key: 'high', label: '高', min: 45 },
  { key: 'critical', label: '严重', min: 0 }
];

function mean(arr) {
  if (!arr.length) return NaN;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function stdev(arr) {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1));
}
function cv(arr) {
  const m = mean(arr);
  if (!isFinite(m) || m === 0) return 0;
  return (stdev(arr) / Math.abs(m)) * 100;
}
function round(n, d = 2) {
  if (!isFinite(n)) return null;
  const p = Math.pow(10, d);
  return Math.round(n * p) / p;
}
function fmt(v, digits = 2) {
  if (v === null || v === undefined || (typeof v === 'number' && !isFinite(v))) return '—';
  return typeof v === 'number' ? round(v, digits) : String(v);
}

/** 判断单个指标状态：normal / warning / critical */
function evaluateMetric(value, def) {
  const result = { key: def.key, label: def.label, unit: def.unit, value, status: 'normal', note: '' };

  if (def.type === 'enum') {
    // 未记录的可选项不参与判定（避免把"没填"当成"不合格"）
    if (value === undefined || value === null || value === '') {
      result.status = 'unknown';
      result.note = '未记录';
      return result;
    }
    if (value === def.expected) {
      result.status = 'normal';
    } else {
      result.status = def.failureSeverity || (def.expected === '阴性' ? 'critical' : 'high');
      result.note = `期望为「${def.expected}」，实际为「${value}」`;
    }
    return result;
  }

  const nums = Array.isArray(value) ? value : [value];
  const clean = nums.filter(v => typeof v === 'number' && isFinite(v));
  if (!clean.length) { result.status = 'unknown'; result.note = '无有效数值'; return result; }

  const m = mean(clean);
  result.mean = round(m);
  result.cv = clean.length > 1 ? round(cv(clean)) : 0;
  result.replicates = clean.length;

  const [lo, hi] = def.normal;
  const critLo = def.criticalLow !== undefined ? def.criticalLow : (lo - (hi - lo) * 0.5);
  const critHi = def.criticalHigh !== undefined ? def.criticalHigh : (hi + (hi - lo) * 0.5);

  if (m < critLo || m > critHi) { result.status = 'critical'; }
  else if (m < lo || m > hi) { result.status = 'warning'; }
  else { result.status = 'normal'; }

  if (m < lo) result.note = `低于正常下限 ${lo}${def.unit}`;
  else if (m > hi) result.note = `高于正常上限 ${hi}${def.unit}`;

  if (def.key === 'ntcCt') {
    result.status = m < lo ? 'critical' : (m < 35 ? 'warning' : 'normal');
    result.note = m < 35 ? `NTC 出现扩增（Ct=${fmt(m)}），提示污染` : 'NTC 无有效扩增';
  }
  if (def.key === 'bandCount') {
    result.status = m > 1 ? 'warning' : 'normal';
    result.note = m > 1 ? `检出 ${fmt(m, 0)} 条带，存在非特异条带` : '单一特异性条带';
  }
  return result;
}

/** 评估一个规则条件是否命中 */
function conditionHit(cond, ctx) {
  if (!cond) return { hit: false };
  if (cond.type === 'combo') {
    if (cond.all) {
      const parts = cond.all.map(c => conditionHit(c, ctx));
      return { hit: parts.every(p => p.hit), parts };
    }
    if (cond.any) {
      const parts = cond.any.map(c => conditionHit(c, ctx));
      return { hit: parts.some(p => p.hit), parts };
    }
  }
  const ev = ctx.eval[cond.metric];
  if (!ev) return { hit: false };
  if (cond.type === 'enum') {
    return { hit: ev.value === cond.value };
  }
  if (cond.type === 'cv') {
    return { hit: ev.cv !== undefined && ev.cv > cond.value, observed: ev.cv };
  }
  if (cond.type === 'low' || cond.type === 'outside' || cond.type === 'high') {
    if (ev.value === undefined || (Array.isArray(ev.value) && !ev.value.length)) return { hit: false };
    if (ev.raw === undefined && !isFinite(ev.mean)) return { hit: false };
    const v = ev.mean;
    const [lo, hi] = ev.def.normal || [-Infinity, Infinity];
    if (cond.type === 'low') return { hit: v < lo, observed: v };
    if (cond.type === 'high') return { hit: v > hi, observed: v };
    if (cond.type === 'outside') return { hit: v < lo || v > hi, observed: v };
  }
  return { hit: false };
}

/** 证据强度：偏离越大，证据越强 */
function evidenceStrength(cond, ctx, hitResult) {
  if (!hitResult.hit) return 0;
  const parts = hitResult.parts ? hitResult.parts.filter(p => p.hit) : [hitResult];
  if (!parts.length) return 0.5;
  let total = 0;
  for (const p of parts) {
    const ev = ctx.eval[p.observed !== undefined ? (ctx.evalByObserved[p.observed] || '') : ''];
    // 统一按命中子条件的指标计算偏离度
    total += 1;
  }
  // 组合规则按命中比例给基础强度，再结合各指标偏离幅度
  const deviation = parts.reduce((acc, p) => {
    const obs = p.observed;
    if (obs === undefined || !isFinite(obs)) return acc;
    const related = Object.values(ctx.eval).find(e => e.mean === obs || e.cv === obs);
    if (!related || !related.def.normal) return acc + 0.5;
    const [lo, hi] = related.def.normal;
    const span = (hi - lo) || 1;
    const d = obs < lo ? (lo - obs) / span : (obs > hi ? (obs - hi) / span : 0);
    return acc + Math.min(1, 0.5 + d * 0.5);
  }, 0);
  const base = 0.62 + 0.38 * (total / parts.length);
  return Math.max(0.55, Math.min(1, base * (deviation / parts.length > 0.7 ? 1.06 : 0.9)));
}

/** 历史趋势对比：与同类型历史记录的均值比较 */
function trendAnalysis(record, history, typeDef) {
  const findings = [];
  if (!history.length) return findings;
  const window = history.slice(-10);
  for (const def of typeDef.metrics) {
    if (def.type !== 'number') continue;
    const cur = Array.isArray(record.metrics[def.key]) ? mean(record.metrics[def.key]) : record.metrics[def.key];
    if (typeof cur !== 'number' || !isFinite(cur)) continue;
    const histVals = window
      .map(h => h.metrics && h.metrics[def.key])
      .map(v => Array.isArray(v) ? mean(v.filter(x => typeof x === 'number')) : v)
      .filter(v => typeof v === 'number' && isFinite(v));
    if (histVals.length < 3) continue;
    const hm = mean(histVals);
    const hs = stdev(histVals);
    if (hs === 0) continue;
    const z = (cur - hm) / hs;
    if (Math.abs(z) >= 2) {
      findings.push({
        metric: def.label, current: round(cur), historicalMean: round(hm), z: round(z),
        direction: z > 0 ? '升高' : '降低',
        description: `${def.label} 较近 ${histVals.length} 批历史均值${z > 0 ? '升高' : '降低'} ${round(Math.abs((cur - hm) / hm * 100), 1)}%（偏离 ${round(z, 1)} 个标准差），存在趋势漂移。`
      });
    }
  }
  return findings;
}

/** 生成结构化总结 */
function buildSummary(record, typeDef, metricEvals, findings, riskLevel) {
  const metricText = typeDef.metrics.map(def => {
    const ev = metricEvals[def.key];
    if (!ev) return `${def.label}：未记录`;
    if (def.type === 'enum') return `${def.label}：${ev.value}`;
    const unit = def.unit || '';
    const val = ev.replicates > 1 ? `${fmt(ev.mean)}（n=${ev.replicates}，CV=${fmt(ev.cv)}%）` : fmt(ev.mean);
    return `${def.label} ${val}${unit}`;
  }).join('；');

  const abnormal = Object.values(metricEvals).filter(e => e.status === 'warning' || e.status === 'critical');
  const resultText = abnormal.length
    ? `本次实验共 ${typeDef.metrics.length} 项关键指标，其中 ${abnormal.length} 项偏离正常区间：${abnormal.map(e => `${e.label}（${e.note || e.status}）`).join('、')}。`
    : `本次实验 ${typeDef.metrics.length} 项关键指标均处于正常区间，未发现明显偏离。`;

  const conclusion = findings.length
    ? `综合判定预警等级为「${riskLevel.label}」，识别出 ${findings.length} 项疑似问题，建议优先核查：${findings.slice(0, 2).map(f => f.title).join('、')}。`
    : `综合判定预警等级为「${riskLevel.label}」，未识别到显著异常，结果可用于后续判读，建议按 SOP 完成常规复核。`;

  return {
    objective: record.objective || typeDef.objective,
    method: `采用「${typeDef.name}」标准方法，对 ${typeDef.metrics.length} 项关键指标进行监测${record.batch ? `，批号 ${record.batch}` : ''}${record.operator ? `，操作人 ${record.operator}` : ''}。`,
    result: resultText + (metricText ? ` 记录明细：${metricText}。` : ''),
    conclusion,
    observations: record.observations || '未填写原始观察描述'
  };
}

/**
 * 主分析函数
 * @param {object} record 实验记录
 * @param {object[]} history 同类型历史记录
 */
function analyze(record, history = []) {
  const typeDef = EXPERIMENT_TYPES[record.type];
  if (!typeDef) throw new Error('不支持的实验类型：' + record.type);

  const metrics = record.metrics || {};
  const evalMap = {};
  const anomalies = [];

  for (const def of typeDef.metrics) {
    const ev = evaluateMetric(metrics[def.key], def);
    ev.def = def;
    ev.raw = metrics[def.key];
    evalMap[def.key] = ev;
    if (ev.status === 'warning' || ev.status === 'critical') {
      anomalies.push({ key: def.key, label: def.label, status: ev.status, note: ev.note, value: ev.value, mean: ev.mean, cv: ev.cv });
    }
  }

  const ctx = { eval: evalMap, evalByObserved: {} };
  for (const k in evalMap) {
    ctx.evalByObserved[String(evalMap[k].mean)] = k;
    ctx.evalByObserved[String(evalMap[k].cv)] = k;
  }

  // 规则匹配
  const findings = [];
  for (const rule of typeDef.rules) {
    const hr = conditionHit(rule.condition, ctx);
    if (!hr.hit) continue;
    const strength = evidenceStrength(rule.condition, ctx, hr);
    let likelihood = round(Math.min(0.99, rule.likelihood * (0.82 + 0.18 * strength)) * 100, 0);
    const evidenceLines = [];
    if (rule.condition.type === 'combo') {
      for (const p of (hr.parts || [])) {
        if (p.hit && p.observed !== undefined) evidenceLines.push(`观测值 ${fmt(p.observed)} 触发组合条件`);
      }
    } else {
      const def = evalMap[rule.condition.metric] && evalMap[rule.condition.metric].def;
      const ev = evalMap[rule.condition.metric];
      if (def && ev) {
        const val = def.type === 'enum' ? ev.value : (ev.replicates > 1 ? fmt(ev.mean) : fmt(ev.mean));
        evidenceLines.push(`${def.label} = ${val}${def.unit || ''}（${ev.note || '命中诊断规则'}）`);
      }
    }
    if (!evidenceLines.length) evidenceLines.push('命中领域诊断规则');
    findings.push({
      id: rule.id, title: rule.title, category: rule.category, severity: rule.severity,
      likelihood, evidence: evidenceLines,
      causes: rule.causes.map((c, i) => ({ no: i + 1, text: c })),
      actions: rule.actions.map((a, i) => ({ no: i + 1, text: a })),
      priority: round(likelihood * SEVERITY_WEIGHT[rule.severity], 1)
    });
  }

  // 通用规则：关键对照缺失
  const hasMissingCritical = typeDef.metrics
    .filter(m => m.key.includes('Control') || m.key === 'ntcCt' || m.key === 'negativeControl' || m.key === 'positiveControl')
    .some(m => metrics[m.key] === undefined || metrics[m.key] === null || metrics[m.key] === '');
  if (hasMissingCritical) {
    for (const rule of GENERAL_RULES.filter(r => r.check === 'missingCritical')) {
      findings.push({
        id: rule.id, title: rule.title, category: rule.category, severity: rule.severity,
        likelihood: round(rule.likelihood * 100, 0),
        evidence: ['未记录关键对照或质控指标，无法完整判定体系有效性'],
        causes: rule.causes.map((c, i) => ({ no: i + 1, text: c })),
        actions: rule.actions.map((a, i) => ({ no: i + 1, text: a })),
        priority: round(rule.likelihood * 100 * SEVERITY_WEIGHT[rule.severity], 1)
      });
    }
  }

  // 趋势分析
  const trends = trendAnalysis(record, history, typeDef);

  // 按可能性×严重度排序
  findings.sort((a, b) => b.priority - a.priority);

  // 健康度评分：基础分 100，按异常与问题扣分
  let deduction = 0;
  for (const a of anomalies) {
    deduction += a.status === 'critical' ? 12 : 5;
  }
  for (const f of findings) {
    deduction += (SEVERITY_WEIGHT[f.severity] || 1) * (f.likelihood / 100) * 9;
  }
  for (const t of trends) deduction += 4;
  const healthScore = Math.max(0, Math.min(100, Math.round(100 - deduction)));

  // 预警等级：存在严重级问题则至少为「严重」
  let riskLevel = RISK_LEVELS.find(l => healthScore >= l.min) || RISK_LEVELS[RISK_LEVELS.length - 1];
  if (findings.some(f => f.severity === 'critical')) {
    riskLevel = RISK_LEVELS.find(l => l.key === 'critical');
  }

  const summary = buildSummary(record, typeDef, evalMap, findings, riskLevel);

  // 汇总排查建议（去重，取前 8 条）
  const seen = new Set();
  const recommendations = [];
  for (const f of findings) {
    for (const a of f.actions) {
      if (!seen.has(a.text)) { seen.add(a.text); recommendations.push({ text: a.text, from: f.title, severity: f.severity }); }
    }
  }

  return {
    experimentId: record.id,
    type: record.type,
    typeName: typeDef.name,
    analyzedAt: new Date().toISOString(),
    healthScore,
    riskLevel: { key: riskLevel.key, label: riskLevel.label },
    summary,
    anomalies,
    metricEvaluation: Object.values(evalMap).map(e => {
      const copy = { ...e }; delete copy.def; delete copy.raw; return copy;
    }),
    findings,
    trends,
    recommendations: recommendations.slice(0, 8),
    historyCount: history.length,
    engine: { name: 'BioLab Insight Rule+Evidence Engine', version: '1.0', ruleCount: typeDef.rules.length }
  };
}

module.exports = { analyze, evaluateMetric, cv, mean, stdev, round };

/**
 * BioLab Insight · 实验问答引擎（Lab Q&A）
 * ------------------------------------------------------------
 * 定位：把「实验知识库 + 试剂知识 + 诊断阈值」变成可问答的检索式智能体。
 *
 * 实现方式（不依赖任何外部大模型或网络）：
 *   1) 索引层：把 13 个 SOP 的步骤、质控指标、实验概览、试剂词条、
 *      诊断指标与规则切成可检索文档；
 *   2) 检索层：中文 2–3 元组 + 英文/数字词元，按「标题 > 关键词 > 正文」
 *      加权，并用 IDF 压低高频通用词的权重；
 *   3) 意图层：识别「怎么做 / 为什么 / 易错 / 参数 / 判定 / 概念」，
 *      按意图挑选不同字段组织答案；
 *   4) 组合层：输出结构化段落（lead / para / list / note），
 *      附来源定位（实验 + 步骤号）与追问建议。
 *
 * 说明：回答全部来自本地结构化知识库的检索与重排，不做生成式推理，
 * 因此不会编造知识库以外的参数；未能命中时会明确说明而不是猜测。
 */

'use strict';

const PROTOCOL_KB = require('./protocol-knowledge');
const { REAGENTS } = require('./reagent-glossary');
const KB = require('./knowledge-base');

const LEVEL_LABEL = { critical: '高危', high: '高', medium: '中', low: '低' };
const SEV_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

const INTENT_LABEL = {
  how: '操作步骤',
  why: '原理与作用',
  pitfall: '易错点',
  param: '关键参数',
  criteria: '判定与限值',
  trouble: '异常处理',
  definition: '概念解释',
  general: '综合说明'
};

/* 常见提问中的虚词与套话，不参与匹配 */
const STOP = new Set([
  '的', '了', '吗', '呢', '呀', '啊', '是', '有', '和', '与', '或', '在', '我', '你', '它',
  '这', '那', '个', '些', '么', '把', '被', '对', '从', '到', '会', '要', '能', '就', '都',
  '什么', '怎么', '怎样', '如何', '为什么', '为何', '多少', '多久', '是否', '可以', '需要',
  '请问', '一下', '一个', '这个', '那个', '这些', '那些', '时候', '情况', '问题', '应该',
  '一般', '还要', '进行', '以及', '比如', '例如', '关于', '具体', '主要', '可能', '能否',
  '告诉', '介绍', '说明', '解释', '哪些', '哪个', '还有', '如果', '那么', '我们', '自己',
  '实验', '步骤', '操作', '时候', '东西', '地方'
]);

const QUICK_QUESTIONS = [
  '无内毒素质粒小提 A260/A280 偏低说明什么？',
  '细胞传代时胰酶消化多久合适？',
  'qPCR 的 NTC 出现扩增是什么原因？',
  'Ni-NTA 纯化收率低怎么排查？',
  'Western Blot 背景太高怎么办？',
  '无菌检查要培养几天才能出结果？',
  'P2 溶液的作用是什么？',
  '支原体检测阳性该怎么处理？',
  'Protein A 层析洗脱 pH 应该控制在多少？',
  'SEC-HPLC 聚集体偏高怎么排查？',
  '洁净区沉降菌超标怎么处理？'
];

/* 领域同义词：把口语说法映射到 SOP 中的书面用词 */
const SYNONYM_GROUPS = [
  ['胰酶', '胰蛋白酶', 'trypsin'],
  ['活率', '存活率', '活力', 'viability'],
  ['离心', '离心力', '转速', 'rpm'],
  ['内毒素', '脂多糖', 'lps'],
  ['洗膜', '洗涤', '漂洗'],
  ['封闭', '封闭液', 'blocking'],
  ['显影', '曝光', '成像', 'ecl'],
  ['上样', '上样量', 'loading'],
  ['转膜', '转印', 'transfer'],
  ['一抗', '二抗', '抗体'],
  ['裂解', '裂解液', 'lysis'],
  ['洗脱', '洗脱液', 'elution'],
  ['纯化', '层析', '色谱', 'purification'],
  ['收率', '回收率', '产量'],
  ['污染', '染菌', 'contamination'],
  ['支原体', 'mycoplasma'],
  ['无菌', '无菌检查', 'sterility'],
  ['内参', '内标', 'reference gene'],
  ['阴性对照', 'ntc', '空白对照'],
  ['标准曲线', '标准品', 'standard curve'],
  ['扩增效率', 'efficiency']
];

/* ---------------- 文本处理 ---------------- */

function normalize(input) {
  return String(input == null ? '' : input)
    .toLowerCase()
    .replace(/[，。？！、；：“”‘’（）【】《》…—,.?!;:()\[\]"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tokenize(text) {
  const tokens = new Set();
  if (!text) return tokens;
  const t = String(text).toLowerCase();
  for (const m of t.matchAll(/[a-z][a-z0-9._/\-]*/g)) if (m[0]) tokens.add(m[0]);
  for (const m of t.matchAll(/\d+(?:\.\d+)?/g)) tokens.add(m[0]);
  const segs = t.match(/[\u4e00-\u9fa5]+/g) || [];
  for (const seg of segs) {
    if (seg.length === 1) { tokens.add(seg); continue; }
    for (const n of [2, 3]) {
      for (let i = 0; i + n <= seg.length; i++) tokens.add(seg.slice(i, i + n));
    }
  }
  for (const tk of [...tokens]) if (tk.length < 2 || STOP.has(tk)) tokens.delete(tk);
  return tokens;
}

function expandTokens(tokens, q) {
  for (const group of SYNONYM_GROUPS) {
    if (!group.some(g => q.includes(g.toLowerCase()))) continue;
    for (const word of group) for (const tk of tokenize(word)) tokens.add(tk);
  }
  return tokens;
}

/* ---------------- 索引 ---------------- */

const DOCS = [];
let IDF = new Map();
let indexed = false;

function addDoc(doc) {  doc.tTokens = tokenize(doc.title);
  doc.kTokens = tokenize((doc.keys || []).join(' '));
  doc.bTokens = tokenize(doc.body || '');
  doc.len = (doc.title + ' ' + (doc.body || '')).length;
  DOCS.push(doc);
  return doc;
}

/* 把规则的触发条件转成可检索的中文描述 */
function describeCondition(rule, type) {
  const cond = rule.condition || {};
  const metric = (type.metrics || []).find(m => m.key === cond.metric);
  const label = metric ? metric.label : (cond.metric || '');
  const unit = metric && metric.unit ? metric.unit : '';
  const parts = [];
  if (cond.type === 'low') parts.push(`${label} 偏低 低于正常下限 ${unit}`);
  else if (cond.type === 'high') parts.push(`${label} 偏高 高于正常上限 ${unit}`);
  else if (cond.type === 'outside') parts.push(`${label} 超出正常范围 ${unit}`);
  else if (cond.type === 'enum') parts.push(`${label} ${cond.value}`);
  else if (cond.type === 'cv') parts.push(`${label} 重复性差 变异系数超过 ${cond.value}%`);
  else if (cond.type === 'combo' && Array.isArray(cond.all)) {
    for (const c of cond.all) parts.push(describeCondition({ condition: c }, type));
  }
  return parts.filter(Boolean).join(' 并且 ');
}

function buildIndex() {
  if (indexed) return;
  indexed = true;

  for (const protocol of PROTOCOL_KB.PROTOCOLS) {
    /* 实验概览 */
    const ov = protocol.overview || {};
    addDoc({
      kind: 'overview',
      title: `${protocol.name} 实验原理 适用范围 耗时 产量`,
      keys: [protocol.name, protocol.category, protocol.short || '', '实验流程', '原理'],
      body: [ov.principle, ov.application, ov.input, ov.output, ov.duration, ov.yield].filter(Boolean).join(' '),
      meta: { protocol }
    });

    /* 关键质控指标 */
    for (const spec of protocol.keySpecs || []) {
      addDoc({
        kind: 'spec',
        title: `${spec.label} 参考范围`,
        keys: [protocol.name, spec.label, '参考范围', '质控指标'],
        body: `${spec.value} ${spec.note || ''}`,
        meta: { protocol, spec }
      });
    }

    /* 操作步骤 */
    for (const step of protocol.steps || []) {
      addDoc({
        kind: 'step',
        title: `${step.title} ${step.phase || ''}`,
        keys: [protocol.name, protocol.category, step.phase || '',
          ...(step.params || []).map(p => p.label)],
        body: [
          step.summary, step.purpose, step.detail,
          ...(step.substeps || []),
          ...(step.checkpoints || []),
          ...(step.params || []).map(p => `${p.label} ${p.value}`),
          ...(step.pitfalls || []).map(p => `${p.title} ${p.consequence} ${p.fix}`),
          ...((step.interpretation && step.interpretation.rows) || []).map(r => `${r.metric} ${r.range} ${r.meaning} ${r.action}`)
        ].filter(Boolean).join(' '),
        meta: { protocol, step }
      });
    }
  }

  /* 试剂词条 */
  for (const reagent of REAGENTS) {
    addDoc({
      kind: 'reagent',
      title: `${reagent.name} ${reagent.category || ''}`,
      keys: [...(reagent.aliases || [reagent.name]), reagent.category || '', '试剂'],
      body: [reagent.function, reagent.composition, reagent.notes, reagent.storage].filter(Boolean).join(' '),
      meta: { reagent }
    });
  }

  /* 诊断指标与规则 */
  for (const type of Object.values(KB.EXPERIMENT_TYPES)) {
    for (const metric of type.metrics || []) {
      const range = metric.normal ? `${metric.normal[0]}–${metric.normal[1]}` : '';
      addDoc({
        kind: 'metric',
        title: `${metric.label} 正常范围 ${range}`,
        keys: [type.name, metric.label, metric.unit || '', '正常范围', '阈值'],
        body: [
          `${metric.label} 正常范围 ${range} ${metric.unit || ''}`,
          metric.optimal ? `最佳 ${metric.optimal[0]}–${metric.optimal[1]}` : '',
          metric.criticalLow != null ? `低于 ${metric.criticalLow} 为严重` : '',
          metric.criticalHigh != null ? `高于 ${metric.criticalHigh} 为严重` : '',
          metric.expected ? `期望 ${metric.expected}` : '',
          metric.note || ''
        ].filter(Boolean).join(' '),
        meta: { type, metric }
      });
    }
    for (const rule of type.rules || []) {
      const cond = describeCondition(rule, type);
      addDoc({
        kind: 'rule',
        title: `${rule.title} ${rule.category || ''}`,
        keys: [type.name, rule.category || '', '异常原因', '排查', cond],
        body: [cond, ...(rule.causes || []), ...(rule.actions || [])].join(' '),
        meta: { type, rule }
      });
    }
  }

  /* IDF */
  const df = new Map();
  for (const doc of DOCS) {
    const union = new Set([...doc.tTokens, ...doc.kTokens, ...doc.bTokens]);
    for (const tk of union) df.set(tk, (df.get(tk) || 0) + 1);
  }
  const N = DOCS.length || 1;
  IDF = new Map();
  for (const [tk, count] of df) IDF.set(tk, Math.log(1 + N / (1 + count)));
}

/* ---------------- 实体识别 ---------------- */

function detectIntent(q) {
  if (/易错|容易错|失误|注意什么|注意事项|避免|踩坑|风险|后果|做错|不规范|出错/.test(q)) return 'pitfall';
  if (/判定|怎么判断|判断标准|合格|不合格|标准|范围|阈值|限值|正常值|正常范围|多少算|判据|达标|符合|合格线/.test(q)) return 'criteria';
  if (/为什么|为啥|作用|目的|原理|意义|干嘛|有什么用|用来|干什么/.test(q)) return 'why';
  if (/参数|转速|离心力|离心|温度|时间|体积|加入|加多少|多久|几天|多长时间|几分钟|ph|rpm|孵育|稀释|比例/.test(q)) return 'param';
  if (/怎么处理|怎么办|如何解决|怎么解决|如何排查|怎么排查|排查|挽救|补救|什么原因|原因是什么|怎么回事|导致|为什么会/.test(q)) return 'trouble';
  if (/怎么做|怎么操作|怎样做|如何做|如何操作|步骤|流程|顺序|先.*再|操作要点/.test(q)) return 'how';
  if (/是什么|什么叫|什么是|定义|成分|组成|属于/.test(q)) return 'definition';
  return 'general';
}

function findReagent(q) {
  let best = null;
  for (const reagent of REAGENTS) {
    for (const alias of (reagent.aliases || [reagent.name])) {
      const a = String(alias).toLowerCase();
      if (!a) continue;
      let hit = false;
      if (/^[a-z0-9]/.test(a)) {
        hit = new RegExp(`(^|[^a-z0-9])${escapeRegExp(a)}([^a-z0-9]|$)`).test(q);
      } else {
        hit = q.includes(a);
      }
      if (hit && (!best || a.length > best.len)) best = { reagent, len: a.length, alias };
    }
  }
  return best;
}

function longestCommonSubstring(a, b) {
  if (!a || !b) return 0;
  let best = 0;
  const prev = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    let diag = 0;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      if (a[i - 1] === b[j - 1]) {
        prev[j] = diag + 1;
        if (prev[j] > best) best = prev[j];
      } else {
        prev[j] = 0;
      }
      diag = tmp;
    }
  }
  return best;
}

function findProtocol(q) {
  let best = null;
  for (const protocol of PROTOCOL_KB.PROTOCOLS) {
    const names = [protocol.name, protocol.name.replace(/（.*?）/g, '')];
    let lcs = 0;
    for (const n of names) {
      const nl = n.toLowerCase();
      if (nl.length >= 4 && q.includes(nl)) return protocol;
      lcs = Math.max(lcs, longestCommonSubstring(q, nl));
    }
    const nameTokens = tokenize(protocol.name);
    let hits = 0;
    for (const tk of nameTokens) if (tk.length >= 2 && q.includes(tk)) hits++;
    const ratio = nameTokens.size ? hits / nameTokens.size : 0;
    if (!best || lcs > best.lcs || (lcs === best.lcs && ratio > best.ratio)) {
      best = { protocol, lcs, ratio };
    }
  }
  if (!best) return null;
  if (best.lcs >= 4) return best.protocol;
  if (best.ratio >= 0.26) return best.protocol;
  return null;
}

/* ---------------- 排序 ---------------- */

function rankDoc(doc, tokens, q, context, intent) {
  let score = 0;
  for (const tk of tokens) {
    const idf = IDF.get(tk) || 0.1;
    if (doc.tTokens.has(tk)) score += 6 * idf;
    else if (doc.kTokens.has(tk)) score += 3.5 * idf;
    else if (doc.bTokens.has(tk)) score += 1 * idf;
  }
  for (const key of (doc.keys || [])) {
    const k = String(key).toLowerCase();
    if (k.length >= 3 && q.includes(k)) score += 2 + Math.min(k.length, 14) * 0.7;
  }
  if (doc.meta.protocol && q.includes(doc.meta.protocol.name.toLowerCase())) score += 6;
  score = score / (1 + Math.log(1 + doc.len / 300));
  if (doc.kind === 'overview') score *= 0.5; // 概览是"枢纽文档"，避免抢走具体问题的答案
  if (intent === 'trouble') {
    if (doc.kind === 'rule') score *= 1.35;
    if (doc.kind === 'metric') score *= 0.85;
  }
  if (intent === 'param' || intent === 'criteria' || intent === 'pitfall' || intent === 'how') {
    if (doc.kind === 'reagent') score *= 0.55;
    if (doc.kind === 'metric') score *= 0.8;
  }
  if (context.protocolId && doc.meta.protocol && doc.meta.protocol.id === context.protocolId) score *= 1.35;
  return score;
}

/* ---------------- 答案块 ---------------- */

const lead = (text, sub) => ({ type: 'lead', text, sub: sub || '' });
const para = (title, text) => ({ type: 'para', title, text });
const list = (title, items) => ({ type: 'list', title, items: items.filter(Boolean) });
const note = text => ({ type: 'note', text });

function pitfallLines(pitfalls, limit) {
  return (pitfalls || [])
    .slice()
    .sort((a, b) => (SEV_ORDER[a.level] == null ? 9 : SEV_ORDER[a.level]) - (SEV_ORDER[b.level] == null ? 9 : SEV_ORDER[b.level]))
    .slice(0, limit || 99)
    .map(p => `【${LEVEL_LABEL[p.level] || p.level}】${p.title}｜后果：${p.consequence}｜规避：${p.fix}`);
}

function stepAnswer(step, protocol, intent, reagent) {
  const blocks = [lead(`${protocol.name} · 第 ${step.no} 步「${step.title}」`, `${step.phase || ''} · ${protocol.category}`)];
  const has = k => Array.isArray(step[k]) && step[k].length;

  if (intent === 'pitfall' || intent === 'trouble') {
    blocks.push(list(`易出现失误之处（共 ${step.pitfalls.length} 处）`, pitfallLines(step.pitfalls)));
    if (has('checkpoints')) blocks.push(list('对应的判定要求', step.checkpoints));
  } else if (intent === 'criteria') {
    if (has('checkpoints')) blocks.push(list('观察与判定', step.checkpoints));
    if (step.interpretation && (step.interpretation.rows || []).length) {
      blocks.push(list(step.interpretation.title || '读数解读',
        step.interpretation.rows.slice(0, 9).map(r => `${r.metric} ${r.range}：${r.meaning}｜建议：${r.action}`)));
    }
    const specs = (protocol.keySpecs || []).slice(0, 4);
    if (specs.length) blocks.push(list('该实验的关键质控指标', specs.map(s => `${s.label}：${s.value}（${s.note}）`)));
  } else if (intent === 'param') {
    if (has('params')) blocks.push(list('关键参数', step.params.map(p => `${p.label}：${p.value}`)));
    else blocks.push(para('关键参数', '该步骤以操作顺序为主，未单列数值参数；具体体积、时间以试剂盒说明书与实验室 SOP 为准。'));
    if (has('checkpoints')) blocks.push(list('执行后应确认', step.checkpoints.slice(0, 3)));
  } else if (intent === 'why') {
    blocks.push(para('这一步的作用', step.purpose));
    if (step.detail) blocks.push(para('原理补充', step.detail));
    const top = (step.pitfalls || []).filter(p => p.level === 'critical' || p.level === 'high').slice(0, 2);
    if (top.length) blocks.push(list('最容易被忽略的地方', pitfallLines(top)));
  } else if (intent === 'how') {
    blocks.push(para('本步操作', step.summary || step.detail || ''));
    if (has('substeps')) blocks.push(list('详细操作', step.substeps));
    if (has('params')) blocks.push(list('关键参数', step.params.slice(0, 5).map(p => `${p.label}：${p.value}`)));
  } else {
    blocks.push(para('本步操作', step.summary || step.detail || ''));
    blocks.push(para('这一步的作用', step.purpose));
    if (has('pitfalls')) blocks.push(list('注意点', pitfallLines(step.pitfalls, 3)));
  }

  if (reagent) {
    blocks.push(para(`相关试剂：${reagent.name}`, `${reagent.function || ''}${reagent.notes ? `　注意：${reagent.notes}` : ''}`));
  }
  return blocks;
}

/* 诊断实验类型 → 对应 SOP（按 id 前缀匹配） */
function protocolOfType(typeId) {
  return PROTOCOL_KB.PROTOCOLS.find(p => p.id.startsWith(typeId)) || null;
}

function relatedStepsOfReagent(reagent) {  const aliases = (reagent.aliases || [reagent.name]).map(a => String(a).toLowerCase());
  const out = [];
  for (const protocol of PROTOCOL_KB.PROTOCOLS) {
    for (const step of protocol.steps) {
      const text = [step.title, step.summary, step.detail, ...(step.substeps || []),
        ...(step.params || []).map(p => p.label + p.value)].join(' ').toLowerCase();
      if (aliases.some(a => a && text.includes(a))) out.push({ protocol, step });
    }
  }
  return out;
}

function reagentAnswer(reagent, intent) {
  const blocks = [lead(reagent.name, `${reagent.category || '试剂'} · 试剂知识卡`)];
  if (reagent.function) blocks.push(para('作用', reagent.function));
  if (reagent.composition) blocks.push(para('成分', reagent.composition));
  if (reagent.notes) blocks.push(para('注意事项', reagent.notes));
  if (reagent.storage) blocks.push(para('储存条件', reagent.storage));
  const related = relatedStepsOfReagent(reagent).slice(0, 6);
  if (related.length) blocks.push(list('流程中会用到它的步骤', related.map(r => `${r.protocol.name} · 第 ${r.step.no} 步「${r.step.title}」`)));
  if (intent === 'pitfall' && related.length) {
    const risky = related.flatMap(r => r.step.pitfalls.filter(p => textHasAlias(p, reagent)).map(p => p));
    if (risky.length) blocks.push(list('与它相关的易错点', pitfallLines(risky, 4)));
  }
  const top = related[0];
  blocks.push(note(`具体配方、用量与保存期限以所用试剂盒说明书为准${top ? `；当前示例出自「${top.protocol.name}」。` : '。'}`));
  return blocks;
}

function textHasAlias(obj, reagent) {
  const text = [obj.title, obj.consequence, obj.fix].join(' ').toLowerCase();
  return (reagent.aliases || [reagent.name]).some(a => a && text.includes(String(a).toLowerCase()));
}

function protocolAnswer(protocol, intent) {
  const ov = protocol.overview || {};
  const blocks = [lead(protocol.name, `${protocol.category}${protocol.short ? ' · ' + protocol.short : ''}`)];
  if (intent === 'pitfall' || intent === 'trouble') {
    const all = protocol.steps.flatMap(s => s.pitfalls.map(p => ({ ...p, stepNo: s.no, stepTitle: s.title })));
    blocks.push(list('全流程中最容易出错的地方', all
      .filter(p => p.level === 'critical' || p.level === 'high')
      .slice(0, 8)
      .map(p => `【${LEVEL_LABEL[p.level]}】第 ${p.stepNo} 步 ${p.stepTitle}：${p.title}｜规避：${p.fix}`)));
    return blocks;
  }
  if (intent === 'criteria') {
    blocks.push(list('关键质控指标', (protocol.keySpecs || []).map(s => `${s.label}：${s.value}（${s.note}）`)));
    return blocks;
  }
  if (ov.principle) blocks.push(para('实验原理', ov.principle));
  if (ov.application) blocks.push(para('适用场景', ov.application));
  const meta = [];
  if (ov.input) meta.push(`起始材料：${ov.input}`);
  if (ov.output) meta.push(`产物：${ov.output}`);
  if (ov.duration) meta.push(`预计耗时：${ov.duration}`);
  if (ov.yield) meta.push(`参考产量：${ov.yield}`);
  if (meta.length) blocks.push(list('实验条件', meta));
  blocks.push(list(`标准操作步骤（${protocol.steps.length} 步）`,
    protocol.steps.map(s => `${s.no}. ${s.title} — ${s.purpose}`)));
  blocks.push(note('流程为通用参考版本，具体体积、离心力与时间以所用试剂盒说明书及实验室 SOP 为准。'));
  return blocks;
}

function specAnswer(protocol, spec) {
  const blocks = [
    lead(`${protocol.name} · ${spec.label}`, `关键质控指标 · 参考范围 ${spec.value}`),
    para('参考范围与判读', `${spec.label} 的参考范围为 ${spec.value}。${spec.note || ''}`)
  ];
  const rows = [];
  for (const step of protocol.steps) {
    for (const row of ((step.interpretation && step.interpretation.rows) || [])) {
      if (String(row.metric).toLowerCase().includes(String(spec.label).toLowerCase()) || String(spec.label).toLowerCase().includes(String(row.metric).toLowerCase())) {
        rows.push(`第 ${step.no} 步「${step.title}」：${row.range} → ${row.meaning}｜建议：${row.action}`);
      }
    }
  }
  if (rows.length) blocks.push(list('分档解读', rows.slice(0, 8)));
  else blocks.push(note('知识库对该指标只收录了参考范围与判读要点；更细的原因分析请结合具体实验记录，或直接问相关步骤的易错点。'));
  return blocks;
}

function metricAnswer(type, metric) {
  const range = metric.normal ? `${metric.normal[0]}–${metric.normal[1]} ${metric.unit || ''}`.trim() : '按方法规定';
  const blocks = [lead(`${type.name} · ${metric.label}`, `诊断阈值 · 正常范围 ${range}`)];
  const rows = [];
  if (metric.optimal) rows.push(`最佳区间：${metric.optimal[0]}–${metric.optimal[1]} ${metric.unit || ''}`);
  if (metric.criticalLow != null) rows.push(`低于 ${metric.criticalLow} ${metric.unit || ''} 视为严重偏低`);
  if (metric.criticalHigh != null) rows.push(`高于 ${metric.criticalHigh} ${metric.unit || ''} 视为严重偏高`);
  if (metric.expected) rows.push(`期望结果：${metric.expected}`);
  if (metric.note) rows.push(metric.note);
  if (rows.length) blocks.push(list('判定要点', rows));
  const rules = (type.rules || []).filter(r => r.condition && r.condition.metric === metric.key).slice(0, 2);
  for (const rule of rules) {
    blocks.push(para(rule.title, (rule.causes || []).slice(0, 3).map(c => '· ' + c).join('　')));
    if (rule.actions && rule.actions.length) blocks.push(list('建议排查', rule.actions.slice(0, 4)));
  }
  if (!rules.length) blocks.push(note('该指标暂无独立诊断规则，按正常范围与批次趋势综合判断。'));
  return blocks;
}

function ruleAnswer(type, rule) {
  const blocks = [lead(`${type.name} · ${rule.title}`, `异常诊断规则 · 严重程度 ${LEVEL_LABEL[rule.severity] || rule.severity}`)];
  if (rule.causes && rule.causes.length) blocks.push(list('可能原因', rule.causes));
  if (rule.actions && rule.actions.length) blocks.push(list('建议排查顺序', rule.actions));
  blocks.push(note('原因排序由知识库规则给出，属于启发式排序，需结合现场记录与复测结果确认。'));
  return blocks;
}

/* ---------------- 问答主流程 ---------------- */

function ask(question, opts = {}) {
  buildIndex();
  const context = opts.context || {};
  // 问答页可把检索范围限定到当前选定的实验
  const scopeId = context.protocolId || '';
  const scopedProtocol = scopeId ? PROTOCOL_KB.PROTOCOLS.find(p => p.id === scopeId) : null;
  const q = normalize(question);
  if (!q) {
    return {
      question: '',
      intent: 'general',
      headline: '请输入问题',
      blocks: [note('可以问实验步骤、试剂作用、参数、判定标准或异常原因。')],
      sources: [],
      followups: QUICK_QUESTIONS.slice(0, 3),
      confidence: 'low'
    };
  }

  const tokens = tokenize(q);
  expandTokens(tokens, q);
  const intent = detectIntent(q);
  const reagentHit = findReagent(q);
  const protocolHit = findProtocol(q);

  /* 1) 追问「第 N 步」：结合上下文直接定位 */
  const stepRef = q.match(/第\s*(\d+)\s*步/);
  if (stepRef && context.protocolId) {
    const protocol = PROTOCOL_KB.PROTOCOLS.find(p => p.id === context.protocolId);
    const step = protocol && protocol.steps.find(s => s.no === Number(stepRef[1]));
    if (protocol && step) {
      return finalize({
        question,
        intent,
        headline: `${protocol.name} · 第 ${step.no} 步`,
        blocks: stepAnswer(step, protocol, intent, reagentHit ? reagentHit.reagent : null),
        sources: [{ label: `${protocol.name} · 第 ${step.no} 步「${step.title}」`, protocolId: protocol.id, stepNo: step.no }],
        followups: buildFollowups(protocol, step, intent),
        confidence: 'high',
        topic: protocol.name
      });
    }
  }

  /* 2) 问试剂本身 */
  const reagentRels = reagentHit ? relatedStepsOfReagent(reagentHit.reagent) : [];
  const wantReagent = reagentHit && !protocolHit && (intent === 'definition' || intent === 'why') &&
    (!scopeId || reagentRels.some(r => r.protocol.id === scopeId));
  if (wantReagent) {
    const related = scopeId ? reagentRels.filter(r => r.protocol.id === scopeId) : reagentRels;
    const sources = related.slice(0, 3).map(r => ({
      label: `${r.protocol.name} · 第 ${r.step.no} 步「${r.step.title}」`,
      protocolId: r.protocol.id,
      stepNo: r.step.no
    }));
    return finalize({
      question,
      intent,
      headline: reagentHit.reagent.name,
      blocks: reagentAnswer(reagentHit.reagent, intent),
      sources,
      followups: related.length ? [
        `第 ${related[0].step.no} 步要注意什么？`,
        `${reagentHit.reagent.name} 加多少、什么时候加？`,
        `${related[0].protocol.name} 的完整流程是什么？`
      ] : [`${reagentHit.reagent.name} 在哪些步骤用？`],
      confidence: 'high',
      topic: related[0] ? related[0].protocol.name : null,
      contextNext: related[0] ? related[0].protocol.id : null
    });
  }

  /* 3) 问整个实验流程：只有明确问"流程/步骤/怎么做"时才给整篇 SOP */
  const flowWord = /有哪些步骤|哪些步骤|步骤有哪些|步骤是|步骤|流程|怎么做|怎样做|如何做|操作流程|整体流程/.test(q);
  const askFlow = protocolHit && flowWord && (!scopeId || protocolHit.id === scopeId);
  if (askFlow) {
    return finalize({
      question,
      intent: intent === 'general' ? 'how' : intent,
      headline: protocolHit.name,
      blocks: protocolAnswer(protocolHit, intent),
      sources: [{ label: `${protocolHit.name}（完整 SOP）`, protocolId: protocolHit.id, stepNo: null }],
      followups: [
        `${protocolHit.name} 最容易出错的步骤是哪些？`,
        `${protocolHit.name} 的关键质控指标是什么？`,
        `第 1 步 ${protocolHit.steps[0].title} 有什么要注意的？`
      ],
      confidence: 'high',
      topic: protocolHit.name,
      contextNext: protocolHit.id
    });
  }

  /* 4) 通用检索 */
  // 选定实验后，只在该实验的步骤 / 质控指标与诊断规则中检索
  const candidates = scopeId ? DOCS.filter(doc => {
    const m = doc.meta || {};
    if (m.reagent) return false;              // 全局试剂词条不属于单个实验
    if (m.protocol) return m.protocol.id === scopeId;
    if (m.type) return m.type.id === scopeId;
    return false;
  }) : DOCS;
  const scored = candidates
    .map(doc => ({ doc, score: rankDoc(doc, tokens, q, context, intent) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const topScore = scored.length ? scored[0].score : 0;
  // 限定到单个实验时提高门槛，避免范围内总能命中一个弱相关文档
  const minScore = scopeId ? 4.0 : 2.2;
  if (!scored.length || topScore < minScore) {
    return finalize({
      question,
      intent,
      headline: scopedProtocol ? `${scopedProtocol.name} 中没有找到直接对应的内容` : '知识库里没有找到直接对应的内容',
      blocks: [
        note(scopedProtocol
          ? `当前回答仅从《${scopedProtocol.name}》的知识中获取，这个问题不在该实验范围内。可把问答范围切回「全部实验」再问。`
          : `当前问答覆盖 ${PROTOCOL_KB.PROTOCOLS.length} 个 SOP、${REAGENTS.length} 种试剂与 ${Object.keys(KB.EXPERIMENT_TYPES).length} 类实验的诊断阈值，超出范围的内容不会猜测作答。`),
        list('可以换个问法，例如', (scopedProtocol
          ? [`${scopedProtocol.name}的关键质控指标是什么？`, `${scopedProtocol.name}第 1 步要注意什么？`, `${scopedProtocol.name}容易出错的地方有哪些？`]
          : QUICK_QUESTIONS.slice(0, 4)).map(x => x)),
        note('也可以先在「实验知识库」里选中相关实验，再问「第 N 步要注意什么」。')
      ],
      sources: [],
      followups: QUICK_QUESTIONS.slice(0, 3),
      confidence: 'low'
    });
  }

  const primary = scored[0].doc;
  const primaryScore = scored[0].score;
  let blocks;
  let sources = [];
  let topic = null;
  let contextNext = null;
  let headline = '';

  if (primary.kind === 'step') {
    const { protocol, step } = primary.meta;
    blocks = stepAnswer(step, protocol, intent, reagentHit ? reagentHit.reagent : null);
    headline = `${protocol.name} · 第 ${step.no} 步「${step.title}」`;
    sources = [{ label: headline, protocolId: protocol.id, stepNo: step.no }];
    topic = protocol.name;
    contextNext = protocol.id;
  } else if (primary.kind === 'reagent') {
    blocks = reagentAnswer(primary.meta.reagent, intent);
    headline = primary.meta.reagent.name;
    const related = relatedStepsOfReagent(primary.meta.reagent).slice(0, 3);
    sources = related.map(r => ({
      label: `${r.protocol.name} · 第 ${r.step.no} 步「${r.step.title}」`,
      protocolId: r.protocol.id, stepNo: r.step.no
    }));
    contextNext = related[0] ? related[0].protocol.id : null;
    topic = related[0] ? related[0].protocol.name : null;
  } else if (primary.kind === 'overview') {
    const p = primary.meta.protocol;
    blocks = protocolAnswer(p, intent === 'general' ? 'how' : intent);
    headline = p.name;
    sources = [{ label: `${p.name}（完整 SOP）`, protocolId: p.id, stepNo: null }];
    topic = p.name;
    contextNext = p.id;
  } else if (primary.kind === 'spec') {
    const { protocol, spec } = primary.meta;
    blocks = specAnswer(protocol, spec);
    headline = `${protocol.name} · ${spec.label}`;
    sources = [{ label: headline, protocolId: protocol.id, stepNo: null }];
    topic = protocol.name;
    contextNext = protocol.id;
  } else if (primary.kind === 'metric') {
    blocks = metricAnswer(primary.meta.type, primary.meta.metric);
    headline = `${primary.meta.type.name} · ${primary.meta.metric.label}`;
    const p = protocolOfType(primary.meta.type.id);
    if (p) {
      sources = [{ label: `${p.name}（相关 SOP）`, protocolId: p.id, stepNo: null }];
      topic = p.name;
      contextNext = p.id;
    }
  } else {
    blocks = ruleAnswer(primary.meta.type, primary.meta.rule);
    headline = `${primary.meta.type.name} · ${primary.meta.rule.title}`;
    const p = protocolOfType(primary.meta.type.id);
    if (p) {
      sources = [{ label: `${p.name}（相关 SOP）`, protocolId: p.id, stepNo: null }];
      topic = p.name;
      contextNext = p.id;
    }
  }

  /* 补充其他相关条目（去重、限 3 条） */
  const extras = scored.slice(1)
    .filter(x => x.score >= primaryScore * 0.62)
    .filter(x => {
      const m = x.doc.meta;
      if (primary.kind === 'step' && x.doc.kind === 'step') {
        return !(m.protocol.id === primary.meta.protocol.id && m.step.no === primary.meta.step.no);
      }
      return true;
    })
    .slice(0, 3);
  if (extras.length) {
    blocks.push(list('可能也相关', extras.map(x => {
      const m = x.doc.meta;
      if (x.doc.kind === 'step') return `${m.protocol.name} · 第 ${m.step.no} 步「${m.step.title}」`;
      if (x.doc.kind === 'spec') return `${m.protocol.name} · 质控指标 ${m.spec.label}`;
      if (x.doc.kind === 'reagent') return `试剂：${m.reagent.name}`;
      if (x.doc.kind === 'metric') return `${m.type.name} · 指标 ${m.metric.label}`;
      if (x.doc.kind === 'overview') return `${m.protocol.name}（实验概览）`;
      return m.rule.title;
    })));
    for (const x of extras) {
      if (x.doc.kind === 'step' && sources.length < 4) {
        const m = x.doc.meta;
        sources.push({ label: `${m.protocol.name} · 第 ${m.step.no} 步「${m.step.title}」`, protocolId: m.protocol.id, stepNo: m.step.no });
      }
    }
  }

  const margin = scored.length > 1 ? primaryScore / (scored[1].score || 1) : 2;
  const confidence = primaryScore >= 9 && margin >= 1.2 ? 'high' : primaryScore >= 5 ? 'medium' : 'low';

  const followups = primary.kind === 'step'
    ? buildFollowups(primary.meta.protocol, primary.meta.step, intent)
    : (topic ? [`${topic} 最容易出错的步骤是哪些？`, `${topic} 的关键质控指标是什么？`] : QUICK_QUESTIONS.slice(0, 3));

  const result = finalize({ question, intent, headline, blocks, sources, followups, confidence, topic, contextNext });
  if (opts.debug) {
    result.debug = scored.slice(0, 6).map(x => ({ kind: x.doc.kind, title: x.doc.title, score: Number(x.score.toFixed(2)) }));
  }
  return result;
}

function buildFollowups(protocol, step, intent) {
  const out = [];
  if (intent !== 'pitfall') out.push(`第 ${step.no} 步最容易出错的地方是什么？`);
  if (intent !== 'param') out.push(`第 ${step.no} 步的关键参数是多少？`);
  if (intent !== 'criteria') out.push(`怎么判断第 ${step.no} 步做合格了？`);
  const next = protocol.steps.find(s => s.no === step.no + 1);
  if (next) out.push(`${next.title} 这一步要注意什么？`);
  return out.slice(0, 3);
}

function finalize(ans) {
  return {
    question: ans.question,
    intent: ans.intent,
    intentLabel: INTENT_LABEL[ans.intent] || '综合说明',
    headline: ans.headline,
    topic: ans.topic || null,
    blocks: ans.blocks,
    sources: dedupeSources(ans.sources || []),
    followups: (ans.followups || []).filter(Boolean).slice(0, 3),
    confidence: ans.confidence || 'medium',
    context: { protocolId: ans.contextNext || (ans.sources && ans.sources[0] && ans.sources[0].protocolId) || null },
    engine: { docs: DOCS.length, mode: '知识库检索 · 本地规则' }
  };
}

function dedupeSources(sources) {
  const seen = new Set();
  const out = [];
  for (const s of sources) {
    const key = s.protocolId + '#' + (s.stepNo == null ? '' : s.stepNo);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out.slice(0, 5);
}

function suggestions() {
  buildIndex();
  const protocols = PROTOCOL_KB.listProtocols();
  return {
    quick: QUICK_QUESTIONS,
    protocols,
    coverage: {
      protocols: protocols.length,
      steps: protocols.reduce((n, p) => n + p.stepCount, 0),
      reagents: REAGENTS.length,
      experimentTypes: Object.keys(KB.EXPERIMENT_TYPES).length,
      docs: DOCS.length
    }
  };
}

module.exports = { ask, suggestions };

/**
 * 由 recipes/*.js 配方生成完整 SOP 模块、诊断知识库扩展与试剂词条。
 * 生成结果写入 lib/protocols/、lib/knowledge-base-extra.js、lib/reagent-glossary-extra.js，
 * 并自动注册到 protocols/index.js。请勿手工编辑生成文件。
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RECIPE_FILES = [
  'recipes-upstream.js',
  'recipes-downstream.js',
  'recipes-analytical.js',
  'recipes-molecular.js',
  'recipes-micro-qc.js',
  'recipes-supplement-a.js',
  'recipes-supplement-b.js'
];

const recipes = [];
for (const f of RECIPE_FILES) {
  const p = path.join(ROOT, 'recipes', f);
  const items = require(p);
  if (!Array.isArray(items)) throw new Error(f + ' 未导出数组');
  recipes.push(...items);
}

// 与已有条目核对，防止 id 冲突
const KB = require(path.join(ROOT, 'lib', 'knowledge-base.js'));
const { PROTOCOLS } = require(path.join(ROOT, 'lib', 'protocol-knowledge.js'));
const { REAGENTS } = require(path.join(ROOT, 'lib', 'reagent-glossary.js'));
// 由本脚本生成过的类型不算冲突（否则无法重复执行）
let generatedTypeIds = new Set();
try {
  generatedTypeIds = new Set(Object.keys(require(path.join(ROOT, 'lib', 'knowledge-base-extra.js')).EXPERIMENT_EXTRA));
} catch (e) { /* 首次生成时还没有扩展文件 */ }
let generatedReagentIds = new Set();
try {
  generatedReagentIds = new Set(require(path.join(ROOT, 'lib', 'reagent-glossary-extra.js')).map(x => x.id));
} catch (e) { /* 首次生成时还没有扩展文件 */ }
const usedTypeIds = new Set(Object.keys(KB.EXPERIMENT_TYPES).filter(id => !generatedTypeIds.has(id)));
const usedProtocolIds = new Set(PROTOCOLS.map(p => p.id));
const usedReagentIds = new Set();   // 已有词条允许复用，这里只检查配方之间的重复
const seen = new Set();

const errors = [];
for (const r of recipes) {
  if (seen.has(r.id)) errors.push('重复配方 id: ' + r.id);
  seen.add(r.id);
  if (usedTypeIds.has(r.id)) errors.push('类型 id 与已有冲突: ' + r.id);
  if (!r.n || !r.c || !r.p || !r.a || !r.i || !r.o) errors.push(r.id + ' 缺少描述字段');
  if (!Array.isArray(r.st) || r.st.length !== 8) errors.push(r.id + ' 步骤数不是 8');
  if (!Array.isArray(r.m) || r.m.length < 4) errors.push(r.id + ' 指标少于 4 个');
  if (!Array.isArray(r.r) || r.r.length < 3) errors.push(r.id + ' 规则少于 3 条');
  for (const s of r.st || []) {
    if (!Array.isArray(s) || s.length !== 6) errors.push(r.id + ' 步骤字段数不是 6: ' + (s && s[1]));
  }
  const keys = new Set((r.m || []).map(m => m[0]));
  if (keys.size !== (r.m || []).length) errors.push(r.id + ' 指标 key 重复');
  for (const rule of r.r || []) {
    if (!['low', 'high', 'outside', 'enum', 'combo'].includes(rule[5])) errors.push(r.id + ' 规则类型非法: ' + rule[5]);
    if (!['critical', 'high', 'medium', 'low'].includes(rule[3])) errors.push(r.id + ' 严重度非法: ' + rule[3]);
    if (rule[5] === 'combo') {
      const parts = String(rule[6]).split('+');
      if (parts.length !== 2 || parts.some(k => !keys.has(k))) errors.push(r.id + ' combo 指标无效: ' + rule[6]);
    } else if (!keys.has(rule[6])) {
      errors.push(r.id + ' 规则引用不存在指标: ' + rule[6]);
    }
  }
  for (const g of r.g || []) {
    if (usedReagentIds.has(g[0])) errors.push(r.id + ' 试剂 id 与已有冲突: ' + g[0]);
    usedReagentIds.add(g[0]);
  }
}
if (errors.length) {
  console.error('配方校验失败:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('配方校验通过：' + recipes.length + ' 个新实验');

const pad = (s, n) => String(s).padEnd(n, ' ');
const q = s => JSON.stringify(String(s == null ? '' : s));
const list = (arr) => (arr || []).map(x => q(x)).join(', ');

/* ---------- 1. 生成 SOP 模块 ---------- */
const protocolDir = path.join(ROOT, 'lib', 'protocols');
function genProtocol(r) {
  const steps = r.st.map((s, i) => {
    const [phase, title, summary, why, param, pitfallText] = s;
    const params = String(param).split(/[；;]/).map(x => x.trim()).filter(Boolean);
    const paramObjs = params.map(p => `        { label: ${q(p.split(/[:：]/)[0] || '参数')}, value: ${q(p)} }`).join(',\n');
    const substeps = String(summary).split(/[；;]/).map(x => x.trim()).filter(Boolean);
    const subArr = substeps.map(x => '        ' + q(x)).join(',\n');
    const pitfallParts = String(pitfallText).split(/[:：]/);
    const pitfallTitle = pitfallParts[0] || '操作偏离 SOP';
    const pitfallCons = pitfallParts.slice(1).join('：') || '结果偏差或实验失败';
    return `    {
      no: ${i + 1},
      phase: ${q(phase)},
      title: ${q(title)},
      purpose: ${q(why)},
      summary: ${q(summary)},
      detail: ${q(String(summary).replace(/[。；;，,\s]+$/, '') + '。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。')},
      substeps: [
${subArr},
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
${paramObjs}
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: ${q(pitfallTitle)}, consequence: ${q(pitfallCons)}, fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }`;
  }).join(',\n');

  const specs = r.sp.map(s => `    { label: ${q(s[0])}, value: ${q(s[1])}, note: ${q(s[2])} }`).join(',\n');
  return `'use strict';

module.exports = {
  id: ${q(r.id)},
  name: ${q(r.n)},
  category: ${q(r.c)},
  short: ${q(r.s)},
  overview: {
    principle: ${q(r.p)},
    application: ${q(r.a)},
    input: ${q(r.i)},
    output: ${q(r.o)},
    duration: ${q(r.d)},
    yield: ${q(r.y)}
  },
  keySpecs: [
${specs}
  ],
  steps: [
${steps}
  ],
  references: [
    ${q(r.n + ' 通用实验 SOP')},
    '公开药典指导原则与行业通用技术资料'
  ]
};
`;
}
for (const r of recipes) {
  fs.writeFileSync(path.join(protocolDir, r.id + '.js'), genProtocol(r), 'utf8');
}

// 注册到 protocols/index.js（若尚未注册）
const indexPath = path.join(protocolDir, 'index.js');
let indexSrc = fs.readFileSync(indexPath, 'utf8');
let addedIndex = [];
for (const r of recipes) {
  const line = `  require('./${r.id}'),`;
  if (!indexSrc.includes(line)) addedIndex.push(line);
}
if (addedIndex.length) {
  // 原文件最后一个 require 可能没有逗号，补齐后再插入
  indexSrc = indexSrc.replace(/(\n\s*require\('[^']+'\))(\s*\n\];)/, '$1,$2');
  const pos = indexSrc.lastIndexOf('];');
  indexSrc = indexSrc.slice(0, pos) + addedIndex.join('\n') + '\n' + indexSrc.slice(pos);
  fs.writeFileSync(indexPath, indexSrc, 'utf8');
}

/* ---------- 2. 生成诊断知识库扩展 ---------- */
function genMetric(m) {
  const [key, label, unit, lo, hi, critLo, critHi, note] = m;
  const isEnum = typeof lo === 'string' && typeof hi === 'string';
  if (isEnum) {
    return `    { key: ${q(key)}, label: ${q(label)}, unit: ${q(unit)}, type: 'enum', options: [${q(lo)}, ${q(hi)}], expected: ${q(lo)}, note: ${q(note)} }`;
  }
  return `    { key: ${q(key)}, label: ${q(label)}, unit: ${q(unit)}, type: 'number', normal: [${lo}, ${hi}], ` +
    (critLo !== null && critLo !== undefined ? `criticalLow: ${critLo}, ` : '') +
    (critHi !== null && critHi !== undefined ? `criticalHigh: ${critHi}, ` : '') +
    `note: ${q(note)} }`;
}
function genCondition(rule, metrics) {
  const type = rule[5], key = rule[6];
  if (type === 'combo') {
    const [a, b] = String(key).split('+');
    return `        condition: { type: 'combo', all: [{ type: 'low', metric: ${q(a)} }, { type: 'high', metric: ${q(b)} }] },`;
  }
  const m = metrics.find(x => x[0] === key);
  const condType = type === 'enum' ? 'enum' : type;
  // 枚举规则默认以「非期望值」为触发条件（异常结果），可用规则第 10 个元素显式指定
  const trigger = rule[9] && String(rule[9]).trim() ? rule[9] : (m && m[4] !== m[3] ? m[4] : (m ? m[3] : ''));
  return `        condition: { type: ${q(condType)}, metric: ${q(key)}${type === 'enum' ? `, value: ${q(trigger)}` : ''} },`;
}
function genType(r) {
  const metricsSrc = r.m.map(genMetric).join(',\n');
  const rulesSrc = r.r.map(rule => {
    const causes = String(rule[7]).split(';').map(x => q(x.trim())).join(', ');
    const actions = String(rule[8]).split(';').map(x => q(x.trim())).join(', ');
    return `      {
        id: ${q(rule[0])}, title: ${q(rule[1])}, category: ${q(rule[2])}, severity: ${q(rule[3])}, likelihood: ${rule[4]},
${genCondition(rule, r.m)}
        causes: [${causes}],
        actions: [${actions}]
      }`;
  }).join(',\n');
  return `  ${r.id}: {
    id: ${q(r.id)},
    name: ${q(r.n)},
    category: ${q(r.c)},
    description: ${q(r.s)},
    objective: ${q('评估' + r.n + '的关键指标与方法有效性，识别异常并给出排查方向。')},
    metrics: [
${metricsSrc}
    ],
    rules: [
${rulesSrc}
    ]
  }`;
}

const extraTypes = recipes.map(genType).join(',\n');
const optionalExtra = recipes.map(r => `  ${r.id}: [${list(r.optional || [])}]`).join(',\n');
fs.writeFileSync(path.join(ROOT, 'lib', 'knowledge-base-extra.js'),
  `'use strict';\n\n/** 由 recipes/*.js 生成，请勿手工编辑。 */\nmodule.exports = {\n  EXPERIMENT_EXTRA: {\n${extraTypes}\n  },\n  OPTIONAL_EXTRA: {\n${optionalExtra}\n  }\n};\n`, 'utf8');

/* ---------- 3. 生成试剂词条扩展 ---------- */
const reagentLines = [];
for (const r of recipes) {
  for (const g of r.g || []) {
    const [id, name, aliases, category, fn, composition, notes, storage] = g;
    // 手写词条（如 BCA 试剂盒、DTT）继续复用；上一轮由本脚本生成的词条需重新生成
    if (REAGENTS.some(x => x.id === id) && !generatedReagentIds.has(id)) continue;
    reagentLines.push(`  {\n    id: ${q(id)},\n    name: ${q(name)},\n    aliases: [${list(String(aliases).split(/[,，]/).map(x => x.trim()).filter(Boolean))}],\n    category: ${q(category)},\n    function: ${q(fn)},\n    composition: ${q(composition)},\n    notes: ${q(notes)},\n    storage: ${q(storage)}\n  }`);
  }
}
fs.writeFileSync(path.join(ROOT, 'lib', 'reagent-glossary-extra.js'),
  `'use strict';\n\n/** 由 recipes/*.js 生成，请勿手工编辑。 */\nmodule.exports = [\n${reagentLines.join(',\n')}\n];\n`, 'utf8');

console.log('已生成：SOP ' + recipes.length + ' 个、诊断类型 ' + recipes.length + ' 个、试剂 ' + reagentLines.length + ' 种');

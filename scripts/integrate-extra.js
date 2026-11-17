/**
 * 把生成的扩展知识库接入主文件（幂等，可重复执行）。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// 1. knowledge-base.js：在 core 标记循环前合并扩展类型与可选指标映射
const kbPath = path.join(root, 'lib', 'knowledge-base.js');
let kb = fs.readFileSync(kbPath, 'utf8');
if (!kb.includes("require('./knowledge-base-extra')")) {
  const anchor = 'for (const type of Object.values(EXPERIMENT_TYPES)) {';
  if (!kb.includes(anchor)) throw new Error('找不到 knowledge-base.js 的 core 标记循环');
  const inject = `// 由 recipes/*.js 生成的 50 类扩展实验，自动并入主知识库\nconst EXTRA = require('./knowledge-base-extra');\nObject.assign(EXPERIMENT_TYPES, EXTRA.EXPERIMENT_EXTRA);\nObject.assign(OPTIONAL_METRICS, EXTRA.OPTIONAL_EXTRA);\n\n`;
  kb = kb.replace(anchor, inject + anchor);
  fs.writeFileSync(kbPath, kb, 'utf8');
  console.log('已接入 knowledge-base-extra');
} else {
  console.log('knowledge-base-extra 已接入，跳过');
}

// 2. reagent-glossary.js：导出前追加扩展词条
const rgPath = path.join(root, 'lib', 'reagent-glossary.js');
let rg = fs.readFileSync(rgPath, 'utf8');
if (!rg.includes("require('./reagent-glossary-extra')")) {
  const anchor = 'module.exports = { REAGENTS };';
  if (!rg.includes(anchor)) throw new Error('找不到 reagent-glossary.js 的导出语句');
  rg = rg.replace(anchor, "// 由 recipes/*.js 生成的扩展试剂词条\nREAGENTS.push(...require('./reagent-glossary-extra'));\n\n" + anchor);
  fs.writeFileSync(rgPath, rg, 'utf8');
  console.log('已接入 reagent-glossary-extra');
} else {
  console.log('reagent-glossary-extra 已接入，跳过');
}

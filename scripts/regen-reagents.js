/** 只重建试剂扩展文件（用于生成器重复运行后恢复被覆盖的词条）。 */
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const files = ['recipes-upstream.js', 'recipes-downstream.js', 'recipes-analytical.js', 'recipes-molecular.js', 'recipes-micro-qc.js'];
const recipes = files.flatMap(f => require(path.join(root, 'recipes', f)));
const { REAGENTS } = require(path.join(root, 'lib', 'reagent-glossary.js'));   // 此时应为 74 种基础词条
const q = s => JSON.stringify(String(s == null ? '' : s));
const seen = new Set(REAGENTS.map(r => r.id));
const lines = [];
for (const r of recipes) {
  for (const g of r.g || []) {
    const [id, name, aliases, category, fn, composition, notes, storage] = g;
    if (seen.has(id)) continue;
    seen.add(id);
    lines.push(`  {\n    id: ${q(id)},\n    name: ${q(name)},\n    aliases: [${String(aliases).split(/[,，]/).map(x => q(x.trim())).filter(x => x !== '""').join(', ')}],\n    category: ${q(category)},\n    function: ${q(fn)},\n    composition: ${q(composition)},\n    notes: ${q(notes)},\n    storage: ${q(storage)}\n  }`);
  }
}
fs.writeFileSync(path.join(root, 'lib', 'reagent-glossary-extra.js'),
  `'use strict';\n\n/** 由 recipes/*.js 生成，请勿手工编辑。 */\nmodule.exports = [\n${lines.join(',\n')}\n];\n`, 'utf8');
console.log('重建试剂词条', lines.length, '种；总基数', REAGENTS.length + lines.length);

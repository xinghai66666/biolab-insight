'use strict';

/**
 * 实验操作知识库扩展模块
 * 每个文件导出一个完整 protocol 对象，结构见 protocol-knowledge.js。
 */
module.exports = [
  require('./cell-culture-passage'),
  require('./cell-cryopreservation'),
  require('./mycoplasma-pcr'),
  require('./protein-purification-ni-nta'),
  require('./sds-page-coomassie'),
  require('./western-blot'),
  require('./qpcr-sybr-green'),
  require('./elisa-sandwich'),
  require('./sterility-test-membrane'),
  require('./dna-gel-extraction'),
  require('./e-coli-transformation'),
  require('./endotoxin-lal-gel-clot')
];

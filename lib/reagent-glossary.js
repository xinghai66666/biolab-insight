/**
 * BioLab Insight · 试剂知识卡
 * ------------------------------------------------------------
 * 与实验操作知识库配合使用：当步骤文本中出现试剂名称时，前端显示可悬停的小卡片。
 * 内容为通用参考信息，具体配方、浓度与储存条件以所用试剂盒说明书和实验室 SOP 为准。
 */

'use strict';

const REAGENTS = [
  {
    id: 'p1',
    name: 'P1 重悬液',
    aliases: ['P1'],
    category: '质粒提取缓冲液',
    function: '重悬菌体；EDTA 螯合 Mg²⁺ 抑制核酸酶，RNase A 降解 RNA。',
    composition: 'Tris-HCl、EDTA、RNase A（具体配方随试剂盒）',
    notes: '使用前确认已加入 RNase A；2–8 °C 保存，避免反复冻融。',
    storage: '2–8 °C'
  },
  {
    id: 'p2',
    name: 'P2 裂解液',
    aliases: ['P2'],
    category: '碱性裂解液',
    function: 'NaOH 使染色体 DNA 与蛋白变性，SDS 裂解细胞膜并溶解蛋白；超螺旋质粒可在中和后复性。',
    composition: '典型 0.2 M NaOH + 1% SDS',
    notes: '有腐蚀性，戴手套；裂解时间 ≤5 min，禁止涡旋；出现沉淀或吸收 CO₂ 后弃用。',
    storage: '室温密闭'
  },
  {
    id: 'n3',
    name: 'N3 中和液',
    aliases: ['N3', '中和液'],
    category: '中和/沉淀缓冲液',
    function: '将 pH 降至约 5.5，使质粒复性；钾离子与 SDS 形成不溶沉淀，携裹基因组 DNA、蛋白和碎片。',
    composition: '典型 3 M 醋酸钾，pH 5.5',
    notes: '预冷使用；加液后立即轻柔颠倒，避免局部碱性导致质粒不可逆变性。',
    storage: '4 °C 预冷'
  },
  {
    id: 'rnase_a',
    name: 'RNase A',
    aliases: ['RNase A'],
    category: '酶',
    function: '降解 RNA，避免 RNA 污染导致 A260/A280 虚高和定量偏差。',
    composition: '牛胰核糖核酸酶 A',
    notes: '热不稳定；按说明书加入 P1，2–8 °C 保存，避免反复冻融；失效时会出现 RNA 拖尾。',
    storage: '2–8 °C（按试剂盒）'
  },
  {
    id: 'wash_buffer',
    name: '漂洗液',
    aliases: ['漂洗液'],
    category: '洗涤缓冲液',
    function: '去除吸附在硅胶膜上的盐、蛋白、乙醇和有机物。',
    composition: '含乙醇的洗涤缓冲液（配方随试剂盒）',
    notes: '首次使用前按标注加入无水乙醇；未加乙醇会导致 A260/A230 偏低和盐残留。',
    storage: '室温（加乙醇后按说明）'
  },
  {
    id: 'ethanol',
    name: '无水乙醇',
    aliases: ['无水乙醇', '乙醇'],
    category: '有机溶剂',
    function: '提高洗涤液极性，帮助去除盐和有机物；也用于沉淀 DNA。',
    composition: '乙醇 ≥99.5%',
    notes: '易燃，远离火源；按说明书定量加入漂洗液，不要直接用于柱洗脱。',
    storage: '室温密闭、防火'
  },
  {
    id: 'eb',
    name: 'EB 洗脱液',
    aliases: ['EB'],
    category: '洗脱缓冲液',
    function: '低盐、弱碱性条件使 DNA 从硅胶膜释放。',
    composition: '典型 10 mM Tris-HCl，pH 8.5',
    notes: '使用无核酸酶级别；pH 偏低会降低洗脱效率；可预热至 50–60 °C 提高回收。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'endotoxin_removal',
    name: '内毒素去除液',
    aliases: ['内毒素去除液', '去蛋白液'],
    category: '内毒素清除试剂',
    function: '通过去蛋白/相分离或专用基质结合 LPS，降低质粒内毒素水平。',
    composition: '随试剂盒不同（如含 Triton X-114 的去蛋白液）',
    notes: '严格按说明书控制体积、温度和时间；转染级样品建议重复处理并用 LAL 验证。',
    storage: '按说明书'
  },
  {
    id: 'triton_x114',
    name: 'Triton X-114',
    aliases: ['Triton X-114'],
    category: '非离子去污剂',
    function: '在相分离条件下富集并去除脂多糖（LPS），常用于内毒素清除。',
    composition: '非离子表面活性剂',
    notes: '有刺激性；按试剂盒/方法学控制温度和相分离步骤，避免残留影响下游。',
    storage: '室温'
  },
  {
    id: 'agarose',
    name: '琼脂糖',
    aliases: ['琼脂糖'],
    category: '电泳基质',
    function: '形成凝胶网络，按分子大小和拓扑结构分离 DNA。',
    composition: '琼脂糖粉 + 1× TAE',
    notes: '0.8–1% 适合质粒；加热溶解时防暴沸；凝胶完全凝固后再上样。',
    storage: '室温干燥'
  },
  {
    id: 'tae',
    name: '1× TAE 电泳缓冲液',
    aliases: ['1× TAE', 'TAE'],
    category: '电泳缓冲液',
    function: '维持电泳体系 pH 和离子强度，保证 DNA 迁移稳定。',
    composition: 'Tris-乙酸-EDTA',
    notes: '使用 1× 工作液；反复使用会导致 pH 和离子强度变化，建议定期更换。',
    storage: '室温'
  },
  {
    id: 'nucleic_dye',
    name: '核酸染料',
    aliases: ['核酸染料'],
    category: '荧光染料',
    function: '嵌入 DNA 后发出荧光，用于凝胶成像观察条带。',
    composition: '如 GelRed、SYBR Safe 等（按实验室选择）',
    notes: '按产品说明操作，戴手套；避免污染扩增实验区域。',
    storage: '按产品说明，避光'
  },
  {
    id: 'loading_buffer',
    name: 'Loading Buffer',
    aliases: ['Loading Buffer'],
    category: '上样缓冲液',
    function: '增加样品密度、提供指示染料，便于上样并跟踪电泳前沿。',
    composition: '甘油、指示染料、缓冲盐（配方随产品）',
    notes: '按凝胶类型选择；含 SDS 的配方可能影响质粒拓扑结构判断，优先用非变性上样液。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'dna_marker',
    name: 'DNA Marker',
    aliases: ['DNA Marker'],
    category: '分子量标准',
    function: '提供已知大小的 DNA 条带，用于估计样品大小和判断分离度。',
    composition: '已知长度的 DNA 片段混合物',
    notes: '与样品使用相同凝胶和缓冲液；上样量按说明书，避免过亮掩盖弱带。',
    storage: '2–8 °C 或 -20 °C（按产品）'
  },
  {
    id: 'lal',
    name: '鲎试剂（LAL）',
    aliases: ['鲎试剂', 'LAL'],
    category: '内毒素检测试剂',
    function: '与细菌内毒素反应形成凝胶或产生浊度/颜色变化，用于定量或限度检查。',
    composition: '鲎阿米巴细胞溶解物',
    notes: '无内毒素操作；按说明书复溶和孵育；设阴性/阳性对照，注意样品基质干扰。',
    storage: '按产品说明，通常 2–8 °C'
  },
  {
    id: 'endotoxin_free_water',
    name: '无内毒素水',
    aliases: ['无内毒素水'],
    category: '无内毒素稀释剂',
    function: '用于复溶、稀释和阴性对照，避免引入外源内毒素。',
    composition: '无内毒素级纯水',
    notes: '专用耗材取用，避免与普通纯水混用；开瓶后按实验室规定有效期。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'lb',
    name: '低内毒素 LB 培养基',
    aliases: ['低内毒素 LB', 'LB'],
    category: '培养基',
    function: '支持大肠杆菌生长并维持质粒选择压力。',
    composition: 'LB + 对应抗生素（按实验）',
    notes: '抗生素现用现加；避免菌液过度培养；内毒素本底高的培养基会影响后续结果。',
    storage: '2–8 °C（配好后的培养基）'
  }
];

module.exports = { REAGENTS };

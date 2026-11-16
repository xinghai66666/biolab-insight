/**
 * BioLab Insight · 实验操作知识库（Protocol Knowledge Base）
 * ------------------------------------------------------------
 * 与诊断知识库（knowledge-base.js）分开：本文件记录「标准操作步骤」，
 * 每步含：操作、作用、可展开的细节、易失误点（含后果与规避）。
 *
 * 数据来源与免责声明：
 * - 步骤与参数依据公开药典指导原则、试剂盒说明书与行业通用 SOP 整理，
 *   为通用参考流程，用于演示与培训，不替代具体试剂盒说明书或实验室 SOP。
 * - 具体体积、离心力、时间以所用试剂盒与仪器为准。
 */

'use strict';

const PROTOCOLS = [
  {
    id: 'endofree_plasmid_miniprep',
    name: '无内毒素质粒小提（含浓度与纯度检测）',
    category: '分子生物学 · 质粒制备',
    short: '碱裂解法 + 吸附柱 + 内毒素清除，适用于转染级质粒制备',
    overview: {
      principle: '碱裂解法：SDS/NaOH 使菌体裂解、染色体 DNA 与蛋白变性，超螺旋质粒 DNA 可逆解链；中和后质粒复性、杂质沉淀，经硅胶膜吸附柱纯化并用内毒素清除剂去除 LPS。',
      application: '高拷贝质粒的小量制备，产物用于酶切、PCR、测序、克隆及细胞转染等对内毒素敏感的实验。',
      input: '1–5 mL 过夜大肠杆菌培养液（建议 OD600 2–4，使用含对应抗生素的低内毒素培养基）',
      output: '转染级质粒 DNA，溶于 EB 或无菌水',
      duration: '约 30–60 min（含检测）',
      yield: '高拷贝质粒约 10–25 µg / 3 mL 菌液（随拷贝数、宿主与菌液浓度变化）'
    },
    keySpecs: [
      { label: '浓度（常规）', value: '0.5–2 µg/µL', note: '高浓度可达 3 µg/µL，取决于洗脱体积' },
      { label: 'A260/A280', value: '1.8–2.0', note: '反映蛋白污染；偏低提示蛋白/酚残留' },
      { label: 'A260/A230', value: '≥ 2.0（2.0–2.2）', note: '反映盐、乙醇、有机物残留' },
      { label: '内毒素（转染级）', value: '< 0.1 EU/µg DNA', note: '常规小提为 0.1–5 EU/µg，不能用于敏感转染' },
      { label: '超螺旋比例', value: '> 80–90%', note: '琼脂糖凝胶电泳评估完整性' }
    ],
    steps: [
      {
        no: 1,
        phase: '培养与收菌',
        title: '菌液培养与收集',
        purpose: '获得足量含质粒的菌体，为裂解提供起始材料。',
        detail: '挑取单克隆接种于含对应抗生素的 LB（推荐低内毒素/无动物源培养基），37 °C、约 220 rpm 振荡过夜 12–16 h 至 OD600 约 2–4。取 1–5 mL 菌液，≥10,000 g 离心约 1 min 收集沉淀，尽量吸净上清。',
        pitfalls: [
          { level: 'medium', title: '培养基或抗生素不当', consequence: '质粒丢失、杂菌生长、内毒素本底升高', fix: '使用含正确抗生素的低内毒素培养基，避免菌液老化过度（>16 h）' },
          { level: 'low', title: '上清未吸净', consequence: '残留培养基稀释后续裂解体系，影响裂解效率', fix: '离心后沿管壁吸净上清，勿扰动菌块' }
        ]
      },
      {
        no: 2,
        phase: '裂解',
        title: '重悬（P1，含 RNase A）',
        purpose: '将菌体均匀分散，并使 RNase A 降解 RNA，避免 RNA 污染。',
        detail: '加入约 250 µL 重悬液 P1（含 RNase A，典型 100 µg/mL），充分涡旋或反复吹打至菌体完全分散、无可见团块。含 RNase A 的重悬液应 2–8 °C 保存。',
        pitfalls: [
          { level: 'high', title: '重悬不充分、存在团块', consequence: '裂解不均、质粒产量低且批间差大', fix: '涡旋至悬液呈均匀浑浊、无团块后再进行裂解' },
          { level: 'medium', title: 'RNase A 失效或漏加', consequence: '产物 RNA 污染严重，A260/A280 虚高、定量不准', fix: '确认 RNase A 在有效期内，按说明书补加' }
        ]
      },
      {
        no: 3,
        phase: '裂解',
        title: '碱裂解（P2，NaOH + SDS）',
        purpose: 'SDS 破坏细胞膜并使蛋白变性，NaOH 使染色体 DNA 与蛋白变性；超螺旋质粒 DNA 结构可变性但可复性，从而与基因组 DNA 分离。',
        detail: '加入约 250 µL 裂解液 P2（典型 0.2 M NaOH + 1% SDS），轻柔颠倒混匀 4–6 次，室温静置 ≤5 min，溶液应由浑浊变为澄清黏稠。',
        pitfalls: [
          { level: 'critical', title: '剧烈涡旋或裂解超过 5 min', consequence: '基因组 DNA 断裂污染、质粒发生不可逆变性，产量与纯度显著下降', fix: '只轻柔颠倒混匀，严格计时，裂解时间不要超过 5 min' },
          { level: 'high', title: '裂解液失效（NaOH/SDS 吸收 CO₂ 或沉淀）', consequence: '裂解不完全、菌块残留、产量低', fix: '裂解液常温密闭保存、减少与空气接触，出现沉淀丢弃不用' }
        ]
      },
      {
        no: 4,
        phase: '裂解',
        title: '中和（3 M 醋酸钾 pH 5.5）',
        purpose: '降低 pH 使质粒 DNA 复性，同时钾离子与 SDS 形成不溶沉淀，携裹基因组 DNA、蛋白与细胞碎片。',
        detail: '加入约 350 µL 预冷中和液（典型 3 M 醋酸钾，pH 5.5），立即轻柔颠倒混匀，冰浴约 5 min；溶液由黏稠澄清转为出现白色絮状沉淀。',
        pitfalls: [
          { level: 'high', title: '混匀不充分', consequence: '局部仍为碱性，质粒不可逆变性、盐与蛋白残留', fix: '加液后立即轻柔但充分颠倒至白色沉淀均匀出现' },
          { level: 'medium', title: '中和液 pH 偏离', consequence: 'pH 过高质粒不复性、过低杂质沉淀不完全', fix: '使用配方合格的中和液，pH 控制在约 5.5' }
        ]
      },
      {
        no: 5,
        phase: '澄清',
        title: '离心澄清',
        purpose: '去除变性蛋白、基因组 DNA、SDS-钾盐沉淀与细胞碎片，获得含质粒的澄清上清。',
        detail: '≥12,000 g、4 °C 离心约 10 min，小心吸取上清转入新管，避免吸入白色沉淀层。',
        pitfalls: [
          { level: 'high', title: '吸取时扰动沉淀', consequence: '杂质随上清进入吸附柱，堵塞柱膜、纯度下降', fix: '倾斜离心管、沿液面吸取上清，宁可少取勿带入沉淀' },
          { level: 'low', title: '离心温度或时间不足', consequence: '沉淀不紧实、上清浑浊', fix: '按说明书保证离心力、时间与温度' }
        ]
      },
      {
        no: 6,
        phase: '纯化',
        title: '上柱结合',
        purpose: '在高盐/离液盐条件下，质粒 DNA 选择性吸附于硅胶膜，杂质随流出液去除。',
        detail: '将澄清上清转入吸附柱，约 12,000 g 离心约 1 min，弃去流出液；若上清量多可分次上柱。',
        pitfalls: [
          { level: 'medium', title: '上样量超过柱容量', consequence: '质粒穿透流失、产量下降', fix: '按柱子标称载量分批上样，勿一次性超载' },
          { level: 'low', title: '沉淀堵塞柱膜', consequence: '流速慢、纯化不均', fix: '确保上柱前上清澄清' }
        ]
      },
      {
        no: 7,
        phase: '去内毒素（关键）',
        title: '内毒素清除',
        purpose: '特异性去除脂多糖（LPS/内毒素），这是无内毒素质粒与普通小提的核心差异，直接决定能否用于细胞转染。',
        detail: '加入内毒素去除液（如含 Triton X-114 的去蛋白液或专用内毒素清除剂），室温充分作用后离心弃液；对转染级要求高的实验可重复一次。必要时后续用 LAL 法验证。',
        pitfalls: [
          { level: 'critical', title: '省略或作用不足', consequence: '内毒素残留（可达 0.5–5 EU/µg），导致转染效率骤降、细胞毒性或炎症反应', fix: '不要跳过该步，保证试剂浓度、作用时间与温度；敏感用途做 LAL 检测确认 <0.1 EU/µg' },
          { level: 'high', title: '内毒素去除试剂失效或批次差异', consequence: '去除效率不稳定', fix: '使用有效期内的试剂，关键实验做内毒素检测放行' }
        ]
      },
      {
        no: 8,
        phase: '纯化',
        title: '漂洗',
        purpose: '去除残留盐离子、缓冲液组分与有机物。',
        detail: '加约 500 µL 漂洗液，12,000 g 离心约 1 min 弃液；再用约 700 µL 漂洗液重复一次。漂洗液通常需在使用前补加无水乙醇。',
        pitfalls: [
          { level: 'high', title: '漂洗液未补加乙醇', consequence: '盐与杂质无法有效去除，A260/230 偏低', fix: '按说明书在使用前向漂洗液补加指定体积无水乙醇并标记' },
          { level: 'medium', title: '漂洗次数不足', consequence: '盐残留影响下游酶反应', fix: '按说明书完成两次漂洗' }
        ]
      },
      {
        no: 9,
        phase: '纯化',
        title: '干燥',
        purpose: '彻底去除残留乙醇，避免抑制下游酶促反应。',
        detail: '空柱 12,000 g 离心约 2 min，或室温晾干数分钟。',
        pitfalls: [
          { level: 'high', title: '乙醇残留', consequence: 'A260/230 显著偏低，抑制酶切、PCR、测序与转染', fix: '空柱充分离心/晾干，闻到乙醇味应延长干燥' },
          { level: 'medium', title: '过度干燥', consequence: '硅胶膜干裂，DNA 难以洗脱、产量下降', fix: '干燥适度，避免长时间高温烘烤' }
        ]
      },
      {
        no: 10,
        phase: '纯化',
        title: '洗脱',
        purpose: '在低盐、弱碱性条件下使 DNA 从硅胶膜释放，获得质粒溶液。',
        detail: '加 30–50 µL 洗脱液 EB（典型 10 mM Tris-HCl，pH 8.5）或无菌无核酸酶水，室温静置约 2 min 后 12,000 g 离心约 1 min。',
        pitfalls: [
          { level: 'medium', title: '洗脱体积过大或静置不足', consequence: '浓度偏低、产量下降', fix: '需要高浓度时减小洗脱体积并重复单次洗脱，静置 2 min 后再离心' },
          { level: 'medium', title: '洗脱液 pH 偏低或含核酸酶', consequence: '洗脱效率下降或 DNA 降解', fix: '使用 pH 8.0–8.5 的无核酸酶洗脱液' }
        ]
      },
      {
        no: 11,
        phase: '浓度检测',
        title: '浓度与纯度测定（NanoDrop / Qubit）',
        purpose: '定量质粒 DNA 并通过吸光比值评估蛋白、盐与有机物残留。',
        detail: '用 NanDrop 或荧光定量仪测定浓度及 A260/A280、A260/230。判定参考：A260/A280 1.8–2.0，A260/A230 ≥2.0（2.0–2.2），常规浓度 0.5–2 µg/µL。荧光法（Qubit）对低浓度与盐干扰更特异。',
        pitfalls: [
          { level: 'high', title: '未做空白校正或样品有气泡/结晶', consequence: '浓度读数偏差大、比值失真', fix: '用洗脱液作空白，点样前擦净测量面、避免气泡' },
          { level: 'high', title: 'A260/A280 或 A260/230 异常仍直接使用', consequence: '蛋白/盐/乙醇/酚残留，下游实验失败', fix: 'A280 偏高提示蛋白或酚污染，A230 偏低提示盐/乙醇残留，应回溯漂洗与干燥步骤' },
          { level: 'low', title: '仅依赖 NanoDrop 判断低浓度样品', consequence: '定量不准', fix: '低浓度或成分复杂样品改用 Qubit 荧光法' }
        ]
      },
      {
        no: 12,
        phase: '纯度检测',
        title: '琼脂糖凝胶电泳',
        purpose: '确认质粒完整性、拓扑结构与是否存在 RNA/基因组 DNA 污染。',
        detail: '配制 0.8%–1% 琼脂糖凝胶，上样后电泳。高质量质粒以超螺旋条带为主（>80–90%），可见少量开环/线性形式；不应有明显 RNA 拖尾或基因组 DNA 条带。',
        pitfalls: [
          { level: 'medium', title: '上样量过大或电泳时间过长', consequence: '条带拖尾、扩散，无法准确判断拓扑与污染', fix: '控制上样量与电压/时间，选择适宜浓度凝胶' },
          { level: 'medium', title: '出现 RNA 拖尾或多条带', consequence: 'RNase A 失效或基因组 DNA 污染', fix: '回溯重悬步骤 RNase A 与裂解/中和操作' }
        ]
      },
      {
        no: 13,
        phase: '内毒素检测',
        title: '内毒素水平检测（LAL 法）',
        purpose: '验证内毒素清除效果，确认质粒达到转染级要求。',
        detail: '采用鲎试剂法（凝胶法或光度法）检测。转染级质粒通常要求 <0.1 EU/µg DNA；常规小提为 0.1–5 EU/µg。样品若干扰反应需适当稀释后检测。',
        pitfalls: [
          { level: 'critical', title: '未检测即用于敏感转染', consequence: '转染效率低、细胞毒性，实验不可重复', fix: '转染/体内实验前做 LAL 检测确认内毒素达标' },
          { level: 'high', title: '样品基质干扰 LAL 反应', consequence: '假阳性/假阴性', fix: '按方法学要求稀释并做加标回收验证' }
        ]
      }
    ],
    references: [
      '《中国药典》细菌内毒素检查法（L=K/M 限值确定原则）',
      '无内毒素质粒提取试剂盒通用说明书（碱裂解法 P1/P2/中和液体系）',
      '公开行业技术资料：转染级质粒内毒素 <0.1 EU/µg DNA；A260/A280 1.8–2.0；A260/A230 2.0–2.2'
    ]
  }
];

function listProtocols() {
  return PROTOCOLS.map(p => ({
    id: p.id, name: p.name, category: p.category, short: p.short,
    stepCount: p.steps.length,
    pitfallCount: p.steps.reduce((n, s) => n + s.pitfalls.length, 0)
  }));
}

function getProtocol(id) {
  return PROTOCOLS.find(p => p.id === id) || null;
}

module.exports = { PROTOCOLS, listProtocols, getProtocol };

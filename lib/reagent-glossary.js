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
  },
  {
    id: 'complete_medium',
    name: '完全培养基',
    aliases: ['完全培养基', 'DMEM/F12'],
    category: '细胞培养基',
    function: '提供细胞生长所需的碳源、氨基酸、维生素和血清因子。',
    composition: '基础培养基 + 10% FBS + 1% 双抗（按细胞类型调整）',
    notes: '按细胞类型选择配方；开封后 2–8 °C 保存，避免反复升温。',
    storage: '2–8 °C'
  },
  {
    id: 'fbs',
    name: '胎牛血清（FBS）',
    aliases: ['胎牛血清', 'FBS'],
    category: '血清补充物',
    function: '提供生长因子、激素和附着因子，支持细胞贴壁与增殖。',
    composition: '胎牛血清',
    notes: '使用前 56 °C 灭活（按细胞需求）；避免反复冻融，批间差异需验证。',
    storage: '-20 °C 或 -80 °C'
  },
  {
    id: 'trypsin_edta',
    name: '胰蛋白酶-EDTA',
    aliases: ['胰蛋白酶-EDTA', '胰酶'],
    category: '细胞消化液',
    function: '切割细胞黏附蛋白，使贴壁细胞脱落并分散。',
    composition: '0.25% 胰蛋白酶 + EDTA',
    notes: '37 °C 消化 1–3 min；过度消化会损伤细胞，需用完全培养基终止。',
    storage: '-20 °C，避免反复冻融'
  },
  {
    id: 'pbs',
    name: 'PBS 磷酸盐缓冲液',
    aliases: ['PBS'],
    category: '缓冲液',
    function: '维持 pH 和渗透压，用于洗涤细胞或稀释样品。',
    composition: '磷酸盐缓冲盐水',
    notes: '细胞培养用需无菌、无内毒素；不要与含钙镁缓冲液混用。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'dmso',
    name: 'DMSO',
    aliases: ['DMSO'],
    category: '冷冻保护剂',
    function: '降低冰晶形成，保护细胞在冻存过程中的完整性。',
    composition: '二甲基亚砜',
    notes: '常用终浓度 10%；有刺激性和渗透性，操作戴手套，复苏后尽快去除。',
    storage: '室温避光、密闭'
  },
  {
    id: 'freezing_medium',
    name: '细胞冻存液',
    aliases: ['冻存液'],
    category: '冷冻保护液',
    function: '在低温下保护细胞，减少冰晶和渗透压损伤。',
    composition: '10% DMSO + 90% 完全培养基或 FBS',
    notes: '现配现用并预冷；DMSO 终浓度按验证配方控制。',
    storage: '4 °C，现配现用'
  },
  {
    id: 'trypan_blue',
    name: '台盼蓝',
    aliases: ['台盼蓝'],
    category: '细胞活率染料',
    function: '死细胞膜通透性增加而被染色，用于区分活/死细胞。',
    composition: '0.4% 台盼蓝溶液',
    notes: '与细胞悬液按比例混合后尽快计数；活细胞不着色。',
    storage: '室温避光'
  },
  {
    id: 'lysis_buffer',
    name: '蛋白裂解缓冲液',
    aliases: ['裂解缓冲液'],
    category: '蛋白提取缓冲液',
    function: '裂解细胞或菌体，释放可溶性蛋白并维持 pH/离子强度。',
    composition: 'Tris/磷酸盐缓冲体系 + 盐 + 去污剂（按实验）',
    notes: '使用前加入蛋白酶/磷酸酶抑制剂；全程冰上操作。',
    storage: '4 °C 或按配方'
  },
  {
    id: 'protease_inhibitor',
    name: '蛋白酶抑制剂',
    aliases: ['蛋白酶抑制剂'],
    category: '蛋白酶抑制剂',
    function: '抑制丝氨酸、半胱氨酸、天冬氨酸和金属蛋白酶，减少蛋白降解。',
    composition: 'PMSF、亮抑酶肽、抑肽酶等混合物（按产品）',
    notes: '裂解前现加；PMSF 有毒且有刺激性，按规范操作。',
    storage: '按产品，通常 -20 °C'
  },
  {
    id: 'ni_nta',
    name: 'Ni-NTA 树脂',
    aliases: ['Ni-NTA 树脂', 'Ni-NTA'],
    category: '亲和层析树脂',
    function: '通过 Ni²⁺ 与 His-tag 配位，选择性捕获 His-tag 蛋白。',
    composition: '镍离子螯合在次氮基三乙酸琼脂糖上',
    notes: '避免还原剂和强螯合剂；按柱体积和载量使用，防止柱床流干。',
    storage: '4 °C，含乙醇保存'
  },
  {
    id: 'imidazole',
    name: '咪唑',
    aliases: ['咪唑'],
    category: '洗脱剂',
    function: '竞争性结合 Ni²⁺，将 His-tag 蛋白从树脂上洗脱。',
    composition: '咪唑缓冲液',
    notes: '结合缓冲液常用 20–40 mM，洗脱常用 250–500 mM；按目标蛋白优化。',
    storage: '室温或 4 °C'
  },
  {
    id: 'bca_kit',
    name: 'BCA 蛋白定量试剂盒',
    aliases: ['BCA 蛋白定量试剂盒', 'BCA'],
    category: '蛋白定量试剂',
    function: '在碱性条件下与蛋白还原 Cu²⁺，比色定量总蛋白。',
    composition: 'BCA 工作液 A/B',
    notes: '还原剂和螯合剂可能干扰；样品需做空白校正，标准曲线现配。',
    storage: '按试剂盒，通常室温/4 °C'
  },
  {
    id: 'pvdf_membrane',
    name: 'PVDF 膜',
    aliases: ['PVDF 膜', 'PVDF'],
    category: '转膜材料',
    function: '吸附转移后的蛋白，供抗体孵育和检测。',
    composition: '聚偏二氟乙烯膜',
    notes: '使用前甲醇活化 1–2 min；避免膜干燥，操作戴手套。',
    storage: '室温干燥'
  },
  {
    id: 'transfer_buffer',
    name: '转膜缓冲液',
    aliases: ['转膜缓冲液'],
    category: '转膜缓冲液',
    function: '在电场中把蛋白从凝胶转移到膜上，维持 pH 和导电性。',
    composition: 'Tris-Glycine + 甲醇（按配方）',
    notes: '甲醇比例影响小分子蛋白转移；4 °C 转膜减少过热。',
    storage: '4 °C 或室温'
  },
  {
    id: 'milk',
    name: '脱脂奶粉',
    aliases: ['脱脂奶粉'],
    category: '封闭剂',
    function: '封闭膜上未结合位点，降低非特异抗体结合。',
    composition: '脱脂奶粉溶于 TBST',
    notes: '常用 5%；磷酸化蛋白检测优先用 BSA，避免酪蛋白干扰。',
    storage: '室温干燥，配好后 4 °C 短期'
  },
  {
    id: 'tbst',
    name: 'TBST',
    aliases: ['TBST'],
    category: '洗涤缓冲液',
    function: '含 Tween-20 的 Tris 缓冲盐溶液，用于洗膜和稀释抗体。',
    composition: 'Tris-HCl + NaCl + Tween-20',
    notes: 'Tween-20 浓度影响背景；洗涤次数和体积按抗体说明。',
    storage: '室温'
  },
  {
    id: 'primary_antibody',
    name: '一抗',
    aliases: ['一抗'],
    category: '检测抗体',
    function: '特异性识别目标蛋白，是 Western Blot/ELISA 的关键试剂。',
    composition: '按产品，单克隆或多克隆抗体',
    notes: '按说明书稀释，4 °C 过夜；需验证特异性和种属反应性。',
    storage: '按产品，通常 4 °C 或 -20 °C'
  },
  {
    id: 'secondary_antibody',
    name: '二抗',
    aliases: ['二抗'],
    category: '检测抗体',
    function: '识别一抗的种属 Fc 段，携带 HRP 等标记放大信号。',
    composition: 'HRP/荧光标记的抗种属抗体',
    notes: '必须与一抗种属匹配；避免交叉反应，按说明书稀释。',
    storage: '按产品，通常 4 °C 或 -20 °C'
  },
  {
    id: 'ecl',
    name: 'ECL 发光液',
    aliases: ['ECL 发光液', 'ECL'],
    category: '化学发光底物',
    function: 'HRP 催化底物发光，用于 Western Blot 条带检测。',
    composition: '鲁米诺/过氧化物体系',
    notes: '现配现用，避光；曝光梯度选择线性范围，避免过曝。',
    storage: '按产品，避光'
  },
  {
    id: 'coomassie',
    name: '考马斯亮蓝',
    aliases: ['考马斯亮蓝'],
    category: '蛋白染料',
    function: '与蛋白结合后在凝胶上显色，用于蛋白条带检测。',
    composition: '考马斯亮蓝 R-250/G-250',
    notes: '常用 0.1% 染色液；染色和脱色时间按凝胶厚度调整。',
    storage: '室温避光'
  },
  {
    id: 'sds_page_gel',
    name: 'SDS-PAGE 凝胶',
    aliases: ['SDS-PAGE 凝胶', 'SDS-PAGE'],
    category: '电泳凝胶',
    function: '按分子量分离 SDS 变性后的蛋白。',
    composition: '丙烯酰胺/双丙烯酰胺 + Tris 缓冲体系',
    notes: '按目标分子量选择浓度；APS/TEMED 现加，确保聚合完全。',
    storage: '4 °C 短期，避免干燥'
  },
  {
    id: 'sybr_green',
    name: 'SYBR Green Master Mix',
    aliases: ['SYBR Green Master Mix', 'SYBR Green'],
    category: 'qPCR 预混液',
    function: '包含 DNA 聚合酶、dNTP、缓冲液和 SYBR Green 染料，用于实时定量 PCR。',
    composition: 'Taq 聚合酶 + dNTP + SYBR Green',
    notes: '避光、冰上操作；避免反复冻融，按孔数配制 Master Mix。',
    storage: '-20 °C，避光'
  },
  {
    id: 'primers',
    name: 'PCR 引物',
    aliases: ['引物'],
    category: '寡核苷酸',
    function: '特异性结合模板，引导 DNA 聚合酶延伸。',
    composition: '合成寡核苷酸',
    notes: '按 Tm 和特异性设计；避免引物二聚体，使用无核酸酶水溶解。',
    storage: '-20 °C'
  },
  {
    id: 'cdna',
    name: 'cDNA',
    aliases: ['cDNA'],
    category: '反转录产物',
    function: '由 RNA 反转录得到的互补 DNA，作为 qPCR 模板。',
    composition: '单链 cDNA',
    notes: '避免 RNase 污染；稀释后分装，减少反复冻融。',
    storage: '-20 °C 或 -80 °C'
  },
  {
    id: 'nuclease_free_water',
    name: '无核酸酶水',
    aliases: ['无核酸酶水'],
    category: '分子生物学用水',
    function: '配制 PCR/qPCR 反应和稀释核酸，避免核酸酶降解。',
    composition: 'DNase/RNase-free 水',
    notes: '分装使用，避免与普通纯水混用。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'coating_buffer',
    name: '包被缓冲液',
    aliases: ['包被缓冲液'],
    category: 'ELISA 缓冲液',
    function: '将捕获抗体固定在 ELISA 板孔表面。',
    composition: '常用 PBS 或碳酸盐缓冲液，pH 9.6',
    notes: '按抗体说明书选择；包被后避免板孔干燥。',
    storage: '4 °C'
  },
  {
    id: 'capture_antibody',
    name: '捕获抗体',
    aliases: ['捕获抗体'],
    category: 'ELISA 抗体',
    function: '固定在板孔上，特异性结合目标抗原。',
    composition: '按试剂盒，单克隆/多克隆抗体',
    notes: '按说明书稀释和包被；避免反复冻融。',
    storage: '按产品，通常 4 °C 或 -20 °C'
  },
  {
    id: 'detection_antibody',
    name: '检测抗体',
    aliases: ['检测抗体'],
    category: 'ELISA 抗体',
    function: '识别抗原不同表位，形成夹心复合物。',
    composition: '按试剂盒，生物素化或未标记抗体',
    notes: '与捕获抗体配对使用；按说明书稀释，避免交叉反应。',
    storage: '按产品，通常 4 °C 或 -20 °C'
  },
  {
    id: 'tmb',
    name: 'TMB 底物',
    aliases: ['TMB'],
    category: 'ELISA 底物',
    function: 'HRP 催化 TMB 显色，颜色深浅反映抗原浓度。',
    composition: '3,3′,5,5′-四甲基联苯胺',
    notes: '避光显色，避免过长时间导致高浓度孔饱和；加终止液后尽快读数。',
    storage: '2–8 °C，避光'
  },
  {
    id: 'stop_solution',
    name: 'ELISA 终止液',
    aliases: ['ELISA 终止液'],
    category: 'ELISA 终止液',
    function: '终止 HRP 酶促反应，使 TMB 由蓝变黄，稳定读数。',
    composition: '常用稀硫酸或商品化终止液',
    notes: '有腐蚀性，按安全规范操作；加液后尽快读数。',
    storage: '室温'
  },
  {
    id: 'membrane_filter',
    name: '滤膜/薄膜过滤器',
    aliases: ['薄膜过滤器', '滤膜'],
    category: '过滤耗材',
    function: '按孔径截留颗粒、微生物或聚集体，用于无菌检查、样品澄清或除菌过滤。',
    composition: '0.22–0.45 µm 滤膜 + 滤器（按用途）',
    notes: '无菌检查常用 0.45 µm，除菌过滤常用 0.22 µm；使用前检查包装和滤膜完整性。',
    storage: '室温干燥'
  },
  {
    id: 'ftm',
    name: 'FTM 培养基',
    aliases: ['FTM 培养基', 'FTM'],
    category: '无菌检查培养基',
    function: '支持厌氧和需氧细菌生长，用于无菌检查。',
    composition: '流体硫乙醇酸盐培养基',
    notes: '30–35 °C 培养；使用前检查澄清度和有效期。',
    storage: '2–8 °C 或按产品'
  },
  {
    id: 'tsb',
    name: 'TSB 培养基',
    aliases: ['TSB 培养基', 'TSB'],
    category: '无菌检查培养基',
    function: '支持真菌和需氧细菌生长，用于无菌检查。',
    composition: '胰酪大豆胨液体培养基',
    notes: '20–25 °C 培养；使用前检查澄清度和有效期。',
    storage: '2–8 °C 或按产品'
  },
  {
    id: 'binding_buffer',
    name: '结合缓冲液',
    aliases: ['结合缓冲液'],
    category: '层析/核酸纯化缓冲液',
    function: '为吸附/结合步骤提供适宜盐、pH 和离液条件；核酸纯化中促进 DNA 吸附硅胶膜，蛋白纯化中维持 His-tag 与 Ni-NTA 结合。',
    composition: '随用途不同（离液盐或咪唑/盐缓冲体系）',
    notes: '按具体试剂盒/层析方法使用；注意盐浓度、pH 和咪唑浓度对结合的影响。',
    storage: '室温或 4 °C'
  },
  {
    id: 'spin_column',
    name: '吸附柱',
    aliases: ['吸附柱'],
    category: '核酸纯化耗材',
    function: '内含硅胶膜，吸附 DNA/RNA，便于洗涤和洗脱。',
    composition: '硅胶膜 + 塑料柱',
    notes: '避免柱膜干燥或破损；按柱容量分次上样。',
    storage: '室温干燥'
  },
  {
    id: 'competent_cells',
    name: '感受态细胞',
    aliases: ['感受态细胞'],
    category: '转化宿主',
    function: '经 Ca²⁺ 等处理，膜通透性增加，便于质粒 DNA 进入。',
    composition: '大肠杆菌感受态细胞',
    notes: '-80 °C 保存，冰上解冻；避免反复冻融和温度波动。',
    storage: '-80 °C'
  },
  {
    id: 'soc',
    name: 'SOC 培养基',
    aliases: ['SOC 培养基', 'SOC'],
    category: '转化复苏培养基',
    function: '提供丰富营养，帮助转化子恢复并表达抗生素抗性。',
    composition: 'LB + 葡萄糖 + 镁离子等',
    notes: '复苏 37 °C、220 rpm 约 1 h；按质粒/菌株调整。',
    storage: '2–8 °C 或 -20 °C'
  },
  {
    id: 'endotoxin_standard',
    name: '内毒素标准品',
    aliases: ['内毒素标准品'],
    category: '内毒素检测标准品',
    function: '用于建立内毒素浓度系列和验证鲎试剂灵敏度。',
    composition: '已知效价的内毒素',
    notes: '按说明书复溶并充分涡旋；避免反复冻融和污染。',
    storage: '2–8 °C 或 -20 °C，按产品'
  },
  {
    id: 'pyrogen_free_water',
    name: '无热原水',
    aliases: ['无热原水'],
    category: '内毒素检测用水',
    function: '用于复溶、稀释和阴性对照，避免外源内毒素。',
    composition: '无热原级纯水',
    notes: '专用耗材取用；开瓶后按实验室规定有效期。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'mycoplasma_kit',
    name: '支原体检测试剂盒',
    aliases: ['支原体检测试剂盒'],
    category: '支原体检测试剂',
    function: '提供支原体特异性引物、PCR Master Mix 和对照，用于检测培养物污染。',
    composition: '引物、Master Mix、阳性/阴性对照',
    notes: '按试剂盒说明处理样品和判读；严格分区操作，防止气溶胶污染。',
    storage: '按产品，通常 -20 °C'
  },
  {
    id: 'protein_a_resin',
    name: 'Protein A 树脂',
    aliases: ['Protein A 填料', 'MabSelect', '蛋白A树脂'],
    category: '亲和层析介质',
    function: '将重组 Protein A 偶联于琼脂糖或聚合物基质，选择性结合 IgG 的 Fc 区。',
    composition: 'Protein A 配基 + 高流速基质',
    notes: '载量按停留时间与料液性质实测；避免高浓度 NaOH 长时间接触，按说明控制 CIP 条件。',
    storage: '2–8 °C，20% 乙醇'
  },
  {
    id: 'glycine_buffer',
    name: '甘氨酸洗脱缓冲液',
    aliases: ['甘氨酸缓冲液', '0.1 M 甘氨酸'],
    category: '层析洗脱缓冲液',
    function: '低 pH（3.4–3.8）破坏 Protein A 与 Fc 的结合，使抗体解离。',
    composition: '0.1 M 甘氨酸，pH 3.4–3.8',
    notes: '洗脱后须立即中和，避免抗体长时间处于低 pH 导致聚集。',
    storage: '2–8 °C'
  },
  {
    id: 'tris_buffer',
    name: 'Tris 中和缓冲液',
    aliases: ['Tris 缓冲液', '1 M Tris', 'Tris-HCl'],
    category: '中和/缓冲液',
    function: '快速中和低 pH 洗脱液，将收集液调至 pH 5.0–7.0，降低聚集风险。',
    composition: '1 M Tris，pH 9.0',
    notes: '收集瓶预置并按体积比例中和；现配现用，避免微生物污染。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'sec_mobile_phase',
    name: 'SEC 流动相',
    aliases: ['SEC 流动相', '体积排阻流动相'],
    category: '色谱流动相',
    function: '提供稳定的离子环境，避免蛋白与柱基质非特异吸附。',
    composition: '20–100 mM 磷酸盐 + 0.1–0.3 M NaCl，pH 6.8–7.4',
    notes: '需 0.22 µm 过滤并脱气；含盐流动相现配现用，防止微生物滋生。',
    storage: '室温，现配'
  },
  {
    id: 'hcp_kit',
    name: 'HCP 检测试剂盒',
    aliases: ['HCP ELISA 试剂盒', '宿主细胞蛋白检测试剂盒'],
    category: '残留检测试剂盒',
    function: '提供抗 HCP 包被抗体、酶标二抗、标准品与底物，用于夹心 ELISA 定量。',
    composition: '包被板、标准品、检测抗体、底物、稀释液',
    notes: '标准品复溶体积须严格按说明；不同批次试剂盒不可混用。',
    storage: '2–8 °C，标准品按说明可分装冻存'
  },
  {
    id: 'hrp_conjugate',
    name: 'HRP 标记二抗',
    aliases: ['酶标二抗', 'HRP 二抗'],
    category: '酶标抗体',
    function: '识别已结合的一抗或抗原，通过 HRP 催化底物显色放大信号。',
    composition: 'HRP 与特异抗体共价偶联',
    notes: '现配现用，避免反复冻融；浓度过高会显著提高背景。',
    storage: '2–8 °C 或 -20 °C 分装'
  },
  {
    id: 'tsa',
    name: 'TSA 培养基',
    aliases: ['TSA', '胰酪大豆胨琼脂'],
    category: '微生物培养基',
    function: '非选择性培养基，用于需氧菌总数计数与环境微生物监测。',
    composition: '胰酪蛋白胨、大豆蛋白胨、氯化钠、琼脂',
    notes: '使用前检查无菌与有效期；按药典做促生长试验。',
    storage: '2–8 °C，避光'
  },
  {
    id: 'sda',
    name: 'SDA 培养基',
    aliases: ['SDA', '沙氏葡萄糖琼脂'],
    category: '微生物培养基',
    function: '用于霉菌和酵母菌计数，pH 偏酸抑制细菌生长。',
    composition: '葡萄糖、蛋白胨、琼脂',
    notes: '培养温度 20–25 °C；防止平板干燥失水。',
    storage: '2–8 °C，避光'
  },
  {
    id: 'contact_plate',
    name: '接触碟',
    aliases: ['接触皿', 'RODAC'],
    category: '表面采样耗材',
    function: '凸起培养基表面直接按压取样，定量回收表面微生物。',
    composition: 'TSA 接触碟，采样面积 25 cm²',
    notes: '按压时均匀用力、避免滑动；取样后立即盖回。',
    storage: '2–8 °C，有效期按产品'
  },
  {
    id: 'saline_peptone',
    name: '氯化钠-蛋白胨缓冲液',
    aliases: ['pH 7.0 氯化钠-蛋白胨缓冲液', '蛋白胨缓冲液'],
    category: '微生物稀释液',
    function: '分散供试品并维持微生物活性，用于供试液制备与稀释。',
    composition: '氯化钠、蛋白胨、磷酸盐，pH 7.0',
    notes: '灭菌后使用；开封后按实验室规定期限。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'neutralizer',
    name: '中和剂',
    aliases: ['抑菌中和剂', '卵磷脂-聚山梨酯'],
    category: '微生物检查辅料',
    function: '中和样品中的抑菌成分（防腐剂、抗生素等），提高微生物回收率。',
    composition: '卵磷脂、聚山梨酯 80 等，按品种选择',
    notes: '需通过方法适用性验证确认中和效果与自身无毒性。',
    storage: '按配方，通常 2–8 °C'
  },
  {
    id: 'ce_sds_gel',
    name: 'CE-SDS 凝胶缓冲液',
    aliases: ['CE-SDS 凝胶', 'SDS-MW 凝胶缓冲液'],
    category: '毛细管电泳试剂',
    function: '提供筛分网络，使 SDS-蛋白复合物按分子量分离。',
    composition: '线性聚丙烯酰胺或葡聚糖凝胶缓冲体系',
    notes: '灌注前检查气泡；按试剂盒有效期使用。',
    storage: '2–8 °C，避光'
  },
  {
    id: 'dtt',
    name: 'DTT（二硫苏糖醇）',
    aliases: ['DTT', '二硫苏糖醇'],
    category: '还原剂',
    function: '还原二硫键，使抗体解离为重链与轻链，用于还原条件电泳。',
    composition: '1,4-二硫苏糖醇',
    notes: '现配现用，有刺激性气味；避免反复冻融失效。',
    storage: '-20 °C 分装'
  },
  {
    id: 'sds_sample_buffer',
    name: 'SDS 样品缓冲液',
    aliases: ['SDS 上样缓冲液', 'CE-SDS 样品缓冲液'],
    category: '电泳样品处理液',
    function: '使蛋白变性并均匀结合 SDS，形成按分子量分离的复合物。',
    composition: 'SDS、Tris-HCl、甘油、指示剂（还原型含 DTT）',
    notes: '加热变性温度与时间按试剂盒要求，过度加热会造成人为片段化。',
    storage: '室温或 2–8 °C'
  },
  {
    id: 'uf_membrane',
    name: '超滤膜包',
    aliases: ['超滤膜', 'TFF 膜包', '切向流膜包'],
    category: '超滤耗材',
    function: '按截留分子量截留蛋白、透过溶剂与小分子，实现浓缩与换液。',
    composition: '聚醚砜（PES）或再生纤维素膜',
    notes: '按流向安装并排气；使用前后测水通量，按验证程序清洗保存。',
    storage: '0.1 M NaOH 或 20% 乙醇'
  },
  {
    id: 'dialysis_buffer',
    name: '透析缓冲液',
    aliases: ['透析液', '换液缓冲液'],
    category: '超滤/透析缓冲液',
    function: '置换样品缓冲体系，去除盐、咪唑等小分子。',
    composition: '按目标处方配制，常见磷酸盐或组氨酸缓冲体系',
    notes: '预冷至与料液接近温度；累计用量按 5–10 倍透析体积计算。',
    storage: '2–8 °C'
  },
  {
    id: 'naoh',
    name: '氢氧化钠溶液',
    aliases: ['NaOH', '0.1 M NaOH', '碱洗液'],
    category: '清洗液',
    function: '水解去除柱介质与膜面上的残留蛋白与核酸，兼有抑菌作用。',
    composition: '0.1–0.5 M NaOH',
    notes: '腐蚀性，戴护目镜与手套；浓度与接触时间不得超过介质耐受限值。',
    storage: '室温密闭'
  }
];

module.exports = { REAGENTS };

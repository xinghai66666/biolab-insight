'use strict';

/** 由 recipes/*.js 生成，请勿手工编辑。 */
module.exports = [
  {
    id: "cd_medium",
    name: "CD 无血清培养基",
    aliases: ["CD 培养基"],
    category: "细胞培养基",
    function: "为 CHO 悬浮生长提供化学成分确定的营养环境",
    composition: "氨基酸、维生素、无机盐与微量元素，无血清",
    notes: "按细胞系筛选，2-8 °C 避光保存，避免反复升温",
    storage: "2-8 °C"
  },
  {
    id: "l_glutamine",
    name: "L-谷氨酰胺",
    aliases: ["谷氨酰胺"],
    category: "培养基添加物",
    function: "提供氮源与能量，支持细胞增殖",
    composition: "L-谷氨酰胺",
    notes: "配制时按需补加，高温易分解，可分装冻存",
    storage: "-20 °C 或 2-8 °C"
  },
  {
    id: "pei_reagent",
    name: "PEI 转染试剂",
    aliases: ["聚乙烯亚胺"],
    category: "转染试剂",
    function: "阳离子聚合物，与 DNA 形成复合物介导细胞摄取",
    composition: "线性或支化聚乙烯亚胺",
    notes: "于无血清条件下稀释，室温孵育成复合物，注意细胞毒性",
    storage: "2-8 °C 或按产品"
  },
  {
    id: "transfection_plasmid",
    name: "转染级质粒 DNA",
    aliases: ["质粒 DNA"],
    category: "核酸",
    function: "携带目标基因，在细胞内实现瞬时表达",
    composition: "超螺旋质粒 DNA",
    notes: "需高纯度、低内毒素，避免 RNA 污染",
    storage: "-20 °C"
  },
  {
    id: "cloning_medium",
    name: "克隆化培养液",
    aliases: ["条件培养基"],
    category: "细胞培养基",
    function: "为单细胞低密度生长提供营养与生长因子",
    composition: "基础培养基添加血清或条件培养上清",
    notes: "支持单个细胞克隆生长，避免频繁换液",
    storage: "2-8 °C"
  },
  {
    id: "well_plate96",
    name: "96 孔细胞培养板",
    aliases: ["96 孔板"],
    category: "细胞培养耗材",
    function: "提供单细胞接种与克隆培养的独立孔位",
    composition: "无菌聚苯乙烯 96 孔培养板",
    notes: "无菌无热原，边缘孔可加无菌缓冲液减少蒸发",
    storage: "室温"
  },
  {
    id: "cryovial",
    name: "冻存管",
    aliases: ["冻存瓶"],
    category: "细胞冻存耗材",
    function: "承受低温并密封保存细胞悬液",
    composition: "耐液氮温度的聚丙烯冻存管",
    notes: "使用前标记清晰并检查密封性，防止液氮渗入",
    storage: "室温"
  },
  {
    id: "controlled_rate_freezer",
    name: "程序降温盒",
    aliases: ["梯度降温盒"],
    category: "冻存耗材",
    function: "实现约 -1 °C/min 的受控降温",
    composition: "异丙醇或电子控温降温装置",
    notes: "配合 -80 °C 冰箱使用，异丙醇按说明定期更换",
    storage: "室温"
  },
  {
    id: "counting_chamber",
    name: "细胞计数板",
    aliases: ["血球计数板"],
    category: "计数耗材",
    function: "提供已知体积的计数室用于显微镜计数",
    composition: "改良 Neubauer 计数板",
    notes: "使用前后清洁，盖玻片正确放置，避免气泡与溢出",
    storage: "室温"
  },
  {
    id: "glucose_kit",
    name: "葡萄糖检测试剂盒",
    aliases: ["葡萄糖氧化酶试剂盒"],
    category: "代谢物检测试剂",
    function: "酶法定量培养上清中的葡萄糖",
    composition: "葡萄糖氧化酶、过氧化物酶与显色底物",
    notes: "按说明配制工作液，避免交叉污染",
    storage: "2-8 °C"
  },
  {
    id: "lactate_kit",
    name: "乳酸检测试剂盒",
    aliases: ["乳酸氧化酶试剂盒"],
    category: "代谢物检测试剂",
    function: "酶法定量乳酸浓度",
    composition: "乳酸氧化酶与显色底物",
    notes: "避光保存，标准品现配现用",
    storage: "2-8 °C"
  },
  {
    id: "ammonia_kit",
    name: "氨检测试剂盒",
    aliases: ["谷氨酸脱氢酶试剂盒"],
    category: "代谢物检测试剂",
    function: "酶法定量氨或铵离子浓度",
    composition: "谷氨酸脱氢酶与辅酶体系",
    notes: "试剂对温度敏感，平衡至室温后再使用",
    storage: "2-8 °C"
  },
  {
    id: "baffled_flask",
    name: "挡板摇瓶",
    aliases: ["三角摇瓶"],
    category: "培养耗材",
    function: "提供通气与混合良好的悬浮培养空间",
    composition: "带挡板的聚碳酸酯或玻璃摇瓶",
    notes: "装液量控制在 20-40%，瓶口透气并避免泄漏",
    storage: "室温"
  },
  {
    id: "glucose_feed",
    name: "葡萄糖补料液",
    aliases: ["补料液"],
    category: "发酵补料",
    function: "提供限制性碳源，控制菌体比生长速率",
    composition: "高浓度葡萄糖溶液",
    notes: "无菌流加，避免过量导致乙酸累积",
    storage: "室温或 2-8 °C"
  },
  {
    id: "iptg",
    name: "IPTG 诱导剂",
    aliases: ["异丙基硫代半乳糖苷"],
    category: "诱导剂",
    function: "诱导启动子驱动目标基因表达",
    composition: "IPTG",
    notes: "按表达系统优化浓度，具刺激性，操作时戴手套",
    storage: "-20 °C 或 2-8 °C"
  },
  {
    id: "antifoam",
    name: "消泡剂",
    aliases: ["有机消泡剂"],
    category: "发酵辅料",
    function: "抑制发酵过程中的泡沫形成",
    composition: "聚醚或硅油类消泡剂",
    notes: "按需少量添加，过量会影响氧传质",
    storage: "室温"
  },
  {
    id: "bmmy_medium",
    name: "BMGY/BMMY 培养基",
    aliases: ["酵母表达培养基"],
    category: "酵母培养基",
    function: "分别用于菌体增殖与甲醇诱导表达",
    composition: "酵母提取物、蛋白胨、甘油或甲醇及缓冲盐",
    notes: "按说明配制灭菌，甲醇现加并注意安全",
    storage: "2-8 °C 或室温"
  },
  {
    id: "methanol",
    name: "甲醇",
    aliases: ["CH3OH"],
    category: "诱导剂与碳源",
    function: "作为唯一碳源并强诱导 AOX1 启动子",
    composition: "甲醇",
    notes: "易燃有毒，须在通风条件下操作，严禁明火",
    storage: "室温、防火"
  },
  {
    id: "glycerol_stock",
    name: "甘油保藏液",
    aliases: ["无菌甘油溶液"],
    category: "冷冻保护剂",
    function: "降低冰晶与渗透损伤，保护菌体低温存活",
    composition: "15-50% 无菌甘油",
    notes: "按终浓度计算加入量，避免反复冻融",
    storage: "室温或 -20 °C"
  },
  {
    id: "cryotube_strain",
    name: "菌种保藏管",
    aliases: ["菌种冻存管"],
    category: "保藏耗材",
    function: "耐受低温并密封保存菌种",
    composition: "耐低温聚丙烯菌种保藏管",
    notes: "标记清晰并检查密封性，避免液氮渗入",
    storage: "室温"
  },
  {
    id: "soft_agar",
    name: "顶层软琼脂",
    aliases: ["半固体琼脂"],
    category: "微生物培养基",
    function: "形成半固体上层供噬菌斑形成与观察",
    composition: "0.5-0.7% 琼脂加培养基",
    notes: "融化后冷却至 45-50 °C 使用，避免反复凝固",
    storage: "2-8 °C 或室温"
  },
  {
    id: "sm_buffer",
    name: "SM 缓冲液",
    aliases: ["噬菌体稀释液"],
    category: "稀释缓冲液",
    function: "稳定噬菌体颗粒并用于样品稀释",
    composition: "Tris 缓冲盐、氯化钠、硫酸镁与明胶",
    notes: "无菌条件下使用，避免强螯合剂",
    storage: "2-8 °C"
  },
  {
    id: "host_bacteria",
    name: "宿主菌悬液",
    aliases: ["指示菌"],
    category: "噬菌体宿主",
    function: "提供噬菌体感染与裂解的敏感宿主",
    composition: "对数生长期敏感菌株",
    notes: "培养至对数期，浓度约 10⁸ CFU/mL",
    storage: "新鲜制备"
  },
  {
    id: "do_probe",
    name: "溶氧电极",
    aliases: ["DO 电极"],
    category: "过程传感器",
    function: "实时测量发酵液中的溶解氧水平",
    composition: "氧敏感膜与参比电极",
    notes: "每批前后校准，避免气泡附着，按说明灭菌",
    storage: "按产品要求，通常 2-8 °C 或室温"
  },
  {
    id: "ph_probe",
    name: "pH 电极",
    aliases: ["pH 传感器"],
    category: "过程传感器",
    function: "实时测量发酵液的 pH",
    composition: "玻璃电极与参比电极",
    notes: "使用前校准并保持参比液充盈",
    storage: "按产品要求，通常室温"
  },
  {
    id: "sp_resin",
    name: "SP 强阳离子交换树脂",
    aliases: ["SP Sepharose", "磺丙基树脂"],
    category: "层析介质",
    function: "宽 pH 范围内带负电，结合带正电蛋白",
    composition: "磺丙基配基偶联琼脂糖",
    notes: "避免强碱长时间接触;按载量上样;勿使柱床流干",
    storage: "2-8 °C，20% 乙醇"
  },
  {
    id: "cm_resin",
    name: "CM 弱阳离子交换树脂",
    aliases: ["CM Sepharose", "羧甲基树脂"],
    category: "层析介质",
    function: "弱酸性阳离子交换剂，电荷密度随 pH 变化",
    composition: "羧甲基配基偶联琼脂糖",
    notes: "低 pH 下功能基团解离度下降，需关注 pH 影响",
    storage: "2-8 °C，20% 乙醇"
  },
  {
    id: "q_resin",
    name: "Q 强阴离子交换树脂",
    aliases: ["Q Sepharose", "季铵树脂"],
    category: "层析介质",
    function: "季铵强碱配基带正电，结合带负电蛋白",
    composition: "季铵配基偶联琼脂糖",
    notes: "避免与阴离子去污剂同用;勿使柱床流干",
    storage: "2-8 °C，20% 乙醇"
  },
  {
    id: "deae_resin",
    name: "DEAE 弱阴离子交换树脂",
    aliases: ["DEAE Sepharose", "二乙氨基乙基树脂"],
    category: "层析介质",
    function: "弱碱性阴离子交换剂，电荷随 pH 变化",
    composition: "二乙氨基乙基配基偶联基质",
    notes: "高 pH 下电荷减弱，需控制上样 pH",
    storage: "2-8 °C，20% 乙醇"
  },
  {
    id: "phenyl_resin",
    name: "Phenyl 疏水作用树脂",
    aliases: ["Phenyl Sepharose", "苯基树脂"],
    category: "层析介质",
    function: "苯基配基在高盐下与蛋白疏水区相互作用实现结合",
    composition: "苯基配基偶联琼脂糖",
    notes: "高盐上样;避免强有机溶剂长期接触",
    storage: "2-8 °C，20% 乙醇"
  },
  {
    id: "ammonium_sulfate",
    name: "硫酸铵",
    aliases: ["(NH4)2SO4", "硫酸铵盐析剂"],
    category: "盐析/层析试剂",
    function: "提高离子强度促进疏水结合与蛋白盐析",
    composition: "硫酸铵",
    notes: "溶解放热需冰浴;注意防尘;废液按规定处理",
    storage: "室温干燥密闭"
  },
  {
    id: "protein_g_resin",
    name: "Protein G 亲和树脂",
    aliases: ["Protein G Sepharose", "蛋白G树脂"],
    category: "亲和层析介质",
    function: "Protein G 配基特异性结合 IgG Fc 区，实现高选择性捕获",
    composition: "重组 Protein G 偶联琼脂糖",
    notes: "洗脱后即时中和;避免强碱长时间 CIP",
    storage: "2-8 °C，20% 乙醇"
  },
  {
    id: "mgcl2_elution",
    name: "氯化镁洗脱液",
    aliases: ["MgCl2 洗脱缓冲液", "氯化镁洗脱液"],
    category: "层析洗脱液",
    function: "高浓度 MgCl2 温和破坏抗体与 Protein G 的结合",
    composition: "2-4 M MgCl2，pH 6-7",
    notes: "温和洗脱利于保持活性;洗后需脱盐",
    storage: "2-8 °C"
  },
  {
    id: "cnbr_sepharose",
    name: "CNBr 活化 Sepharose",
    aliases: ["CNBr-activated Sepharose 4B", "活化琼脂糖"],
    category: "层析基质",
    function: "活化基团与配基伯胺共价偶联，制备亲和介质",
    composition: "溴化氰活化琼脂糖",
    notes: "对湿气敏感;偶联后立即封闭;4 °C 保存",
    storage: "2-8 °C，干燥或按说明"
  },
  {
    id: "glycine_elution",
    name: "酸性甘氨酸洗脱液",
    aliases: ["0.1 M 甘氨酸 pH 2.7", "低 pH 洗脱液"],
    category: "层析洗脱液",
    function: "低 pH 破坏抗原抗体结合，温和洗脱目标蛋白",
    composition: "0.1 M 甘氨酸，pH 2.5-3.0",
    notes: "洗脱后立即中和;避免目标蛋白长时间低 pH",
    storage: "2-8 °C"
  },
  {
    id: "chromatography_resin",
    name: "层析介质浆料",
    aliases: ["层析填料", "色谱树脂浆"],
    category: "层析耗材",
    function: "按目标分离模式选择的散装层析介质，装填后形成分离柱床",
    composition: "琼脂糖/聚合物基质及配基",
    notes: "装柱前充分脱气;避免流干;4 °C 保存",
    storage: "2-8 °C，20% 乙醇"
  },
  {
    id: "acetone_tracer",
    name: "丙酮示踪剂",
    aliases: ["丙酮脉冲溶液", "柱效测试示踪剂"],
    category: "柱效测试试剂",
    function: "作为不保留示踪物用于测定柱效与柱外体积",
    composition: "丙酮水溶液（约 1%-2%）",
    notes: "易燃、低毒;按有机废液回收",
    storage: "室温密闭、防火"
  },
  {
    id: "precooled_ethanol",
    name: "预冷乙醇",
    aliases: ["冷乙醇", "沉淀用乙醇"],
    category: "有机溶剂",
    function: "降低介电常数使蛋白脱水沉淀，实现分级分离",
    composition: "乙醇（95% 或无水级）",
    notes: "易燃、需低温操作;缓慢加入并搅拌;防火",
    storage: "-20 °C 或 2-8 °C，密闭防火"
  },
  {
    id: "crystallization_screen",
    name: "结晶筛选试剂盒",
    aliases: ["结晶筛选液", "沉淀剂筛选试剂盒"],
    category: "结晶试剂",
    function: "提供多组沉淀剂、pH 与盐条件以快速筛选结晶初始条件",
    composition: "PEG、盐类与缓冲液组合",
    notes: "低温保存;避免污染;按说明书使用",
    storage: "2-8 °C 或 -20 °C，按说明"
  },
  {
    id: "precipitant_peg",
    name: "PEG 沉淀剂",
    aliases: ["聚乙二醇", "PEG 8000"],
    category: "结晶沉淀剂",
    function: "通过体积排阻效应使蛋白过饱和并析出晶体",
    composition: "聚乙二醇（如 PEG 3350/8000）",
    notes: "黏度较高;按分子量选择;低温保存",
    storage: "2-8 °C 或室温"
  },
  {
    id: "urea",
    name: "尿素",
    aliases: ["Urea", "碳酰胺"],
    category: "变性剂",
    function: "8 M 尿素破坏非共价相互作用，用于溶解包涵体",
    composition: "尿素",
    notes: "现配;高浓度有刺激性;避免高温",
    storage: "室温干燥"
  },
  {
    id: "redox_system",
    name: "GSH/GSSG 氧化还原对",
    aliases: ["还原型/氧化型谷胱甘肽", "谷胱甘肽氧化还原系统"],
    category: "复性添加剂",
    function: "提供适宜氧化还原电位，促进正确二硫键形成",
    composition: "还原型谷胱甘肽（GSH）与氧化型（GSSG）",
    notes: "按比例配制;现用现配;避光",
    storage: "-20 °C 或 2-8 °C"
  },
  {
    id: "l_arginine",
    name: "L-精氨酸",
    aliases: ["L-Arg", "精氨酸盐酸盐"],
    category: "复性添加剂",
    function: "抑制复性过程中的蛋白聚集，提高复性收率",
    composition: "L-精氨酸盐酸盐",
    notes: "常用 0.2-0.5 M;需调节 pH",
    storage: "室温干燥"
  },
  {
    id: "citric_acid",
    name: "柠檬酸溶液",
    aliases: ["1 M 柠檬酸", "柠檬酸调节液"],
    category: "pH 调节剂",
    function: "将制品 pH 降至病毒灭活所需酸性范围",
    composition: "柠檬酸",
    notes: "有腐蚀性;缓慢加入并搅拌;控制终点 pH",
    storage: "室温"
  },
  {
    id: "phosphate_neutralization",
    name: "磷酸盐中和液",
    aliases: ["磷酸氢二钠溶液", "中和缓冲液"],
    category: "中和缓冲液",
    function: "快速将低 pH 制品中和至安全范围，减少蛋白低 pH 暴露",
    composition: "磷酸氢二钠/磷酸二氢钠体系",
    notes: "预置中和容器;快速混匀;避免局部过碱",
    storage: "2-8 °C 或室温"
  },
  {
    id: "bradford_reagent",
    name: "Bradford 工作液",
    aliases: ["考马斯亮蓝 G-250 试剂", "Bradford 试剂"],
    category: "蛋白定量试剂",
    function: "考马斯亮蓝 G-250 与蛋白结合后最大吸收移至 595 nm，用于比色定量",
    composition: "考马斯亮蓝 G-250、磷酸、乙醇",
    notes: "避免与去污剂同用;显色后 5-10 min 内读数",
    storage: "2-8 °C，避光"
  },
  {
    id: "acetonitrile",
    name: "乙腈",
    aliases: ["ACN", "乙腈色谱纯"],
    category: "流动相有机溶剂",
    function: "反相色谱常用有机相，用于洗脱疏水组分",
    composition: "乙腈",
    notes: "易燃、有毒;通风橱操作;按有机废液回收",
    storage: "室温密闭、防火"
  },
  {
    id: "tfa",
    name: "三氟乙酸",
    aliases: ["TFA", "三氟乙酸色谱纯"],
    category: "流动相添加剂",
    function: "提供酸性离子对环境，改善峰形并抑制拖尾",
    composition: "三氟乙酸",
    notes: "有腐蚀性;通风橱操作;避免接触皮肤",
    storage: "2-8 °C 或室温密闭"
  },
  {
    id: "iaa",
    name: "碘乙酰胺",
    aliases: ["IAA", "碘乙酸胺"],
    category: "烷基化试剂",
    function: "与还原后巯基共价结合，防止二硫键重新形成",
    composition: "碘乙酰胺",
    notes: "避光;有刺激性;按用量配制",
    storage: "-20 °C，避光"
  },
  {
    id: "trypsin",
    name: "胰蛋白酶",
    aliases: ["Trypsin", "测序级胰蛋白酶"],
    category: "蛋白酶",
    function: "特异性切割赖氨酸和精氨酸羧基端肽键，生成可测肽段",
    composition: "胰蛋白酶（测序级）",
    notes: "避免反复冻融;4 °C 短期保存",
    storage: "-20 °C"
  },
  {
    id: "formic_acid",
    name: "甲酸",
    aliases: ["FA", "甲酸色谱纯"],
    category: "酸化试剂",
    function: "酸化样品并提供电喷雾正离子所需酸性环境",
    composition: "甲酸",
    notes: "有腐蚀性;通风橱操作",
    storage: "室温密闭"
  },
  {
    id: "c18_spe",
    name: "C18 固相萃取柱",
    aliases: ["C18 脱盐柱", "反相 SPE 柱"],
    category: "样品前处理耗材",
    function: "反相吸附肽段，盐与缓冲液被洗去实现脱盐浓缩",
    composition: "硅胶键合 C18",
    notes: "上样前活化平衡;避免柱床干涸",
    storage: "室温干燥"
  },
  {
    id: "chca",
    name: "CHCA 基质",
    aliases: ["α-氰基-4-羟基肉桂酸", "CHCA"],
    category: "MALDI 基质",
    function: "吸收激光能量并与肽段共结晶，辅助解吸电离",
    composition: "α-氰基-4-羟基肉桂酸",
    notes: "避光;现配或分装冻存",
    storage: "-20 °C，避光干燥"
  },
  {
    id: "sinapinic_acid",
    name: "芥子酸",
    aliases: ["SA", "3", "5-二甲氧基-4-羟基肉桂酸"],
    category: "MALDI 基质",
    function: "常用于蛋白大分子的基质，电离较为温和",
    composition: "芥子酸",
    notes: "避光;溶于含三氟乙酸的乙腈水溶液",
    storage: "-20 °C，避光干燥"
  },
  {
    id: "hcl_hydrolysis",
    name: "盐酸水解液",
    aliases: ["6 M 盐酸（含 0.1% 苯酚）", "盐酸水解试剂"],
    category: "水解试剂",
    function: "在 110 °C 水解蛋白肽键，释放游离氨基酸并保护酪氨酸",
    composition: "盐酸（6 M，含 0.1% 苯酚）",
    notes: "强腐蚀;密闭水解;通风橱操作",
    storage: "室温密闭"
  },
  {
    id: "pitc",
    name: "苯异硫氰酸酯",
    aliases: ["PITC", "异硫氰酸苯酯"],
    category: "衍生化试剂",
    function: "与氨基酸伯胺反应生成 PTC-氨基酸，便于反相 HPLC 检测",
    composition: "异硫氰酸苯酯",
    notes: "有毒且对湿敏感;通风橱操作;避光",
    storage: "-20 °C，避光密封"
  },
  {
    id: "ninhydrin",
    name: "茚三酮",
    aliases: ["水合茚三酮", "茚三酮显色剂"],
    category: "柱后衍生试剂",
    function: "与氨基酸反应生成蓝紫色产物（脯氨酸呈黄色），570/440 nm 检测",
    composition: "茚三酮",
    notes: "避光;有刺激性;现配",
    storage: "2-8 °C，避光"
  },
  {
    id: "pngase_f",
    name: "PNGase F 糖苷酶",
    aliases: ["肽-N-糖苷酶 F", "PNGase F"],
    category: "糖链释放酶",
    function: "特异性切割天冬酰胺连接的 N-糖链与蛋白之间的糖苷键",
    composition: "重组 PNGase F",
    notes: "避免反复冻融;含甘油可直接使用",
    storage: "-20 °C"
  },
  {
    id: "2_ab",
    name: "2-氨基苯甲酰胺",
    aliases: ["2-AB", "2-氨基苯甲酰胺荧光标记物"],
    category: "荧光衍生化试剂",
    function: "与糖链还原端反应引入荧光，便于 FLD 高灵敏检测",
    composition: "2-氨基苯甲酰胺",
    notes: "有刺激性;避光;还原剂现配",
    storage: "-20 °C，避光干燥"
  },
  {
    id: "ammonium_formate",
    name: "甲酸铵",
    aliases: ["甲酸铵盐", "HILIC 流动相盐"],
    category: "流动相盐",
    function: "提供挥发性缓冲环境，兼容 HILIC 分离与质谱检测",
    composition: "甲酸铵",
    notes: "易吸潮;按浓度配制;过滤",
    storage: "室温干燥"
  },
  {
    id: "guanidine_hcl",
    name: "盐酸胍",
    aliases: ["6 M 盐酸胍", "胍盐变性剂"],
    category: "变性剂",
    function: "高浓度盐酸胍使蛋白充分变性展开，利于酶切",
    composition: "盐酸胍",
    notes: "高浓度有刺激性;现配",
    storage: "室温干燥"
  },
  {
    id: "lys_c",
    name: "赖氨酸内肽酶",
    aliases: ["Lys-C", "内肽酶 Lys-C"],
    category: "蛋白酶",
    function: "在变性条件下特异性切割赖氨酸羧基端，与胰蛋白酶互补提高覆盖度",
    composition: "赖氨酸内肽酶（Lys-C）",
    notes: "避免反复冻融;按活性单位使用",
    storage: "-20 °C"
  },
  {
    id: "ampholyte",
    name: "载体两性电解质",
    aliases: ["两性电解质", "carrier ampholyte"],
    category: "电泳试剂",
    function: "在电场中建立连续稳定的 pH 梯度，使蛋白按 pI 聚焦",
    composition: "不同 pH 范围两性电解质混合物",
    notes: "避光;按 pH 范围选择",
    storage: "2-8 °C，避光"
  },
  {
    id: "ipg_strip",
    name: "IPG 预制胶条",
    aliases: ["固相 pH 梯度胶条", "immobilized pH gradient strip"],
    category: "电泳耗材",
    function: "固相化 pH 梯度介质，重现性优于载体两性电解质",
    composition: "丙烯酰胺基质与固定化两性电解质",
    notes: "干胶条需泡胀;避免干裂",
    storage: "-20 °C，干燥"
  },
  {
    id: "capillary",
    name: "熔融石英毛细管",
    aliases: ["石英毛细管", "fused silica capillary"],
    category: "电泳耗材",
    function: "作为分离通道，内壁硅羟基产生电渗流",
    composition: "熔融石英",
    notes: "避免堵塞;每次运行前后冲洗",
    storage: "室温干燥"
  },
  {
    id: "boric_acid_buffer",
    name: "硼酸盐缓冲液",
    aliases: ["硼酸-硼砂缓冲液", "borate buffer"],
    category: "电泳缓冲液",
    function: "提供稳定 pH 与离子强度，维持电渗流与分离重现性",
    composition: "硼酸/硼砂",
    notes: "过滤脱气;定期更换",
    storage: "室温"
  },
  {
    id: "mol_proteinase_k",
    name: "蛋白酶 K",
    aliases: ["蛋白酶K", "Proteinase K"],
    category: "酶",
    function: "降解蛋白与核酸酶，释放完整基因组 DNA",
    composition: "枯草杆菌蛋白酶类",
    notes: "55 °C 活性高；避免反复冻融；有刺激性需戴手套",
    storage: "-20 °C 分装"
  },
  {
    id: "mol_phenol_chloroform",
    name: "酚/氯仿/异戊醇抽提液",
    aliases: ["酚氯仿", "25:24:1"],
    category: "有机抽提试剂",
    function: "使蛋白变性并分配至有机相，分离出水相 DNA",
    composition: "苯酚:氯仿:异戊醇 = 25:24:1",
    notes: "苯酚强腐蚀有毒，通风橱内操作；勿吸入下层有机相",
    storage: "4 °C 避光"
  },
  {
    id: "mol_trizol",
    name: "TRIzol 试剂",
    aliases: ["TRIzol", "苯酚异硫氰酸胍"],
    category: "RNA 提取裂解液",
    function: "裂解细胞并抑制 RNase，使 RNA 与蛋白、DNA 分离",
    composition: "苯酚与异硫氰酸胍等",
    notes: "苯酚有腐蚀性，通风橱内操作；按细胞量足量加入",
    storage: "2–8 °C 避光"
  },
  {
    id: "mol_chloroform",
    name: "氯仿",
    aliases: ["三氯甲烷", "CHCl3"],
    category: "有机溶剂",
    function: "使蛋白变性并分相，RNA 留在水相",
    composition: "三氯甲烷",
    notes: "有毒易挥发，通风橱操作；勿吸入中间层",
    storage: "室温密闭避光"
  },
  {
    id: "mol_isopropanol",
    name: "异丙醇",
    aliases: ["2-丙醇"],
    category: "醇沉试剂",
    function: "降低 RNA 溶解度使其沉淀浓缩",
    composition: "异丙醇",
    notes: "易燃；按体积加入，沉淀时间不宜过长",
    storage: "室温密闭防火"
  },
  {
    id: "mol_reverse_transcriptase",
    name: "逆转录酶",
    aliases: ["反转录酶", "M-MLV"],
    category: "酶",
    function: "以 RNA 为模板合成第一链 cDNA",
    composition: "RNA 依赖的 DNA 聚合酶",
    notes: "避免反复冻融；按最适温度使用",
    storage: "-20 °C"
  },
  {
    id: "mol_dntp_mix",
    name: "dNTP 混合物",
    aliases: ["dNTPs", "脱氧核苷三磷酸"],
    category: "核苷酸底物",
    function: "为 DNA 合成提供原料",
    composition: "dATP/dCTP/dGTP/dTTP",
    notes: "避免反复冻融；冰上操作",
    storage: "-20 °C 分装"
  },
  {
    id: "mol_oligo_dt",
    name: "Oligo(dT) 引物",
    aliases: ["oligo dT", "寡聚dT"],
    category: "寡核苷酸",
    function: "结合 mRNA 的 poly(A) 尾引发反转录",
    composition: "寡聚胸腺嘧啶",
    notes: "适合 mRNA；总 RNA 可搭配随机引物",
    storage: "-20 °C"
  },
  {
    id: "mol_taq",
    name: "Taq DNA 聚合酶",
    aliases: ["Taq 酶", "耐热DNA聚合酶"],
    category: "酶",
    function: "催化 DNA 链延伸，耐高温",
    composition: "Thermus aquaticus DNA 聚合酶",
    notes: "避免反复冻融；热启动型需按说明预激活",
    storage: "-20 °C"
  },
  {
    id: "mol_dnase_i",
    name: "DNase I（无 RNase）",
    aliases: ["DNase I", "DNaseI", "脱氧核糖核酸酶I"],
    category: "酶",
    function: "消化 RNA 样品中的基因组 DNA",
    composition: "牛胰脱氧核糖核酸酶 I",
    notes: "处理后需纯化或热失活；避免 RNase 污染",
    storage: "-20 °C 分装"
  },
  {
    id: "mol_restriction_enzyme",
    name: "限制性内切酶",
    aliases: ["限制酶", "内切酶"],
    category: "酶",
    function: "识别特异序列并切割 DNA 双链",
    composition: "蛋白质（核酸酶）",
    notes: "冰上操作；注意甲基化与 Star 活性",
    storage: "-20 °C"
  },
  {
    id: "mol_restriction_buffer",
    name: "10× 限制性内切酶缓冲液",
    aliases: ["10×酶切缓冲液", "NEBuffer"],
    category: "反应缓冲液",
    function: "提供酶切所需的 pH 与离子环境",
    composition: "Tris-HCl、Mg²⁺ 与盐等（随酶）",
    notes: "稀释成 1× 使用；不同酶缓冲液可能不同",
    storage: "-20 °C 分装"
  },
  {
    id: "mol_t4_ligase",
    name: "T4 DNA 连接酶",
    aliases: ["T4连接酶", "T4 DNA ligase"],
    category: "酶",
    function: "催化 DNA 片段间磷酸二酯键形成",
    composition: "T4 噬菌体 DNA 连接酶",
    notes: "避免反复冻融；过量会增加自连",
    storage: "-20 °C"
  },
  {
    id: "mol_t4_ligase_buffer",
    name: "10× T4 DNA 连接缓冲液",
    aliases: ["10×连接缓冲液", "T4 Ligase Buffer"],
    category: "反应缓冲液",
    function: "提供连接所需的 ATP 与离子环境",
    composition: "Tris-HCl、Mg²⁺、DTT 与 ATP",
    notes: "避免反复冻融导致 ATP 降解；分装使用",
    storage: "-20 °C 分装"
  },
  {
    id: "mol_colony_lysis",
    name: "菌落裂解液",
    aliases: ["菌落裂解缓冲液", "菌落裂解剂"],
    category: "裂解试剂",
    function: "快速裂解释放菌落中的质粒 DNA",
    composition: "Tris、EDTA 与去污剂等（配方随实验室）",
    notes: "95 °C 加热裂解；避免过量菌体抑制 PCR",
    storage: "室温或 4 °C"
  },
  {
    id: "mol_bsa_blocking",
    name: "BSA 封闭液",
    aliases: ["牛血清白蛋白封闭液", "BSA"],
    category: "封闭剂",
    function: "封闭板孔未结合位点，降低非特异吸附",
    composition: "牛血清白蛋白（1–5%）",
    notes: "按浓度配制；避免微生物污染",
    storage: "2–8 °C 短期"
  },
  {
    id: "mol_hrp_antigen",
    name: "HRP 标记抗原",
    aliases: ["酶标抗原", "HRP-抗原"],
    category: "酶标记试剂",
    function: "与样品抗原竞争有限的抗体结合位点",
    composition: "抗原与辣根过氧化物酶偶联物",
    notes: "按说明书稀释；避免反复冻融；避光",
    storage: "2–8 °C 或 -20 °C 分装"
  },
  {
    id: "ftm_medium",
    name: "硫乙醇酸盐流体培养基",
    aliases: ["FTM", "流体硫乙醇酸盐培养基"],
    category: "微生物培养基",
    function: "兼顾需氧菌与厌氧菌的富集培养",
    composition: "胰酪胨、酵母浸出粉、葡萄糖、硫乙醇酸钠、刃天青",
    notes: "避光保存;使用前检查氧化层与促生长能力",
    storage: "2-25 °C，避光"
  },
  {
    id: "tsb_medium",
    name: "胰酪大豆胨液体培养基",
    aliases: ["TSB", "大豆酪蛋白消化物肉汤"],
    category: "微生物培养基",
    function: "用于真菌与需氧菌的富集培养",
    composition: "胰酪胨、大豆胨、葡萄糖、氯化钠",
    notes: "按配方灭菌;灭菌后测 pH",
    storage: "2-25 °C，干燥避光"
  },
  {
    id: "ee_broth",
    name: "肠道菌增菌液体培养基",
    aliases: ["EE 肉汤", "肠道菌增菌肉汤"],
    category: "微生物培养基",
    function: "选择性增菌肠道杆菌并抑制杂菌",
    composition: "胆盐、磷酸盐、乳糖、指示剂",
    notes: "按药典配方灭菌;避光保存",
    storage: "2-25 °C，避光"
  },
  {
    id: "macconkey_agar",
    name: "麦康凯琼脂培养基",
    aliases: ["MacConkey 琼脂", "麦康凯平板"],
    category: "选择性培养基",
    function: "分离革兰阴性肠道菌并区分乳糖发酵",
    composition: "蛋白胨、乳糖、胆盐、中性红",
    notes: "灭菌后倒板;避免过干或过湿",
    storage: "2-8 °C，避光"
  },
  {
    id: "tsb_broth_control",
    name: "胰酪大豆胨液体培养基",
    aliases: ["TSB", "大豆酪蛋白消化物肉汤"],
    category: "微生物培养基",
    function: "用于控制菌的通用增菌与阳性对照培养",
    composition: "胰酪胨、大豆胨、葡萄糖、氯化钠",
    notes: "按配方灭菌;灭菌后测 pH",
    storage: "2-25 °C，干燥避光"
  },
  {
    id: "ts_agar_bio",
    name: "胰酪大豆胨琼脂培养基",
    aliases: ["TSA", "大豆酪蛋白消化物琼脂"],
    category: "微生物培养基",
    function: "用于需氧菌总数计数与菌落形态观察",
    composition: "胰酪胨、大豆胨、葡萄糖、琼脂",
    notes: "灭菌后倒板;避免反复融化",
    storage: "2-25 °C，避光"
  },
  {
    id: "r2a_agar",
    name: "R2A 琼脂培养基",
    aliases: ["R2A 琼脂", "低营养琼脂"],
    category: "微生物培养基",
    function: "低营养配方利于水中与环境受损菌的恢复生长",
    composition: "蛋白胨、酵母提取物、丙酮酸钠、琼脂",
    notes: "倾注前保温约 45 °C;避免过热",
    storage: "2-8 °C，避光"
  },
  {
    id: "sterile_saline",
    name: "无菌生理盐水",
    aliases: ["0.9% 氯化钠溶液", "无菌盐水"],
    category: "稀释液",
    function: "用于样品梯度稀释且不影响微生物活性",
    composition: "0.9% 氯化钠",
    notes: "无菌分装;开封后尽快使用",
    storage: "室温密闭"
  },
  {
    id: "lecithin_tween_neutralizer",
    name: "大豆卵磷脂-吐温80 中和剂",
    aliases: ["卵磷脂吐温中和剂", "中和剂"],
    category: "中和剂",
    function: "终止消毒剂作用并中和其残余杀菌活性",
    composition: "大豆卵磷脂、吐温 80",
    notes: "使用前须做有效性与毒性验证;现配",
    storage: "2-8 °C，避光"
  },
  {
    id: "sterile_hard_water",
    name: "无菌硬水",
    aliases: ["标准硬水", "硬水"],
    category: "试验用水",
    function: "作为阳性对照稀释液以模拟实际水质",
    composition: "含钙镁离子的无菌水",
    notes: "按药典方法配制;无菌分装",
    storage: "室温密闭"
  },
  {
    id: "ts_agar_efficacy",
    name: "胰酪大豆胨琼脂培养基",
    aliases: ["TSA", "大豆酪蛋白消化物琼脂"],
    category: "微生物培养基",
    function: "用于中和后存活菌的回收计数",
    composition: "胰酪胨、大豆胨、葡萄糖、琼脂",
    notes: "灭菌后倒板;避免平板过干",
    storage: "2-25 °C，避光"
  },
  {
    id: "particle_water",
    name: "微粒检查用水",
    aliases: ["微粒检查专用水", "去离子水"],
    category: "检测用水",
    function: "用于仪器冲洗、空白测定与样品稀释且不引入微粒",
    composition: "经 0.22 µm 精密过滤的去离子水",
    notes: "现制现用;密闭保存避免二次污染",
    storage: "室温密闭"
  },
  {
    id: "media_powder",
    name: "培养基干粉",
    aliases: ["CD 培养基干粉", "培养基粉末"],
    category: "培养基",
    function: "提供细胞生长所需的碳源、氨基酸、维生素与无机盐",
    composition: "各组分按配方预混，部分含水解物",
    notes: "易吸潮结块，开封后密封干燥保存",
    storage: "2-8 °C 干燥避光"
  },
  {
    id: "water_for_injection",
    name: "注射用水",
    aliases: ["WFI", "无菌注射用水"],
    category: "溶剂",
    function: "配制培养基与缓冲液的溶剂，内毒素限值严格",
    composition: "高纯水，电导率 ≤1.3 µS/cm（25 °C）",
    notes: "现制现用，避免长时间储存",
    storage: "常温循环或 2-8 °C 短期保存"
  },
  {
    id: "feed_medium",
    name: "补料培养基",
    aliases: ["补料液", "Feed medium"],
    category: "培养基",
    function: "在高密度阶段补充氨基酸、维生素与碳源",
    composition: "浓缩氨基酸与维生素混合液，含少量葡萄糖",
    notes: "按批号分装冻存，避免反复冻融",
    storage: "-20 °C 或 2-8 °C 按说明书"
  },
  {
    id: "depth_filter",
    name: "深层过滤滤板",
    aliases: ["深层滤芯", "Depth filter"],
    category: "耗材",
    function: "通过曲折孔道截留细胞碎片与胶体颗粒",
    composition: "纤维素与硅藻土复合滤材",
    notes: "按载量与压差更换，不可反洗复用",
    storage: "室温干燥"
  },
  {
    id: "diatomite",
    name: "硅藻土",
    aliases: ["助滤剂"],
    category: "耗材",
    function: "作为助滤剂提高过滤通量与澄清度",
    composition: "多孔二氧化硅骨架",
    notes: "粉尘需防护，避免吸入",
    storage: "室温干燥密封"
  },
  {
    id: "virus_filter",
    name: "除病毒纳滤膜",
    aliases: ["病毒滤器", "Planova 类滤膜"],
    category: "耗材",
    function: "以 15-20 nm 孔径物理截留病毒颗粒",
    composition: "亲水性再生纤维素中空纤维膜",
    notes: "使用前后必须做完整性测试，不可复用",
    storage: "室温干燥避光"
  },
  {
    id: "buffer_placeholder_vf",
    name: "纳滤平衡缓冲液",
    aliases: ["病毒过滤缓冲液"],
    category: "缓冲液",
    function: "平衡滤膜并维持蛋白稳定",
    composition: "磷酸盐或组氨酸缓冲体系，含适量盐",
    notes: "与料液体系一致，避免 pH 突变",
    storage: "2-8 °C"
  },
  {
    id: "g25_column",
    name: "G-25 脱盐柱",
    aliases: ["Sephadex G-25 预装柱", "脱盐柱"],
    category: "层析介质",
    function: "按分子大小分离蛋白与小分子盐类",
    composition: "交联葡聚糖凝胶，排阻极限约 5000 Da",
    notes: "易被颗粒堵塞，上样前需离心",
    storage: "2-8 °C 含保存液"
  },
  {
    id: "toc_standard",
    name: "TOC 标准液",
    aliases: ["总有机碳标准溶液"],
    category: "标准品",
    function: "校核 TOC 分析仪的准确度",
    composition: "邻苯二甲酸氢钾配制的水溶液",
    notes: "现配现用，避免有机物污染",
    storage: "2-8 °C 短期保存"
  },
  {
    id: "conductivity_standard",
    name: "电导率标准液",
    aliases: ["电导率校准液"],
    category: "标准品",
    function: "校准电导率仪电极常数",
    composition: "已知浓度的氯化钾溶液",
    notes: "按证书温度使用",
    storage: "室温密封"
  },
  {
    id: "gp_strain",
    name: "促生长试验菌株",
    aliases: ["试验菌种", "金葡菌/铜绿假单胞菌/枯草芽孢杆菌/白念珠菌/黑曲霉"],
    category: "菌种",
    function: "验证培养基促生长能力的标准菌株",
    composition: "药典规定的 5 类代表菌株",
    notes: "生物安全二级操作，按菌种管理",
    storage: "-80 °C 甘油菌或 4 °C 斜面"
  },
  {
    id: "host_dna_std",
    name: "宿主细胞 DNA 标准品",
    aliases: ["CHO DNA 标准品", "宿主 DNA"],
    category: "标准品",
    function: "作为 qPCR 定量的校准品",
    composition: "经纯化并定量的宿主细胞基因组 DNA",
    notes: "避免反复冻融，稀释后当日使用",
    storage: "-20 °C 分装"
  },
  {
    id: "dna_magnetic_beads",
    name: "DNA 提取磁珠",
    aliases: ["磁珠法核酸提取试剂"],
    category: "耗材",
    function: "富集并纯化样品中的残留 DNA",
    composition: "硅基磁珠与裂解结合液",
    notes: "避免磁珠干燥过度影响洗脱",
    storage: "2-8 °C"
  },
  {
    id: "anti_pa_antibody",
    name: "抗 Protein A 抗体",
    aliases: ["HRP 标记抗 Protein A 抗体"],
    category: "抗体",
    function: "特异识别残留 Protein A 并产生酶标信号",
    composition: "多克隆抗体经 HRP 标记",
    notes: "避免反复冻融，稀释后当日使用",
    storage: "2-8 °C 或 -20 °C 分装"
  },
  {
    id: "reporter_cell_line",
    name: "报告基因细胞株",
    aliases: ["效应细胞", "报告细胞"],
    category: "细胞",
    function: "响应产品刺激并产生可检测的报告信号",
    composition: "稳定转染信号通路响应元件的工程细胞株",
    notes: "按细胞库管理，控制传代次数",
    storage: "液氮或 -80 °C"
  },
  {
    id: "reference_standard",
    name: "参比品",
    aliases: ["标准品", "Reference standard"],
    category: "标准品",
    function: "作为效价计算的基准",
    composition: "经标定的代表性批次产品",
    notes: "分装冻存，避免反复冻融",
    storage: "-80 °C 分装"
  },
  {
    id: "osmo_standard",
    name: "渗透压标准液",
    aliases: ["渗透压校准液", "NaCl 标准液"],
    category: "标准品",
    function: "校准渗透压仪的测量准确度",
    composition: "已知摩尔浓度的氯化钠溶液",
    notes: "避免挥发与结晶，开封后按效期使用",
    storage: "室温密封"
  },
  {
    id: "cief_gel",
    name: "cIEF 凝胶",
    aliases: ["等电聚焦凝胶", "毛细管凝胶"],
    category: "耗材",
    function: "在毛细管内提供稳定的分离介质与 pH 梯度环境",
    composition: "交联聚合物凝胶含载体两性电解质",
    notes: "避免气泡与干涸",
    storage: "2-8 °C"
  },
  {
    id: "pi_marker",
    name: "pI 标记物",
    aliases: ["等电点标准品", "pI marker"],
    category: "标准品",
    function: "标定毛细管内 pH 梯度与时间的关系",
    composition: "已知等电点的蛋白混合物",
    notes: "分装冻存，避免反复冻融",
    storage: "-20 °C"
  },
  {
    id: "precast_gel",
    name: "琼脂糖预制胶",
    aliases: ["预制琼脂糖凝胶"],
    category: "耗材",
    function: "提供即用型分离介质，减少制胶差异",
    composition: "琼脂糖浇注于塑料托盘",
    notes: "避免干燥与挤压变形",
    storage: "室温或 2-8 °C"
  },
  {
    id: "gel_dye",
    name: "核酸染料",
    aliases: ["GelRed", "SYBR Safe"],
    category: "染料",
    function: "嵌入 DNA 双链并发出荧光",
    composition: "荧光嵌入型染料",
    notes: "具潜在致突变性，需防护",
    storage: "室温避光"
  },
  {
    id: "cas9_protein",
    name: "Cas9 蛋白",
    aliases: ["SpCas9", "基因编辑酶"],
    category: "酶",
    function: "在 sgRNA 引导下切割目标 DNA 双链",
    composition: "重组表达的 SpCas9 蛋白，含核定位信号",
    notes: "避免反复冻融，冰上操作",
    storage: "-20 °C 或 -80 °C 分装"
  },
  {
    id: "sgrna",
    name: "sgRNA",
    aliases: ["向导 RNA", "guide RNA"],
    category: "核酸",
    function: "引导 Cas9 识别并切割特定位点",
    composition: "体外转录或化学合成的 100 nt 左右 RNA",
    notes: "易降解，需无 RNase 操作",
    storage: "-80 °C 分装"
  },
  {
    id: "dsc_buffer",
    name: "DSC 参比缓冲液",
    aliases: ["DSC 空白缓冲液"],
    category: "缓冲液",
    function: "作为参比池介质，扣除缓冲液热学背景",
    composition: "与样品完全一致的缓冲体系",
    notes: "必须与样品同批同配方",
    storage: "2-8 °C"
  },
  {
    id: "spr_chip",
    name: "SPR 传感芯片",
    aliases: ["CM5 芯片", "传感芯片"],
    category: "耗材",
    function: "提供固定配体的羧甲基葡聚糖表面",
    composition: "金膜表面覆盖羧甲基葡聚糖基质",
    notes: "避免干燥与刮擦，按次数报废",
    storage: "2-8 °C 干燥"
  },
  {
    id: "hbs_ep_buffer",
    name: "HBS-EP 运行缓冲液",
    aliases: ["SPR 运行缓冲液"],
    category: "缓冲液",
    function: "维持生理离子强度与 pH，降低非特异结合",
    composition: "HEPES、NaCl、EDTA 与表面活性剂",
    notes: "过滤脱气后使用",
    storage: "2-8 °C"
  }
];

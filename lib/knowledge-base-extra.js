'use strict';

/** 由 recipes/*.js 生成，请勿手工编辑。 */
module.exports = {
  EXPERIMENT_EXTRA: {
  cell_suspension_batch_culture: {
    id: "cell_suspension_batch_culture",
    name: "CHO 细胞悬浮批培养",
    category: "上游工艺",
    description: "悬浮适应后的 CHO 细胞在搅拌式培养容器中进行批培养，用于重组蛋白的初步表达评估。",
    objective: "评估CHO 细胞悬浮批培养的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "viability", label: "细胞活率", unit: "%", type: 'number', normal: [85, 100], criticalLow: 70, note: "台盼蓝或自动计数仪" },
    { key: "viableCellDensity", label: "活细胞密度", unit: "10⁶ cells/mL", type: 'number', normal: [2, 15], criticalLow: 0.5, criticalHigh: 20, note: "收样前检测" },
    { key: "ph", label: "培养液 pH", unit: "", type: 'number', normal: [6.9, 7.4], criticalLow: 6.7, criticalHigh: 7.6, note: "在线或离线测定" },
    { key: "temperature", label: "培养温度", unit: "°C", type: 'number', normal: [36.5, 37.5], criticalLow: 35.5, criticalHigh: 38.5, note: "培养箱实测" },
    { key: "glucose", label: "葡萄糖浓度", unit: "g/L", type: 'number', normal: [1, 6], criticalLow: 0.5, criticalHigh: 8, note: "低于 1 g/L 提示耗竭" }
    ],
    rules: [
      {
        id: "viability_low", title: "活率过早下降", category: "细胞状态", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "viability" },
        causes: ["营养耗竭", "代谢废物累积", "pH 漂移"],
        actions: ["提前收获", "优化培养基组成", "加强 pH 控制"]
      },
      {
        id: "ph_out", title: "pH 超出范围", category: "过程控制", severity: "medium", likelihood: 0.9,
        condition: { type: "outside", metric: "ph" },
        causes: ["CO₂ 供给异常", "乳酸累积", "碱液添加失效"],
        actions: ["检查 CO₂ 与传感器", "调整通气", "校准 pH"]
      },
      {
        id: "glucose_low", title: "葡萄糖耗竭", category: "代谢", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "glucose" },
        causes: ["接种密度过高", "细胞代谢旺盛", "培养时间过长"],
        actions: ["加强监测并考虑改为流加", "降低接种密度"]
      },
      {
        id: "combo_growth", title: "密度低且活率差", category: "综合", severity: "medium", likelihood: 0.85,
        condition: { type: 'combo', all: [{ type: 'low', metric: "viableCellDensity" }, { type: 'high', metric: "viability" }] },
        causes: ["种子状态差", "培养基不适", "参数不当"],
        actions: ["复壮种子", "更换培养基", "优化温度与转速"]
      }
    ]
  },
  cell_transfection_pei: {
    id: "cell_transfection_pei",
    name: "PEI 介导的哺乳动物细胞瞬时转染",
    category: "上游工艺",
    description: "阳离子聚合物 PEI 与质粒 DNA 形成复合物，转染哺乳动物细胞实现目标蛋白的瞬时表达。",
    objective: "评估PEI 介导的哺乳动物细胞瞬时转染的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "transfectionEfficiency", label: "转染效率", unit: "%", type: 'number', normal: [30, 95], criticalLow: 10, note: "荧光标记或报告基因评估" },
    { key: "viability24h", label: "转染后 24h 活率", unit: "%", type: 'number', normal: [80, 100], criticalLow: 60, note: "反映 PEI 细胞毒性" },
    { key: "peiDnaRatio", label: "PEI:DNA 质量比", unit: "", type: 'number', normal: [2, 4], criticalLow: 1, criticalHigh: 6, note: "按细胞系优化区间" },
    { key: "expressionTiter", label: "目标蛋白表达滴度", unit: "mg/L", type: 'number', normal: [0.5, 50], criticalLow: 0.1, note: "按检测方法测定" },
    { key: "dnaA260A280", label: "质粒 A260/A280", unit: "", type: 'number', normal: [1.8, 1.9], criticalLow: 1.6, criticalHigh: 2, note: "转染级质粒纯度" }
    ],
    rules: [
      {
        id: "transfection_low", title: "转染效率偏低", category: "转染效果", severity: "high", likelihood: 0.7,
        condition: { type: "low", metric: "transfectionEfficiency" },
        causes: ["细胞状态差", "PEI/DNA 比例不当", "质粒质量差"],
        actions: ["优化细胞密度与状态", "调整配比", "使用转染级质粒"]
      },
      {
        id: "viability_post_low", title: "转染后活率下降", category: "细胞毒性", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "viability24h" },
        causes: ["PEI 过量", "复合物孵育过久", "未及时换液"],
        actions: ["降低 PEI 用量", "缩短孵育时间", "4-6 h 换液"]
      },
      {
        id: "ratio_out", title: "PEI/DNA 比例偏离", category: "方法优化", severity: "medium", likelihood: 0.85,
        condition: { type: "outside", metric: "peiDnaRatio" },
        causes: ["配制误差", "核酸或试剂浓度不准"],
        actions: ["重新定量", "按质量比精确配制"]
      },
      {
        id: "combo_expr", title: "效率低且活率差", category: "综合", severity: "high", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "transfectionEfficiency" }, { type: 'high', metric: "viability24h" }] },
        causes: ["细胞不健康", "试剂失效", "操作误差"],
        actions: ["重做细胞准备", "更换试剂批次", "规范操作"]
      }
    ]
  },
  cell_cloning_limiting_dilution: {
    id: "cell_cloning_limiting_dilution",
    name: "有限稀释法细胞克隆化",
    category: "上游工艺",
    description: "通过系列稀释将细胞接种到 96 孔板，使每孔至多含一个细胞，从而筛选单克隆细胞株。",
    objective: "评估有限稀释法细胞克隆化的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "cellsPerWell", label: "每孔细胞数", unit: "个/孔", type: 'number', normal: [0.3, 0.8], criticalLow: 0.1, criticalHigh: 1.5, note: "按泊松分布设定" },
    { key: "singleCellWellRate", label: "单细胞孔比例", unit: "%", type: 'number', normal: [20, 50], criticalLow: 10, criticalHigh: 70, note: "镜检统计" },
    { key: "cloningEfficiency", label: "克隆形成率", unit: "%", type: 'number', normal: [10, 60], criticalLow: 5, criticalHigh: 80, note: "单细胞孔形成克隆的比例" },
    { key: "monoclonality", label: "单克隆确认率", unit: "%", type: 'number', normal: [90, 100], criticalLow: 70, note: "镜检确认" },
    { key: "contamination", label: "污染孔比例", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 5, note: "含阴性对照" }
    ],
    rules: [
      {
        id: "cellsPerWell_high", title: "每孔细胞数过多", category: "克隆化设计", severity: "high", likelihood: 0.8,
        condition: { type: "high", metric: "cellsPerWell" },
        causes: ["稀释倍数不足", "计数偏差", "细胞成团"],
        actions: ["重新计数", "充分分散细胞", "加大稀释倍数"]
      },
      {
        id: "cloning_low", title: "克隆形成率低", category: "细胞状态", severity: "medium", likelihood: 0.7,
        condition: { type: "low", metric: "cloningEfficiency" },
        causes: ["单细胞生长困难", "培养液不适", "接种损伤"],
        actions: ["使用条件培养基", "轻柔操作", "优化培养液"]
      },
      {
        id: "contam_high", title: "污染孔比例升高", category: "无菌操作", severity: "high", likelihood: 0.7,
        condition: { type: "high", metric: "contamination" },
        causes: ["操作污染", "培养液污染", "培养箱污染"],
        actions: ["规范无菌操作", "更换培养液", "排查培养箱"]
      },
      {
        id: "combo_clone", title: "单细胞孔少且克隆差", category: "综合", severity: "medium", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "singleCellWellRate" }, { type: 'high', metric: "cloningEfficiency" }] },
        causes: ["稀释设计不当", "细胞活性差"],
        actions: ["重做稀释梯度", "改善细胞状态"]
      }
    ]
  },
  cell_bank_establishment: {
    id: "cell_bank_establishment",
    name: "主细胞库（MCB）与工作细胞库（WCB）建立",
    category: "上游工艺",
    description: "将检定合格的细胞分级冻存建立主细胞库与工作细胞库，保证生产用细胞来源一致、可追溯。",
    objective: "评估主细胞库（MCB）与工作细胞库（WCB）建立的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "preFreezeViability", label: "冻存前活率", unit: "%", type: 'number', normal: [90, 100], criticalLow: 80, note: "细胞收集后测定" },
    { key: "postThawViability", label: "复苏后活率", unit: "%", type: 'number', normal: [80, 100], criticalLow: 60, note: "抽样检测" },
    { key: "cellsPerVial", label: "每管细胞数", unit: "10⁶ cells", type: 'number', normal: [1, 10], criticalLow: 0.5, criticalHigh: 15, note: "按验证配方" },
    { key: "coolingRate", label: "降温速率", unit: "°C/min", type: 'number', normal: [0.5, 2], criticalLow: 0.2, criticalHigh: 3, note: "约 -1 °C/min" },
    { key: "passageLimit", label: "传代次数上限", unit: "代", type: 'number', normal: [5, 20], criticalLow: 2, criticalHigh: 30, note: "MCB 至生产" }
    ],
    rules: [
      {
        id: "viability_post_low", title: "复苏活率偏低", category: "冻存质量", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "postThawViability" },
        causes: ["降温速率不当", "冻存液失效", "复苏操作过慢"],
        actions: ["规范程序降温", "更换冻存液", "快速复苏"]
      },
      {
        id: "cooling_out", title: "降温速率偏离", category: "工艺控制", severity: "medium", likelihood: 0.85,
        condition: { type: "outside", metric: "coolingRate" },
        causes: ["程序降温盒失效", "冰箱温度波动"],
        actions: ["校准降温程序", "检查设备状态"]
      },
      {
        id: "viability_pre_low", title: "冻存前活率不足", category: "细胞状态", severity: "high", likelihood: 0.9,
        condition: { type: "low", metric: "preFreezeViability" },
        causes: ["细胞老化", "培养条件不适"],
        actions: ["在对数期收集细胞", "优化培养条件"]
      },
      {
        id: "combo_bank", title: "复苏活率低且传代超限", category: "综合", severity: "high", likelihood: 0.85,
        condition: { type: 'combo', all: [{ type: 'low', metric: "postThawViability" }, { type: 'high', metric: "passageLimit" }] },
        causes: ["细胞状态差", "传代次数过多"],
        actions: ["重新建库", "严格限制传代次数"]
      }
    ]
  },
  cell_counting_viability: {
    id: "cell_counting_viability",
    name: "细胞计数与活率分析",
    category: "分析检测",
    description: "采用细胞计数板或自动计数仪结合台盼蓝排斥法，测定细胞密度与活率。",
    objective: "评估细胞计数与活率分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "totalCellDensity", label: "总细胞密度", unit: "10⁶ cells/mL", type: 'number', normal: [0.1, 10], criticalLow: 0.01, criticalHigh: 20, note: "按稀释倍数折算" },
    { key: "viability", label: "细胞活率", unit: "%", type: 'number', normal: [85, 100], criticalLow: 60, note: "台盼蓝排斥法" },
    { key: "viableCellDensity", label: "活细胞密度", unit: "10⁶ cells/mL", type: 'number', normal: [0.1, 10], criticalLow: 0.01, criticalHigh: 20, note: "总密度乘活率" },
    { key: "countCv", label: "计数 CV", unit: "%", type: 'number', normal: [0, 10], criticalHigh: 20, note: "两次重复间" },
    { key: "cellCount", label: "计数细胞数", unit: "个", type: 'number', normal: [100, 300], criticalLow: 50, note: "每样统计细胞数" }
    ],
    rules: [
      {
        id: "viability_low", title: "活率偏低", category: "细胞质量", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "viability" },
        causes: ["染色放置过久", "细胞受损", "离心损伤"],
        actions: ["尽快完成计数", "优化消化与离心", "复查培养状态"]
      },
      {
        id: "cv_high", title: "重复性差", category: "操作一致性", severity: "medium", likelihood: 0.8,
        condition: { type: "high", metric: "countCv" },
        causes: ["悬液未混匀", "加样气泡", "计数细胞过少"],
        actions: ["充分混匀", "避免气泡", "增加计数细胞数"]
      },
      {
        id: "count_low", title: "计数细胞数不足", category: "方法有效性", severity: "medium", likelihood: 0.75,
        condition: { type: "low", metric: "cellCount" },
        causes: ["稀释过度", "取样体积过小"],
        actions: ["调整稀释倍数", "增加取样体积"]
      },
      {
        id: "combo_viability", title: "活率低且重复性差", category: "综合", severity: "high", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "viability" }, { type: 'high', metric: "countCv" }] },
        causes: ["细胞状态差", "操作不规范"],
        actions: ["复测并规范操作", "检查细胞健康状况"]
      }
    ]
  },
  cell_metabolite_analysis: {
    id: "cell_metabolite_analysis",
    name: "细胞代谢物（葡萄糖/乳酸/氨）分析",
    category: "分析检测",
    description: "用酶法试剂盒测定细胞培养上清中的葡萄糖、乳酸与氨浓度，监控细胞代谢状态。",
    objective: "评估细胞代谢物（葡萄糖/乳酸/氨）分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "glucose", label: "葡萄糖浓度", unit: "g/L", type: 'number', normal: [1, 6], criticalLow: 0.5, criticalHigh: 8, note: "培养上清" },
    { key: "lactate", label: "乳酸浓度", unit: "g/L", type: 'number', normal: [0.3, 3], criticalLow: 0, criticalHigh: 5, note: "代谢副产物" },
    { key: "ammonia", label: "氨浓度", unit: "mM", type: 'number', normal: [0.5, 5], criticalLow: 0, criticalHigh: 10, note: "毒性代谢物" },
    { key: "standardR2", label: "标准曲线 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.95, note: "线性或四参数拟合" },
    { key: "wellCv", label: "复孔 CV", unit: "%", type: 'number', normal: [0, 10], criticalHigh: 20, note: "加样一致性" }
    ],
    rules: [
      {
        id: "glucose_low", title: "葡萄糖耗竭", category: "营养状态", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "glucose" },
        causes: ["细胞密度高", "补料不足", "培养时间过长"],
        actions: ["及时补料", "调整流加策略", "缩短取样间隔"]
      },
      {
        id: "lactate_high", title: "乳酸累积", category: "代谢副产物", severity: "medium", likelihood: 0.85,
        condition: { type: "high", metric: "lactate" },
        causes: ["糖酵解旺盛", "氧供不足", "葡萄糖过量"],
        actions: ["降低葡萄糖浓度", "提高溶氧", "优化补料"]
      },
      {
        id: "ammonia_high", title: "氨累积", category: "毒性代谢物", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "ammonia" },
        causes: ["谷氨酰胺分解", "细胞死亡", "培养过久"],
        actions: ["控制谷氨酰胺用量", "及时换液", "缩短培养周期"]
      },
      {
        id: "combo_metab", title: "代谢失衡", category: "综合", severity: "high", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "glucose" }, { type: 'high', metric: "lactate" }] },
        causes: ["营养供给与副产物生成失衡"],
        actions: ["综合优化补料与溶氧控制"]
      }
    ]
  },
  shake_flask_seed_expansion: {
    id: "shake_flask_seed_expansion",
    name: "摇瓶种子扩增",
    category: "上游工艺",
    description: "在摇瓶中逐级扩大培养种子细胞，为生物反应器提供足量且状态一致的接种物。",
    objective: "评估摇瓶种子扩增的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "viability", label: "种子活率", unit: "%", type: 'number', normal: [90, 100], criticalLow: 75, note: "转接前检测" },
    { key: "viableCellDensity", label: "活细胞密度", unit: "10⁶ cells/mL", type: 'number', normal: [2, 10], criticalLow: 0.5, criticalHigh: 15, note: "转接窗口" },
    { key: "fillRatio", label: "装液量比例", unit: "%", type: 'number', normal: [20, 40], criticalLow: 10, criticalHigh: 50, note: "影响氧传质" },
    { key: "shakeSpeed", label: "摇床转速", unit: "rpm", type: 'number', normal: [120, 200], criticalLow: 80, criticalHigh: 250, note: "按容器与轨道调整" },
    { key: "ph", label: "培养液 pH", unit: "", type: 'number', normal: [6.9, 7.4], criticalLow: 6.7, criticalHigh: 7.6, note: "离线检测" }
    ],
    rules: [
      {
        id: "viability_low", title: "种子活率不足", category: "细胞状态", severity: "high", likelihood: 0.9,
        condition: { type: "low", metric: "viability" },
        causes: ["培养过久", "营养耗竭", "污染"],
        actions: ["及时转接", "补充新鲜培养基", "排查污染"]
      },
      {
        id: "density_low", title: "种子密度偏低", category: "生长状态", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "viableCellDensity" },
        causes: ["接种密度低", "培养时间短", "培养基不适"],
        actions: ["提高接种密度", "延长培养", "优化培养基"]
      },
      {
        id: "fill_out", title: "装液量不当", category: "氧传质", severity: "medium", likelihood: 0.85,
        condition: { type: "outside", metric: "fillRatio" },
        causes: ["装液过多或过少"],
        actions: ["将装液量调整至容器体积的 20-40%"]
      },
      {
        id: "combo_seed", title: "活率低且密度低", category: "综合", severity: "high", likelihood: 0.85,
        condition: { type: 'combo', all: [{ type: 'low', metric: "viability" }, { type: 'high', metric: "viableCellDensity" }] },
        causes: ["种子老化", "培养条件不佳"],
        actions: ["重新复苏种子", "优化培养参数"]
      }
    ]
  },
  e_coli_fermentation: {
    id: "e_coli_fermentation",
    name: "大肠杆菌高密度发酵表达",
    category: "上游工艺",
    description: "大肠杆菌在搅拌通气发酵罐中高密度生长，并经 IPTG 诱导表达重组蛋白。",
    objective: "评估大肠杆菌高密度发酵表达的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "od600", label: "菌体密度 OD600", unit: "", type: 'number', normal: [20, 100], criticalLow: 5, criticalHigh: 150, note: "诱导终点测定" },
    { key: "do", label: "溶氧 DO", unit: "%", type: 'number', normal: [20, 60], criticalLow: 10, criticalHigh: 80, note: "在线监测" },
    { key: "ph", label: "发酵液 pH", unit: "", type: 'number', normal: [6.8, 7.2], criticalLow: 6.5, criticalHigh: 7.5, note: "在线监测" },
    { key: "acetate", label: "乙酸浓度", unit: "g/L", type: 'number', normal: [0, 2], criticalLow: 0, criticalHigh: 4, note: "副产物抑制指标" },
    { key: "temperature", label: "培养温度", unit: "°C", type: 'number', normal: [25, 37], criticalLow: 22, criticalHigh: 39, note: "生长期与诱导期" }
    ],
    rules: [
      {
        id: "do_low", title: "溶氧不足", category: "过程控制", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "do" },
        causes: ["通气不足", "搅拌故障", "菌体密度过高"],
        actions: ["提高搅拌与通气", "补充纯氧", "降低补料速率"]
      },
      {
        id: "acetate_high", title: "乙酸累积", category: "代谢副产物", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "acetate" },
        causes: ["葡萄糖过量", "氧限制", "补料过快"],
        actions: ["降低补料速率", "提高溶氧", "调整流加策略"]
      },
      {
        id: "od_low", title: "菌体密度不足", category: "生长状态", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "od600" },
        causes: ["种子活力差", "营养不足", "培养时间不足"],
        actions: ["检查种子质量", "优化培养基", "延长培养"]
      },
      {
        id: "combo_ferment", title: "高密度伴副产物累积", category: "综合", severity: "high", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "od600" }, { type: 'high', metric: "acetate" }] },
        causes: ["补料与溶氧失衡"],
        actions: ["协同优化补料速率与通气量"]
      }
    ]
  },
  pichia_fermentation: {
    id: "pichia_fermentation",
    name: "毕赤酵母表达培养",
    category: "上游工艺",
    description: "毕赤酵母在含甲醇的培养基中诱导表达重组蛋白，采用高密度发酵提高产量。",
    objective: "评估毕赤酵母表达培养的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "cellWetWeight", label: "菌体湿重", unit: "g/L", type: 'number', normal: [100, 200], criticalLow: 50, criticalHigh: 250, note: "诱导终点测定" },
    { key: "methanol", label: "甲醇残留浓度", unit: "%", type: 'number', normal: [0.2, 2], criticalLow: 0, criticalHigh: 2.5, note: "流加控制指标" },
    { key: "do", label: "溶氧 DO", unit: "%", type: 'number', normal: [20, 60], criticalLow: 10, criticalHigh: 80, note: "在线监测" },
    { key: "ph", label: "发酵液 pH", unit: "", type: 'number', normal: [5, 6], criticalLow: 4.5, criticalHigh: 6.5, note: "在线监测" },
    { key: "temperature", label: "培养温度", unit: "°C", type: 'number', normal: [28, 30], criticalLow: 26, criticalHigh: 32, note: "生长期与诱导期" }
    ],
    rules: [
      {
        id: "do_low", title: "溶氧不足", category: "过程控制", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "do" },
        causes: ["甲醇流加过快", "通气不足", "菌体密度高"],
        actions: ["降低甲醇流加", "提高通气与搅拌", "补充纯氧"]
      },
      {
        id: "methanol_high", title: "甲醇累积", category: "底物控制", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "methanol" },
        causes: ["流加过量", "代谢受限", "温度偏低"],
        actions: ["降低流加速率", "适当提高温度", "监测残留"]
      },
      {
        id: "biomass_low", title: "菌体量不足", category: "生长状态", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "cellWetWeight" },
        causes: ["甘油阶段不足", "营养缺乏", "种子活力差"],
        actions: ["延长增殖阶段", "补充营养", "复壮种子"]
      },
      {
        id: "combo_pichia", title: "高密度伴甲醇累积", category: "综合", severity: "high", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "cellWetWeight" }, { type: 'high', metric: "methanol" }] },
        causes: ["碳源供给与代谢能力失衡"],
        actions: ["协同优化流加速率与溶氧控制"]
      }
    ]
  },
  strain_preservation: {
    id: "strain_preservation",
    name: "菌种保藏与复苏",
    category: "上游工艺",
    description: "采用甘油低温保藏法保存菌种，并按规范复苏以保持菌株活性与遗传稳定。",
    objective: "评估菌种保藏与复苏的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "glycerolConc", label: "甘油终浓度", unit: "%", type: 'number', normal: [15, 20], criticalLow: 10, criticalHigh: 25, note: "冷冻保护剂浓度" },
    { key: "recoveryViability", label: "复苏活率", unit: "%", type: 'number', normal: [70, 95], criticalLow: 50, note: "按菌株确定" },
    { key: "storageTemp", label: "保藏温度", unit: "°C", type: 'number', normal: [-196, -80], criticalLow: -70, note: "越低越稳定" },
    { key: "purity", label: "纯度合格率", unit: "%", type: 'number', normal: [95, 100], criticalLow: 80, note: "单菌落形态检查" },
    { key: "od600", label: "保藏前菌液 OD600", unit: "", type: 'number', normal: [1, 10], criticalLow: 0.5, criticalHigh: 15, note: "浓缩后测定" }
    ],
    rules: [
      {
        id: "viability_low", title: "复苏活率偏低", category: "保藏质量", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "recoveryViability" },
        causes: ["甘油浓度不当", "降温过慢", "反复冻融"],
        actions: ["优化甘油浓度", "快速冷冻", "避免反复冻融"]
      },
      {
        id: "glycerol_out", title: "甘油浓度偏离", category: "配方控制", severity: "medium", likelihood: 0.85,
        condition: { type: "outside", metric: "glycerolConc" },
        causes: ["配制误差", "混合不均匀"],
        actions: ["重新配制保护剂", "充分混匀"]
      },
      {
        id: "purity_low", title: "纯度不合格", category: "菌种管理", severity: "high", likelihood: 0.9,
        condition: { type: "low", metric: "purity" },
        causes: ["污染", "菌种退化", "操作不当"],
        actions: ["重新分离纯化", "复核菌种身份"]
      },
      {
        id: "combo_strain", title: "活率低且纯度差", category: "综合", severity: "high", likelihood: 0.85,
        condition: { type: 'combo', all: [{ type: 'low', metric: "recoveryViability" }, { type: 'high', metric: "purity" }] },
        causes: ["保藏条件不当", "污染"],
        actions: ["重新保藏", "复核菌种身份"]
      }
    ]
  },
  phage_titer_assay: {
    id: "phage_titer_assay",
    name: "噬菌体效价测定（双层琼脂法）",
    category: "分析检测",
    description: "采用双层琼脂平板法通过噬菌斑计数测定噬菌体样品的效价（PFU/mL）。",
    objective: "评估噬菌体效价测定（双层琼脂法）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "phageTiter", label: "噬菌体效价", unit: "PFU/mL", type: 'number', normal: [100000, 100000000000], criticalLow: 10000, criticalHigh: 1000000000000, note: "按稀释度折算" },
    { key: "plaqueCount", label: "可计数噬菌斑数", unit: "个/板", type: 'number', normal: [30, 300], criticalLow: 10, note: "选择有效稀释度" },
    { key: "hostDensity", label: "宿主菌浓度", unit: "CFU/mL", type: 'number', normal: [10000000, 1000000000], criticalLow: 1000000, criticalHigh: 10000000000, note: "对数生长期" },
    { key: "topAgarTemp", label: "顶层软琼脂温度", unit: "°C", type: 'number', normal: [45, 50], criticalLow: 42, criticalHigh: 55, note: "倒板前温度" },
    { key: "replicateCv", label: "平行板 CV", unit: "%", type: 'number', normal: [0, 20], criticalHigh: 30, note: "双平板间" }
    ],
    rules: [
      {
        id: "plaque_out", title: "噬菌斑数不在有效范围", category: "计数有效性", severity: "high", likelihood: 0.8,
        condition: { type: "outside", metric: "plaqueCount" },
        causes: ["稀释度不当", "宿主菌浓度不准", "吸附不充分"],
        actions: ["调整稀释梯度", "校准宿主浓度", "延长吸附时间"]
      },
      {
        id: "agar_temp_high", title: "软琼脂温度过高", category: "操作控制", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "topAgarTemp" },
        causes: ["融化后未充分冷却", "温度未平衡"],
        actions: ["冷却至 45-50 °C 后再倒板"]
      },
      {
        id: "titer_low", title: "效价偏低", category: "样品状态", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "phageTiter" },
        causes: ["样品失活", "稀释误差", "宿主不敏感"],
        actions: ["复查样品", "规范稀释", "更换敏感宿主菌"]
      },
      {
        id: "combo_phage", title: "效价低且斑数少", category: "综合", severity: "medium", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "phageTiter" }, { type: 'high', metric: "plaqueCount" }] },
        causes: ["样品问题或操作误差"],
        actions: ["复测并规范操作"]
      }
    ]
  },
  fermentation_parameter_monitoring: {
    id: "fermentation_parameter_monitoring",
    name: "发酵过程参数监测（DO/pH/OD）",
    category: "分析检测",
    description: "在线与离线相结合监测发酵过程的溶氧、pH 与菌体密度，保障过程稳定与可追溯。",
    objective: "评估发酵过程参数监测（DO/pH/OD）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "do", label: "溶氧 DO", unit: "%", type: 'number', normal: [20, 60], criticalLow: 10, criticalHigh: 80, note: "在线监测" },
    { key: "ph", label: "发酵液 pH", unit: "", type: 'number', normal: [6.8, 7.2], criticalLow: 6.5, criticalHigh: 7.5, note: "在线监测" },
    { key: "od600", label: "菌体密度 OD600", unit: "", type: 'number', normal: [0.5, 50], criticalLow: 0.1, criticalHigh: 100, note: "离线测定" },
    { key: "temperature", label: "发酵温度", unit: "°C", type: 'number', normal: [30, 37], criticalLow: 28, criticalHigh: 39, note: "按菌种设定" },
    { key: "sampleInterval", label: "离线取样间隔", unit: "h", type: 'number', normal: [2, 4], criticalLow: 1, criticalHigh: 6, note: "关键阶段缩短间隔" }
    ],
    rules: [
      {
        id: "do_low", title: "溶氧过低", category: "过程异常", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "do" },
        causes: ["通气不足", "搅拌故障", "耗氧速率激增"],
        actions: ["提高搅拌与通气", "补充纯氧", "降低补料速率"]
      },
      {
        id: "ph_out", title: "pH 偏离范围", category: "过程异常", severity: "high", likelihood: 0.85,
        condition: { type: "outside", metric: "ph" },
        causes: ["代谢产酸或产碱", "加料失效", "电极漂移"],
        actions: ["调整补酸或补碱", "校准电极", "排查污染"]
      },
      {
        id: "od_low", title: "菌体生长缓慢", category: "生长异常", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "od600" },
        causes: ["种子活力差", "营养不足", "培养条件不适"],
        actions: ["检查种子", "优化培养条件", "适当延长培养"]
      },
      {
        id: "combo_process", title: "多参数同时异常", category: "综合", severity: "high", likelihood: 0.8,
        condition: { type: 'combo', all: [{ type: 'low', metric: "do" }, { type: 'high', metric: "ph" }] },
        causes: ["代谢失衡或污染"],
        actions: ["综合排查并调整过程控制策略"]
      }
    ]
  },
  cation_exchange_chrom: {
    id: "cation_exchange_chrom",
    name: "阳离子交换层析",
    category: "下游工艺",
    description: "利用带负电填料在低 pH、低电导下捕获带正电蛋白，用盐梯度洗脱实现分离",
    objective: "评估阳离子交换层析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "equilPh", label: "上样 pH", unit: "", type: 'number', normal: [4.5, 6], criticalLow: 4, criticalHigh: 7, note: "应低于目标蛋白 pI" },
    { key: "loadConductivity", label: "上样电导", unit: "mS/cm", type: 'number', normal: [2, 8], criticalLow: 0, criticalHigh: 15, note: "过高导致不结合" },
    { key: "dynamicCapacity", label: "动态载量", unit: "mg/mL", type: 'number', normal: [10, 30], criticalLow: 5, criticalHigh: 40, note: "按 10% 突破计" },
    { key: "elutionRecovery", label: "洗脱回收率", unit: "%", type: 'number', normal: [70, 95], criticalLow: 50, criticalHigh: 100, note: "以目标蛋白计" },
    { key: "peakPurity", label: "目标峰纯度", unit: "%", type: 'number', normal: [85, 99], criticalLow: 60, note: "SEC 或电泳评估" }
    ],
    rules: [
      {
        id: "cex_no_binding", title: "目标蛋白未结合", category: "分离效果", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "dynamicCapacity" },
        causes: ["上样 pH 高于 pI", "上样电导过高", "树脂未充分平衡"],
        actions: ["降低上样 pH 至 pI 以下", "透析脱盐", "延长平衡至 3-5 CV"]
      },
      {
        id: "cex_low_recovery", title: "洗脱回收率偏低", category: "收率", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "elutionRecovery" },
        causes: ["盐终浓度不足", "洗脱体积过小", "低 pH 下蛋白沉淀"],
        actions: ["提高盐终浓度", "增加洗脱体积", "调整 pH 远离 pI"]
      },
      {
        id: "cex_purity_low", title: "目标峰纯度不足", category: "质量", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "peakPurity" },
        causes: ["上样过载", "洗涤不充分", "盐梯度过陡"],
        actions: ["降低上样量", "增加洗涤 CV", "放缓盐梯度"]
      }
    ]
  },
  anion_exchange_chrom: {
    id: "anion_exchange_chrom",
    name: "阴离子交换层析",
    category: "下游工艺",
    description: "利用带正电填料在高于蛋白等电点的 pH 下捕获带负电蛋白，盐梯度洗脱分离",
    objective: "评估阴离子交换层析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "equilPh", label: "上样 pH", unit: "", type: 'number', normal: [7.5, 9], criticalLow: 7, criticalHigh: 9.5, note: "应高于目标蛋白 pI" },
    { key: "loadConductivity", label: "上样电导", unit: "mS/cm", type: 'number', normal: [2, 8], criticalLow: 0, criticalHigh: 15, note: "过高导致不结合" },
    { key: "dynamicCapacity", label: "动态载量", unit: "mg/mL", type: 'number', normal: [10, 40], criticalLow: 5, criticalHigh: 50, note: "按 10% 突破计" },
    { key: "elutionRecovery", label: "洗脱回收率", unit: "%", type: 'number', normal: [70, 95], criticalLow: 50, criticalHigh: 100, note: "以目标蛋白计" },
    { key: "peakPurity", label: "目标峰纯度", unit: "%", type: 'number', normal: [85, 99], criticalLow: 60, note: "SEC 或电泳评估" }
    ],
    rules: [
      {
        id: "aex_no_binding", title: "目标蛋白未结合", category: "分离效果", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "dynamicCapacity" },
        causes: ["上样 pH 低于 pI", "上样电导过高", "平衡不充分"],
        actions: ["提高上样 pH 至 pI 以上", "透析脱盐", "延长平衡"]
      },
      {
        id: "aex_low_recovery", title: "洗脱回收率偏低", category: "收率", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "elutionRecovery" },
        causes: ["盐终浓度不足", "洗脱体积过小", "蛋白在高 pH 不稳定"],
        actions: ["提高盐终浓度", "增加洗脱体积", "适度降低 pH"]
      },
      {
        id: "aex_purity_low", title: "目标峰纯度不足", category: "质量", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "peakPurity" },
        causes: ["上样过载", "洗涤不足", "梯度太陡"],
        actions: ["降低上样量", "增加洗涤 CV", "放缓盐梯度"]
      }
    ]
  },
  hydrophobic_interaction_chrom: {
    id: "hydrophobic_interaction_chrom",
    name: "疏水作用层析（HIC）",
    category: "下游工艺",
    description: "在高盐条件下使蛋白疏水区与疏水配基结合，随盐浓度降低而洗脱分离",
    objective: "评估疏水作用层析（HIC）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "loadSalt", label: "上样硫酸铵浓度", unit: "M", type: 'number', normal: [1, 1.5], criticalLow: 0.5, criticalHigh: 2, note: "过低不结合、过高易沉淀" },
    { key: "dynamicCapacity", label: "动态载量", unit: "mg/mL", type: 'number', normal: [5, 20], criticalLow: 2, criticalHigh: 30, note: "按 10% 突破计" },
    { key: "elutionRecovery", label: "洗脱回收率", unit: "%", type: 'number', normal: [60, 90], criticalLow: 40, criticalHigh: 100, note: "以目标蛋白计" },
    { key: "peakPurity", label: "目标峰纯度", unit: "%", type: 'number', normal: [80, 98], criticalLow: 60, note: "SEC 评估" },
    { key: "aggregate", label: "聚集体比例", unit: "%", type: 'number', normal: [0, 5], criticalHigh: 10, note: "SEC 检测" }
    ],
    rules: [
      {
        id: "hic_no_binding", title: "目标蛋白未结合", category: "分离效果", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "loadSalt" },
        causes: ["上样盐浓度不足", "蛋白疏水性弱", "填料类型不当"],
        actions: ["补加硫酸铵至 1.0-1.5 M", "改用疏水性更强填料", "降低上样温度"]
      },
      {
        id: "hic_low_recovery", title: "洗脱回收率偏低", category: "收率", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "elutionRecovery" },
        causes: ["洗脱终点盐浓度不够低", "洗脱体积不足", "蛋白在界面变性"],
        actions: ["洗脱终点降至 0 M 盐", "增加洗脱 CV", "加入稳定剂"]
      },
      {
        id: "hic_aggregate_high", title: "聚集体比例偏高", category: "质量", severity: "high", likelihood: 0.82,
        condition: { type: "high", metric: "aggregate" },
        causes: ["上样盐浓度过高", "洗脱流速过快", "蛋白本身不稳定"],
        actions: ["优化盐浓度", "降低流速", "添加稳定剂"]
      }
    ]
  },
  protein_g_affinity: {
    id: "protein_g_affinity",
    name: "Protein G 亲和层析",
    category: "下游工艺",
    description: "利用 Protein G 与 IgG Fc 区的特异性亲和实现抗体一步捕获，低 pH 或离液盐洗脱",
    objective: "评估Protein G 亲和层析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "bindingPh", label: "上样 pH", unit: "", type: 'number', normal: [6.5, 8], criticalLow: 5.5, criticalHigh: 8.5, note: "偏离影响 Fc 结合" },
    { key: "dynamicCapacity", label: "动态载量", unit: "mg/mL", type: 'number', normal: [10, 30], criticalLow: 5, criticalHigh: 40, note: "IgG 载量" },
    { key: "elutionRecovery", label: "洗脱回收率", unit: "%", type: 'number', normal: [80, 98], criticalLow: 60, criticalHigh: 100, note: "以 IgG 计" },
    { key: "eluatePh", label: "中和后 pH", unit: "", type: 'number', normal: [5, 7], criticalLow: 4, criticalHigh: 8, note: "避免聚集" },
    { key: "purity", label: "抗体纯度", unit: "%", type: 'number', normal: [90, 99], criticalLow: 70, note: "SEC/电泳评估" }
    ],
    rules: [
      {
        id: "protg_low_binding", title: "抗体结合不足", category: "分离效果", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "dynamicCapacity" },
        causes: ["上样 pH 偏离", "填料载量衰减", "流速过快"],
        actions: ["调 pH 至 6.5-8.0", "降低流速", "评估或更换填料"]
      },
      {
        id: "protg_low_recovery", title: "洗脱回收率偏低", category: "收率", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "elutionRecovery" },
        causes: ["洗脱 pH 不够低", "中和不及时导致聚集", "洗脱体积不足"],
        actions: ["洗脱 pH 降至 2.7", "预置中和液", "增加洗脱体积"]
      },
      {
        id: "protg_purity_low", title: "抗体纯度不足", category: "质量", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "purity" },
        causes: ["上样过载", "洗涤不充分", "非特异结合"],
        actions: ["降低上样量", "增加洗涤", "提高洗涤盐浓度"]
      }
    ]
  },
  immunoaffinity_chrom: {
    id: "immunoaffinity_chrom",
    name: "免疫亲和层析",
    category: "下游工艺",
    description: "将特异性抗体或抗原偶联到活化基质，依靠抗原-抗体特异性识别高选择性捕获目标物",
    objective: "评估免疫亲和层析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "couplingRate", label: "偶联率", unit: "%", type: 'number', normal: [70, 95], criticalLow: 50, criticalHigh: 100, note: "按偶联前后蛋白差计算" },
    { key: "ligandDensity", label: "配基密度", unit: "mg/mL", type: 'number', normal: [2, 15], criticalLow: 1, criticalHigh: 20, note: "每 mL 树脂偶联量" },
    { key: "bindingRecovery", label: "捕获回收率", unit: "%", type: 'number', normal: [60, 90], criticalLow: 40, criticalHigh: 95, note: "上样目标被捕获比例" },
    { key: "elutionRecovery", label: "洗脱回收率", unit: "%", type: 'number', normal: [50, 85], criticalLow: 30, criticalHigh: 95, note: "以捕获量计" },
    { key: "purity", label: "洗脱纯度", unit: "%", type: 'number', normal: [85, 99], criticalLow: 60, note: "SDS-PAGE/SEC 评估" }
    ],
    rules: [
      {
        id: "ia_low_coupling", title: "偶联率偏低", category: "固定化", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "couplingRate" },
        causes: ["活化基质失效", "偶联 pH 不当", "配基浓度不足"],
        actions: ["使用新鲜活化基质", "优化 pH 至 8-9", "提高配基浓度"]
      },
      {
        id: "ia_low_capture", title: "目标捕获不足", category: "分离效果", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "bindingRecovery" },
        causes: ["配基活性下降", "上样流速过快", "样品目标浓度低"],
        actions: ["降低流速", "检查配基活性", "浓缩样品"]
      },
      {
        id: "ia_low_elution", title: "洗脱回收率偏低", category: "收率", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "elutionRecovery" },
        causes: ["抗原抗体结合过强", "洗脱条件不足", "中和延迟"],
        actions: ["延长洗脱时间", "增强洗脱条件", "预置中和液"]
      }
    ]
  },
  column_packing_efficiency: {
    id: "column_packing_efficiency",
    name: "层析柱装填与柱效测试",
    category: "下游工艺",
    description: "规范装填层析柱并用示踪剂脉冲测定塔板数、HETP 与峰对称性",
    objective: "评估层析柱装填与柱效测试的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "plateCount", label: "理论塔板数", unit: "N/m", type: 'number', normal: [10000, 50000], criticalLow: 5000, note: "按柱效要求设定" },
    { key: "hetp", label: "塔板高度 HETP", unit: "µm", type: 'number', normal: [20, 100], criticalHigh: 200, note: "越低柱效越高" },
    { key: "asymmetry", label: "峰不对称因子 As", unit: "", type: 'number', normal: [0.8, 1.5], criticalLow: 0.5, criticalHigh: 2, note: "理想值约 1.0" },
    { key: "bedHeight", label: "柱床高度", unit: "cm", type: 'number', normal: [10, 20], criticalLow: 8, criticalHigh: 25, note: "按工艺需求" },
    { key: "operatingPressure", label: "操作压力", unit: "MPa", type: 'number', normal: [0.1, 0.5], criticalHigh: 1, note: "不超介质耐压" }
    ],
    rules: [
      {
        id: "packing_low_plates", title: "理论塔板数偏低", category: "柱效", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "plateCount" },
        causes: ["装柱流速不当", "浆料浓度不合适", "柱床有气泡或沟流"],
        actions: ["按推荐流速重装", "调整浆料至 50%-70%", "充分排气"]
      },
      {
        id: "packing_asymmetry", title: "峰形拖尾或前伸", category: "柱效", severity: "medium", likelihood: 0.78,
        condition: { type: "outside", metric: "asymmetry" },
        causes: ["柱床面不平", "筛板部分堵塞", "进样过量"],
        actions: ["重铺柱床", "清洗筛板", "降低进样体积"]
      },
      {
        id: "packing_high_pressure", title: "操作压力异常升高", category: "设备", severity: "high", likelihood: 0.82,
        condition: { type: "high", metric: "operatingPressure" },
        causes: ["管路或筛板堵塞", "流速过高", "管路有气泡"],
        actions: ["检查并清洗管路/筛板", "降低流速", "重新排气"]
      }
    ]
  },
  ammonium_sulfate_precipitation: {
    id: "ammonium_sulfate_precipitation",
    name: "硫酸铵分级沉淀",
    category: "下游工艺",
    description: "通过分段提高硫酸铵饱和度使不同蛋白依次盐析，实现浓缩与粗分离",
    objective: "评估硫酸铵分级沉淀的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "saturation", label: "硫酸铵饱和度", unit: "%", type: 'number', normal: [30, 80], criticalLow: 10, criticalHigh: 100, note: "分段切割范围" },
    { key: "temp", label: "操作温度", unit: "°C", type: 'number', normal: [0, 4], criticalHigh: 8, note: "全程低温" },
    { key: "recovery", label: "活性回收率", unit: "%", type: 'number', normal: [60, 95], criticalLow: 40, criticalHigh: 100, note: "目标活性计" },
    { key: "purificationFold", label: "纯化倍数", unit: "倍", type: 'number', normal: [2, 10], criticalLow: 1, note: "比活提高倍数" },
    { key: "residualSalt", label: "复溶后残余硫酸铵", unit: "mM", type: 'number', normal: [0, 50], criticalHigh: 100, note: "脱盐后检测" }
    ],
    rules: [
      {
        id: "as_low_recovery", title: "沉淀回收率偏低", category: "收率", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "recovery" },
        causes: ["饱和度区间选择不当", "离心不充分", "目标蛋白留在上清"],
        actions: ["优化饱和度区间", "延长离心", "检测上清活性"]
      },
      {
        id: "as_temperature_high", title: "操作温度偏高", category: "稳定性", severity: "high", likelihood: 0.82,
        condition: { type: "high", metric: "temp" },
        causes: ["未全程冰浴", "放置过久", "搅拌产热"],
        actions: ["全程冰浴", "预冷离心机", "分次少量加盐"]
      },
      {
        id: "as_purity_low", title: "纯化倍数不足", category: "分离效果", severity: "medium", likelihood: 0.78,
        condition: { type: "low", metric: "purificationFold" },
        causes: ["切割区间过宽", "共沉淀杂质多", "分级次数少"],
        actions: ["缩小饱和度区间", "增加分级次数", "衔接层析"]
      }
    ]
  },
  alcohol_precipitation: {
    id: "alcohol_precipitation",
    name: "乙醇沉淀",
    category: "下游工艺",
    description: "利用有机溶剂降低溶液介电常数使蛋白脱水沉淀，实现分级分离与浓缩",
    objective: "评估乙醇沉淀的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "ethanolPercent", label: "乙醇终浓度", unit: "%", type: 'number', normal: [40, 80], criticalLow: 20, criticalHigh: 95, note: "体积分数" },
    { key: "temp", label: "沉淀温度", unit: "°C", type: 'number', normal: [-20, 4], criticalHigh: 10, note: "全程低温" },
    { key: "incubationTime", label: "静置时间", unit: "min", type: 'number', normal: [30, 120], criticalLow: 15, criticalHigh: 180, note: "低温静置" },
    { key: "recovery", label: "活性回收率", unit: "%", type: 'number', normal: [50, 90], criticalLow: 30, criticalHigh: 95, note: "目标活性计" },
    { key: "residualEthanol", label: "残余乙醇", unit: "%", type: 'number', normal: [0, 1], criticalHigh: 2, note: "复溶后检测" }
    ],
    rules: [
      {
        id: "alc_low_recovery", title: "沉淀回收率偏低", category: "收率", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "recovery" },
        causes: ["乙醇浓度不足", "温度偏高", "静置时间过短"],
        actions: ["提高乙醇终浓度", "降低温度", "延长静置"]
      },
      {
        id: "alc_denaturation", title: "蛋白活性下降", category: "稳定性", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "recovery" },
        causes: ["温度过高", "乙醇接触时间过长", "局部浓度过高"],
        actions: ["全程低温", "缩短接触", "缓慢加醇并搅拌"]
      },
      {
        id: "alc_residual_high", title: "残余乙醇偏高", category: "质量", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "residualEthanol" },
        causes: ["去除不彻底", "复溶体积不当"],
        actions: ["充分透析/减压", "检测残留溶剂"]
      }
    ]
  },
  protein_crystallization: {
    id: "protein_crystallization",
    name: "蛋白结晶条件筛选",
    category: "蛋白科学",
    description: "通过气相扩散法系统筛选沉淀剂、pH 与温度等条件，获得可用于结构解析的蛋白晶体",
    objective: "评估蛋白结晶条件筛选的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "proteinConc", label: "蛋白浓度", unit: "mg/mL", type: 'number', normal: [10, 50], criticalLow: 5, criticalHigh: 80, note: "利于成核" },
    { key: "purity", label: "蛋白纯度", unit: "%", type: 'number', normal: [95, 100], criticalLow: 90, note: "需高纯度" },
    { key: "pegConc", label: "PEG 沉淀剂浓度", unit: "%", type: 'number', normal: [5, 30], criticalLow: 2, criticalHigh: 40, note: "按筛选条件" },
    { key: "temp", label: "结晶温度", unit: "°C", type: 'number', normal: [4, 20], criticalLow: 2, criticalHigh: 30, note: "双温并行" },
    { key: "crystalScore", label: "晶体质量评分", unit: "", type: 'number', normal: [3, 5], criticalLow: 1, note: "显微镜 1-5 分" }
    ],
    rules: [
      {
        id: "xtal_no_crystals", title: "无晶体析出", category: "结果", severity: "medium", likelihood: 0.78,
        condition: { type: "low", metric: "crystalScore" },
        causes: ["蛋白纯度不足", "浓度偏低", "筛选条件未覆盖", "蛋白降解"],
        actions: ["提高纯度至 >95%", "浓缩蛋白", "扩大筛选范围", "加蛋白酶抑制剂"]
      },
      {
        id: "xtal_precipitate", title: "无定形沉淀而非晶体", category: "结果", severity: "medium", likelihood: 0.8,
        condition: { type: "outside", metric: "crystalScore" },
        causes: ["沉淀剂浓度过高", "蛋白浓度过高", "平衡过快"],
        actions: ["降低沉淀剂浓度", "稀释蛋白", "减缓平衡速度"]
      },
      {
        id: "xtal_low_quality", title: "晶体衍射质量差", category: "质量", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "crystalScore" },
        causes: ["晶体过小", "孪晶", "柔性区或糖基化干扰"],
        actions: ["优化微晶条件", "改变温度", "去除柔性标签或糖基化"]
      }
    ]
  },
  protein_refolding: {
    id: "protein_refolding",
    name: "蛋白复性（稀释/透析复性）",
    category: "蛋白科学",
    description: "先溶解包涵体使蛋白变性，再通过稀释或透析逐步去除变性剂，使蛋白恢复天然构象与活性",
    objective: "评估蛋白复性（稀释/透析复性）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "denaturantConc", label: "变性剂浓度", unit: "M", type: 'number', normal: [6, 8], criticalLow: 4, criticalHigh: 8, note: "尿素/盐酸胍" },
    { key: "refoldProteinConc", label: "复性蛋白终浓度", unit: "mg/mL", type: 'number', normal: [0.05, 0.2], criticalLow: 0.01, criticalHigh: 0.5, note: "低浓度减聚集" },
    { key: "refoldTime", label: "复性时间", unit: "h", type: 'number', normal: [12, 48], criticalLow: 6, criticalHigh: 72, note: "4 °C 静置" },
    { key: "refoldingYield", label: "复性收率", unit: "%", type: 'number', normal: [20, 60], criticalLow: 10, criticalHigh: 80, note: "以可溶性活性蛋白计" },
    { key: "aggregate", label: "聚集体比例", unit: "%", type: 'number', normal: [0, 10], criticalHigh: 20, note: "SEC 检测" }
    ],
    rules: [
      {
        id: "refold_low_yield", title: "复性收率偏低", category: "收率", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "refoldingYield" },
        causes: ["蛋白浓度过高导致聚集", "复性时间不足", "氧化还原对比例不当", "温度不适"],
        actions: ["降低蛋白浓度", "延长复性时间", "优化 GSH/GSSG", "4 °C 复性"]
      },
      {
        id: "refold_aggregate_high", title: "聚集体比例偏高", category: "质量", severity: "high", likelihood: 0.82,
        condition: { type: "high", metric: "aggregate" },
        causes: ["稀释过快", "蛋白浓度过高", "缺少精氨酸等添加剂"],
        actions: ["缓慢稀释", "降低浓度", "添加 L-精氨酸或甘油"]
      },
      {
        id: "refold_incomplete", title: "复性不完全（无活性）", category: "结果", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "refoldingYield" },
        causes: ["变性剂残留", "二硫键错配", "pH 不适"],
        actions: ["充分透析去除变性剂", "优化氧化还原对", "调整 pH"]
      }
    ]
  },
  virus_inactivation_low_ph: {
    id: "virus_inactivation_low_ph",
    name: "低 pH 病毒灭活",
    category: "下游工艺",
    description: "将抗体制品调至低 pH 并孵育一定时间以灭活包膜病毒，随后及时中和",
    objective: "评估低 pH 病毒灭活的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "inactivationPh", label: "灭活 pH", unit: "", type: 'number', normal: [3.5, 4], criticalLow: 3, criticalHigh: 4.5, note: "过低易聚集、过高灭活不足" },
    { key: "incubationTime", label: "孵育时间", unit: "min", type: 'number', normal: [30, 60], criticalLow: 20, criticalHigh: 90, note: "按验证确定" },
    { key: "temp", label: "孵育温度", unit: "°C", type: 'number', normal: [18, 25], criticalLow: 15, criticalHigh: 30, note: "室温" },
    { key: "neutralizationPh", label: "中和后 pH", unit: "", type: 'number', normal: [5, 6.5], criticalLow: 4.5, criticalHigh: 7, note: "及时中和" },
    { key: "aggregate", label: "聚集体比例", unit: "%", type: 'number', normal: [0, 3], criticalHigh: 8, note: "SEC 检测" }
    ],
    rules: [
      {
        id: "vi_ph_too_high", title: "灭活 pH 偏高", category: "工艺有效性", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "inactivationPh" },
        causes: ["加酸量不足", "缓冲容量过强", "pH 计未校准"],
        actions: ["补加酸至目标 pH", "选用低缓冲容量体系", "校准 pH 计"]
      },
      {
        id: "vi_time_short", title: "孵育时间不足", category: "工艺有效性", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "incubationTime" },
        causes: ["计时错误", "提前中和", "取样过早"],
        actions: ["保证至少 30 min", "按时中和", "独立计时"]
      },
      {
        id: "vi_aggregate_high", title: "聚集体比例升高", category: "质量", severity: "high", likelihood: 0.82,
        condition: { type: "high", metric: "aggregate" },
        causes: ["pH 过低", "孵育时间过长", "温度过高", "中和延迟"],
        actions: ["控制 pH 不低于 3.5", "缩短孵育", "降低温度", "及时中和"]
      }
    ]
  },
  bca_protein_assay: {
    id: "bca_protein_assay",
    name: "BCA 蛋白浓度测定",
    category: "分析检测",
    description: "BCA 比色法定量蛋白浓度，适用于大多数蛋白样品",
    objective: "评估BCA 蛋白浓度测定的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "concentration", label: "蛋白浓度", unit: "mg/mL", type: 'number', normal: [0.1, 20], note: "按样品稀释倍数折算" },
    { key: "standardR2", label: "标准曲线 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.95, note: "四参数或线性拟合" },
    { key: "wellCv", label: "复孔 CV", unit: "%", type: 'number', normal: [0, 15], criticalHigh: 25, note: "反映加样一致性" },
    { key: "recovery", label: "加标回收率", unit: "%", type: 'number', normal: [80, 120], criticalLow: 60, criticalHigh: 150, note: "按需检测" },
    { key: "blankOd", label: "空白 OD", unit: "", type: 'number', normal: [0, 0.1], criticalHigh: 0.2, note: "试剂背景" }
    ],
    rules: [
      {
        id: "bca_r2_low", title: "标准曲线线性不佳", category: "方法有效性", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "standardR2" },
        causes: ["标准品稀释错误", "加样体积偏差", "底物失效"],
        actions: ["重新配制标准曲线", "校准移液器", "更换试剂批次"]
      },
      {
        id: "bca_cv_high", title: "复孔重复性差", category: "操作一致性", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "wellCv" },
        causes: ["加样不均", "孔内气泡", "边缘效应"],
        actions: ["规范加样", "离心去泡", "避免使用外圈孔"]
      },
      {
        id: "bca_recovery_out", title: "加标回收率异常", category: "方法有效性", severity: "high", likelihood: 0.82,
        condition: { type: "outside", metric: "recovery" },
        causes: ["样品基质干扰", "稀释倍数不当", "缓冲液不兼容"],
        actions: ["调整稀释倍数", "做基质匹配", "更换定量方法"]
      }
    ]
  },
  bradford_assay: {
    id: "bradford_assay",
    name: "Bradford 蛋白浓度测定",
    category: "分析检测",
    description: "考马斯亮蓝 G-250 比色法测定蛋白浓度，快速灵敏，适用于常规样品定量",
    objective: "评估Bradford 蛋白浓度测定的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "concentration", label: "蛋白浓度", unit: "mg/mL", type: 'number', normal: [0.05, 10], note: "按样品稀释倍数折算" },
    { key: "standardR2", label: "标准曲线 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.95, note: "线性或 4PL 拟合" },
    { key: "wellCv", label: "复孔 CV", unit: "%", type: 'number', normal: [0, 15], criticalHigh: 25, note: "反映加样一致性" },
    { key: "blankOd", label: "空白 OD", unit: "", type: 'number', normal: [0, 0.05], criticalHigh: 0.15, note: "试剂背景" },
    { key: "reactionTime", label: "显色时间", unit: "min", type: 'number', normal: [5, 10], criticalLow: 3, criticalHigh: 15, note: "室温避光孵育" }
    ],
    rules: [
      {
        id: "bradford_r2_low", title: "标准曲线线性不佳", category: "方法有效性", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "standardR2" },
        causes: ["标准品稀释错误", "加样体积偏差", "工作液失效"],
        actions: ["重新配制标准曲线", "校准移液器", "更换试剂批次"]
      },
      {
        id: "bradford_cv_high", title: "复孔重复性差", category: "操作一致性", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "wellCv" },
        causes: ["加样不均", "孔内气泡", "边缘效应"],
        actions: ["规范加样", "离心去泡", "避免使用外圈孔"]
      },
      {
        id: "bradford_blank_high", title: "空白吸光值偏高", category: "背景干扰", severity: "medium", likelihood: 0.8,
        condition: { type: "high", metric: "blankOd" },
        causes: ["工作液污染", "缓冲液含胺类", "比色皿不洁"],
        actions: ["更换工作液", "做缓冲液空白", "清洁比色皿"]
      }
    ]
  },
  a280_quantification: {
    id: "a280_quantification",
    name: "A280 紫外分光光度法蛋白定量",
    category: "分析检测",
    description: "依据芳香族氨基酸在 280 nm 的特征吸收直接定量蛋白，无需显色试剂",
    objective: "评估A280 紫外分光光度法蛋白定量的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "concentration", label: "蛋白浓度", unit: "mg/mL", type: 'number', normal: [0.05, 50], note: "按消光系数与光程折算" },
    { key: "a280", label: "A280 吸光值", unit: "", type: 'number', normal: [0.1, 1], criticalLow: 0.02, criticalHigh: 1.5, note: "需在线性范围内" },
    { key: "a280a260", label: "A280/A260 比值", unit: "", type: 'number', normal: [1.5, 2], criticalLow: 1, criticalHigh: 2.5, note: "纯蛋白约 1.8，偏低提示核酸污染" },
    { key: "pathlength", label: "光程", unit: "cm", type: 'number', normal: [0.1, 1], criticalLow: 0.05, criticalHigh: 1, note: "按仪器比色皿选择" },
    { key: "blankAbs", label: "空白吸光值", unit: "", type: 'number', normal: [0, 0.02], criticalHigh: 0.05, note: "缓冲液本底" }
    ],
    rules: [
      {
        id: "a280_out_of_range", title: "吸光值超出线性范围", category: "方法有效性", severity: "high", likelihood: 0.85,
        condition: { type: "outside", metric: "a280" },
        causes: ["样品过浓", "未选合适光程", "仪器未调零"],
        actions: ["稀释样品", "换用短光程比色皿", "重新调零"]
      },
      {
        id: "a280_nucleic_acid", title: "核酸污染导致比值异常", category: "样品纯度", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "a280a260" },
        causes: ["样品含核酸", "缓冲液污染", "细胞裂解残留"],
        actions: ["核酸酶处理", "更换缓冲液", "纯化样品"]
      },
      {
        id: "a280_blank_high", title: "空白本底偏高", category: "背景干扰", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "blankAbs" },
        causes: ["缓冲液含吸收物质", "比色皿不洁", "波长设置错误"],
        actions: ["更换缓冲液空白", "清洁比色皿", "校准波长"]
      }
    ]
  },
  hplc_reversed_phase: {
    id: "hplc_reversed_phase",
    name: "反相高效液相色谱分析",
    category: "分析检测",
    description: "以 C18 反相柱和乙腈/水梯度分离蛋白或多肽，用于纯度与组分分析",
    objective: "评估反相高效液相色谱分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "retentionTime", label: "主峰保留时间", unit: "min", type: 'number', normal: [5, 40], criticalLow: 2, criticalHigh: 50, note: "按方法设定" },
    { key: "peakAreaRsd", label: "峰面积 RSD", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 5, note: "连续进样重复性" },
    { key: "resolution", label: "关键峰分离度", unit: "", type: 'number', normal: [1.5, 4], criticalLow: 1, note: "影响定量准确性" },
    { key: "theoreticalPlates", label: "理论塔板数", unit: "", type: 'number', normal: [5000, 20000], criticalLow: 2000, note: "柱效指标" },
    { key: "tailingFactor", label: "拖尾因子", unit: "", type: 'number', normal: [0.9, 1.5], criticalLow: 0.8, criticalHigh: 2, note: "峰形指标" }
    ],
    rules: [
      {
        id: "rp_retention_drift", title: "保留时间漂移", category: "系统适用性", severity: "medium", likelihood: 0.8,
        condition: { type: "outside", metric: "retentionTime" },
        causes: ["柱温波动", "流动相比例偏差", "柱未平衡"],
        actions: ["稳定柱温", "校准泵比例", "延长平衡"]
      },
      {
        id: "rp_resolution_low", title: "分离度不足", category: "分离效果", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "resolution" },
        causes: ["梯度过陡", "柱效下降", "样品过载"],
        actions: ["放缓梯度", "更换色谱柱", "降低进样量"]
      },
      {
        id: "rp_tailing_high", title: "峰拖尾严重", category: "峰形", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "tailingFactor" },
        causes: ["柱污染", "流动相 pH 不当", "硅醇基效应"],
        actions: ["冲洗柱", "调整流动相", "使用封端色谱柱"]
      }
    ]
  },
  lc_ms_sample_prep: {
    id: "lc_ms_sample_prep",
    name: "LC-MS 样品制备",
    category: "分析检测",
    description: "通过还原烷基化、酶解与脱盐将蛋白转化为适合 LC-MS 分析的肽段样品",
    objective: "评估LC-MS 样品制备的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "peptideConc", label: "肽段浓度", unit: "µg/µL", type: 'number', normal: [0.5, 5], note: "按紫外法或 BCA 估算" },
    { key: "digestionEfficiency", label: "酶切效率", unit: "%", type: 'number', normal: [70, 95], criticalLow: 50, criticalHigh: 100, note: "按未切蛋白残留评估" },
    { key: "desaltConductivity", label: "脱盐后电导", unit: "µS/cm", type: 'number', normal: [0, 50], criticalHigh: 200, note: "反映盐去除程度" },
    { key: "peptideRecovery", label: "肽段回收率", unit: "%", type: 'number', normal: [60, 95], criticalLow: 40, criticalHigh: 100, note: "脱盐前后比较" },
    { key: "samplePh", label: "样品 pH", unit: "", type: 'number', normal: [2, 4], criticalLow: 1, criticalHigh: 6, note: "酸化后利于 ESI 正离子" }
    ],
    rules: [
      {
        id: "lcms_digestion_low", title: "酶解效率偏低", category: "前处理质量", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "digestionEfficiency" },
        causes: ["变性剂浓度过高", "酶量不足", "酶解时间过短"],
        actions: ["稀释变性剂", "增加胰蛋白酶用量", "延长酶解至过夜"]
      },
      {
        id: "lcms_desalt_poor", title: "脱盐不充分", category: "样品纯度", severity: "medium", likelihood: 0.8,
        condition: { type: "high", metric: "desaltConductivity" },
        causes: ["洗涤体积不足", "柱子未活化", "上样流速过快"],
        actions: ["增加洗涤体积", "规范活化平衡", "降低上样流速"]
      },
      {
        id: "lcms_recovery_low", title: "肽段回收率偏低", category: "收率", severity: "medium", likelihood: 0.78,
        condition: { type: "low", metric: "peptideRecovery" },
        causes: ["洗涤过度", "洗脱体积不足", "过度干燥"],
        actions: ["减少洗涤损失", "增加洗脱体积", "避免蒸干"]
      }
    ]
  },
  maldi_tof_identification: {
    id: "maldi_tof_identification",
    name: "MALDI-TOF 质谱鉴定",
    category: "分析检测",
    description: "基质辅助激光解吸电离飞行时间质谱测定肽质量指纹谱并检索鉴定蛋白",
    objective: "评估MALDI-TOF 质谱鉴定的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "massAccuracy", label: "质量准确度", unit: "ppm", type: 'number', normal: [0, 100], criticalHigh: 300, note: "外标或内标校准后" },
    { key: "resolution", label: "分辨率", unit: "", type: 'number', normal: [5000, 20000], criticalLow: 2000, note: "按仪器与质量段" },
    { key: "snRatio", label: "信噪比", unit: "", type: 'number', normal: [10, 1000], criticalLow: 3, note: "影响峰识别" },
    { key: "peakCount", label: "有效峰数", unit: "", type: 'number', normal: [10, 100], criticalLow: 3, note: "肽质量指纹谱" },
    { key: "matchedPeptides", label: "匹配肽段数", unit: "", type: 'number', normal: [5, 50], criticalLow: 2, note: "数据库检索" }
    ],
    rules: [
      {
        id: "maldi_mass_acc", title: "质量准确度超差", category: "方法有效性", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "massAccuracy" },
        causes: ["校准不足", "基质结晶不均", "仪器漂移"],
        actions: ["重新校准", "优化点靶", "预热仪器"]
      },
      {
        id: "maldi_sn_low", title: "信噪比偏低", category: "谱图质量", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "snRatio" },
        causes: ["样品量不足", "盐干扰", "激光能量不当"],
        actions: ["增加上样量", "脱盐净化", "优化激光能量"]
      },
      {
        id: "maldi_peak_low", title: "有效峰数不足", category: "鉴定可靠性", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "peakCount" },
        causes: ["酶解不完全", "点靶失败", "样品降解"],
        actions: ["重做酶解", "重新点靶", "更换样品"]
      }
    ]
  },
  amino_acid_analysis: {
    id: "amino_acid_analysis",
    name: "氨基酸组成分析",
    category: "分析检测",
    description: "经酸水解与衍生化后用液相色谱测定蛋白的氨基酸组成与含量",
    objective: "评估氨基酸组成分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "aaRecovery", label: "氨基酸回收率", unit: "%", type: 'number', normal: [85, 110], criticalLow: 70, criticalHigh: 130, note: "加标或标准蛋白回算" },
    { key: "retentionRsd", label: "保留时间 RSD", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 5, note: "反映色谱稳定性" },
    { key: "peakResolution", label: "相邻峰分离度", unit: "", type: 'number', normal: [1.5, 3], criticalLow: 1, note: "关键氨基酸对" },
    { key: "detectionLimit", label: "检出限", unit: "µmol/L", type: 'number', normal: [0, 1], criticalHigh: 5, note: "按信噪比 3:1" },
    { key: "proteinContent", label: "蛋白含量", unit: "%", type: 'number', normal: [80, 100], criticalLow: 60, note: "按氨基酸总和折算" }
    ],
    rules: [
      {
        id: "aa_recovery_out", title: "氨基酸回收率异常", category: "方法有效性", severity: "high", likelihood: 0.85,
        condition: { type: "outside", metric: "aaRecovery" },
        causes: ["水解不完全", "氧化损失", "衍生效率低"],
        actions: ["延长水解时间", "充氮保护", "更换衍生试剂"]
      },
      {
        id: "aa_resolution_low", title: "相邻峰分离度不足", category: "分离效果", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "peakResolution" },
        causes: ["梯度过陡", "柱效下降", "流动相 pH 不当"],
        actions: ["放缓梯度", "更换色谱柱", "优化流动相"]
      },
      {
        id: "aa_rsd_high", title: "保留时间重复性差", category: "系统适用性", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "retentionRsd" },
        causes: ["柱温波动", "流动相配比偏差", "柱未平衡"],
        actions: ["稳定柱温", "校准泵", "延长平衡"]
      }
    ]
  },
  glycosylation_hplc: {
    id: "glycosylation_hplc",
    name: "糖基化谱分析（HPLC-FLD）",
    category: "分析检测",
    description: "释放 N-糖链并用 2-AB 荧光标记后经 HILIC-FLD 分离，获得糖基化谱图",
    objective: "评估糖基化谱分析（HPLC-FLD）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "releaseEfficiency", label: "糖链释放效率", unit: "%", type: 'number', normal: [85, 100], criticalLow: 70, note: "按去糖基化条带评估" },
    { key: "labelingEfficiency", label: "标记效率", unit: "%", type: 'number', normal: [80, 100], criticalLow: 60, note: "按游离标记物残留评估" },
    { key: "fluorescenceRsd", label: "峰面积 RSD", unit: "%", type: 'number', normal: [0, 5], criticalHigh: 10, note: "反映进样与分离稳定性" },
    { key: "mainPeakPurity", label: "主峰归一纯度", unit: "%", type: 'number', normal: [50, 95], criticalLow: 30, note: "主要糖型占比" },
    { key: "glycanResolution", label: "相邻糖峰分离度", unit: "", type: 'number', normal: [1.2, 3], criticalLow: 1, note: "关键糖型对" }
    ],
    rules: [
      {
        id: "glyco_release_low", title: "糖链释放不完全", category: "前处理质量", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "releaseEfficiency" },
        causes: ["变性不足", "酶量不足", "释放时间过短"],
        actions: ["加强变性", "增加 PNGase F 用量", "延长释放时间"]
      },
      {
        id: "glyco_label_low", title: "荧光标记效率低", category: "前处理质量", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "labelingEfficiency" },
        causes: ["标记试剂失效", "还原剂不足", "温度不当"],
        actions: ["更换标记试剂", "补加还原剂", "控制标记温度"]
      },
      {
        id: "glyco_rsd_high", title: "峰面积重复性差", category: "系统适用性", severity: "medium", likelihood: 0.8,
        condition: { type: "high", metric: "fluorescenceRsd" },
        causes: ["进样量波动", "柱温不稳", "标记批次差异"],
        actions: ["校准进样", "稳定柱温", "统一标记批次"]
      }
    ]
  },
  peptide_mapping: {
    id: "peptide_mapping",
    name: "肽图分析",
    category: "分析检测",
    description: "用特异性蛋白酶消化蛋白并以反相色谱分离肽段，通过肽图比对进行身份确证",
    objective: "评估肽图分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "digestionEfficiency", label: "酶解效率", unit: "%", type: 'number', normal: [85, 100], criticalLow: 70, note: "按未消化蛋白残留评估" },
    { key: "peakCount", label: "主要肽峰数", unit: "", type: 'number', normal: [10, 60], criticalLow: 5, note: "与参比图谱比较" },
    { key: "similarity", label: "图谱相似度", unit: "%", type: 'number', normal: [90, 100], criticalLow: 75, note: "与参比肽图相关性" },
    { key: "retentionRsd", label: "保留时间 RSD", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 5, note: "方法重复性" },
    { key: "peakAreaRsd", label: "主峰面积 RSD", unit: "%", type: 'number', normal: [0, 5], criticalHigh: 10, note: "定量重复性" }
    ],
    rules: [
      {
        id: "pm_digestion_low", title: "酶解不完全", category: "前处理质量", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "digestionEfficiency" },
        causes: ["变性剂浓度过高", "酶量不足", "酶解时间不足"],
        actions: ["稀释变性剂", "增加酶量", "延长酶解时间"]
      },
      {
        id: "pm_similarity_low", title: "肽图相似度偏低", category: "身份一致性", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "similarity" },
        causes: ["样品与参比不一致", "酶解条件差异", "色谱漂移"],
        actions: ["核对样品来源", "统一酶解条件", "重新进样"]
      },
      {
        id: "pm_rsd_high", title: "保留时间重复性差", category: "系统适用性", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "retentionRsd" },
        causes: ["柱温波动", "流动相配比偏差", "柱未平衡"],
        actions: ["稳定柱温", "校准泵比例", "延长平衡"]
      }
    ]
  },
  isoelectric_focusing: {
    id: "isoelectric_focusing",
    name: "等电聚焦电泳",
    category: "分析检测",
    description: "在 pH 梯度电场中使蛋白聚焦至其等电点位置，按 pI 差异分离并测定等电点",
    objective: "评估等电聚焦电泳的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "piValue", label: "等电点 pI", unit: "", type: 'number', normal: [3, 10], criticalLow: 2, criticalHigh: 11, note: "按 pI 标准品定标" },
    { key: "bandCount", label: "条带数", unit: "", type: 'number', normal: [1, 20], criticalLow: 0, note: "染色后判读" },
    { key: "focusingVh", label: "聚焦电压小时", unit: "kVh", type: 'number', normal: [50, 100], criticalLow: 30, criticalHigh: 150, note: "反映聚焦充分性" },
    { key: "endCurrent", label: "聚焦末期电流", unit: "µA/胶条", type: 'number', normal: [0, 50], criticalHigh: 80, note: "应低且稳定" },
    { key: "piRsd", label: "pI 测定 RSD", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 5, note: "批内重复性" }
    ],
    rules: [
      {
        id: "ief_focusing_low", title: "聚焦不充分", category: "分离效果", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "focusingVh" },
        causes: ["电压时间不足", "泡胀不充分", "样品盐分过高"],
        actions: ["增加 kVh", "延长泡胀", "脱盐处理样品"]
      },
      {
        id: "ief_current_high", title: "聚焦末期电流过高", category: "系统状态", severity: "medium", likelihood: 0.8,
        condition: { type: "high", metric: "endCurrent" },
        causes: ["盐离子过多", "胶条老化", "温度过高"],
        actions: ["脱盐样品", "更换胶条", "降低温度"]
      },
      {
        id: "ief_pi_rsd", title: "pI 重复性差", category: "方法重复性", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "piRsd" },
        causes: ["pH 梯度差异", "定标偏差", "温度波动"],
        actions: ["统一胶条批次", "重新定标", "稳定温度"]
      }
    ]
  },
  capillary_zone_electrophoresis: {
    id: "capillary_zone_electrophoresis",
    name: "毛细管区带电泳",
    category: "分析检测",
    description: "在毛细管内以高压电场按电泳淌度差异分离组分，用于蛋白与离子分析",
    objective: "评估毛细管区带电泳的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "migrationTime", label: "主峰迁移时间", unit: "min", type: 'number', normal: [3, 20], criticalLow: 1, criticalHigh: 30, note: "按方法设定" },
    { key: "plateNumber", label: "理论塔板数", unit: "", type: 'number', normal: [50000, 200000], criticalLow: 20000, note: "柱效指标" },
    { key: "migrationRsd", label: "迁移时间 RSD", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 5, note: "反映重现性" },
    { key: "peakAreaRsd", label: "峰面积 RSD", unit: "%", type: 'number', normal: [0, 5], criticalHigh: 10, note: "定量重复性" },
    { key: "resolution", label: "相邻峰分离度", unit: "", type: 'number', normal: [1.5, 4], criticalLow: 1, note: "关键峰对" }
    ],
    rules: [
      {
        id: "cze_migration_shift", title: "迁移时间漂移", category: "系统适用性", severity: "medium", likelihood: 0.8,
        condition: { type: "outside", metric: "migrationTime" },
        causes: ["缓冲液 pH 变化", "温度波动", "电渗流改变"],
        actions: ["更换缓冲液", "稳定温度", "重新活化毛细管"]
      },
      {
        id: "cze_resolution_low", title: "分离度不足", category: "分离效果", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "resolution" },
        causes: ["电压不足", "缓冲液浓度不当", "样品过载"],
        actions: ["提高电压", "优化缓冲液", "减少进样量"]
      },
      {
        id: "cze_plate_low", title: "柱效偏低", category: "系统适用性", severity: "medium", likelihood: 0.78,
        condition: { type: "low", metric: "plateNumber" },
        causes: ["毛细管污染", "进样过载", "焦耳热效应"],
        actions: ["冲洗毛细管", "减少进样量", "降低温度"]
      }
    ]
  },
  genomic_dna_extraction: {
    id: "genomic_dna_extraction",
    name: "基因组 DNA 提取（细胞/组织）",
    category: "分子生物学",
    description: "通过裂解、蛋白酶消化、有机抽提与醇沉淀获得高分子量基因组 DNA",
    objective: "评估基因组 DNA 提取（细胞/组织）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "a260a280", label: "A260/A280", unit: "", type: 'number', normal: [1.7, 2], criticalLow: 1.5, criticalHigh: 2.2, note: "蛋白污染使比值降低" },
    { key: "a260a230", label: "A260/A230", unit: "", type: 'number', normal: [2, 2.4], criticalLow: 1.5, note: "盐或酚残留使比值降低" },
    { key: "dnaYield", label: "DNA 产量", unit: "µg/10⁶细胞", type: 'number', normal: [2, 10], note: "随样本类型变化" },
    { key: "dnaIntegrity", label: "基因组完整性", unit: "", type: 'enum', options: ["主带完整>20kb", "明显拖尾降解"], expected: "主带完整>20kb", note: "电泳判读" },
    { key: "rnaResidual", label: "RNA 残留", unit: "", type: 'enum', options: ["无可见RNA带", "可见RNA带"], expected: "无可见RNA带", note: "必要时加 RNase A 处理" }
    ],
    rules: [
      {
        id: "gdx_a280_low", title: "蛋白污染导致纯度偏低", category: "纯度", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "a260a280" },
        causes: ["蛋白酶 K 消化不足", "酚氯仿抽提不彻底", "水相吸取时带入蛋白层"],
        actions: ["延长 55 °C 消化", "重复酚氯仿抽提", "小心吸取上层水相"]
      },
      {
        id: "gdx_a230_low", title: "盐或有机物残留", category: "纯度", severity: "medium", likelihood: 0.78,
        condition: { type: "low", metric: "a260a230" },
        causes: ["洗涤次数不足", "异丙醇或乙醇残留", "样本盐分高"],
        actions: ["增加 70% 乙醇洗涤", "延长晾干", "重新沉淀纯化"]
      },
      {
        id: "gdx_fragmented", title: "基因组 DNA 降解", category: "样品质量", severity: "critical", likelihood: 0.8,
        condition: { type: "enum", metric: "dnaIntegrity", value: "明显拖尾降解" },
        causes: ["机械剪切过度", "核酸酶污染", "样本反复冻融"],
        actions: ["轻柔操作避免涡旋", "使用无核酸酶耗材", "分装减少冻融"]
      },
      {
        id: "gdx_low_yield", title: "DNA 产量偏低", category: "产量", severity: "medium", likelihood: 0.75,
        condition: { type: "low", metric: "dnaYield" },
        causes: ["裂解不充分", "沉淀时间不足", "溶解不充分"],
        actions: ["延长消化至清亮", "延长 -20 °C 沉淀", "室温充分溶解"]
      }
    ]
  },
  rna_extraction_trizol: {
    id: "rna_extraction_trizol",
    name: "TRIzol 法 RNA 提取",
    category: "分子生物学",
    description: "用苯酚-异硫氰酸胍裂解液提取总 RNA，经相分离与醇沉淀获得完整 RNA",
    objective: "评估TRIzol 法 RNA 提取的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "rnaA280", label: "A260/A280", unit: "", type: 'number', normal: [1.8, 2.1], criticalLow: 1.6, criticalHigh: 2.3, note: "蛋白或酚污染使比值下降" },
    { key: "rnaA230", label: "A260/A230", unit: "", type: 'number', normal: [2, 2.3], criticalLow: 1.5, note: "胍盐或盐残留使比值下降" },
    { key: "rna28s18s", label: "28S/18S 比值", unit: "", type: 'number', normal: [1.8, 2.2], criticalLow: 1, note: "反映 RNA 完整性" },
    { key: "rnaYield", label: "RNA 产量", unit: "µg/10⁶细胞", type: 'number', normal: [1, 5], note: "随细胞类型变化" },
    { key: "dnaContam", label: "基因组 DNA 残留", unit: "", type: 'enum', options: ["未检出", "可见gDNA带"], expected: "未检出", note: "必要时 DNase I 处理" }
    ],
    rules: [
      {
        id: "trizol_a280_low", title: "蛋白或酚污染", category: "纯度", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "rnaA280" },
        causes: ["分相时吸取中间层", "洗涤不充分", "裂解不足"],
        actions: ["重新分相并小心取水相", "增加乙醇洗涤", "补加 TRIzol 重提"]
      },
      {
        id: "trizol_a230_low", title: "胍盐或盐残留", category: "纯度", severity: "medium", likelihood: 0.8,
        condition: { type: "low", metric: "rnaA230" },
        causes: ["洗涤次数不足", "晾干残留乙醇", "样本带盐"],
        actions: ["增加 75% 乙醇洗涤", "延长晾干", "重新沉淀"]
      },
      {
        id: "trizol_degraded", title: "RNA 降解", category: "样品质量", severity: "critical", likelihood: 0.84,
        condition: { type: "low", metric: "rna28s18s" },
        causes: ["RNase 污染", "样本未及时裂解", "反复冻融"],
        actions: ["使用 RNase-free 耗材", "样本尽快裂解或冻存", "分装保存"]
      },
      {
        id: "trizol_gdna", title: "基因组 DNA 残留", category: "纯度", severity: "medium", likelihood: 0.76,
        condition: { type: "enum", metric: "dnaContam", value: "可见gDNA带" },
        causes: ["样本未充分匀浆", "水相混入有机相"],
        actions: ["加强匀浆", "规范分相", "必要时 DNase I 消化"]
      }
    ]
  },
  reverse_transcription: {
    id: "reverse_transcription",
    name: "逆转录 cDNA 合成",
    category: "分子生物学",
    description: "以 RNA 为模板、逆转录酶合成第一链 cDNA，作为 PCR 或 qPCR 模板",
    objective: "评估逆转录 cDNA 合成的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "rtYield", label: "cDNA 产量", unit: "ng/µL", type: 'number', normal: [50, 500], note: "按 RNA 投入量评估" },
    { key: "rtA260", label: "cDNA A260/A280", unit: "", type: 'number', normal: [1.6, 2], criticalLow: 1.4, criticalHigh: 2.2, note: "评估纯度" },
    { key: "rtInternalCt", label: "内参 Ct", unit: "", type: 'number', normal: [15, 28], criticalHigh: 32, note: "验证 cDNA 可扩增" },
    { key: "minusRt", label: "-RT 对照", unit: "", type: 'enum', options: ["无扩增", "有扩增"], expected: "无扩增", note: "有扩增提示 gDNA 污染" },
    { key: "rtRepCv", label: "复孔 Ct 差异", unit: "", type: 'number', normal: [0, 0.5], criticalHigh: 1, note: "加样一致性" }
    ],
    rules: [
      {
        id: "rt_low_yield", title: "cDNA 产量偏低", category: "产量", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "rtYield" },
        causes: ["RNA 降解", "逆转录酶失活", "引物配比不当"],
        actions: ["检查 RNA 完整性", "更换酶", "优化引物与温度"]
      },
      {
        id: "rt_gdna", title: "gDNA 污染（-RT 有扩增）", category: "特异性", severity: "critical", likelihood: 0.78,
        condition: { type: "enum", metric: "minusRt", value: "有扩增" },
        causes: ["RNA 未去 gDNA", "体系交叉污染"],
        actions: ["DNase I 处理 RNA", "分区操作并重做"]
      },
      {
        id: "rt_internal_high", title: "内参 Ct 偏高", category: "有效性", severity: "medium", likelihood: 0.76,
        condition: { type: "high", metric: "rtInternalCt" },
        causes: ["RNA 投入量低", "反转录效率低", "cDNA 稀释过度"],
        actions: ["增加 RNA 投入", "优化反转录", "降低稀释倍数"]
      },
      {
        id: "rt_cv_high", title: "复孔一致性差", category: "操作一致性", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "rtRepCv" },
        causes: ["加样误差", "气泡", "体系未混匀"],
        actions: ["规范加样", "离心去泡", "充分混匀"]
      }
    ]
  },
  pcr_amplification: {
    id: "pcr_amplification",
    name: "常规 PCR 扩增",
    category: "分子生物学",
    description: "常规终点 PCR 扩增特定 DNA 片段，产物经琼脂糖凝胶电泳检测",
    objective: "评估常规 PCR 扩增的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "pcrBandSize", label: "产物大小符合预期", unit: "", type: 'enum', options: ["与预期一致", "与预期不符"], expected: "与预期一致", note: "凝胶电泳判读" },
    { key: "pcrSpecificity", label: "扩增特异性", unit: "", type: 'enum', options: ["单一条带", "多条带或拖尾"], expected: "单一条带", note: "凝胶判读" },
    { key: "pcrNtc", label: "NTC 对照", unit: "", type: 'enum', options: ["无扩增", "有扩增"], expected: "无扩增", note: "有扩增提示污染" },
    { key: "pcrYield", label: "产物得量", unit: "ng/µL", type: 'number', normal: [20, 200], note: "电泳或荧光定量" },
    { key: "pcrRepro", label: "重复一致性", unit: "", type: 'enum', options: ["一致", "不一致"], expected: "一致", note: "技术或生物学重复" }
    ],
    rules: [
      {
        id: "pcr_contam", title: "NTC 出现扩增", category: "污染", severity: "critical", likelihood: 0.82,
        condition: { type: "enum", metric: "pcrNtc", value: "有扩增" },
        causes: ["试剂或气溶胶污染", "加样交叉污染"],
        actions: ["更换试剂与枪头", "清洁分区", "重做并设对照"]
      },
      {
        id: "pcr_nospecific", title: "非特异扩增或引物二聚体", category: "特异性", severity: "high", likelihood: 0.8,
        condition: { type: "enum", metric: "pcrSpecificity", value: "多条带或拖尾" },
        causes: ["退火温度过低", "引物设计不佳", "Mg²⁺ 过高"],
        actions: ["提高退火温度", "重设计引物", "降低 Mg²⁺ 浓度"]
      },
      {
        id: "pcr_no_band", title: "无扩增条带", category: "有效性", severity: "high", likelihood: 0.78,
        condition: { type: "low", metric: "pcrYield" },
        causes: ["模板降解", "酶失活", "循环数不足", "引物错配"],
        actions: ["检查模板质量", "更换酶", "增加循环数"]
      },
      {
        id: "pcr_wrong_size", title: "产物大小不符", category: "特异性", severity: "medium", likelihood: 0.76,
        condition: { type: "enum", metric: "pcrBandSize", value: "与预期不符" },
        causes: ["引物错位", "模板非目标", "退火温度不当"],
        actions: ["核对序列", "更换模板", "优化退火温度"]
      }
    ]
  },
  rt_qpcr_expression: {
    id: "rt_qpcr_expression",
    name: "RT-qPCR 基因表达分析",
    category: "分子生物学",
    description: "基于 cDNA 的实时荧光定量 PCR，用 ΔΔCt 法分析目标基因相对表达",
    objective: "评估RT-qPCR 基因表达分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "exprEfficiency", label: "扩增效率", unit: "%", type: 'number', normal: [90, 110], criticalLow: 80, criticalHigh: 120, note: "标准曲线斜率 -3.1 至 -3.6" },
    { key: "exprR2", label: "标准曲线 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.95, note: "至少 5 点稀释" },
    { key: "exprMelt", label: "熔解曲线", unit: "", type: 'enum', options: ["单一峰", "多峰"], expected: "单一峰", note: "特异性判读" },
    { key: "exprNtc", label: "NTC 对照", unit: "", type: 'enum', options: ["无扩增", "有扩增"], expected: "无扩增", note: "有扩增提示污染" },
    { key: "exprRepCv", label: "复孔 Ct 差异", unit: "", type: 'number', normal: [0, 0.5], criticalHigh: 1, note: "技术重复一致性" }
    ],
    rules: [
      {
        id: "expr_contam", title: "NTC 扩增提示污染", category: "污染", severity: "critical", likelihood: 0.82,
        condition: { type: "enum", metric: "exprNtc", value: "有扩增" },
        causes: ["试剂污染", "气溶胶", "加样交叉"],
        actions: ["更换试剂", "清洁分区", "重做并设对照"]
      },
      {
        id: "expr_specificity", title: "熔解曲线多峰", category: "特异性", severity: "high", likelihood: 0.8,
        condition: { type: "enum", metric: "exprMelt", value: "多峰" },
        causes: ["引物二聚体", "非特异扩增", "退火温度低"],
        actions: ["重设计引物", "提高退火温度", "电泳验证产物"]
      },
      {
        id: "expr_eff_out", title: "扩增效率异常", category: "方法有效性", severity: "high", likelihood: 0.78,
        condition: { type: "outside", metric: "exprEfficiency" },
        causes: ["引物效率低", "模板抑制", "稀释不当"],
        actions: ["重设计引物", "稀释模板", "优化体系"]
      },
      {
        id: "expr_cv_high", title: "复孔 Ct 差异大", category: "操作一致性", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "exprRepCv" },
        causes: ["加样误差", "气泡", "边缘效应"],
        actions: ["规范加样", "离心去泡", "避免使用外圈孔"]
      }
    ]
  },
  restriction_digest: {
    id: "restriction_digest",
    name: "限制性内切酶酶切",
    category: "分子生物学",
    description: "用限制性内切酶在特异位点切割 DNA，产生可分离的片段用于克隆或鉴定",
    objective: "评估限制性内切酶酶切的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "digestComplete", label: "酶切完全程度", unit: "", type: 'enum', options: ["完全酶切", "部分或未酶切"], expected: "完全酶切", note: "凝胶判读" },
    { key: "digestFragmentSize", label: "片段大小符合理论", unit: "", type: 'enum', options: ["一致", "不一致"], expected: "一致", note: "与酶切图谱比对" },
    { key: "digestDnaAmount", label: "投入 DNA 量", unit: "µg", type: 'number', normal: [0.5, 2], criticalHigh: 3, note: "20 µL 体系" },
    { key: "digestEnzymeUnit", label: "酶活单位", unit: "U/µg", type: 'number', normal: [5, 10], criticalHigh: 20, note: "避免过度酶切" },
    { key: "digestStar", label: "Star 活性或非特异切割", unit: "", type: 'enum', options: ["无", "有"], expected: "无", note: "异常条带判读" }
    ],
    rules: [
      {
        id: "digest_partial", title: "酶切不完全", category: "有效性", severity: "high", likelihood: 0.82,
        condition: { type: "enum", metric: "digestComplete", value: "部分或未酶切" },
        causes: ["酶量不足", "孵育时间不够", "缓冲液不匹配", "DNA 甲基化"],
        actions: ["增加酶量或延长时间", "换用兼容缓冲液", "检查甲基化状态"]
      },
      {
        id: "digest_star", title: "Star 活性导致非特异条带", category: "特异性", severity: "medium", likelihood: 0.76,
        condition: { type: "enum", metric: "digestStar", value: "有" },
        causes: ["甘油浓度过高", "酶量过大", "离子强度不当"],
        actions: ["降低甘油比例", "减少酶量", "更换缓冲液"]
      },
      {
        id: "digest_wrong_size", title: "片段大小与理论不符", category: "构建正确性", severity: "high", likelihood: 0.8,
        condition: { type: "enum", metric: "digestFragmentSize", value: "不一致" },
        causes: ["位点选择错误", "部分酶切", "样本混淆"],
        actions: ["核对酶切图谱", "完全酶切", "核对样本编号"]
      },
      {
        id: "digest_low_dna", title: "投入 DNA 量异常", category: "产量", severity: "low", likelihood: 0.72,
        condition: { type: "outside", metric: "digestDnaAmount" },
        causes: ["定量不准", "样本损失"],
        actions: ["重新定量", "增加上样量"]
      }
    ]
  },
  dna_ligation_cloning: {
    id: "dna_ligation_cloning",
    name: "DNA 连接与克隆构建",
    category: "分子生物学",
    description: "用 T4 DNA 连接酶将目标片段与线性化载体连接，转化后获得重组克隆",
    objective: "评估DNA 连接与克隆构建的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "ligationEfficiency", label: "连接效率", unit: "CFU/µg", type: 'number', normal: [1000, 1000000], note: "视载体与感受态效率" },
    { key: "ligationRatio", label: "载体:插入摩尔比", unit: "", type: 'number', normal: [1, 3], criticalHigh: 5, note: "常用 1:3" },
    { key: "ligationBackground", label: "自连对照克隆数", unit: "CFU", type: 'number', normal: [0, 50], criticalHigh: 200, note: "评估载体自连背景" },
    { key: "ligationPositiveRate", label: "阳性克隆率", unit: "%", type: 'number', normal: [50, 100], criticalHigh: 20, note: "菌落 PCR 或酶切鉴定" },
    { key: "ligationAtp", label: "ATP 浓度", unit: "mM", type: 'number', normal: [0.5, 1], criticalLow: 0.1, note: "由缓冲液提供" }
    ],
    rules: [
      {
        id: "ligation_low_eff", title: "连接效率低", category: "效率", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "ligationEfficiency" },
        causes: ["载体与插入末端不兼容", "ATP 降解", "摩尔比不当", "酶失活"],
        actions: ["核对末端类型", "更换缓冲液", "优化摩尔比", "更换酶"]
      },
      {
        id: "ligation_high_bg", title: "自连背景高", category: "特异性", severity: "high", likelihood: 0.78,
        condition: { type: "high", metric: "ligationBackground" },
        causes: ["载体酶切不完全", "未去磷酸化", "插入量不足"],
        actions: ["彻底酶切并胶回收", "载体去磷酸化", "提高插入比例"]
      },
      {
        id: "ligation_low_positive", title: "阳性克隆率低", category: "正确性", severity: "medium", likelihood: 0.76,
        condition: { type: "low", metric: "ligationPositiveRate" },
        causes: ["连接产物混杂", "筛选方法不当", "克隆随机性"],
        actions: ["优化连接与筛选", "增加克隆鉴定数"]
      },
      {
        id: "ligation_molar_off", title: "摩尔比失衡", category: "操作一致性", severity: "medium", likelihood: 0.72,
        condition: { type: "outside", metric: "ligationRatio" },
        causes: ["定量不准", "片段长度计算错误"],
        actions: ["重新定量", "按长度换算摩尔比"]
      }
    ]
  },
  colony_pcr_screening: {
    id: "colony_pcr_screening",
    name: "菌落 PCR 筛选",
    category: "分子生物学",
    description: "直接以菌落为模板做 PCR，快速筛选含目标插入片段的重组克隆",
    objective: "评估菌落 PCR 筛选的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "colonyBandSize", label: "条带大小符合预期", unit: "", type: 'enum', options: ["一致", "不一致"], expected: "一致", note: "电泳判读" },
    { key: "colonyNtc", label: "NTC 对照", unit: "", type: 'enum', options: ["无扩增", "有扩增"], expected: "无扩增", note: "污染判据" },
    { key: "colonyPositiveCtrl", label: "阳性对照", unit: "", type: 'enum', options: ["有条带", "无条带"], expected: "有条带", note: "体系有效性判据" },
    { key: "colonyNegativeCtrl", label: "空载体阴性对照", unit: "", type: 'enum', options: ["无扩增", "有扩增"], expected: "无扩增", note: "自连背景判据" },
    { key: "colonyConfirmRate", label: "复核符合率", unit: "%", type: 'number', normal: [80, 100], criticalHigh: 50, note: "测序或酶切确认" }
    ],
    rules: [
      {
        id: "colony_false_pos", title: "阴性对照有扩增", category: "特异性", severity: "high", likelihood: 0.8,
        condition: { type: "enum", metric: "colonyNegativeCtrl", value: "有扩增" },
        causes: ["载体自连", "引物非特异", "交叉污染"],
        actions: ["提高退火温度", "改用跨接头引物", "分区操作"]
      },
      {
        id: "colony_contam", title: "NTC 扩增", category: "污染", severity: "critical", likelihood: 0.82,
        condition: { type: "enum", metric: "colonyNtc", value: "有扩增" },
        causes: ["试剂污染", "气溶胶", "加样交叉"],
        actions: ["更换试剂", "清洁分区", "重做"]
      },
      {
        id: "colony_pos_fail", title: "阳性对照无条带", category: "有效性", severity: "high", likelihood: 0.78,
        condition: { type: "enum", metric: "colonyPositiveCtrl", value: "无条带" },
        causes: ["裂解不充分", "酶失活", "引物失效", "循环数不足"],
        actions: ["延长裂解", "更换酶或引物", "增加循环数"]
      },
      {
        id: "colony_wrong_size", title: "条带大小不符", category: "正确性", severity: "medium", likelihood: 0.76,
        condition: { type: "enum", metric: "colonyBandSize", value: "不一致" },
        causes: ["引物错位", "载体自连", "样本混淆"],
        actions: ["核对引物位置", "复核克隆编号", "测序确认"]
      }
    ]
  },
  indirect_elisa: {
    id: "indirect_elisa",
    name: "间接 ELISA",
    category: "分析检测",
    description: "固相抗原捕获样品抗体，再加酶标二抗显色，用于抗体定性与半定量检测",
    objective: "评估间接 ELISA的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "elisaBlankOd", label: "空白 OD", unit: "", type: 'number', normal: [0, 0.1], criticalHigh: 0.2, note: "试剂背景" },
    { key: "elisaPositiveOd", label: "阳性对照 OD", unit: "", type: 'number', normal: [0.5, 2], criticalLow: 0.3, note: "验证体系有效" },
    { key: "elisaNegativeOd", label: "阴性对照 OD", unit: "", type: 'number', normal: [0, 0.2], criticalHigh: 0.5, note: "背景与非特异结合" },
    { key: "elisaSpRatio", label: "S/P 值", unit: "", type: 'number', normal: [1, 10], criticalLow: 0.9, note: "≥1 判阳性（按方法）" },
    { key: "elisaRepCv", label: "复孔 CV", unit: "%", type: 'number', normal: [0, 15], criticalHigh: 25, note: "加样一致性" }
    ],
    rules: [
      {
        id: "elisa_high_bg", title: "阴性或空白 OD 偏高", category: "背景", severity: "high", likelihood: 0.82,
        condition: { type: "high", metric: "elisaNegativeOd" },
        causes: ["封闭不足", "洗板不充分", "二抗浓度过高"],
        actions: ["延长封闭", "增加洗板次数", "稀释二抗"]
      },
      {
        id: "elisa_low_signal", title: "阳性对照 OD 偏低", category: "有效性", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "elisaPositiveOd" },
        causes: ["抗原包被不足", "抗体或二抗失效", "显色时间不足"],
        actions: ["提高包被浓度", "更换试剂", "延长显色"]
      },
      {
        id: "elisa_cv_high", title: "复孔重复性差", category: "操作一致性", severity: "medium", likelihood: 0.78,
        condition: { type: "high", metric: "elisaRepCv" },
        causes: ["加样不均", "气泡", "边缘效应"],
        actions: ["规范加样", "离心去泡", "避免使用外圈孔"]
      },
      {
        id: "elisa_saturation", title: "高浓度孔信号饱和", category: "线性", severity: "medium", likelihood: 0.74,
        condition: { type: "high", metric: "elisaPositiveOd" },
        causes: ["显色过久", "样品浓度过高", "终止不及时"],
        actions: ["缩短显色", "加大稀释", "及时终止"]
      }
    ]
  },
  competitive_elisa: {
    id: "competitive_elisa",
    name: "竞争 ELISA",
    category: "分析检测",
    description: "样品抗原与酶标抗原竞争有限抗体结合位点，信号与抗原浓度呈负相关",
    objective: "评估竞争 ELISA的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "compR2", label: "标准曲线 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.95, note: "4PL 拟合" },
    { key: "compZeroOd", label: "零标准 OD（最大信号）", unit: "", type: 'number', normal: [0.8, 2], criticalLow: 0.5, note: "反映竞争窗口上限" },
    { key: "compSlope", label: "曲线单调性", unit: "", type: 'enum', options: ["单调递减", "非单调"], expected: "单调递减", note: "竞争法特征" },
    { key: "compRepCv", label: "复孔 CV", unit: "%", type: 'number', normal: [0, 15], criticalHigh: 25, note: "加样一致性" },
    { key: "compRecovery", label: "加标回收率", unit: "%", type: 'number', normal: [80, 120], criticalLow: 60, criticalHigh: 150, note: "方法准确度" }
    ],
    rules: [
      {
        id: "comp_curve_bad", title: "标准曲线拟合不佳", category: "方法有效性", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "compR2" },
        causes: ["标准品稀释错误", "酶标抗原量不当", "孵育不充分"],
        actions: ["重配标准品", "优化酶标抗原量", "延长竞争孵育"]
      },
      {
        id: "comp_signal_low", title: "零标准信号偏低", category: "有效性", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "compZeroOd" },
        causes: ["包被抗体不足", "酶标抗原失活", "显色不足"],
        actions: ["增加包被量", "更换酶标抗原", "延长显色"]
      },
      {
        id: "comp_nonmono", title: "曲线非单调递减", category: "方法有效性", severity: "medium", likelihood: 0.78,
        condition: { type: "enum", metric: "compSlope", value: "非单调" },
        causes: ["加样顺序错乱", "标准品混淆", "洗板不充分"],
        actions: ["核对加样板图", "重配标准品", "规范洗板"]
      },
      {
        id: "comp_recovery_out", title: "加标回收率异常", category: "准确度", severity: "high", likelihood: 0.8,
        condition: { type: "outside", metric: "compRecovery" },
        causes: ["基质干扰", "稀释倍数不当", "标准品失准"],
        actions: ["做基质匹配", "调整稀释", "更换标准品"]
      }
    ]
  },
  sterility_direct_inoculation: {
    id: "sterility_direct_inoculation",
    name: "无菌检查直接接种法",
    category: "质量控制",
    description: "将供试品直接接种至硫乙醇酸盐流体培养基与胰酪大豆胨液体培养基，经培养观察判定是否存在活微生物",
    objective: "评估无菌检查直接接种法的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "ftmTemp", label: "FTM 培养温度", unit: "°C", type: 'number', normal: [30, 35], criticalLow: 20, criticalHigh: 37, note: "硫乙醇酸盐流体培养基" },
    { key: "tsbTemp", label: "TSB 培养温度", unit: "°C", type: 'number', normal: [20, 25], criticalLow: 15, criticalHigh: 30, note: "胰酪大豆胨液体培养基" },
    { key: "mediumPh", label: "培养基 pH", unit: "", type: 'number', normal: [7, 7.4], criticalLow: 6.8, criticalHigh: 7.6, note: "灭菌后测定" },
    { key: "incubationDays", label: "培养观察天数", unit: "天", type: 'number', normal: [14, 14], criticalLow: 7, criticalHigh: 21, note: "药典规定 14 d" },
    { key: "growthControl", label: "阳性对照生长", unit: "", type: 'enum', options: ["生长", "不生长"], expected: "生长", note: "促生长能力检查" }
    ],
    rules: [
      {
        id: "sterility_temp_out", title: "培养温度偏离", category: "培养条件", severity: "high", likelihood: 0.82,
        condition: { type: "outside", metric: "ftmTemp" },
        causes: ["培养箱未校准", "温度设置错误", "开门频繁波动"],
        actions: ["校准培养箱", "重设温度并复核", "减少开门频次"]
      },
      {
        id: "sterility_ph_out", title: "培养基 pH 异常", category: "培养基质量", severity: "medium", likelihood: 0.78,
        condition: { type: "outside", metric: "mediumPh" },
        causes: ["灭菌过度", "配制比例错误", "水质不合格"],
        actions: ["重配并复核 pH", "控制灭菌条件", "检查配制记录"]
      },
      {
        id: "sterility_growth_control_fail", title: "阳性对照不生长", category: "方法有效性", severity: "high", likelihood: 0.85,
        condition: { type: "enum", metric: "growthControl", value: "不生长" },
        causes: ["培养基失效", "菌株老化", "培养条件不当"],
        actions: ["更换培养基批次", "复苏传代标准菌株", "核查培养温度"]
      }
    ]
  },
  control_bacteria_test: {
    id: "control_bacteria_test",
    name: "控制菌检查",
    category: "质量控制",
    description: "通过增菌、选择性分离与生化血清学确证，检查供试品中是否检出规定的控制菌",
    objective: "评估控制菌检查的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "enrichmentTemp", label: "增菌培养温度", unit: "°C", type: 'number', normal: [30, 35], criticalLow: 20, criticalHigh: 42, note: "细菌增菌" },
    { key: "enrichmentHours", label: "增菌时间", unit: "h", type: 'number', normal: [18, 24], criticalLow: 12, criticalHigh: 48, note: "按药典方法" },
    { key: "selectiveTemp", label: "选择性培养温度", unit: "°C", type: 'number', normal: [30, 35], criticalLow: 20, criticalHigh: 42, note: "平板培养" },
    { key: "confirmResult", label: "确证结果", unit: "", type: 'enum', options: ["阳性", "阴性"], expected: "阳性", note: "生化与血清学确证" }
    ],
    rules: [
      {
        id: "cb_enrich_temp_out", title: "增菌温度偏离", category: "培养条件", severity: "high", likelihood: 0.82,
        condition: { type: "outside", metric: "enrichmentTemp" },
        causes: ["培养箱未校准", "温度设置错误", "温控失灵"],
        actions: ["校准培养箱", "重设温度并复核", "检修设备"]
      },
      {
        id: "cb_enrich_short", title: "增菌时间不足", category: "操作偏差", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "enrichmentHours" },
        causes: ["提前转种", "计时错误", "生长缓慢"],
        actions: ["保证 18-24 h", "核对计时记录", "必要时延长并复核"]
      },
      {
        id: "cb_confirm_enum", title: "确证结果需复核", category: "结果判定", severity: "medium", likelihood: 0.78,
        condition: { type: "enum", metric: "confirmResult", value: "阴性" },
        causes: ["生化反应不典型", "血清凝集弱", "对照异常"],
        actions: ["重复确证试验", "核查对照", "由第二人复核判定"]
      }
    ]
  },
  bioburden_test: {
    id: "bioburden_test",
    name: "生物负载检测",
    category: "质量控制",
    description: "采用平板计数法测定产品或生产环节样本中的需氧微生物总数，用于监控生产卫生状况",
    objective: "评估生物负载检测的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "incubationTemp", label: "培养温度", unit: "°C", type: 'number', normal: [30, 35], criticalLow: 20, criticalHigh: 37, note: "TSA 平板" },
    { key: "incubationHours", label: "培养时间", unit: "h", type: 'number', normal: [48, 72], criticalLow: 24, criticalHigh: 120, note: "常规需氧菌" },
    { key: "sampleVolume", label: "取样体积", unit: "mL", type: 'number', normal: [1, 10], criticalLow: 0.1, criticalHigh: 100, note: "单次取样" },
    { key: "recoveryRate", label: "方法回收率", unit: "%", type: 'number', normal: [70, 200], criticalLow: 50, note: "方法适用性" },
    { key: "result", label: "判定结果", unit: "", type: 'enum', options: ["符合规定", "不符合规定"], expected: "符合规定", note: "按内控限度判定" }
    ],
    rules: [
      {
        id: "bb_temp_out", title: "培养温度偏离", category: "培养条件", severity: "medium", likelihood: 0.78,
        condition: { type: "outside", metric: "incubationTemp" },
        causes: ["培养箱未校准", "温度设置错误", "平板叠放过密"],
        actions: ["校准培养箱", "重设温度", "减少叠放"]
      },
      {
        id: "bb_recovery_low", title: "方法回收率偏低", category: "方法有效性", severity: "high", likelihood: 0.82,
        condition: { type: "low", metric: "recoveryRate" },
        causes: ["供试品抑菌性", "稀释或涂布损失", "菌株活性差"],
        actions: ["增加稀释或中和抑菌性", "规范涂布", "复苏标准菌株"]
      },
      {
        id: "bb_result_enum", title: "结果需复核", category: "结果判定", severity: "medium", likelihood: 0.8,
        condition: { type: "enum", metric: "result", value: "不符合规定" },
        causes: ["计数超限", "趋势异常", "限度引用错误"],
        actions: ["复核原始计数", "开展趋势分析", "核对判定标准"]
      }
    ]
  },
  disinfectant_efficacy_test: {
    id: "disinfectant_efficacy_test",
    name: "消毒剂效力验证",
    category: "质量控制",
    description: "通过定量悬浮试验考察消毒剂在规定浓度与作用时间下对标准菌株的杀灭对数值",
    objective: "评估消毒剂效力验证的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "contactTime", label: "作用时间", unit: "min", type: 'number', normal: [5, 15], criticalLow: 1, criticalHigh: 30, note: "按使用说明" },
    { key: "testTemp", label: "试验温度", unit: "°C", type: 'number', normal: [20, 25], criticalLow: 15, criticalHigh: 30, note: "室温条件" },
    { key: "logReduction", label: "杀灭对数值", unit: "log", type: 'number', normal: [3, 5], criticalLow: 2, note: "细菌杀灭标准" },
    { key: "neutralizerEff", label: "中和剂有效性", unit: "", type: 'enum', options: ["有效", "无效"], expected: "有效", note: "先验证后试验" }
    ],
    rules: [
      {
        id: "de_log_low", title: "杀灭对数值不足", category: "效力不足", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "logReduction" },
        causes: ["消毒剂浓度偏低", "作用时间不足", "菌悬液浓度过高"],
        actions: ["核对并上调使用浓度", "延长作用时间", "校准菌悬液浓度"]
      },
      {
        id: "de_neutralizer_fail", title: "中和验证未通过", category: "方法有效性", severity: "high", likelihood: 0.86,
        condition: { type: "enum", metric: "neutralizerEff", value: "无效" },
        causes: ["中和剂选择不当", "中和时间不足", "中和剂本身有毒性"],
        actions: ["更换适宜中和剂", "延长中和时间", "重做中和验证"]
      },
      {
        id: "de_contact_short", title: "作用时间偏短", category: "操作偏差", severity: "medium", likelihood: 0.78,
        condition: { type: "low", metric: "contactTime" },
        causes: ["计时提前", "操作节奏不一致", "未按说明设定"],
        actions: ["规范计时", "统一操作流程", "核对使用说明"]
      }
    ]
  },
  visible_particles_inspection: {
    id: "visible_particles_inspection",
    name: "可见异物检查",
    category: "分析检测",
    description: "在规定照度与黑白背景下以目视方式检查注射剂等制剂中是否存在可见异物",
    objective: "评估可见异物检查的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "lightIntensity", label: "检查照度", unit: "lx", type: 'number', normal: [1000, 3000], criticalLow: 500, criticalHigh: 5000, note: "灯检台设定" },
    { key: "inspectionTime", label: "单瓶检查时间", unit: "s", type: 'number', normal: [5, 20], criticalLow: 3, criticalHigh: 60, note: "避免过快" },
    { key: "observerDistance", label: "目检距离", unit: "cm", type: 'number', normal: [20, 25], criticalLow: 15, criticalHigh: 40, note: "眼睛与容器距离" },
    { key: "result", label: "检查结果", unit: "", type: 'enum', options: ["合格", "不合格"], expected: "合格", note: "按药典标准判定" }
    ],
    rules: [
      {
        id: "vi_light_out", title: "照度不符合要求", category: "检查条件", severity: "high", likelihood: 0.82,
        condition: { type: "outside", metric: "lightIntensity" },
        causes: ["灯检台老化", "灯泡亮度衰减", "照度未校准"],
        actions: ["校准照度", "更换光源", "定期确认灯检台"]
      },
      {
        id: "vi_time_short", title: "单瓶检查时间过短", category: "操作偏差", severity: "medium", likelihood: 0.78,
        condition: { type: "low", metric: "inspectionTime" },
        causes: ["检查节奏过快", "批量压力大", "未按规程执行"],
        actions: ["放慢检查速度", "合理安排批量", "加强规程培训"]
      },
      {
        id: "vi_result_enum", title: "检查结果需复核", category: "结果判定", severity: "medium", likelihood: 0.8,
        condition: { type: "enum", metric: "result", value: "不合格" },
        causes: ["异物判定争议", "气泡干扰", "记录不全"],
        actions: ["双人复核", "借助放大确认", "核对缺陷记录"]
      }
    ]
  },
  insoluble_particle_test: {
    id: "insoluble_particle_test",
    name: "不溶性微粒检查",
    category: "分析检测",
    description: "采用光阻法（必要时显微计数法复核）测定注射剂中不溶性微粒的粒径与数量",
    objective: "评估不溶性微粒检查的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "sampleVolume", label: "取样体积", unit: "mL", type: 'number', normal: [5, 100], criticalLow: 1, criticalHigh: 200, note: "按仪器与装量" },
    { key: "threshold10", label: "≥10 µm 微粒数", unit: "个/容器", type: 'number', normal: [0, 6000], criticalHigh: 30000, note: "按装量引用限度" },
    { key: "threshold25", label: "≥25 µm 微粒数", unit: "个/容器", type: 'number', normal: [0, 600], criticalHigh: 3000, note: "按装量引用限度" },
    { key: "flowRate", label: "进样流速", unit: "mL/min", type: 'number', normal: [5, 25], criticalLow: 1, criticalHigh: 40, note: "按仪器规程" },
    { key: "blankCount", label: "空白计数", unit: "个/mL", type: 'number', normal: [0, 5], criticalHigh: 20, note: "微粒检查用水" }
    ],
    rules: [
      {
        id: "ip_10um_high", title: "≥10 µm 微粒超标", category: "质量超限", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "threshold10" },
        causes: ["生产环境污染", "容器清洗不净", "取样带入微粒"],
        actions: ["排查洁净环境", "加强容器清洗", "规范无菌取样"]
      },
      {
        id: "ip_25um_high", title: "≥25 µm 微粒超标", category: "质量超限", severity: "high", likelihood: 0.86,
        condition: { type: "high", metric: "threshold25" },
        causes: ["滤器或设备脱落微粒", "包装材料污染", "操作带入"],
        actions: ["检查设备磨损", "更换包材", "规范操作"]
      },
      {
        id: "ip_blank_high", title: "空白计数偏高", category: "方法有效性", severity: "medium", likelihood: 0.8,
        condition: { type: "high", metric: "blankCount" },
        causes: ["微粒检查用水不洁", "管路污染", "环境尘埃"],
        actions: ["更换检查用水", "彻底清洗管路", "改善检测环境"]
      }
    ]
  },
  media_preparation: {
    id: "media_preparation",
    name: "培养基配制与除菌过滤",
    category: "上游工艺",
    description: "按配方称量配制液体培养基，经 0.22 µm 滤膜除菌后用于细胞培养。",
    objective: "评估培养基配制与除菌过滤的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "ph", label: "培养基 pH", unit: "", type: 'number', normal: [6.9, 7.5], criticalLow: 6.7, criticalHigh: 7.7, note: "25 °C 测定" },
    { key: "osmolality", label: "渗透压", unit: "mOsm/kg", type: 'number', normal: [270, 330], criticalLow: 250, criticalHigh: 350, note: "冰点或蒸气压法" },
    { key: "endotoxin", label: "内毒素", unit: "EU/mL", type: 'number', normal: [0, 0.25], criticalHigh: 0.5, note: "凝胶法或动态法" },
    { key: "sterility", label: "无菌检查", unit: "", type: 'enum', options: ["阴性", "阳性"], expected: "阴性", note: "薄膜过滤法" },
    { key: "appearance", label: "外观", unit: "", type: 'enum', options: ["澄清", "浑浊"], expected: "澄清", note: "目视检查" }
    ],
    rules: [
      {
        id: "ph_out", title: "培养基 pH 偏离目标", category: "配制参数", severity: "high", likelihood: 0.8,
        condition: { type: "outside", metric: "ph" },
        causes: ["调 pH 后未复核", "酸碱浓度过高局部过冲", "定容体积偏差"],
        actions: ["重新校准确认 pH 计", "分步缓慢调 pH", "复核定容体积"]
      },
      {
        id: "osmo_out", title: "渗透压超出范围", category: "配制参数", severity: "high", likelihood: 0.8,
        condition: { type: "outside", metric: "osmolality" },
        causes: ["称量误差", "干粉含水量变化", "用水量偏差"],
        actions: ["复核配方与称量", "按实测值微调", "更新批记录"]
      },
      {
        id: "endotoxin_high", title: "内毒素超标", category: "污染风险", severity: "critical", likelihood: 0.85,
        condition: { type: "high", metric: "endotoxin" },
        causes: ["用水内毒素高", "器具未除热原", "干粉本身超标"],
        actions: ["更换合格用水", "器具干热除热原", "更换干粉批次"]
      },
      {
        id: "sterility_fail", title: "除菌过滤后仍长菌", category: "污染风险", severity: "critical", likelihood: 0.9,
        condition: { type: "enum", metric: "sterility", value: "阳性" },
        causes: ["滤膜破损", "压差过大", "分装时污染"],
        actions: ["做滤器完整性测试", "降低过滤压差", "在生物安全柜内分装"]
      },
      {
        id: "appearance_turbid", title: "培养基浑浊或有颗粒", category: "配制参数", severity: "medium", likelihood: 0.7,
        condition: { type: "enum", metric: "appearance", value: "浑浊" },
        causes: ["组分未完全溶解", "沉淀析出", "滤膜泄漏"],
        actions: ["延长搅拌并复温", "检查 pH 与钙镁浓度", "更换滤器"]
      }
    ]
  },
  fed_batch_culture: {
    id: "fed_batch_culture",
    name: "补料分批培养（CHO 表达）",
    category: "上游工艺",
    description: "在批培养基础上按预设策略补加营养液，延长培养周期以提高产物表达量。",
    objective: "评估补料分批培养（CHO 表达）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "viability", label: "细胞活率", unit: "%", type: 'number', normal: [70, 100], criticalLow: 50, note: "收获前判定" },
    { key: "peakVcd", label: "峰值活细胞密度", unit: "10⁶ cells/mL", type: 'number', normal: [10, 25], criticalLow: 5, criticalHigh: 30, note: "培养期最高值" },
    { key: "glucose", label: "葡萄糖浓度", unit: "g/L", type: 'number', normal: [1, 6], criticalLow: 0.3, criticalHigh: 8, note: "维持 2-6 g/L" },
    { key: "lactate", label: "乳酸浓度", unit: "g/L", type: 'number', normal: [0, 4], criticalHigh: 6, note: "偏高提示代谢负荷" },
    { key: "ammonia", label: "氨浓度", unit: "mmol/L", type: 'number', normal: [0, 5], criticalHigh: 8, note: "谷氨酰胺代谢产物" },
    { key: "osmolality", label: "渗透压", unit: "mOsm/kg", type: 'number', normal: [280, 380], criticalLow: 260, criticalHigh: 420, note: "补料会持续升高" }
    ],
    rules: [
      {
        id: "glucose_low", title: "葡萄糖耗竭", category: "营养供给", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "glucose" },
        causes: ["补料速率不足", "补料泵故障", "细胞密度高于预期"],
        actions: ["提高补料速率", "校准补料泵", "按密度重算补料量"]
      },
      {
        id: "lactate_high", title: "乳酸累积偏高", category: "代谢异常", severity: "high", likelihood: 0.8,
        condition: { type: "high", metric: "lactate" },
        causes: ["葡萄糖供过于求", "pH 控制方式不当", "细胞密度过高"],
        actions: ["降低补料速率", "改用碱液滴定", "降温抑制代谢"]
      },
      {
        id: "viability_low", title: "活率过早下降", category: "细胞状态", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "viability" },
        causes: ["营养耗竭", "渗透压过高", "代谢副产物累积"],
        actions: ["提前收获", "调整补料与降温策略", "检测渗透压"]
      },
      {
        id: "osmo_high", title: "渗透压持续偏高", category: "培养参数", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "osmolality" },
        causes: ["补料液浓度过高", "补料量偏多", "蒸发导致浓缩"],
        actions: ["稀释补料液", "按密度控制补料", "检查培养箱湿度"]
      },
      {
        id: "vcd_low", title: "峰值密度偏低", category: "生长异常", severity: "medium", likelihood: 0.7,
        condition: { type: "low", metric: "peakVcd" },
        causes: ["接种密度不足", "培养基不适配", "存在污染"],
        actions: ["提高接种密度", "做培养基筛选", "镜检与支原体检测"]
      }
    ]
  },
  harvest_clarification: {
    id: "harvest_clarification",
    name: "收获液澄清（离心与深层过滤）",
    category: "下游工艺",
    description: "通过离心与深层过滤去除细胞、碎片与大颗粒，得到可供层析的澄清收获液。",
    objective: "评估收获液澄清（离心与深层过滤）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "turbidity", label: "澄清后浊度", unit: "NTU", type: 'number', normal: [0, 10], criticalHigh: 20, note: "浊度计测定" },
    { key: "yield", label: "目标蛋白收率", unit: "%", type: 'number', normal: [90, 100], criticalLow: 80, note: "与离心前比对" },
    { key: "load", label: "过滤载量", unit: "L/m²", type: 'number', normal: [50, 200], criticalLow: 30, note: "按滤板面积计算" },
    { key: "pressure", label: "过滤压差", unit: "MPa", type: 'number', normal: [0, 0.15], criticalHigh: 0.2, note: "压差骤升提示堵塞" },
    { key: "temperature", label: "操作温度", unit: "°C", type: 'number', normal: [2, 8], criticalLow: 0, criticalHigh: 12, note: "全程控温" }
    ],
    rules: [
      {
        id: "turbidity_high", title: "澄清后浊度偏高", category: "澄清效果", severity: "high", likelihood: 0.8,
        condition: { type: "high", metric: "turbidity" },
        causes: ["离心不彻底", "滤板载量不足", "细胞密度过高"],
        actions: ["提高离心力或延长时间", "增加滤板面积", "稀释料液后过滤"]
      },
      {
        id: "yield_low", title: "目标蛋白收率偏低", category: "收率损失", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "yield" },
        causes: ["细胞破碎释放蛋白酶", "滤板吸附", "料液降解"],
        actions: ["降低离心剪切", "更换低吸附滤材", "全程 2-8 °C 操作"]
      },
      {
        id: "load_low", title: "过滤载量偏低", category: "过滤性能", severity: "medium", likelihood: 0.7,
        condition: { type: "low", metric: "load" },
        causes: ["料液颗粒过多", "滤板选型不当", "流速过快"],
        actions: ["加强前级离心", "更换深层滤板型号", "降低进料流速"]
      },
      {
        id: "pressure_high", title: "过滤压差骤升", category: "过滤性能", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "pressure" },
        causes: ["滤板堵塞", "料液黏度过高", "管路折弯"],
        actions: ["切换滤板", "稀释降低黏度", "检查管路"]
      },
      {
        id: "temp_high", title: "操作温度偏高", category: "稳定性风险", severity: "medium", likelihood: 0.7,
        condition: { type: "high", metric: "temperature" },
        causes: ["设备未预冷", "操作时间过长", "环境温度高"],
        actions: ["预冷设备与管路", "缩短操作时间", "控制房间温度"]
      }
    ]
  },
  viral_filtration: {
    id: "viral_filtration",
    name: "除病毒纳滤",
    category: "下游工艺",
    description: "用纳米级滤膜物理截留病毒，是病毒安全性的正交清除步骤。",
    objective: "评估除病毒纳滤的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "recovery", label: "蛋白回收率", unit: "%", type: 'number', normal: [95, 100], criticalLow: 90, note: "过滤前后浓度比对" },
    { key: "logReduction", label: "病毒清除 log10 降低", unit: "log10", type: 'number', normal: [4, 8], criticalLow: 3, note: "缩小模型验证数据" },
    { key: "pressure", label: "过滤压差", unit: "MPa", type: 'number', normal: [0, 0.3], criticalHigh: 0.35, note: "恒压或恒流模式" },
    { key: "integrity", label: "滤器完整性", unit: "", type: 'enum', options: ["合格", "不合格"], expected: "合格", note: "使用前后各测" },
    { key: "aggregate", label: "SEC 聚体比例", unit: "%", type: 'number', normal: [0, 3], criticalHigh: 5, note: "过滤前后对比" }
    ],
    rules: [
      {
        id: "recovery_low", title: "蛋白回收率偏低", category: "收率损失", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "recovery" },
        causes: ["膜面吸附", "吹扫不足", "料液浓度过高"],
        actions: ["更换低吸附滤膜", "增加吹扫体积", "稀释后过滤"]
      },
      {
        id: "logr_low", title: "病毒清除不足", category: "病毒安全性", severity: "critical", likelihood: 0.9,
        condition: { type: "low", metric: "logReduction" },
        causes: ["滤膜孔径偏大", "膜破损", "上样量过大"],
        actions: ["更换 20 nm 级滤膜", "做完整性测试", "按载量控制上样"]
      },
      {
        id: "pressure_high", title: "过滤压差偏高", category: "过滤性能", severity: "high", likelihood: 0.8,
        condition: { type: "high", metric: "pressure" },
        causes: ["料液聚集", "预过滤不足", "膜孔堵塞"],
        actions: ["预过滤并检测聚体", "降低上样浓度", "更换滤器"]
      },
      {
        id: "integrity_fail", title: "滤器完整性不合格", category: "病毒安全性", severity: "critical", likelihood: 0.95,
        condition: { type: "enum", metric: "integrity", value: "不合格" },
        causes: ["安装密封不良", "膜破损", "测试方法不当"],
        actions: ["重新安装滤器", "更换新滤器", "按厂家方法复测"]
      },
      {
        id: "aggregate_high", title: "过滤后聚体升高", category: "产品质量", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "aggregate" },
        causes: ["局部高压剪切", "料液不稳定", "缓冲体系不适"],
        actions: ["降低操作压力", "优化缓冲体系", "缩短操作时间"]
      }
    ]
  },
  desalting_gel_filtration: {
    id: "desalting_gel_filtration",
    name: "脱盐与缓冲液置换（G-25 凝胶过滤）",
    category: "下游工艺",
    description: "用 Sephadex G-25 凝胶过滤快速去除小分子盐与游离标记，完成缓冲液置换。",
    objective: "评估脱盐与缓冲液置换（G-25 凝胶过滤）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "recovery", label: "蛋白回收率", unit: "%", type: 'number', normal: [90, 100], criticalLow: 80, note: "前后浓度比对" },
    { key: "conductivityDrop", label: "电导率下降幅度", unit: "%", type: 'number', normal: [90, 100], criticalLow: 80, note: "与上样前比对" },
    { key: "dilution", label: "样品稀释倍数", unit: "倍", type: 'number', normal: [1, 1.5], criticalHigh: 2, note: "合并后体积比" },
    { key: "conductivity", label: "终产物电导率", unit: "mS/cm", type: 'number', normal: [0, 5], criticalHigh: 10, note: "应接近缓冲液本底" },
    { key: "aggregate", label: "SEC 聚体比例", unit: "%", type: 'number', normal: [0, 3], criticalHigh: 5, note: "脱盐前后对比" }
    ],
    rules: [
      {
        id: "recovery_low", title: "脱盐回收率偏低", category: "收率损失", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "recovery" },
        causes: ["上样过量", "峰收集不完整", "柱床干涸"],
        actions: ["控制上样体积", "按 A280 曲线完整收集", "避免柱床干涸"]
      },
      {
        id: "desalt_incomplete", title: "脱盐不彻底", category: "工艺效果", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "conductivity" },
        causes: ["上样体积超出柱床容量", "流速过快", "柱床不均"],
        actions: ["减小上样体积", "降低流速", "重新装柱或更换预装柱"]
      },
      {
        id: "dilution_high", title: "样品稀释过度", category: "工艺效果", severity: "medium", likelihood: 0.7,
        condition: { type: "high", metric: "dilution" },
        causes: ["收集体积过大", "上样体积过小", "峰展宽"],
        actions: ["按 A280 收紧收集", "提高上样浓度", "后续超滤浓缩"]
      },
      {
        id: "aggregate_high", title: "脱盐后聚体升高", category: "产品质量", severity: "medium", likelihood: 0.7,
        condition: { type: "high", metric: "aggregate" },
        causes: ["缓冲体系 pH 不适", "操作温度偏高", "局部浓度过高"],
        actions: ["优化缓冲体系", "低温操作", "降低上样浓度"]
      }
    ]
  },
  water_system_monitoring: {
    id: "water_system_monitoring",
    name: "纯化水与注射用水系统监测",
    category: "质量控制",
    description: "按药典要求对制药用水进行电导率、总有机碳与微生物限度检测，确认系统处于受控状态。",
    objective: "评估纯化水与注射用水系统监测的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "conductivity", label: "电导率", unit: "µS/cm", type: 'number', normal: [0, 1.3], criticalHigh: 2, note: "25 °C 补偿" },
    { key: "toc", label: "总有机碳", unit: "ppb", type: 'number', normal: [0, 500], criticalHigh: 800, note: "在线或离线" },
    { key: "microbial", label: "微生物限度", unit: "CFU/mL", type: 'number', normal: [0, 100], criticalHigh: 200, note: "纯化水标准" },
    { key: "endotoxin", label: "细菌内毒素", unit: "EU/mL", type: 'number', normal: [0, 0.25], criticalHigh: 0.5, note: "注射用水项目" },
    { key: "waterTemp", label: "水温", unit: "°C", type: 'number', normal: [15, 30], criticalLow: 5, criticalHigh: 40, note: "影响电导率判定" }
    ],
    rules: [
      {
        id: "cond_high", title: "电导率超标", category: "水质指标", severity: "critical", likelihood: 0.9,
        condition: { type: "high", metric: "conductivity" },
        causes: ["树脂失效", "RO 膜破损", "管路污染"],
        actions: ["更换树脂或膜组件", "消毒管路", "复测各取样点"]
      },
      {
        id: "toc_high", title: "总有机碳超标", category: "水质指标", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "toc" },
        causes: ["有机物残留", "管路生物膜", "取样污染"],
        actions: ["加强冲洗与消毒", "检测生物膜", "规范取样"]
      },
      {
        id: "micro_high", title: "微生物限度超标", category: "微生物污染", severity: "critical", likelihood: 0.9,
        condition: { type: "high", metric: "microbial" },
        causes: ["消毒周期不足", "管路死角", "取样口污染"],
        actions: ["缩短消毒周期", "改造死角", "火焰灭菌取样口"]
      },
      {
        id: "endotoxin_high", title: "内毒素超标", category: "热原风险", severity: "critical", likelihood: 0.9,
        condition: { type: "high", metric: "endotoxin" },
        causes: ["储罐污染", "超滤失效", "蒸馏器异常"],
        actions: ["系统消毒", "更换超滤", "检修蒸馏设备"]
      },
      {
        id: "temp_high", title: "水温偏高", category: "系统状态", severity: "low", likelihood: 0.6,
        condition: { type: "high", metric: "waterTemp" },
        causes: ["换热器异常", "循环泵发热", "环境温度高"],
        actions: ["检修换热器", "提高循环流量", "检查房间温度"]
      }
    ]
  },
  growth_promotion_test: {
    id: "growth_promotion_test",
    name: "培养基促生长试验",
    category: "质量控制",
    description: "用规定菌株验证培养基支持微生物生长的能力，是无菌与微生物限度检查的前置条件。",
    objective: "评估培养基促生长试验的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "recovery", label: "试验菌回收率", unit: "%", type: 'number', normal: [50, 200], criticalLow: 30, criticalHigh: 300, note: "与对照培养基比较" },
    { key: "growthTime", label: "明显生长时间", unit: "h", type: 'number', normal: [0, 72], criticalHigh: 120, note: "细菌 72 h，真菌 120 h" },
    { key: "controlGrowth", label: "空白对照", unit: "", type: 'enum', options: ["无菌生长", "有菌生长"], expected: "无菌生长", note: "同批培养基" },
    { key: "inoculum", label: "接种量", unit: "CFU", type: 'number', normal: [10, 100], criticalLow: 1, criticalHigh: 150, note: "每份" }
    ],
    rules: [
      {
        id: "recovery_low", title: "促生长能力不足", category: "培养基质量", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "recovery" },
        causes: ["营养不足", "灭菌过度", "存在抑制物"],
        actions: ["更换批次", "调整灭菌条件", "排查抑制物"]
      },
      {
        id: "recovery_high", title: "回收率异常偏高", category: "计数偏差", severity: "medium", likelihood: 0.7,
        condition: { type: "high", metric: "recovery" },
        causes: ["接种量估算偏低", "计数误差", "对照培养基失效"],
        actions: ["重新制备菌悬液", "双人计数", "更换对照"]
      },
      {
        id: "control_fail", title: "空白对照长菌", category: "污染风险", severity: "critical", likelihood: 0.9,
        condition: { type: "enum", metric: "controlGrowth", value: "有菌生长" },
        causes: ["灭菌不彻底", "分装污染", "器皿不洁"],
        actions: ["重新灭菌", "在洁净环境下分装", "更换器皿"]
      },
      {
        id: "growth_slow", title: "生长时间超出规定", category: "培养基质量", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "growthTime" },
        causes: ["培养温度偏低", "营养不足", "菌株活力低"],
        actions: ["校准培养箱", "更换培养基", "使用新鲜菌种"]
      },
      {
        id: "inoculum_high", title: "接种量超出规定", category: "操作偏差", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "inoculum" },
        causes: ["菌悬液浓度估算偏高", "稀释不足"],
        actions: ["重新标定菌悬液", "增加稀释梯度"]
      }
    ]
  },
  residual_dna_qpcr: {
    id: "residual_dna_qpcr",
    name: "宿主细胞 DNA 残留检测（qPCR 法）",
    category: "分析检测",
    description: "用特异性引物探针定量检测生物制品中残留的宿主细胞 DNA，是关键的纯度指标。",
    objective: "评估宿主细胞 DNA 残留检测（qPCR 法）的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "residualDNA", label: "宿主 DNA 残留", unit: "pg/mg 蛋白", type: 'number', normal: [0, 10], criticalHigh: 100, note: "按产品标准判定" },
    { key: "efficiency", label: "扩增效率", unit: "%", type: 'number', normal: [90, 110], criticalLow: 85, criticalHigh: 115, note: "由标准曲线斜率换算" },
    { key: "r2", label: "标准曲线 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.98, note: "≥5 点拟合" },
    { key: "recovery", label: "加标回收率", unit: "%", type: 'number', normal: [50, 150], criticalLow: 30, criticalHigh: 180, note: "评估基质抑制" },
    { key: "ntc", label: "无模板对照", unit: "", type: 'enum', options: ["无扩增", "有扩增"], expected: "无扩增", note: "每板必做" }
    ],
    rules: [
      {
        id: "dna_high", title: "宿主 DNA 残留超标", category: "纯度指标", severity: "critical", likelihood: 0.9,
        condition: { type: "high", metric: "residualDNA" },
        causes: ["纯化步骤清除不足", "层析载量过高", "样品浓度折算错误"],
        actions: ["增加精纯步骤", "降低层析载量", "复核蛋白浓度"]
      },
      {
        id: "eff_out", title: "扩增效率偏离", category: "方法性能", severity: "medium", likelihood: 0.75,
        condition: { type: "outside", metric: "efficiency" },
        causes: ["引物探针降解", "体系抑制", "配液误差"],
        actions: ["更换引物探针", "优化体系", "规范配液"]
      },
      {
        id: "r2_low", title: "标准曲线线性差", category: "方法性能", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "r2" },
        causes: ["标准品稀释误差", "低浓度点降解", "加样不准"],
        actions: ["重新稀释标准品", "现配现用", "校准移液器"]
      },
      {
        id: "recovery_low", title: "加标回收率偏低", category: "方法性能", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "recovery" },
        causes: ["样品基质抑制", "DNA 提取损失", "上样量过大"],
        actions: ["稀释样品", "优化提取", "减少上样量"]
      },
      {
        id: "ntc_fail", title: "无模板对照出现扩增", category: "污染风险", severity: "critical", likelihood: 0.9,
        condition: { type: "enum", metric: "ntc", value: "有扩增" },
        causes: ["试剂或环境污染", "加样交叉污染", "引物二聚体"],
        actions: ["更换试剂", "分区操作", "优化引物浓度"]
      }
    ]
  },
  residual_protein_a: {
    id: "residual_protein_a",
    name: "残留 Protein A 检测",
    category: "分析检测",
    description: "定量检测 Protein A 亲和层析后可能脱落并残留的配基蛋白。",
    objective: "评估残留 Protein A 检测的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "residualPA", label: "残留 Protein A", unit: "ng/mg 蛋白", type: 'number', normal: [0, 1], criticalHigh: 5, note: "按产品标准判定" },
    { key: "recovery", label: "加标回收率", unit: "%", type: 'number', normal: [70, 130], criticalLow: 50, criticalHigh: 150, note: "评估基质干扰" },
    { key: "r2", label: "标准曲线 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.98, note: "≥6 点拟合" },
    { key: "cv", label: "复孔变异系数", unit: "%", type: 'number', normal: [0, 15], criticalHigh: 20, note: "双孔计算" },
    { key: "blank", label: "空白孔 OD", unit: "", type: 'number', normal: [0, 0.1], criticalHigh: 0.15, note: "评估背景" }
    ],
    rules: [
      {
        id: "pa_high", title: "残留 Protein A 超标", category: "纯度指标", severity: "critical", likelihood: 0.9,
        condition: { type: "high", metric: "residualPA" },
        causes: ["层析柱清洗不足", "配基脱落", "洗脱条件过于苛刻"],
        actions: ["加强柱清洗", "更换层析介质", "优化洗脱 pH"]
      },
      {
        id: "recovery_low", title: "回收率偏低", category: "方法性能", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "recovery" },
        causes: ["样品基质干扰", "稀释倍数过高", "包被板失效"],
        actions: ["优化稀释液", "降低稀释倍数", "更换批次"]
      },
      {
        id: "r2_low", title: "标准曲线线性差", category: "方法性能", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "r2" },
        causes: ["标准品稀释误差", "孵育温度不均", "洗板不一致"],
        actions: ["重新稀释", "平衡板温", "规范洗板"]
      },
      {
        id: "cv_high", title: "复孔差异过大", category: "操作偏差", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "cv" },
        causes: ["加样不准", "孔内气泡", "边缘效应"],
        actions: ["校准移液器", "去除气泡", "避免使用边缘孔"]
      },
      {
        id: "blank_high", title: "空白背景偏高", category: "方法性能", severity: "medium", likelihood: 0.7,
        condition: { type: "high", metric: "blank" },
        causes: ["洗板不净", "二抗浓度过高", "底物污染"],
        actions: ["增加洗板次数", "稀释二抗", "更换底物"]
      }
    ]
  },
  cell_based_potency: {
    id: "cell_based_potency",
    name: "生物学活性（细胞学效价）测定",
    category: "分析检测",
    description: "用报告基因或细胞增殖体系测定产品的相对生物学效价，反映其作用机制是否正常。",
    objective: "评估生物学活性（细胞学效价）测定的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "relativePotency", label: "相对效价", unit: "%", type: 'number', normal: [80, 120], criticalLow: 60, criticalHigh: 140, note: "以参比品为 100%" },
    { key: "r2", label: "曲线拟合 R²", unit: "", type: 'number', normal: [0.98, 1], criticalLow: 0.95, note: "4PL 拟合" },
    { key: "cv", label: "复孔变异系数", unit: "%", type: 'number', normal: [0, 15], criticalHigh: 20, note: "每稀释度双孔" },
    { key: "cellViability", label: "实验起始细胞活率", unit: "%", type: 'number', normal: [90, 100], criticalLow: 80, note: "铺板前检测" },
    { key: "slopeRatio", label: "斜率比", unit: "", type: 'number', normal: [0.8, 1.25], criticalLow: 0.7, criticalHigh: 1.4, note: "样品与参比品比较" }
    ],
    rules: [
      {
        id: "potency_low", title: "相对效价偏低", category: "效价指标", severity: "critical", likelihood: 0.9,
        condition: { type: "low", metric: "relativePotency" },
        causes: ["样品降解", "糖型改变", "储存条件不当"],
        actions: ["复测确认", "检查稳定性数据", "优化储存条件"]
      },
      {
        id: "potency_high", title: "相对效价偏高", category: "效价指标", severity: "high", likelihood: 0.8,
        condition: { type: "high", metric: "relativePotency" },
        causes: ["参比品效价下降", "样品浓度标定偏高", "拟合异常"],
        actions: ["更换参比品", "复核浓度", "检查曲线拟合"]
      },
      {
        id: "r2_low", title: "曲线拟合不佳", category: "方法性能", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "r2" },
        causes: ["稀释误差", "细胞状态不均", "信号饱和"],
        actions: ["重新稀释", "使用对数期细胞", "调整检测窗口"]
      },
      {
        id: "cv_high", title: "复孔差异过大", category: "操作偏差", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "cv" },
        causes: ["加样误差", "边缘效应", "混匀不足"],
        actions: ["校准移液器", "避开边缘孔", "充分混匀"]
      },
      {
        id: "slope_out", title: "曲线斜率偏离", category: "方法性能", severity: "medium", likelihood: 0.7,
        condition: { type: "outside", metric: "slopeRatio" },
        causes: ["样品与参比品机制差异", "基质干扰", "孵育时间不一致"],
        actions: ["复测并比较稀释线性", "更换基质", "统一孵育时间"]
      },
      {
        id: "viability_low", title: "起始细胞活率偏低", category: "细胞状态", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "cellViability" },
        causes: ["复苏状态差", "传代过度", "培养条件异常"],
        actions: ["重新复苏", "控制传代次数", "检查培养箱"]
      }
    ]
  },
  osmolality_determination: {
    id: "osmolality_determination",
    name: "渗透压摩尔浓度测定",
    category: "分析检测",
    description: "用冰点下降或蒸气压法测定制剂渗透压，评价其与生理条件的一致性。",
    objective: "评估渗透压摩尔浓度测定的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "osmolality", label: "渗透压摩尔浓度", unit: "mOsm/kg", type: 'number', normal: [280, 320], criticalLow: 250, criticalHigh: 350, note: "冰点下降法" },
    { key: "cv", label: "重复性 CV", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 3, note: "连续 3 次测定" },
    { key: "calibDev", label: "校准偏差", unit: "%", type: 'number', normal: [0, 2], criticalHigh: 3, note: "与标准液标称值比较" },
    { key: "sampleVol", label: "取样体积", unit: "µL", type: 'number', normal: [50, 200], criticalLow: 30, note: "按仪器要求" }
    ],
    rules: [
      {
        id: "osmo_high", title: "渗透压偏高", category: "制剂指标", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "osmolality" },
        causes: ["辅料称量偏多", "缓冲盐浓度过高", "配制体积不足"],
        actions: ["复核处方称量", "检测缓冲液浓度", "校核定容"]
      },
      {
        id: "osmo_low", title: "渗透压偏低", category: "制剂指标", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "osmolality" },
        causes: ["辅料称量不足", "稀释过度", "原料含量偏低"],
        actions: ["复核称量", "检查配制体积", "检测原料含量"]
      },
      {
        id: "cv_high", title: "重复性超标", category: "方法性能", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "cv" },
        causes: ["样品不均匀", "探头残留", "气泡"],
        actions: ["充分混匀", "清洁探头", "去除气泡"]
      },
      {
        id: "calib_off", title: "校准偏差偏大", category: "方法性能", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "calibDev" },
        causes: ["标准液过期", "探头污染", "仪器需维护"],
        actions: ["更换标准液", "清洗探头", "联系维护"]
      },
      {
        id: "vol_low", title: "取样体积不足", category: "操作偏差", severity: "low", likelihood: 0.6,
        condition: { type: "low", metric: "sampleVol" },
        causes: ["样品量不足", "进样不完整"],
        actions: ["增加样品量", "确认进样体积"]
      }
    ]
  },
  ce_ief_charge_variants: {
    id: "ce_ief_charge_variants",
    name: "毛细管等电聚焦（cIEF）电荷异构体分析",
    category: "分析检测",
    description: "在毛细管内建立 pH 梯度，按等电点分离产品的电荷异构体，评价其电荷分布一致性。",
    objective: "评估毛细管等电聚焦（cIEF）电荷异构体分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "mainPeak", label: "主峰比例", unit: "%", type: 'number', normal: [60, 100], criticalLow: 50, note: "按产品标准" },
    { key: "acidic", label: "酸性峰比例", unit: "%", type: 'number', normal: [0, 25], criticalHigh: 35, note: "偏高提示脱酰胺" },
    { key: "basic", label: "碱性峰比例", unit: "%", type: 'number', normal: [0, 15], criticalHigh: 25, note: "偏高提示 C 端修饰" },
    { key: "pi", label: "主峰 pI", unit: "", type: 'number', normal: [6, 9], criticalLow: 5, criticalHigh: 10, note: "由 pI 标记换算" },
    { key: "piR2", label: "pI 线性 R²", unit: "", type: 'number', normal: [0.99, 1], criticalLow: 0.98, note: "pI 标记拟合" }
    ],
    rules: [
      {
        id: "main_low", title: "主峰比例偏低", category: "电荷异质性", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "mainPeak" },
        causes: ["脱酰胺或氧化增加", "发酵工艺波动", "储存降解"],
        actions: ["优化培养与纯化", "控制储存条件", "复测确认"]
      },
      {
        id: "acidic_high", title: "酸性峰升高", category: "电荷异质性", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "acidic" },
        causes: ["脱酰胺", "唾液酸修饰增加", "高温或碱性条件"],
        actions: ["降低工艺 pH 与温度", "优化培养条件", "复测"]
      },
      {
        id: "basic_high", title: "碱性峰升高", category: "电荷异质性", severity: "medium", likelihood: 0.8,
        condition: { type: "high", metric: "basic" },
        causes: ["C 端赖氨酸未切除", "N 端焦谷氨酸化不足", "氧化"],
        actions: ["优化表达时间", "调整纯化工艺", "复测"]
      },
      {
        id: "pi_out", title: "主峰 pI 偏离", category: "电荷异质性", severity: "medium", likelihood: 0.75,
        condition: { type: "outside", metric: "pi" },
        causes: ["翻译后修饰改变", "pI 标记失效", "聚焦不足"],
        actions: ["复测并检查标记物", "延长聚焦时间", "优化样品"]
      },
      {
        id: "pi_r2_low", title: "pI 标定线性差", category: "方法性能", severity: "medium", likelihood: 0.75,
        condition: { type: "low", metric: "piR2" },
        causes: ["pI 标记物降解", "聚焦不充分", "迁移不均匀"],
        actions: ["更换标记物", "延长聚焦", "检查迁移方式"]
      }
    ]
  },
  agarose_gel_electrophoresis: {
    id: "agarose_gel_electrophoresis",
    name: "琼脂糖凝胶电泳",
    category: "分子生物学",
    description: "在琼脂糖凝胶中按分子大小分离 DNA 片段，用于鉴定、半定量与回收前评估。",
    objective: "评估琼脂糖凝胶电泳的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "bandSize", label: "目标条带大小", unit: "kb", type: 'number', normal: [0, 12], note: "与 Marker 比对" },
    { key: "loadAmount", label: "上样量", unit: "ng", type: 'number', normal: [100, 500], criticalLow: 50, criticalHigh: 800, note: "每孔" },
    { key: "voltage", label: "电泳电压", unit: "V/cm", type: 'number', normal: [5, 8], criticalLow: 3, criticalHigh: 10, note: "按胶长换算" },
    { key: "bandQuality", label: "条带形态", unit: "", type: 'enum', options: ["清晰", "拖尾"], expected: "清晰", note: "目视判读" },
    { key: "marker", label: "Marker 上样", unit: "", type: 'enum', options: ["已加", "未加"], expected: "已加", note: "每板至少一孔" }
    ],
    rules: [
      {
        id: "band_smear", title: "条带拖尾或弥散", category: "电泳质量", severity: "medium", likelihood: 0.75,
        condition: { type: "enum", metric: "bandQuality", value: "拖尾" },
        causes: ["DNA 降解", "上样量过大", "电压过高发热"],
        actions: ["使用新鲜样品", "减少上样量", "降低电压"]
      },
      {
        id: "size_mismatch", title: "条带大小与预期不符", category: "结果异常", severity: "high", likelihood: 0.8,
        condition: { type: "high", metric: "bandSize" },
        causes: ["片段缺失或插入", "酶切不完全", "Marker 判读错误"],
        actions: ["复核序列与酶切位点", "延长酶切", "重新比对 Marker"]
      },
      {
        id: "load_high", title: "上样量过大", category: "操作偏差", severity: "medium", likelihood: 0.7,
        condition: { type: "high", metric: "loadAmount" },
        causes: ["浓度估算偏高", "未稀释"],
        actions: ["重新定量", "按 100-500 ng 上样"]
      },
      {
        id: "volt_high", title: "电压偏高", category: "电泳质量", severity: "medium", likelihood: 0.7,
        condition: { type: "high", metric: "voltage" },
        causes: ["缓冲液离子强度高", "电源设置错误"],
        actions: ["更换缓冲液", "按 5-8 V/cm 设置"]
      },
      {
        id: "marker_missing", title: "未加 Marker", category: "操作偏差", severity: "medium", likelihood: 0.7,
        condition: { type: "enum", metric: "marker", value: "未加" },
        causes: ["板图编排遗漏", "加样顺序错"],
        actions: ["每板固定留 Marker 孔", "复核板图"]
      }
    ]
  },
  crispr_gene_editing: {
    id: "crispr_gene_editing",
    name: "CRISPR/Cas9 基因编辑与验证",
    category: "分子生物学",
    description: "用 sgRNA 引导 Cas9 定点切割基因组，通过修复途径实现敲除或 knock-in，并验证编辑效果。",
    objective: "评估CRISPR/Cas9 基因编辑与验证的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "editEfficiency", label: "池水平编辑效率", unit: "%", type: 'number', normal: [20, 100], criticalLow: 5, note: "T7E1 或测序" },
    { key: "viability", label: "电转后 24 h 活率", unit: "%", type: 'number', normal: [70, 100], criticalLow: 50, note: "台盼蓝计数" },
    { key: "monoClones", label: "双等位验证克隆数", unit: "株", type: 'number', normal: [2, 20], criticalLow: 1, note: "至少 2 株" },
    { key: "offTarget", label: "脱靶检测", unit: "", type: 'enum', options: ["未检出", "检出"], expected: "未检出", note: "预测位点抽检" }
    ],
    rules: [
      {
        id: "eff_low", title: "编辑效率偏低", category: "编辑效果", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "editEfficiency" },
        causes: ["sgRNA 活性低", "递送效率不足", "细胞状态差"],
        actions: ["更换 sgRNA", "优化电转程序", "使用对数期细胞"]
      },
      {
        id: "viability_low", title: "电转后活率偏低", category: "细胞状态", severity: "high", likelihood: 0.8,
        condition: { type: "low", metric: "viability" },
        causes: ["RNP 用量过高", "电转参数过强", "培养基未预温"],
        actions: ["降低 RNP 用量", "调整电转程序", "预温培养基"]
      },
      {
        id: "clones_low", title: "双等位克隆数不足", category: "筛选效率", severity: "medium", likelihood: 0.75,
        condition: { type: "low", metric: "monoClones" },
        causes: ["编辑效率低", "单克隆生长差", "筛选周期不足"],
        actions: ["提高池效率后再铺板", "优化克隆培养基", "延长培养"]
      },
      {
        id: "offtarget_hit", title: "检出脱靶编辑", category: "安全性", severity: "critical", likelihood: 0.9,
        condition: { type: "enum", metric: "offTarget", value: "检出" },
        causes: ["sgRNA 特异性差", "Cas9 用量过高", "细胞修复异常"],
        actions: ["更换高特异性 sgRNA", "降低用量", "改用高保真 Cas9"]
      }
    ]
  },
  dsc_thermal_stability: {
    id: "dsc_thermal_stability",
    name: "差示扫描量热（DSC）热稳定性分析",
    category: "蛋白科学",
    description: "通过程序升温测量蛋白去折叠吸热峰，获得熔解温度 Tm，评价构象稳定性与配方适用性。",
    objective: "评估差示扫描量热（DSC）热稳定性分析的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "tm1", label: "第一熔解温度 Tm1", unit: "°C", type: 'number', normal: [55, 80], criticalLow: 50, criticalHigh: 85, note: "主峰峰顶" },
    { key: "tOnset", label: "起始熔解温度", unit: "°C", type: 'number', normal: [45, 70], criticalLow: 40, criticalHigh: 75, note: "基线偏离点" },
    { key: "concentration", label: "蛋白浓度", unit: "mg/mL", type: 'number', normal: [0.5, 1], criticalLow: 0.3, criticalHigh: 2, note: "上机前测定" },
    { key: "replicates", label: "重复次数", unit: "次", type: 'number', normal: [2, 5], criticalLow: 1, note: "同批重复" },
    { key: "peakCount", label: "热转变峰数", unit: "个", type: 'number', normal: [1, 3], note: "多峰提示结构域差异" }
    ],
    rules: [
      {
        id: "tm_low", title: "Tm 偏低", category: "构象稳定性", severity: "high", likelihood: 0.85,
        condition: { type: "low", metric: "tm1" },
        causes: ["缓冲体系不适", "辅料保护不足", "样品部分降解"],
        actions: ["优化缓冲体系与辅料", "检测降解", "更换批次"]
      },
      {
        id: "tm_high", title: "Tm 偏高", category: "构象稳定性", severity: "low", likelihood: 0.6,
        condition: { type: "high", metric: "tm1" },
        causes: ["缓冲盐稳定化", "样品浓度偏高", "拟合偏差"],
        actions: ["确认缓冲体系", "复核浓度", "检查拟合"]
      },
      {
        id: "conc_low", title: "蛋白浓度不足", category: "样品质量", severity: "medium", likelihood: 0.7,
        condition: { type: "low", metric: "concentration" },
        causes: ["换液稀释", "定量偏差", "样品损失"],
        actions: ["超滤浓缩", "重新定量", "减少换液损失"]
      },
      {
        id: "onset_low", title: "起始熔解温度偏低", category: "构象稳定性", severity: "medium", likelihood: 0.75,
        condition: { type: "low", metric: "tOnset" },
        causes: ["局部结构不稳定", "聚集起始", "缓冲 pH 偏离"],
        actions: ["优化 pH 与离子强度", "加入稳定剂", "复测"]
      },
      {
        id: "reps_low", title: "重复次数不足", category: "数据可靠性", severity: "low", likelihood: 0.6,
        condition: { type: "low", metric: "replicates" },
        causes: ["样品量不足", "时间紧张"],
        actions: ["补做重复", "合并同批数据"]
      }
    ]
  },
  spr_binding_affinity: {
    id: "spr_binding_affinity",
    name: "SPR 表面等离子共振亲和力测定",
    category: "蛋白科学",
    description: "实时监测分子结合与解离过程，测定结合常数 ka、解离常数 kd 与平衡解离常数 KD。",
    objective: "评估SPR 表面等离子共振亲和力测定的关键指标与方法有效性，识别异常并给出排查方向。",
    metrics: [
    { key: "kdValue", label: "平衡解离常数 KD", unit: "nM", type: 'number', normal: [0.01, 50], criticalHigh: 200, note: "数值越小亲和力越强" },
    { key: "ka", label: "结合速率常数 ka", unit: "1/Ms", type: 'number', normal: [10000, 10000000], note: "1:1 拟合" },
    { key: "kd", label: "解离速率常数 kd", unit: "1/s", type: 'number', normal: [0.000001, 0.01], note: "1:1 拟合" },
    { key: "chi2", label: "拟合 χ²", unit: "%Rmax", type: 'number', normal: [0, 10], criticalHigh: 15, note: "残差评估" },
    { key: "rmax", label: "最大响应 Rmax", unit: "RU", type: 'number', normal: [30, 150], criticalLow: 10, note: "与偶联水平相关" }
    ],
    rules: [
      {
        id: "affinity_low", title: "亲和力下降", category: "结合活性", severity: "high", likelihood: 0.85,
        condition: { type: "high", metric: "kdValue" },
        causes: ["关键残基修饰", "聚集导致表位遮蔽", "配体失活"],
        actions: ["检测修饰与聚体", "优化缓冲体系", "更换芯片"]
      },
      {
        id: "chi2_high", title: "拟合质量差", category: "方法性能", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "chi2" },
        causes: ["质量转移限制", "非 1:1 结合", "再生不充分"],
        actions: ["提高流速降低偶联量", "改用二态模型", "优化再生"]
      },
      {
        id: "ka_low", title: "结合速率偏低", category: "结合活性", severity: "medium", likelihood: 0.7,
        condition: { type: "low", metric: "ka" },
        causes: ["分析物浓度偏低", "活性位点不足", "缓冲黏度高"],
        actions: ["复核浓度", "提高配体活性", "更换缓冲液"]
      },
      {
        id: "kd_high", title: "解离过快", category: "结合活性", severity: "medium", likelihood: 0.75,
        condition: { type: "high", metric: "kd" },
        causes: ["结合构象不稳定", "盐浓度过高", "温度偏高"],
        actions: ["优化缓冲盐与 pH", "控制温度", "复测"]
      },
      {
        id: "rmax_low", title: "响应信号偏低", category: "方法性能", severity: "low", likelihood: 0.65,
        condition: { type: "low", metric: "rmax" },
        causes: ["偶联水平不足", "分析物分子量小", "浓度偏低"],
        actions: ["提高偶联水平", "提高浓度", "更换捕获方式"]
      }
    ]
  }
  },
  OPTIONAL_EXTRA: {
  cell_suspension_batch_culture: ["glucose", "temperature"],
  cell_transfection_pei: ["expressionTiter", "dnaA260A280"],
  cell_cloning_limiting_dilution: ["contamination"],
  cell_bank_establishment: ["passageLimit"],
  cell_counting_viability: ["countCv", "cellCount"],
  cell_metabolite_analysis: ["wellCv"],
  shake_flask_seed_expansion: ["ph", "fillRatio"],
  e_coli_fermentation: ["acetate"],
  pichia_fermentation: ["methanol"],
  strain_preservation: ["od600"],
  phage_titer_assay: ["replicateCv"],
  fermentation_parameter_monitoring: ["sampleInterval", "temperature"],
  cation_exchange_chrom: ["dynamicCapacity"],
  anion_exchange_chrom: ["dynamicCapacity"],
  hydrophobic_interaction_chrom: ["dynamicCapacity"],
  protein_g_affinity: ["bindingPh", "eluatePh"],
  immunoaffinity_chrom: ["couplingRate", "ligandDensity"],
  column_packing_efficiency: ["bedHeight"],
  ammonium_sulfate_precipitation: ["residualSalt"],
  alcohol_precipitation: ["residualEthanol"],
  protein_crystallization: ["pegConc"],
  protein_refolding: ["refoldTime"],
  virus_inactivation_low_ph: ["temp"],
  bca_protein_assay: ["recovery", "blankOd"],
  bradford_assay: ["blankOd", "reactionTime"],
  a280_quantification: ["pathlength", "blankAbs"],
  hplc_reversed_phase: ["theoreticalPlates", "tailingFactor"],
  lc_ms_sample_prep: ["peptideRecovery", "samplePh"],
  maldi_tof_identification: ["peakCount", "matchedPeptides"],
  amino_acid_analysis: ["detectionLimit", "proteinContent"],
  glycosylation_hplc: ["labelingEfficiency", "mainPeakPurity"],
  peptide_mapping: ["peakCount", "peakAreaRsd"],
  isoelectric_focusing: ["bandCount", "piRsd"],
  capillary_zone_electrophoresis: ["plateNumber", "peakAreaRsd"],
  genomic_dna_extraction: ["dnaYield", "rnaResidual"],
  rna_extraction_trizol: ["dnaContam", "rnaYield"],
  reverse_transcription: ["rtA260", "rtRepCv", "minusRt"],
  pcr_amplification: ["pcrYield", "pcrRepro"],
  rt_qpcr_expression: ["exprR2", "exprRepCv"],
  restriction_digest: ["digestDnaAmount", "digestStar"],
  dna_ligation_cloning: ["ligationAtp", "ligationBackground"],
  colony_pcr_screening: ["colonyConfirmRate", "colonyBandSize"],
  indirect_elisa: ["elisaBlankOd", "elisaRepCv"],
  competitive_elisa: ["compRecovery", "compRepCv"],
  sterility_direct_inoculation: ["mediumPh", "incubationDays"],
  control_bacteria_test: ["selectiveTemp"],
  bioburden_test: ["sampleVolume", "recoveryRate"],
  disinfectant_efficacy_test: ["testTemp"],
  visible_particles_inspection: ["observerDistance"],
  insoluble_particle_test: ["flowRate"],
  media_preparation: ["appearance"],
  fed_batch_culture: ["ammonia", "osmolality"],
  harvest_clarification: ["load", "pressure"],
  viral_filtration: ["pressure", "aggregate"],
  desalting_gel_filtration: ["conductivity", "dilution"],
  water_system_monitoring: ["endotoxin", "waterTemp"],
  growth_promotion_test: ["inoculum"],
  residual_dna_qpcr: ["efficiency", "recovery"],
  residual_protein_a: ["blank", "cv"],
  cell_based_potency: ["slopeRatio", "cellViability"],
  osmolality_determination: ["sampleVol"],
  ce_ief_charge_variants: ["piR2", "pi"],
  agarose_gel_electrophoresis: ["bandSize", "voltage"],
  crispr_gene_editing: ["monoClones", "offTarget"],
  dsc_thermal_stability: ["peakCount", "replicates"],
  spr_binding_affinity: ["ka", "kd", "rmax"]
  }
};

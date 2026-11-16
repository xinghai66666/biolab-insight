'use strict';

module.exports = {
  id: 'protein_a_chrom',
  name: 'Protein A 亲和层析（抗体捕获）',
  category: '下游工艺 · 层析纯化',
  short: 'Protein A 树脂捕获抗体，低 pH 洗脱后立即中和，是抗体下游第一步',
  overview: {
    principle: 'Protein A 与 IgG Fc 区选择性结合；上样后以中性缓冲液洗涤去除宿主蛋白，再用低 pH 甘氨酸缓冲液解离抗体，收集后立即中和以避免聚集。',
    application: '单克隆抗体、Fc 融合蛋白等含 Fc 结构域产品的捕获步骤，常为下游第一步。',
    input: '澄清后的收获液（细胞培养上清或腹水），需 0.22 µm 过滤',
    output: '含抗体的洗脱液，经中和后进入病毒灭活或精纯步骤',
    duration: '约 3–6 h（含平衡、上样、洗脱与 CIP）',
    yield: '步骤回收率通常 85–95%，载量按树脂与接触时间确定'
  },
  keySpecs: [
    { label: '动态载量', value: '20–60 g/L 树脂', note: '按停留时间与料液性质实测，不取说明书最大值' },
    { label: '洗脱 pH', value: '3.4–3.8', note: '按分子稳定性确定，收集后立即中和至 pH 5.0–7.0' },
    { label: '洗涤缓冲液', value: 'pH 7.0–7.4，含 0.5–1 M NaCl', note: '提高盐浓度可降低非特异结合' },
    { label: '线性流速', value: '100–300 cm/h', note: '按柱高换算，保证足够接触时间' },
    { label: '步骤回收率', value: '≥85%', note: '按合并组分中目标蛋白总量计算' },
    { label: 'HCP 清除', value: '≥2 log', note: '与洗涤条件和收峰范围直接相关' }
  ],
  steps: [
    {
      no: 1,
      phase: '预处理',
      title: '收获液澄清与条件调整',
      purpose: '去除细胞碎片与颗粒，使料液条件与上样要求一致，避免柱堵塞。',
      summary: '收获液经离心或深层过滤后再过 0.22 µm 滤膜，检测并调整 pH 与电导。',
      detail: '收获液先经离心或深层过滤去除细胞与碎片，再用 0.22 µm 滤膜过滤；检测 pH、电导与目标蛋白浓度，必要时用 1 M Tris 或 NaCl 调整至与平衡缓冲液一致。',
      substeps: [
        '收获液离心或深层过滤，去除细胞与碎片。',
        '0.22 µm 过滤，记录过滤体积与压差变化。',
        '检测料液 pH、电导与抗体浓度（Protein A 或 A280）。',
        '必要时调整 pH 至 7.0–7.4、电导至与平衡缓冲液匹配。',
        '留样用于后续物料平衡计算。'
      ],
      params: [
        { label: '过滤精度', value: '0.22 µm' },
        { label: '料液 pH', value: '7.0–7.4' },
        { label: '料液温度', value: '2–8 °C 或按工艺' }
      ],
      checkpoints: [
        '滤后料液澄清，无明显颗粒。',
        'pH 与电导与平衡缓冲液一致（偏差在工艺范围内）。',
        '料液留样已标记并记录体积。'
      ],
      pitfalls: [
        { level: 'high', title: '料液未充分澄清', consequence: '柱压升高、筛板堵塞、载量下降', fix: '逐级过滤（深层滤板 + 0.22 µm），必要时二次离心' },
        { level: 'medium', title: '料液 pH/电导未调整', consequence: '结合效率下降，抗体随穿透液流失', fix: '按平衡缓冲液条件调整并复核' }
      ]
    },
    {
      no: 2,
      phase: '平衡',
      title: '柱平衡与系统检查',
      purpose: '使树脂处于一致结合环境，确认柱效与系统无泄漏。',
      summary: '用 5–10 倍柱体积平衡缓冲液平衡，检查柱压、流速与基线。',
      detail: '按柱规格设定流速，用 5–10 倍柱体积的平衡缓冲液平衡至 A280 与 pH 稳定；检查柱压是否在限值内，接头有无渗漏，必要时做柱效测试。',
      substeps: [
        '确认柱型号、柱床高度与上次使用记录。',
        '用 5–10 倍柱体积平衡缓冲液平衡。',
        '监测 A280 与 pH，待基线稳定。',
        '记录柱压与流速，确认无泄漏或气泡。'
      ],
      params: [
        { label: '平衡体积', value: '5–10 倍柱体积' },
        { label: '平衡缓冲液', value: '20 mM 磷酸盐 + 150 mM NaCl，pH 7.2' },
        { label: '流速', value: '按柱规格，100–300 cm/h' }
      ],
      checkpoints: [
        'A280 基线平稳，pH 与缓冲液一致。',
        '柱压处于正常范围且稳定。'
      ],
      pitfalls: [
        { level: 'medium', title: '柱床进入气泡', consequence: '沟流、结合不均、峰形异常', fix: '排气并重新装柱，避免缓冲液流干' },
        { level: 'low', title: '平衡不充分', consequence: '上样初期 pH 波动，结合效率下降', fix: '按 5–10 倍柱体积平衡并确认流出液 pH' }
      ]
    },
    {
      no: 3,
      phase: '结合',
      title: '上样与穿透液收集',
      purpose: '让抗体充分结合树脂，同时收集穿透液评估载量是否合适。',
      summary: '按设定载量上样，控制流速保证接触时间，全程收集穿透液。',
      detail: '按动态载量的 70–80% 设定上样量，保持稳定流速；上样过程中监测 A280，穿透液出现明显上升提示载量接近饱和，应停止上样并留样。',
      substeps: [
        '按载量与料液浓度计算上样体积。',
        '以设定流速上样，避免气泡进入柱。',
        '全程收集穿透液并记录体积。',
        '监测穿透液 A280，明显上升时停止上样。',
        '上样后用平衡缓冲液冲洗管路残留。'
      ],
      params: [
        { label: '上样载量', value: '动态载量的 70–80%' },
        { label: '上样流速', value: '保证 2–6 min 停留时间' },
        { label: '上样温度', value: '2–8 °C 或室温，按工艺' }
      ],
      checkpoints: [
        '上样过程柱压平稳，无堵塞。',
        '穿透液已全部收集并留样。',
        '实际载量已记录（g/L 树脂）。'
      ],
      pitfalls: [
        { level: 'high', title: '上样载量超过动态载量', consequence: '抗体随穿透液流失，回收率下降', fix: '按穿透曲线确定载量，控制在动态载量 80% 以内' },
        { level: 'high', title: '上样流速过快', consequence: '接触时间不足，结合不完全', fix: '降低流速或改用更矮的柱，保证停留时间' }
      ]
    },
    {
      no: 4,
      phase: '洗涤',
      title: '洗涤去除非特异结合杂质',
      purpose: '去除宿主细胞蛋白、DNA 与培养基残留，提高洗脱液纯度。',
      summary: '用含盐中性洗涤缓冲液洗涤 5–10 倍柱体积，至 A280 回落并稳定。',
      detail: '以平衡缓冲液或含 0.5–1 M NaCl 的洗涤缓冲液洗涤，必要时加入少量去垢剂；洗涤至 A280 接近基线后再进入洗脱，洗涤组分留样用于 HCP 分析。',
      substeps: [
        '用 5–10 倍柱体积洗涤缓冲液洗涤。',
        '监测 A280，待其回落并稳定。',
        '收集洗涤组分并记录体积。',
        '洗涤组分留样，用于 HCP/DNA 检测。'
      ],
      params: [
        { label: '洗涤体积', value: '5–10 倍柱体积' },
        { label: '洗涤缓冲液', value: 'pH 7.0–7.4，含 0.5–1 M NaCl' },
        { label: '洗涤终点', value: 'A280 回落至基线附近' }
      ],
      checkpoints: [
        'A280 明显回落并稳定。',
        '洗涤组分留样完整。'
      ],
      pitfalls: [
        { level: 'high', title: '洗涤不充分', consequence: 'HCP 与 DNA 残留高，洗脱液纯度不足', fix: '增加洗涤体积或提高盐浓度，必要时加入低浓度去垢剂' },
        { level: 'medium', title: '洗涤缓冲液 pH 偏高', consequence: '非特异结合增加，杂质去除变差', fix: '按验证 pH 配制并复核' }
      ]
    },
    {
      no: 5,
      phase: '洗脱',
      title: '低 pH 洗脱与在线中和',
      purpose: '解离抗体-蛋白 A 结合，并以最快速度中和避免低 pH 聚集。',
      summary: '用 pH 3.4–3.8 甘氨酸缓冲液洗脱，按峰收集并立即用 Tris 中和。',
      detail: '以低 pH 洗脱缓冲液洗脱，监测 A280 收集主峰；收集瓶预先加入中和缓冲液（1 M Tris，pH 9.0），按体积比例在线中和至 pH 5.0–7.0，全程控制收集液停留时间。',
      substeps: [
        '收集瓶预置中和缓冲液，记录加入量。',
        '用 pH 3.4–3.8 洗脱缓冲液洗脱。',
        '按 A280 峰起止收集，避免收集尾部。',
        '边收集边轻柔混匀，检测收集液 pH。',
        '记录洗脱峰体积与外观。'
      ],
      params: [
        { label: '洗脱缓冲液', value: '0.1 M 甘氨酸，pH 3.4–3.8' },
        { label: '中和缓冲液', value: '1 M Tris，pH 9.0' },
        { label: '中和后 pH', value: '5.0–7.0' }
      ],
      checkpoints: [
        '洗脱峰形对称，无异常拖尾。',
        '中和后 pH 在设定范围。',
        '收集液无明显浑浊或沉淀。'
      ],
      pitfalls: [
        { level: 'critical', title: '洗脱后未及时中和', consequence: '抗体在低 pH 下聚集、片段化，聚集体升高', fix: '预置中和液并控制收集液停留时间，收集后立即检测 pH' },
        { level: 'high', title: '洗脱 pH 偏高', consequence: '洗脱不完全，回收率下降', fix: '复核洗脱液 pH，必要时阶梯洗脱' },
        { level: 'high', title: '洗脱 pH 过低', consequence: '产品变性失活与聚集风险', fix: '按分子稳定性确定最低 pH，缩短暴露时间' }
      ]
    },
    {
      no: 6,
      phase: '收集',
      title: '组分合并与留样',
      purpose: '按纯度与收率平衡确定合并范围，保证批间一致性。',
      summary: '按 A280 峰与 SEC/HCP 快检结果确定合并起点与终点，称量记录体积。',
      detail: '主峰按 A280 10% 起止或按验证的收集体积合并；如条件允许，对峰前、峰后组分做 SEC 或 HCP 快检，避免把聚集体或杂质较多的尾部并入。',
      substeps: [
        '按 A280 曲线划分峰前、主峰、峰后组分。',
        '对关键组分做 SEC 或 HCP 快检（按需）。',
        '确定合并范围并记录合并体积。',
        '留取合并样与各组分样。'
      ],
      params: [
        { label: '收集起点', value: 'A280 上升至峰高 10%' },
        { label: '收集终点', value: 'A280 下降至峰高 10–20%' },
        { label: '合并依据', value: '纯度、收率与批间一致性' }
      ],
      checkpoints: [
        '合并体积与浓度记录完整。',
        '各组分留样可追溯。'
      ],
      pitfalls: [
        { level: 'medium', title: '盲目扩大收集范围', consequence: '收率略升但聚集体与 HCP 升高', fix: '按验证的合并标准收峰，必要时做组分快检' },
        { level: 'low', title: '合并记录不完整', consequence: '物料平衡无法核算', fix: '记录各组分体积与浓度' }
      ]
    },
    {
      no: 7,
      phase: '清洗',
      title: 'CIP 与柱保存',
      purpose: '去除残留蛋白与杂质，维持树脂载量与寿命。',
      summary: '按验证方法用 NaOH 或酸性清洗液 CIP，再平衡保存于含防腐剂缓冲液。',
      detail: '按树脂说明执行 CIP（如 0.1–0.5 M NaOH 接触 30–60 min），检测清洗后水通量与柱效；短期保存于 20% 乙醇或含防腐剂缓冲液，记录循环次数。',
      substeps: [
        '用注射用水冲洗至 A280 基线。',
        '按验证条件执行 CIP（NaOH 或酸/盐组合）。',
        '冲洗至中性，检测清洗流出液 A280。',
        '保存于 20% 乙醇或含防腐剂缓冲液。',
        '记录循环使用次数与柱效数据。'
      ],
      params: [
        { label: 'CIP 试剂', value: '0.1–0.5 M NaOH' },
        { label: '接触时间', value: '30–60 min' },
        { label: '保存条件', value: '20% 乙醇，2–8 °C' }
      ],
      checkpoints: [
        '清洗流出液 A280 接近基线。',
        '柱效与水通量在可接受范围。'
      ],
      pitfalls: [
        { level: 'high', title: 'CIP 不彻底', consequence: '残留蛋白累积、载量下降、微生物滋生', fix: '按验证条件执行并检测清洗效果' },
        { level: 'medium', title: 'NaOH 浓度或时间不足', consequence: '清洗不彻底，柱寿命缩短', fix: '按树脂耐受限值设定并记录' }
      ]
    },
    {
      no: 8,
      phase: '检测',
      title: '纯度、浓度与杂质检测',
      purpose: '确认洗脱液质量满足后续步骤要求。',
      summary: '检测 A280 浓度、SEC 纯度、HCP 与残留 Protein A，计算步骤回收率。',
      detail: 'A280 或 Protein A 法测浓度，SEC-HPLC 测单体纯度与聚集体，ELISA 测 HCP 与残留 Protein A；结合上样量与洗脱总量计算步骤回收率与 HCP 清除对数值。',
      substeps: [
        'A280 或 Protein A 法测定浓度。',
        'SEC-HPLC 检测纯度、聚集体与片段。',
        'ELISA 检测 HCP 与残留 Protein A。',
        '计算步骤回收率与 HCP 清除 log 值。',
        '记录结果并与历史批次比较。'
      ],
      params: [
        { label: '浓度检测', value: 'A280（消光系数法）' },
        { label: '纯度检测', value: 'SEC-HPLC' },
        { label: '杂质检测', value: 'HCP ELISA、残留 Protein A ELISA' }
      ],
      checkpoints: [
        '纯度与杂质水平符合后续步骤要求。',
        '回收率在设定范围内。',
        '数据已与批记录关联。'
      ],
      pitfalls: [
        { level: 'high', title: '仅凭 A280 判断纯度', consequence: '杂质与聚集体被低估', fix: '结合 SEC 与 ELISA 数据综合判断' },
        { level: 'medium', title: '未计算物料平衡', consequence: '收率异常无法定位', fix: '记录上样、穿透、洗涤、洗脱各环节总量' }
      ]
    }
  ],
  references: [
    'Protein A 亲和层析树脂通用说明书',
    '抗体下游工艺捕获步骤通用 SOP',
    'SEC-HPLC 与 HCP ELISA 检测方法通则'
  ]
};

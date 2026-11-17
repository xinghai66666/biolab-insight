'use strict';

module.exports = {
  id: 'qpcr_sybr_green',
  name: 'SYBR Green 实时荧光定量 PCR',
  category: '分子生物学 · qPCR',
  short: 'RNA 反转录为 cDNA，SYBR Green 扩增并分析 Ct 与熔解曲线',
  overview: {
    objective: '定量检测目标核酸含量，并验证扩增体系的有效性与无污染。',
    principle: 'SYBR Green 结合双链 DNA 后发出荧光，PCR 每轮扩增使荧光信号增加；通过 Ct 值和标准曲线/ΔΔCt 法比较模板起始量，熔解曲线用于判断扩增特异性。',
    application: '基因表达定量、敲低/过表达验证、病原检测和转录水平比较。',
    input: '高质量 RNA 或 cDNA 样品',
    output: 'Ct 值、熔解曲线、相对表达量或绝对定量结果',
    duration: '约 3–4 h（不含 RNA 提取）',
    yield: '定性/相对定量，检测范围取决于标准曲线'
  },
  keySpecs: [
    { label: 'RNA 纯度', value: 'A260/A280 1.8–2.1', note: 'A260/A230 ≥2.0' },
    { label: '扩增效率', value: '90–110%', note: '标准曲线斜率 -3.1 至 -3.6' },
    { label: '标准曲线 R²', value: '≥0.99', note: '至少 5 个稀释点' },
    { label: '熔解曲线', value: '单一峰', note: '无引物二聚体或非特异峰' }
  ],
  steps: [
    {
      no: 1,
      phase: 'RNA',
      title: 'RNA 提取与质量评估',
      purpose: '获得完整、无基因组 DNA 污染的 RNA，保证反转录和定量准确。',
      summary: '提取总 RNA，检测浓度、A260/A280、A260/A230 和完整性，必要时 DNase I 处理。',
      detail: '按试剂盒提取总 RNA，NanoDrop 检测浓度和纯度，琼脂糖凝胶或片段分析评估完整性；对 gDNA 敏感的目标，进行 DNase I 消化并纯化。',
      substeps: [
        '按 RNA 提取试剂盒操作，全程避免 RNase 污染。',
        'NanoDrop 检测浓度、A260/A280 和 A260/A230。',
        '琼脂糖凝胶或片段分析评估 RNA 完整性。',
        '必要时 DNase I 消化，随后纯化并重新定量。'
      ],
      params: [
        { label: 'A260/A280', value: '1.8–2.1' },
        { label: 'A260/A230', value: '≥2.0' },
        { label: 'DNase I', value: '按需处理' }
      ],
      checkpoints: [
        'RNA 纯度达标，无明显降解。',
        '浓度足够完成反转录和复孔。'
      ],
      pitfalls: [
        { level: 'critical', title: 'RNA 降解或 gDNA 残留', consequence: 'Ct 偏移、假阳性或定量不准', fix: '规范 RNase-free 操作，必要时 DNase I 消化并做无 RT 对照' },
        { level: 'medium', title: 'RNA 纯度不足', consequence: '反转录效率低，抑制 qPCR', fix: '重新纯化或乙醇沉淀，确保 A260/A230 ≥2.0' }
      ]
    },
    {
      no: 2,
      phase: '反转录',
      title: 'cDNA 合成',
      purpose: '将 RNA 转为稳定的 cDNA，便于 qPCR 扩增。',
      summary: '按反转录试剂盒将等量 RNA 转为 cDNA，设置无逆转录酶对照。',
      detail: '按试剂盒说明，取等量 RNA 加入反转录酶、引物和 dNTP，按程序合成 cDNA；同时设置无逆转录酶对照（-RT），用于判断 gDNA 污染。',
      substeps: [
        '按试剂盒说明配制反转录反应体系。',
        '取等量 RNA 加入反应，避免 RNA 量差异。',
        '按程序完成反转录，产物稀释后用于 qPCR。',
        '设置 -RT 对照，与样品同步进行 qPCR。'
      ],
      params: [
        { label: 'RNA 量', value: '按试剂盒，常见 0.5–2 µg' },
        { label: '引物', value: 'Oligo dT / Random primers' },
        { label: '对照', value: '无逆转录酶对照' }
      ],
      checkpoints: [
        'cDNA 浓度/体积一致。',
        '-RT 对照已设置。'
      ],
      pitfalls: [
        { level: 'high', title: 'RNA 量不一致', consequence: 'Ct 差异被误判为表达变化', fix: '反转录前统一 RNA 投入量' },
        { level: 'medium', title: '反转录酶失活', consequence: 'cDNA 产量低，Ct 偏大', fix: '按说明书保存酶，避免反复冻融' }
      ]
    },
    {
      no: 3,
      phase: '引物',
      title: '引物设计与验证',
      purpose: '保证引物特异性、扩增效率和熔解曲线单一。',
      summary: '设计跨外显子引物，扩增片段 70–200 bp，先做标准曲线和熔解曲线验证。',
      detail: '使用引物设计软件选择特异性引物，尽量跨外显子边界；扩增片段 70–200 bp，Tm 接近；首次使用做梯度稀释标准曲线和熔解曲线。',
      substeps: [
        '检索目标基因序列，设计特异性引物。',
        '优先跨外显子边界，减少 gDNA 扩增。',
        '扩增片段控制在 70–200 bp，Tm 接近。',
        '用梯度稀释 cDNA 验证扩增效率和熔解曲线。'
      ],
      params: [
        { label: '扩增片段', value: '70–200 bp' },
        { label: '引物浓度', value: '0.2–0.5 µM' },
        { label: '验证', value: '标准曲线 + 熔解曲线' }
      ],
      checkpoints: [
        '熔解曲线单一峰。',
        '扩增效率 90–110%，R² ≥0.99。'
      ],
      pitfalls: [
        { level: 'high', title: '引物非特异或形成二聚体', consequence: '熔解曲线多峰，Ct 不可靠', fix: '重新设计引物，优化退火温度和引物浓度' },
        { level: 'medium', title: '引物跨外显子设计不当', consequence: 'gDNA 扩增导致假阳性', fix: '跨外显子边界设计，并做 -RT 对照' }
      ]
    },
    {
      no: 4,
      phase: '反应',
      title: 'qPCR 反应体系配制',
      purpose: '保证各孔反应条件一致，减少加样误差。',
      summary: '冰上配制 SYBR Green Master Mix、引物和 cDNA，复孔分装，避免气泡。',
      detail: '在冰上配制 Master Mix，按孔数计算过量 10%；分装后加入 cDNA，每样品至少 2–3 个复孔；使用无核酸酶水和无菌 96 孔板。',
      substeps: [
        '冰上解冻 Master Mix、引物和 cDNA，短暂离心。',
        '按孔数配制 Master Mix，包含 SYBR Green、引物和无核酸酶水。',
        '分装到 96 孔板，加入 cDNA，设置复孔。',
        '封板膜封好，短暂离心去除气泡。'
      ],
      params: [
        { label: '反应体积', value: '10–25 µL' },
        { label: '复孔', value: '2–3 孔' },
        { label: 'Master Mix', value: 'SYBR Green' }
      ],
      checkpoints: [
        '各孔体积一致，无气泡。',
        '复孔 Ct 差异小。'
      ],
      pitfalls: [
        { level: 'medium', title: '加样误差或气泡', consequence: '复孔差异大，Ct 不可靠', fix: '使用同一 Master Mix，封板后短暂离心' },
        { level: 'high', title: '核酸污染', consequence: '阴性对照扩增，假阳性', fix: '分区操作、更换枪头，设置 NTC' }
      ]
    },
    {
      no: 5,
      phase: '扩增',
      title: '上机扩增与熔解曲线',
      purpose: '完成扩增并采集荧光，获得 Ct 和熔解曲线。',
      summary: '按程序进行 95 °C 预变性、40 个循环扩增，随后做熔解曲线。',
      detail: '按试剂盒和引物设置程序：95 °C 预变性，95 °C 变性 5–10 s，60 °C 退火/延伸 30 s，40 个循环；最后做 65–95 °C 熔解曲线。',
      substeps: [
        '将 96 孔板放入 qPCR 仪，确认孔位和程序。',
        '设置预变性、循环扩增和熔解曲线程序。',
        '运行结束后检查扩增曲线和熔解曲线。',
        '保存原始数据，记录仪器和程序。'
      ],
      params: [
        { label: '预变性', value: '95 °C，30 s–2 min' },
        { label: '循环', value: '40 次' },
        { label: '退火/延伸', value: '60 °C，30 s' }
      ],
      checkpoints: [
        '扩增曲线呈典型 S 形。',
        '熔解曲线单一峰。'
      ],
      pitfalls: [
        { level: 'medium', title: '程序或孔位设置错误', consequence: '数据错位或扩增失败', fix: '上机前核对孔位、程序和使用者信息' },
        { level: 'low', title: '熔解曲线采集异常', consequence: '无法判断特异性', fix: '确认熔解曲线程序完整，必要时重跑' }
      ]
    },
    {
      no: 6,
      phase: '对照',
      title: '对照设置与质控',
      purpose: '排除污染、gDNA 和逆转录差异，保证结果可信。',
      summary: '设置 NTC、-RT、阳性对照和内参，确认对照符合预期。',
      detail: '每块板设置无模板对照（NTC）、无逆转录酶对照（-RT）、阳性对照和内参；NTC 应无扩增，-RT 应显著晚于或低于样品。',
      substeps: [
        '设置 NTC（无核酸酶水代替模板）。',
        '设置 -RT 对照，判断 gDNA 残留。',
        '设置阳性对照和内参基因。',
        '分析前先检查所有对照是否符合预期。'
      ],
      params: [
        { label: 'NTC', value: '无模板水' },
        { label: '-RT', value: '无逆转录酶' },
        { label: '内参', value: 'GAPDH / ACTB 等' }
      ],
      checkpoints: [
        'NTC 无扩增或 Ct >35。',
        '-RT 明显晚于样品。'
      ],
      pitfalls: [
        { level: 'critical', title: 'NTC 扩增', consequence: '试剂或环境污染，结果假阳性', fix: '更换试剂、清洁工作区，重新检测' },
        { level: 'high', title: '-RT 与样品 Ct 接近', consequence: 'gDNA 残留，表达量被高估', fix: 'DNase I 处理 RNA，重新反转录' }
      ]
    },
    {
      no: 7,
      phase: '分析',
      title: 'Ct 与相对表达量分析',
      purpose: '用适当方法计算表达差异，并判断数据是否可靠。',
      summary: '检查扩增效率、熔解曲线和复孔一致性，用 ΔΔCt 或标准曲线法计算。',
      detail: '确认扩增效率 90–110%、R² ≥0.99、熔解曲线单峰；复孔 Ct 差异通常应 <0.5；用 ΔΔCt 法计算相对表达量，或标准曲线法绝对定量。',
      substeps: [
        '检查扩增曲线、熔解曲线和复孔 Ct 一致性。',
        '确认内参在各样品中稳定表达。',
        '用 ΔΔCt 法计算相对表达量，或标准曲线法定量。',
        '标记异常孔并记录剔除理由。'
      ],
      params: [
        { label: '复孔 Ct 差异', value: '通常 <0.5' },
        { label: '扩增效率', value: '90–110%' },
        { label: '分析方法', value: 'ΔΔCt / 标准曲线' }
      ],
      checkpoints: [
        '复孔一致性良好，内参稳定。',
        '结果与生物学重复趋势一致。'
      ],
      pitfalls: [
        { level: 'high', title: '内参不稳定', consequence: '归一化错误，表达差异失真', fix: '验证多个内参，选择稳定内参' },
        { level: 'medium', title: '异常孔未处理', consequence: 'Ct 均值偏移，结论错误', fix: '按预设规则剔除异常孔并记录' }
      ],
      interpretation: {
        title: 'qPCR 数据解读',
        intro: '先看对照和熔解曲线，再看扩增效率与复孔一致性，最后解释 Ct/ΔΔCt 的生物学意义。',
        order: ['NTC / -RT', '熔解曲线', '扩增效率', '复孔一致性', 'ΔΔCt'],
        rows: [
          { metric: 'NTC', range: '无扩增或 Ct >35', status: 'ok', meaning: '试剂和环境污染低', action: '可继续分析；若 NTC 扩增则整批结果不可信' },
          { metric: '-RT', range: 'Ct 明显晚于样品', status: 'ok', meaning: 'gDNA 残留低', action: '可继续分析；若接近样品则需 DNase I 处理' },
          { metric: '熔解曲线', range: '单一峰', status: 'ok', meaning: '扩增产物特异', action: '可继续分析；多峰提示引物二聚体或非特异扩增' },
          { metric: '扩增效率', range: '90–110%', status: 'ok', meaning: '标准曲线斜率合适', action: '可用 ΔΔCt；超出范围需优化引物或稀释模板' },
          { metric: '复孔 Ct 差异', range: '<0.5', status: 'ok', meaning: '加样一致性好', action: '可取均值；差异大时检查气泡、加样和孔位' },
          { metric: '目标基因 Ct', range: '比内参晚 5–15 个循环', status: 'info', meaning: '表达量中等，需结合内参解释', action: '用 ΔΔCt 比较，避免直接比较原始 Ct' }
        ],
        note: 'Ct 是达到荧光阈值所需的循环数，受模板量、扩增效率和阈值设置影响；ΔΔCt 结果是相对表达倍数，不是绝对分子数。'
      }
    },
    {
      no: 8,
      phase: '记录',
      title: '结果记录与 MIQE 信息',
      purpose: '保证实验可追溯，满足 MIQE 基本要求。',
      summary: '记录 RNA 质量、反转录、引物序列、扩增效率、对照和计算方法。',
      detail: '按 MIQE 要求记录样品来源、RNA 质量、反转录条件、引物序列、扩增效率、对照结果、Ct 和计算方法；保存原始扩增数据。',
      substeps: [
        '记录 RNA 浓度、纯度和完整性。',
        '记录反转录试剂盒、引物和程序。',
        '记录引物序列、扩增效率和熔解曲线。',
        '保存原始数据和分析脚本，标注异常孔处理。'
      ],
      params: [
        { label: '记录内容', value: 'MIQE 基本要素' },
        { label: '原始数据', value: '扩增曲线/Ct/熔解曲线' },
        { label: '分析', value: '方法和版本' }
      ],
      checkpoints: [
        '关键实验条件可追溯。',
        '原始数据已备份。'
      ],
      pitfalls: [
        { level: 'low', title: '记录不完整', consequence: '结果无法复现或审计', fix: '按 MIQE 清单记录关键参数' },
        { level: 'medium', title: '只保留分析后数据', consequence: '无法复核异常孔和对照', fix: '保存原始扩增文件和熔解曲线' }
      ]
    }
  ],
  references: [
    'MIQE 实时荧光定量 PCR 实验指南',
    'SYBR Green qPCR 试剂盒说明书',
    '引物设计与标准曲线验证通用方法'
  ]
};

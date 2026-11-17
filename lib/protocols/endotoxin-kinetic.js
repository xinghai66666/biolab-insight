'use strict';

module.exports = {
  id: 'endotoxin_kinetic',
  name: '细菌内毒素动态浊度法',
  category: '质量控制 · 内毒素',
  short: '动态浊度法定量内毒素，建立标准曲线后由反应时间推算浓度',
  overview: {
    objective: '定量测定内毒素含量，并确认检测方法未受样品基质干扰。',
    principle: '内毒素激活鲎试剂中的凝固酶原，使凝固蛋白原凝结导致浊度上升；浊度达到设定阈值的时间与内毒素浓度对数成反比，据此定量。',
    application: '注射剂、生物制品原液与工艺用水内毒素的定量检测，适用于低限值样品。',
    input: '供试品（需调节 pH 并验证干扰），鲎试剂、内毒素标准品',
    output: '内毒素浓度（EU/mL）、标准曲线与回收率数据',
    duration: '约 2–3 h（含曲线与样品检测）',
    yield: '不适用（检验型方法）'
  },
  keySpecs: [
    { label: '标准曲线', value: '≥4 个浓度点，r ≥0.980', note: '动态法要求相关系数绝对值' },
    { label: '加标回收率', value: '50–200%', note: '超出提示干扰' },
    { label: '复孔 CV', value: '≤10%', note: '重复性要求' },
    { label: '反应温度', value: '37 ± 1 °C', note: '温度波动直接影响反应速率' },
    { label: '样品 pH', value: '6.0–8.0', note: '超出范围需调节' },
    { label: '限值', value: '按 L=K/M 计算', note: '随给药途径与人用剂量变化' }
  ],
  steps: [
    {
      no: 1,
      phase: '准备',
      title: '试剂复溶与仪器预热',
      purpose: '保证鲎试剂活性一致、反应温度稳定。',
      summary: '鲎试剂按说明复溶，标准品复溶后涡旋，仪器预热至 37 °C。',
      detail: '鲎试剂按说明书加指定体积的无热原水复溶，静置后轻柔混匀，避免产生气泡；内毒素标准品复溶后涡旋 ≥15 min；仪器与微板预热至 37 ± 1 °C 并做温度确认。',
      substeps: [
        '取出鲎试剂与标准品，平衡至室温。',
        '按说明加无热原水复溶鲎试剂。',
        '标准品复溶后充分涡旋。',
        '仪器预热并确认孔温 37 ± 1 °C。',
        '准备无热原耗材与稀释管。'
      ],
      params: [
        { label: '复溶体积', value: '严格按说明书' },
        { label: '涡旋时间', value: '标准品 ≥15 min' },
        { label: '反应温度', value: '37 ± 1 °C' }
      ],
      checkpoints: [
        '鲎试剂完全溶解、无颗粒。',
        '孔温达到 37 ± 1 °C。'
      ],
      pitfalls: [
        { level: 'high', title: '鲎试剂复溶不当', consequence: '活性下降，标准曲线异常', fix: '严格按说明复溶，避免剧烈振荡产生泡沫' },
        { level: 'high', title: '耗材带内毒素', consequence: '假阳性、空白偏高', fix: '使用无热原耗材，玻璃器皿干热去热原' }
      ]
    },
    {
      no: 2,
      phase: '曲线',
      title: '标准曲线制备',
      purpose: '建立反应时间与浓度的定量关系。',
      summary: '用无热原水做 5 倍或 10 倍系列稀释，至少 4 个浓度点，每点双孔。',
      detail: '按说明书用无热原水将标准品稀释成系列浓度（如 0.5、0.05、0.005、0.0005 EU/mL），每点至少双孔；稀释过程换枪头，避免交叉污染，曲线与样品同板检测。',
      substeps: [
        '标记稀释管并按体积加入无热原水。',
        '逐级稀释标准品，换枪头并混匀。',
        '按浓度从低到高或从高到低加样。',
        '每点双孔，记录孔位图。',
        '设置阴性对照（无热原水）。'
      ],
      params: [
        { label: '稀释倍数', value: '5 或 10 倍系列' },
        { label: '曲线点数', value: '≥4 点 + 阴性对照' },
        { label: '复孔', value: '双孔' }
      ],
      checkpoints: [
        '稀释链清晰，无跳管。',
        '阴性对照无反应或符合要求。'
      ],
      pitfalls: [
        { level: 'high', title: '稀释链错误', consequence: '曲线线性差，定量失真', fix: '按表逐管操作并双人复核' },
        { level: 'medium', title: '标准品吸附于管壁', consequence: '低浓度点偏低', fix: '使用低吸附管并充分涡旋' }
      ]
    },
    {
      no: 3,
      phase: '样品',
      title: '样品处理与干扰试验',
      purpose: '消除样品对鲎试剂反应的抑制或增强。',
      summary: '调节 pH 至 6.0–8.0，按最大有效稀释倍数稀释，做加标回收验证。',
      detail: '检测样品 pH，必要时用无内毒素的酸/碱调节至 6.0–8.0；按最大有效稀释倍数（MVD）稀释，做加标回收（低、中浓度）确认回收率在 50–200%，否则增大稀释倍数或改用其他方法。',
      substeps: [
        '检测样品 pH 并记录。',
        '必要时调节 pH 至 6.0–8.0。',
        '按 MVD 计算并稀释样品。',
        '制备加标回收样（至少两个浓度）。',
        '计算回收率并判断干扰。'
      ],
      params: [
        { label: 'pH 范围', value: '6.0–8.0' },
        { label: '稀释倍数', value: '≤MVD' },
        { label: '回收率', value: '50–200%' }
      ],
      checkpoints: [
        '样品 pH 在允许范围。',
        '回收率合格，方法无干扰。'
      ],
      pitfalls: [
        { level: 'high', title: '未做干扰试验', consequence: '抑制导致假阴性，增强导致假阳性', fix: '按药典做干扰预试验并记录回收率' },
        { level: 'medium', title: '稀释超过 MVD', consequence: '内毒素被稀释至检测限以下，漏检', fix: '按 L/MVD 关系计算最大稀释倍数' }
      ]
    },
    {
      no: 4,
      phase: '上机',
      title: '加样与动力学检测',
      purpose: '在规定温度下记录浊度上升曲线。',
      summary: '每孔加鲎试剂后立即上机，37 °C 动力学读数至反应完成。',
      detail: '按板图加入样品与标准品，再加入复溶鲎试剂（或使用预包被卡），立即放入仪器；37 ± 1 °C 连续读数（如每 30–60 s 一次），记录到达阈值的时间（Onset Time）。',
      substeps: [
        '按板图加样，避免气泡。',
        '加入鲎试剂并立即上机。',
        '设定读板间隔与总时长。',
        '监控孔温与反应曲线。',
        '导出 Onset Time 数据。'
      ],
      params: [
        { label: '加样体积', value: '按试剂盒，常见 100 µL' },
        { label: '读数间隔', value: '30–60 s' },
        { label: '检测时长', value: '60–120 min' }
      ],
      checkpoints: [
        '所有孔反应曲线完整。',
        '阴性对照无上升趋势。'
      ],
      pitfalls: [
        { level: 'high', title: '加样后延迟上机', consequence: '反应已开始，Onset Time 偏短', fix: '加样后立即上机，控制操作节奏一致' },
        { level: 'medium', title: '孔内气泡', consequence: '浊度读数异常', fix: '加样后离心或静置消泡' }
      ]
    },
    {
      no: 5,
      phase: '计算',
      title: '曲线拟合与浓度计算',
      purpose: '由 Onset Time 反算内毒素浓度。',
      summary: '以 log 浓度对 log 反应时间做线性回归，r ≥0.980 后计算样品浓度。',
      detail: '以 log（浓度）为 x、log（Onset Time）为 y 做线性回归，要求 |r| ≥0.980；由样品 Onset Time 反算浓度并乘稀释倍数；计算复孔 CV 与加标回收率。',
      substeps: [
        '录入 Onset Time 与标准浓度。',
        '做 log-log 线性回归。',
        '检查 |r| 与各点回算偏差。',
        '反算样品浓度并乘稀释倍数。',
        '计算 CV 与回收率。'
      ],
      params: [
        { label: '拟合模型', value: 'log-log 线性回归' },
        { label: '相关系数', value: '|r| ≥0.980' },
        { label: '复孔 CV', value: '≤10%' }
      ],
      checkpoints: [
        '标准曲线 |r| 达标。',
        '样品浓度在曲线范围内。',
        'CV 与回收率符合要求。'
      ],
      pitfalls: [
        { level: 'high', title: '曲线范围外推算', consequence: '结果不可靠', fix: '调整稀释倍数复测' },
        { level: 'medium', title: '未扣除稀释倍数', consequence: '结果偏低数倍', fix: '按稀释链复核计算' }
      ]
    },
    {
      no: 6,
      phase: '判定',
      title: '结果判定与记录',
      purpose: '给出符合性结论并保证数据可追溯。',
      summary: '对照限值判定，核查对照与曲线有效性，超限按 OOS 处理。',
      detail: '将样品内毒素值与品种限值（L=K/M）比较判定；核查阴性对照、标准曲线与回收率是否有效；超限时隔离批次、启动 OOS 调查并复测。',
      substeps: [
        '对照限值逐项判定。',
        '核查曲线、对照与回收率有效性。',
        '超限时隔离并启动 OOS。',
        '记录试剂批号与仪器编号。',
        '按流程审核签发。'
      ],
      params: [
        { label: '判定依据', value: '品种限值 L=K/M' },
        { label: '有效性', value: '曲线 + 阴性对照 + 回收率' },
        { label: '超限', value: 'OOS 调查 + 复测' }
      ],
      checkpoints: [
        '判定依据明确、记录完整。',
        '无效试验未出具结论。'
      ],
      pitfalls: [
        { level: 'high', title: '曲线或对照无效仍判定', consequence: '结论不可靠，放行风险', fix: '判试验无效并重做' },
        { level: 'medium', title: '限值套用错误', consequence: '误判合格或不合格', fix: '按品种与给药途径确认 K/M 值' }
      ]
    }
  ],
  references: [
    '细菌内毒素检查法（药典通则 1143）',
    '动态浊度法鲎试剂说明书',
    '细菌内毒素检查法应用指导原则'
  ]
};

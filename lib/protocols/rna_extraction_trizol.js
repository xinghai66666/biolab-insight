'use strict';

module.exports = {
  id: "rna_extraction_trizol",
  name: "TRIzol 法 RNA 提取",
  category: "分子生物学",
  short: "用苯酚-异硫氰酸胍裂解液提取总 RNA，经相分离与醇沉淀获得完整 RNA",
  overview: {
    principle: "异硫氰酸胍与苯酚裂解细胞并使蛋白变性，氯仿分相后 RNA 留在上层水相；异丙醇沉淀 RNA，乙醇洗涤去除盐分。",
    application: "细胞或组织的总 RNA 制备，用于 RT-qPCR、转录组测序与 Northern blot。",
    input: "培养细胞（约 1×10⁶–10⁷ 个）或 20–50 mg 组织，以及预冷 TRIzol 试剂。",
    output: "溶于无核酸酶水的总 RNA，A260/A280 约 1.8–2.1。",
    duration: "约 1-2 h",
    yield: "约 1-5 µg RNA/10⁶ 细胞（随细胞类型）"
  },
  keySpecs: [
    { label: "A260/A280", value: "1.8–2.1", note: "蛋白或酚污染使比值下降" },
    { label: "A260/A230", value: "≥2.0", note: "盐或胍盐残留使比值下降" },
    { label: "RNA 完整性", value: "28S:18S ≈ 2:1，条带清晰", note: "甲醛变性胶或片段分析" },
    { label: "裂解用量", value: "1 mL/10⁶ 细胞或 50–100 mg 组织/mL", note: "按比例充分裂解" },
    { label: "氯仿分相", value: "4 °C，12000×g，15 min", note: "水相清澈不混入中间层" }
  ],
  steps: [
    {
      no: 1,
      phase: "裂解",
      title: "样本裂解",
      purpose: "使细胞完全裂解并抑制 RNase 活性。",
      summary: "每 1×10⁶ 细胞加 1 mL TRIzol 试剂，或每 50–100 mg 组织加 1 mL，室温静置 5 min 并充分匀浆。",
      detail: "每 1×10⁶ 细胞加 1 mL TRIzol 试剂，或每 50–100 mg 组织加 1 mL，室温静置 5 min 并充分匀浆。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每 1×10⁶ 细胞加 1 mL TRIzol 试剂，或每 50–100 mg 组织加 1 mL，室温静置 5 min 并充分匀浆。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "TRIzol 1 mL/10⁶细胞", value: "TRIzol 1 mL/10⁶细胞" },
        { label: "室温 5 min", value: "室温 5 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "样本量过大导致裂解不完全、RNA 降解", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "分相",
      title: "氯仿分相",
      purpose: "使酚与蛋白进入有机相，RNA 保留在上层水相。",
      summary: "按 0.2 倍体积加入氯仿，剧烈振荡 15 s，室温静置 3 min，4 °C 12000×g 离心 15 min。",
      detail: "按 0.2 倍体积加入氯仿，剧烈振荡 15 s，室温静置 3 min，4 °C 12000×g 离心 15 min。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按 0.2 倍体积加入氯仿，剧烈振荡 15 s，室温静置 3 min，4 °C 12000×g 离心 15 min。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "氯仿 0.2 倍体积", value: "氯仿 0.2 倍体积" },
        { label: "4 °C 12000×g 15 min", value: "4 °C 12000×g 15 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "吸取时混入中间层导致蛋白与酚污染", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "沉淀",
      title: "异丙醇沉淀 RNA",
      purpose: "使 RNA 沉淀并与可溶成分分离。",
      summary: "转移上层水相至新管，加等体积异丙醇，室温静置 10 min，4 °C 12000×g 离心 10 min。",
      detail: "转移上层水相至新管，加等体积异丙醇，室温静置 10 min，4 °C 12000×g 离心 10 min。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "转移上层水相至新管，加等体积异丙醇，室温静置 10 min，4 °C 12000×g 离心 10 min。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "异丙醇等体积", value: "异丙醇等体积" },
        { label: "室温 10 min", value: "室温 10 min" },
        { label: "4 °C 12000×g 10 min", value: "4 °C 12000×g 10 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "沉淀时间过短导致回收率低", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "洗涤",
      title: "75% 乙醇洗涤",
      purpose: "去除残留胍盐、酚与异丙醇。",
      summary: "弃上清，用 75% 乙醇洗涤 RNA 沉淀 2 次，每次 4 °C 7500×g 离心 5 min。",
      detail: "弃上清，用 75% 乙醇洗涤 RNA 沉淀 2 次，每次 4 °C 7500×g 离心 5 min。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "弃上清，用 75% 乙醇洗涤 RNA 沉淀 2 次，每次 4 °C 7500×g 离心 5 min。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "75% 乙醇", value: "75% 乙醇" },
        { label: "4 °C 7500×g 5 min，洗 2 次", value: "4 °C 7500×g 5 min，洗 2 次" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "洗涤不足导致 A260/A230 偏低", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "晾干",
      title: "沉淀晾干",
      purpose: "去除残余乙醇又保持 RNA 可溶。",
      summary: "室温晾干沉淀 5–10 min，勿使 RNA 完全干燥，以免难以复溶。",
      detail: "室温晾干沉淀 5–10 min，勿使 RNA 完全干燥，以免难以复溶。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "室温晾干沉淀 5–10 min，勿使 RNA 完全干燥，以免难以复溶。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "室温晾干 5–10 min", value: "室温晾干 5–10 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "过度干燥使 RNA 难以溶解", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "溶解",
      title: "RNA 溶解与定量",
      purpose: "获得符合下游要求的 RNA 储液。",
      summary: "用无核酸酶水溶解 RNA，测浓度与 A260/A280、A260/A230，必要时稀释。",
      detail: "用无核酸酶水溶解 RNA，测浓度与 A260/A280、A260/A230，必要时稀释。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用无核酸酶水溶解 RNA，测浓度与 A260/A280、A260/A230，必要时稀释。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "无核酸酶水", value: "无核酸酶水" },
        { label: "室温 5–10 min", value: "室温 5–10 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "使用普通水引入 RNase 导致降解", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "质检",
      title: "完整性评估",
      purpose: "确认 RNA 未降解、适合反转录。",
      summary: "甲醛变性琼脂糖凝胶或片段分析仪检查 28S/18S 比值与条带完整性。",
      detail: "甲醛变性琼脂糖凝胶或片段分析仪检查 28S/18S 比值与条带完整性。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "甲醛变性琼脂糖凝胶或片段分析仪检查 28S/18S 比值与条带完整性。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "28S", value: "28S:18S ≈ 2:1" },
        { label: "条带清晰", value: "条带清晰" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "降解表现为拖尾、28S/18S 下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "保存",
      title: "分装与记录",
      purpose: "减少冻融并保证可追溯。",
      summary: "按单次用量分装，-80 °C 长期保存，记录样本来源、提取日期、浓度、纯度与完整性。",
      detail: "按单次用量分装，-80 °C 长期保存，记录样本来源、提取日期、浓度、纯度与完整性。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按单次用量分装，-80 °C 长期保存，记录样本来源、提取日期、浓度、纯度与完整性。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "-80 °C 长期", value: "-80 °C 长期" },
        { label: "分装保存", value: "分装保存" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "反复冻融导致 RNA 断裂；记录缺失", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "TRIzol 法 RNA 提取 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

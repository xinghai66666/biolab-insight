'use strict';

module.exports = {
  id: "anion_exchange_chrom",
  name: "阴离子交换层析",
  category: "下游工艺",
  short: "利用带正电填料在高于蛋白等电点的 pH 下捕获带负电蛋白，盐梯度洗脱分离",
  overview: {
    principle: "当缓冲液 pH 高于蛋白等电点时蛋白带负电，可与带正电的阴离子交换配基（季铵/二乙氨基乙基）结合；提高盐浓度使其按电荷强弱依次洗脱。",
    application: "抗体、白蛋白及酸性重组蛋白的捕获、流穿除杂与精细纯化。",
    input: "经澄清并置换至低盐、pH 高于目标蛋白 pI 的蛋白溶液。",
    output: "按电荷分离的洗脱峰或流穿组分，目标蛋白进入后续工艺。",
    duration: "约 4-6 h",
    yield: "洗脱回收率通常 70%-95%（以目标蛋白计）"
  },
  keySpecs: [
    { label: "平衡 pH", value: "高于目标 pI 0.5-1.0 单位", note: "常为 pH 7.5-9.0" },
    { label: "上样电导", value: "≤8 mS/cm", note: "低电导利于结合" },
    { label: "柱温", value: "2-8 °C 或室温", note: "按蛋白稳定性" },
    { label: "洗脱方式", value: "0-0.5 M NaCl 梯度", note: "20 CV 线性梯度" }
  ],
  steps: [
    {
      no: 1,
      phase: "准备",
      title: "填料与缓冲液准备",
      purpose: "建立稳定结合条件。",
      summary: "检查 Q 强阴离子交换树脂（或 DEAE 弱阴离子交换树脂），配制平衡缓冲液（如 50 mM Tris-HCl，pH 8.0，电导约 5 mS/cm），过滤脱气。",
      detail: "检查 Q 强阴离子交换树脂（或 DEAE 弱阴离子交换树脂），配制平衡缓冲液（如 50 mM Tris-HCl，pH 8.0，电导约 5 mS/cm），过滤脱气。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "检查 Q 强阴离子交换树脂（或 DEAE 弱阴离子交换树脂），配制平衡缓冲液（如 50 mM Tris-HCl，pH 8.0，电导约 5 mS/cm），过滤脱气。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "50 mM Tris-HCl pH 8.0", value: "50 mM Tris-HCl pH 8.0" },
        { label: "电导约 5 mS/cm", value: "电导约 5 mS/cm" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "缓冲液 pH 低于 pI 导致目标蛋白不结合", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "平衡",
      title: "柱平衡",
      purpose: "统一柱床与上样条件。",
      summary: "用平衡缓冲液以 100-150 cm/h 冲洗 3-5 CV，至流出液 pH 与电导稳定一致。",
      detail: "用平衡缓冲液以 100-150 cm/h 冲洗 3-5 CV，至流出液 pH 与电导稳定一致。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用平衡缓冲液以 100-150 cm/h 冲洗 3-5 CV，至流出液 pH 与电导稳定一致。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "3-5 CV", value: "3-5 CV" },
        { label: "100-150 cm/h", value: "100-150 cm/h" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "平衡不足导致结合不稳定、重现性差", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "上样",
      title: "样品调整与上样",
      purpose: "使目标蛋白结合到填料上。",
      summary: "将样品透析或置换到平衡缓冲液，调 pH 至 8.0、电导 ≤8 mS/cm，按动态载量（约 10-40 mg/mL 树脂）上样。",
      detail: "将样品透析或置换到平衡缓冲液，调 pH 至 8.0、电导 ≤8 mS/cm，按动态载量（约 10-40 mg/mL 树脂）上样。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将样品透析或置换到平衡缓冲液，调 pH 至 8.0、电导 ≤8 mS/cm，按动态载量（约 10-40 mg/mL 树脂）上样。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "pH 8.0", value: "pH 8.0" },
        { label: "电导 ≤8 mS/cm", value: "电导 ≤8 mS/cm" },
        { label: "载量 10-40 mg/mL", value: "载量 10-40 mg/mL" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "样品电导过高或 pH 偏低导致穿透流失", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "洗涤",
      title: "流穿与洗涤",
      purpose: "去除未结合杂质。",
      summary: "用平衡缓冲液洗至 A280 回基线并稳定，收集流穿峰。",
      detail: "用平衡缓冲液洗至 A280 回基线并稳定，收集流穿峰。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用平衡缓冲液洗至 A280 回基线并稳定，收集流穿峰。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "洗至基线", value: "洗至基线" },
        { label: "收集流穿", value: "收集流穿" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "洗涤不足导致杂质残留", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "洗脱",
      title: "盐梯度洗脱",
      purpose: "按电荷分离目标蛋白。",
      summary: "用含 0-0.5 M NaCl 的平衡缓冲液做 20 CV 线性梯度洗脱，按 A280 收集各峰。",
      detail: "用含 0-0.5 M NaCl 的平衡缓冲液做 20 CV 线性梯度洗脱，按 A280 收集各峰。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用含 0-0.5 M NaCl 的平衡缓冲液做 20 CV 线性梯度洗脱，按 A280 收集各峰。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "0-0.5 M NaCl", value: "0-0.5 M NaCl" },
        { label: "20 CV 梯度", value: "20 CV 梯度" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "梯度过陡导致峰重叠、纯度下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "再生",
      title: "柱再生与清洗",
      purpose: "恢复填料结合能力。",
      summary: "用 1-2 M NaCl 高盐清洗 2 CV 去除强结合物，再回到平衡缓冲液。",
      detail: "用 1-2 M NaCl 高盐清洗 2 CV 去除强结合物，再回到平衡缓冲液。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用 1-2 M NaCl 高盐清洗 2 CV 去除强结合物，再回到平衡缓冲液。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "1-2 M NaCl 洗 2 CV", value: "1-2 M NaCl 洗 2 CV" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "清洗不足导致批间交叉污染", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "分析",
      title: "组分分析",
      purpose: "确认目标峰质量。",
      summary: "对收集峰做 SDS-PAGE、SEC 或活性测定，确定目标峰并合并。",
      detail: "对收集峰做 SDS-PAGE、SEC 或活性测定，确定目标峰并合并。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "对收集峰做 SDS-PAGE、SEC 或活性测定，确定目标峰并合并。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "SDS-PAGE/SEC", value: "SDS-PAGE/SEC" },
        { label: "活性测定", value: "活性测定" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "误合并杂峰导致纯度不足", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "记录",
      title: "记录与保存",
      purpose: "保证可追溯。",
      summary: "记录层析图谱、管号与 pH/电导曲线，填料于 4 °C、20% 乙醇保存。",
      detail: "记录层析图谱、管号与 pH/电导曲线，填料于 4 °C、20% 乙醇保存。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "记录层析图谱、管号与 pH/电导曲线，填料于 4 °C、20% 乙醇保存。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "记录完整", value: "记录完整" },
        { label: "4 °C 20% 乙醇保存", value: "4 °C 20% 乙醇保存" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "填料保存不当导致微生物污染", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "阴离子交换层析 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

'use strict';

module.exports = {
  id: "bradford_assay",
  name: "Bradford 蛋白浓度测定",
  category: "分析检测",
  short: "考马斯亮蓝 G-250 比色法测定蛋白浓度，快速灵敏，适用于常规样品定量",
  overview: {
    principle: "酸性条件下考马斯亮蓝 G-250 与蛋白中的碱性及芳香族氨基酸结合，最大吸收由 465 nm 移至 595 nm，吸光度与蛋白浓度在一定范围内成正比。",
    application: "细胞裂解液、层析组分与纯化样品的快速蛋白定量。",
    input: "待测蛋白样品（稀释至标准曲线范围内）与 Bradford 工作液。",
    output: "样品蛋白浓度（mg/mL 或 µg/mL）及标准曲线参数。",
    duration: "约 0.5-1 h",
    yield: "不适用（分析型方法）"
  },
  keySpecs: [
    { label: "标准曲线", value: "≥6 点，R² ≥0.99", note: "每点双孔" },
    { label: "工作液", value: "单组分 Bradford 试剂", note: "按说明书保存" },
    { label: "孵育", value: "室温，5-10 min", note: "避光" },
    { label: "检测波长", value: "595 nm", note: "酶标仪或分光光度计" }
  ],
  steps: [
    {
      no: 1,
      phase: "准备",
      title: "试剂与标准品配制",
      purpose: "建立一致的定量基准。",
      summary: "取 Bradford 工作液恢复至室温并混匀，用 BSA 配制系列标准品，样品稀释至线性范围。",
      detail: "取 Bradford 工作液恢复至室温并混匀，用 BSA 配制系列标准品，样品稀释至线性范围。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "取 Bradford 工作液恢复至室温并混匀，用 BSA 配制系列标准品，样品稀释至线性范围。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "标准品 0-1000 µg/mL", value: "标准品 0-1000 µg/mL" },
        { label: "工作液室温平衡", value: "工作液室温平衡" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "工作液反复冻融导致背景升高、灵敏度下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "加样",
      title: "标准品与样品加板",
      purpose: "使样品与标准品在相同条件下反应。",
      summary: "按板图加入标准品和样品，每孔 20 µL，每点双孔，避免气泡。",
      detail: "按板图加入标准品和样品，每孔 20 µL，每点双孔，避免气泡。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按板图加入标准品和样品，每孔 20 µL，每点双孔，避免气泡。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "20 µL/孔", value: "20 µL/孔" },
        { label: "双孔", value: "双孔" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "加样顺序错乱导致孔位错配", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "反应",
      title: "加工作液并孵育",
      purpose: "使显色反应充分且一致。",
      summary: "每孔加入 200 µL Bradford 工作液，混匀后室温避光孵育 5-10 min。",
      detail: "每孔加入 200 µL Bradford 工作液，混匀后室温避光孵育 5-10 min。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加入 200 µL Bradford 工作液，混匀后室温避光孵育 5-10 min。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "200 µL/孔", value: "200 µL/孔" },
        { label: "室温 5-10 min", value: "室温 5-10 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "孵育时间过长导致颜色衰减、读数偏低", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "读数",
      title: "酶标仪读数",
      purpose: "获得可用于拟合的原始信号。",
      summary: "在 595 nm 读取吸光度，检查孔内是否有气泡或沉淀。",
      detail: "在 595 nm 读取吸光度，检查孔内是否有气泡或沉淀。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "在 595 nm 读取吸光度，检查孔内是否有气泡或沉淀。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "595 nm", value: "595 nm" },
        { label: "室温读数", value: "室温读数" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "孔内气泡造成读数异常", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "拟合",
      title: "标准曲线拟合",
      purpose: "将吸光度换算为浓度。",
      summary: "以浓度为 x、OD 为 y 做线性回归或 4PL 拟合，要求 R² ≥0.99。",
      detail: "以浓度为 x、OD 为 y 做线性回归或 4PL 拟合，要求 R² ≥0.99。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "以浓度为 x、OD 为 y 做线性回归或 4PL 拟合，要求 R² ≥0.99。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "R² ≥0.99", value: "R² ≥0.99" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "外推超出曲线范围导致结果失真", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "计算",
      title: "样品浓度换算",
      purpose: "得到原样品的真实浓度。",
      summary: "由样品 OD 反算浓度并乘以稀释倍数，计算复孔 CV。",
      detail: "由样品 OD 反算浓度并乘以稀释倍数，计算复孔 CV。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "由样品 OD 反算浓度并乘以稀释倍数，计算复孔 CV。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "稀释倍数", value: "稀释倍数" },
        { label: "CV ≤15%", value: "CV ≤15%" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "忘记乘稀释倍数导致结果偏低", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "复核",
      title: "异常数据复核",
      purpose: "保证数据可靠。",
      summary: "对 CV 超标的复孔与偏离曲线的标准点复查原始记录并复测。",
      detail: "对 CV 超标的复孔与偏离曲线的标准点复查原始记录并复测。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "对 CV 超标的复孔与偏离曲线的标准点复查原始记录并复测。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "CV ≤15%", value: "CV ≤15%" },
        { label: "回算偏差 ≤20%", value: "回算偏差 ≤20%" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "直接剔除异常点而无记录", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "记录",
      title: "结果与留样",
      purpose: "保证结果可追溯。",
      summary: "记录试剂批号、板号、孵育条件与结果，样品与板图归档。",
      detail: "记录试剂批号、板号、孵育条件与结果，样品与板图归档。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "记录试剂批号、板号、孵育条件与结果，样品与板图归档。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "记录完整", value: "记录完整" },
        { label: "双人复核", value: "双人复核" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "缺少试剂批号无法追溯", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "Bradford 蛋白浓度测定 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

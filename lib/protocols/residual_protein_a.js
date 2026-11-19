'use strict';

module.exports = {
  id: "residual_protein_a",
  name: "残留 Protein A 检测",
  category: "分析检测",
  short: "定量检测 Protein A 亲和层析后可能脱落并残留的配基蛋白。",
  overview: {
    principle: "以抗 Protein A 抗体包被酶标板捕获样品中的残留配基，再用酶标二抗显色，吸光度与残留量成正比，属典型的双抗夹心 ELISA。",
    application: "Protein A 亲和层析纯化产品的放行检测与层析柱清洗效果评估。",
    input: "待测样品、抗 Protein A 包被板、酶标二抗与 Protein A 标准品。",
    output: "样品中残留 Protein A 含量（ng/mg 蛋白）。",
    duration: "约 4-5 h",
    yield: "不适用（检测型方法）"
  },
  keySpecs: [
    { label: "标准曲线", value: "≥6 点，R² ≥0.99", note: "0.1-10 ng/mL" },
    { label: "回收率", value: "70-130%", note: "加标回收" },
    { label: "复孔 CV", value: "≤15%", note: "每点双孔" },
    { label: "洗板", value: "≥4 次", note: "每步充分洗涤" },
    { label: "判定限", value: "≤1 ng/mg 蛋白", note: "按产品标准" }
  ],
  steps: [
    {
      no: 1,
      phase: "准备",
      title: "试剂平衡与板准备",
      purpose: "保证反应条件一致。",
      summary: "将试剂盒各组分恢复至室温，按说明书配制洗涤液与稀释液，取出包被板并标记板图。",
      detail: "将试剂盒各组分恢复至室温，按说明书配制洗涤液与稀释液，取出包被板并标记板图。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将试剂盒各组分恢复至室温，按说明书配制洗涤液与稀释液，取出包被板并标记板图。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "室温平衡 30 min", value: "室温平衡 30 min" },
        { label: "洗涤液 1×", value: "洗涤液 1×" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "洗涤液结晶未完全溶解导致洗板不净", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "标准品",
      title: "配制标准曲线",
      purpose: "建立定量基准。",
      summary: "用稀释液将 Protein A 标准品梯度稀释至 6 个浓度点，每点双孔。",
      detail: "用稀释液将 Protein A 标准品梯度稀释至 6 个浓度点，每点双孔。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用稀释液将 Protein A 标准品梯度稀释至 6 个浓度点，每点双孔。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "6 点", value: "6 点" },
        { label: "双孔", value: "双孔" },
        { label: "0.1-10 ng/mL", value: "0.1-10 ng/mL" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "稀释体积过小造成误差累积", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "加样",
      title: "加标准品与样品",
      purpose: "使残留配基被捕获抗体结合。",
      summary: "每孔加 100 µL 标准品或稀释后样品，封板后室温孵育 1-2 h。",
      detail: "每孔加 100 µL 标准品或稀释后样品，封板后室温孵育 1-2 h。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加 100 µL 标准品或稀释后样品，封板后室温孵育 1-2 h。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "100 µL/孔", value: "100 µL/孔" },
        { label: "室温 1-2 h", value: "室温 1-2 h" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "样品未稀释导致超出曲线范围", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "洗板",
      title: "洗板去除未结合物",
      purpose: "降低背景与非特异信号。",
      summary: "弃液后每孔加洗涤液 300 µL，重复 4-5 次，最后一次拍干。",
      detail: "弃液后每孔加洗涤液 300 µL，重复 4-5 次，最后一次拍干。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "弃液后每孔加洗涤液 300 µL，重复 4-5 次，最后一次拍干。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "300 µL/孔", value: "300 µL/孔" },
        { label: "4-5 次", value: "4-5 次" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "洗板不彻底造成背景偏高", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "二抗",
      title: "加酶标二抗",
      purpose: "与捕获的配基形成夹心复合物。",
      summary: "每孔加 100 µL 稀释好的 HRP 标记二抗，室温孵育 1 h。",
      detail: "每孔加 100 µL 稀释好的 HRP 标记二抗，室温孵育 1 h。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加 100 µL 稀释好的 HRP 标记二抗，室温孵育 1 h。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "100 µL/孔", value: "100 µL/孔" },
        { label: "室温 1 h", value: "室温 1 h" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "二抗浓度过高导致本底升高", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "显色",
      title: "加底物显色",
      purpose: "信号强度反映残留量。",
      summary: "每孔加 100 µL TMB 底物，避光显色 10-15 min，观察蓝色梯度。",
      detail: "每孔加 100 µL TMB 底物，避光显色 10-15 min，观察蓝色梯度。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加 100 µL TMB 底物，避光显色 10-15 min，观察蓝色梯度。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "100 µL/孔", value: "100 µL/孔" },
        { label: "避光 10-15 min", value: "避光 10-15 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "显色时间不一致导致孔间偏差", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "终止读数",
      title: "终止并读板",
      purpose: "固定信号并获取吸光度。",
      summary: "每孔加 50 µL 终止液，5 min 内在 450 nm 读数（可设 630 nm 参比）。",
      detail: "每孔加 50 µL 终止液，5 min 内在 450 nm 读数（可设 630 nm 参比）。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每孔加 50 µL 终止液，5 min 内在 450 nm 读数（可设 630 nm 参比）。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "50 µL/孔", value: "50 µL/孔" },
        { label: "450 nm", value: "450 nm" },
        { label: "5 min 内读数", value: "5 min 内读数" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "终止后久置导致信号衰减", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "计算",
      title: "曲线拟合与结果计算",
      purpose: "得到可报告的残留量。",
      summary: "四点或四参数拟合计算浓度，乘以稀释倍数并折算为 ng/mg 蛋白，评估复孔 CV 与回收率。",
      detail: "四点或四参数拟合计算浓度，乘以稀释倍数并折算为 ng/mg 蛋白，评估复孔 CV 与回收率。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "四点或四参数拟合计算浓度，乘以稀释倍数并折算为 ng/mg 蛋白，评估复孔 CV 与回收率。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "R² ≥0.99", value: "R² ≥0.99" },
        { label: "CV ≤15%", value: "CV ≤15%" },
        { label: "回收率 70-130%", value: "回收率 70-130%" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "未折算蛋白浓度导致单位错误", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "残留 Protein A 检测 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

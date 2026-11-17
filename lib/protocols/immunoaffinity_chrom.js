'use strict';

module.exports = {
  id: "immunoaffinity_chrom",
  name: "免疫亲和层析",
  category: "下游工艺",
  short: "将特异性抗体或抗原偶联到活化基质，依靠抗原-抗体特异性识别高选择性捕获目标物",
  overview: {
    principle: "把亲和配基（抗体或抗原）共价偶联到活化载体上，目标分子被特异性捕获，再用低 pH 或离液盐温和管理条件洗脱，可获得极高选择性。",
    application: "低丰度目标蛋白、特定抗原或毒素的高选择性纯化与浓缩。",
    input: "澄清的复杂样品（如细胞裂解液、血清或发酵上清）。",
    output: "高纯度的目标抗原/抗体洗脱液。",
    duration: "约 6-8 h",
    yield: "洗脱回收率通常 50%-85%（依配基活性而定）"
  },
  keySpecs: [
    { label: "偶联率", value: "70%-95%", note: "按蛋白定量" },
    { label: "配基密度", value: "2-15 mg/mL", note: "每 mL 树脂" },
    { label: "洗脱 pH", value: "2.5-3.2", note: "需即时中和" },
    { label: "柱温", value: "2-8 °C", note: "保护配基活性" }
  ],
  steps: [
    {
      no: 1,
      phase: "偶联",
      title: "配基偶联",
      purpose: "制备高特异性亲和介质。",
      summary: "将特异性抗体或抗原偶联至 CNBr 活化 Sepharose，控制偶联 pH 8-9，随后封闭未反应位点。",
      detail: "将特异性抗体或抗原偶联至 CNBr 活化 Sepharose，控制偶联 pH 8-9，随后封闭未反应位点。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将特异性抗体或抗原偶联至 CNBr 活化 Sepharose，控制偶联 pH 8-9，随后封闭未反应位点。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "CNBr 活化 Sepharose", value: "CNBr 活化 Sepharose" },
        { label: "偶联 pH 8-9", value: "偶联 pH 8-9" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "偶联 pH 不当导致配基失活", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "验证",
      title: "偶联效果验证",
      purpose: "确认介质可用于捕获。",
      summary: "测定偶联率与配基密度，充分洗涤去除游离配基并测流出液蛋白。",
      detail: "测定偶联率与配基密度，充分洗涤去除游离配基并测流出液蛋白。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "测定偶联率与配基密度，充分洗涤去除游离配基并测流出液蛋白。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "偶联率 70%-95%", value: "偶联率 70%-95%" },
        { label: "配基密度 2-15 mg/mL", value: "配基密度 2-15 mg/mL" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "游离配基残留污染产品", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "平衡",
      title: "柱平衡",
      purpose: "建立适合抗原抗体结合的环境。",
      summary: "用平衡缓冲液（如 20 mM 磷酸缓冲液 + 150 mM NaCl，pH 7.4）冲洗 5 CV。",
      detail: "用平衡缓冲液（如 20 mM 磷酸缓冲液 + 150 mM NaCl，pH 7.4）冲洗 5 CV。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用平衡缓冲液（如 20 mM 磷酸缓冲液 + 150 mM NaCl，pH 7.4）冲洗 5 CV。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "5 CV", value: "5 CV" },
        { label: "pH 7.4", value: "pH 7.4" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "平衡不足导致非特异吸附升高", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "上样",
      title: "样品上样捕获",
      purpose: "高选择性捕获目标物。",
      summary: "将澄清样品上样，控制低流速使目标抗原被特异性充分捕获。",
      detail: "将澄清样品上样，控制低流速使目标抗原被特异性充分捕获。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将澄清样品上样，控制低流速使目标抗原被特异性充分捕获。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "低流速", value: "低流速" },
        { label: "停留 3-5 min", value: "停留 3-5 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "流速过快导致捕获不完全", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "洗涤",
      title: "严格洗涤",
      purpose: "提高产物纯度。",
      summary: "用高盐或含温和去污剂的洗涤液冲洗至 A280 稳定基线，去除非特异结合物。",
      detail: "用高盐或含温和去污剂的洗涤液冲洗至 A280 稳定基线，去除非特异结合物。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用高盐或含温和去污剂的洗涤液冲洗至 A280 稳定基线，去除非特异结合物。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "高盐/温和去污剂洗涤", value: "高盐/温和去污剂洗涤" },
        { label: "洗至基线", value: "洗至基线" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "洗涤不足导致杂质共洗脱", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "洗脱",
      title: "洗脱与中和",
      purpose: "温和解离目标物并保护活性。",
      summary: "用酸性甘氨酸洗脱液（0.1 M 甘氨酸，pH 2.5-3.0）或高浓度 MgCl2 洗脱，收集后立即中和。",
      detail: "用酸性甘氨酸洗脱液（0.1 M 甘氨酸，pH 2.5-3.0）或高浓度 MgCl2 洗脱，收集后立即中和。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用酸性甘氨酸洗脱液（0.1 M 甘氨酸，pH 2.5-3.0）或高浓度 MgCl2 洗脱，收集后立即中和。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "酸性甘氨酸洗脱液 pH 2.5-3.0", value: "酸性甘氨酸洗脱液 pH 2.5-3.0" },
        { label: "即时中和", value: "即时中和" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "中和延迟导致目标蛋白变性聚集", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "再生",
      title: "柱再生与保存",
      purpose: "恢复并维持介质性能。",
      summary: "用平衡缓冲液充分再生，加入抑菌剂后于 4 °C 保存，监测配基泄漏。",
      detail: "用平衡缓冲液充分再生，加入抑菌剂后于 4 °C 保存，监测配基泄漏。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用平衡缓冲液充分再生，加入抑菌剂后于 4 °C 保存，监测配基泄漏。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "再生至稳定", value: "再生至稳定" },
        { label: "4 °C 保存", value: "4 °C 保存" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "配基脱落导致产物污染", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "记录",
      title: "分析与记录",
      purpose: "确认纯度与可追溯性。",
      summary: "对洗脱液做 SDS-PAGE/Western/活性分析，记录偶联批号、上样量与洗脱曲线。",
      detail: "对洗脱液做 SDS-PAGE/Western/活性分析，记录偶联批号、上样量与洗脱曲线。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "对洗脱液做 SDS-PAGE/Western/活性分析，记录偶联批号、上样量与洗脱曲线。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "SDS-PAGE/Western", value: "SDS-PAGE/Western" },
        { label: "记录完整", value: "记录完整" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "缺少配基批号难以追溯稳定性", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "免疫亲和层析 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

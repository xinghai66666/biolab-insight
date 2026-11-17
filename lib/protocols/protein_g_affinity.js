'use strict';

module.exports = {
  id: "protein_g_affinity",
  name: "Protein G 亲和层析",
  category: "下游工艺",
  short: "利用 Protein G 与 IgG Fc 区的特异性亲和实现抗体一步捕获，低 pH 或离液盐洗脱",
  overview: {
    principle: "Protein G 能高亲和力结合多种种属 IgG 的 Fc 区（部分 Fab 亦可结合），洗脱时通过低 pH 或高浓度盐破坏相互作用，实现高选择性捕获。",
    application: "多克隆/单克隆抗体的捕获纯化及抗体药物中间体精制。",
    input: "澄清的细胞培养上清或含抗体的粗提液。",
    output: "高纯度的抗体洗脱液，中和后进入后续抛光步骤。",
    duration: "约 4-6 h",
    yield: "洗脱回收率通常 80%-98%（以 IgG 计）"
  },
  keySpecs: [
    { label: "结合 pH", value: "6.5-8.0", note: "接近生理 pH" },
    { label: "洗脱 pH", value: "2.5-3.2", note: "需立即中和" },
    { label: "中和后 pH", value: "5.0-7.0", note: "降低聚集风险" },
    { label: "柱温", value: "2-8 °C 或室温", note: "按抗体稳定性" }
  ],
  steps: [
    {
      no: 1,
      phase: "准备",
      title: "填料与缓冲液准备",
      purpose: "建立适合抗体结合的缓冲环境。",
      summary: "检查 Protein G 亲和树脂，配制平衡缓冲液（如 20 mM 磷酸钠 + 150 mM NaCl，pH 7.4），过滤脱气。",
      detail: "检查 Protein G 亲和树脂，配制平衡缓冲液（如 20 mM 磷酸钠 + 150 mM NaCl，pH 7.4），过滤脱气。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "检查 Protein G 亲和树脂，配制平衡缓冲液（如 20 mM 磷酸钠 + 150 mM NaCl，pH 7.4），过滤脱气。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "20 mM 磷酸钠 + 150 mM NaCl pH 7.4", value: "20 mM 磷酸钠 + 150 mM NaCl pH 7.4" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "缓冲液成分导致非特异结合增加", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "平衡",
      title: "柱平衡",
      purpose: "使柱床适合上样。",
      summary: "用平衡缓冲液以 50-100 cm/h 冲洗 5 CV，至流出液 pH 与电导稳定。",
      detail: "用平衡缓冲液以 50-100 cm/h 冲洗 5 CV，至流出液 pH 与电导稳定。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用平衡缓冲液以 50-100 cm/h 冲洗 5 CV，至流出液 pH 与电导稳定。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "5 CV", value: "5 CV" },
        { label: "50-100 cm/h", value: "50-100 cm/h" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "平衡不足导致结合能力下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "上样",
      title: "样品澄清与上样",
      purpose: "使抗体充分结合到 Protein G 上。",
      summary: "将样品澄清并调 pH 至 7.4，按动态载量（约 10-30 mg/mL 树脂）上样，控制停留时间 2-4 min。",
      detail: "将样品澄清并调 pH 至 7.4，按动态载量（约 10-30 mg/mL 树脂）上样，控制停留时间 2-4 min。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将样品澄清并调 pH 至 7.4，按动态载量（约 10-30 mg/mL 树脂）上样，控制停留时间 2-4 min。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "pH 7.4", value: "pH 7.4" },
        { label: "载量 10-30 mg/mL", value: "载量 10-30 mg/mL" },
        { label: "停留 2-4 min", value: "停留 2-4 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "上样 pH 偏离或流速过快导致抗体穿透", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "洗涤",
      title: "洗涤去杂",
      purpose: "去除杂蛋白。",
      summary: "用平衡缓冲液洗至 A280 回基线，必要时用含温和盐的洗涤液去除非特异结合蛋白。",
      detail: "用平衡缓冲液洗至 A280 回基线，必要时用含温和盐的洗涤液去除非特异结合蛋白。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用平衡缓冲液洗至 A280 回基线，必要时用含温和盐的洗涤液去除非特异结合蛋白。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "洗至基线", value: "洗至基线" },
        { label: "可加 0.5 M NaCl 洗涤", value: "可加 0.5 M NaCl 洗涤" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "洗涤不足导致纯度下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "洗脱",
      title: "洗脱与即时中和",
      purpose: "温和解离抗体并避免低 pH 聚集。",
      summary: "用 0.1 M 甘氨酸（pH 2.7）或氯化镁洗脱液洗脱，收集管预置中和液，立即混匀使 pH 回到 5.0-7.0。",
      detail: "用 0.1 M 甘氨酸（pH 2.7）或氯化镁洗脱液洗脱，收集管预置中和液，立即混匀使 pH 回到 5.0-7.0。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用 0.1 M 甘氨酸（pH 2.7）或氯化镁洗脱液洗脱，收集管预置中和液，立即混匀使 pH 回到 5.0-7.0。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "0.1 M 甘氨酸 pH 2.7 或 2-4 M MgCl2", value: "0.1 M 甘氨酸 pH 2.7 或 2-4 M MgCl2" },
        { label: "中和至 pH 5-7", value: "中和至 pH 5-7" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "中和延迟导致抗体聚集与活性损失", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "再生",
      title: "柱再生与清洗",
      purpose: "恢复填料结合能力并控制微生物。",
      summary: "用平衡缓冲液充分再生，定期按说明书进行 CIP（原位清洗）以去除残留物。",
      detail: "用平衡缓冲液充分再生，定期按说明书进行 CIP（原位清洗）以去除残留物。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用平衡缓冲液充分再生，定期按说明书进行 CIP（原位清洗）以去除残留物。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "平衡至稳定", value: "平衡至稳定" },
        { label: "按说明 CIP", value: "按说明 CIP" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "CIP 条件过强损伤配基", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "分析",
      title: "组分分析",
      purpose: "确认抗体质量。",
      summary: "对洗脱液进行 SDS-PAGE、SEC、效价与 HCP 检测，确认质量。",
      detail: "对洗脱液进行 SDS-PAGE、SEC、效价与 HCP 检测，确认质量。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "对洗脱液进行 SDS-PAGE、SEC、效价与 HCP 检测，确认质量。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "SDS-PAGE/SEC", value: "SDS-PAGE/SEC" },
        { label: "效价", value: "效价" },
        { label: "HCP", value: "HCP" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "仅凭 A280 判断忽略杂质风险", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "记录",
      title: "记录与保存",
      purpose: "保证可追溯。",
      summary: "记录上样量、洗脱 pH、中和曲线与收集管号，填料于 4 °C、20% 乙醇保存。",
      detail: "记录上样量、洗脱 pH、中和曲线与收集管号，填料于 4 °C、20% 乙醇保存。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "记录上样量、洗脱 pH、中和曲线与收集管号，填料于 4 °C、20% 乙醇保存。",
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
        { level: 'high', title: "缺少 pH-时间记录难以追溯聚集原因", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "Protein G 亲和层析 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

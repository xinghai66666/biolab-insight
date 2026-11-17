'use strict';

module.exports = {
  id: "pcr_amplification",
  name: "常规 PCR 扩增",
  category: "分子生物学",
  short: "常规终点 PCR 扩增特定 DNA 片段，产物经琼脂糖凝胶电泳检测",
  overview: {
    principle: "引物在耐热 Taq DNA 聚合酶作用下按变性-退火-延伸循环扩增目标片段；终点产物通过凝胶电泳判断大小与特异性，非实时定量。",
    application: "基因型鉴定、克隆前片段扩增、菌落筛选与常规分子检测。",
    input: "基因组 DNA、质粒或 cDNA 模板与一对特异性引物。",
    output: "特定大小的双链 DNA 扩增产物，用于电泳、测序或克隆。",
    duration: "约 2-3 h",
    yield: "不适用（终点定性或半定量检测）"
  },
  keySpecs: [
    { label: "变性", value: "94–95 °C，30 s–2 min", note: "首轮预变性 2–5 min" },
    { label: "退火", value: "50–65 °C，30 s", note: "按引物 Tm 设定" },
    { label: "延伸", value: "72 °C，30–60 s（约 1 kb/min）", note: "按片段长度调整" },
    { label: "循环数", value: "25–35 个循环", note: "过多循环增加非特异扩增" },
    { label: "产物检测", value: "1–2% 琼脂糖凝胶", note: "单一条带且与预期大小一致" }
  ],
  steps: [
    {
      no: 1,
      phase: "设计",
      title: "引物与片段设计",
      purpose: "决定扩增的特异性与效率。",
      summary: "按目标序列设计引物，Tm 相差 ≤5 °C，扩增片段一般 200–2000 bp，避免形成引物二聚体。",
      detail: "按目标序列设计引物，Tm 相差 ≤5 °C，扩增片段一般 200–2000 bp，避免形成引物二聚体。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按目标序列设计引物，Tm 相差 ≤5 °C，扩增片段一般 200–2000 bp，避免形成引物二聚体。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "引物 Tm 55–65 °C", value: "引物 Tm 55–65 °C" },
        { label: "片段 200–2000 bp", value: "片段 200–2000 bp" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "引物设计不当导致非特异扩增或二聚体", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "体系",
      title: "配制 PCR 反应体系",
      purpose: "提供完整扩增所需成分并保证各管一致。",
      summary: "冰上配制含 Taq DNA 聚合酶、dNTP 混合物、Mg²⁺、缓冲液、引物与模板的反应体系。",
      detail: "冰上配制含 Taq DNA 聚合酶、dNTP 混合物、Mg²⁺、缓冲液、引物与模板的反应体系。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "冰上配制含 Taq DNA 聚合酶、dNTP 混合物、Mg²⁺、缓冲液、引物与模板的反应体系。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "模板 10–100 ng", value: "模板 10–100 ng" },
        { label: "引物 0.2–0.5 µM", value: "引物 0.2–0.5 µM" },
        { label: "Mg²⁺ 1.5–2.5 mM", value: "Mg²⁺ 1.5–2.5 mM" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "酶或 dNTP 反复冻融导致活性下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "对照",
      title: "设置阴性与阳性对照",
      purpose: "监控污染与体系有效性。",
      summary: "设无模板对照（水代模板）和已知模板阳性对照，与样品同步扩增。",
      detail: "设无模板对照（水代模板）和已知模板阳性对照，与样品同步扩增。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "设无模板对照（水代模板）和已知模板阳性对照，与样品同步扩增。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "NTC 无模板对照", value: "NTC 无模板对照" },
        { label: "阳性对照", value: "阳性对照" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "无对照导致污染或失败无法判断", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "预变性",
      title: "预变性",
      purpose: "为循环扩增建立统一起点。",
      summary: "95 °C 预变性 2–5 min，使模板完全解链并激活热启动酶。",
      detail: "95 °C 预变性 2–5 min，使模板完全解链并激活热启动酶。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "95 °C 预变性 2–5 min，使模板完全解链并激活热启动酶。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "95 °C 2–5 min", value: "95 °C 2–5 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "预变性不足导致起始模板未完全解链", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "循环",
      title: "温度循环扩增",
      purpose: "指数扩增目标片段。",
      summary: "按 95 °C 30 s、55–65 °C 30 s、72 °C 30–60 s 进行 25–35 个循环。",
      detail: "按 95 °C 30 s、55–65 °C 30 s、72 °C 30–60 s 进行 25–35 个循环。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按 95 °C 30 s、55–65 °C 30 s、72 °C 30–60 s 进行 25–35 个循环。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "25–35 个循环", value: "25–35 个循环" },
        { label: "72 °C 约 1 kb/min", value: "72 °C 约 1 kb/min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "循环数过多产生非特异条带", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "延伸",
      title: "末次延伸",
      purpose: "保证产物末端完整，便于后续克隆。",
      summary: "72 °C 延伸 5–10 min，补齐未完全延伸的链，随后 4 °C 保存。",
      detail: "72 °C 延伸 5–10 min，补齐未完全延伸的链，随后 4 °C 保存。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "72 °C 延伸 5–10 min，补齐未完全延伸的链，随后 4 °C 保存。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "72 °C 5–10 min", value: "72 °C 5–10 min" },
        { label: "4 °C 保存", value: "4 °C 保存" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "省略末次延伸影响 TA 克隆", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "电泳",
      title: "琼脂糖凝胶检测",
      purpose: "判断产物的大小、产量与特异性。",
      summary: "取产物加 Loading Buffer 后上 1–2% 琼脂糖凝胶电泳，核酸染料染色成像。",
      detail: "取产物加 Loading Buffer 后上 1–2% 琼脂糖凝胶电泳，核酸染料染色成像。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "取产物加 Loading Buffer 后上 1–2% 琼脂糖凝胶电泳，核酸染料染色成像。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "1–2% 凝胶", value: "1–2% 凝胶" },
        { label: "100 V 约 30–60 min", value: "100 V 约 30–60 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "上样过量或电压过高导致条带弥散", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "判读",
      title: "结果判读与记录",
      purpose: "区分特异扩增、非特异扩增与污染。",
      summary: "对照 Marker 判断条带大小，确认 NTC 无带、阳性对照有带，记录并保存图像。",
      detail: "对照 Marker 判断条带大小，确认 NTC 无带、阳性对照有带，记录并保存图像。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "对照 Marker 判断条带大小，确认 NTC 无带、阳性对照有带，记录并保存图像。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "单一条带", value: "单一条带" },
        { label: "与预期大小一致", value: "与预期大小一致" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "NTC 有带提示污染，整批需复核", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "常规 PCR 扩增 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

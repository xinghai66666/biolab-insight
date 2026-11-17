'use strict';

module.exports = {
  id: "reverse_transcription",
  name: "逆转录 cDNA 合成",
  category: "分子生物学",
  short: "以 RNA 为模板、逆转录酶合成第一链 cDNA，作为 PCR 或 qPCR 模板",
  overview: {
    objective: '获得可用于克隆、检测或表达的核酸材料，并保证其完整性与纯度。',
    principle: "逆转录酶以 RNA 为模板、在引物引发下合成互补 DNA；Oligo(dT) 针对 mRNA 的 poly(A) 尾，随机引物覆盖全部 RNA。",
    application: "RT-PCR、RT-qPCR 与 cDNA 文库构建前的模板制备。",
    input: "高质量总 RNA（A260/A280 约 1.8–2.1）或 mRNA。",
    output: "单链 cDNA 产物，可直接用于 PCR/qPCR 或 -20 °C 保存。",
    duration: "约 1-2 h",
    yield: "不适用（以等量 RNA 反转录为参考）"
  },
  keySpecs: [
    { label: "RNA 投入量", value: "0.5–2 µg 总 RNA", note: "按试剂盒上限以内" },
    { label: "引物", value: "Oligo(dT) 或随机引物", note: "mRNA 选 Oligo(dT)，总 RNA 可用随机引物" },
    { label: "反转录温度", value: "42–50 °C，30–60 min", note: "按酶最适温度" },
    { label: "酶失活", value: "70–85 °C，5–15 min", note: "按说明书" },
    { label: "对照", value: "无逆转录酶对照（-RT）", note: "用于判断 gDNA 污染" }
  ],
  steps: [
    {
      no: 1,
      phase: "模板准备",
      title: "RNA 定量与去 DNA",
      purpose: "保证各样本投入一致并排除 gDNA 干扰。",
      summary: "测 RNA 浓度并按等量分装，必要时 DNase I 处理去除基因组 DNA。",
      detail: "测 RNA 浓度并按等量分装，必要时 DNase I 处理去除基因组 DNA。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "测 RNA 浓度并按等量分装，必要时 DNase I 处理去除基因组 DNA。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "RNA 0.5–2 µg", value: "RNA 0.5–2 µg" },
        { label: "DNase I 按需", value: "DNase I 按需" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "RNA 量不一致导致后续定量偏差", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "体系配制",
      title: "配制反转录体系",
      purpose: "提供引物与底物，保证反应体系一致。",
      summary: "在冰上加入 RNA、Oligo(dT) 引物或随机引物、dNTP 混合物与无核酸酶水，混匀后短暂离心。",
      detail: "在冰上加入 RNA、Oligo(dT) 引物或随机引物、dNTP 混合物与无核酸酶水，混匀后短暂离心。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "在冰上加入 RNA、Oligo(dT) 引物或随机引物、dNTP 混合物与无核酸酶水，混匀后短暂离心。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "引物 0.5–2 µM", value: "引物 0.5–2 µM" },
        { label: "dNTP 各 0.5 mM", value: "dNTP 各 0.5 mM" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "体系混匀不充分导致反转录效率差异", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "变性退火",
      title: "引物退火",
      purpose: "去除 RNA 二级结构，提高反转录效率。",
      summary: "70 °C 加热 5 min 后迅速冰浴 2 min，使 RNA 二级结构打开、引物结合。",
      detail: "70 °C 加热 5 min 后迅速冰浴 2 min，使 RNA 二级结构打开、引物结合。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "70 °C 加热 5 min 后迅速冰浴 2 min，使 RNA 二级结构打开、引物结合。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "70 °C 5 min", value: "70 °C 5 min" },
        { label: "冰浴 2 min", value: "冰浴 2 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "跳过变性导致高级结构区反转录不全", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "合成",
      title: "加入逆转录酶合成 cDNA",
      purpose: "由 RNA 模板生成稳定的 cDNA。",
      summary: "加入逆转录酶和缓冲液，42–50 °C 孵育 30–60 min 合成第一链 cDNA。",
      detail: "加入逆转录酶和缓冲液，42–50 °C 孵育 30–60 min 合成第一链 cDNA。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "加入逆转录酶和缓冲液，42–50 °C 孵育 30–60 min 合成第一链 cDNA。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "42–50 °C 30–60 min", value: "42–50 °C 30–60 min" },
        { label: "按酶最适温度", value: "按酶最适温度" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "温度偏离酶最适值导致产量低", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "失活",
      title: "酶失活终止反应",
      purpose: "防止酶继续作用影响下游定量。",
      summary: "70–85 °C 加热 5–15 min 使逆转录酶失活，终止反应。",
      detail: "70–85 °C 加热 5–15 min 使逆转录酶失活，终止反应。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "70–85 °C 加热 5–15 min 使逆转录酶失活，终止反应。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "70–85 °C 5–15 min", value: "70–85 °C 5–15 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "失活不充分可能干扰后续 PCR", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "对照",
      title: "设置 -RT 与阳性对照",
      purpose: "排查 gDNA 污染与试剂失效。",
      summary: "以无逆转录酶体系作 -RT 对照，另设已知模板阳性对照，与样品同步处理。",
      detail: "以无逆转录酶体系作 -RT 对照，另设已知模板阳性对照，与样品同步处理。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "以无逆转录酶体系作 -RT 对照，另设已知模板阳性对照，与样品同步处理。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "-RT 对照", value: "-RT 对照" },
        { label: "阳性对照", value: "阳性对照" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "遗漏对照导致假阳性无法解释", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "质检",
      title: "cDNA 质量检查",
      purpose: "确认 cDNA 可扩增且浓度合适。",
      summary: "用内参基因 PCR 或分光光度法评估 cDNA 可用性与浓度，必要时稀释。",
      detail: "用内参基因 PCR 或分光光度法评估 cDNA 可用性与浓度，必要时稀释。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用内参基因 PCR 或分光光度法评估 cDNA 可用性与浓度，必要时稀释。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "内参扩增", value: "内参扩增" },
        { label: "按需 1", value: "按需 1:5–1:20 稀释" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "cDNA 过量抑制 PCR 或浓度过低检出失败", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "保存",
      title: "分装与记录",
      purpose: "减少冻融并保证可追溯。",
      summary: "将 cDNA 分装，-20 °C 保存，记录 RNA 批次、反转录试剂盒、程序与对照结果。",
      detail: "将 cDNA 分装，-20 °C 保存，记录 RNA 批次、反转录试剂盒、程序与对照结果。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将 cDNA 分装，-20 °C 保存，记录 RNA 批次、反转录试剂盒、程序与对照结果。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "-20 °C 分装", value: "-20 °C 分装" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "反复冻融或记录缺失影响复现", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "逆转录 cDNA 合成 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

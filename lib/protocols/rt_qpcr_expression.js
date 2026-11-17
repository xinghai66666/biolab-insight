'use strict';

module.exports = {
  id: "rt_qpcr_expression",
  name: "RT-qPCR 基因表达分析",
  category: "分子生物学",
  short: "基于 cDNA 的实时荧光定量 PCR，用 ΔΔCt 法分析目标基因相对表达",
  overview: {
    principle: "在 qPCR 扩增中实时监测荧光，以稳定内参基因归一化，通过 ΔΔCt 计算处理组相对对照组的表达倍数；熔解曲线验证扩增特异性。",
    application: "基因敲低或过表达验证、信号通路活性比较与处理组表达差异分析。",
    input: "反转录得到的 cDNA、目标基因与内参基因的特异性引物。",
    output: "各样本相对表达量（倍数变化）及 Ct、熔解曲线、扩增效率等质控参数。",
    duration: "约 4-5 h（不含 RNA 提取与反转录）",
    yield: "不适用（相对定量分析型方法）"
  },
  keySpecs: [
    { label: "内参基因", value: "GAPDH、ACTB 等且处理间稳定", note: "需先验证稳定性" },
    { label: "扩增效率", value: "90–110%（斜率 -3.1 至 -3.6）", note: "用于效率校正 ΔΔCt" },
    { label: "标准曲线 R²", value: "≥0.99，至少 5 个稀释点", note: "评估线性与移液一致性" },
    { label: "熔解曲线", value: "单一峰", note: "排除引物二聚体与非特异峰" },
    { label: "复孔 Ct 差异", value: "<0.5", note: "技术重复一致性" },
    { label: "生物学重复", value: "≥3", note: "支撑统计检验" }
  ],
  steps: [
    {
      no: 1,
      phase: "内参确认",
      title: "内参基因筛选与验证",
      purpose: "内参稳定且无 gDNA 干扰是相对定量归一化的前提。",
      summary: "反转录前 RNA 必要时经 DNase I 处理去除 gDNA；选择 GAPDH、ACTB 等候选内参，用各样本 cDNA 检查 Ct 稳定性，必要时用多个内参几何平均。",
      detail: "反转录前 RNA 必要时经 DNase I 处理去除 gDNA；选择 GAPDH、ACTB 等候选内参，用各样本 cDNA 检查 Ct 稳定性，必要时用多个内参几何平均。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "反转录前 RNA 必要时经 DNase I 处理去除 gDNA",
        "选择 GAPDH、ACTB 等候选内参，用各样本 cDNA 检查 Ct 稳定性，必要时用多个内参几何平均。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "内参 Ct 各样本相差 <1", value: "内参 Ct 各样本相差 <1" },
        { label: "≥3 生物学重复", value: "≥3 生物学重复" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "内参受处理影响导致归一化错误", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "引物验证",
      title: "引物特异性与效率验证",
      purpose: "保证定量可靠且可用 ΔΔCt 法。",
      summary: "用梯度稀释 cDNA 做标准曲线与熔解曲线，确认效率 90–110%、单峰、无引物二聚体。",
      detail: "用梯度稀释 cDNA 做标准曲线与熔解曲线，确认效率 90–110%、单峰、无引物二聚体。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "用梯度稀释 cDNA 做标准曲线与熔解曲线，确认效率 90–110%、单峰、无引物二聚体。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "效率 90–110%", value: "效率 90–110%" },
        { label: "R² ≥0.99", value: "R² ≥0.99" },
        { label: "单一峰", value: "单一峰" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "效率不达标导致表达倍数失真", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "体系配制",
      title: "配制 qPCR 反应体系",
      purpose: "保证各孔一致并减少加样误差。",
      summary: "冰上配制 SYBR Green Master Mix、目标与内参引物及稀释后的 cDNA，每样本 2–3 个复孔。",
      detail: "冰上配制 SYBR Green Master Mix、目标与内参引物及稀释后的 cDNA，每样本 2–3 个复孔。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "冰上配制 SYBR Green Master Mix、目标与内参引物及稀释后的 cDNA，每样本 2–3 个复孔。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "cDNA 1", value: "cDNA 1:5–1:20 稀释" },
        { label: "复孔 2–3", value: "复孔 2–3" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "浓度过高或过低导致 Ct 不可靠", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "对照设置",
      title: "设置对照与参照样本",
      purpose: "排除污染、gDNA 与批间差异。",
      summary: "每板设 NTC、-RT、阳性对照与参照样本（对照组 cDNA），用于归一化基准。",
      detail: "每板设 NTC、-RT、阳性对照与参照样本（对照组 cDNA），用于归一化基准。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "每板设 NTC、-RT、阳性对照与参照样本（对照组 cDNA），用于归一化基准。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "NTC", value: "NTC" },
        { label: "-RT", value: "-RT" },
        { label: "参照样本", value: "参照样本" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "缺参照样本无法计算 ΔΔCt", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "上机",
      title: "上机扩增与熔解曲线",
      purpose: "采集荧光信号用于定量与特异性判断。",
      summary: "按 95 °C 预变性、40 个循环（95 °C 10 s、60 °C 30 s）扩增，末做 65–95 °C 熔解曲线。",
      detail: "按 95 °C 预变性、40 个循环（95 °C 10 s、60 °C 30 s）扩增，末做 65–95 °C 熔解曲线。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按 95 °C 预变性、40 个循环（95 °C 10 s、60 °C 30 s）扩增，末做 65–95 °C 熔解曲线。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "40 个循环", value: "40 个循环" },
        { label: "退火/延伸 60 °C 30 s", value: "退火/延伸 60 °C 30 s" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "孔位或程序设错导致数据错位", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "质控",
      title: "扩增数据质控",
      purpose: "先判定数据可用再解释表达量。",
      summary: "检查 NTC 无扩增、熔解曲线单峰、复孔 Ct 差异 <0.5、效率与 R² 达标后再计算。",
      detail: "检查 NTC 无扩增、熔解曲线单峰、复孔 Ct 差异 <0.5、效率与 R² 达标后再计算。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "检查 NTC 无扩增、熔解曲线单峰、复孔 Ct 差异 <0.5、效率与 R² 达标后再计算。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "NTC 无扩增", value: "NTC 无扩增" },
        { label: "复孔 Ct 差异 <0.5", value: "复孔 Ct 差异 <0.5" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "质控不合格仍继续分析得出错误结论", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "分析",
      title: "ΔΔCt 计算",
      purpose: "获得处理组相对对照组的表达变化。",
      summary: "按 ΔCt=Ct(目标)-Ct(内参)、ΔΔCt=ΔCt(处理)-ΔCt(对照)，计算 2 的负 ΔΔCt 次方作为相对表达倍数。",
      detail: "按 ΔCt=Ct(目标)-Ct(内参)、ΔΔCt=ΔCt(处理)-ΔCt(对照)，计算 2 的负 ΔΔCt 次方作为相对表达倍数。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按 ΔCt=Ct(目标)-Ct(内参)、ΔΔCt=ΔCt(处理)-ΔCt(对照)，计算 2 的负 ΔΔCt 次方作为相对表达倍数。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "相对表达倍数 = 2^(-ΔΔCt)", value: "相对表达倍数 = 2^(-ΔΔCt)" },
        { label: "可做效率校正", value: "可做效率校正" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "误用原始 Ct 直接比较导致结论错误", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "统计",
      title: "统计与记录",
      purpose: "保证结论有统计支撑且可追溯。",
      summary: "对 ≥3 生物学重复的相对表达量做统计检验，记录引物、效率、Ct 与计算方法。",
      detail: "对 ≥3 生物学重复的相对表达量做统计检验，记录引物、效率、Ct 与计算方法。。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "对 ≥3 生物学重复的相对表达量做统计检验，记录引物、效率、Ct 与计算方法。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "≥3 重复", value: "≥3 重复" },
        { label: "t 检验或方差分析", value: "t 检验或方差分析" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "重复数不足或缺失记录影响可信度", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "RT-qPCR 基因表达分析 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

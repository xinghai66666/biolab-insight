'use strict';

module.exports = {
  id: "crispr_gene_editing",
  name: "CRISPR/Cas9 基因编辑与验证",
  category: "分子生物学",
  short: "用 sgRNA 引导 Cas9 定点切割基因组，通过修复途径实现敲除或 knock-in，并验证编辑效果。",
  overview: {
    principle: "Cas9 在 sgRNA 引导下识别 PAM 并产生双链断裂，细胞通过易错修复（NHEJ）形成插入缺失导致移码敲除，或通过同源重组实现精确替换。",
    application: "细胞株基因敲除、报告基因敲入与功能基因验证。",
    input: "目标细胞、Cas9 蛋白或表达质粒、体外转录 sgRNA 与供体模板。",
    output: "编辑后的细胞池或单克隆，附编辑效率与序列验证结果。",
    duration: "约 2-4 周（含单克隆筛选）",
    yield: "池水平编辑效率典型 20-60%，单克隆需筛选验证"
  },
  keySpecs: [
    { label: "sgRNA 设计", value: "靶向 CDS 前段外显子", note: "降低逃逸概率" },
    { label: "递送方式", value: "RNP 电转或脂质体", note: "按细胞类型选择" },
    { label: "细胞活率", value: "电转后 24 h ≥70%", note: "评估毒性" },
    { label: "编辑效率", value: "≥20%（池水平）", note: "T7E1 或测序" },
    { label: "单克隆", value: "≥2 株双等位验证", note: "避免克隆偏倚" },
    { label: "脱靶", value: "预测位点抽检", note: "必要时做全基因组" }
  ],
  steps: [
    {
      no: 1,
      phase: "设计",
      title: "sgRNA 设计与筛选",
      purpose: "提高切割效率并降低脱靶风险。",
      summary: "在目标基因关键外显子设计 3-5 条 sgRNA，评估 on-target 评分与预测脱靶位点。",
      detail: "在目标基因关键外显子设计 3-5 条 sgRNA，评估 on-target 评分与预测脱靶位点。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "在目标基因关键外显子设计 3-5 条 sgRNA，评估 on-target 评分与预测脱靶位点。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "靶向 CDS 前 50%", value: "靶向 CDS 前 50%" },
        { label: "GC 40-70%", value: "GC 40-70%" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "仅用软件评分不做实测筛选", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 2,
      phase: "准备",
      title: "RNP 复合物组装",
      purpose: "预组装可提高切割效率并降低脱靶。",
      summary: "将 Cas9 蛋白与 sgRNA 按摩尔比 1:1.2 室温孵育 10-15 min 形成 RNP。",
      detail: "将 Cas9 蛋白与 sgRNA 按摩尔比 1:1.2 室温孵育 10-15 min 形成 RNP。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将 Cas9 蛋白与 sgRNA 按摩尔比 1:1.2 室温孵育 10-15 min 形成 RNP。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "Cas9", value: "Cas9:sgRNA = 1:1.2" },
        { label: "室温 10-15 min", value: "室温 10-15 min" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "RNP 放置过久导致活性下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 3,
      phase: "递送",
      title: "电转或脂质体递送",
      purpose: "使编辑工具进入细胞核。",
      summary: "按细胞类型选择电转程序，取对数生长期细胞与 RNP 混合后电转。",
      detail: "按细胞类型选择电转程序，取对数生长期细胞与 RNP 混合后电转。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "按细胞类型选择电转程序，取对数生长期细胞与 RNP 混合后电转。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "每 1×10⁵ 细胞约 10-20 pmol RNP", value: "每 1×10⁵ 细胞约 10-20 pmol RNP" },
        { label: "按程序电转", value: "按程序电转" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "细胞密度过高导致电转效率下降", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 4,
      phase: "恢复",
      title: "电转后恢复培养",
      purpose: "降低电转毒性带来的死亡。",
      summary: "电转后立即转入预温培养基，24 h 内不加筛选压力。",
      detail: "电转后立即转入预温培养基，24 h 内不加筛选压力。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "电转后立即转入预温培养基，24 h 内不加筛选压力。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "预温培养基", value: "预温培养基" },
        { label: "24 h 恢复", value: "24 h 恢复" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "电转后立即加抗生素导致大量死亡", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 5,
      phase: "效率",
      title: "池水平编辑效率检测",
      purpose: "判断是否值得进入单克隆筛选。",
      summary: "48-72 h 后提取基因组 DNA，做 T7E1 酶切或靶向扩增测序评估 indel 比例。",
      detail: "48-72 h 后提取基因组 DNA，做 T7E1 酶切或靶向扩增测序评估 indel 比例。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "48-72 h 后提取基因组 DNA，做 T7E1 酶切或靶向扩增测序评估 indel 比例。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "编辑效率 ≥20% 再继续", value: "编辑效率 ≥20% 再继续" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "效率过低仍直接铺板浪费周期", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 6,
      phase: "单克隆",
      title: "有限稀释铺板",
      purpose: "获得遗传背景一致的克隆。",
      summary: "将细胞稀释至 0.5 个/孔铺 96 孔板，2-3 周后挑取单克隆扩增。",
      detail: "将细胞稀释至 0.5 个/孔铺 96 孔板，2-3 周后挑取单克隆扩增。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "将细胞稀释至 0.5 个/孔铺 96 孔板，2-3 周后挑取单克隆扩增。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "0.5 细胞/孔", value: "0.5 细胞/孔" },
        { label: "2-3 周", value: "2-3 周" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "铺板密度过高导致克隆混合", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 7,
      phase: "验证",
      title: "单克隆基因型验证",
      purpose: "确认基因型与表型一致。",
      summary: "对克隆做靶向扩增测序，确认双等位敲除或精确定点，并检测蛋白表达缺失。",
      detail: "对克隆做靶向扩增测序，确认双等位敲除或精确定点，并检测蛋白表达缺失。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "对克隆做靶向扩增测序，确认双等位敲除或精确定点，并检测蛋白表达缺失。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "Sanger 或 NGS", value: "Sanger 或 NGS" },
        { label: "双等位验证", value: "双等位验证" },
        { label: "WB 确认", value: "WB 确认" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "仅测 PCR 产物大小未测序", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    },
    {
      no: 8,
      phase: "记录",
      title: "细胞库与数据归档",
      purpose: "保证可追溯与可重复。",
      summary: "记录 sgRNA 序列、递送参数、编辑效率与克隆基因型，建立编辑细胞库。",
      detail: "记录 sgRNA 序列、递送参数、编辑效率与克隆基因型，建立编辑细胞库。具体按本实验室 SOP 与设备说明书执行，记录实际条件与偏差。",
      substeps: [
        "记录 sgRNA 序列、递送参数、编辑效率与克隆基因型，建立编辑细胞库。",
        '记录本步起止时间、实际参数与操作人，留样并标记'
      ],
      params: [
        { label: "序列与参数完整", value: "序列与参数完整" },
        { label: "细胞库编号", value: "细胞库编号" }
      ],
      checkpoints: [
        '关键参数处于设定范围内，无异常报警',
        '步骤记录与留样完整，可追溯到样品与操作人'
      ],
      pitfalls: [
        { level: 'high', title: "缺少 sgRNA 序列无法复现", consequence: "结果偏差或实验失败", fix: '暂停操作，按 SOP 复核参数与步骤，纠正后重做或评估偏差影响' },
        { level: 'medium', title: '记录不完整或留样缺失', consequence: '结果无法追溯，异常时无法定位原因', fix: '完善记录模板必填项，及时留样并双人复核' }
      ]
    }
  ],
  references: [
    "CRISPR/Cas9 基因编辑与验证 通用实验 SOP",
    '公开药典指导原则与行业通用技术资料'
  ]
};

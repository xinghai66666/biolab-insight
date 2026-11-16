/**
 * 模拟演示数据（虚构）：全部实验记录、批号、操作人与日期均为程序生成的示例，
 * 并非任何真实实验的结果，仅用于展示智能体的总结与诊断推理流程。
 * 覆盖正常样本与若干典型异常场景。请勿将以下内容理解为真实实验数据。
 */

'use strict';

module.exports = [
  {
    type: 'cell_culture',
    title: 'CHO 种子细胞扩增 - 批次 C-2601',
    batch: 'C-2601',
    date: '2026-11-10',
    operator: '实验员 A',
    objective: '评估 CHO-K1 种子细胞在摇瓶扩增中的生长状态，为反应器接种提供依据。',
    metrics: {
      viability: [78, 80, 77],
      vcd: [1.6, 1.5, 1.7],
      doublingTime: 31,
      mycoplasma: '阴性',
      contamination: '阴性'
    },
    observations: '镜检可见部分细胞圆缩、碎片增多，培养基颜色偏黄，换液周期较标准延长 1 天。'
  },
  {
    type: 'protein_purification',
    title: '单抗 Protein A 亲和层析 - 批次 P-2603',
    batch: 'P-2603',
    date: '2026-11-11',
    operator: '实验员 B',
    objective: '对细胞培养上清进行 Protein A 亲和纯化，评估纯度与回收率。',
    metrics: {
      purity: 82,
      recovery: 55,
      endotoxin: 0.35,
      aggregation: 3.2,
      concentration: 12.4
    },
    observations: '洗脱峰较宽且拖尾，SEC 图谱显示主峰前出现杂峰，上样载量高于工艺验证值。'
  },
  {
    type: 'qpcr',
    title: '残留 DNA 检测 qPCR - 批次 Q-2612',
    batch: 'Q-2612',
    date: '2026-11-12',
    operator: '实验员 C',
    objective: '检测样品中宿主残留 DNA，验证检测体系有效性。',
    metrics: {
      efficiency: 94,
      r2: 0.996,
      ntcCt: 28,
      tm: 84,
      replicateCv: 2.1
    },
    observations: 'NTC 孔出现明显扩增曲线，熔解曲线与标准品一致，怀疑气溶胶污染。'
  },
  {
    type: 'elisa',
    title: '宿主细胞蛋白 HCP 检测 - 批次 E-2608',
    batch: 'E-2608',
    date: '2026-11-13',
    operator: '实验员 D',
    objective: '定量检测纯化样品中的宿主细胞蛋白残留。',
    metrics: {
      standardR2: 0.997,
      replicateCv: 18,
      blankOd: 0.04,
      recovery: 96
    },
    observations: '复孔间 OD 差异较大，个别孔边缘效应明显，孵育时未使用振荡。'
  },
  {
    type: 'western_blot',
    title: '目标蛋白表达验证 - 批次 W-2605',
    batch: 'W-2605',
    date: '2026-11-14',
    operator: '实验员 A',
    objective: '验证诱导表达后目标蛋白的表达水平。',
    metrics: {
      targetIntensity: 24500,
      loadingCv: 8,
      background: 180,
      bandCount: 2
    },
    observations: '目标条带下方可见一条较弱的非特异条带，内参均一性尚可。'
  },
  {
    type: 'sterility',
    title: '无菌检查 - 批次 S-2602',
    batch: 'S-2602',
    date: '2026-11-15',
    operator: '实验员 B',
    objective: '对成品进行无菌检查，确认检测体系有效与供试品无菌。',
    metrics: {
      negativeControl: '阴性',
      positiveControl: '阳性',
      sampleTube: '阴性',
      cultureDays: 14
    },
    observations: '对照结果符合规定，供试品管未见浑浊，培养满 14 天判读。'
  }
];

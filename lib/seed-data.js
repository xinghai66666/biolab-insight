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
    type: 'cell_culture',
    title: 'CHO 种子细胞扩增 - 批次 C-2602',
    batch: 'C-2602',
    date: '2026-11-13',
    operator: '实验员 A',
    objective: '评估换液周期调整后的细胞生长恢复情况。',
    metrics: {
      viability: [94, 95, 93],
      vcd: [3.0, 2.9, 3.1],
      doublingTime: 24,
      mycoplasma: '阴性',
      contamination: '阴性'
    },
    observations: '缩短换液周期至 2 天后，细胞形态恢复，碎片明显减少，密度增长平稳。'
  },
  {
    type: 'cell_culture',
    title: 'CHO 种子细胞扩增 - 批次 C-2603',
    batch: 'C-2603',
    date: '2026-11-14',
    operator: '实验员 A',
    objective: '确认培养条件稳定后种子细胞的生长一致性。',
    metrics: {
      viability: [91, 92, 90],
      vcd: [3.1, 3.2, 3.0],
      doublingTime: 25,
      mycoplasma: '阴性',
      contamination: '阴性'
    },
    observations: '生长参数与上一批接近，镜检形态正常。'
  },
  {
    type: 'protein_purification',
    title: 'His-tag 重组蛋白 Ni-NTA 纯化 - 批次 P-2603',
    batch: 'P-2603',
    date: '2026-11-11',
    operator: '实验员 B',
    objective: '对诱导表达后的菌体裂解上清进行 Ni-NTA 亲和纯化，评估纯度与回收率。',
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
    type: 'qpcr',
    title: '残留 DNA 检测 qPCR - 批次 Q-2613',
    batch: 'Q-2613',
    date: '2026-11-15',
    operator: '实验员 C',
    objective: '复测残留 DNA，确认分区操作后的污染是否消除。',
    metrics: {
      efficiency: 98,
      r2: 0.998,
      ntcCt: 40,
      tm: 84,
      replicateCv: 1.2
    },
    observations: '更换试剂与耗材并分区操作后，NTC 无扩增，标准曲线与样品复孔均正常。'
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
    type: 'elisa',
    title: '宿主细胞蛋白 HCP 检测 - 批次 E-2609',
    batch: 'E-2609',
    date: '2026-11-15',
    operator: '实验员 D',
    objective: '复测 HCP 残留，验证加样与孵育条件改进后的重复性。',
    metrics: {
      standardR2: 0.998,
      replicateCv: 6,
      blankOd: 0.03,
      recovery: 102
    },
    observations: '改用多道移液器按排加样并增加振荡孵育后，复孔 OD 一致，空白背景低。'
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
      targetBand: '检出',
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
  },
  {
    type: 'plasmid_prep',
    title: '无内毒素质粒小提 - 批次 PL-2611',
    batch: 'PL-2611',
    date: '2026-11-13',
    operator: '实验员 A',
    objective: '为细胞转染制备转染级质粒，评估产量、纯度与内毒素水平。',
    metrics: {
      concentration: 0.86,
      a260_280: 1.72,
      a260_230: 1.6,
      endotoxin: 0.06,
      supercoil: 88
    },
    observations: '洗脱后 1% 琼脂糖凝胶可见单一超螺旋条带，NanoDrop 测得 A260/230 偏低，怀疑漂洗不充分导致盐残留。'
  },
  {
    type: 'endotoxin',
    title: '注射用重组蛋白内毒素检查 - 批次 ET-2614',
    batch: 'ET-2614',
    date: '2026-11-14',
    operator: '实验员 C',
    objective: '按凝胶法检测原液内毒素，确认是否符合限值要求。',
    metrics: {
      endotoxin: 8.5,
      negativeControl: '阴性',
      positiveControl: '阳性',
      recovery: 38,
      ph: 7.2
    },
    observations: '供试品管凝胶明显凝固，阳性对照成立，但加标回收率偏低，提示基质干扰或稀释不足。'
  },
  {
    type: 'transformation',
    title: 'pET 载体热激转化 - 批次 TF-2609',
    batch: 'TF-2609',
    date: '2026-11-12',
    operator: '实验员 B',
    objective: '将 pET 重组质粒转化至 BL21(DE3)，评估转化效率与克隆质量。',
    metrics: {
      efficiency: [4200],
      colonyCount: [3],
      positiveRate: [40],
      controlPlate: '无菌落',
      recoveryTime: [30]
    },
    observations: '转化平板仅 3 个菌落，阴性对照平板无菌落；复查发现热激后未立即冰浴、复苏时间仅 30 min。'
  },
  {
    type: 'protein_a_chrom',
    title: '单抗 Protein A 捕获层析 - 批次 PA-2615',
    batch: 'PA-2615',
    date: '2026-11-15',
    operator: '实验员 B',
    objective: '对澄清收获液进行 Protein A 捕获，评估回收率、纯度与 HCP 清除能力。',
    metrics: {
      stepYield: 87,
      eluatePurity: 96.5,
      loading: 42,
      elutionPh: 3.6,
      hcpLrv: 2.1
    },
    observations: '洗脱峰对称，收集后 5 min 内完成中和，pH 6.2；SEC 主峰前后杂质峰低。'
  },
  {
    type: 'sec_hplc',
    title: '中间品 SEC-HPLC 纯度检测 - 批次 SEC-2616',
    batch: 'SEC-2616',
    date: '2026-11-15',
    operator: '实验员 D',
    objective: '检测精纯后样品的单体纯度与聚集体水平，评估批间一致性。',
    metrics: {
      monomer: 93.6,
      aggregate: 5.8,
      fragment: 0.6,
      columnRecovery: 97,
      retentionCv: 1.1
    },
    observations: '主峰前聚集体峰较上批略增高，保留时间稳定；样品曾在室温放置约 4 h 后检测。'
  },
  {
    type: 'sec_hplc',
    title: '中间品 SEC-HPLC 纯度检测 - 批次 SEC-2617',
    batch: 'SEC-2617',
    date: '2026-11-16',
    operator: '实验员 D',
    objective: '缩短室温放置时间后复测聚集体水平，确认是否为操作引入。',
    metrics: {
      monomer: 96.9,
      aggregate: 2.4,
      fragment: 0.5,
      columnRecovery: 99,
      retentionCv: 0.9
    },
    observations: '样品采集后 30 min 内检测，聚集体回落至 2.4%，主峰对称。'
  },
  {
    type: 'hcp_elisa',
    title: 'HCP 残留 ELISA 检测 - 批次 HCP-2607',
    batch: 'HCP-2607',
    date: '2026-11-14',
    operator: '实验员 D',
    objective: '定量检测精纯样品宿主细胞蛋白残留，确认符合限值要求。',
    metrics: {
      hcp: 45,
      recovery: 92,
      standardR2: 0.995,
      wellCv: 8,
      blankOd: 0.05
    },
    observations: '标准曲线梯度良好，复孔 OD 接近，空白背景低。'
  },
  {
    type: 'microbial_limit',
    title: '中间品微生物限度检查 - 批次 ML-2610',
    batch: 'ML-2610',
    date: '2026-11-13',
    operator: '实验员 C',
    objective: '检测中间品需氧菌、霉菌酵母总数与控制菌，确认微生物负载符合限度。',
    metrics: {
      tmac: 25,
      tymc: 2,
      specified: '未检出',
      negativeControl: '阴性',
      methodRecovery: 85
    },
    observations: 'TSA 平板菌落形态单一、数量少，SDA 未见霉菌生长，控制菌分离平板无典型菌落。'
  },
  {
    type: 'ce_sds',
    title: 'CE-SDS 纯度分析 - 批次 CE-2613',
    batch: 'CE-2613',
    date: '2026-11-12',
    operator: '实验员 D',
    objective: '测定样品还原与非还原纯度，评估片段化与聚集体水平。',
    metrics: {
      nrPurity: 94.2,
      rPurity: 96.5,
      fragment: 4.8,
      migrationCv: 3.1,
      current: 32
    },
    observations: '非还原图谱主峰前可见小肩峰，还原图谱重链与轻链比例正常；样品为冻融一次后检测。'
  },
  {
    type: 'uf_diafiltration',
    title: '精纯样品超滤浓缩与换液 - 批次 UF-2617',
    batch: 'UF-2617',
    date: '2026-11-16',
    operator: '实验员 B',
    objective: '将精纯样品浓缩至目标浓度并置换至制剂缓冲液。',
    metrics: {
      concentrationFactor: 10,
      recovery: 94,
      tmp: 1.1,
      flux: 38,
      diavolumes: 7
    },
    observations: '通量平稳，跨膜压在设定范围；终洗后回收率符合预期，透过液电导与透析液一致。'
  },
  {
    type: 'environmental_monitoring',
    title: 'B 级洁净区环境监测 - 批次 EM-2618',
    batch: 'EM-2618',
    date: '2026-11-16',
    operator: '实验员 C',
    objective: '监测灌装间沉降菌、浮游菌、表面与人员微生物，评估环境控制状态。',
    metrics: {
      settlePlate: 2,
      airborne: 12,
      surface: 3,
      personnel: 2,
      pressureDiff: 15
    },
    observations: '回风口附近沉降平板各长 1 个菌落，浮游菌采样点菌落略高于近期均值，压差稳定。'
  },
  {
    type: 'endotoxin_kinetic',
    title: '原液内毒素动态浊度法检测 - 批次 EK-2619',
    batch: 'EK-2619',
    date: '2026-11-16',
    operator: '实验员 C',
    objective: '定量检测原液内毒素含量，确认低于限值且方法无干扰。',
    metrics: {
      endotoxin: 0.18,
      recovery: 88,
      cv: 6,
      r2: 0.994
    },
    observations: '标准曲线线性良好，样品反应时间落在曲线中段，复孔平行。'
  },
  {
    type: 'cell_culture',
    title: 'CHO 种子细胞扩增 - 批次 C-2604',
    batch: 'C-2604',
    date: '2026-11-16',
    operator: '实验员 A',
    objective: '为反应器接种准备种子细胞，评估密度是否达标。',
    metrics: {
      viability: [90, 89, 91],
      vcd: [5.6, 5.4, 5.7],
      doublingTime: 27,
      mycoplasma: '阴性',
      contamination: '阴性'
    },
    observations: '活细胞密度较近几批明显升高，倍增时间略延长；操作记录显示本批接种密度上调、培养时间延长。'
  }
];

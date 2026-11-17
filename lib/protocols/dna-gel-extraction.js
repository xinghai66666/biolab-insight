'use strict';

module.exports = {
  id: 'dna_gel_extraction',
  name: '琼脂糖凝胶 DNA 回收',
  category: '分子生物学 · DNA 回收',
  short: '切胶、溶胶、吸附柱纯化，回收目的 DNA 片段',
  overview: {
    objective: '从凝胶中回收目标 DNA 片段，用于克隆、测序或后续酶切。',
    principle: '琼脂糖凝胶电泳分离 DNA 片段后，切下目标条带，在离液盐条件下溶解凝胶，DNA 选择性吸附到硅胶膜，经洗涤和低盐洗脱获得纯化片段。',
    application: 'PCR 产物纯化、酶切片段回收、克隆构建和测序样品制备。',
    input: '含目的 DNA 条带的琼脂糖凝胶',
    output: '纯化的 DNA 片段溶液',
    duration: '约 30–45 min',
    yield: '回收率通常 60–90%，取决于片段大小和操作'
  },
  keySpecs: [
    { label: '凝胶浓度', value: '0.8–1.5%', note: '按片段大小选择' },
    { label: '洗脱体积', value: '20–30 µL', note: '体积越小浓度越高' },
    { label: 'A260/A280', value: '1.8–2.0', note: '评估蛋白/酚残留' },
    { label: '片段完整性', value: '单一预期条带', note: '电泳复查' }
  ],
  steps: [
    {
      no: 1,
      phase: '电泳',
      title: '电泳与切胶',
      purpose: '将目的片段与其他条带分离，尽量缩短紫外暴露。',
      summary: '用合适浓度琼脂糖凝胶电泳，紫外下快速切下目的条带，尽量去除多余凝胶。',
      detail: '根据片段大小选择 0.8–1.5% 琼脂糖凝胶，电泳至条带分离；在紫外透射仪上快速切下目的条带，装入干净离心管并称重。',
      substeps: [
        '按片段大小选择凝胶浓度，上样并电泳至条带分离。',
        '紫外下快速定位目的条带，减少照射时间。',
        '用干净刀片切下目的条带，尽量去除多余凝胶。',
        '将胶块装入离心管，称重并记录。'
      ],
      params: [
        { label: '凝胶浓度', value: '0.8–1.5%' },
        { label: '紫外暴露', value: '尽量短' },
        { label: '胶块', value: '去除多余凝胶' }
      ],
      checkpoints: [
        '目的条带单一、位置正确。',
        '胶块无多余高背景凝胶。'
      ],
      pitfalls: [
        { level: 'high', title: '紫外照射时间过长', consequence: 'DNA 产生嘧啶二聚体、断裂，克隆效率下降', fix: '快速切胶，使用较低紫外强度或蓝光成像' },
        { level: 'medium', title: '切下多余凝胶', consequence: '溶胶不完全，回收率下降', fix: '尽量只切目的条带，去除边缘多余胶' }
      ]
    },
    {
      no: 2,
      phase: '溶胶',
      title: '称重与溶胶',
      purpose: '使 DNA 从琼脂糖网络中释放，便于吸附。',
      summary: '按胶块重量加入结合缓冲液，50–60 °C 溶胶 10 min，期间涡旋。',
      detail: '按试剂盒比例加入结合缓冲液（常见 1:1 或 1:3），50–60 °C 水浴 10 min，每 2–3 min 涡旋一次，直至胶块完全溶解。',
      substeps: [
        '按胶块重量加入规定体积的结合缓冲液。',
        '50–60 °C 水浴加热 10 min。',
        '每 2–3 min 涡旋一次，直至无胶块。',
        '检查溶液澄清，无未溶胶颗粒。'
      ],
      params: [
        { label: '结合缓冲液', value: '按胶重比例' },
        { label: '溶胶温度', value: '50–60 °C' },
        { label: '溶胶时间', value: '约 10 min' }
      ],
      checkpoints: [
        '胶块完全溶解，溶液澄清。',
        '无可见凝胶颗粒。'
      ],
      pitfalls: [
        { level: 'high', title: '溶胶不彻底', consequence: 'DNA 被包裹，回收率低', fix: '延长溶胶时间并涡旋，确保无胶块' },
        { level: 'medium', title: '结合缓冲液比例错误', consequence: 'DNA 吸附效率低', fix: '按胶重和说明书准确加入' }
      ]
    },
    {
      no: 3,
      phase: '吸附',
      title: '上柱结合',
      purpose: '在高盐条件下使 DNA 吸附到硅胶膜。',
      summary: '将溶胶液转入吸附柱，12,000 g 离心 1 min，弃流出液。',
      detail: '将溶胶液转入吸附柱，室温静置 1–2 min，12,000 g 离心 1 min，弃流出液；体积超过柱容量时分次上柱。',
      substeps: [
        '将溶胶液转入吸附柱，避免转入气泡。',
        '室温静置 1–2 min，使 DNA 充分接触膜。',
        '12,000 g 离心 1 min，弃流出液。',
        '体积过大时分次上柱。'
      ],
      params: [
        { label: '离心', value: '12,000 g，1 min' },
        { label: '静置', value: '室温 1–2 min' },
        { label: '柱容量', value: '按说明书' }
      ],
      checkpoints: [
        '柱膜无堵塞。',
        '流出液无明显颜色。'
      ],
      pitfalls: [
        { level: 'medium', title: '上柱体积超过柱容量', consequence: 'DNA 流失，回收率下降', fix: '分次上柱，按柱容量操作' },
        { level: 'low', title: '未静置直接离心', consequence: '结合不充分', fix: '上柱后静置 1–2 min' }
      ]
    },
    {
      no: 4,
      phase: '洗涤',
      title: '洗涤去杂',
      purpose: '去除盐、琼脂糖残渣和蛋白。',
      summary: '加入含乙醇的洗涤液，12,000 g 离心 1 min，重复 1–2 次。',
      detail: '加入洗涤液（使用前确认已加乙醇），12,000 g 离心 1 min，弃流出液；重复一次。',
      substeps: [
        '确认洗涤液已按说明书加入乙醇。',
        '加入洗涤液，12,000 g 离心 1 min，弃液。',
        '重复洗涤一次。',
        '弃净流出液，避免乙醇残留。'
      ],
      params: [
        { label: '洗涤次数', value: '2 次' },
        { label: '离心', value: '12,000 g，1 min' },
        { label: '洗涤液', value: '含乙醇' }
      ],
      checkpoints: [
        '流出液无明显颜色。',
        '洗涤液已加乙醇。'
      ],
      pitfalls: [
        { level: 'high', title: '洗涤液未加乙醇', consequence: '盐残留，影响下游酶切/连接', fix: '首次使用前按标注加入无水乙醇' },
        { level: 'medium', title: '洗涤次数不足', consequence: '盐和琼脂糖残留', fix: '按说明完成 2 次洗涤' }
      ]
    },
    {
      no: 5,
      phase: '干燥',
      title: '空柱干燥',
      purpose: '去除残留乙醇，避免抑制下游反应。',
      summary: '空柱 12,000 g 离心 2 min，室温晾 2–3 min。',
      detail: '弃净流出液后，空柱 12,000 g 离心 2 min，开盖室温晾 2–3 min，避免乙醇残留。',
      substeps: [
        '将柱子放回收集管，空柱离心 2 min。',
        '开盖室温晾 2–3 min。',
        '避免过度干燥导致膜干裂。',
        '准备洗脱。'
      ],
      params: [
        { label: '空柱离心', value: '12,000 g，2 min' },
        { label: '晾干', value: '室温 2–3 min' },
        { label: '避免', value: '过度干燥' }
      ],
      checkpoints: [
        '无明显乙醇气味。',
        '柱膜不干裂。'
      ],
      pitfalls: [
        { level: 'high', title: '乙醇残留', consequence: '抑制酶切、连接和测序', fix: '空柱离心并晾干，确认无乙醇味' },
        { level: 'low', title: '过度干燥', consequence: 'DNA 难洗脱', fix: '晾 2–3 min 即可，避免高温' }
      ]
    },
    {
      no: 6,
      phase: '洗脱',
      title: '洗脱 DNA',
      purpose: '在低盐条件下将 DNA 从膜上释放。',
      summary: '加 20–30 µL EB 到膜中央，室温静置 2 min，12,000 g 离心 1 min。',
      detail: '将柱子放入新离心管，加 20–30 µL EB（pH 8.0–8.5）到膜中央，室温静置 2 min，12,000 g 离心 1 min；可二次洗脱提高产量。',
      substeps: [
        '将柱子转入新离心管。',
        '加 20–30 µL EB 到膜中央，避免触碰膜。',
        '室温静置 2 min。',
        '12,000 g 离心 1 min，收集洗脱液。'
      ],
      params: [
        { label: '洗脱体积', value: '20–30 µL' },
        { label: '静置', value: '室温 2 min' },
        { label: '离心', value: '12,000 g，1 min' }
      ],
      checkpoints: [
        '洗脱液澄清。',
        '回收体积符合预期。'
      ],
      pitfalls: [
        { level: 'medium', title: '洗脱体积过大', consequence: '浓度偏低', fix: '按下游需求选择 20–30 µL' },
        { level: 'medium', title: 'EB pH 偏低', consequence: '洗脱效率下降', fix: '使用 pH 8.0–8.5 的 EB' }
      ]
    },
    {
      no: 7,
      phase: '检测',
      title: '浓度与完整性检测',
      purpose: '确认回收量和片段完整性，满足下游要求。',
      summary: 'NanoDrop/Qubit 测浓度，琼脂糖凝胶电泳复查条带。',
      detail: '用 NanoDrop 或 Qubit 测浓度和 A260/A280，取少量电泳复查片段大小和完整性；记录回收率。',
      substeps: [
        'NanoDrop 或 Qubit 测定浓度和 A260/A280。',
        '取少量样品电泳复查条带。',
        '计算回收率并记录。',
        '按下游实验要求分装保存。'
      ],
      params: [
        { label: '浓度检测', value: 'NanoDrop / Qubit' },
        { label: '纯度', value: 'A260/A280 1.8–2.0' },
        { label: '完整性', value: '电泳复查' }
      ],
      checkpoints: [
        '浓度满足下游需求。',
        '条带大小正确、无明显降解。'
      ],
      pitfalls: [
        { level: 'medium', title: '回收率过低', consequence: '下游克隆/测序失败', fix: '检查溶胶、结合和洗脱步骤，减少紫外暴露' },
        { level: 'low', title: '未复查完整性', consequence: '片段断裂未被发现', fix: '电泳复查目的条带' }
      ]
    }
  ],
  references: [
    '琼脂糖凝胶 DNA 回收试剂盒通用说明书',
    '分子克隆实验指南中的胶回收与乙醇沉淀方法',
    'DNA 定量与琼脂糖电泳标准方法'
  ]
};

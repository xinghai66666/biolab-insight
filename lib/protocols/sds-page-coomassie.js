'use strict';

module.exports = {
  id: 'sds_page_coomassie',
  name: 'SDS-PAGE 与考马斯亮蓝染色',
  category: '蛋白科学 · 电泳',
  short: '变性聚丙烯酰胺凝胶电泳分离蛋白，考马斯亮蓝染色评估纯度与分子量',
  overview: {
    principle: 'SDS 使蛋白变性并带负电，蛋白在聚丙烯酰胺凝胶中按分子量分离；考马斯亮蓝与蛋白结合，经脱色后显示条带。',
    application: '重组蛋白表达分析、纯化组分纯度评估、分子量确认和蛋白降解检查。',
    input: '蛋白样品（裂解液、纯化组分或洗脱峰）',
    output: '显示蛋白条带的凝胶或成像图',
    duration: '约 3–5 h（含配胶、电泳、染色）',
    yield: '定性/半定量分析，检测限约 0.1–1 µg/条带'
  },
  keySpecs: [
    { label: '分离胶浓度', value: '10–12%', note: '按目标蛋白分子量选择' },
    { label: '上样量', value: '10–40 µg/孔', note: '纯度分析可按需调整' },
    { label: '电泳条件', value: '80 V 浓缩，120 V 分离', note: '按凝胶尺寸调整' },
    { label: '染色', value: '考马斯亮蓝 0.1%', note: '染色 30–60 min' }
  ],
  steps: [
    {
      no: 1,
      phase: '配胶',
      title: '配制分离胶与浓缩胶',
      purpose: '形成孔径梯度，使蛋白在浓缩胶中聚焦、在分离胶中按分子量分离。',
      summary: '按目标分子量配制 10–12% 分离胶和 4% 浓缩胶，确保聚合完全、无气泡。',
      detail: '按配方配制分离胶，加入 APS 和 TEMED 后灌胶，覆盖水或异丙醇；聚合后弃覆盖层，配制浓缩胶并插入梳子。',
      substeps: [
        '按目标蛋白分子量选择分离胶浓度，配制分离胶溶液。',
        '加入 APS 和 TEMED，混匀后灌入胶板，避免气泡。',
        '覆盖水或异丙醇，室温聚合 30–60 min。',
        '弃覆盖层，配制浓缩胶，插入梳子并聚合。'
      ],
      params: [
        { label: '分离胶', value: '10–12%' },
        { label: '浓缩胶', value: '4%' },
        { label: '聚合', value: '室温 30–60 min' }
      ],
      checkpoints: [
        '分离胶与浓缩胶界面清晰。',
        '梳孔完整，无气泡或碎胶。'
      ],
      pitfalls: [
        { level: 'medium', title: '凝胶未完全聚合', consequence: '条带歪斜、分辨率下降', fix: '确认 APS 新鲜、TEMED 有效，延长聚合时间' },
        { level: 'low', title: '灌胶产生气泡', consequence: '条带畸变或漏样', fix: '缓慢灌胶，覆盖层轻柔加入' }
      ]
    },
    {
      no: 2,
      phase: '样品',
      title: '样品准备与变性',
      purpose: '使蛋白充分变性并带上 SDS，保证按分子量分离。',
      summary: '按比例加入还原型上样缓冲液，95 °C 加热 5 min，短暂离心。',
      detail: '将蛋白样品与还原型 Loading Buffer 按比例混合，95 °C 加热 5 min；冷却后短暂离心，取上清上样。',
      substeps: [
        '测定蛋白浓度，计算上样体积。',
        '按比例加入还原型 Loading Buffer。',
        '95 °C 加热 5 min，使蛋白充分变性。',
        '冷却后短暂离心，避免取到沉淀。'
      ],
      params: [
        { label: '上样缓冲液', value: '还原型 Loading Buffer' },
        { label: '变性温度', value: '95 °C，5 min' },
        { label: '上样量', value: '10–40 µg/孔' }
      ],
      checkpoints: [
        '样品体积一致，浓度已记录。',
        '变性后样品无明显沉淀。'
      ],
      pitfalls: [
        { level: 'medium', title: '变性不充分', consequence: '蛋白聚集、条带异常或拖尾', fix: '95 °C 加热 5 min，还原剂按说明书加入' },
        { level: 'low', title: '上样量差异过大', consequence: '条带强度无法比较', fix: '按同一总蛋白量上样，记录体积' }
      ]
    },
    {
      no: 3,
      phase: '电泳',
      title: '上样与电泳',
      purpose: '使蛋白进入凝胶并按分子量分离。',
      summary: '上样 Marker 和样品，80 V 浓缩至分离胶，再 120 V 分离至溴酚蓝到达底部。',
      detail: '加入 1× Tris-Glycine SDS 电泳缓冲液，先上 Marker 和样品；80 V 运行至样品进入分离胶，调至 120 V，至指示染料接近底部。',
      substeps: [
        '安装胶板，加入 1× 电泳缓冲液，排除气泡。',
        '上样 DNA/蛋白 Marker 和样品，记录上样顺序。',
        '80 V 运行至样品进入分离胶。',
        '调至 120 V，至指示染料接近底部时停止。'
      ],
      params: [
        { label: '电泳缓冲液', value: '1× Tris-Glycine SDS' },
        { label: '电压', value: '80 V → 120 V' },
        { label: '终点', value: '指示染料接近底部' }
      ],
      checkpoints: [
        'Marker 条带分离清晰。',
        '样品条带无歪斜、无漏样。'
      ],
      pitfalls: [
        { level: 'medium', title: '电压过高或电泳过热', consequence: '条带扩散、凝胶变形', fix: '按推荐电压运行，必要时冰浴或降低电压' },
        { level: 'high', title: '漏样或串孔', consequence: '样品交叉污染，结果误判', fix: '确认梳孔完整、上样缓慢，避免刺破胶底' }
      ]
    },
    {
      no: 4,
      phase: '固定',
      title: '拆胶与固定',
      purpose: '去除 SDS 和电泳缓冲液成分，固定蛋白以减少扩散。',
      summary: '拆胶后用固定液（甲醇/乙酸）固定 30 min。',
      detail: '小心拆开胶板，切除浓缩胶和边缘，放入固定液（如 40% 甲醇 + 10% 乙酸）中固定 30 min。',
      substeps: [
        '小心撬开胶板，避免撕裂凝胶。',
        '切除浓缩胶和不需要的边缘。',
        '放入固定液，室温摇动 30 min。',
        '固定后弃固定液，准备染色。'
      ],
      params: [
        { label: '固定液', value: '甲醇/乙酸体系' },
        { label: '固定时间', value: '30 min' },
        { label: '操作', value: '室温轻柔摇动' }
      ],
      checkpoints: [
        '凝胶完整，无撕裂。',
        '固定后条带无明显扩散。'
      ],
      pitfalls: [
        { level: 'low', title: '拆胶撕裂', consequence: '条带缺失或变形', fix: '用塑料铲轻柔撬开，保持凝胶湿润' },
        { level: 'medium', title: '固定时间不足', consequence: '小分子蛋白扩散，条带模糊', fix: '至少固定 30 min，低分子量蛋白可延长' }
      ]
    },
    {
      no: 5,
      phase: '染色',
      title: '考马斯亮蓝染色',
      purpose: '使蛋白条带显色，便于观察和拍照。',
      summary: '用 0.1% 考马斯亮蓝染色液室温染色 30–60 min。',
      detail: '将凝胶浸入 0.1% 考马斯亮蓝染色液，室温摇动 30–60 min；染色时间按凝胶厚度和蛋白量调整。',
      substeps: [
        '加入 0.1% 考马斯亮蓝染色液，确保覆盖凝胶。',
        '室温轻柔摇动 30–60 min。',
        '回收染色液，准备脱色。',
        '避免染色液溅到皮肤或衣物。'
      ],
      params: [
        { label: '染色液', value: '0.1% 考马斯亮蓝' },
        { label: '染色时间', value: '30–60 min' },
        { label: '温度', value: '室温' }
      ],
      checkpoints: [
        '凝胶整体均匀着色。',
        '条带位置可见。'
      ],
      pitfalls: [
        { level: 'low', title: '染色时间过长', consequence: '背景过深，弱带难分辨', fix: '按凝胶厚度控制时间，必要时缩短' },
        { level: 'medium', title: '染色液重复使用过度', consequence: '灵敏度下降', fix: '按实验室规定更换染色液' }
      ]
    },
    {
      no: 6,
      phase: '脱色',
      title: '脱色与背景处理',
      purpose: '去除凝胶背景染色，使蛋白条带清晰可见。',
      summary: '用脱色液多次更换，脱至背景清晰、条带对比良好。',
      detail: '加入脱色液（如 40% 甲醇 + 10% 乙酸），室温摇动，多次更换至背景清晰；避免脱色过度导致弱带消失。',
      substeps: [
        '加入脱色液，室温摇动 10–20 min。',
        '更换脱色液 2–3 次，直至背景清晰。',
        '观察条带对比，避免过度脱色。',
        '将凝胶保存在水中或拍照。'
      ],
      params: [
        { label: '脱色液', value: '甲醇/乙酸体系' },
        { label: '更换次数', value: '2–3 次' },
        { label: '脱色终点', value: '背景清晰、条带可辨' }
      ],
      checkpoints: [
        '背景干净，条带清晰。',
        '弱条带仍可见。'
      ],
      pitfalls: [
        { level: 'medium', title: '脱色过度', consequence: '弱条带消失，纯度判断偏差', fix: '分次短时脱色，随时观察' },
        { level: 'low', title: '脱色液未更换', consequence: '背景残留，成像对比差', fix: '及时更换脱色液' }
      ]
    },
    {
      no: 7,
      phase: '分析',
      title: '成像与结果判读',
      purpose: '记录条带位置和强度，评估分子量、纯度与降解。',
      summary: '凝胶成像，比较目标条带与 Marker，评估纯度、降解和上样一致性。',
      detail: '用凝胶成像仪拍照，比较目标条带与 Marker 的分子量；观察杂带、降解带和上样一致性，必要时做半定量分析。',
      substeps: [
        '将凝胶放入成像仪，调整曝光避免过曝。',
        '保存原始图像，标记样品顺序和 Marker。',
        '比较目标条带分子量与预期值。',
        '评估杂带、降解带和上样一致性，记录结论。'
      ],
      params: [
        { label: '成像', value: '凝胶成像仪' },
        { label: '分子量', value: '对照 Marker' },
        { label: '分析', value: '纯度/降解/上样一致性' }
      ],
      checkpoints: [
        '目标条带位置与预期分子量一致。',
        '图像未过曝，条带可定量。'
      ],
      pitfalls: [
        { level: 'medium', title: '成像过曝', consequence: '条带融合，无法判断纯度', fix: '调整曝光时间，保留原始图像' },
        { level: 'low', title: '上样顺序记录错误', consequence: '结果对应错误样品', fix: '上样时同步记录顺序，成像图标注样品名' }
      ]
    }
  ],
  references: [
    'SDS-PAGE 蛋白电泳通用 SOP',
    '考马斯亮蓝染色与脱色标准方法',
    '蛋白纯度分析与分子量标记使用说明'
  ]
};

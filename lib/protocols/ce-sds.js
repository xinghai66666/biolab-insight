'use strict';

module.exports = {
  id: 'ce_sds',
  name: 'CE-SDS 毛细管电泳纯度分析',
  category: '分析检测 · 电泳纯度',
  short: 'SDS 毛细管凝胶电泳分离蛋白片段与聚集体，测定还原/非还原纯度',
  overview: {
    objective: '测定还原与非还原纯度，评估片段化、聚集与二硫键完整性。',
    principle: 'SDS 与蛋白结合使分子带负电，在毛细管凝胶中按分子量分离；非还原条件反映完整 IgG 与聚集体，还原条件断裂二硫键后分离重链与轻链。',
    application: '抗体纯度放行、片段与聚集体分析、批间一致性比较。',
    input: '纯化后样品（≥1 mg/mL），CE-SDS 试剂盒',
    output: '非还原纯度、还原纯度、片段与聚集体百分比',
    duration: '约 60–120 min（含样品制备与冲洗）',
    yield: '不适用（分析型方法）'
  },
  keySpecs: [
    { label: '毛细管', value: '裸熔融石英，内径 50 µm，有效长度 20–30 cm', note: '按仪器与试剂盒匹配' },
    { label: '分离电压', value: '15–25 kV，反向极性', note: '按方法设定' },
    { label: '柱温', value: '20–25 °C', note: '温度波动影响迁移时间' },
    { label: '样品浓度', value: '1–5 mg/mL', note: '过浓导致峰展宽' },
    { label: '非还原纯度', value: '≥95%', note: '按品种标准，通用参考' },
    { label: '迁移时间 CV', value: '≤5%', note: '系统适用性指标' }
  ],
  steps: [
    {
      no: 1,
      phase: '准备',
      title: '试剂与毛细管准备',
      purpose: '保证分离体系稳定，避免气泡与凝胶不均。',
      summary: '试剂盒平衡至室温，凝胶缓冲液灌注毛细管并预电泳平衡。',
      detail: '取出 CE-SDS 试剂盒平衡至室温，检查凝胶有无气泡；按仪器程序灌注凝胶、安装毛细管并做预电泳（如 15 kV 10 min）使基线稳定。',
      substeps: [
        '试剂盒平衡至室温，检查有效期。',
        '配制样品缓冲液与清洗液。',
        '安装毛细管并灌注凝胶。',
        '预电泳平衡至基线稳定。'
      ],
      params: [
        { label: '平衡温度', value: '室温' },
        { label: '预电泳', value: '15 kV，5–10 min' },
        { label: '凝胶', value: '按试剂盒，避免气泡' }
      ],
      checkpoints: [
        '毛细管无气泡、无断裂。',
        '预电泳电流稳定。'
      ],
      pitfalls: [
        { level: 'high', title: '凝胶中存在气泡', consequence: '电流中断、峰形异常', fix: '重新灌注并排气' },
        { level: 'medium', title: '毛细管窗口污染', consequence: '信号弱、基线噪声大', fix: '清洁检测窗口或更换毛细管' }
      ]
    },
    {
      no: 2,
      phase: '样品',
      title: '样品制备（还原与非还原）',
      purpose: '使蛋白充分变性并按分子量分离，减少人为聚集。',
      summary: '非还原样加 SDS 缓冲液；还原样另加 DTT 或 β-巯基乙醇，按设定温度加热。',
      detail: '非还原样：样品与 SDS 样品缓冲液按比例混合（终浓度 1–5 mg/mL），可加烷化剂防止再氧化；还原样：另加 50–100 mM DTT，沸水浴或 60–70 °C 加热 5–10 min，冷却后离心去泡。',
      substeps: [
        '按浓度计算样品与缓冲液体积。',
        '非还原样混匀，必要时加烷化剂。',
        '还原样加 DTT 或 β-巯基乙醇。',
        '按设定温度加热变性，冷却离心。',
        '标记样品并在规定时间内进样。'
      ],
      params: [
        { label: '样品浓度', value: '1–5 mg/mL' },
        { label: '还原剂', value: '50–100 mM DTT' },
        { label: '加热', value: '沸水浴 5–10 min 或 60–70 °C' }
      ],
      checkpoints: [
        '样品澄清、无气泡与沉淀。',
        '还原与非还原样标记清楚。'
      ],
      pitfalls: [
        { level: 'high', title: '加热过度或时间过长', consequence: '人为片段化，纯度偏低', fix: '严格控制温度与时间，按试剂盒推荐条件' },
        { level: 'medium', title: '还原剂失效', consequence: '还原不完全，重链/轻链峰异常', fix: '现配 DTT，避免反复冻融' }
      ]
    },
    {
      no: 3,
      phase: '适用性',
      title: '系统适用性测试',
      purpose: '确认分离度、迁移时间与峰面积重复性符合要求。',
      summary: '进样系统适用性对照品 3 针，计算迁移时间 CV 与分离度。',
      detail: '按方法进样对照品 3 针，计算迁移时间 CV（≤5%）、主峰面积 CV（≤5%）与分离度；同时进样空白确认无残留峰。',
      substeps: [
        '进样系统适用性对照品 3 针。',
        '计算迁移时间与峰面积 CV。',
        '检查分离度与峰形。',
        '进样空白确认无残留。'
      ],
      params: [
        { label: '进样针数', value: '3 针' },
        { label: '迁移时间 CV', value: '≤5%' },
        { label: '峰面积 CV', value: '≤5%' }
      ],
      checkpoints: [
        'CV 与分离度符合方法要求。',
        '空白无残留峰。'
      ],
      pitfalls: [
        { level: 'high', title: '适用性不合格仍检测样品', consequence: '数据无效', fix: '排查毛细管、凝胶与温控后重做' }
      ]
    },
    {
      no: 4,
      phase: '分离',
      title: '进样与电泳分离',
      purpose: '获得可定量的分离图谱。',
      summary: '电动或压力进样，按设定电压分离，检测 220 nm 或 214 nm 吸收。',
      detail: '按方法采用电动进样（如 5 kV 20 s）或压力进样；分离电压 15–25 kV，柱温 20–25 °C，检测波长 220 nm（肽键吸收）；采集时间覆盖全部峰。',
      substeps: [
        '按方法设置进样参数。',
        '设定分离电压与柱温。',
        '开始采集并监控电流。',
        '确认所有峰在采集窗口内。'
      ],
      params: [
        { label: '进样', value: '5 kV 20 s 或 5 psi 10 s' },
        { label: '分离电压', value: '15–25 kV' },
        { label: '检测波长', value: '220 nm' }
      ],
      checkpoints: [
        '电流稳定，无中断。',
        '图谱峰形清晰、基线平稳。'
      ],
      pitfalls: [
        { level: 'medium', title: '进样量过大', consequence: '峰展宽、分离度下降', fix: '降低进样电压/时间或稀释样品' },
        { level: 'medium', title: '柱温波动', consequence: '迁移时间漂移，CV 增大', fix: '控制室温并检查毛细管温控' }
      ]
    },
    {
      no: 5,
      phase: '判读',
      title: '积分与纯度计算',
      purpose: '正确划分主峰与杂质峰，得到纯度数据。',
      summary: '以对照品定位主峰，非还原样主峰前为聚集体、后为片段，峰面积归一化计算。',
      detail: '按迁移时间定位主峰（IgG 约 150 kDa），非还原条件主峰前为聚集体、主峰后为片段；还原条件主峰为重链与轻链，计算各自比例；检查积分基线与峰边界，异常需人工复核。',
      substeps: [
        '按对照品定位主峰位置。',
        '标注聚集体、片段或重链/轻链峰。',
        '设置积分参数并检查边界。',
        '峰面积归一化计算百分比。',
        '导出图谱与结果。'
      ],
      params: [
        { label: '定量方式', value: '峰面积归一化' },
        { label: '非还原', value: '主峰前聚集体、主峰后片段' },
        { label: '还原', value: '重链 + 轻链比例' }
      ],
      checkpoints: [
        '主峰定位准确。',
        '各峰面积之和为 100%（±0.1%）。'
      ],
      pitfalls: [
        { level: 'high', title: '积分边界不当', consequence: '纯度被高估或低估', fix: '统一积分参数并人工复核' }
      ]
    },
    {
      no: 6,
      phase: '维护',
      title: '毛细管清洗与保存',
      purpose: '去除残留蛋白，维持分离性能。',
      summary: '依次用清洗液、水冲洗毛细管，两端浸入水中保存。',
      detail: '检测结束后用 0.1 M NaOH、水与凝胶缓冲液依次冲洗毛细管各 5–10 min；长期不用时将两端浸入纯水或按仪器说明保存，记录使用次数与柱效趋势。',
      substeps: [
        '用 0.1 M NaOH 冲洗 5–10 min。',
        '用纯水冲洗 5–10 min。',
        '用凝胶缓冲液冲洗。',
        '两端浸水保存并记录。'
      ],
      params: [
        { label: '清洗液', value: '0.1 M NaOH、纯水' },
        { label: '冲洗时间', value: '各 5–10 min' },
        { label: '保存', value: '两端浸纯水' }
      ],
      checkpoints: [
        '冲洗后电流恢复正常。',
        '使用记录完整。'
      ],
      pitfalls: [
        { level: 'medium', title: '未清洗直接存放', consequence: '蛋白吸附、下次分离变差', fix: '按程序清洗后保存' }
      ]
    }
  ],
  references: [
    '毛细管电泳法通则（药典）',
    'CE-SDS 试剂盒说明书',
    '抗体纯度与杂质分析方法验证指导原则'
  ]
};

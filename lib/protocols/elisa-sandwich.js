'use strict';

module.exports = {
  id: 'elisa_sandwich',
  name: '双抗体夹心 ELISA',
  category: '免疫学 · ELISA',
  short: '捕获抗体包被、抗原结合、检测抗体与酶标二抗显色，定量可溶性蛋白',
  overview: {
    principle: '捕获抗体固定在板孔上结合目标抗原，检测抗体识别不同表位形成夹心复合物；酶标二抗催化底物显色，吸光度与抗原浓度相关。',
    application: '细胞因子、抗体、可溶性受体等蛋白的定量检测，适用于血清、培养上清和缓冲液样品。',
    input: '标准品与待测样品（血清、培养上清、裂解液等）',
    output: '标准曲线与样品浓度（pg/mL 或 ng/mL）',
    duration: '约 4–6 h 或过夜包被',
    yield: '定量范围取决于抗体对和标准曲线'
  },
  keySpecs: [
    { label: '标准曲线 R²', value: '≥0.99', note: '至少 5–7 个稀释点' },
    { label: '复孔 CV', value: '<10–15%', note: '按试剂盒要求' },
    { label: '加标回收', value: '80–120%', note: '评估基质干扰' },
    { label: '检测限', value: '按试剂盒 LLOQ', note: '低于 LLOQ 报告为未检出' }
  ],
  steps: [
    {
      no: 1,
      phase: '准备',
      title: '试剂与板准备',
      purpose: '保证所有试剂在正确条件下使用，减少批间差异。',
      summary: '按说明书平衡试剂、配制缓冲液，确认包被板和抗体在有效期内。',
      detail: '将试剂盒从 2–8 °C 取出平衡至室温，按说明书配制洗涤液、封闭液和稀释液；检查包被板、抗体和标准品有效期。',
      substeps: [
        '将试剂盒平衡至室温，避免冷凝水影响。',
        '按说明书配制洗涤液、封闭液和样品稀释液。',
        '检查包被板、捕获抗体、检测抗体和标准品有效期。',
        '标记板孔和样品位置，准备复孔布局。'
      ],
      params: [
        { label: '平衡温度', value: '室温' },
        { label: '洗涤液', value: '按说明书稀释' },
        { label: '复孔', value: '标准品和样品均建议双复孔' }
      ],
      checkpoints: [
        '试剂无浑浊、沉淀或过期。',
        '洗涤液和稀释液配制正确。'
      ],
      pitfalls: [
        { level: 'medium', title: '试剂未平衡至室温', consequence: '反应温度不一致，标准曲线漂移', fix: '提前平衡 30 min，避免反复取出' },
        { level: 'low', title: '洗涤液结晶未溶解', consequence: '洗涤不充分，背景升高', fix: '37 °C 温浴至完全溶解后再稀释' }
      ]
    },
    {
      no: 2,
      phase: '包被',
      title: '捕获抗体包被',
      purpose: '将捕获抗体固定在板孔上，形成抗原结合位点。',
      summary: '用包被缓冲液稀释捕获抗体，每孔加入后 4 °C 过夜或室温 2 h。',
      detail: '按说明书用包被缓冲液稀释捕获抗体，每孔加入 100 µL（体积按板型），4 °C 过夜或室温 2 h；弃液后洗涤。',
      substeps: [
        '用包被缓冲液按说明书稀释捕获抗体。',
        '每孔加入规定体积，轻轻拍板使液体覆盖孔底。',
        '4 °C 过夜或室温 2 h 包被。',
        '弃包被液，洗涤液洗板 3 次。'
      ],
      params: [
        { label: '包被体积', value: '按板型，常见 100 µL/孔' },
        { label: '包被条件', value: '4 °C 过夜或室温 2 h' },
        { label: '洗涤', value: '3 次' }
      ],
      checkpoints: [
        '包被液覆盖孔底，无气泡。',
        '洗涤后孔内无残留液体。'
      ],
      pitfalls: [
        { level: 'high', title: '包被浓度或体积错误', consequence: '信号弱或标准曲线异常', fix: '按说明书准确稀释，使用校准移液器' },
        { level: 'medium', title: '包被板干燥', consequence: '抗体失活，孔间差异大', fix: '包被期间保持湿润，弃液后立即洗涤' }
      ]
    },
    {
      no: 3,
      phase: '封闭',
      title: '封闭',
      purpose: '封闭未结合位点，降低非特异吸附和背景。',
      summary: '每孔加入封闭液，室温孵育 1 h，弃液后洗涤。',
      detail: '每孔加入封闭液（如 1% BSA 或试剂盒封闭液），室温孵育 1 h；弃液，洗涤液洗板 3 次。',
      substeps: [
        '每孔加入封闭液，确保覆盖孔底。',
        '室温孵育 1 h，避免晃动过猛。',
        '弃封闭液，拍干。',
        '洗涤液洗板 3 次，每次停留 30–60 s。'
      ],
      params: [
        { label: '封闭液', value: '1% BSA 或试剂盒封闭液' },
        { label: '时间', value: '室温 1 h' },
        { label: '洗涤', value: '3 次' }
      ],
      checkpoints: [
        '封闭液覆盖完整。',
        '洗涤后背景低。'
      ],
      pitfalls: [
        { level: 'medium', title: '封闭不充分', consequence: '背景高、非特异信号', fix: '保证封闭液体积和时间，必要时更换封闭液' },
        { level: 'low', title: '洗涤不彻底', consequence: '残留封闭液干扰抗原结合', fix: '按说明洗涤，弃净孔内液体' }
      ]
    },
    {
      no: 4,
      phase: '加样',
      title: '标准品与样品准备',
      purpose: '建立可靠标准曲线，并使样品基质与标准品匹配。',
      summary: '标准品梯度稀释，样品按说明书稀释，标准品和样品均做复孔。',
      detail: '按说明书复溶标准品，做 2 倍或 5 倍梯度稀释；样品根据预期浓度稀释，使读数落在标准曲线中段；标准品和样品均双复孔。',
      substeps: [
        '按说明书复溶标准品，避免剧烈涡旋。',
        '做 5–7 个梯度稀释点，覆盖预期浓度范围。',
        '样品按预期浓度稀释，记录稀释倍数。',
        '标准品和样品按布局加入复孔。'
      ],
      params: [
        { label: '标准曲线', value: '5–7 个点' },
        { label: '复孔', value: '双复孔' },
        { label: '样品稀释', value: '使读数落在曲线中段' }
      ],
      checkpoints: [
        '标准曲线覆盖样品预期浓度。',
        '样品稀释倍数记录清楚。'
      ],
      pitfalls: [
        { level: 'high', title: '样品浓度超出标准曲线', consequence: '结果外推，定量不准', fix: '预设稀释梯度，超出范围重新稀释复测' },
        { level: 'medium', title: '标准品复溶或稀释错误', consequence: '标准曲线失真，所有样品结果偏差', fix: '按说明书复溶，使用校准移液器' }
      ]
    },
    {
      no: 5,
      phase: '结合',
      title: '加样与抗原孵育',
      purpose: '让目标抗原与捕获抗体充分结合。',
      summary: '每孔加入标准品或样品，室温孵育 1–2 h，洗涤 3–5 次。',
      detail: '每孔加入标准品或样品，室温孵育 1–2 h（按说明书）；弃液，洗涤液洗板 3–5 次，拍干。',
      substeps: [
        '按布局加入标准品和样品，避免交叉污染。',
        '室温孵育 1–2 h，轻轻覆盖或封板。',
        '弃液，洗涤液洗板 3–5 次。',
        '每次洗涤后拍干，避免孔间残留。'
      ],
      params: [
        { label: '孵育时间', value: '室温 1–2 h' },
        { label: '洗涤', value: '3–5 次' },
        { label: '加样体积', value: '按板型，常见 100 µL/孔' }
      ],
      checkpoints: [
        '加样无气泡、无交叉污染。',
        '洗涤后孔内无残留液体。'
      ],
      pitfalls: [
        { level: 'high', title: '洗涤不充分', consequence: '背景高、假阳性', fix: '按说明完成洗涤次数，拍干孔内液体' },
        { level: 'medium', title: '加样顺序混乱', consequence: '孔位对应错误', fix: '提前画好板布局，按列加样并核对' }
      ]
    },
    {
      no: 6,
      phase: '检测',
      title: '检测抗体孵育',
      purpose: '检测抗体结合抗原，形成夹心复合物。',
      summary: '加入检测抗体，室温孵育 1 h，洗涤 3–5 次。',
      detail: '按说明书稀释检测抗体，每孔加入后室温孵育 1 h；弃液，洗涤液洗板 3–5 次。',
      substeps: [
        '按说明书稀释检测抗体。',
        '每孔加入检测抗体，室温孵育 1 h。',
        '弃液，洗涤液洗板 3–5 次。',
        '拍干孔内液体，准备酶结合物。'
      ],
      params: [
        { label: '检测抗体', value: '按说明书稀释' },
        { label: '孵育', value: '室温 1 h' },
        { label: '洗涤', value: '3–5 次' }
      ],
      checkpoints: [
        '检测抗体体积一致。',
        '洗涤后背景低。'
      ],
      pitfalls: [
        { level: 'high', title: '检测抗体浓度错误', consequence: '信号过强或过弱', fix: '按说明书稀释，必要时做梯度验证' },
        { level: 'medium', title: '孵育时间不足', consequence: '信号弱，灵敏度下降', fix: '按说明书保证孵育时间' }
      ]
    },
    {
      no: 7,
      phase: '显色',
      title: '酶结合物与底物显色',
      purpose: '通过酶促显色放大信号，反映抗原浓度。',
      summary: '加入 HRP 酶结合物孵育，洗涤后加 TMB 避光显色，加终止液终止。',
      detail: '按说明书加入 HRP 酶结合物，室温孵育 30–60 min；洗涤后加入 TMB 底物，避光显色 10–30 min，加入终止液终止。',
      substeps: [
        '加入 HRP 酶结合物，室温孵育 30–60 min。',
        '洗涤 3–5 次，拍干。',
        '加入 TMB 底物，避光显色，观察蓝色深浅。',
        '加入终止液，颜色由蓝变黄后尽快读数。'
      ],
      params: [
        { label: '酶结合物', value: 'HRP，按说明书' },
        { label: 'TMB 显色', value: '避光 10–30 min' },
        { label: '终止液', value: '按说明书，等体积' }
      ],
      checkpoints: [
        '标准品孔呈梯度蓝色。',
        '空白孔颜色浅。'
      ],
      pitfalls: [
        { level: 'high', title: '显色过度', consequence: '高浓度孔饱和，标准曲线弯曲', fix: '控制显色时间，及时加终止液' },
        { level: 'medium', title: 'TMB 未避光或污染', consequence: '背景高、显色异常', fix: '避光操作，使用有效期内的底物' }
      ]
    },
    {
      no: 8,
      phase: '分析',
      title: '读数与结果判读',
      purpose: '根据标准曲线计算样品浓度，评估数据可靠性。',
      summary: '450 nm 读数，扣除空白，拟合 4PL 或对数曲线，计算浓度并检查 CV/回收率。',
      detail: '终止后 30 min 内于 450 nm 读数，必要时用 570 nm 校正；扣除空白后拟合标准曲线，计算样品浓度，检查复孔 CV、加标回收和稀释线性。',
      substeps: [
        '450 nm 读数，记录原始吸光度。',
        '扣除空白，拟合 4PL 或对数标准曲线。',
        '计算样品浓度并乘以稀释倍数。',
        '检查复孔 CV、加标回收和稀释线性。'
      ],
      params: [
        { label: '波长', value: '450 nm（参考 570 nm）' },
        { label: '曲线拟合', value: '4PL / 对数' },
        { label: '质控', value: 'CV、回收率、稀释线性' }
      ],
      checkpoints: [
        '标准曲线 R² ≥0.99。',
        '复孔 CV <10–15%，回收率 80–120%。'
      ],
      pitfalls: [
        { level: 'high', title: '样品读数超出曲线范围', consequence: '外推结果不可靠', fix: '稀释后复测，使读数落在曲线中段' },
        { level: 'medium', title: '未检查基质干扰', consequence: '回收率异常，浓度偏差', fix: '做加标回收和稀释线性验证' }
      ]
    }
  ],
  references: [
    '双抗体夹心 ELISA 通用 SOP',
    'ELISA 试剂盒说明书中的标准曲线与判读要求',
    '免疫分析方法学验证与基质效应评估指南'
  ]
};

'use strict';

module.exports = {
  id: 'western_blot',
  name: 'Western Blot 免疫印迹',
  category: '蛋白科学 · 免疫印迹',
  short: 'SDS-PAGE 分离、转膜、抗体孵育与 ECL 成像，检测目标蛋白表达',
  overview: {
    principle: '蛋白经 SDS-PAGE 按分子量分离后转移至膜上，用特异性一抗识别目标蛋白，酶标二抗放大信号，ECL 底物发光后成像。',
    application: '重组蛋白表达验证、信号通路蛋白检测、纯化组分鉴定和敲低/过表达效果评估。',
    input: '蛋白裂解液或纯化蛋白样品',
    output: '目标蛋白条带图像及相对表达量分析',
    duration: '约 1–2 天（含过夜孵育）',
    yield: '定性/半定量，检测灵敏度取决于抗体和上样量'
  },
  keySpecs: [
    { label: '上样量', value: '20–40 µg/孔', note: '按目标蛋白丰度调整' },
    { label: '转膜', value: '恒流/恒压，4 °C', note: '避免过热和气泡' },
    { label: '封闭', value: '5% 脱脂奶粉或 BSA', note: '磷酸化蛋白优先 BSA' },
    { label: '一抗', value: '按说明书稀释，4 °C 过夜', note: '需验证特异性' }
  ],
  steps: [
    {
      no: 1,
      phase: '样品',
      title: '蛋白样品制备与定量',
      purpose: '获得完整、浓度一致的蛋白样品，减少降解和上样差异。',
      summary: '用含蛋白酶/磷酸酶抑制剂的裂解液裂解，BCA 定量，加入上样缓冲液并变性。',
      detail: '根据样品类型选择裂解液，加入蛋白酶和磷酸酶抑制剂，冰上裂解；BCA 或 Bradford 定量后，按同一总蛋白量分装并加入还原型上样缓冲液，95 °C 变性 5 min。',
      substeps: [
        '弃培养基，用预冷 PBS 洗细胞，加入含抑制剂的裂解液。',
        '冰上裂解 10–30 min，期间轻轻摇动或刮取。',
        '4 °C、12,000–15,000 g 离心 10–15 min，取上清。',
        'BCA 定量，按同一总蛋白量分装，加入 Loading Buffer 并 95 °C 变性。'
      ],
      params: [
        { label: '裂解温度', value: '冰上/4 °C' },
        { label: '离心', value: '12,000–15,000 g，10–15 min' },
        { label: '变性', value: '95 °C，5 min' }
      ],
      checkpoints: [
        '蛋白浓度定量重复性好。',
        '样品无明显沉淀，体积一致。'
      ],
      pitfalls: [
        { level: 'high', title: '蛋白酶/磷酸酶抑制剂漏加', consequence: '蛋白降解或磷酸化信号丢失', fix: '裂解前现加抑制剂，全程冰上操作' },
        { level: 'medium', title: '上样量不一致', consequence: '条带强弱无法比较', fix: '统一总蛋白上样量，记录体积' }
      ]
    },
    {
      no: 2,
      phase: '电泳',
      title: 'SDS-PAGE 分离',
      purpose: '按分子量分离蛋白，便于目标条带识别。',
      summary: '按目标分子量选择凝胶浓度，上样 Marker 和样品，80 V 浓缩后 120 V 分离。',
      detail: '根据目标蛋白分子量选择 8–12% 凝胶；上样蛋白 Marker 和样品，80 V 运行至分离胶后调至 120 V。',
      substeps: [
        '按目标分子量选择凝胶浓度，确认胶板无漏液。',
        '上样 Marker 和蛋白样品，记录顺序。',
        '80 V 运行至样品进入分离胶。',
        '调至 120 V，至指示染料接近底部。'
      ],
      params: [
        { label: '凝胶浓度', value: '8–12%' },
        { label: '上样量', value: '20–40 µg/孔' },
        { label: '电压', value: '80 V → 120 V' }
      ],
      checkpoints: [
        'Marker 分离清晰。',
        '样品无漏样、无串孔。'
      ],
      pitfalls: [
        { level: 'medium', title: '凝胶浓度不适配', consequence: '目标条带分离不佳或跑出胶', fix: '按目标分子量选择凝胶浓度' },
        { level: 'high', title: '漏样或串孔', consequence: '样品交叉污染，结果误判', fix: '确认梳孔完整，缓慢上样' }
      ]
    },
    {
      no: 3,
      phase: '转膜',
      title: '转膜',
      purpose: '将凝胶中的蛋白转移到膜上，便于抗体识别。',
      summary: 'PVDF 膜甲醇活化，按“胶-膜”三明治组装，4 °C 恒流/恒压转膜。',
      detail: 'PVDF 膜用甲醇活化 1–2 min，转膜缓冲液平衡；按海绵/滤纸/胶/膜/滤纸/海绵组装，排除气泡，4 °C 转膜。',
      substeps: [
        'PVDF 膜用甲醇活化 1–2 min，转入转膜缓冲液平衡。',
        '按三明治结构组装，胶靠近负极、膜靠近正极。',
        '用滚轮排除气泡，避免胶膜干燥。',
        '4 °C 恒流或恒压转膜，按目标分子量调整时间。'
      ],
      params: [
        { label: '膜', value: 'PVDF，甲醇活化' },
        { label: '温度', value: '4 °C' },
        { label: '转膜条件', value: '恒流/恒压，按仪器' }
      ],
      checkpoints: [
        '胶膜之间无气泡。',
        '预染 Marker 成功转移到膜上。'
      ],
      pitfalls: [
        { level: 'critical', title: '胶膜间有气泡', consequence: '局部转膜失败，条带缺失', fix: '组装时用滚轮逐层排除气泡' },
        { level: 'high', title: '转膜过热或时间不足', consequence: '蛋白降解或转移不完全', fix: '冰浴/4 °C 转膜，按分子量优化时间' }
      ]
    },
    {
      no: 4,
      phase: '封闭',
      title: '封闭',
      purpose: '封闭膜上未结合蛋白的位点，降低非特异背景。',
      summary: '用 5% 脱脂奶粉/TBST 或 5% BSA/TBST 室温封闭 1 h。',
      detail: '用 5% 脱脂奶粉或 5% BSA 的 TBST 封闭，室温摇动 1 h；磷酸化蛋白检测优先使用 BSA，避免牛奶中的磷酸蛋白干扰。',
      substeps: [
        '转膜后用 TBST 短暂洗膜。',
        '加入封闭液，确保完全覆盖膜。',
        '室温摇动 1 h。',
        '封闭后弃封闭液，TBST 短暂洗涤。'
      ],
      params: [
        { label: '封闭液', value: '5% 脱脂奶粉或 BSA' },
        { label: '时间', value: '室温 1 h' },
        { label: '缓冲液', value: 'TBST' }
      ],
      checkpoints: [
        '膜均匀湿润，无干燥斑点。',
        '封闭液覆盖完整。'
      ],
      pitfalls: [
        { level: 'medium', title: '封闭不充分', consequence: '背景高、非特异条带多', fix: '保证封闭液体积和时间，膜不要干燥' },
        { level: 'medium', title: '磷酸化蛋白使用牛奶封闭', consequence: '酪蛋白磷酸化干扰，背景升高', fix: '磷酸化蛋白优先用 BSA 封闭' }
      ]
    },
    {
      no: 5,
      phase: '抗体',
      title: '一抗孵育',
      purpose: '让特异性一抗结合目标蛋白。',
      summary: '按说明书稀释一抗，4 °C 过夜孵育，TBST 洗膜 3 次。',
      detail: '按抗体说明书用封闭液或 TBST 稀释一抗，4 °C 过夜；孵育后 TBST 洗膜 3 次，每次 5–10 min。',
      substeps: [
        '按说明书稀释一抗，记录稀释比例和批号。',
        '将膜与一抗在 4 °C 过夜孵育，确保液体覆盖。',
        '回收一抗（如允许），TBST 洗膜 3 次。',
        '每次洗涤 5–10 min，保持摇动。'
      ],
      params: [
        { label: '一抗稀释', value: '按说明书' },
        { label: '孵育', value: '4 °C 过夜' },
        { label: '洗涤', value: 'TBST 3 × 5–10 min' }
      ],
      checkpoints: [
        '膜始终湿润，无干燥。',
        '洗涤后背景明显降低。'
      ],
      pitfalls: [
        { level: 'high', title: '抗体浓度过高', consequence: '背景高、非特异条带', fix: '按说明书稀释，必要时做梯度试验' },
        { level: 'medium', title: '孵育温度过高或时间过长', consequence: '非特异结合增加', fix: '4 °C 过夜，避免室温长时间孵育' }
      ]
    },
    {
      no: 6,
      phase: '抗体',
      title: '二抗孵育',
      purpose: '结合一抗并引入检测信号。',
      summary: '按说明书稀释 HRP 标记二抗，室温孵育 1 h，TBST 洗膜 3 次。',
      detail: '选择与一抗种属匹配的 HRP 标记二抗，按说明书稀释，室温孵育 1 h；TBST 洗膜 3 次，每次 5–10 min。',
      substeps: [
        '选择与一抗种属匹配的 HRP 二抗。',
        '按说明书稀释二抗，室温孵育 1 h。',
        'TBST 洗膜 3 次，每次 5–10 min。',
        '洗膜后尽快显影，避免信号衰减。'
      ],
      params: [
        { label: '二抗', value: 'HRP 标记，种属匹配' },
        { label: '孵育', value: '室温 1 h' },
        { label: '洗涤', value: 'TBST 3 × 5–10 min' }
      ],
      checkpoints: [
        '二抗种属匹配正确。',
        '洗膜充分，背景低。'
      ],
      pitfalls: [
        { level: 'high', title: '二抗种属不匹配', consequence: '无信号或非特异信号', fix: '核对一抗种属和二抗说明书' },
        { level: 'medium', title: '洗涤不足', consequence: '背景高、条带模糊', fix: '增加洗涤次数或体积' }
      ]
    },
    {
      no: 7,
      phase: '检测',
      title: 'ECL 显影与成像',
      purpose: '通过化学发光检测目标条带并记录图像。',
      summary: '滴加 ECL 发光液，避光孵育 1–3 min，凝胶成像仪曝光成像。',
      detail: '将 ECL 发光液按说明书混合，均匀滴加在膜上，避光孵育 1–3 min；放入成像仪，选择合适曝光时间，避免过曝。',
      substeps: [
        '按说明书混合 ECL A/B 液，现配现用。',
        '将膜平放，均匀滴加发光液，避光孵育 1–3 min。',
        '放入成像仪，先短曝光再逐步增加。',
        '保存原始图像，标记样品和 Marker。'
      ],
      params: [
        { label: 'ECL', value: '按说明书混合' },
        { label: '孵育', value: '避光 1–3 min' },
        { label: '曝光', value: '梯度曝光，避免过曝' }
      ],
      checkpoints: [
        '目标条带清晰，背景可接受。',
        '图像未过曝，保留原始数据。'
      ],
      pitfalls: [
        { level: 'medium', title: '曝光过度', consequence: '条带饱和，无法定量', fix: '梯度曝光，选择线性范围内的图像' },
        { level: 'low', title: 'ECL 孵育不均', consequence: '条带强弱不均', fix: '均匀滴加发光液，避免膜局部干燥' }
      ]
    },
    {
      no: 8,
      phase: '分析',
      title: '结果判读与复孵',
      purpose: '确认目标条带特异性，并用内参校正表达量。',
      summary: '比较目标条带与 Marker，检测内参，必要时剥离复孵，进行半定量分析。',
      detail: '确认目标条带分子量与预期一致、无多余非特异条带；检测内参（如 GAPDH、β-actin）校正上样量，必要时剥离复孵其他抗体。',
      substeps: [
        '比较目标条带与预染 Marker 的分子量。',
        '检测内参，确认各泳道上样一致。',
        '用 ImageJ 等软件进行条带灰度半定量。',
        '必要时剥离复孵，保存原始图像和分析记录。'
      ],
      params: [
        { label: '内参', value: 'GAPDH / β-actin / Tubulin' },
        { label: '定量', value: '目标/内参比值' },
        { label: '复孵', value: '按需剥离' }
      ],
      checkpoints: [
        '目标条带分子量正确、特异性良好。',
        '内参条带一致，定量结果可靠。'
      ],
      pitfalls: [
        { level: 'high', title: '目标条带分子量不符', consequence: '可能为非特异条带或降解产物', fix: '核对抗体说明书和阳性对照，必要时换抗体' },
        { level: 'medium', title: '未检测内参', consequence: '上样差异被误判为表达变化', fix: '同一膜检测内参，按目标/内参比值比较' }
      ]
    }
  ],
  references: [
    'Western Blot 通用 SOP 与抗体说明书',
    'PVDF 膜转膜与 ECL 检测标准方法',
    'ImageJ 条带灰度定量通用流程'
  ]
};

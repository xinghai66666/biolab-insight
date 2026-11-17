'use strict';

module.exports = {
  id: 'e_coli_transformation',
  name: '大肠杆菌热激转化',
  category: '分子生物学 · 克隆转化',
  short: '感受态细胞冰浴、热激、复苏后涂板，获得转化克隆',
  overview: {
    objective: '将重组质粒导入感受态细胞，获得可用于表达或筛选的阳性克隆。',
    principle: '低温 Ca²⁺ 处理使大肠杆菌细胞壁通透性增加，短暂 42 °C 热激促使质粒 DNA 进入细胞；复苏后借助抗生素筛选转化子。',
    application: '质粒构建、克隆筛选、蛋白表达质粒导入和突变库构建。',
    input: '感受态大肠杆菌、质粒 DNA、含抗生素的 LB 平板',
    output: '转化后的单克隆菌落',
    duration: '约 2–3 h（不含过夜培养）',
    yield: '转化效率取决于菌株、质粒大小和操作'
  },
  keySpecs: [
    { label: '感受态细胞', value: '-80 °C 保存', note: '避免反复冻融' },
    { label: '热激', value: '42 °C，45–60 s', note: '时间过长损伤细胞' },
    { label: '复苏', value: 'SOC/LB，37 °C 1 h', note: '表达抗生素抗性' },
    { label: '抗生素平板', value: '对应抗性', note: '平板需干燥、无污染' }
  ],
  steps: [
    {
      no: 1,
      phase: '准备',
      title: '材料与平板准备',
      purpose: '保证感受态细胞、DNA 和平板处于可用状态，减少污染。',
      summary: '准备冰盒、42 °C 水浴、感受态细胞、质粒和含抗生素的 LB 平板。',
      detail: '提前准备冰盒、42 °C 水浴、37 °C 摇床和培养箱；取出感受态细胞置于冰上，检查 LB 平板无污染、表面干燥。',
      substeps: [
        '准备冰盒，将感受态细胞从 -80 °C 取出置于冰上。',
        '预热 42 °C 水浴和 37 °C 摇床。',
        '检查含抗生素的 LB 平板，确保无污染、表面干燥。',
        '准备无菌离心管、SOC/LB 培养基和涂布棒。'
      ],
      params: [
        { label: '热激温度', value: '42 °C' },
        { label: '复苏温度', value: '37 °C' },
        { label: '平板', value: '含对应抗生素' }
      ],
      checkpoints: [
        '感受态细胞全程保持冰上。',
        '平板无污染、无过多冷凝水。'
      ],
      pitfalls: [
        { level: 'critical', title: '感受态细胞反复冻融或升温', consequence: '转化效率显著下降', fix: '-80 °C 保存，取出后立即冰上解冻，避免反复冻融' },
        { level: 'medium', title: '平板潮湿或有污染', consequence: '菌落连片或背景杂菌', fix: '平板充分干燥，使用前检查有无污染' }
      ]
    },
    {
      no: 2,
      phase: '解冻',
      title: '感受态细胞冰上解冻',
      purpose: '保持细胞膜通透性，避免温度升高导致转化效率下降。',
      summary: '将感受态细胞置于冰上 5–10 min，直至刚解冻。',
      detail: '从 -80 °C 取出感受态细胞，立即置于冰上 5–10 min，直至刚解冻；不要用手握或室温放置。',
      substeps: [
        '从 -80 °C 取出感受态细胞，立即放冰上。',
        '冰上解冻 5–10 min，直至刚融化。',
        '解冻后轻轻弹匀，避免剧烈涡旋。',
        '立即进入下一步，避免长时间放置。'
      ],
      params: [
        { label: '解冻温度', value: '冰上' },
        { label: '解冻时间', value: '5–10 min' },
        { label: '操作', value: '轻柔，避免涡旋' }
      ],
      checkpoints: [
        '细胞刚解冻，无残留冰块。',
        '细胞悬液均匀。'
      ],
      pitfalls: [
        { level: 'high', title: '室温或手中解冻', consequence: '细胞膜损伤，转化效率下降', fix: '全程冰上解冻，避免手温加热' },
        { level: 'low', title: '剧烈涡旋', consequence: '细胞机械损伤', fix: '轻弹管壁混匀' }
      ]
    },
    {
      no: 3,
      phase: '结合',
      title: '加入 DNA 与冰浴',
      purpose: '使 DNA 与感受态细胞充分接触，形成转化复合物。',
      summary: '加入 1–5 µL 质粒 DNA，轻弹混匀，冰浴 10–30 min。',
      detail: '按感受态细胞说明书加入 1–5 µL 质粒 DNA（通常 10–100 ng），轻弹混匀，冰浴 10–30 min；DNA 体积不宜超过细胞悬液的 5–10%。',
      substeps: [
        '按说明书加入 1–5 µL 质粒 DNA。',
        '轻弹管壁混匀，避免气泡。',
        '冰浴 10–30 min。',
        '记录 DNA 体积、浓度和感受态细胞批号。'
      ],
      params: [
        { label: 'DNA 量', value: '10–100 ng' },
        { label: 'DNA 体积', value: '≤细胞悬液 5–10%' },
        { label: '冰浴', value: '10–30 min' }
      ],
      checkpoints: [
        'DNA 体积符合要求。',
        '混合液均匀，无气泡。'
      ],
      pitfalls: [
        { level: 'high', title: 'DNA 体积过大或盐浓度高', consequence: '转化效率下降', fix: '控制 DNA 体积 ≤5–10%，必要时纯化/稀释' },
        { level: 'medium', title: '冰浴时间不足', consequence: 'DNA 与细胞结合不充分', fix: '按说明书冰浴 10–30 min' }
      ]
    },
    {
      no: 4,
      phase: '热激',
      title: '42 °C 热激与冰浴',
      purpose: '短暂热激促使 DNA 进入细胞，随后迅速冷却修复细胞。',
      summary: '42 °C 热激 45–60 s，立即冰浴 2 min。',
      detail: '将离心管放入 42 °C 水浴，准确热激 45–60 s；立即转入冰浴 2 min，避免过热或延迟冷却。',
      substeps: [
        '将离心管放入 42 °C 水浴，准确计时 45–60 s。',
        '立即转入冰浴 2 min。',
        '避免剧烈晃动或开盖。',
        '准备加入复苏培养基。'
      ],
      params: [
        { label: '热激温度', value: '42 °C' },
        { label: '热激时间', value: '45–60 s' },
        { label: '冰浴', value: '2 min' }
      ],
      checkpoints: [
        '热激时间准确，未超时。',
        '热激后立即冰浴。'
      ],
      pitfalls: [
        { level: 'critical', title: '热激时间过长', consequence: '细胞大量死亡，转化子少', fix: '严格计时 45–60 s，按菌株说明书调整' },
        { level: 'high', title: '热激后未立即冰浴', consequence: '细胞损伤，转化效率下降', fix: '热激结束立即转入冰浴' }
      ]
    },
    {
      no: 5,
      phase: '复苏',
      title: '复苏培养',
      purpose: '让转化子表达抗生素抗性蛋白，恢复生长。',
      summary: '加入 SOC/LB 培养基，37 °C、220 rpm 复苏 1 h。',
      detail: '加入 0.9 mL SOC 或 LB 培养基，37 °C、220 rpm 复苏 1 h；抗生素抗性基因需要时间表达。',
      substeps: [
        '加入 0.9 mL 预温 SOC/LB 培养基。',
        '37 °C、220 rpm 振荡复苏 1 h。',
        '复苏时间按质粒/菌株调整。',
        '准备涂布平板。'
      ],
      params: [
        { label: '复苏培养基', value: 'SOC 或 LB' },
        { label: '复苏条件', value: '37 °C，220 rpm，1 h' },
        { label: '体积', value: '约 0.9 mL' }
      ],
      checkpoints: [
        '复苏液轻微浑浊。',
        '复苏时间足够表达抗性。'
      ],
      pitfalls: [
        { level: 'high', title: '复苏时间不足', consequence: '抗性未表达，转化子被抗生素杀死', fix: '复苏至少 1 h，按说明书调整' },
        { level: 'medium', title: '复苏温度或转速错误', consequence: '生长缓慢，转化效率低', fix: '37 °C、220 rpm 复苏' }
      ]
    },
    {
      no: 6,
      phase: '涂板',
      title: '稀释与涂板',
      purpose: '获得可计数的单菌落，避免菌落连片。',
      summary: '取不同体积复苏液涂布含抗生素平板，37 °C 过夜培养。',
      detail: '取 50–200 µL 复苏液涂布含抗生素平板；若预期转化子多，可做 1:10 稀释；涂布至表面干燥。',
      substeps: [
        '取 50–200 µL 复苏液，必要时做 1:10 稀释。',
        '用无菌涂布棒均匀涂布平板。',
        '涂布至表面无明显液体。',
        '标记质粒、菌株、日期和抗生素。'
      ],
      params: [
        { label: '涂布体积', value: '50–200 µL' },
        { label: '稀释', value: '按预期转化子数' },
        { label: '培养', value: '37 °C 过夜' }
      ],
      checkpoints: [
        '平板表面涂布均匀。',
        '标记完整。'
      ],
      pitfalls: [
        { level: 'medium', title: '涂布体积过大或未稀释', consequence: '菌落连片，无法挑单克隆', fix: '做梯度稀释，涂布不同体积' },
        { level: 'low', title: '平板表面潮湿', consequence: '菌液扩散，菌落不分离', fix: '平板提前干燥，涂布后充分吸收' }
      ]
    },
    {
      no: 7,
      phase: '筛选',
      title: '培养与克隆筛选',
      purpose: '获得单克隆并进行菌落 PCR/酶切鉴定。',
      summary: '37 °C 培养 12–16 h，挑取单克隆做菌落 PCR 或酶切鉴定。',
      detail: '37 °C 培养 12–16 h，观察菌落大小和数量；挑取单克隆接种液体培养基，做菌落 PCR、酶切或测序鉴定。',
      substeps: [
        '37 °C 培养 12–16 h，避免过度生长。',
        '观察菌落数量、大小和形态。',
        '挑取单克隆接种含抗生素液体培养基。',
        '用菌落 PCR、酶切或测序鉴定阳性克隆。'
      ],
      params: [
        { label: '培养温度', value: '37 °C' },
        { label: '培养时间', value: '12–16 h' },
        { label: '鉴定', value: '菌落 PCR / 酶切 / 测序' }
      ],
      checkpoints: [
        '平板出现可计数单菌落。',
        '阳性克隆鉴定结果正确。'
      ],
      pitfalls: [
        { level: 'medium', title: '培养时间过长', consequence: '菌落连片、卫星菌落，挑取困难', fix: '12–16 h 观察，及时取出' },
        { level: 'high', title: '未鉴定直接扩大培养', consequence: '克隆错误，后续实验失败', fix: '挑单克隆后先做菌落 PCR/酶切鉴定' }
      ]
    }
  ],
  references: [
    '大肠杆菌感受态细胞转化通用 SOP',
    '分子克隆实验指南中的热激转化方法',
    '菌落 PCR 与克隆筛选标准流程'
  ]
};

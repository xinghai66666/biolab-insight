'use strict';

module.exports = {
  id: 'protein_purification_ni_nta',
  name: 'His-tag 重组蛋白 Ni-NTA 亲和纯化',
  category: '蛋白科学 · 蛋白纯化',
  short: 'Ni-NTA 捕获 His-tag 蛋白，咪唑梯度洗涤与洗脱，获得初步纯化产物',
  overview: {
    principle: 'Ni²⁺ 与 His-tag 的咪唑侧链配位，使重组蛋白选择性结合到 Ni-NTA 树脂；低浓度咪唑洗去非特异结合蛋白，高浓度咪唑竞争性洗脱目标蛋白。',
    application: '大肠杆菌、昆虫细胞或哺乳动物细胞表达的 His-tag 重组蛋白的实验室规模纯化。',
    input: '诱导表达后的菌体或细胞裂解上清',
    output: '含目标蛋白的洗脱组分，可进一步透析或精纯',
    duration: '约 4–8 h（不含表达）',
    yield: '按表达量和树脂载量而定，通常数毫克至数十毫克'
  },
  keySpecs: [
    { label: '结合缓冲液咪唑', value: '20–40 mM', note: '过低非特异结合多，过高目标蛋白穿透' },
    { label: '洗脱咪唑', value: '250–500 mM', note: '按目标蛋白和树脂优化' },
    { label: '纯度', value: 'SDS-PAGE 主带 ≥80–90%', note: '一步亲和纯化常见水平' },
    { label: '缓冲液', value: 'pH 7.5–8.0', note: '避免与 Ni²⁺ 沉淀的缓冲体系' }
  ],
  steps: [
    {
      no: 1,
      phase: '表达',
      title: '诱导表达与收菌',
      purpose: '获得足量可溶性 His-tag 蛋白，确认表达条件可行。',
      summary: '按筛选条件诱导表达，收菌前取样做 SDS-PAGE，确认目标蛋白表达且尽量可溶。',
      detail: '按已验证条件接种、诱导（如 IPTG），在合适温度表达；收菌前取诱导前/后样品，SDS-PAGE 比较目标条带，必要时做可溶性分析。',
      substeps: [
        '按经验证条件接种并培养至合适 OD600，加入诱导剂。',
        '按设定温度和时间表达，记录诱导剂浓度和表达时长。',
        '收菌前取诱导前后样品，用于 SDS-PAGE 分析。',
        '离心收菌，弃上清；菌体可立即裂解或 -20 °C 暂存。'
      ],
      params: [
        { label: '诱导剂', value: 'IPTG，浓度按筛选结果' },
        { label: '表达温度', value: '常见 16–37 °C' },
        { label: '收菌', value: '4 °C，4,000–6,000 g' }
      ],
      checkpoints: [
        '诱导后目标条带明显增强。',
        '菌体量足够，表达条件已记录。'
      ],
      pitfalls: [
        { level: 'high', title: '表达条件未验证', consequence: '目标蛋白不表达或全部在包涵体', fix: '先做小试，比较诱导温度、浓度和时间，并做可溶性分析' },
        { level: 'medium', title: '收菌不彻底', consequence: '上清残留菌体，裂解液浑浊', fix: '按设定离心力充分收菌，必要时重复离心' }
      ]
    },
    {
      no: 2,
      phase: '裂解',
      title: '菌体重悬与裂解',
      purpose: '释放可溶性目标蛋白，同时抑制蛋白酶降解。',
      summary: '用含蛋白酶抑制剂的裂解缓冲液重悬，冰上超声或高压均质至菌液澄清。',
      detail: '按菌体湿重加入裂解缓冲液（含蛋白酶抑制剂），冰上超声或高压均质；超声采用短脉冲、间歇冷却，避免过热。',
      substeps: [
        '按菌体湿重加入预冷裂解缓冲液，充分重悬。',
        '加入蛋白酶抑制剂，必要时加入 DNase I 降低黏度。',
        '冰上超声或高压均质，直至菌液由黏稠变清亮。',
        '全程保持低温，避免蛋白降解或变性。'
      ],
      params: [
        { label: '裂解缓冲液', value: 'pH 7.5–8.0，含 20–40 mM 咪唑' },
        { label: '蛋白酶抑制剂', value: '按说明书加入' },
        { label: '裂解温度', value: '冰上或 4 °C' }
      ],
      checkpoints: [
        '裂解液由黏稠变清亮，无明显菌块。',
        '裂解前后样品可用于可溶性分析。'
      ],
      pitfalls: [
        { level: 'high', title: '超声过热', consequence: '目标蛋白变性或降解', fix: '短脉冲、间歇冰浴，控制温度' },
        { level: 'medium', title: '裂解不充分', consequence: '目标蛋白释放不足，产量低', fix: '延长裂解时间或增加均质压力，显微镜检查菌体破碎情况' }
      ]
    },
    {
      no: 3,
      phase: '澄清',
      title: '离心与过滤澄清',
      purpose: '去除菌体碎片和不可溶蛋白，避免堵塞 Ni-NTA 柱。',
      summary: '4 °C、≥20,000 g 离心 30 min，取上清并用 0.22–0.45 µm 滤膜过滤。',
      detail: '4 °C、≥20,000 g 离心 30 min，取上清；用 0.22–0.45 µm 滤膜过滤，减少颗粒和聚集体。',
      substeps: [
        '将裂解液分装到预冷离心管，配平。',
        '4 °C、≥20,000 g 离心 30 min。',
        '小心吸取上清，避免吸入沉淀。',
        '用 0.22–0.45 µm 滤膜过滤上清，取少量留样。'
      ],
      params: [
        { label: '离心力', value: '≥20,000 g' },
        { label: '离心时间 / 温度', value: '30 min / 4 °C' },
        { label: '过滤', value: '0.22–0.45 µm' }
      ],
      checkpoints: [
        '上清澄清，无明显颗粒。',
        '滤膜无明显堵塞，过滤体积符合预期。'
      ],
      pitfalls: [
        { level: 'high', title: '上清未澄清即上柱', consequence: '柱膜堵塞、背压升高、纯化失败', fix: '充分离心并过滤，必要时二次离心' },
        { level: 'medium', title: '过滤前未去除大颗粒', consequence: '滤膜快速堵塞，样品损失', fix: '先离心再过滤，按需要逐级过滤' }
      ]
    },
    {
      no: 4,
      phase: '平衡',
      title: 'Ni-NTA 柱平衡',
      purpose: '使树脂处于一致结合条件，保证结合效率和重复性。',
      summary: '用 5–10 倍柱体积结合缓冲液平衡 Ni-NTA 柱，流速稳定。',
      detail: '按树脂说明用 5–10 倍柱体积的结合缓冲液平衡，保持稳定流速；重力柱避免流干，FPLC 柱注意压力上限。',
      substeps: [
        '将 Ni-NTA 柱恢复至室温或按说明预冷。',
        '用 5–10 倍柱体积结合缓冲液平衡。',
        '检查流速和柱压，避免气泡进入柱床。',
        '保留平衡流出液，必要时检测 pH/电导。'
      ],
      params: [
        { label: '平衡体积', value: '5–10 倍柱体积' },
        { label: '结合缓冲液', value: '含 20–40 mM 咪唑，pH 7.5–8.0' },
        { label: '流速', value: '按树脂/柱规格' }
      ],
      checkpoints: [
        '柱床均匀，无气泡或干裂。',
        '流出液 pH 与缓冲液一致。'
      ],
      pitfalls: [
        { level: 'medium', title: '柱床进入气泡或流干', consequence: '结合不均、分辨率下降', fix: '避免柱床流干，必要时重新装柱或排气' },
        { level: 'low', title: '平衡不充分', consequence: 'pH/咪唑梯度不稳定，结合效率下降', fix: '按 5–10 倍柱体积平衡，确认流出液条件一致' }
      ]
    },
    {
      no: 5,
      phase: '结合',
      title: '上柱结合与收集穿透液',
      purpose: '让 His-tag 蛋白充分结合树脂，同时收集未结合组分用于分析。',
      summary: '将澄清上清上柱，控制流速，收集穿透液并留样。',
      detail: '将澄清上清上样，控制流速使目标蛋白与树脂充分接触；收集穿透液，后续用 SDS-PAGE 判断是否有目标蛋白流失。',
      substeps: [
        '将过滤后的上清上柱，避免引入气泡。',
        '控制流速，按树脂说明保持接触时间。',
        '收集穿透液，标记体积并留样。',
        '上样结束后用少量结合缓冲液冲洗柱外残留。'
      ],
      params: [
        { label: '上样流速', value: '按树脂说明，避免过快' },
        { label: '上样温度', value: '4 °C 或室温，按蛋白稳定性' },
        { label: '穿透液', value: '全部收集并留样' }
      ],
      checkpoints: [
        '上样过程无堵塞，流速稳定。',
        '穿透液留样可用于 SDS-PAGE。'
      ],
      pitfalls: [
        { level: 'high', title: '上样过快', consequence: '目标蛋白未充分结合，穿透液损失大', fix: '降低流速或采用批式结合，保证接触时间' },
        { level: 'medium', title: '上样液咪唑过高', consequence: '目标蛋白提前穿透', fix: '控制结合缓冲液咪唑在 20–40 mM，按蛋白优化' }
      ]
    },
    {
      no: 6,
      phase: '洗涤',
      title: '洗涤去杂',
      purpose: '去除非特异结合的宿主蛋白和弱结合杂质。',
      summary: '用含 20–40 mM 咪唑的洗涤缓冲液洗涤，直至 A280 基线稳定。',
      detail: '用 5–10 倍柱体积洗涤缓冲液洗涤，收集洗涤组分；监测 A280，待基线下降并稳定后再洗脱。',
      substeps: [
        '用含 20–40 mM 咪唑的洗涤缓冲液洗涤。',
        '收集洗涤组分，记录体积。',
        '监测 A280，直至基线稳定。',
        '洗涤组分留样，用于判断杂蛋白去除情况。'
      ],
      params: [
        { label: '洗涤体积', value: '5–10 倍柱体积' },
        { label: '洗涤咪唑', value: '20–40 mM' },
        { label: '监测', value: 'A280 基线' }
      ],
      checkpoints: [
        'A280 下降并趋于稳定。',
        '洗涤组分留样完整。'
      ],
      pitfalls: [
        { level: 'medium', title: '洗涤不充分', consequence: '杂蛋白残留，纯度下降', fix: '增加洗涤体积或适当提高洗涤咪唑，但避免目标蛋白提前洗脱' },
        { level: 'high', title: '洗涤咪唑过高', consequence: '目标蛋白被提前洗脱，产量下降', fix: '根据目标蛋白耐受性优化咪唑浓度' }
      ]
    },
    {
      no: 7,
      phase: '洗脱',
      title: '咪唑梯度洗脱',
      purpose: '竞争性洗脱 His-tag 蛋白，获得富含目标蛋白的组分。',
      summary: '用 250–500 mM 咪唑洗脱，分步收集并监测 A280，分别留样。',
      detail: '用含 250–500 mM 咪唑的洗脱缓冲液洗脱，可按 step 或线性梯度；分步收集，监测 A280，分别标记峰组分。',
      substeps: [
        '准备含 250–500 mM 咪唑的洗脱缓冲液。',
        '按 step 或线性梯度洗脱，分步收集。',
        '监测 A280，记录洗脱峰。',
        '每个组分留样，准备 SDS-PAGE 分析。'
      ],
      params: [
        { label: '洗脱咪唑', value: '250–500 mM' },
        { label: '洗脱方式', value: 'step 或线性梯度' },
        { label: '收集', value: '按峰分步收集' }
      ],
      checkpoints: [
        '出现明显洗脱峰。',
        '各组分标记清楚，留样完整。'
      ],
      pitfalls: [
        { level: 'medium', title: '洗脱体积过大', consequence: '目标蛋白被稀释，后续浓缩困难', fix: '按峰收集，避免收集过多尾部组分' },
        { level: 'low', title: '洗脱咪唑不足', consequence: '目标蛋白洗脱不完全，柱上残留', fix: '必要时提高咪唑浓度或增加洗脱体积' }
      ]
    },
    {
      no: 8,
      phase: '后处理',
      title: '透析/置换与质量检测',
      purpose: '去除咪唑并置换到稳定缓冲液，确认纯度、浓度和活性。',
      summary: '透析或脱盐去除咪唑，SDS-PAGE 检测纯度，BCA 定量并按需检测内毒素。',
      detail: '将目标组分合并，透析或脱盐去除咪唑，置换到储存缓冲液；SDS-PAGE 检测纯度和降解，BCA 定量，按用途检测内毒素或活性。',
      substeps: [
        '合并含目标蛋白的组分，记录体积。',
        '透析或脱盐去除咪唑，置换到储存缓冲液。',
        'SDS-PAGE 检测纯度、分子量和降解情况。',
        'BCA 定量，按需检测内毒素/活性并分装保存。'
      ],
      params: [
        { label: '透析/脱盐', value: '去除咪唑，置换储存缓冲液' },
        { label: '纯度检测', value: 'SDS-PAGE' },
        { label: '定量', value: 'BCA 或 A280' }
      ],
      checkpoints: [
        '目标条带清晰，纯度符合预期。',
        '浓度和内毒素/活性符合用途要求。'
      ],
      pitfalls: [
        { level: 'high', title: '咪唑残留', consequence: '影响细胞实验或蛋白活性', fix: '充分透析/脱盐，检测缓冲液电导或咪唑残留' },
        { level: 'medium', title: '透析后蛋白沉淀', consequence: '产量损失、活性下降', fix: '优化缓冲液 pH/盐浓度，透析前先小试' }
      ]
    }
  ],
  references: [
    'Ni-NTA 亲和层析树脂通用说明书',
    'His-tag 重组蛋白表达与纯化通用 SOP',
    'SDS-PAGE 与 BCA 蛋白定量标准方法'
  ]
};

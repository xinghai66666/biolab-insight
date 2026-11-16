/**
 * BioLab Insight · 生物制药实验诊断知识库
 * ------------------------------------------------------------
 * 领域知识层：定义实验类型、关键指标、正常阈值与诊断规则。
 * 该层与推理引擎解耦，可插拔、可持续扩充，是智能体的"大脑"。
 *
 * 规则条件类型（condition.type）：
 *   - low        指标低于下限        { metric, op:'lt', value }
 *   - high       指标高于上限        { metric, op:'gt', value }
 *   - outside    指标越出正常区间    { metric }
 *   - enum       枚举值命中          { metric, value }
 *   - cv         重复值变异系数过高  { metric, value(百分比) }
 *   - combo      多个子条件同时成立  { all:[...] } 或 { any:[...] }
 *
 * 数据来源与免责声明：
 * - 本知识库的阈值与规则为「通用参考值」，依据公开药典指导原则与行业常识整理，
 *   用于演示推理机制，并非任何真实产品的放行标准或注册工艺参数。
 * - 实际使用必须结合具体品种、企业 SOP、药典标准与注册工艺进行校准和验证。
 * - 可能性/置信度来自规则权重与证据强度的启发式计算，不是统计学概率或因果结论。
 * - 系统定位为辅助决策工具，不构成 GMP 放行判定或质量结论。
 */

'use strict';

const SEVERITY_WEIGHT = { critical: 4, high: 3, medium: 2, low: 1 };

const EXPERIMENT_TYPES = {
  cell_culture: {
    id: 'cell_culture',
    name: '细胞培养',
    category: '上游工艺',
    description: '贴壁/悬浮细胞的扩增培养，关注活率、密度、倍增时间与污染状况。',
    objective: '评估细胞生长状态与培养过程稳定性，及时识别培养失败风险。',
    metrics: [
      { key: 'viability', label: '细胞活率', unit: '%', type: 'number', normal: [90, 100], optimal: [95, 100], criticalLow: 70 },
      { key: 'vcd', label: '活细胞密度', unit: '×10⁶/mL', type: 'number', normal: [1.0, 8.0], optimal: [2.0, 6.0], note: '随培养规模与工艺不同，悬浮批培养可更高' },
      { key: 'doublingTime', label: '倍增时间', unit: 'h', type: 'number', normal: [18, 30], optimal: [20, 26] },
      { key: 'mycoplasma', label: '支原体检测', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'contamination', label: '微生物污染', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' }
    ],
    rules: [
      {
        id: 'cc_viability_low', title: '细胞活率低于正常下限', category: '细胞状态', severity: 'high', likelihood: 0.82,
        condition: { type: 'low', metric: 'viability' },
        causes: [
          '营养物质耗竭或代谢废物（乳酸、氨）累积，培养基更换周期过长',
          'pH、温度、CO₂ 或渗透压等培养条件偏移',
          '接种密度不当或传代时机过晚，细胞进入衰亡期',
          '隐匿性细菌或支原体污染'
        ],
        actions: [
          '镜检细胞形态，观察是否出现圆缩、脱落、碎片增多',
          '核对培养基颜色与更换记录，缩短换液周期或进行灌流',
          '校准培养箱温度、CO₂ 浓度与 pH，检测培养基渗透压',
          '取上清做支原体与无菌检测，排除污染'
        ]
      },
      {
        id: 'cc_vcd_low', title: '活细胞密度不足', category: '生长动力学', severity: 'medium', likelihood: 0.8,
        condition: { type: 'low', metric: 'vcd' },
        causes: ['接种密度偏低', '培养基或血清批次差异导致生长受限', '细胞状态未恢复即进入下一批次'],
        actions: ['核对种子细胞状态与接种计算', '比对不同批次培养基/血清的生长曲线', '延长种子扩增或调整接种比例']
      },
      {
        id: 'cc_doubling_long', title: '倍增时间延长', category: '生长动力学', severity: 'medium', likelihood: 0.78,
        condition: { type: 'high', metric: 'doublingTime' },
        causes: ['细胞状态退化或传代次数过高', '培养基/血清质量下降', '培养温度偏低或 CO₂ 异常', '存在低速生长的污染物'],
        actions: ['核对细胞代次并复苏低代次种子', '更换培养基与血清批次并做生长对比', '校准培养箱参数', '开展无菌与支原体检测']
      },
      {
        id: 'cc_mycoplasma', title: '支原体污染', category: '污染控制', severity: 'critical', likelihood: 0.98,
        condition: { type: 'enum', metric: 'mycoplasma', value: '阳性' },
        causes: ['种子细胞或原始细胞库携带', '操作过程或试剂、血清污染', '培养器皿/环境交叉污染'],
        actions: ['立即隔离该批次并暂停放行', '使用支原体清除试剂处理或丢弃，追溯来源', '对同区域所有细胞系做支原体筛查', '复核无菌操作规范与耗材灭菌记录']
      },
      {
        id: 'cc_contamination', title: '微生物污染', category: '污染控制', severity: 'critical', likelihood: 0.98,
        condition: { type: 'enum', metric: 'contamination', value: '阳性' },
        causes: ['无菌操作失误', '培养基/血清/耗材灭菌不彻底', '培养箱或超净台环境污染'],
        actions: ['立即隔离并按规定销毁污染批次', '镜检确认污染类型（细菌/真菌）', '对操作环境与耗材做污染溯源', '复盘无菌操作流程与人员培训']
      },
      {
        id: 'cc_viability_vcd_combo', title: '密度与活率同步下降（批量衰亡）', category: '综合异常', severity: 'high', likelihood: 0.85,
        condition: { type: 'combo', all: [
          { type: 'low', metric: 'viability' }, { type: 'low', metric: 'vcd' }
        ] },
        causes: ['培养基失效或批次问题', '大规模污染', '培养参数严重偏离（温度/CO₂/pH）'],
        actions: ['优先排查污染与培养参数', '更换培养基批次做平行验证', '评估该批细胞是否可继续用于生产']
      }
    ]
  },

  protein_purification: {
    id: 'protein_purification',
    name: '蛋白纯化',
    category: '下游工艺',
    description: '层析纯化过程，关注纯度、回收率、内毒素与聚集水平。',
    objective: '评估纯化效果与产品质量属性，识别工艺偏离与质量风险。',
    metrics: [
      { key: 'purity', label: '纯度', unit: '%', type: 'number', normal: [95, 100], optimal: [98, 100], criticalLow: 85, note: '按品种放行标准调整；此处为常见单抗参考值' },
      { key: 'recovery', label: '回收率', unit: '%', type: 'number', normal: [60, 100], optimal: [75, 100], criticalLow: 40 },
      { key: 'endotoxin', label: '内毒素', unit: 'EU/mg', type: 'number', normal: [0, 0.5], optimal: [0, 0.25], criticalHigh: 2.0, note: '单抗限值按药典 L=K/M 由临床剂量计算，常见 ≤0.5 EU/mg；此处为通用参考值' },
      { key: 'aggregation', label: '聚集率', unit: '%', type: 'number', normal: [0, 5], optimal: [0, 2], criticalHigh: 10 },
      { key: 'concentration', label: '蛋白浓度', unit: 'mg/mL', type: 'number', normal: [1, 50], optimal: [5, 30] }
    ],
    rules: [
      {
        id: 'pp_purity_low', title: '产品纯度不达标', category: '分离效果', severity: 'high', likelihood: 0.9,
        condition: { type: 'low', metric: 'purity' },
        causes: ['层析洗脱梯度或盐浓度设置不当，杂质共洗脱', '上样量过载导致分离度下降', '样品澄清不足或前处理不充分', '层析柱效下降或填料老化'],
        actions: ['优化洗脱梯度并做梯度筛选实验', '降低上样载量，验证突破曲线', '强化澄清过滤与样品前处理', '检测柱效（理论塔板数/对称因子）并评估更换填料']
      },
      {
        id: 'pp_recovery_low', title: '回收率偏低', category: '工艺收率', severity: 'medium', likelihood: 0.86,
        condition: { type: 'low', metric: 'recovery' },
        causes: ['目标蛋白结合不充分或洗脱不完全', '蛋白降解或沉淀损失', '过滤/管路非特异性吸附', '上样或洗脱流速过快'],
        actions: ['检查上样 pH 与电导，优化结合条件', '延长洗脱或提高洗脱强度，收集分段检测', '添加稳定剂/抑制剂防止降解', '排查滤膜与管路吸附，优化流速']
      },
      {
        id: 'pp_endotoxin_high', title: '内毒素超限', category: '安全质量', severity: 'critical', likelihood: 0.95,
        condition: { type: 'high', metric: 'endotoxin' },
        causes: ['层析介质或缓冲液内毒素污染', '工艺用水或原辅料内毒素超标', '操作环境/器具污染', '革兰阴性菌污染后裂解释放'],
        actions: ['隔离批次并复测内毒素', '排查工艺用水、缓冲液与填料的内毒素水平', '增加内毒素去除步骤（阴离子交换/亲和层析）', '排查微生物污染来源']
      },
      {
        id: 'pp_aggregation_high', title: '聚集体升高', category: '产品稳定性', severity: 'high', likelihood: 0.87,
        condition: { type: 'high', metric: 'aggregation' },
        causes: ['pH 接近蛋白等电点', '蛋白浓度过高或局部过浓', '反复冻融、剪切力或界面应力', '温度偏高或缓冲液组分不适'],
        actions: ['SEC 复核聚集体水平并做方法学确认', '调整 pH 远离等电点、优化缓冲液与添加剂', '降低浓度、减少冻融循环与泵剪切', '评估储存条件与稳定性']
      },
      {
        id: 'pp_purity_recovery_combo', title: '纯度与回收率同步偏低', category: '综合异常', severity: 'high', likelihood: 0.82,
        condition: { type: 'combo', all: [
          { type: 'low', metric: 'purity' }, { type: 'low', metric: 'recovery' }
        ] },
        causes: ['层析工艺整体偏离（上样、洗脱、流速）', '样品质量差导致纯化难度增加', '填料性能下降'],
        actions: ['系统复核工艺参数与批记录', '评估上游澄清液质量', '开展小试 DOE 优化层析工艺']
      }
    ]
  },

  qpcr: {
    id: 'qpcr',
    name: 'qPCR',
    category: '分析检测',
    description: '实时荧光定量 PCR，关注扩增效率、标准曲线、阴性对照与重复性。',
    objective: '验证检测体系的特异性与灵敏度，确认定量结果可靠。',
    metrics: [
      { key: 'efficiency', label: '扩增效率', unit: '%', type: 'number', normal: [90, 110], optimal: [95, 105] },
      { key: 'r2', label: '标准曲线 R²', unit: '', type: 'number', normal: [0.99, 1], optimal: [0.995, 1] },
      { key: 'ntcCt', label: 'NTC Ct', unit: '', type: 'number', normal: [35, 45], optimal: [38, 45], note: '无模板对照应无扩增；MIQE 建议 NTC 无 Ct 或 Ct ≥ 40，35 为常见实验室放宽判定线' },
      { key: 'tm', label: '熔解温度 Tm', unit: '°C', type: 'number', normal: [70, 95], note: '应与预期产物 Tm 一致（±1 °C）；此处仅为物理合理区间，不能替代引物特异性验证' },
      { key: 'replicateCv', label: '复孔 CV', unit: '%', type: 'number', normal: [0, 5], optimal: [0, 2], criticalHigh: 10 }
    ],
    rules: [
      {
        id: 'qpcr_efficiency_out', title: '扩增效率偏离', category: '体系性能', severity: 'medium', likelihood: 0.85,
        condition: { type: 'outside', metric: 'efficiency' },
        causes: ['引物设计或浓度不佳，存在二聚体', '模板量或稀释梯度不准确', '反应体系存在抑制物', '仪器温控或荧光通道校准偏差'],
        actions: ['重新设计/滴定引物浓度', '复核标准品稀释与移液准确性', '纯化模板去除抑制物', '校准仪器并做板间校正']
      },
      {
        id: 'qpcr_r2_low', title: '标准曲线线性不佳', category: '定量可靠性', severity: 'high', likelihood: 0.9,
        condition: { type: 'low', metric: 'r2' },
        causes: ['标准品稀释梯度不准或混匀不足', '加样误差或孔间蒸发', '标准品降解或浓度错误'],
        actions: ['重新配制标准品梯度并充分混匀', '校准移液器、规范加样与封板', '更换标准品复测']
      },
      {
        id: 'qpcr_ntc_amp', title: '阴性对照出现扩增（污染）', category: '污染控制', severity: 'critical', likelihood: 0.97,
        condition: { type: 'low', metric: 'ntcCt' },
        causes: ['试剂或耗材被扩增产物气溶胶污染', '加样过程交叉污染', '环境气溶胶污染'],
        actions: ['立即停用可疑试剂并更换新批次', '严格分区（试剂准备/样本处理/扩增）操作', '清洁枪具、台面与仪器，使用带滤芯吸头', '复测并调查污染来源']
      },
      {
        id: 'qpcr_cv_high', title: '复孔重复性差', category: '精密度', severity: 'medium', likelihood: 0.84,
        condition: { type: 'high', metric: 'replicateCv' },
        causes: ['移液误差或加样不均', '孔间温度差异或边缘效应', '模板量少导致的抽样误差'],
        actions: ['校准移液器并规范加样', '使用热封膜、避免边缘效应', '增加模板量或重复孔数']
      },
      {
        id: 'qpcr_tm_abnormal', title: 'Tm 偏离常规区间（疑非特异产物）', category: '特异性', severity: 'medium', likelihood: 0.78,
        condition: { type: 'outside', metric: 'tm' },
        causes: ['引物特异性差或存在非特异扩增', '引物二聚体', '反应条件（退火温度）不适'],
        actions: ['电泳或测序确认产物特异性', '优化退火温度与引物浓度', '重新设计引物']
      }
    ]
  },

  western_blot: {
    id: 'western_blot',
    name: 'Western Blot',
    category: '分析检测',
    description: '蛋白免疫印迹，关注上样均一性、背景、条带特异性与转膜效果。',
    objective: '确认目标蛋白表达水平与检测体系可靠性。',
    metrics: [
      { key: 'targetIntensity', label: '目标条带灰度（原始）', unit: 'a.u.', type: 'number', normal: [0, 100000000], hideRange: true, note: '与成像系统/曝光时间相关，不设合格阈值；判读以目标/内参归一化与批间比较为准' },
      { key: 'targetBand', label: '目标条带', unit: '', type: 'enum', options: ['检出', '未检出'], expected: '检出' },
      { key: 'loadingCv', label: '内参均一性 CV', unit: '%', type: 'number', normal: [0, 15], optimal: [0, 10], criticalHigh: 25 },
      { key: 'background', label: '背景信号', unit: 'a.u.', type: 'number', normal: [0, 500], optimal: [0, 200], hideRange: true, note: '相对值，仅作批内比较；不同曝光条件之间不可直接比较，不设合格阈值' },
      { key: 'bandCount', label: '特异性条带数', unit: '条', type: 'number', normal: [1, 1], note: '应为单一特异性条带' }
    ],
    rules: [
      {
        id: 'wb_loading_cv_high', title: '上样量不均（内参差异大）', category: '上样质量', severity: 'high', likelihood: 0.9,
        condition: { type: 'high', metric: 'loadingCv' },
        causes: ['蛋白定量不准或上样量不一致', '上样孔漏样或气泡', '转膜不均'],
        actions: ['重新定量并校正上样量', '检查上样操作与凝胶孔', '用丽春红染色检查转膜均一性', '以总蛋白染色作为上样对照']
      },
      {
        id: 'wb_background_high', title: '背景过高', category: '信噪比', severity: 'medium', likelihood: 0.86,
        condition: { type: 'high', metric: 'background' },
        causes: ['封闭不足或封闭剂不匹配', '一抗/二抗浓度过高', '洗涤不充分', '曝光过度'],
        actions: ['延长封闭时间或更换封闭剂（BSA/脱脂奶）', '滴定抗体浓度', '增加洗涤次数与时长', '优化曝光参数']
      },
      {
        id: 'wb_multi_band', title: '出现多条非特异性条带', category: '特异性', severity: 'medium', likelihood: 0.85,
        condition: { type: 'high', metric: 'bandCount' },
        causes: ['抗体特异性不足', '蛋白降解产生片段', '转载或封闭不充分导致非特异结合'],
        actions: ['更换验证过的一抗或做抗体吸附', '加入蛋白酶抑制剂、避免反复冻融', '提高封闭与洗涤强度']
      },
      {
        id: 'wb_no_signal', title: '目标条带信号缺失', category: '检测失败', severity: 'high', likelihood: 0.85,
        condition: { type: 'enum', metric: 'targetBand', value: '未检出' },
        causes: ['转膜失败或蛋白未转移', '一抗失效或稀释度过高', '目标蛋白不表达或表达量极低', '底物失效'],
        actions: ['丽春红验证转膜效果', '设置阳性对照并滴定一抗', '确认样本与诱导条件', '更换 ECL 底物并缩短曝光检查']
      }
    ]
  },

  elisa: {
    id: 'elisa',
    name: 'ELISA',
    category: '分析检测',
    description: '酶联免疫吸附测定，关注标准曲线、精密度、空白与回收率。',
    objective: '确认检测体系准确性与精密度，保证定量结果可信。',
    metrics: [
      { key: 'standardR2', label: '标准曲线 R²', unit: '', type: 'number', normal: [0.99, 1], optimal: [0.995, 1] },
      { key: 'replicateCv', label: '复孔 CV', unit: '%', type: 'number', normal: [0, 10], optimal: [0, 5], criticalHigh: 20 },
      { key: 'blankOd', label: '空白 OD', unit: '', type: 'number', normal: [0, 0.1], optimal: [0, 0.05] },
      { key: 'recovery', label: '加标回收率', unit: '%', type: 'number', normal: [80, 120], optimal: [90, 110] }
    ],
    rules: [
      {
        id: 'elisa_r2_low', title: '标准曲线线性不佳', category: '定量可靠性', severity: 'high', likelihood: 0.9,
        condition: { type: 'low', metric: 'standardR2' },
        causes: ['标准品稀释或配制错误', '加样误差', '标准品降解', '酶标仪读数异常'],
        actions: ['重新配制标准品梯度', '校准移液器并规范加样', '更换标准品复测', '检查酶标仪波长与读数']
      },
      {
        id: 'elisa_cv_high', title: '复孔精密度差', category: '精密度', severity: 'medium', likelihood: 0.88,
        condition: { type: 'high', metric: 'replicateCv' },
        causes: ['移液误差', '洗板不均或洗液残留', '孵育温度/时间不均', '板边缘效应'],
        actions: ['校准移液器、规范复孔加样', '规范洗板流程、拍干残液', '使用恒温振荡孵育并避免边缘效应']
      },
      {
        id: 'elisa_blank_high', title: '空白值偏高', category: '背景', severity: 'medium', likelihood: 0.84,
        condition: { type: 'high', metric: 'blankOd' },
        causes: ['洗板不充分', '底物污染或自发显色', '试剂或耗材污染', '显色时间过长'],
        actions: ['增加洗涤次数与拍干', '更换底物与试剂', '排查耗材污染', '严格控制显色与终止时间']
      },
      {
        id: 'elisa_recovery_out', title: '加标回收率偏离', category: '准确度', severity: 'high', likelihood: 0.86,
        condition: { type: 'outside', metric: 'recovery' },
        causes: ['基质效应或干扰物存在', '稀释倍数不合适', '标准品与样本基质不匹配'],
        actions: ['优化稀释倍数与样本前处理', '采用基质匹配的标准品', '做稀释线性与加标回收验证']
      }
    ]
  },

  sterility: {
    id: 'sterility',
    name: '无菌检测',
    category: '质量控制',
    description: '无菌检查，关注阴性对照、阳性对照与供试品管的培养结果。',
    objective: '确认供试品无菌以及检测体系本身有效。',
    metrics: [
      { key: 'negativeControl', label: '阴性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'positiveControl', label: '阳性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阳性', failureSeverity: 'critical' },
      { key: 'sampleTube', label: '供试品管', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'cultureDays', label: '培养天数', unit: 'd', type: 'number', normal: [14, 30], criticalLow: 7, note: '药典常规方法不少于 14 天；延长培养不视为偏差，快速方法按验证周期判定' }
    ],
    rules: [
      {
        id: 'st_negative_positive', title: '阴性对照阳性（试验无效）', category: '对照失效', severity: 'critical', likelihood: 0.98,
        condition: { type: 'enum', metric: 'negativeControl', value: '阳性' },
        causes: ['培养基、稀释液或器具污染', '操作环境或人员带入污染', '交叉污染'],
        actions: ['判定本次试验无效，重新取样检测', '排查培养基灭菌与耗材无菌性', '复查操作环境、人员操作与分区', '对污染来源做微生物鉴定']
      },
      {
        id: 'st_positive_negative', title: '阳性对照阴性（体系失效）', category: '对照失效', severity: 'critical', likelihood: 0.97,
        condition: { type: 'enum', metric: 'positiveControl', value: '阴性' },
        causes: ['培养基营养失效或灭菌过度', '培养条件（温度/时间）不当', '阳性菌株失活或接种量不足', '存在抑菌物质'],
        actions: ['判定试验无效并重新验证体系', '检查培养基促生长能力（GPT）', '校准培养温度与时长', '复核阳性对照菌株活性与接种量']
      },
      {
        id: 'st_sample_positive', title: '供试品检出微生物', category: '产品质量', severity: 'critical', likelihood: 0.96,
        condition: { type: 'enum', metric: 'sampleTube', value: '阳性' },
        causes: ['产品本身污染', '取样或检测过程污染（需结合对照判定）', '生产环境或工艺污染'],
        actions: ['隔离产品并按 OOS/OOT 流程调查', '结合对照结果区分真阳性与操作污染', '对检出菌做鉴定与溯源', '评估对已放行批次的影响']
      },
      {
        id: 'st_days_short', title: '培养周期不足', category: '方法合规', severity: 'medium', likelihood: 0.8,
        condition: { type: 'low', metric: 'cultureDays' },
        causes: ['提前判读结果', '未按药典/SOP 执行培养周期'],
        actions: ['补足培养天数后判读', '复核 SOP 与培养记录', '开展人员培训']
      }
    ]
  },

  plasmid_prep: {
    id: 'plasmid_prep',
    name: '质粒制备',
    category: '分子生物学',
    description: '碱裂解法小量制备质粒，关注产量、纯度、超螺旋比例与内毒素水平。',
    objective: '获得足量、完整、低内毒素的质粒 DNA，用于酶切、测序、转染等下游实验。',
    metrics: [
      { key: 'concentration', label: '质粒浓度', unit: 'µg/µL', type: 'number', normal: [0.2, 2.0], optimal: [0.5, 1.5], criticalLow: 0.05, note: '随拷贝数、菌液体积与洗脱体积变化' },
      { key: 'a260_280', label: 'A260/A280', unit: '', type: 'number', normal: [1.8, 2.0], criticalLow: 1.6 },
      { key: 'a260_230', label: 'A260/A230', unit: '', type: 'number', normal: [2.0, 3.0], criticalLow: 1.5, note: '偏低提示盐、乙醇或胍盐残留；高于 2.6 多与浓度低或空白异常有关，不作为污染判据' },
      { key: 'endotoxin', label: '内毒素', unit: 'EU/µg', type: 'number', normal: [0, 0.1], optimal: [0, 0.05], criticalHigh: 1.0, note: '转染级通常要求 <0.1 EU/µg' },
      { key: 'supercoil', label: '超螺旋比例', unit: '%', type: 'number', normal: [80, 100], criticalLow: 60, note: '琼脂糖凝胶电泳评估' }
    ],
    rules: [
      {
        id: 'pp_a280_low', title: '蛋白/酚残留（A260/A280 偏低）', category: '纯度', severity: 'high', likelihood: 0.85,
        condition: { type: 'low', metric: 'a260_280' },
        causes: ['裂解后中和不充分，蛋白未完全沉淀', '上清转移时带入白色絮状物', '漂洗不彻底或漂洗液乙醇未加', '菌液过量导致柱载量饱和'],
        actions: ['中和后冰浴并充分离心，只取澄清上清', '减少起始菌液量或分柱上样', '按说明书补加乙醇到漂洗液并重新漂洗', '用酚/氯仿或硅胶柱再纯化一次']
      },
      {
        id: 'pp_a230_low', title: '盐/乙醇残留（A260/A230 偏低）', category: '纯度', severity: 'medium', likelihood: 0.82,
        condition: { type: 'low', metric: 'a260_230' },
        causes: ['漂洗液乙醇浓度不足或漂洗次数不够', '柱膜干燥不充分，乙醇残留', '洗脱缓冲液盐浓度偏高'],
        actions: ['确认漂洗液已按说明加入无水乙醇', '补做一次漂洗并空柱离心 1–2 min', '开盖静置使乙醇挥发后再洗脱', '换用低盐洗脱缓冲液']
      },
      {
        id: 'pp_endotoxin_high', title: '内毒素超限', category: '安全性', severity: 'critical', likelihood: 0.9,
        condition: { type: 'high', metric: 'endotoxin' },
        causes: ['未使用内毒素清除步骤或清除柱', '菌体裂解过度，释放大量 LPS', '耗材、水或缓冲液本身带内毒素', '菌液培养时间过长'],
        actions: ['改用带内毒素清除的试剂盒并复核操作', '控制裂解时间，避免剧烈振荡', '更换无内毒素水与耗材', '按 LAL 法复测，达标后再用于转染']
      },
      {
        id: 'pp_yield_low', title: '质粒产量偏低', category: '产量', severity: 'medium', likelihood: 0.8,
        condition: { type: 'low', metric: 'concentration' },
        causes: ['菌液浓度不足或培养时间过短', '质粒拷贝数低（如 pBR322 骨架）', '洗脱体积过小或洗脱不充分', '柱载量饱和导致损失'],
        actions: ['提高接种量或延长培养至 OD600 2–4', '确认菌株与质粒拷贝数，必要时改用高拷贝宿主', '增加洗脱体积并 65 °C 预热洗脱液', '复测浓度，必要时合并多管']
      },
      {
        id: 'pp_supercoil_low', title: '超螺旋比例偏低', category: '完整性', severity: 'medium', likelihood: 0.78,
        condition: { type: 'low', metric: 'supercoil' },
        causes: ['裂解时间过长或剧烈振荡导致机械剪切', '核酸酶未充分失活', '反复冻融造成开环', '洗脱液 pH 偏低'],
        actions: ['严格控制在 5 min 内温和颠倒混匀', '确认 P1 中 RNase A 已加入并在有效期内', '避免反复冻融，分装保存', '使用 pH 8.0 洗脱液']
      }
    ]
  },

  cell_cryo: {
    id: 'cell_cryo',
    name: '细胞冻存与复苏',
    category: '上游工艺',
    description: '细胞冻存、复苏过程，关注复苏活率、贴壁率与复苏后生长恢复。',
    objective: '评估冻存与复苏操作是否对细胞造成损伤，保证种子细胞可用。',
    metrics: [
      { key: 'viability', label: '复苏活率', unit: '%', type: 'number', normal: [85, 100], optimal: [90, 100], criticalLow: 60 },
      { key: 'attachment', label: '24 h 贴壁率', unit: '%', type: 'number', normal: [70, 100], criticalLow: 40 },
      { key: 'doublingTime', label: '复苏后倍增时间', unit: 'h', type: 'number', normal: [18, 30], criticalHigh: 40 },
      { key: 'confluency', label: '72 h 融合度', unit: '%', type: 'number', normal: [60, 100], criticalLow: 30 },
      { key: 'contamination', label: '微生物污染', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' }
    ],
    rules: [
      {
        id: 'cc2_viability_low', title: '复苏活率偏低', category: '冻存损伤', severity: 'high', likelihood: 0.86,
        condition: { type: 'low', metric: 'viability' },
        causes: ['冻存降温速率不当（未用程序降温或异丙醇盒）', '冻存液 DMSO 终浓度不合适或未预冷', '冻存时间过长或液氮液位不足', '复苏时水浴温度/时间不当，冰晶未快速融化'],
        actions: ['使用程序降温盒，-80 °C 过夜后转液氮', '冻存液现配预冷，DMSO 终浓度 5–10%', '核查液氮罐液位与冻存记录', '37 °C 水浴 1–2 min 快速融化，勿摇晃']
      },
      {
        id: 'cc2_attachment_low', title: '24 h 贴壁率偏低', category: '复苏状态', severity: 'medium', likelihood: 0.82,
        condition: { type: 'low', metric: 'attachment' },
        causes: ['复苏后未充分去除 DMSO', '接种密度过低或培养基/血清批次差异', '培养瓶表面处理或包被不匹配', '细胞受损后贴壁能力下降'],
        actions: ['复苏后离心换液或用半量换液法去除 DMSO', '提高接种密度并核对培养基与血清', '确认培养器皿类型（贴壁/超低吸附）', '延长观察至 48 h 再判定']
      },
      {
        id: 'cc2_doubling_long', title: '复苏后生长恢复缓慢', category: '生长恢复', severity: 'medium', likelihood: 0.78,
        condition: { type: 'high', metric: 'doublingTime' },
        causes: ['冻存前细胞状态不佳或代次过高', '复苏初期活率低，需更长恢复期', '培养基、血清或谷氨酰胺不足', '存在低速生长的污染'],
        actions: ['冻存前确认对数生长期、活率 >90%', '复苏后前两代适当降低传代比例', '更换新鲜培养基并补加谷氨酰胺', '做支原体与无菌检测']
      },
      {
        id: 'cc2_contamination', title: '复苏后微生物污染', category: '污染控制', severity: 'critical', likelihood: 0.97,
        condition: { type: 'enum', metric: 'contamination', value: '阳性' },
        causes: ['冻存前已污染但未检出', '冻存管密封不良，液氮渗入', '水浴复苏时污染（水浴未清洁）', '操作过程交叉污染'],
        actions: ['立即隔离并销毁该管，停止使用该批冻存细胞', '水浴定期换水并加消毒剂，复苏管开口前消毒', '复苏后做无菌与支原体检测', '追溯同批冻存管的污染情况']
      }
    ]
  },

  mycoplasma: {
    id: 'mycoplasma',
    name: '支原体检测（PCR）',
    category: '质量控制',
    description: 'PCR 法支原体检测，关注对照有效性、内参扩增与样品判定。',
    objective: '判断培养物是否被支原体污染，并确认检测体系本身有效。',
    metrics: [
      { key: 'negativeControl', label: '阴性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'positiveControl', label: '阳性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阳性', failureSeverity: 'critical' },
      { key: 'internalControl', label: '内参对照', unit: '', type: 'enum', options: ['有效', '无效'], expected: '有效' },
      { key: 'sampleResult', label: '样品结果', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'a260_280', label: '模板 A260/A280', unit: '', type: 'number', normal: [1.8, 2.0], criticalLow: 1.6, note: '反映模板纯度，偏低易抑制扩增' }
    ],
    rules: [
      {
        id: 'my_sample_positive', title: '检出支原体污染', category: '污染控制', severity: 'critical', likelihood: 0.95,
        condition: { type: 'enum', metric: 'sampleResult', value: '阳性' },
        causes: ['种子细胞或原始细胞库携带支原体', '血清、培养基或操作带入', '同区域细胞交叉污染', '培养箱或超净台环境污染'],
        actions: ['立即隔离该细胞并暂停相关实验', '同区域所有细胞系做支原体筛查', '使用支原体清除试剂处理或丢弃该批细胞', '追溯血清批次与环境监测记录']
      },
      {
        id: 'my_negative_positive', title: '阴性对照出现条带（结果无效）', category: '对照失效', severity: 'critical', likelihood: 0.93,
        condition: { type: 'enum', metric: 'negativeControl', value: '阳性' },
        causes: ['试剂或耗材被扩增产物污染（气溶胶）', '加样交叉污染', '实验室分区不合理'],
        actions: ['判定本次检测无效并重做', '更换新批试剂与滤芯吸头', '严格分区操作（配液/提取/扩增）', '对操作台与移液器做清洁去污']
      },
      {
        id: 'my_positive_negative', title: '阳性对照无条带（体系失效）', category: '对照失效', severity: 'high', likelihood: 0.9,
        condition: { type: 'enum', metric: 'positiveControl', value: '阴性' },
        causes: ['引物/酶失活或试剂过期', 'PCR 程序或退火温度设置错误', '阳性对照模板降解或稀释过度'],
        actions: ['更换试剂并复核 PCR 程序', '重新稀释阳性对照模板', '确认仪器升降温性能', '体系恢复后再判定样品结果']
      },
      {
        id: 'my_internal_invalid', title: '内参未扩增（可能存在抑制）', category: '方法有效性', severity: 'high', likelihood: 0.88,
        condition: { type: 'enum', metric: 'internalControl', value: '无效' },
        causes: ['模板中残留 SDS、胍盐、乙醇或蛋白', '模板量过高', '提取效率低导致 DNA 不足'],
        actions: ['重新提取模板并做纯度检查', '对模板做 1:5–1:10 稀释后复测', '增加洗涤步骤去除抑制物', '必要时用柱纯化模板']
      }
    ]
  },

  sds_page: {
    id: 'sds_page',
    name: 'SDS-PAGE 电泳',
    category: '蛋白科学',
    description: '变性凝胶电泳，关注条带清晰度、分离效果、上样一致性与分子量准确性。',
    objective: '评估蛋白样品的完整性、浓度一致性与分离质量，为后续染色或免疫印迹提供依据。',
    metrics: [
      { key: 'bandClarity', label: '条带形态', unit: '', type: 'enum', options: ['清晰', '弥散', '拖尾'], expected: '清晰' },
      { key: 'background', label: '凝胶背景', unit: '', type: 'enum', options: ['低', '高'], expected: '低' },
      { key: 'mwDeviation', label: '目标条带分子量偏差', unit: '%', type: 'number', normal: [0, 10], criticalHigh: 20 },
      { key: 'loadingCv', label: '上样量 CV', unit: '%', type: 'number', normal: [0, 8], criticalHigh: 15, note: '多孔上样时用重复孔计算' },
      { key: 'resolution', label: '分离效果', unit: '', type: 'enum', options: ['良好', '分离不佳'], expected: '良好' }
    ],
    rules: [
      {
        id: 'sp_band_diffuse', title: '条带弥散或拖尾', category: '样品质量', severity: 'medium', likelihood: 0.85,
        condition: { type: 'enum', metric: 'bandClarity', value: '弥散' },
        causes: ['样品反复冻融或蛋白酶降解', '上样量过大导致超载', '样品未充分变性（还原剂不足/煮沸不够）', '凝胶聚合不均匀'],
        actions: ['新鲜制备样品并加蛋白酶抑制剂', '降低上样量后复跑', '补加 DTT/β-巯基乙醇并充分煮沸 5 min', '重新灌胶，确保聚合完全']
      },
      {
        id: 'sp_band_smear', title: '条带拖尾', category: '电泳条件', severity: 'medium', likelihood: 0.8,
        condition: { type: 'enum', metric: 'bandClarity', value: '拖尾' },
        causes: ['电压过高导致产热', '缓冲液重复使用多次，离子强度下降', '样品盐浓度过高', '凝胶浓度与目标分子量不匹配'],
        actions: ['降低电压或延长电泳时间', '更换新鲜电泳缓冲液', '样品脱盐或稀释后上样', '按分子量选择合适浓度的凝胶']
      },
      {
        id: 'sp_background_high', title: '凝胶背景偏高', category: '染色/脱色', severity: 'low', likelihood: 0.78,
        condition: { type: 'enum', metric: 'background', value: '高' },
        causes: ['染色时间过长或染料浓度过高', '脱色不充分', '凝胶厚度不均或染色容器不洁', '上样量过大'],
        actions: ['缩短染色时间并按 SOP 脱色至背景干净', '更换脱色液并延长脱色', '使用洁净容器与新鲜染液', '适当降低上样量']
      },
      {
        id: 'sp_mw_deviation', title: '目标条带分子量偏差', category: '结果判读', severity: 'medium', likelihood: 0.8,
        condition: { type: 'high', metric: 'mwDeviation' },
        causes: ['Marker 与样品不在同一块胶或 Marker 失效', '凝胶浓度不匹配导致分离偏差', '蛋白发生降解或修饰', '样品还原不充分形成二聚体'],
        actions: ['Marker 与样品同胶上样并核对批次', '按目标分子量选择胶浓度', '检查样品完整性（必要时测序/质谱确认）', '充分还原后复跑']
      },
      {
        id: 'sp_loading_cv', title: '上样量一致性差', category: '操作一致性', severity: 'low', likelihood: 0.8,
        condition: { type: 'high', metric: 'loadingCv' },
        causes: ['蛋白定量不准确（BCA/Bradford 未做复孔）', '移液误差或吸头挂壁', '样品黏稠导致取样不均'],
        actions: ['复测蛋白浓度并做复孔定量', '使用同一支移液器与滤芯吸头', '黏稠样品适当稀释或超声处理']
      }
    ]
  },

  dna_gel: {
    id: 'dna_gel',
    name: 'DNA 凝胶回收',
    category: '分子生物学',
    description: '琼脂糖凝胶电泳后回收目的片段，关注回收率、纯度与片段特异性。',
    objective: '获得足量、纯净的目的 DNA 片段，用于连接、测序或克隆。',
    metrics: [
      { key: 'recovery', label: '回收率', unit: '%', type: 'number', normal: [50, 95], criticalLow: 30, note: '按投入量与回收量计算；随片段大小与胶浓度变化，常规 50–80%' },
      { key: 'concentration', label: '回收浓度', unit: 'ng/µL', type: 'number', normal: [10, 100], criticalLow: 5 },
      { key: 'a260_280', label: 'A260/A280', unit: '', type: 'number', normal: [1.7, 2.0], criticalLow: 1.5 },
      { key: 'bandCheck', label: '回收后电泳验证', unit: '', type: 'enum', options: ['单一条带', '杂带'], expected: '单一条带' },
      { key: 'elutionVolume', label: '洗脱体积', unit: 'µL', type: 'number', normal: [10, 200], criticalLow: 5, note: '按所需浓度调整，仅作记录，不作质量判定' }
    ],
    rules: [
      {
        id: 'dg_recovery_low', title: '回收率偏低', category: '回收工艺', severity: 'medium', likelihood: 0.85,
        condition: { type: 'low', metric: 'recovery' },
        causes: ['胶块过大导致溶胶不彻底', '溶胶液体积不足或温度不够', '洗脱不充分（体积小、时间短）', '紫外照射时间过长造成 DNA 损伤'],
        actions: ['切胶尽量薄，按胶重 1:3 加溶胶液', '56 °C 水浴至完全溶解并中途混匀', '洗脱液预热 65 °C，静置 2 min 后离心', '缩短紫外曝光时间']
      },
      {
        id: 'dg_purity_low', title: '回收产物纯度偏低', category: '纯度', severity: 'medium', likelihood: 0.8,
        condition: { type: 'low', metric: 'a260_280' },
        causes: ['胍盐/乙醇残留未充分洗涤', '洗脱液 pH 偏低', '胶中琼脂糖残留'],
        actions: ['按说明书完成两次洗涤并空柱离心', '使用 pH 8.0 洗脱液', '溶胶后观察是否完全澄清再上柱']
      },
      {
        id: 'dg_extra_band', title: '回收产物出现杂带', category: '片段特异性', severity: 'medium', likelihood: 0.82,
        condition: { type: 'enum', metric: 'bandCheck', value: '杂带' },
        causes: ['切胶时带入邻近条带', '紫外下操作时间过长导致判断偏差', '模板本身存在非特异扩增'],
        actions: ['在蓝光或低强度紫外下精确切胶', '重新跑胶并缩小切胶范围', '优化 PCR 条件减少非特异产物']
      },
      {
        id: 'dg_yield_low', title: '回收浓度偏低', category: '产量', severity: 'medium', likelihood: 0.8,
        condition: { type: 'low', metric: 'concentration' },
        causes: ['起始 PCR 产物量不足', '洗脱体积过大', '柱膜结合能力下降'],
        actions: ['增加起始产物量或合并多管', '减少洗脱体积至 20 µL', '更换新批次回收柱']
      }
    ]
  },

  transformation: {
    id: 'transformation',
    name: '大肠杆菌转化',
    category: '分子生物学',
    description: '热激法转化，关注转化效率、菌落数、阳性克隆比例与对照平板。',
    objective: '评估感受态细胞与转化操作是否有效，是否获得足量阳性克隆。',
    metrics: [
      { key: 'efficiency', label: '转化效率', unit: 'cfu/µg', type: 'number', normal: [1000000, 100000000], criticalLow: 100000, note: '以阳性对照质粒计算；化学感受态常见 10⁶–10⁸ cfu/µg' },
      { key: 'colonyCount', label: '菌落数', unit: '个', type: 'number', normal: [20, 1000], criticalLow: 5, note: '过多可稀释后涂板，不作为质量缺陷' },
      { key: 'positiveRate', label: '阳性克隆比例', unit: '%', type: 'number', normal: [50, 100], criticalLow: 20 },
      { key: 'controlPlate', label: '阴性对照平板', unit: '', type: 'enum', options: ['无菌落', '有菌落'], expected: '无菌落' },
      { key: 'recoveryTime', label: '复苏时间', unit: 'min', type: 'number', normal: [30, 120], criticalLow: 15, note: '氨苄抗性建议 ≥60 min 以充分表达抗性；延长复苏不视为偏差' }
    ],
    rules: [
      {
        id: 'tf_efficiency_low', title: '转化效率偏低', category: '转化条件', severity: 'high', likelihood: 0.86,
        condition: { type: 'low', metric: 'efficiency' },
        causes: ['感受态细胞效价低或反复冻融', '热激温度/时间不准确', '连接产物含盐或乙醇残留', '抗生素浓度过高或平板失效'],
        actions: ['使用新鲜感受态并避免反复冻融', '严格 42 °C 热激 45–60 s 后立即冰浴', '纯化连接产物或稀释后转化', '核对抗生素工作浓度与平板有效期']
      },
      {
        id: 'tf_colony_low', title: '菌落数不足', category: '转化条件', severity: 'medium', likelihood: 0.82,
        condition: { type: 'low', metric: 'colonyCount' },
        causes: ['DNA 加入量不足', '复苏时间过短，抗性未表达', '涂板体积过小或涂布不均', '培养温度或时间不足'],
        actions: ['适当增加质粒/连接产物用量', '氨苄抗性延长复苏至 60 min', '增加涂板体积并均匀涂布', '37 °C 培养 16–18 h 后计数']
      },
      {
        id: 'tf_control_growth', title: '阴性对照平板长菌（背景高）', category: '对照失效', severity: 'high', likelihood: 0.9,
        condition: { type: 'enum', metric: 'controlPlate', value: '有菌落' },
        causes: ['抗生素失效或浓度不足', '感受态细胞本身带抗性/污染', '操作污染', '平板制备时抗生素加入温度过高'],
        actions: ['更换抗生素并重新倒板', '做无 DNA 对照确认感受态是否污染', '严格无菌操作', '抗生素待培养基降温至 50 °C 左右再加入']
      },
      {
        id: 'tf_positive_low', title: '阳性克隆比例偏低', category: '克隆质量', severity: 'medium', likelihood: 0.8,
        condition: { type: 'low', metric: 'positiveRate' },
        causes: ['载体自连背景高（去磷酸化不彻底）', '插入片段与载体比例不合适', '连接时间或温度不足', '菌落 PCR 引物/条件不佳'],
        actions: ['载体充分去磷酸化或改用双酶切', '优化插入片段与载体摩尔比（3:1）', '延长连接时间或 16 °C 过夜', '优化菌落 PCR 条件并设阳性对照']
      }
    ]
  },

  endotoxin: {
    id: 'endotoxin',
    name: '细菌内毒素检查',
    category: '质量控制',
    description: '凝胶法/光度法内毒素检查，关注限值、对照有效性与方法干扰。',
    objective: '判定样品内毒素是否符合限值要求，并确认检测方法未受干扰。',
    metrics: [
      { key: 'endotoxin', label: '内毒素含量', unit: 'EU/mL', type: 'number', normal: [0, 0.5], optimal: [0, 0.25], criticalHigh: 5, note: '限值按 L=K/M 由给药途径与剂量计算' },
      { key: 'negativeControl', label: '阴性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'positiveControl', label: '阳性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阳性', failureSeverity: 'critical' },
      { key: 'recovery', label: '加标回收率', unit: '%', type: 'number', normal: [50, 200], criticalLow: 25, criticalHigh: 300, note: '超出范围提示存在干扰' },
      { key: 'ph', label: '反应体系 pH', unit: '', type: 'number', normal: [6.0, 8.0], criticalLow: 5.0, criticalHigh: 9.0 }
    ],
    rules: [
      {
        id: 'et_exceed', title: '内毒素超过限值', category: '产品质量', severity: 'critical', likelihood: 0.95,
        condition: { type: 'high', metric: 'endotoxin' },
        causes: ['工艺用水、缓冲液或原辅料内毒素超标', '层析介质或超滤膜污染', '器具/容器去热原不彻底', '生产环境或操作引入'],
        actions: ['隔离批次并按 OOS 流程调查', '检测工艺用水与关键原辅料内毒素', '对管路、滤膜与器具做去热原处理', '复测并评估对前后批次的影响']
      },
      {
        id: 'et_negative_positive', title: '阴性对照阳性（试验无效）', category: '对照失效', severity: 'critical', likelihood: 0.93,
        condition: { type: 'enum', metric: 'negativeControl', value: '阳性' },
        causes: ['鲎试剂、水或耗材带内毒素', '器具去热原不彻底', '操作环境污染'],
        actions: ['判定试验无效并重做', '更换无内毒素水与耗材', '干热去热原处理玻璃器皿（250 °C ≥30 min）', '复测空白与试剂对照']
      },
      {
        id: 'et_positive_negative', title: '阳性对照阴性（体系失效）', category: '对照失效', severity: 'high', likelihood: 0.9,
        condition: { type: 'enum', metric: 'positiveControl', value: '阴性' },
        causes: ['鲎试剂失活或过期', '孵育温度/时间不符合要求', '内毒素标准品稀释错误'],
        actions: ['更换鲎试剂批次并复溶', '校准水浴/恒温器至 37 ± 1 °C', '重新配制内毒素标准品并复核稀释链']
      },
      {
        id: 'et_interference', title: '加标回收率超出范围（存在干扰）', category: '方法有效性', severity: 'high', likelihood: 0.85,
        condition: { type: 'outside', metric: 'recovery' },
        causes: ['样品 pH 或盐浓度不适宜', '样品含抑制或增强 LAL 反应的物质', '稀释倍数不足'],
        actions: ['调节样品 pH 至 6.0–8.0', '增大稀释倍数后复测', '按方法学要求做干扰试验验证', '必要时改用光度法或其他方法']
      }
    ]
  },

  protein_a_chrom: {
    id: 'protein_a_chrom',
    name: 'Protein A 亲和层析',
    category: '下游工艺',
    description: '抗体类产品捕获步骤，关注载量、洗脱 pH、步骤回收率与 HCP 清除能力。',
    objective: '评估亲和捕获步骤的回收率与纯度表现，识别洗脱不足、载量过高或树脂衰退。',
    metrics: [
      { key: 'stepYield', label: '步骤回收率', unit: '%', type: 'number', normal: [85, 100], optimal: [90, 100], criticalLow: 70, note: '按合并组分中目标蛋白总量计算' },
      { key: 'eluatePurity', label: '洗脱液纯度（SEC）', unit: '%', type: 'number', normal: [95, 100], optimal: [97, 100], criticalLow: 88 },
      { key: 'loading', label: '上样载量', unit: 'g/L 树脂', type: 'number', normal: [20, 60], note: '按树脂说明书与验证载量，动态载量通常更低' },
      { key: 'elutionPh', label: '洗脱 pH', unit: '', type: 'number', normal: [3.4, 4.0], criticalLow: 3.0, criticalHigh: 4.5, note: '抗体洗脱常为 pH 3.5–3.8，按分子稳定性确定' },
      { key: 'hcpLrv', label: 'HCP 清除对数值', unit: 'log', type: 'number', normal: [1.5, 4.0], optimal: [2.0, 4.0], note: '按上样与洗脱液 HCP 浓度计算' }
    ],
    rules: [
      {
        id: 'pa_yield_low', title: '步骤回收率偏低', category: '工艺回收', severity: 'high', likelihood: 0.88,
        condition: { type: 'low', metric: 'stepYield' },
        causes: ['上样载量超过动态载量，目标蛋白随穿透液流失', '洗脱 pH 偏高或洗脱体积不足，产品残留在柱上', '树脂老化或清洗不彻底，结合能力下降', '上样电导/ pH 不适宜，降低结合效率'],
        actions: ['检测穿透液中的目标蛋白，判断是否为载量问题', '将洗脱 pH 下调至验证范围并确认洗脱峰完全', '降低上样载量至动态载量的 80% 以内', '评估树脂循环次数与清洗条件，必要时更换新柱']
      },
      {
        id: 'pa_ph_high', title: '洗脱 pH 偏高（洗脱不完全）', category: '洗脱条件', severity: 'high', likelihood: 0.86,
        condition: { type: 'high', metric: 'elutionPh' },
        causes: ['洗脱缓冲液配制或 pH 调节误差', '洗脱液在线稀释、混合不均', 'pH 计未校准或电极响应迟缓'],
        actions: ['复核洗脱缓冲液配制记录与 pH 计校准状态', '在线监测洗脱峰 pH，确认达到设定值后再收集', '必要时采用阶梯洗脱并延长收集尾部']
      },
      {
        id: 'pa_ph_low', title: '洗脱 pH 过低（聚集与失活风险）', category: '洗脱条件', severity: 'high', likelihood: 0.8,
        condition: { type: 'low', metric: 'elutionPh' },
        causes: ['洗脱液酸性过强或加入量偏差', '洗脱峰收集后未及时中和', '在线 pH 混合滞后导致局部过酸'],
        actions: ['按验证 pH 配制洗脱液并复核', '收集后立即用 Tris 中和至目标 pH', '缩小收集窗口，避免尾部低 pH 组分']
      },
      {
        id: 'pa_purity_low', title: '洗脱液纯度不足', category: '产品纯度', severity: 'high', likelihood: 0.82,
        condition: { type: 'low', metric: 'eluatePurity' },
        causes: ['洗涤体积不足，非特异结合宿主蛋白未去尽', '上样液澄清度差或含聚集体', '树脂污染或清洗液残留', '洗脱窗口过宽，收集了杂质较多的尾部'],
        actions: ['增加洗涤体积或调整洗涤缓冲液组成', '上样前充分离心过滤（0.22 µm）', '执行 CIP 并评估树脂完整性', '按峰形收窄收集窗口']
      },
      {
        id: 'pa_hcp_lrv_low', title: 'HCP 清除能力不足', category: '杂质清除', severity: 'medium', likelihood: 0.78,
        condition: { type: 'low', metric: 'hcpLrv' },
        causes: ['洗涤条件不足（pH/电导/去垢剂）', '上样 HCP 负荷过高', '洗脱组分合并范围过宽'],
        actions: ['优化洗涤缓冲液电导与 pH 提高 HCP 去除', '控制收获液澄清度与上样负荷', '按 HCP 分布调整合并标准']
      },
      {
        id: 'pa_combo_incomplete_elution', title: '洗脱不完全：回收率低伴洗脱 pH 偏高', category: '组合异常', severity: 'critical', likelihood: 0.92,
        condition: { type: 'combo', all: [{ type: 'low', metric: 'stepYield' }, { type: 'high', metric: 'elutionPh' }] },
        causes: ['洗脱 pH 未达到产品解离所需条件', '洗脱体积不足，峰未收集完整', '缓冲液配制错误导致实际 pH 偏高'],
        actions: ['立即复核洗脱液 pH 与配制记录', '补洗脱并收集残留峰，评估是否可合并', '按验证条件重新执行该步骤并留样复测']
      }
    ]
  },

  sec_hplc: {
    id: 'sec_hplc',
    name: 'SEC-HPLC 纯度分析',
    category: '分析检测',
    description: '体积排阻色谱测定单体纯度、聚集体与片段比例，是抗体纯度放行的关键方法。',
    objective: '确认单体纯度与聚集体水平符合标准，并保证色谱系统适用性。',
    metrics: [
      { key: 'monomer', label: '单体纯度', unit: '%', type: 'number', normal: [95, 100], optimal: [98, 100], criticalLow: 90 },
      { key: 'aggregate', label: '聚集体', unit: '%', type: 'number', normal: [0, 5], optimal: [0, 2], criticalHigh: 10 },
      { key: 'fragment', label: '片段', unit: '%', type: 'number', normal: [0, 3], optimal: [0, 1], criticalHigh: 8 },
      { key: 'columnRecovery', label: '柱回收率', unit: '%', type: 'number', normal: [90, 110], note: '按峰面积总和与进样量比较' },
      { key: 'retentionCv', label: '保留时间 CV', unit: '%', type: 'number', normal: [0, 2], note: '重复进样系统适用性指标' }
    ],
    rules: [
      {
        id: 'sec_aggregate_high', title: '聚集体比例超标', category: '产品纯度', severity: 'critical', likelihood: 0.93,
        condition: { type: 'high', metric: 'aggregate' },
        causes: ['纯化或制剂过程中pH、温度、剪切应力导致聚集', '冻融或搅拌引入界面变性', '洗脱液中和不及时，局部低 pH 聚集', '样品放置时间过长或浓度过高'],
        actions: ['隔离批次并按 OOS 流程调查', '排查洗脱后中和、冻融与搅拌操作', '检测前后工序样品定位聚集引入点', '评估添加稳定剂或优化缓冲体系']
      },
      {
        id: 'sec_monomer_low', title: '单体纯度低于标准', category: '产品纯度', severity: 'high', likelihood: 0.86,
        condition: { type: 'low', metric: 'monomer' },
        causes: ['聚集体或片段比例升高', '色谱柱性能下降导致分离度不足', '样品过载，峰形变宽'],
        actions: ['结合聚集体与片段数据判断主要杂质类型', '做柱效与分离度系统适用性测试', '降低进样量或稀释样品后复测']
      },
      {
        id: 'sec_fragment_high', title: '片段比例升高', category: '产品完整性', severity: 'high', likelihood: 0.82,
        condition: { type: 'high', metric: 'fragment' },
        causes: ['宿主细胞蛋白酶未充分抑制', '低 pH 洗脱或中和过程水解', '样品保存温度偏高或反复冻融'],
        actions: ['检测上游收获液与各纯化步骤片段水平', '优化中和与保存条件，缩短室温放置时间', '评估蛋白酶抑制剂或工艺调整']
      },
      {
        id: 'sec_recovery_low', title: '柱回收率偏低', category: '方法系统', severity: 'medium', likelihood: 0.75,
        condition: { type: 'low', metric: 'columnRecovery' },
        causes: ['样品在柱上非特异吸附', '柱污染或筛板堵塞', '进样量过载导致峰未完全洗脱'],
        actions: ['执行柱清洗并复测', '检查进样量与柱载量匹配', '更换保护柱或评估柱寿命']
      },
      {
        id: 'sec_cv_high', title: '保留时间重复性不佳（系统适用性）', category: '方法系统', severity: 'medium', likelihood: 0.8,
        condition: { type: 'high', metric: 'retentionCv' },
        causes: ['流速或柱温波动', '流动相脱气不充分产生气泡', '柱床不均或接头死体积'],
        actions: ['检查泵流速精度与柱温稳定性', '流动相充分脱气', '按系统适用性要求重新平衡色谱柱']
      }
    ]
  },

  hcp_elisa: {
    id: 'hcp_elisa',
    name: '宿主细胞蛋白残留 ELISA',
    category: '分析检测',
    description: '双抗体夹心 ELISA 定量宿主细胞蛋白残留，关注标准曲线、回收率与板内重复性。',
    objective: '确认 HCP 残留符合限值，同时验证检测方法的准确性与精密度。',
    metrics: [
      { key: 'hcp', label: 'HCP 残留', unit: 'ng/mg', type: 'number', normal: [0, 100], optimal: [0, 50], criticalHigh: 500, note: '限值按品种与给药途径确定，此处为通用参考' },
      { key: 'recovery', label: '加标回收率', unit: '%', type: 'number', normal: [70, 130], criticalLow: 50, criticalHigh: 150, note: '反映样品基质干扰' },
      { key: 'standardR2', label: '标准曲线 R²', unit: '', type: 'number', normal: [0.99, 1], criticalLow: 0.95 },
      { key: 'wellCv', label: '复孔 CV', unit: '%', type: 'number', normal: [0, 15], optimal: [0, 10], criticalHigh: 25 },
      { key: 'blankOd', label: '空白 OD', unit: '', type: 'number', normal: [0, 0.15], note: '偏高提示二抗非特异或封闭不足' }
    ],
    rules: [
      {
        id: 'hcp_exceed', title: 'HCP 残留超过限值', category: '杂质残留', severity: 'critical', likelihood: 0.93,
        condition: { type: 'high', metric: 'hcp' },
        causes: ['纯化步骤 HCP 清除不足（洗涤/收峰不当）', '上样 HCP 负荷过高或收获液澄清度差', '层析介质污染或清洗不彻底', '检测样品稀释倍数不足或基质干扰'],
        actions: ['隔离批次并按 OOS 流程调查', '复测并做加标回收确认方法适用性', '回溯各纯化步骤 HCP 数据定位清除薄弱环节', '优化洗涤条件或增加精纯步骤']
      },
      {
        id: 'hcp_r2_low', title: '标准曲线线性不佳', category: '方法有效性', severity: 'high', likelihood: 0.85,
        condition: { type: 'low', metric: 'standardR2' },
        causes: ['标准品稀释链错误或复溶不充分', '加样体积偏差、枪头残留', '孵育温度或时间不一致', '显色底物失效或终止不充分'],
        actions: ['重新配制标准曲线并双人复核稀释', '校准移液器并更换枪头', '严格按说明书控制孵育温度与时间', '更换底物/终止液批次后复测']
      },
      {
        id: 'hcp_recovery_out', title: '加标回收率超出范围（基质干扰）', category: '方法有效性', severity: 'high', likelihood: 0.83,
        condition: { type: 'outside', metric: 'recovery' },
        causes: ['样品基质（高浓度蛋白、去垢剂、盐）干扰抗原抗体结合', '稀释倍数不足', '样品 pH 不适宜'],
        actions: ['增大稀释倍数后复测', '按试剂盒要求做基质干扰验证', '必要时采用稀释液匹配标准曲线', '更换批号试剂复测确认']
      },
      {
        id: 'hcp_cv_high', title: '复孔重复性差', category: '操作一致性', severity: 'medium', likelihood: 0.78,
        condition: { type: 'high', metric: 'wellCv' },
        causes: ['加样不均匀或存在气泡', '洗板不彻底、残留液体', '边缘孔蒸发效应', '孵育温度不均'],
        actions: ['规范加样手法并离心去气泡', '按程序充分洗板并拍干', '避免使用最外圈孔或封板膜密封', '孵育时避免叠板受热不均']
      },
      {
        id: 'hcp_blank_high', title: '空白 OD 偏高', category: '方法背景', severity: 'medium', likelihood: 0.72,
        condition: { type: 'high', metric: 'blankOd' },
        causes: ['封闭不充分或封闭液失效', '二抗非特异结合', '洗板不彻底', '底物显色时间过长'],
        actions: ['更换封闭液并延长封闭时间', '优化二抗浓度或更换批次', '增加洗板次数', '严格控制显色时间并及时终止']
      }
    ]
  },

  microbial_limit: {
    id: 'microbial_limit',
    name: '微生物限度检查',
    category: '质量控制',
    description: '需氧菌、霉菌酵母计数与控制菌检查，关注限值、方法适用性与对照有效性。',
    objective: '判定样品微生物负载是否符合限度，并确认方法适用性与试验有效性。',
    metrics: [
      { key: 'tmac', label: '需氧菌总数', unit: 'cfu/mL', type: 'number', normal: [0, 100], optimal: [0, 10], criticalHigh: 1000, note: '限度按品种与给药途径确定' },
      { key: 'tymc', label: '霉菌和酵母菌总数', unit: 'cfu/mL', type: 'number', normal: [0, 10], optimal: [0, 1], criticalHigh: 100 },
      { key: 'specified', label: '控制菌', unit: '', type: 'enum', options: ['未检出', '检出'], expected: '未检出', failureSeverity: 'critical' },
      { key: 'negativeControl', label: '阴性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性', failureSeverity: 'critical' },
      { key: 'methodRecovery', label: '方法适用性回收率', unit: '%', type: 'number', normal: [50, 200], optimal: [70, 130], note: '回收率 0.5–2 范围内方法可接受' }
    ],
    rules: [
      {
        id: 'ml_tmac_exceed', title: '需氧菌总数超过限度', category: '微生物负载', severity: 'critical', likelihood: 0.92,
        condition: { type: 'high', metric: 'tmac' },
        causes: ['原辅料或工艺用水微生物负载超标', '器具、容器清洗灭菌不彻底', '洁净区环境或人员操作引入污染', '样品保存条件不当导致增殖'],
        actions: ['隔离批次并按 OOS 流程调查', '检测工艺用水与原辅料微生物负载', '复核清洁消毒与灭菌记录', '评估环境监测与人员操作数据']
      },
      {
        id: 'ml_specified_found', title: '检出控制菌', category: '微生物负载', severity: 'critical', likelihood: 0.95,
        condition: { type: 'enum', metric: 'specified', value: '检出' },
        causes: ['样品或生产环境存在特定致病菌污染', '取样、转运或检测过程交叉污染', '方法未有效抑制干扰菌'],
        actions: ['立即隔离批次并启动偏差调查', '鉴定菌种并追溯污染来源', '复核无菌操作与洁净区环境数据', '按药典要求复测并评估放行影响']
      },
      {
        id: 'ml_negative_contaminated', title: '阴性对照长菌（试验无效）', category: '对照失效', severity: 'critical', likelihood: 0.9,
        condition: { type: 'enum', metric: 'negativeControl', value: '阳性' },
        causes: ['培养基、稀释液或耗材灭菌不彻底', '无菌操作不规范', '洁净环境或培养箱污染'],
        actions: ['判定试验无效并重做', '更换培养基与耗材批次', '复核无菌操作与培养箱清洁', '对环境与人员做监控采样']
      },
      {
        id: 'ml_recovery_out', title: '方法适用性回收率不符合要求', category: '方法有效性', severity: 'high', likelihood: 0.8,
        condition: { type: 'outside', metric: 'methodRecovery' },
        causes: ['样品抑菌性未被充分中和或稀释', '培养基促生长能力不足', '菌液浓度或接种量偏差'],
        actions: ['增加稀释倍数或采用薄膜过滤法去除抑菌成分', '验证培养基促生长能力', '复核菌液制备与接种量', '按药典方法适用性试验重新验证']
      }
    ]
  },

  ce_sds: {
    id: 'ce_sds',
    name: 'CE-SDS 纯度分析',
    category: '分析检测',
    description: '毛细管凝胶电泳测定还原与非还原纯度，反映片段化、聚集与二硫键完整性。',
    objective: '评估产品完整性（片段/聚集体）与批间一致性，并确认电泳系统适用性。',
    metrics: [
      { key: 'nrPurity', label: '非还原纯度', unit: '%', type: 'number', normal: [95, 100], optimal: [97, 100], criticalLow: 90 },
      { key: 'rPurity', label: '还原纯度', unit: '%', type: 'number', normal: [90, 100], optimal: [95, 100], criticalLow: 85 },
      { key: 'fragment', label: '片段合计', unit: '%', type: 'number', normal: [0, 5], optimal: [0, 2], criticalHigh: 10 },
      { key: 'migrationCv', label: '迁移时间 CV', unit: '%', type: 'number', normal: [0, 5], note: '重复进样系统适用性指标' },
      { key: 'current', label: '运行电流', unit: 'µA', type: 'number', normal: [10, 60], note: '偏离提示凝胶或毛细管状态异常' }
    ],
    rules: [
      {
        id: 'ce_nr_low', title: '非还原纯度偏低', category: '产品完整性', severity: 'high', likelihood: 0.87,
        condition: { type: 'low', metric: 'nrPurity' },
        causes: ['聚集体或片段比例升高', '样品制备（SDS 变性、加热）不充分', '毛细管或凝胶批次差异导致分离下降'],
        actions: ['结合 SEC 与还原数据判断杂质类型', '严格按 SOP 控制 SDS 浓度与加热时间', '做系统适用性测试并更换毛细管/凝胶批次']
      },
      {
        id: 'ce_r_low', title: '还原纯度偏低（片段化）', category: '产品完整性', severity: 'high', likelihood: 0.84,
        condition: { type: 'low', metric: 'rPurity' },
        causes: ['宿主细胞蛋白酶水解', '低 pH 洗脱或中和过程断裂', '样品反复冻融或高温放置'],
        actions: ['检测上游与各纯化步骤片段水平定位引入点', '优化中和与保存条件', '评估蛋白酶抑制剂或工艺调整']
      },
      {
        id: 'ce_fragment_high', title: '片段合计升高', category: '产品完整性', severity: 'high', likelihood: 0.82,
        condition: { type: 'high', metric: 'fragment' },
        causes: ['酶解或酸水解导致断裂', '样品处理温度过高、时间过长', '产品本身稳定性不足'],
        actions: ['缩短样品处理时间并控制温度', '检查样品保存与冻融记录', '评估制剂处方稳定性']
      },
      {
        id: 'ce_cv_high', title: '迁移时间重复性差（系统适用性）', category: '方法系统', severity: 'medium', likelihood: 0.78,
        condition: { type: 'high', metric: 'migrationCv' },
        causes: ['毛细管温度控制不稳', '凝胶灌注不完全或存在气泡', '样品离子强度过高导致峰形异常'],
        actions: ['检查毛细管温控与室温波动', '重新灌注凝胶并排气', '按 SOP 稀释样品降低电导']
      },
      {
        id: 'ce_combo_fragment_dominant', title: '非还原纯度下降伴片段升高（片段主导）', category: '组合异常', severity: 'high', likelihood: 0.85,
        condition: { type: 'combo', all: [{ type: 'low', metric: 'nrPurity' }, { type: 'high', metric: 'fragment' }] },
        causes: ['蛋白酶水解或酸水解导致片段化', '样品处理温度过高或时间过长', '产品在储存中稳定性不足'],
        actions: ['缩短样品处理时间并降低加热温度', '用还原 CE-SDS 确认片段来源', '回溯纯化与保存条件定位断裂环节', '评估制剂处方与储存条件']
      }
    ]
  },

  uf_diafiltration: {
    id: 'uf_diafiltration',
    name: '超滤浓缩与透析换液',
    category: '下游工艺',
    description: '切向流超滤实现浓缩与缓冲液置换，关注回收率、跨膜压、通量与换液倍数。',
    objective: '确认浓缩与换液步骤的收率与膜性能，避免膜污染、蛋白损失与置换不充分。',
    metrics: [
      { key: 'concentrationFactor', label: '浓缩倍数', unit: '×', type: 'number', normal: [3, 20], note: '按工艺设定，过高易导致浓极化' },
      { key: 'recovery', label: '步骤回收率', unit: '%', type: 'number', normal: [90, 100], optimal: [95, 100], criticalLow: 80 },
      { key: 'tmp', label: '跨膜压', unit: 'bar', type: 'number', normal: [0.3, 1.5], criticalHigh: 2.5, note: '按膜包与设备规格确定上限' },
      { key: 'flux', label: '通量', unit: 'LMH', type: 'number', normal: [15, 60], note: '明显衰减提示浓极化或膜污染' },
      { key: 'diavolumes', label: '换液倍数', unit: 'DV', type: 'number', normal: [5, 10], optimal: [7, 10] }
    ],
    rules: [
      {
        id: 'uf_recovery_low', title: '步骤回收率偏低', category: '工艺回收', severity: 'high', likelihood: 0.86,
        condition: { type: 'low', metric: 'recovery' },
        causes: ['膜面吸附与浓极化造成蛋白损失', '浓缩倍数过高导致不可逆聚集', '终洗（flush）体积不足，滞留液未回收', '剪切应力引起蛋白沉淀'],
        actions: ['降低浓缩倍数并增加终洗体积', '优化跨膜压与流速降低剪切', '检测膜清洗液中的残留蛋白', '评估添加稳定剂或更换膜材质']
      },
      {
        id: 'uf_tmp_high', title: '跨膜压偏高', category: '膜性能', severity: 'high', likelihood: 0.85,
        condition: { type: 'high', metric: 'tmp' },
        causes: ['膜污染或孔道堵塞', '料液黏度升高（高浓度蛋白）', '进料流速过高', '膜包选型偏小或流道堵塞'],
        actions: ['降低进料流速并观察压力变化', '执行清洗（CIP）并测水通量恢复率', '按黏度调整温度或稀释料液', '评估更换更大面积膜包']
      },
      {
        id: 'uf_flux_low', title: '通量明显偏低', category: '膜性能', severity: 'high', likelihood: 0.8,
        condition: { type: 'low', metric: 'flux' },
        causes: ['浓极化层增厚', '膜污染或清洗不彻底', '蛋白浓度过高、黏度大', '温度偏低导致黏度上升'],
        actions: ['提高错流流速或间歇冲洗膜面', '按验证方法清洗并确认水通量', '控制料液浓度与温度', '必要时更换膜包']
      },
      {
        id: 'uf_dv_low', title: '换液倍数不足（置换不充分）', category: '缓冲液置换', severity: 'medium', likelihood: 0.82,
        condition: { type: 'low', metric: 'diavolumes' },
        causes: ['为缩短工时减少换液体积', '透析液流速/体积设置错误', '设备程序参数未按工艺设定'],
        actions: ['按验证倍数补加透析体积', '复核设备程序与配液体积', '检测置换后缓冲液电导/pH 确认置换度']
      },
      {
        id: 'uf_combo_fouling', title: '跨膜压升高伴通量下降（膜污染/浓极化）', category: '组合异常', severity: 'critical', likelihood: 0.9,
        condition: { type: 'combo', all: [{ type: 'high', metric: 'tmp' }, { type: 'low', metric: 'flux' }] },
        causes: ['膜孔堵塞与浓极化层同时发展', '料液预处理不足含颗粒/聚集体', '清洗不彻底导致污染物累积'],
        actions: ['立即降低流速并做膜面冲洗', '上样前 0.22 µm 过滤去除颗粒', '按清洗验证执行 CIP 并测通量恢复', '评估膜包寿命与更换']
      }
    ]
  },

  environmental_monitoring: {
    id: 'environmental_monitoring',
    name: '洁净区环境监测',
    category: '质量控制',
    description: '沉降菌、浮游菌、表面微生物与人员监测，反映洁净区动态污染控制水平。',
    objective: '确认洁净区微生物水平持续符合级别要求，及时发现 HVAC、清洁消毒或人员操作问题。',
    metrics: [
      { key: 'settlePlate', label: '沉降菌', unit: 'cfu/4h', type: 'number', normal: [0, 1], optimal: [0, 0], criticalHigh: 5, note: '限度按洁净级别（A/B/C/D）确定' },
      { key: 'airborne', label: '浮游菌', unit: 'cfu/m³', type: 'number', normal: [0, 10], optimal: [0, 1], criticalHigh: 50 },
      { key: 'surface', label: '表面微生物', unit: 'cfu/25cm²', type: 'number', normal: [0, 5], optimal: [0, 1], criticalHigh: 25 },
      { key: 'personnel', label: '人员手套', unit: 'cfu/手', type: 'number', normal: [0, 5], optimal: [0, 1], criticalHigh: 20 },
      { key: 'pressureDiff', label: '压差', unit: 'Pa', type: 'number', normal: [10, 30], criticalLow: 5, note: '相邻不同级别房间压差应≥10 Pa' }
    ],
    rules: [
      {
        id: 'em_settle_high', title: '沉降菌超出限度', category: '环境微生物', severity: 'high', likelihood: 0.88,
        condition: { type: 'high', metric: 'settlePlate' },
        causes: ['HVAC 送风量不足或高效过滤器泄漏', '清洁消毒不彻底或消毒剂轮换不当', '人员操作频繁、动作幅度大', '物料传递未按规程消毒'],
        actions: ['复核压差与换气次数，检查高效过滤器完整性', '加强清洁消毒并评估消毒剂效力', '回顾人员操作录像与更衣规范', '对该区域增加监测频次']
      },
      {
        id: 'em_air_high', title: '浮游菌超出限度', category: '环境微生物', severity: 'high', likelihood: 0.86,
        condition: { type: 'high', metric: 'airborne' },
        causes: ['送风洁净度下降或过滤器失效', '房间密封不良、气流组织紊乱', '人员密度过高或产生气溶胶的操作', '采样器未校准或采样流量偏差'],
        actions: ['检漏高效过滤器并检测送风量', '检查房间密封与气流流型', '控制人员数量与操作规范', '校准浮游菌采样器']
      },
      {
        id: 'em_surface_high', title: '表面微生物超出限度', category: '环境微生物', severity: 'high', likelihood: 0.84,
        condition: { type: 'high', metric: 'surface' },
        causes: ['清洁消毒覆盖不全（死角、地漏、台面边缘）', '消毒剂浓度不足或接触时间不够', '清洁工具本身污染', '设备表面粗糙不易清洁'],
        actions: ['按清洁规程复核消毒剂浓度与接触时间', '对死角与地漏加强清洁并留样', '更换或灭菌清洁工具', '评估设备表面可清洁性']
      },
      {
        id: 'em_personnel_high', title: '人员手套微生物超标', category: '人员污染', severity: 'high', likelihood: 0.85,
        condition: { type: 'high', metric: 'personnel' },
        causes: ['更衣或手消毒不规范', '手套破损或未及时更换', '操作中接触非洁净表面', '消毒剂失效或作用时间不足'],
        actions: ['复训更衣与手消毒操作', '增加手套更换频次并检查完整性', '规范操作区域与接触物品', '复核消毒剂有效期与配制记录']
      },
      {
        id: 'em_pressure_low', title: '房间压差不足', category: 'HVAC', severity: 'high', likelihood: 0.87,
        condition: { type: 'low', metric: 'pressureDiff' },
        causes: ['送风量下降或回风不畅', '门未关闭或密封条老化', '压差表未校准或取压管堵塞', '相邻房间运行状态改变'],
        actions: ['检查送风量与回风阀开度', '确认门禁与密封条状态', '校准压差表并疏通取压管', '复核 HVAC 运行参数与房间联动']
      }
    ]
  },

  endotoxin_kinetic: {
    id: 'endotoxin_kinetic',
    name: '内毒素动态浊度法',
    category: '质量控制',
    description: '动态浊度/显色法定量内毒素，关注标准曲线、回收率与复孔重复性。',
    objective: '定量样品内毒素水平并确认方法未受干扰，适用于低限值样品的定量放行检测。',
    metrics: [
      { key: 'endotoxin', label: '内毒素含量', unit: 'EU/mL', type: 'number', normal: [0, 0.5], optimal: [0, 0.25], criticalHigh: 5, note: '限值按 L=K/M 计算' },
      { key: 'recovery', label: '加标回收率', unit: '%', type: 'number', normal: [50, 200], optimal: [75, 125], criticalLow: 25, criticalHigh: 300 },
      { key: 'cv', label: '复孔 CV', unit: '%', type: 'number', normal: [0, 10], optimal: [0, 5], criticalHigh: 20 },
      { key: 'r2', label: '标准曲线 r', unit: '', type: 'number', normal: [0.98, 1], criticalLow: 0.95, note: '动态法要求相关系数绝对值≥0.980' }
    ],
    rules: [
      {
        id: 'ek_exceed', title: '内毒素超过限值', category: '产品质量', severity: 'critical', likelihood: 0.94,
        condition: { type: 'high', metric: 'endotoxin' },
        causes: ['工艺用水、缓冲液或原辅料内毒素超标', '层析介质或超滤膜微生物污染', '器具去热原不彻底', '样品存放时间过长导致增殖'],
        actions: ['隔离批次并按 OOS 流程调查', '检测工艺用水与关键原辅料', '对器具与管路做去热原处理', '复测并评估相邻批次']
      },
      {
        id: 'ek_recovery_out', title: '加标回收率超出范围（干扰）', category: '方法有效性', severity: 'high', likelihood: 0.86,
        condition: { type: 'outside', metric: 'recovery' },
        causes: ['样品 pH 或盐浓度不适宜', '样品含抑制或增强反应的物质', '稀释倍数不足或稀释液污染'],
        actions: ['调节 pH 至 6.0–8.0 并复测', '增大稀释倍数消除干扰', '按药典做干扰试验验证', '更换无内毒素稀释液']
      },
      {
        id: 'ek_cv_high', title: '复孔重复性差', category: '操作一致性', severity: 'medium', likelihood: 0.8,
        condition: { type: 'high', metric: 'cv' },
        causes: ['加样不均匀或孔内气泡', '微板孔间温度不均', '孵育读数时间控制不一致', '试剂复溶不充分'],
        actions: ['规范加样并离心去气泡', '使用板温均匀的酶标仪/孵育器', '严格按动力学读数程序操作', '充分复溶并混匀试剂']
      },
      {
        id: 'ek_r2_low', title: '标准曲线线性不足', category: '方法有效性', severity: 'high', likelihood: 0.84,
        condition: { type: 'low', metric: 'r2' },
        causes: ['标准品稀释链错误', '标准品或试剂过期/复溶不当', '加样体积偏差', '孔内污染或交叉污染'],
        actions: ['重新配制标准曲线并复核稀释', '更换试剂批次并记录复溶时间', '校准移液器', '重做曲线并确认 r≥0.980']
      }
    ]
  }
};

/**
 * 指标分层：core = 该实验每次运行都应记录的关键指标；
 * 未列出的指标属于"按需填写"（如周期性 QC 项目、仅特定下游用途才做的检测）。
 * 前端据此把指标分为「关键指标」与「可选指标」两栏，避免把非必填项当成必填。
 */
const OPTIONAL_METRICS = {
  cell_culture: ['mycoplasma', 'contamination'],
  protein_purification: ['endotoxin'],
  qpcr: ['replicateCv'],
  western_blot: ['background', 'bandCount'],
  elisa: ['recovery'],
  sterility: [],
  plasmid_prep: ['a260_230', 'endotoxin', 'supercoil'],
  cell_cryo: ['doublingTime', 'confluency', 'contamination'],
  mycoplasma: ['internalControl', 'a260_280'],
  sds_page: ['background', 'mwDeviation', 'loadingCv'],
  dna_gel: ['a260_280', 'bandCheck', 'elutionVolume'],
  transformation: ['efficiency', 'positiveRate', 'recoveryTime'],
  endotoxin: ['recovery', 'ph'],
  protein_a_chrom: ['loading', 'hcpLrv'],
  sec_hplc: ['fragment', 'columnRecovery', 'retentionCv'],
  hcp_elisa: ['blankOd'],
  microbial_limit: ['methodRecovery'],
  ce_sds: ['fragment', 'current'],
  uf_diafiltration: ['concentrationFactor', 'diavolumes'],
  environmental_monitoring: ['personnel', 'surface'],
  endotoxin_kinetic: []
};

for (const type of Object.values(EXPERIMENT_TYPES)) {
  const optional = OPTIONAL_METRICS[type.id] || [];
  for (const m of type.metrics) m.core = !optional.includes(m.key);
}

/** 通用规则：适用于所有实验类型 */
const GENERAL_RULES = [
  {
    id: 'gen_missing_control', title: '关键信息缺失，结果可信度下降', category: '数据完整性', severity: 'medium', likelihood: 0.7,
    check: 'missingCritical',
    causes: ['记录时遗漏对照或关键指标', '检测未设置必要对照', '数据录入不完整'],
    actions: ['补齐对照与关键指标数据', '复核原始记录与检测报告', '完善记录模板的必填校验']
  }
];

module.exports = {
  EXPERIMENT_TYPES,
  GENERAL_RULES,
  SEVERITY_WEIGHT,
  getExperimentType(id) { return EXPERIMENT_TYPES[id] || null; },
  listExperimentTypes() {
    return Object.values(EXPERIMENT_TYPES).map(t => ({
      id: t.id, name: t.name, category: t.category, description: t.description,
      objective: t.objective,
      metrics: t.metrics.map(m => ({ ...m }))
    }));
  }
};

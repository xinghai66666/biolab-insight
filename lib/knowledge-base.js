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
      { key: 'vcd', label: '活细胞密度', unit: '×10⁶/mL', type: 'number', normal: [1.0, 8.0], optimal: [2.0, 6.0] },
      { key: 'doublingTime', label: '倍增时间', unit: 'h', type: 'number', normal: [18, 30], optimal: [20, 26] },
      { key: 'mycoplasma', label: '支原体检测', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'contamination', label: '微生物污染', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' }
    ],
    rules: [
      {
        id: 'cc_viability_low', title: '细胞活率显著偏低', category: '细胞状态', severity: 'high', likelihood: 0.88,
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
      { key: 'purity', label: '纯度', unit: '%', type: 'number', normal: [95, 100], optimal: [98, 100], criticalLow: 85 },
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
      { key: 'ntcCt', label: 'NTC Ct', unit: '', type: 'number', normal: [35, 45], optimal: [38, 45], note: '无模板对照应无扩增或 Ct 很高' },
      { key: 'tm', label: '熔解温度 Tm', unit: '°C', type: 'number', normal: [78, 90] },
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
        id: 'qpcr_tm_abnormal', title: '熔解曲线异常', category: '特异性', severity: 'medium', likelihood: 0.8,
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
      { key: 'targetIntensity', label: '目标条带灰度', unit: 'a.u.', type: 'number', normal: [1000, 100000] },
      { key: 'loadingCv', label: '内参均一性 CV', unit: '%', type: 'number', normal: [0, 15], optimal: [0, 10], criticalHigh: 25 },
      { key: 'background', label: '背景信号', unit: 'a.u.', type: 'number', normal: [0, 500], optimal: [0, 200] },
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
        id: 'wb_no_signal', title: '目标条带信号缺失', category: '检测失败', severity: 'high', likelihood: 0.83,
        condition: { type: 'low', metric: 'targetIntensity' },
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
      { key: 'positiveControl', label: '阳性对照', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阳性' },
      { key: 'sampleTube', label: '供试品管', unit: '', type: 'enum', options: ['阴性', '阳性'], expected: '阴性' },
      { key: 'cultureDays', label: '培养天数', unit: 'd', type: 'number', normal: [14, 14], note: '药典常规方法培养 14 天；采用经批准的快速方法时按验证周期判定' }
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
  }
};

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

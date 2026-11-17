'use strict';

/* 实验操作库：基本实验操作与常用仪器的图解卡片。
   配图使用内联 SVG 示意图，随主题变量变色，不依赖外部图片资源。 */

const OP_ICONS = {
  pipette: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M30 10h30v16H30z"/><path d="M36 26h18v8H36z"/><path d="M40 34h10l-2 14h-6z"/><path d="M45 48v6"/><path d="M60 14h8v8h-8"/><path d="M45 56v4"/><path d="M22 18h8M22 24h8"/></svg>`,
  centrifuge: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M20 30h56v22H20z"/><ellipse cx="48" cy="30" rx="28" ry="9"/><ellipse cx="48" cy="30" rx="16" ry="5"/><path d="M48 25v-8M41 20l7-3 7 3"/><path d="M28 52h40"/><circle cx="68" cy="41" r="2"/></svg>`,
  vortex: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M28 42h40l-4 12H32z"/><ellipse cx="48" cy="42" rx="20" ry="5"/><path d="M44 12l6-2 4 24-6 2z"/><path d="M33 18l-4-3M63 20l5-3M30 27l-6-1M66 28l6-1"/><path d="M40 54h16"/></svg>`,
  pcrmix: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M18 14h60v36H18z"/><path d="M18 26h60M18 38h60M34 14v36M50 14v36M66 14v36"/><path d="M26 20h4v4h-4zM42 20h4v4h-4zM58 20h4v4h-4zM26 32h4v4h-4zM42 32h4v4h-4zM58 32h4v4h-4z"/></svg>`,
  electrophoresis: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M14 16h68v34H14z"/><path d="M22 24h52M22 42h52"/><path d="M32 24v18M48 24v18M64 24v18"/><path d="M29 34h6M45 30h6M61 38h6"/><path d="M18 20h4M74 20h4"/></svg>`,
  aseptic: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M14 12h68v40H14z"/><path d="M48 12v40"/><path d="M26 20c8 6 14 6 18 0M52 20c8 6 14 6 18 0"/><path d="M30 38h28v8H30z"/><path d="M36 38v-6h16v6"/><path d="M72 36l6 4-6 4"/></svg>`,
  nanodrop: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M24 44h48l-6 10H30z"/><ellipse cx="48" cy="44" rx="20" ry="5"/><path d="M48 12v22"/><path d="M38 12h20l-4 10H42z"/><circle cx="48" cy="42" r="3"/><path d="M32 56h32"/></svg>`,
  thermal: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M18 18h60v34H18z"/><path d="M26 26h28v14H26z"/><path d="M30 33h6M40 30h8M40 36h8"/><circle cx="66" cy="28" r="3"/><circle cx="66" cy="38" r="3"/><path d="M34 52v4M62 52v4"/></svg>`,
  plate: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M20 14h56v38H20z"/><path d="M20 24h56M20 32h56M20 40h56M34 14v38M48 14v38M62 14v38"/><circle cx="27" cy="19" r="1.5"/><circle cx="41" cy="19" r="1.5"/><circle cx="55" cy="19" r="1.5"/><circle cx="69" cy="19" r="1.5"/><circle cx="27" cy="28" r="1.5"/><circle cx="55" cy="28" r="1.5"/><circle cx="41" cy="44" r="1.5"/><circle cx="69" cy="44" r="1.5"/></svg>`,
  phmeter: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M20 14h34v20H20z"/><path d="M26 20h22v8H26z"/><path d="M54 34v18"/><path d="M50 52h8"/><path d="M64 38h18l-3 16H67z"/><path d="M67 38v-6h10v6"/><path d="M30 38h4M38 38h4"/></svg>`,
  balance: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M24 46h48l6 8H18z"/><path d="M32 18h32v28H32z"/><path d="M40 34h16l3 8H37z"/><path d="M48 18v10M42 24h12"/><path d="M28 46V20M68 46V20"/><path d="M22 20h8M66 20h8"/></svg>`,
  incubator: `<svg viewBox="0 0 96 64" aria-hidden="true"><path d="M20 10h56v46H20z"/><path d="M48 10v46"/><path d="M30 22h12M30 30h12"/><circle cx="64" cy="26" r="8"/><path d="M64 22v4l3 2"/><path d="M28 46h12M56 46h12"/></svg>`
};

const OP_GROUPS = [
  {
    title: '基本实验操作',
    desc: '动作要点 · 关键参数 · 常见失误',
    items: [
      {
        id: 'pipetting', name: '移液与分液', icon: 'pipette',
        points: [
          '选择与量程匹配的移液器，吸液前预润湿 2–3 次',
          '垂直吸液、缓慢松开按钮，避免气泡与气溶胶',
          '分液时贴壁缓慢放出，保证各孔体积一致',
          '更换试剂必须换枪头，防止交叉污染'
        ],
        tip: '小于 2 µL 的微量移液建议先配主混悬液，或采用反向移液法。'
      },
      {
        id: 'centrifugation', name: '离心与沉淀', icon: 'centrifuge',
        points: [
          '离心管对称配平，质量差一般控制在 0.1 g 以内',
          '区分相对离心力（×g）与转速（rpm），按 SOP 单位设定',
          '生物样品预冷至 4 °C 离心，减少蛋白降解',
          '待转子完全停稳再开盖，检查有无破管或漏液'
        ],
        tip: '换算关系：RCF = 1.118 × r(cm) × (rpm/1000)²。'
      },
      {
        id: 'vortexing', name: '涡旋与混匀', icon: 'vortex',
        points: [
          '按样品体积调节涡旋速度，避免溅出与气溶胶',
          '微量离心管采用点动式混匀，每次 3–5 秒',
          '混匀后短暂离心，收集管壁与管盖上的液滴',
          '含挥发性溶剂时盖紧管盖，并在通风处操作'
        ],
        tip: '蛋白样品避免剧烈涡旋产生泡沫，泡沫会加速界面变性。'
      },
      {
        id: 'pcr_setup', name: 'PCR 体系配制', icon: 'pcrmix',
        points: [
          '在冰上配制 Master Mix，减少酶活损失与非特异扩增',
          '试剂分区存放，避免模板与 Master Mix 交叉',
          '每批次设置阴性对照（NTC）与阳性对照',
          '加样后瞬时离心并立即上机，防止蒸发'
        ],
        tip: '先分装不含模板的体系，最后在独立区域加入模板，可显著降低污染风险。'
      },
      {
        id: 'gel_loading', name: '电泳上样', icon: 'electrophoresis',
        points: [
          '样品与 Loading Buffer 按说明书比例混匀（常用 5:1）',
          '依次加入 Marker、对照与样品，记录孔位顺序',
          '枪头伸入孔内但不要戳破胶面，缓慢释放样品',
          '电泳缓冲液液面高于胶面 2–3 mm'
        ],
        tip: '上样体积过大易拖尾，应按胶孔最大体积控制上样量。'
      },
      {
        id: 'aseptic', name: '无菌操作', icon: 'aseptic',
        points: [
          '操作前超净台紫外照射 20–30 分钟并擦拭消毒',
          '物品进入前消毒外表面，不跨越开放容器上方',
          '枪头与吸管一次性使用，操作中勤换手套',
          '结束后清理台面，按计划做环境监测'
        ],
        tip: '火焰灭菌后的器具应稍冷却再接触细胞或试剂，避免高温损伤。'
      }
    ]
  },
  {
    title: '常用仪器操作',
    desc: '开机准备 · 参数设置 · 使用与维护',
    items: [
      {
        id: 'nanodrop', name: 'NanoDrop 分光光度计', icon: 'nanodrop',
        points: [
          '用配套空白液做空白校正，清洁上下检测面',
          '取 1–2 µL 样品点样后放下检测臂，避免气泡',
          '读取 A260/A280、A260/A230 与浓度并记录',
          '检测完成后用无尘纸擦净检测台'
        ],
        tip: '浓度过低或高盐样品读数偏差较大，必要时稀释后复测。'
      },
      {
        id: 'centrifuge_inst', name: '离心机', icon: 'centrifuge',
        points: [
          '确认转子型号与允许最高转速，检查盖锁状态',
          '样品对称配平，严禁单管空载运行',
          '设定转速/时间/温度，启动后观察是否平稳',
          '运行中不得开盖；异常振动应立即停机检查'
        ],
        tip: '定期清洁转子与离心腔，可防止腐蚀、失衡与交叉污染。'
      },
      {
        id: 'thermal_cycler', name: 'PCR 热循环仪', icon: 'thermal',
        points: [
          '设置变性、退火、延伸的温度、时间与循环数',
          '按反应体积设定热盖温度（通常约 105 °C）',
          '管/板放置到位并压紧盖板后启动程序',
          '程序结束后及时取出样品，避免长时间高温'
        ],
        tip: '使用带热盖的程序时无需再加矿物油覆盖反应液。'
      },
      {
        id: 'plate_reader', name: '酶标仪', icon: 'plate',
        points: [
          '按方法选择检测波长（如 450 nm、562 nm）',
          '提前开机预热，核对板位与板图一致',
          '读板前擦净板底，避免指纹与液滴干扰',
          '导出原始数据，复核异常孔与复孔 CV'
        ],
        tip: '双波长读数可扣除非特异吸收以及板底划痕带来的误差。'
      },
      {
        id: 'ph_meter', name: 'pH 计', icon: 'phmeter',
        points: [
          '用至少两点标准缓冲液校准（如 pH 4.01 / 7.00）',
          '电极充分润洗，用滤纸吸干而不是用力擦拭',
          '等待读数稳定后记录，注意温度补偿设置',
          '测量后用电极保存液浸泡，避免干放'
        ],
        tip: '强酸、强碱或高离子强度样品会明显加速电极老化。'
      },
      {
        id: 'balance', name: '电子天平', icon: 'balance',
        points: [
          '调节水平并预热，关闭防风罩后归零',
          '使用称量纸或容器去皮，不直接放置药品',
          '轻开防风罩加样，读数稳定后再记录',
          '称量完毕清洁秤盘，砝码与工具归位'
        ],
        tip: '微量称量应使用分析天平，并避开气流与温度波动。'
      }
    ]
  }
];

function renderOperations() {
  const box = document.getElementById('operationsContent');
  if (!box || box.dataset.ready) return;
  box.dataset.ready = '1';
  box.innerHTML = OP_GROUPS.map(group => `
    <div class="op-group">
      <div class="op-group-head"><h3>${esc(group.title)}</h3><span class="head-hint">${esc(group.desc)}</span></div>
      <div class="op-grid">
        ${group.items.map(item => `
          <article class="op-card">
            <div class="op-figure">${OP_ICONS[item.icon] || ''}<span>${esc(item.name)}</span></div>
            <div class="op-card-body">
              <ul>${item.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
              <div class="op-tip"><strong>提示</strong>${esc(item.tip)}</div>
            </div>
          </article>`).join('')}
      </div>
    </div>`).join('');
}

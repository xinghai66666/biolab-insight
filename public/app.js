'use strict';

const state = { types: [], records: [], stats: {}, currentType: null };

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function api(path, opts = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data;
}

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2600);
}

function switchView(view) {
  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#view-' + view).classList.add('active');
  const titles = {
    dashboard: ['实验数据中心', '实验室实验数据的智能总结与问题定位'],
    new: ['新建实验分析', '录入实验数据，获取结构化总结与问题诊断'],
    records: ['实验记录', '全部历史实验与分析结果'],
    protocol: ['实验知识库', '标准操作步骤 · 作用说明 · 易错点提示'],
    about: ['关于与说明', '系统能力、数据架构与使用说明']
  };
  $('#viewTitle').textContent = titles[view][0];
  $('#viewSub').textContent = titles[view][1];
  if (view === 'dashboard') loadDashboard();
  if (view === 'records') loadRecords();
  if (view === 'protocol') loadProtocolList();
}

$$('.nav-item').forEach(b => b.addEventListener('click', () => switchView(b.dataset.view)));

const riskClass = k => ({ low: 'low', medium: 'medium', high: 'high', critical: 'critical' }[k] || 'low');

async function loadTypes() {
  const data = await api('/api/types');
  state.types = data.types;
  const sel = $('#fType');
  sel.innerHTML = '<option value="">请选择实验类型</option>' + state.types.map(t => `<option value="${t.id}">${esc(t.name)} · ${esc(t.category)}</option>`).join('');
  const fsel = $('#filterType');
  fsel.innerHTML = '<option value="">全部类型</option>' + state.types.map(t => `<option value="${t.id}">${esc(t.name)}</option>`).join('');
}

function renderMetricFields(typeId) {
  const t = state.types.find(x => x.id === typeId);
  const box = $('#metricFields');
  if (!t) { box.innerHTML = '<div class="empty">请先选择实验类型</div>'; return; }
  box.innerHTML = t.metrics.map(m => {
    let input;
    if (m.type === 'enum') {
      input = `<select name="m_${m.key}" ${m.note ? 'title="' + esc(m.note) + '"' : ''}>${m.options.map(o => `<option value="${esc(o)}" ${o === m.expected ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    } else {
      const hint = m.normal ? `正常 ${m.normal[0]}–${m.normal[1]}` : (m.note || '');
      input = `<input type="text" name="m_${m.key}" placeholder="${m.replicates !== false ? '单值或 值,值,值' : '数值'}">`;
      return `<div class="metric-field"><div class="metric-label"><span>${esc(m.label)}${m.unit ? ' (' + esc(m.unit) + ')' : ''}</span></div><div class="metric-range">${esc(hint)} · 多重复用逗号分隔</div>${input}</div>`;
    }
    const expected = m.expected ? `期望 ${esc(m.expected)}` : (m.note || '');
    return `<div class="metric-field"><div class="metric-label"><span>${esc(m.label)}</span></div><div class="metric-range">${esc(expected)}</div>${input}</div>`;
  }).join('');
}

$('#fType').addEventListener('change', e => renderMetricFields(e.target.value));

function collectForm() {
  const fd = new FormData($('#analysisForm'));
  const type = fd.get('type');
  const t = state.types.find(x => x.id === type);
  const metrics = {};
  if (t) {
    for (const m of t.metrics) {
      const raw = String(fd.get('m_' + m.key) || '').trim();
      if (!raw) continue;
      if (m.type === 'enum') { metrics[m.key] = raw; }
      else {
        const nums = raw.split(/[,，\s]+/).map(Number).filter(n => isFinite(n));
        if (nums.length) metrics[m.key] = nums.length === 1 ? [nums[0]] : nums;
      }
    }
  }
  return {
    type,
    title: String(fd.get('title') || '').trim(),
    batch: String(fd.get('batch') || '').trim(),
    date: fd.get('date') || new Date().toISOString().slice(0, 10),
    operator: String(fd.get('operator') || '').trim(),
    objective: String(fd.get('objective') || '').trim(),
    observations: String(fd.get('observations') || '').trim(),
    metrics
  };
}

$('#previewBtn').addEventListener('click', async () => {
  const payload = collectForm();
  if (!payload.type) return toast('请先选择实验类型');
  try {
    const { analysis } = await api('/api/analyze', { method: 'POST', body: payload });
    renderAnalysis(analysis, false);
    $('#analysisResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) { toast(e.message); }
});

$('#analysisForm').addEventListener('submit', async e => {
  e.preventDefault();
  const payload = collectForm();
  if (!payload.type) return toast('请先选择实验类型');
  if (!payload.title) return toast('请填写实验标题');
  try {
    const { analysis } = await api('/api/experiments', { method: 'POST', body: payload });
    renderAnalysis(analysis, true);
    toast('已保存到服务端并生成分析');
    $('#analysisResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) { toast(err.message); }
});

function renderAnalysis(a, saved) {
  const box = $('#analysisResult');
  const s = a.summary;
  const sevLabel = { critical: '严重', high: '高', medium: '中', low: '低' };

  const findingsHtml = a.findings.length ? a.findings.map(f => `
    <div class="finding">
      <div class="finding-top">
        <div><div class="finding-title">${esc(f.title)}</div><div class="finding-cat">${esc(f.category)} · 严重程度：${sevLabel[f.severity]}</div></div>
        <div class="likelihood"><div class="likelihood-val">${f.likelihood}%</div><div class="likelihood-cap">可能性</div></div>
      </div>
      <div class="evidence"><strong>判定依据：</strong>${f.evidence.map(esc).join('；')}</div>
      <div class="cols">
        <div><h4>可能原因</h4><ol>${f.causes.map(c => `<li>${esc(c.text)}</li>`).join('')}</ol></div>
        <div><h4>排查建议</h4><ol>${f.actions.map(x => `<li>${esc(x.text)}</li>`).join('')}</ol></div>
      </div>
    </div>`).join('') : '<div class="empty">未识别到显著异常，结果可用于后续判读。</div>';

  box.innerHTML = `
    <div class="panel">
      <div class="report-head">
        <div><h2>智能分析报告 ${saved ? '<span class="tag">已保存</span>' : '<span class="tag">预览 · 未保存</span>'}</h2>
        <div class="muted">${esc(a.typeName)} · 分析时间 ${esc(a.analyzedAt.replace('T', ' ').slice(0, 19))} · 比对历史 ${a.historyCount} 批</div></div>
        <button class="btn ghost" onclick="window.print()">导出 / 打印报告</button>
      </div>
      <div class="report-grid">
        <div class="score-box">
          <div class="score-num">${a.healthScore}</div>
          <div class="score-cap">健康度评分</div>
          <div style="margin-top:12px"><span class="badge ${riskClass(a.riskLevel.key)}">${esc(a.riskLevel.label)}预警</span></div>
        </div>
        <div>
          <div class="summary-block"><h3>实验目的</h3><p>${esc(s.objective)}</p></div>
          <div class="summary-block"><h3>方法</h3><p>${esc(s.method)}</p></div>
          <div class="summary-block"><h3>结果</h3><p>${esc(s.result)}</p></div>
          <div class="summary-block"><h3>结论</h3><p>${esc(s.conclusion)}</p></div>
          <div class="summary-block"><h3>原始观察</h3><p>${esc(s.observations)}</p></div>
        </div>
      </div>
      <div class="section-title"><span class="n">${a.anomalies.length}</span> 指标异常项</div>
      ${a.anomalies.length ? a.anomalies.map(x => `<div class="anom-item"><span class="badge ${x.status === 'critical' ? 'critical' : 'medium'}">${x.status === 'critical' ? '严重' : '偏离'}</span> <strong>${esc(x.label)}</strong> — ${esc(x.note || '')}</div>`).join('') : '<div class="muted">各项指标均在正常区间。</div>'}
      ${a.trends.length ? `<div class="section-title"><span class="n">${a.trends.length}</span> 历史趋势漂移</div>${a.trends.map(t => `<div class="trend-item">${esc(t.description)}</div>`).join('')}` : ''}
    </div>
    <div class="panel">
      <div class="section-title" style="margin-top:0"><span class="n">${a.findings.length}</span> 疑似问题定位（按可能性排序）</div>
      ${findingsHtml}
    </div>
    ${a.recommendations.length ? `<div class="panel"><div class="section-title" style="margin-top:0">优先排查建议</div>${a.recommendations.map((r, i) => `<div class="rec-item"><span class="rec-no">${i + 1}.</span><span>${esc(r.text)} <span class="muted">· 来自「${esc(r.from)}」</span></span></div>`).join('')}</div>` : ''}
    <div class="muted" style="text-align:center;margin-top:8px">分析引擎：${esc(a.engine.name)} v${esc(a.engine.version)} · 命中规则 ${a.engine.ruleCount} 条<br>可能性与健康度为规则驱动的启发式估计（非统计概率），阈值取通用参考值，需结合具体工艺校准；本工具为辅助决策，不替代 GMP 放行判定</div>
  `;
  box.style.display = 'block';
}

async function loadDashboard() {
  const data = await api('/api/experiments');
  state.records = data.records; state.stats = data.stats;
  const s = data.stats;
  const cards = $$('#statGrid .stat-value');
  cards[0].textContent = s.total;
  cards[1].textContent = s.criticalCount;
  cards[2].textContent = s.highCount;
  cards[3].textContent = s.avgHealth === null ? '—' : s.avgHealth;

  const recent = $('#recentList');
  if (!data.records.length) {
    recent.innerHTML = '<div class="empty">暂无数据，点击「载入演示数据」体验，或新建一次分析。</div>';
  } else {
    recent.innerHTML = data.records.slice(0, 8).map(r => {
      const a = r.analysis || {};
      const risk = a.riskLevel || { key: 'low', label: '低' };
      return `<div class="recent-item" data-id="${r.id}">
        <div class="recent-main"><div class="recent-title">${esc(r.title)}</div>
        <div class="recent-meta">${esc(a.typeName || r.type)} · ${esc(r.batch || '无批号')} · ${esc(r.date)} <span class="badge ${riskClass(risk.key)}">${esc(risk.label)}</span></div></div>
        <div class="recent-score">${a.healthScore != null ? a.healthScore : '—'}</div>
      </div>`;
    }).join('');
    $$('.recent-item').forEach(el => el.addEventListener('click', () => openRecord(el.dataset.id)));
  }

  const typeNames = Object.fromEntries(state.types.map(t => [t.id, t.name]));
  const entries = Object.entries(s.byType || {});
  const max = Math.max(1, ...entries.map(e => e[1]));
  $('#typeDist').innerHTML = entries.length ? entries.map(([k, v]) => `<div class="dist-row"><span class="dist-name">${esc(typeNames[k] || k)}</span><div class="dist-bar"><div class="dist-fill" style="width:${v / max * 100}%"></div></div><span class="dist-num">${v}</span></div>`).join('') : '<div class="muted">暂无统计数据</div>';
}

async function loadRecords() {
  const type = $('#filterType').value;
  const data = await api('/api/experiments' + (type ? '?type=' + encodeURIComponent(type) : ''));
  $('#recordCount').textContent = `共 ${data.records.length} 条记录`;
  const list = $('#recordsList');
  if (!data.records.length) { list.innerHTML = '<div class="empty">暂无实验记录</div>'; return; }
  list.innerHTML = data.records.map(r => {
    const a = r.analysis || {}, risk = a.riskLevel || { key: 'low', label: '低' };
    return `<div class="record-item" data-id="${r.id}">
      <div class="record-top"><div><div class="record-title">${esc(r.title)}</div>
      <div class="record-meta">${esc(a.typeName || r.type)} · 批号 ${esc(r.batch || '—')} · ${esc(r.date)} · 操作人 ${esc(r.operator || '—')} · 疑似问题 ${a.findings ? a.findings.length : 0} 项</div></div>
      <span class="badge ${riskClass(risk.key)}">${esc(risk.label)}预警 · ${a.healthScore != null ? a.healthScore : '—'}分</span></div>
    </div>`;
  }).join('');
  $$('.record-item').forEach(el => el.addEventListener('click', () => openRecord(el.dataset.id)));
}

async function openRecord(id) {
  const { record } = await api('/api/experiments/' + id);
  switchView('new');
  $('#analysisForm').reset();
  $('#fType').value = record.type;
  renderMetricFields(record.type);
  const fd = $('#analysisForm');
  for (const k of ['title', 'batch', 'date', 'operator', 'objective', 'observations']) {
    const el = fd.querySelector(`[name="${k}"]`); if (el) el.value = record[k] || '';
  }
  const t = state.types.find(x => x.id === record.type);
  if (t) for (const m of t.metrics) {
    const el = fd.querySelector(`[name="m_${m.key}"]`);
    if (!el || record.metrics[m.key] === undefined) continue;
    el.value = m.type === 'enum' ? record.metrics[m.key] : (Array.isArray(record.metrics[m.key]) ? record.metrics[m.key].join(', ') : record.metrics[m.key]);
  }
  if (record.analysis) renderAnalysis(record.analysis, true);
  $('#analysisResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

$('#refreshDash').addEventListener('click', loadDashboard);
$('#refreshRecords').addEventListener('click', loadRecords);
$('#filterType').addEventListener('change', loadRecords);
$('#seedBtn').addEventListener('click', async () => {
  try { const r = await api('/api/seed', { method: 'POST', body: {} }); toast(r.message || `已载入 ${r.total} 条演示数据`); loadDashboard(); }
  catch (e) { toast(e.message); }
});

/* ===== 实验知识库 ===== */
let kbCurrent = null;
let kbPitfallsHidden = false;

const reagentCard = $('#reagentCard');
let reagentByAlias = new Map();
let reagentById = new Map();
let reagentPattern = null;
let activeReagentEl = null;

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function setReagentData(reagents) {
  reagentByAlias = new Map();
  reagentById = new Map();
  const aliases = [];
  (reagents || []).forEach(r => {
    reagentById.set(r.id, r);
    (r.aliases || [r.name]).forEach(a => {
      if (!a || reagentByAlias.has(a)) return;
      reagentByAlias.set(a, r);
      aliases.push(a);
    });
  });
  aliases.sort((a, b) => b.length - a.length);
  reagentPattern = aliases.length
    ? new RegExp('(' + aliases.map(escapeRegExp).join('|') + ')', 'g')
    : null;
}

function linkReagents(text) {
  const safe = esc(text);
  if (!reagentPattern) return safe;
  reagentPattern.lastIndex = 0;
  return safe.replace(reagentPattern, m => {
    const r = reagentByAlias.get(m);
    if (!r) return m;
    return `<span class="reagent" data-reagent="${esc(r.id)}" tabindex="0" role="button" aria-label="查看试剂知识卡：${esc(r.name)}">${m}</span>`;
  });
}

function hideReagentCard() {
  if (!reagentCard) return;
  reagentCard.hidden = true;
  reagentCard.innerHTML = '';
  activeReagentEl = null;
}

function showReagentCard(anchor) {
  if (!reagentCard) return;
  const r = reagentById.get(anchor.dataset.reagent);
  if (!r) return;
  activeReagentEl = anchor;
  reagentCard.innerHTML = `
    <div class="reagent-card-head">
      <div><div class="reagent-card-name">${esc(r.name)}</div><div class="reagent-card-cat">${esc(r.category)}</div></div>
      <button class="reagent-card-close" type="button" data-close aria-label="关闭试剂知识卡">×</button>
    </div>
    <div class="reagent-card-row"><div class="reagent-card-label">作用</div><div>${esc(r['function'])}</div></div>
    ${r.composition ? `<div class="reagent-card-row"><div class="reagent-card-label">成分</div><div>${esc(r.composition)}</div></div>` : ''}
    ${r.notes ? `<div class="reagent-card-row"><div class="reagent-card-label">注意</div><div>${esc(r.notes)}</div></div>` : ''}
    ${r.storage ? `<div class="reagent-card-row"><div class="reagent-card-label">储存</div><div>${esc(r.storage)}</div></div>` : ''}
    <div class="reagent-card-foot">点击其他区域关闭 · 具体以试剂盒说明书为准</div>`;
  reagentCard.hidden = false;
  positionReagentCard(anchor);
}

function positionReagentCard(anchor) {
  const rect = anchor.getBoundingClientRect();
  const cw = reagentCard.offsetWidth || 320;
  const ch = reagentCard.offsetHeight || 180;
  let left = rect.left + rect.width / 2 - cw / 2;
  let top = rect.bottom + 8;
  if (top + ch > window.innerHeight - 12) top = rect.top - ch - 8;
  left = Math.max(12, Math.min(left, window.innerWidth - cw - 12));
  top = Math.max(12, top);
  reagentCard.style.left = left + 'px';
  reagentCard.style.top = top + 'px';
}

document.addEventListener('mouseover', e => {
  const el = e.target.closest && e.target.closest('.reagent');
  if (el) showReagentCard(el);
});
document.addEventListener('focusin', e => {
  const el = e.target.closest && e.target.closest('.reagent');
  if (el) showReagentCard(el);
});
document.addEventListener('click', e => {
  if (e.target.closest && e.target.closest('[data-close]')) { hideReagentCard(); return; }
  const el = e.target.closest && e.target.closest('.reagent');
  if (el) { showReagentCard(el); return; }
  if (!(e.target.closest && e.target.closest('#reagentCard'))) hideReagentCard();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideReagentCard();
});
window.addEventListener('scroll', () => {
  if (!reagentCard || reagentCard.hidden || !activeReagentEl) return;
  const rect = activeReagentEl.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) { hideReagentCard(); return; }
  positionReagentCard(activeReagentEl);
}, true);

async function loadProtocolList() {
  try {
    const { protocols } = await api('/api/protocols');
    const sel = $('#kbProtocolSelect');
    const current = sel.value;
    const totalSteps = protocols.reduce((n, p) => n + p.stepCount, 0);
    const countEl = $('#kbProtocolCount');
    if (countEl) countEl.textContent = `共 ${protocols.length} 个实验 · ${totalSteps} 个步骤`;
    const groups = new Map();
    protocols.forEach(p => {
      const group = (p.category || '').split(' · ')[0] || '其他';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(p);
    });
    sel.innerHTML = [...groups.entries()].map(([group, items]) => `<optgroup label="${esc(group)}">${items.map(p => `<option value="${p.id}" title="${esc(p.short)}">${esc(p.name)}（${p.stepCount} 步 · ${p.pitfallCount} 处易错）</option>`).join('')}</optgroup>`).join('');
    const nextId = protocols.some(p => p.id === current) ? current : (protocols[0] && protocols[0].id);
    if (nextId) {
      sel.value = nextId;
      await renderProtocol(nextId);
    }
  } catch (e) { toast('知识库加载失败：' + e.message); }
}

async function renderProtocol(id) {
  try {
    const { protocol } = await api('/api/protocols/' + encodeURIComponent(id));
    kbCurrent = protocol;
    hideReagentCard();
    setReagentData(protocol.reagents || []);
    const ov = protocol.overview;
    const ovRows = [
      ['实验原理', ov.principle, true],
      ['适用场景', ov.application, true],
      ['起始材料', ov.input, false],
      ['产物', ov.output, false],
      ['预计耗时', ov.duration, false],
      ['参考产量', ov.yield, false]
    ].map(([label, text, full]) => `<div class="kb-ov-item${full ? ' full' : ''}"><div class="kb-ov-label">${esc(label)}</div><div class="kb-ov-text">${esc(text)}</div></div>`).join('');

    const specs = `<table class="kb-specs"><thead><tr><th>质控指标</th><th>参考范围</th><th>说明</th></tr></thead><tbody>${protocol.keySpecs.map(s => `<tr><td>${esc(s.label)}</td><td class="spec-val">${esc(s.value)}</td><td>${esc(s.note)}</td></tr>`).join('')}</tbody></table>`;

    const levelText = { critical: '高危', high: '高', medium: '中', low: '低' };
    const interpText = { ok: '正常', warn: '注意', bad: '异常', info: '说明' };
    const steps = protocol.steps.map(s => {
      const pitfalls = s.pitfalls.map(p => `<div class="kb-pitfall ${p.level}"><div class="kb-pitfall-head"><span class="kb-pitfall-level">${levelText[p.level] || p.level}</span><span class="kb-pitfall-title">${linkReagents(p.title)}</span></div><div class="kb-pitfall-row"><strong>后果：</strong>${linkReagents(p.consequence)}</div><div class="kb-pitfall-row fix"><strong>规避：</strong>${linkReagents(p.fix)}</div></div>`).join('');
      const substeps = (s.substeps || []).map(x => `<li>${linkReagents(x)}</li>`).join('');
      const params = (s.params || []).map(p => `<div class="kb-param"><div class="kb-param-label">${linkReagents(p.label)}</div><div class="kb-param-value">${linkReagents(p.value)}</div></div>`).join('');
      const checkpoints = (s.checkpoints || []).map(x => `<li>${linkReagents(x)}</li>`).join('');
      const interpRows = s.interpretation ? (s.interpretation.rows || []).map(r => `<tr class="kb-interp-${r.status}"><td class="kb-interp-metric">${esc(r.metric)}</td><td class="kb-interp-range">${esc(r.range)}</td><td><span class="kb-interp-badge">${interpText[r.status] || '说明'}</span>${linkReagents(r.meaning)}</td><td>${linkReagents(r.action)}</td></tr>`).join('') : '';
      const interpretation = s.interpretation ? `<div class="kb-detail-section kb-interp-section">
            <div class="kb-detail-label">${esc(s.interpretation.title || '结果解读')}</div>
            <p class="kb-interp-intro">${esc(s.interpretation.intro || '')}</p>
            ${s.interpretation.order ? `<div class="kb-interp-order"><strong>判读顺序：</strong>${s.interpretation.order.map((x, i) => `<span>${i + 1}. ${esc(x)}</span>`).join('')}</div>` : ''}
            <div class="kb-interp-wrap"><table class="kb-interp"><thead><tr><th>指标</th><th>读数</th><th>解读</th><th>建议处理</th></tr></thead><tbody>${interpRows}</tbody></table></div>
            ${s.interpretation.note ? `<p class="kb-interp-note">${linkReagents(s.interpretation.note)}</p>` : ''}
          </div>` : '';
      return `<div class="kb-step">
        <div class="kb-step-head">
          <span class="kb-step-no">${s.no}</span>
          <div class="kb-step-titles"><div class="kb-step-phase">${esc(s.phase)}</div><div class="kb-step-title">${linkReagents(s.title)}</div></div>
          <span class="kb-step-pitfall-count">${s.pitfalls.length} 处易错</span>
          <span class="kb-chevron">▼</span>
        </div>
        <div class="kb-step-body">
          <div class="kb-op-summary"><div class="kb-op-label">本步操作</div><div class="kb-op-text">${linkReagents(s.summary || s.detail)}</div></div>
          <div class="kb-purpose"><div class="kb-purpose-label">这一步的作用</div><div class="kb-purpose-text">${linkReagents(s.purpose)}</div></div>
          ${interpretation}
          <button class="kb-detail-toggle" type="button">▸ 显示详细步骤</button>
          <div class="kb-detail-body">
            ${s.detail ? `<div class="kb-detail-intro">${linkReagents(s.detail)}</div>` : ''}
            ${substeps ? `<div class="kb-detail-section"><div class="kb-detail-label">详细操作步骤</div><ol class="kb-substeps">${substeps}</ol></div>` : ''}
            ${params ? `<div class="kb-detail-section"><div class="kb-detail-label">关键参数</div><div class="kb-param-grid">${params}</div></div>` : ''}
            ${checkpoints ? `<div class="kb-detail-section"><div class="kb-detail-label">观察与判定</div><ul class="kb-checkpoints">${checkpoints}</ul></div>` : ''}
          </div>
          <div class="kb-pitfalls"><div class="kb-pitfalls-title">易出现失误之处</div>${pitfalls}</div>
        </div>
      </div>`;
    }).join('');

    const refs = `<ul class="kb-refs">${protocol.references.map(r => `<li>${esc(r)}</li>`).join('')}</ul>`;

    $('#kbContent').innerHTML = `
      <div class="panel">
        <div class="panel-head"><h2>${esc(protocol.name)}</h2><span class="muted">${esc(protocol.category)}</span></div>
        <div class="kb-overview">${ovRows}</div>
      </div>
      <div class="panel">
        <div class="panel-head"><h2>关键质控指标</h2></div>
        ${specs}
      </div>
      <div class="panel">
        <div class="panel-head"><h2>标准操作步骤（${protocol.steps.length} 步）</h2><span class="head-hint">点击步骤展开 · 试剂名称可悬停查看知识卡 · 详细步骤默认隐藏 · 易错点已标注</span></div>
        ${steps}
      </div>
      <div class="panel"><div class="panel-head"><h2>参考依据</h2></div>${refs}
        <p class="disclaimer">本知识库为通用参考流程，用于演示与培训；具体体积、离心力与时间以所用试剂盒说明书及实验室 SOP 为准。</p>
      </div>`;

    // 步骤头点击展开/收起
    $$('#kbContent .kb-step-head').forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('open')));
    // 细节显示/隐藏
    $$('#kbContent .kb-detail-toggle').forEach(b => b.addEventListener('click', e => {
      e.stopPropagation();
      const body = b.nextElementSibling;
      const show = body.classList.toggle('show');
      b.textContent = show ? '▾ 隐藏详细步骤' : '▸ 显示详细步骤';
    }));
    applyPitfallVisibility();
  } catch (e) { toast('知识库渲染失败：' + e.message); }
}

function applyPitfallVisibility() {
  $$('#kbContent .kb-pitfalls').forEach(el => el.classList.toggle('hidden', kbPitfallsHidden));
}

$('#kbProtocolSelect').addEventListener('change', e => renderProtocol(e.target.value));
$('#kbExpandAll').addEventListener('click', () => {
  $$('#kbContent .kb-step').forEach(s => s.classList.add('open'));
  $$('#kbContent .kb-detail-body').forEach(b => b.classList.add('show'));
  $$('#kbContent .kb-detail-toggle').forEach(b => b.textContent = '▾ 隐藏详细步骤');
});
$('#kbCollapseAll').addEventListener('click', () => {
  $$('#kbContent .kb-step').forEach(s => s.classList.remove('open'));
  $$('#kbContent .kb-detail-body').forEach(b => b.classList.remove('show'));
  $$('#kbContent .kb-detail-toggle').forEach(b => b.textContent = '▸ 显示详细步骤');
});
$('#kbTogglePitfalls').addEventListener('click', e => {
  kbPitfallsHidden = !kbPitfallsHidden;
  applyPitfallVisibility();
  e.target.textContent = kbPitfallsHidden ? '显示易错点' : '隐藏易错点';
});

(async function init() {
  try {
    document.querySelector('[name="date"]').value = new Date().toISOString().slice(0, 10);
    await loadTypes();
    await loadDashboard();
  } catch (e) { toast('初始化失败：' + e.message); }
})();

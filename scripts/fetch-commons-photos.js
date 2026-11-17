'use strict';

/* 从维基共享资源抓取实验操作库的真实仪器照片。
   本机无法直连 upload.wikimedia.org，改由公共图像代理 images.weserv.nl 取图；
   代理会对上游做缓存，并对高频请求返回 429，因此逐张下载、失败退避重试。

   用法：node scripts/fetch-commons-photos.js
   产出：public/images/op-*.jpg（1200×675，16:9，JPEG） */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const IMG_DIR = path.join(__dirname, '..', 'public', 'images');
const RAW_DIR = path.join(__dirname, '..', '.tmp-commons');
const CREDITS = path.join(IMG_DIR, 'CREDITS.md');

// 每个操作槽位的候选文件（按优先级），全部来自 Wikimedia Commons
const SLOTS = {
  'op-pipetting': ['Biologist using pipette 02.jpg', 'Biologist using pipette 03.jpg', 'Micropipettes on a pipette stand 01.jpg', 'Electronic micropipette 01.jpg'],
  'op-centrifuge': ['Centrifuge Eppendorf 5804 R.jpg', 'Eppendorf Centrifuge 5430.jpg'],
  'op-centrifuge-use': ['Loading a centrifuge with samples to separate components of the extraction process. (48788935101).jpg', 'Rotor for microtubes of an Eppendorf Centrifuge 5430.jpg', 'Centrifuge Used to Spin Samples (5544573400).jpg'],
  'op-vortex': ['Vortex mixer VorTech-01.jpg', 'Assistent Reamix 2789 Vortex Mixer.jpg'],
  'op-pcr-setup': ['Preparing PCR reaction.jpg', 'PCR Tubes.jpg'],
  'op-gel-loading': ['Gel electrophoresis apparatus demonstration.jpg'],
  'op-aseptic': ['Biosafety Cabinet.jpg', 'Tissue Culture.jpg', 'Laminaar TYKI DL20221105.jpg'],
  'op-nanodrop': ['Nanodrop ND1000 spectrophotometer.jpg', 'NanoDrop spectrophotometer.jpg', 'Spectrophotometer.jpg'],
  'op-thermal-cycler': ['Thermocycler.png', 'A Multi Bay PCR Machine.jpg', 'China Gifted PCR Macine or Thermocycler.jpg'],
  'op-plate-reader': ['Microplate reader.jpg', 'PerkinElmer SpectraPlate-1536 MB.jpg'],
  'op-ph-meter': ['PH meter 2014.jpg', 'Electronic PH meter.JPG', 'Hanna-ph-meter hg.jpg'],
  'op-balance': ['Working in analytical chemistry 1.jpg', 'Bilancia Analitica Elettronica Quintix.jpg']
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// 上游限流较严时可用环境变量调大退避：ONLY=op-centrifuge,op-thermal-cycler BACKOFF=30000
const ONLY = (process.env.ONLY || '').split(',').map(s => s.trim()).filter(Boolean);
const BACKOFF = Number(process.env.BACKOFF || 6000);

function proxyUrl(file, width) {
  const inner = 'commons.wikimedia.org/wiki/Special:FilePath/' + file;
  return `https://images.weserv.nl/?url=${encodeURIComponent(inner)}&w=${width}&output=jpg`;
}

async function fetchWithRetry(file, destRaw, tries = 5) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(proxyUrl(file, 2000), { headers: { 'User-Agent': 'BioLabInsight/1.0' } });
      const buf = Buffer.from(await res.arrayBuffer());
      const type = res.headers.get('content-type') || '';
      if (res.ok && type.startsWith('image/') && buf.length > 20000) {
        fs.writeFileSync(destRaw, buf);
        return true;
      }
      const msg = buf.slice(0, 120).toString('utf8').replace(/\s+/g, ' ');
      if (i < tries) { await sleep(BACKOFF * i); continue; }
      console.warn(`   ✗ ${file}  最后一次失败：${res.status} ${msg}`);
      return false;
    } catch (e) {
      if (i < tries) { await sleep(BACKOFF * i); continue; }
      console.warn(`   ✗ ${file}  网络错误：${e.message}`);
      return false;
    }
  }
  return false;
}

(async () => {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('about:blank');

  const credits = [];
  for (const [slot, candidates] of Object.entries(SLOTS)) {
    if (ONLY.length && !ONLY.includes(slot)) continue;
    let done = false;
    for (const file of candidates) {
      const raw = path.join(RAW_DIR, path.basename(file).replace(/[^\w.-]+/g, '_'));
      console.log(`→ ${slot}  ←  ${file}`);
      if (!fs.existsSync(raw)) {
        const ok = await fetchWithRetry(file, raw);
        if (!ok) { await sleep(3000); continue; }
      }
      // 居中裁成 16:9，缩放到 1200×675
      const dataUrl = await page.evaluate(async ({ b64, OUT_W, OUT_H }) => {
        const img = new Image();
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = 'data:image/jpeg;base64,' + b64; });
        const targetRatio = OUT_W / OUT_H;
        let sw = img.width, sh = Math.round(sw / targetRatio);
        if (sh > img.height) { sh = img.height; sw = Math.round(sh * targetRatio); }
        const sx = Math.round((img.width - sw) / 2);
        const sy = Math.round((img.height - sh) / 2);
        const c = document.createElement('canvas');
        c.width = OUT_W; c.height = OUT_H;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H);
        return { url: c.toDataURL('image/jpeg', 0.86), w: img.width, h: img.height };
      }, { b64: fs.readFileSync(raw).toString('base64'), OUT_W: 1200, OUT_H: 675 });

      const out = path.join(IMG_DIR, slot + '.jpg');
      fs.writeFileSync(out, Buffer.from(dataUrl.url.split(',')[1], 'base64'));
      console.log(`   ✓ ${slot}.jpg  ${(fs.statSync(out).size / 1024).toFixed(0)} KB  (源 ${dataUrl.w}×${dataUrl.h})`);
      credits.push({ slot, file });
      done = true;
      break;
    }
    if (!done) console.warn(`   ! ${slot} 没有取到图，保留原有配图`);
    await sleep(2000);
  }

  await browser.close();

  // 与既有 CREDITS.md 合并，避免只跑部分槽位时把之前的记录冲掉
  const merged = new Map();
  if (fs.existsSync(CREDITS)) {
    for (const line of fs.readFileSync(CREDITS, 'utf8').split('\n')) {
      const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*(.+?)\s*\|\s*$/);
      if (m && m[1] !== '本地文件') merged.set(m[1], m[2]);
    }
  }
  for (const c of credits) merged.set(`${c.slot}.jpg`, c.file);

  const lines = ['# 实验操作库配图来源', '',
    '以下照片取自 [Wikimedia Commons](https://commons.wikimedia.org/)，仅做 16:9 裁切与压缩，未改变画面内容。',
    '各文件的具体作者与许可协议见对应 Commons 文件页：`https://commons.wikimedia.org/wiki/File:<文件名>`。', '',
    '| 本地文件 | Commons 原始文件 |', '| --- | --- |',
    ...[...merged.entries()].sort().map(([k, v]) => `| \`${k}\` | ${v} |`)];
  fs.writeFileSync(CREDITS, lines.join('\n') + '\n', 'utf8');
  console.log('\n已更新来源说明：public/images/CREDITS.md（共 ' + merged.size + ' 条）');
})();

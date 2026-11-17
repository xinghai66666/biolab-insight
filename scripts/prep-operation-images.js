'use strict';

/* 把 AI 生成的实验操作配图处理成可直接上线的素材：
   1) 裁掉右下角的平台水印（统一按 16:9 取中间偏上区域）
   2) 缩放到 1200×675，输出 JPEG，体积从 ~2 MB 降到 ~150 KB
   用法：node scripts/prep-operation-images.js */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const IMG_DIR = path.join(__dirname, '..', 'public', 'images');

// 源文件（按生成时间命名）→ 稳定文件名
const MAP = {
  'Professional_laboratory_photog_2026-11-17T11-14-50.png': 'op-pipetting',
  'Professional_laboratory_photog_2026-11-17T11-15-56.png': 'op-centrifuge',
  'Professional_laboratory_photog_2026-11-17T11-16-39.png': 'op-vortex',
  'Professional_laboratory_photog_2026-11-17T11-17-31.png': 'op-pcr-setup',
  'Professional_laboratory_photog_2026-11-17T11-18-12.png': 'op-gel-loading',
  'Professional_laboratory_photog_2026-11-17T11-18-54.png': 'op-aseptic',
  'Professional_laboratory_photog_2026-11-17T11-23-47.png': 'op-nanodrop',
  'Professional_laboratory_photog_2026-11-17T11-24-20.png': 'op-thermal-cycler',
  'Professional_laboratory_photog_2026-11-17T11-24-44.png': 'op-plate-reader',
  'Professional_laboratory_photog_2026-11-17T11-25-27.png': 'op-ph-meter',
  'Professional_laboratory_photog_2026-11-17T11-25-55.png': 'op-balance'
};

const OUT_W = 1200;
const OUT_H = 675;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('about:blank');

  let ok = 0;
  for (const [src, base] of Object.entries(MAP)) {
    const srcPath = path.join(IMG_DIR, src);
    if (!fs.existsSync(srcPath)) { console.warn('跳过（文件不存在）:', src); continue; }
    const b64 = fs.readFileSync(srcPath).toString('base64');

    const dataUrl = await page.evaluate(async ({ b64, OUT_W, OUT_H }) => {
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res; img.onerror = rej;
        img.src = 'data:image/png;base64,' + b64;
      });
      // 以 16:9 取景，垂直方向取中间偏上，确保右下角水印被完全裁掉
      const targetRatio = OUT_W / OUT_H;
      let sw = img.width;
      let sh = Math.round(sw / targetRatio);
      if (sh > img.height) { sh = img.height; sw = Math.round(sh * targetRatio); }
      const sx = Math.round((img.width - sw) / 2);
      const sy = Math.max(0, Math.round((img.height - sh) * 0.35));
      const canvas = document.createElement('canvas');
      canvas.width = OUT_W; canvas.height = OUT_H;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H);
      return canvas.toDataURL('image/jpeg', 0.84);
    }, { b64, OUT_W, OUT_H });

    const outPath = path.join(IMG_DIR, base + '.jpg');
    fs.writeFileSync(outPath, Buffer.from(dataUrl.split(',')[1], 'base64'));
    const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`${base}.jpg  ${kb} KB`);
    ok++;
  }

  await browser.close();
  console.log(`\n完成 ${ok} / ${Object.keys(MAP).length} 张`);
})();

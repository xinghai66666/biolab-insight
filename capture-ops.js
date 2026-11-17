'use strict';

/* 生成「实验操作库」相关截图（截图16 / 截图17）。
   用法：先启动 node server.js，再运行 node capture-ops.js */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = process.env.DEMO_BASE || 'http://localhost:3721';
const OUT = path.join(__dirname, '..', '报名材料', 'screenshots');

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  await page.click('.nav-item[data-view="operations"]');
  await page.waitForTimeout(600);
  // 展开侧边栏会带遮罩，截图前先点遮罩收起，画面更干净
  if (!(await page.locator('#sidebarMask').isHidden())) {
    await page.locator('#sidebarMask').click({ position: { x: 200, y: 300 } });
    await page.waitForTimeout(350);
  }
  await page.waitForTimeout(600);
  // 等所有卡片配图加载完成，避免截到空白占位
  await page.evaluate(() => Promise.all(
    [...document.querySelectorAll('#operationsContent .op-figure img')].map(img =>
      img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; }))
  ));
  await page.screenshot({ path: path.join(OUT, '截图16_实验操作库_图解.png'), fullPage: true });
  console.log('✓ 截图16_实验操作库_图解.png');

  await page.click('.op-card[data-op="pipetting"]');
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, '截图17_实验操作库_操作图解.png') });
  console.log('✓ 截图17_实验操作库_操作图解.png');

  await browser.close();
})();

// 三关整张地图的缩略图 + 几处路段特写，存到 docs/verification/routes/。Vite 开着时运行。
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const out = 'docs/verification/routes';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true, args: ['--mute-audio'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 90000 });
    await page.evaluate(() => __t.keepAllArt());
    const shots = (process.env.SHOTS || '').split(',').filter(Boolean);
    const views = [
      { stage: 0, name: 'foot-map', whole: true },
      { stage: 1, name: 'waist-map', whole: true },
      { stage: 2, name: 'peak-map', whole: true },
      { stage: 1, name: 'waist-plank', at: { x: 3500, y: 3450 }, zoom: 0.55 },
      { stage: 1, name: 'waist-switchback', at: { x: 4700, y: 4100 }, zoom: 0.45 },
      { stage: 1, name: 'waist-duel', at: { x: 3500, y: 800 }, zoom: 0.5 },
      { stage: 2, name: 'peak-stairs', at: { x: 2400, y: 5600 }, zoom: 0.5 },
      { stage: 2, name: 'peak-bridge', at: { x: 1750, y: 4600 }, zoom: 0.5 },
      { stage: 2, name: 'peak-palace', at: { x: 1800, y: 900 }, zoom: 0.45 },
    ].filter((v) => !shots.length || shots.includes(v.name));
    for (const v of views) {
      await page.evaluate(async (v) => {
        const r = (await import('/src/game/run.ts')).startRun('wenShaohua', false);
        r.stage = v.stage;
        r.step = 4;
        __t.go('Map');
        __t.wake();
      }, v);
      await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 90000 });
      await page.evaluate((v) => {
        const m = __t.scene();
        const M = m.stage.map;
        m.scene.get('UI').scene.setVisible(false);
        const cam = m.cameras.main;
        cam.stopFollow();
        cam.setBounds();
        cam.removeBounds?.();
        if (v.whole) {
          cam.setZoom(Math.min(1280 / M.width, 720 / M.height));
          cam.centerOn(M.width / 2, M.height / 2);
        } else {
          m.player.pos = { ...v.at };
          cam.setZoom(v.zoom);
          cam.centerOn(v.at.x, v.at.y);
        }
        m.pauses.add('capture');
      }, v);
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${out}/${v.name}.png` });
      console.log(v.name);
    }
    if (errors.length) throw Error(errors.join('\n'));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

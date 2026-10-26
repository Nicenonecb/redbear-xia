const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless:true });
  try {
    const page = await browser.newPage();
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, {timeout:90000});
    await page.evaluate(async () => {
      const r = (await import('/src/game/run.ts')).startRun('yuWuxia', false);
      r.stage = 1; r.step = 4;
      __t.go('Map'); __t.wake();
    });
    await page.waitForFunction(() => game.scene.isActive('Map'), {}, {timeout:90000});
    const result = await page.evaluate(() => {
      __t.sleep(); __t.fast = true;
      const m = __t.scene();
      m.player.pos = {x:4852.521058684483,y:1282.7555398797733};
      __t.drive(900, __t.autoPlayer(0.75, 'route-regression'), s => s.boss?.stage !== 'intro');
      return { player:m.player.pos, bossState:m.boss.stage, introduced:m.controller.introduced };
    });
    console.log(result);
    if (!result.introduced) throw Error('Camp approach blocked before boss introduction');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode=1; });

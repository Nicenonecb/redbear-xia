// 三关路线走通检查：每关、两位主角，从山门（地图起点）一路走到 Boss 开场白，中途不能卡在边上。
// 遭遇战都算打过了（step 4），只看路；自动打法按路的拐点走。Vite 开着时运行。
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 90000 });
    await page.evaluate(() => __t.keepAllArt());
    const rows = [];
    for (const hero of ['wenShaohua', 'yuWuxia'])
      for (const stage of [0, 1, 2]) {
        await page.evaluate(
          async ({ hero, stage }) => {
            const r = (await import('/src/game/run.ts')).startRun(hero, false);
            r.stage = stage;
            r.step = 4;
            __t.go('Map');
            __t.wake();
          },
          { hero, stage },
        );
        await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 90000 });
        const row = await page.evaluate(
          ({ hero, stage }) => {
            __t.sleep();
            __t.fast = true;
            const m = __t.scene();
            m.player.pos = { ...m.stage.map.start };
            let frames = 0;
            let stuck = 0;
            let last = { ...m.player.pos };
            let worst = 0;
            let left = null;
            let reached = false;
            __t.drive(
              12000,
              __t.autoPlayer(0.75, `route-${hero}-${stage}`),
              (s) => {
                if (!s.player) return (left = s.scene.key);
                frames++;
                const p = s.player.pos;
                const moved = Math.hypot(p.x - last.x, p.y - last.y);
                last = { ...p };
                stuck = moved < 0.5 && !s.pauses.size ? stuck + 1 : 0;
                worst = Math.max(worst, stuck);
                return (reached = !!(s.controller.introduced || (s.boss && s.boss.stage !== 'intro')));
              },
            );
            return { hero, stage, frames, introduced: reached, longestStill: worst, end: m.player.pos, left };
          },
          { hero, stage },
        );
        console.log(JSON.stringify(row));
        rows.push(row);
        if (!row.introduced) throw Error(`stage ${stage} ${hero}: never reached the boss`);
        if (row.longestStill > 120) throw Error(`stage ${stage} ${hero}: stood still ${row.longestStill} frames`);
      }
    if (errors.length) throw Error(errors.join('\n'));
    console.log(`all ${rows.length} walks reached the boss`);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

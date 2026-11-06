// 返修 5 的两条故事线索：Vite 开着时运行，截图放 docs/verification/clues/。
//   账本：第一关拔剑打赢、放完人，主角走到后院粮堆旁弹出账本那两句；给钱放行不出现。
//   练兵：第二关走进兵营外，木人桩前一排新兵在练刺，走近弹两句对话；开打时新兵散开。
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const out = 'docs/verification/clues';
const only = (process.env.ONLY || 'ledger').split(',');
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true, args: ['--mute-audio'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const ok = (v, msg) => {
    if (!v) throw Error(msg);
  };
  const results = [];
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 90000 });
    await page.evaluate(() => __t.keepAllArt());
    // 进地图，并把念过的每一句台词记下来
    const enter = (stage, step, coins = 0) =>
      page.evaluate(
        async ({ stage, step, coins }) => {
          const r = (await import('/src/game/run.ts')).startRun('wenShaohua', false);
          Object.assign(r, { stage, step, coins });
          __t.go('Map');
          __t.wake();
        },
        { stage, step, coins },
      );
    const watchLines = () =>
      page.evaluate(() => {
        const m = __t.scene();
        window.said = [];
        const ui = m.ui;
        const say = ui.say.bind(ui);
        ui.say = (line, ...rest) => {
          window.said.push(line);
          return say(line, ...rest);
        };
      });

    if (only.includes('ledger')) {
      for (const bribe of [false, true]) {
        await enter(0, 4, 100);
        await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 90000 });
        await watchLines();
        await page.evaluate((bribe) => {
          const m = __t.scene();
          if (bribe) m.controller.pay(100);
          else m.controller.onBossDefeated();
        }, bribe);
        // 真实时间跑，画面才会动；等到账本那句出来（或者过关）
        const shown = await page
          .waitForFunction(() => window.said.some((l) => l.includes('二哥处已送去三百石')) || game.scene.isActive('Letter'), {}, { timeout: 30000 })
          .then(() => page.evaluate(() => window.said.some((l) => l.includes('二哥处已送去三百石'))));
        if (!bribe) {
          ok(shown, 'sword route: ledger line not shown');
          await page.waitForTimeout(600);
          await page.screenshot({ path: `${out}/ledger.png` });
        } else ok(!shown, 'bribe route: ledger must not appear');
        await page.waitForFunction(() => game.scene.isActive('Letter'), {}, { timeout: 30000 });
        const said = await page.evaluate(() => window.said);
        results.push({ case: bribe ? 'bribe' : 'sword', ledger: shown, said });
        console.log(JSON.stringify(results[results.length - 1]));
      }
    }

    if (only.includes('drill')) {
      // 兵营外：先在空地外面停一下看新兵练刺，再走近听对话，再走进去开打
      await enter(1, 3);
      await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 90000 });
      await watchLines();
      const info = await page.evaluate(() => {
        const m = __t.scene();
        const d = m.drill;
        return d ? { at: d.at, recruits: d.recruits.length, center: m.stage.map.areas.find((a) => a.id === 'campFront').center } : null;
      });
      ok(info && info.recruits >= 4, 'drill recruits missing');
      // 站在空地西边路口，看得见木人桩
      await page.evaluate((info) => {
        const m = __t.scene();
        m.player.pos.x = info.center.x - 560;
        m.player.pos.y = info.center.y + 60;
      }, info);
      await page.waitForTimeout(1200);
      const poses = await page.evaluate(() => __t.scene().drill.recruits.map((r) => r.pose));
      await page.waitForTimeout(500);
      const poses2 = await page.evaluate(() => __t.scene().drill.recruits.map((r) => r.pose));
      ok(poses.join() !== poses2.join() || poses.some((p) => p === 'strike'), 'recruits are not drilling');
      await page.screenshot({ path: `${out}/drill.png` });
      // 走近一点：弹对话
      await page.evaluate((info) => {
        const m = __t.scene();
        m.player.pos.x = info.at.x - 330;
        m.player.pos.y = info.at.y + 160;
      }, info);
      await page.waitForFunction(() => window.said.some((l) => l.includes('杭州')), {}, { timeout: 15000 });
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${out}/drill-talk.png` });
      await page.waitForFunction(() => window.said.some((l) => l.includes('少打听')), {}, { timeout: 15000 });
      // 走进空地中间：遭遇战开打，新兵散开
      await page.waitForFunction(() => !__t.scene().pauses.size, {}, { timeout: 15000 });
      await page.evaluate((info) => {
        const m = __t.scene();
        m.player.pos.x = info.center.x;
        m.player.pos.y = info.center.y + 40;
      }, info);
      await page.waitForFunction(() => __t.scene().drill.scattered, {}, { timeout: 15000 });
      await page.waitForTimeout(1200);
      const gone = await page.evaluate(() => __t.scene().drill.recruits.every((r) => r.alpha < 0.05));
      ok(gone, 'recruits did not fade out when the fight started');
      await page.screenshot({ path: `${out}/drill-scatter.png` });
      const said = await page.evaluate(() => window.said);
      results.push({ case: 'drill', recruits: info.recruits, poses, poses2, said });
      console.log(JSON.stringify(results[results.length - 1]));
    }
    if (errors.length) throw Error(errors.join('\n'));
    console.log('story clues ok');
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

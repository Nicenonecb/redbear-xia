/*
 * 正常速度（非 fast，画面照常渲染）下测 AI 每帧决策耗时：特征提取 + 网络推理。
 *   PLAYWRIGHT_MODULE=<playwright> node tools/measure-latency.cjs --policy /abs/policy.json --hero wenShaohua --seconds 60 --out /abs/latency.json
 * 输出决策耗时 p50/p99/max，以及渲染帧间隔（确认仍是 60 帧左右）。
 * 剧情翻页、升级面板、商店还没接 2B：非可操控帧由老师脚本在每个渲染帧按键（与 run-student 相同的分工），
 * 只统计大地图上 AI 自己决策的帧。
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const policy = JSON.parse(fs.readFileSync(path.resolve(args.policy), 'utf8'));
const seconds = Number(args.seconds ?? 60);
// --menu-policy 给了就由菜单头处理弹窗和翻页（整套模型驱动），否则由老师脚本按键
const menuPolicy = args['menu-policy'] ? JSON.parse(fs.readFileSync(path.resolve(args['menu-policy']), 'utf8')) : null;
(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
  await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
  await page.evaluate(async ({ policy, hero, menuPolicy }) => {
    const { startRun } = await import('/src/game/run.ts');
    const { HandPolicy } = await import('/src/ai/policy.ts');
    const { HandPilot, aiControl } = await import('/src/ai/pilot.ts');
    startRun(hero).seed = 'latency-probe';
    __t.go('Map');
    __t.wake();
    const pilot = new HandPilot(new HandPolicy(policy));
    const decide = pilot.decide.bind(pilot);
    window.ms = [];
    pilot.decide = (s) => {
      const t = performance.now();
      const a = decide(s);
      ms.push(performance.now() - t);
      return a;
    };
    window.raf = [];
    const bot = __t.autoPlayer(1, 'latency-probe', { expert: true });
    let last = performance.now(), f = 0, keys = {};
    const tick = (t) => {
      raf.push(t - last);
      last = t;
      const sc = __t.scene();
      const p = sc.player;
      Object.values(keys).flat().forEach((k) => (k.isDown = false));
      keys = sc.controls?.keys ?? {};
      const live = sc.scene.key === 'Map' && p && !p.dead && !sc.leaving && !sc.pauses?.size;
      if (!live && !menuPolicy) for (const a of bot(sc, f++)) keys[a]?.forEach((k) => (k.isDown = true));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    let menu = null;
    if (menuPolicy) {
      const { MenuPilot, MenuPolicy } = await import('/src/ai/menu.ts');
      menu = window.menuPilot = new MenuPilot(new MenuPolicy(menuPolicy));
    }
    aiControl.set(pilot, menu);
  }, { policy, hero: args.hero ?? 'wenShaohua', menuPolicy });
  await page.waitForTimeout(seconds * 1000);
  const r = await page.evaluate(() => {
    const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s.length ? +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(3) : null; };
    return { menuPicks: window.menuPilot ? menuPilot.log : null, scene: __t.scene().scene.key, decisions: ms.length, decideMs: { p50: q(ms, 0.5), p99: q(ms, 0.99), max: q(ms, 1) },
      frameMs: { frames: raf.length, p50: q(raf.slice(30), 0.5), p99: q(raf.slice(30), 0.99) } };
  });
  const out = { date: new Date().toISOString(), policy: policy.version, hero: args.hero ?? 'wenShaohua', seconds, headless: true, ...r, errors };
  if (args.out) fs.writeFileSync(path.resolve(args.out), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out));
  await browser.close();
  process.exit(errors.length || r.decisions < seconds * 30 ? 1 : 0);
})();

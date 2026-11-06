/*
 * 正常速度（非 fast，画面照常渲染）下测 AI 每帧决策耗时：特征提取 + 网络推理。
 *   PLAYWRIGHT_MODULE=<playwright> node tools/measure-latency.cjs --policy /abs/policy.json --hero wenShaohua --seconds 60 --out /abs/latency.json
 * 输出决策耗时 p50/p99/max，以及渲染帧间隔（确认仍是 60 帧左右）。
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const policy = JSON.parse(fs.readFileSync(path.resolve(args.policy), 'utf8'));
const seconds = Number(args.seconds ?? 60);
(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
  await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
  await page.evaluate(async ({ policy, hero }) => {
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
    let last = performance.now();
    const tick = (t) => {
      raf.push(t - last);
      last = t;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    aiControl.set(pilot);
  }, { policy, hero: args.hero ?? 'wenShaohua' });
  await page.waitForTimeout(seconds * 1000);
  const r = await page.evaluate(() => {
    const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s.length ? +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(3) : null; };
    return { decisions: ms.length, decideMs: { p50: q(ms, 0.5), p99: q(ms, 0.99), max: q(ms, 1) },
      frameMs: { frames: raf.length, p50: q(raf.slice(30), 0.5), p99: q(raf.slice(30), 0.99) } };
  });
  const out = { date: new Date().toISOString(), policy: policy.version, hero: args.hero ?? 'wenShaohua', seconds, headless: true, ...r, errors };
  if (args.out) fs.writeFileSync(path.resolve(args.out), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out));
  await browser.close();
  process.exit(errors.length || r.decisions < seconds * 30 ? 1 : 0);
})();

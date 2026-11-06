// 暂停菜单 + 操作说明自动淡出：Vite 开着时运行，截图放 docs/verification/pause/。
//   P 暂停（主角不动）→ Esc 继续 → Esc 暂停 → J 继续（不出招）→ 7 秒后底部说明淡掉 → P 暂停后选返回标题。
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const S = 'docs/verification/pause';
require('node:fs').mkdirSync(S, { recursive: true });
(async () => {
  const b = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true, args: ['--mute-audio'] });
  const p = await b.newPage({ viewport: { width: 1500, height: 760 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  const ok = (v, m) => { if (!v) throw Error(m); };
  await p.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
  await p.waitForFunction(() => window.__t?.ready, {}, { timeout: 90000 });
  await p.evaluate(async () => { const r = (await import('/src/game/run.ts')).startRun('yuWuxia', false); r.stage = 0; r.step = 0; __t.go('Map'); __t.wake(); });
  await p.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 90000 });
  await p.waitForTimeout(1000);
  const hintA = await p.evaluate(() => game.scene.getScene('UI').hint.alpha);
  await p.screenshot({ path: `${S}/hint-start.png` });
  await p.keyboard.press('KeyP');
  await p.waitForTimeout(400);
  const st1 = await p.evaluate(() => ({ paused: game.scene.isPaused('Map'), menu: game.scene.getScene('UI').pauseMenu?.isOpen }));
  ok(st1.paused && st1.menu, 'P did not pause ' + JSON.stringify(st1));
  // 停着时地图不走：主角位置不变
  const pos1 = await p.evaluate(() => ({ ...__t.scene().player.pos }));
  await p.keyboard.down('KeyD'); await p.waitForTimeout(500); await p.keyboard.up('KeyD');
  const pos2 = await p.evaluate(() => ({ ...__t.scene().player.pos }));
  ok(pos1.x === pos2.x, 'player moved while paused');
  await p.screenshot({ path: `${S}/pause-menu.png` });
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  ok(!(await p.evaluate(() => game.scene.isPaused('Map'))), 'Esc did not resume');
  // Esc 打开，J 继续，J 不能算出招
  await p.keyboard.press('Escape');
  await p.waitForTimeout(200);
  ok(await p.evaluate(() => game.scene.isPaused('Map')), 'Esc did not pause');
  await p.keyboard.press('KeyJ');
  await p.waitForTimeout(300);
  ok(!(await p.evaluate(() => game.scene.isPaused('Map'))), 'J did not resume');
  await p.waitForTimeout(7500);
  const hintB = await p.evaluate(() => game.scene.getScene('UI').hint.alpha);
  ok(hintA > 0.5 && hintB < 0.05, `hint fade ${hintA} -> ${hintB}`);
  await p.screenshot({ path: `${S}/hint-gone.png` });
  // 返回标题
  await p.keyboard.press('KeyP');
  await p.waitForTimeout(200);
  await p.keyboard.press('KeyD');
  await p.waitForTimeout(100);
  await p.keyboard.press('KeyJ');
  await p.waitForFunction(() => game.scene.isActive('Title'), {}, { timeout: 10000 });
  ok(!(await p.evaluate(() => game.scene.isActive('Map'))), 'map still active');
  console.log(errs.join('\n') || 'pause ok', hintA, hintB);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });

// 暂停菜单 + 操作说明自动淡出 + 金手指：Vite 开着时运行，截图放 docs/verification/pause/。
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
  // 金手指：P → D 选到金手指 → J 弹出输入框；空着确定不行，Esc 取消；再开，写个名字回车
  const before = await p.evaluate(() => { const pl = __t.scene().player; return { dmg: pl.damageScale, hp: pl.hp }; });
  await p.keyboard.press('KeyP');
  await p.waitForTimeout(200);
  await p.keyboard.press('KeyD');
  await p.waitForTimeout(100);
  await p.keyboard.press('KeyJ');
  await p.waitForSelector('[data-cheat-prompt] input');
  ok((await p.textContent('[data-cheat-prompt]')).includes('公司最帅的人是谁'), 'question missing');
  await p.screenshot({ path: `${S}/cheat-ask.png` });
  await p.keyboard.press('Enter');
  ok((await p.textContent('[data-cheat-prompt] [data-msg]')).length > 0, 'empty answer accepted');
  // 在输入框里打 WASD、J 不能动菜单
  await p.keyboard.type('wasdj');
  ok(await p.evaluate(() => game.scene.getScene('UI').pauseMenu.index === 1), 'typing moved the menu');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(100);
  ok(!(await p.$('[data-cheat-prompt]')), 'Esc did not cancel the prompt');
  ok(!(await p.evaluate(() => __t.scene().run.cheat)), 'cancel turned cheat on');
  await p.keyboard.press('KeyJ');
  await p.waitForSelector('[data-cheat-prompt] input');
  await p.keyboard.type('随便谁');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(200);
  ok(!(await p.$('[data-cheat-prompt]')), 'prompt still open');
  await p.screenshot({ path: `${S}/cheat-on.png` });
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  const after = await p.evaluate(() => {
    const m = __t.scene();
    const pl = m.player;
    const hp = pl.hp;
    pl.mercyFrames = 0;
    pl.takeHit({ damage: 9999, hitstun: 10, hitstop: 2, knockback: { x: 0, y: 0 } }, { x: 1, y: 0 });
    return { cheat: m.run.cheat, dmg: pl.damageScale, hp, hpAfterHit: pl.hp, max: pl.maxHp, saved: JSON.parse(localStorage.getItem(Object.keys(localStorage).find((k) => localStorage.getItem(k).includes('"cheat"')) || 'null'))?.cheat };
  });
  ok(after.cheat && Math.abs(after.dmg / before.dmg - 2.5) < 1e-9, 'attack not x2.5 ' + JSON.stringify([before, after]));
  ok(after.hp === after.max && after.hpAfterHit === after.max, 'hp not infinite ' + JSON.stringify(after));
  console.log('cheat', JSON.stringify({ before, after }));
  // 再进菜单把金手指关掉
  await p.waitForTimeout(400);
  await p.keyboard.press('KeyP');
  await p.waitForTimeout(200);
  await p.keyboard.press('KeyD');
  await p.waitForTimeout(100);
  await p.keyboard.press('KeyJ');
  await p.waitForTimeout(100);
  const off = await p.evaluate(() => ({ cheat: __t.scene().run.cheat, god: __t.scene().player.godMode, dmg: __t.scene().player.damageScale }));
  ok(!off.cheat && !off.god && Math.abs(off.dmg - before.dmg) < 1e-9, 'cheat did not turn off ' + JSON.stringify(off));
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  // 返回标题（A 从"继续"往左绕到最后一个）
  await p.keyboard.press('KeyP');
  await p.waitForTimeout(200);
  await p.keyboard.press('KeyA');
  await p.waitForTimeout(100);
  await p.keyboard.press('KeyJ');
  await p.waitForFunction(() => game.scene.isActive('Title'), {}, { timeout: 10000 });
  ok(!(await p.evaluate(() => game.scene.isActive('Map'))), 'map still active');
  console.log(errs.join('\n') || 'pause ok', hintA, hintB);
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });

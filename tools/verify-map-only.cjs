/* Run with Vite running; set PLAYWRIGHT_MODULE if Playwright is installed elsewhere. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
    const checks = await page.evaluate(async () => {
      const ok = (value, message) => { if (!value) throw Error(message); };
      const textOf = (scene) => scene.children.list.filter((child) => child.type === 'Text').map((child) => child.text).join('\n');
      const checks = [];
      for (const key of ['Game', 'Room', 'PangHu']) ok(!game.scene.keys[key], `legacy scene ${key}`);
      ok(!textOf(game.scene.getScene('Title')).includes('练功场'), 'legacy title shortcut');
      checks.push('legacy scenes and training shortcut removed');

      __t.go('Select');
      ok(__t.scene().arts.length === 2, 'both portraits');
      // Simulate map textures already loaded on a return visit to selection.
      for (const id of ['wenShaohua', 'yuWuxia']) {
        const source = game.textures.get(`art:portrait_${id}`).getSourceImage();
        game.textures.addImage(`art:map_${id}_s`, source);
        game.textures.remove(`art:portrait_${id}`);
      }
      __t.go('Select');
      ok(__t.scene().arts.length === 2, 'map art fallback');
      ok(__t.scene().arts.every(({ img }) => img.texture.key.startsWith('art:map_')), 'map art used');
      for (const id of ['wenShaohua', 'yuWuxia']) game.textures.remove(`art:map_${id}_s`);
      __t.go('Select');
      ok(__t.scene().arts.length === 0 && textOf(__t.scene()).includes('扇与暗器'), 'text fallback');
      __t.scene().input.keyboard.emit('keydown', { code: 'KeyD', repeat: false });
      ok(__t.scene().index === 1, 'character selection');
      __t.scene().input.keyboard.emit('keydown', { code: 'KeyJ', repeat: false });
      for (let i = 0; i < 40; i++) __t.step();
      ok(game.scene.isActive('Intro'), 'confirm enters intro without legacy renderer');
      checks.push('portrait, map art and text fallbacks; character selection and confirmation');

      const { startRun } = await import('/src/game/run.ts');
      for (const hero of ['wenShaohua', 'yuWuxia']) {
        startRun(hero, false);
        __t.go('Map');
        __t.wake();
        const deadline = performance.now() + 60000;
        while (!game.scene.isActive('Map')) {
          ok(performance.now() < deadline, 'map assets loaded');
          await new Promise((resolve) => setTimeout(resolve, 16));
        }
        __t.sleep();
        const scene = __t.scene();
        const y = scene.player.pos.y;
        __t.run([[10, ['up']]]);
        ok(scene.player.pos.y < y, `${hero} moves north`);
        ok(!('jump' in scene.controls.keys), 'no jump action');
        ok(scene.controls.keys.dodge.some((key) => key.keyCode === 32), 'space mapped to dodge');
        __t.run([[1, ['dodge']]]);
        ok(scene.player.runner.move?.id === 'dodge', `${hero} dodges`);
        __t.run([[30, []], [1, ['attack']]]);
        ok(scene.player.runner.move?.hit, `${hero} attacks`);
        const actions = __t.autoPlayer()(scene, 0);
        ok(Array.isArray(actions) && !actions.includes('jump'), 'map bot without legacy actions');
      }
      checks.push('both heroes movement, dodge, attack and map auto-player');
      return checks;
    });
    if (errors.length) throw Error(errors.join('\n'));
    console.log(checks);
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });

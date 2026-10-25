/* Run with Vite running; set PLAYWRIGHT_MODULE if Playwright is installed elsewhere. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const press = async (key) => {
    await page.keyboard.press(key);
    // The harness sleeps the render loop; drain Phaser's input queue between presses.
    await page.evaluate(() => __t.step());
  };
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
    await page.evaluate(async () => {
      const { startRun, gainExp } = await import('/src/game/run.ts');
      const run = startRun('wenShaohua', false);
      gainExp(run, 80);
      __t.go('Map');
      __t.wake();
    });
    await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 60000 });
    await page.evaluate(() => {
      __t.sleep();
      window.levelUpFinished = false;
      __t.scene().offerLevelUps(() => { window.levelUpFinished = true; });
      // Ten seconds of game time must not dismiss or auto-select an upgrade.
      for (let i = 0; i < 600; i++) __t.step();
      if (!__t.scene().ui.activeChoice.isOpen || __t.scene().run.pendingLevelUps !== 2) {
        throw Error('Upgrade choice expired without user input');
      }
    });
    // Actual DOM keyboard input: finishing a fight while still tapping attack/dodge.
    for (let i = 0; i < 4; i++) {
      await press('j');
      await press('Space');
    }
    const unchanged = await page.evaluate(() => {
      const scene = __t.scene();
      return scene.run.pendingLevelUps === 2 && scene.run.stats.attack === 0 &&
        scene.ui.activeChoice.isOpen && scene.pauses.has('levelUp') && !window.levelUpFinished;
    });
    if (!unchanged) throw Error('Combat J/Space silently consumed the upgrade choice');
    await press('d');
    await press('Enter');
    const first = await page.evaluate(() => {
      const scene = __t.scene();
      scene.ui.input.keyboard.emit('keydown', { code: 'Enter', repeat: true });
      return scene.run.pendingLevelUps === 1 && scene.run.stats.vitality === 1 &&
        scene.ui.activeChoice.isOpen && scene.pauses.has('levelUp');
    });
    if (!first) {
      const state = await page.evaluate(() => ({
        pending: __t.scene().run.pendingLevelUps,
        stats: __t.scene().run.stats,
        index: __t.scene().ui.activeChoice.index,
        open: __t.scene().ui.activeChoice.isOpen,
        paused: __t.scene().pauses.has('levelUp'),
      }));
      throw Error(`Enter must select exactly one upgrade and keep the next choice open: ${JSON.stringify(state)}`);
    }
    for (let i = 0; i < 4; i++) await press('j');
    // Mouse confirmation uses the real canvas coordinate transform, including Retina zoom.
    const point = await page.evaluate(() => {
      const panel = __t.scene().ui.activeChoice;
      const rect = panel.cards[2].rect;
      const camera = game.scene.getScene('UI').cameras.main;
      const screen = game.canvas.getBoundingClientRect();
      return {
        x: screen.left + (camera.x + (rect.centerX - camera.scrollX) * camera.zoom) * screen.width / game.canvas.width,
        y: screen.top + (camera.y + (rect.centerY - camera.scrollY) * camera.zoom) * screen.height / game.canvas.height,
      };
    });
    await page.mouse.click(point.x, point.y);
    await page.evaluate(() => __t.step());
    const finished = await page.evaluate(() => {
      const scene = __t.scene();
      return scene.run.pendingLevelUps === 0 && scene.run.stats.agility === 1 &&
        !scene.ui.activeChoice.isOpen && !scene.pauses.has('levelUp') && window.levelUpFinished;
    });
    if (!finished) throw Error('Mouse must select the remaining upgrade and resume combat');
    if (errors.length) throw Error(errors.join('\n'));
    console.log('PASS: J/Space cannot consume upgrades; Enter selects once; mouse completes the next choice and resumes combat.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });

const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.BROWSER_CHANNEL || 'chrome',
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  try {
    // A local synthetic fixture checks the audio API; no production voice asset is supplied.
    const wav = Buffer.alloc(44 + 44100 * 2);
    wav.write('RIFF');
    wav.writeUInt32LE(wav.length - 8, 4);
    wav.write('WAVEfmt ', 8);
    wav.writeUInt32LE(16, 16);
    wav.writeUInt16LE(1, 20);
    wav.writeUInt16LE(1, 22);
    wav.writeUInt32LE(44100, 24);
    wav.writeUInt32LE(88200, 28);
    wav.writeUInt16LE(2, 32);
    wav.writeUInt16LE(16, 34);
    wav.write('data', 36);
    wav.writeUInt32LE(wav.length - 44, 40);
    await page.route('**/voice/manifest.json', (route) => route.fulfill({ json: { lines: { redBear_rescue_1: 'fixture.wav' } } }));
    await page.route('**/voice/fixture.wav', (route) => route.fulfill({ contentType: 'audio/wav', body: wav }));
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
    await page.evaluate(async () => {
      const r = await import('/src/game/run.ts');
      r.startRun('wenShaohua');
      __t.go('Map');
      __t.wake();
    });
    await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 60000 });
    await page.evaluate(() => {
      __t.sleep();
      __t.fast = true;
    });
    const checks = await page.evaluate(async () => {
      const { startRun, setRun, getRun } = await import('/src/game/run.ts');
      const { saveRun, loadRun } = await import('/src/game/save.ts');
      const { stageFor } = await import('/src/game/stages.ts');
      const { advanceRun } = await import('/src/game/flow.ts');
      const { VoicePlayer } = await import('/src/audio/voice.ts');
      const { inArea } = await import('/src/map/combat/ground.ts');
      const ok = (v, msg) => {
        if (!v) throw Error(msg);
      };
      const out = [];
      localStorage.setItem('redbear.run', JSON.stringify({ version: 1, run: { step: 0 } }));
      ok(!loadRun(), 'legacy save');
      localStorage.setItem('redbear.run', JSON.stringify({ version: 2, run: { stage: 0, step: 0, hero: 'wenShaohua', hp: 100 } }));
      ok(!loadRun(), 'malformed save');
      out.push('old and malformed saves ignored');
      for (let stage = 0; stage < 3; stage++) {
        const r = startRun('wenShaohua');
        r.stage = stage;
        r.step = 3;
        saveRun(r);
        setRun(loadRun());
        __t.go('Map');
        const m = __t.scene();
        const at = stageFor(r).map.respawn[3];
        ok(m.run.stage === stage && Math.hypot(m.player.pos.x - at.x, m.player.pos.y - at.y) < 5, 'checkpoint');
      }
      out.push('all three checkpoint resumes');
      const r = startRun('wenShaohua');
      r.step = 5;
      r.coins = 77;
      r.rescueUsed = true;
      r.paidOff = true;
      __t.go('Letter');
      advanceRun(__t.scene());
      __t.drive(50, () => []);
      ok(getRun().stage === 1 && getRun().step === 0 && !getRun().rescueUsed && !getRun().paidOff && getRun().coins === 77, 'cross stage');
      out.push('stage boundary retains growth and resets rescue');
      for (const bribe of [true, false]) {
        const r = startRun('wenShaohua');
        r.step = 4;
        r.coins = 100;
        __t.go('Map');
        const m = __t.scene();
        if (bribe) m.controller.pay(100);
        else m.controller.onBossDefeated();
        __t.drive(1800, () => []);
        ok(__t.scene().scene.key === 'Letter', 'branch scene');
        ok(__t.scene().letter.includes(bribe ? '钱能买路' : '救下'), 'branch prose');
      }
      out.push('rescue and bribe letters');
      const b = startRun('wenShaohua', false);
      b.stage = 1;
      b.step = 4;
      __t.go('Map');
      let m = __t.scene();
      m.player.pos.x = m.boss.pos.x;
      m.player.pos.y = m.boss.pos.y + 300;
      __t.drive(800, () => []);
      ok(m.walk.lock, 'ring');
      m.boss.takeHit({ damage: 341, hitstop: 0 });
      __t.drive(300, () => []);
      ok(m.enemies.length === 3, 'adds');
      m.boss.takeHit({ damage: 1, hitstop: 0 });
      ok(m.enemies.length === 3, 'adds repeat');
      out.push('duel arena and exactly three reinforcements');
      const c = startRun('wenShaohua');
      c.stage = 2;
      c.step = 2;
      c.coins = 600;
      __t.go('Shop');
      __t.scene().buy(3);
      ok(c.heartCharm && c.charmBought, 'purchase');
      ok(__t.scene().options()[3].disabled, 'buy twice');
      c.step = 4;
      __t.go('Map');
      m = __t.scene();
      m.player.takeHit({ damage: 9999, hitstop: 0, hitstun: 0, knockback: { x: 0, y: 0 } }, { x: 0, y: 1 });
      ok(m.player.hp === 1 && !c.heartCharm && !c.rescueUsed, 'lethal protection');
      out.push('one charm per run, one HP, rescue remains available');
      m.player.hp = 100;
      m.boss.startFight();
      m.boss.takeHit({ damage: 9999, hitstop: 0 });
      __t.drive(260, () => []);
      ok(m.boss.phase === 2 && m.boss.stage === 'fight', 'transformation');
      out.push('phase transition completed, lethal damage cannot skip it');
      m.spawnEnemy({ enemy: 'bannerman', side: 'right' }, { x: m.player.pos.x + 100, y: m.player.pos.y });
      m.spawnEnemy({ enemy: 'swordsman', side: 'right' }, { x: m.player.pos.x + 120, y: m.player.pos.y });
      __t.step();
      ok(m.enemies[1].enemy.attackSpeed === 1.2, 'haste');
      m.enemies[0].enemy.hp = 0;
      __t.step();
      ok(m.enemies[1].enemy.attackSpeed === 1, 'haste removal');
      m.clearBossAdds();
      out.push('flag haste applies and disappears');
      ok(!inArea({ x: 0, y: 0 }, { x: 1, y: 0 }, { from: 120, reach: 300, arc: 360 }, { x: 50, y: 0 }, 18), 'ring safe center');
      out.push('annular attack has safe inner region');
      const v = new VoicePlayer(m);
      const playback = v.play('redBear_rescue_1', 'fixture');
      const sound = m.sound.get('voice:redBear_rescue_1');
      ok(sound, 'audio exists');
      sfx.toggleMute();
      ok(
        sound.currentConfig.volume === 0,
        'voice mute ' +
          JSON.stringify({
            volume: sound.volume,
            muted: sfx.muted,
            count: sfx.listeners.size,
            kind: sound.constructor.name,
            manager: m.sound.constructor.name,
            setVolume: typeof sound.setVolume,
            sounds: m.sound.sounds.map((s) => ({ key: s.key, volume: s.volume, pendingRemove: s.pendingRemove })),
          }),
      );
      sfx.toggleMute();
      sfx.setVolume(0.4);
      ok(Math.abs(sound.currentConfig.volume - 0.4) < 0.01, 'volume sync');
      ok(sfx.duckers > 0, 'voice ducks effects');
      v.stop();
      await playback;
      ok(sfx.duckers === 0, 'cancel restores effects');
      out.push('loaded audio volume/mute/cancel and duck restoration');
      m.pauses.add('capture');
      m.player.pos.x = m.boss.pos.x - 100;
      m.player.pos.y = m.boss.pos.y + 90;
      m.boss.hp = 350;
      __t.fast = false;
      for (let i = 0; i < 90; i++) __t.step();
      return out;
    });
    fs.mkdirSync('docs/verification', { recursive: true });
    await page.screenshot({ path: 'docs/verification/peak-awake.png' });
    await page.evaluate(() => {
      const m = __t.scene();
      m.pauses.delete('capture');
      __t.fast = true;
      m.boss.takeHit({ damage: 9999, hitstop: 0 });
      __t.drive(2500, () => []);
    });
    await page.evaluate(async () => {
      const { loadRun } = await import('/src/game/save.ts');
      const s = __t.scene();
      if (s.scene.key !== 'Ending' || !s.ready || loadRun()) throw Error('escape, credits or save cleanup');
      __t.fast = false;
      for (let i = 0; i < 60; i++) __t.step();
    });
    await page.screenshot({ path: 'docs/verification/ending.png' });
    await page.evaluate(() => {
      __t.scene().input.keyboard.emit('keydown', { code: 'Space' });
      __t.step();
      if (__t.scene().scene.key !== 'Title') throw Error('ending exit');
    });
    checks.push('brothers escape, ending credits, save cleared and return to title');
    // Intro across both heroes, waiting for asynchronous map textures after skip.
    for (const hero of ['wenShaohua', 'yuWuxia']) {
      await page.evaluate(async (hero) => {
        const { startRun } = await import('/src/game/run.ts');
        const { clearSave } = await import('/src/game/save.ts');
        startRun(hero);
        clearSave();
        __t.go('Intro');
        if (!__t.scene().caption.text.includes('红熊')) throw Error('intro');
        __t.scene().input.keyboard.emit('keydown', { code: 'Escape' });
        __t.step();
        __t.wake();
      }, hero);
      await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 60000 });
      await page.evaluate(() => __t.sleep());
      if (!(await page.evaluate(async (hero) => (await import('/src/game/save.ts')).loadRun()?.hero === hero, hero)))
        throw Error('skip save');
    }
    checks.push('both heroes intro and skip save');
    if (errors.length) throw Error(errors.join('\n'));
    fs.writeFileSync('docs/verification/three-stages-checks.json', JSON.stringify({ checks, errors }, null, 2) + '\n');
    console.log(checks);
  } finally {
    await browser.close();
  }
})();

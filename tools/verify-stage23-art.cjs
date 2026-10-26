const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true, args: ['--mute-audio'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  const out = 'docs/verification/stage23-art';
  fs.mkdirSync(out, { recursive: true });
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 90000 });
    await page.evaluate(async () => {
      (await import('/src/game/run.ts')).startRun('wenShaohua');
      __t.go('Map'); __t.wake();
    });
    await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 90000 });
    const checks = await page.evaluate(async () => {
      __t.sleep(); __t.fast = true;
      const { MapSprite } = await import('/src/map/MapSprite.ts');
      const scene = __t.scene();
      const checks = [];
      const defs = {
        baoJinliang: ['ready', 'thrust', 'sweep', 'vault', 'turn', 'walk1', 'walk2'],
        zhangHuatian: ['ready', 'lash', 'arc', 'walk1', 'walk2'],
        zhangHuatianAwake: ['ready', 'lash', 'whirl', 'palm', 'walk1', 'walk2'],
        spearman: ['ready', 'strike'], archer: ['ready', 'throw'], drillmaster: ['raise', 'smash'],
        swordsman: ['ready', 'strike'], bannerman: ['ready'], captain: ['raise', 'smash'],
      };
      const dirs = { s:[0,1], se:[1,1], e:[1,0], ne:[1,-1], n:[0,-1], nw:[-1,-1], w:[-1,0], sw:[-1,1] };
      for (const [name, poses] of Object.entries(defs)) {
        const sprite = new MapSprite(scene, name, 'portrait_baoJinliang', 200, 70);
        for (const [dir,[x,y]] of Object.entries(dirs)) for (const pose of ['idle', ...poses]) {
          sprite.update({ x:100, y:200, facing:{x,y}, moving:false, pose }, 16);
          const own = ({nw:'ne',w:'e',sw:'se'})[dir] || dir;
          const expected = `art:map_${name}_${pose === 'idle' ? '' : pose + '_'}${own}`;
          if (sprite.img.texture.key !== expected) throw Error(`${name} ${dir} ${pose}: ${sprite.img.texture.key}`);
          if ((sprite.img.scaleX < 0) !== (x < 0)) throw Error('mirror');
          if (!Number.isFinite(sprite.img.originY) || !Number.isFinite(sprite.img.scaleY)) throw Error('anchor');
          checks.push(`${name}/${dir}/${pose}`);
        }
        sprite.destroy();
      }
      return checks;
    });
    for (const stage of [1,2]) {
      await page.evaluate(async stage => {
        const r = (await import('/src/game/run.ts')).startRun('wenShaohua');
        r.stage = stage; r.step = 4;
        __t.go('Title'); __t.go('Map'); __t.fast = false;
        const m = __t.scene();
        if (m.run.stage !== stage) throw Error('wrong stage');
        m.player.pos.x = m.boss.pos.x - 190; m.player.pos.y = m.boss.pos.y + 180;
        __t.drive(600, () => []);
        m.pauses.add('capture');
        __t.drive(50, () => []);
        const slots = new Set(m.children.list.map(x => x.texture?.key));
        for (const d of m.stage.map.decor) if (!slots.has('art:' + d.slot)) throw Error('decor not placed ' + d.slot);
      }, stage);
      await page.screenshot({ path: `${out}/${stage === 1 ? 'waist-duel' : 'peak-palace'}.png` });
      for (const area of ['entrance', 'deep', 'teahouse', 'campFront']) {
        await page.evaluate(area => {
          const m = __t.scene(), a = m.stage.map.areas.find(a => a.id === area);
          m.player.pos.x = a.center.x; m.player.pos.y = a.center.y + 130;
          __t.drive(80, () => []);
        }, area);
        await page.screenshot({ path: `${out}/${stage}-${area}.png` });
      }
      const effects = await page.evaluate(stage => {
        const m = __t.scene(), found = [];
        m.controller.events.on('overlay', fx => { if (fx.box) found.push(fx.box.list[0].texture.key); });
        m.boss.startFight();
        for (const id of stage === 1 ? ['thrust'] : ['lash','arc','snare','whirl']) {
          m.boss.runner.stop(); m.controller.tick();
          m.boss.startMove(m.boss.def.moves[id]);
          for (let i=0;i<m.boss.def.moves[id].startup+2;i++) m.controller.tick();
        }
        const needed = stage === 1 ? ['fx_spear_thrust'] : ['fx_whip_lash','fx_whip_ring'];
        for (const key of needed) if (!found.includes('art:' + key)) throw Error('missing effect ' + key);
        return found;
      }, stage);
      checks.push(...effects);
    }
    if (errors.length) throw Error(errors.join('\n'));
    fs.writeFileSync(`${out}/checks.json`, JSON.stringify({ checks, errors }, null, 2) + '\n');
    console.log(`${checks.length} animation/effect checks; both maps and four areas each captured; no browser/resource errors`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

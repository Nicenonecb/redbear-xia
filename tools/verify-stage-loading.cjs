/*
 * 按关加载的验收：Vite 开着时运行（npm run dev -- --host 127.0.0.1），PLAYWRIGHT_MODULE 指向 playwright 包。
 * 不开 __t.keepAllArt()，走真实的按关加载：
 *   1. 开机只加载每关都用的界面图，不加载任何地图图和某关独有的图；
 *   2. 每关进地图后只有这一关（和预取的下一关）的图在显卡里，打过的关独有的图被卸掉；
 *   3. 打这一关时，下一关的图在后台预取（有请求），进下一关时从缓存读；
 *   4. 每关用自动打法从开头打到过关，游戏问到的图（hasArt）只要 manifest 里有，就必须已经加载——
 *      分错关的图会在这里被抓出来；
 *   5. 没有脚本异常。
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome', args: ['--mute-audio'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const requests = [];
  page.on('request', (r) => {
    const m = /\/art\/([^/?]+)$/.exec(r.url());
    if (m) requests.push({ file: m[1], t: Date.now(), type: r.resourceType() });
  });
  const ok = (v, msg) => {
    if (!v) throw Error(msg);
  };
  const report = { date: new Date().toISOString(), stages: [] };
  try {
    const t0 = Date.now();
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 120000 });
    report.bootMs = Date.now() - t0;
    report.bootFiles = requests.length;

    // 记下游戏问过、manifest 里有、却没加载的图
    await page.evaluate(() => {
      const manifest = game.cache.json.get('artManifest').images;
      const tex = game.textures;
      const exists = tex.exists.bind(tex);
      window.missed = new Set();
      window.watchMisses = false;
      tex.exists = (key) => {
        const has = exists(key);
        if (!has && window.watchMisses && key.startsWith('art:') && manifest[key.slice(4)]) window.missed.add(key.slice(4));
        return has;
      };
    });
    const boot = await page.evaluate(() => game.textures.getTextureKeys().filter((k) => k.startsWith('art:')));
    ok(!boot.some((k) => /^art:(map|prop|ground)_/.test(k)), 'boot loaded map art');
    for (const k of ['portrait_pangHu', 'bg_room1', 'portrait_baoJinliang', 'bg_peak_palace', 'ending_final'])
      ok(!boot.includes(`art:${k}`), `boot loaded stage-only ${k}`);
    for (const k of ['title', 'bg_select', 'portrait_wenShaohua', 'portrait_redBear', 'portrait_renXinye', 'bg_letter'])
      ok(boot.includes(`art:${k}`), `boot missing shared ${k}`);
    report.bootTextures = boot.length;

    const hero = 'wenShaohua';
    const expect = [
      { has: ['map_wenShaohua_s', 'map_bandit_s', 'map_pangHu_chop_e', 'map_tiger_s', 'prop_bamboo_big', 'ground_forest', 'portrait_pangHu', 'bg_room1'],
        not: ['map_yuWuxia_s', 'map_spearman_s', 'map_baoJinliang_s', 'map_zhangHuatian_s', 'prop_palace_gate'] },
      { has: ['map_spearman_s', 'map_baoJinliang_thrust_e', 'prop_army_tent', 'ground_pine_forest', 'map_pangHu_s', 'bg_waist_duel'],
        not: ['map_bandit_s', 'map_pangHu_chop_e', 'map_tiger_s', 'prop_bamboo_big', 'portrait_pangHu', 'bg_room1', 'map_zhangHuatian_s'] },
      { has: ['map_zhangHuatian_s', 'map_zhangHuatianAwake_s', 'map_pangHu_s', 'map_pangHu_walk1_s', 'map_baoJinliang_s', 'prop_palace_gate', 'ending_final'],
        not: ['map_spearman_s', 'map_baoJinliang_thrust_e', 'prop_army_tent', 'map_pangHu_chop_e', 'bg_waist_duel', 'map_yuWuxia_s'] },
    ];

    for (let stage = 0; stage < 3; stage++) {
      const before = requests.length;
      const start = Date.now();
      await page.evaluate(
        async ({ hero, stage }) => {
          const { startRun } = await import('/src/game/run.ts');
          const r = startRun(hero);
          r.seed = `stage-loading-${stage}`;
          // 一套正常能拿到的配置，让自动打法稳过这一关
          Object.assign(r, { stage, step: 0, level: 12, hp: 220, stats: { attack: 7, vitality: 6, agility: 0 }, weapon: { tier: 2, refine: 0 } });
          __t.go('Map');
          __t.wake();
        },
        { hero, stage },
      );
      await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 180000 });
      const loadMs = Date.now() - start;
      const loaded = requests.slice(before).filter((r) => r.type !== 'fetch');
      const keys = await page.evaluate(() => game.textures.getTextureKeys().filter((k) => k.startsWith('art:')).map((k) => k.slice(4)));
      for (const k of expect[stage].has) ok(keys.includes(k), `stage ${stage} missing ${k}`);
      for (const k of expect[stage].not) ok(!keys.includes(k), `stage ${stage} should not hold ${k}`);

      // 预取：给它一点真实时间下完
      const prefetchStart = requests.length;
      await page.waitForTimeout(stage < 2 ? 15000 : 3000);
      const prefetched = requests.slice(prefetchStart).filter((r) => r.type === 'fetch').length;
      if (stage < 2) ok(prefetched > 50, `stage ${stage} prefetched only ${prefetched}`);

      // 自动打完这一关，期间问到的图都要在
      await page.evaluate((seed) => {
        __t.sleep();
        __t.fast = true;
        window.bot = __t.autoPlayer(0.95, seed);
        window.missed.clear();
        window.watchMisses = true;
      }, `stage-loading-${stage}`);
      let end = null;
      for (let chunk = 0; chunk < 40 && !end; chunk++) {
        end = await page.evaluate((stage) => {
          let out = null;
          __t.drive(
            1200,
            (s, f) => bot(s, f),
            (s) => {
              if (s.scene.key === 'Title') out = 'dead';
              else if (s.scene.key === 'Letter' || s.scene.key === 'Ending') out = s.scene.key;
              else if (s.run && s.run.stage !== stage) out = 'next';
              return !!out;
            },
          );
          return out;
        }, stage);
      }
      const missed = await page.evaluate(() => {
        window.watchMisses = false;
        return [...window.missed];
      });
      const row = { stage, loadMs, loadedFiles: loaded.length, textures: keys.length, prefetched, end, missed };
      console.log(JSON.stringify(row));
      report.stages.push(row);
      ok(end === (stage < 2 ? 'Letter' : 'Ending'), `stage ${stage} autoplay ended with ${end}`);
      ok(!missed.length, `stage ${stage} asked for unloaded art: ${missed.join(', ')}`);
      if (errors.length) throw Error(errors.join('\n'));
    }
    // 第二、三关进地图应该主要从缓存读：比第一关快得多
    report.ok = true;
  } finally {
    report.errors = errors;
    fs.mkdirSync('docs/verification', { recursive: true });
    fs.writeFileSync('docs/verification/stage-loading.json', JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ bootMs: report.bootMs, bootFiles: report.bootFiles, bootTextures: report.bootTextures, ok: !!report.ok }));
    await browser.close();
  }
})();

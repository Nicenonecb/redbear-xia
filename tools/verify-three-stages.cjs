/* Run with Vite running. npm install --no-save playwright, or set PLAYWRIGHT_MODULE to its package path. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const bossOnly = process.env.BOSS_ONLY === '1';
(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const results = [];
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
    for (const skill of [0.75, 0.5])
      for (const hero of ['wenShaohua', 'yuWuxia'])
        for (let trial = 0; trial < 10; trial++) {
          const seed = `acceptance-${hero}-${trial}`;
          await page.evaluate(
            async ({ hero, skill, seed, bossOnly }) => {
              const { startRun } = await import('/src/game/run.ts');
              const r = startRun(hero);
              r.seed = seed;
              if (bossOnly) {
                // A fixed, normally obtainable loadout isolates the final boss from
                // different shopping/level-up choices in the full campaign sample.
                Object.assign(r, {
                  stage: 2,
                  step: 4,
                  level: 12,
                  hp: 200,
                  stats: { attack: 6, vitality: 5, agility: 0 },
                  weapon: { tier: 2, refine: 0 },
                });
              }
              __t.go('Map');
              __t.wake();
              window.bot = __t.autoPlayer(skill, seed);
              window.result = {
                skill,
                hero,
                seed,
                cleared: false,
                stage: 0,
                step: 0,
                phase: 1,
                frames: 0,
                checkpoints: [],
                stalled: false,
              };
            },
            { hero, skill, seed, bossOnly },
          );
          await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 60000 });
          await page.evaluate(() => {
            __t.sleep();
            __t.fast = true;
          });
          let last;
          for (let chunk = 0; chunk < 32; chunk++) {
            last = await page.evaluate(() => {
              __t.drive(
                1200,
                (s, f) => {
                  if (s.scene.key === 'Ending') result.cleared = true;
                  if (s.run) {
                    result.stage = s.run.stage;
                    result.step = s.run.step;
                    result.phase = s.boss?.phase ?? 1;
                    const key = `${s.run.stage}:${s.run.step}`;
                    if (!result.checkpoints.some((c) => c.key === key))
                      result.checkpoints.push({ key, level: s.run.level, hp: s.player?.hp ?? s.run.hp, coins: s.run.coins });
                  }
                  result.frames++;
                  return bot(s, f);
                },
                (s) => s.scene.key === 'Title',
              );
              return { scene: __t.scene().scene.key, ...result };
            });
            if (last.scene === 'Title') break;
          }
          last.stalled = last.scene !== 'Title';
          results.push(last);
          console.log(JSON.stringify(last));
          if (errors.length) throw Error(errors.join('\n'));
        }
    const report = {
      date: new Date().toISOString(),
      mode: bossOnly ? 'final-boss-fixed-loadout' : 'full-campaign',
      results,
      errors,
      summary: [0.75, 0.5].map((skill) => {
        const runs = results.filter((r) => r.skill === skill);
        return {
          skill,
          total: runs.length,
          cleared: runs.filter((r) => r.cleared).length,
          reachedWaistBoss: runs.filter((r) => r.stage > 1 || (r.stage === 1 && r.step >= 4)).length,
          stalled: runs.filter((r) => r.stalled).length,
          defeatedInFinalPhase: runs.filter((r) => !r.cleared && r.stage === 2 && r.phase === 2).length,
        };
      }),
    };
    fs.mkdirSync('docs/verification', { recursive: true });
    fs.writeFileSync(
      `docs/verification/${bossOnly ? 'final-boss-runs' : 'three-stages-runs'}.json`,
      JSON.stringify(report, null, 2) + '\n',
    );
    console.log('SUMMARY', JSON.stringify(report.summary));
    if (
      report.summary[0].cleared < 14 ||
      report.summary.some((s) => s.stalled) ||
      report.summary[1].reachedWaistBoss === 0 ||
      (bossOnly && report.summary[1].defeatedInFinalPhase <= 10)
    )
      process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();

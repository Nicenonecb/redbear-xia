/*
 * 导出"老师"（满熟练度自动打法 mapAutoPlayer）的逐帧示范数据，供训练 AI 操控策略。
 * 只记录，不改老师行为；特征由游戏内 src/ai/features.ts 计算，与上线推理同一份代码。
 *
 * 先启动 Vite（npm run dev），再：
 *   PLAYWRIGHT_MODULE=<playwright 包路径> node tools/export-teacher-data.cjs \
 *     --out /abs/dir --split train --prefix xia-train --runs 10 [--skill 1] [--walk-stride 1] [--start 0]
 *
 * 每个 seed（= `${prefix}-${hero}-${i}`，两位主角各 runs 局）产出：
 *   <seed>.x.f32      特征，float32，行优先 [rows × FEATURE_DIM]
 *   <seed>.y.u8       老师按键，uint8，[rows × 8]，顺序同 AI_ACTIONS
 *   <seed>.f.i32      每行对应的全局帧号
 *   <seed>.menu.jsonl 老师在升级面板 / 商店里的每次选择（给 2B 菜单决策用）
 *   <seed>.meta.json  通关与否、关卡进度、行数、卡死标记
 * 以及 <out>/<split>/manifest-<prefix>-<首>-<末>.json（特征版本、特征名、游戏 git 提交、每个文件的 sha256）。
 * 同一局的所有帧只进同一个 split；split 之间用不同 prefix 区分。
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execSync } = require('node:child_process');

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
for (const k of ['out', 'split', 'prefix', 'runs']) if (!args[k]) throw Error(`missing --${k}`);
const runs = Number(args.runs);
const start = Number(args.start ?? 0);
const skill = Number(args.skill ?? 1);
const walkStride = Number(args['walk-stride'] ?? 1);
// 默认用 expert 老师（见 src/debug/mapAutoPlayer.ts）；--expert 0 退回普通打法
const expert = (args.expert ?? '1') !== '0';
// --menu-only 1：只记老师的菜单选择（含菜单特征），不导出逐帧数据
const menuOnly = args['menu-only'] === '1';
const dir = path.join(path.resolve(args.out), args.split);
fs.mkdirSync(dir, { recursive: true });
const sha = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const gitRev = (() => {
  try {
    const rev = execSync('git rev-parse HEAD', { cwd: path.resolve(__dirname, '..') }).toString().trim();
    const dirty = execSync('git status --porcelain -- src tools', { cwd: path.resolve(__dirname, '..') }).toString().trim() !== '';
    return { rev, srcDirty: dirty };
  } catch {
    return null;
  }
})();

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const files = {};
  const summary = [];
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
    await page.evaluate(() => __t.keepAllArt());
    const spec = await page.evaluate(async () => {
      const f = await import('/src/ai/features.ts');
      return { version: f.FEATURE_VERSION, dim: f.FEATURE_DIM, names: f.FEATURE_NAMES, actions: f.AI_ACTIONS };
    });
    for (const hero of ['wenShaohua', 'yuWuxia'])
      for (let trial = start; trial < start + runs; trial++) {
        const seed = `${args.prefix}-${hero}-${trial}`;
        const t0 = Date.now();
        await page.evaluate(
          async ({ hero, skill, seed, expert }) => {
            const { startRun, getRun, runStats } = await import('/src/game/run.ts');
            window.__getRun = getRun;
            window.__runStats = runStats;
            window.__feat = await import('/src/ai/features.ts');
            window.__menu = await import('/src/ai/menu.ts');
            const r = startRun(hero);
            r.seed = seed;
            __t.go('Map');
            __t.wake();
            window.bot = __t.autoPlayer(skill, seed, { expert });
            window.result = { seed, hero, cleared: false, stage: 0, step: 0, frames: 0, rows: 0 };
            window.globalFrame = 0;
            window.menu = [];
          },
          { hero, skill, seed, expert },
        );
        await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 60000 });
        await page.evaluate(() => {
          __t.sleep();
          __t.fast = true;
        });
        const chunks = { x: [], y: [], f: [] };
        let last;
        for (let chunk = 0; chunk < 32; chunk++) {
          last = await page.evaluate(
            ({ walkStride, menuOnly }) => {
              const { extractFeatures, actionsToLabel, FEATURE_DIM } = window.__feat;
              const xs = [],
                ys = [],
                fs = [];
              // 包一层面板的 pick：老师每次菜单选择连同当时的选项和局面一起记下
              const watch = (panel, kind, s) => {
                if (!panel || panel.__aiWatched) return;
                const pick = panel.pick.bind(panel);
                panel.pick = (i) => {
                  const r = window.__getRun();
                  const M = window.__menu;
                  const mkind = M.menuKind(panel.config.title, kind === 'shop');
                  // 与上线（MenuPilot.tickPanel）同样的取值：大地图上用主角当前气血，商店里用 run.hp
                  const hp = kind === 'shop' ? r.hp : s.player.hp;
                  const maxHp = r ? window.__runStats(r).maxHp : 0;
                  const mx = r ? Array.from(M.menuFeatures(mkind, panel.config.options, r, hp, maxHp)) : null;
                  menu.push({
                    menuKind: mkind,
                    hp,
                    maxHp,
                    x: mx,
                    frame: globalFrame,
                    kind,
                    title: panel.config.title,
                    options: panel.config.options.map((o) => ({ label: o.label, detail: o.detail ?? '', disabled: !!o.disabled })),
                    pick: i,
                    run: r && {
                      stage: r.stage, step: r.step, hp: r.hp, level: r.level, coins: r.coins,
                      stats: r.stats, weapon: r.weapon, pendingLevelUps: r.pendingLevelUps,
                    },
                  });
                  return pick(i);
                };
                panel.__aiWatched = true;
              };
              __t.drive(
                1200,
                (s, f) => {
                  if (s.scene.key === 'Ending') result.cleared = true;
                  if (s.run) {
                    result.stage = s.run.stage;
                    result.step = s.run.step;
                  }
                  if (s.scene.key === 'Shop') watch(s.panel, 'shop', s);
                  if (s.ui?.activeChoice) watch(s.ui.activeChoice, 'choice', s);
                  const held = bot(s, f);
                  // 只记录上线时策略会被调用的帧：大地图、未暂停、未离场、面板未打开
                  const live = s.scene.key === 'Map' && !s.pauses?.size && !s.leaving && !s.ui?.activeChoice?.isOpen;
                  if (live && !menuOnly) {
                    const x = extractFeatures(s, f);
                    const combat = s.enemies?.length || s.rings?.length || s.projectiles?.length || s.controller?.hitTargets?.().length;
                    if (x && (combat || globalFrame % walkStride === 0)) {
                      xs.push(x);
                      ys.push(actionsToLabel(held));
                      fs.push(globalFrame);
                    }
                  }
                  result.frames++;
                  globalFrame++;
                  return held;
                },
                (s) => s.scene.key === 'Title',
              );
              const X = new Float32Array(xs.length * FEATURE_DIM);
              xs.forEach((x, k) => X.set(x, k * FEATURE_DIM));
              const b64 = (buf) => {
                const u = new Uint8Array(buf);
                let s = '';
                for (let k = 0; k < u.length; k += 0x8000) s += String.fromCharCode.apply(null, u.subarray(k, k + 0x8000));
                return btoa(s);
              };
              result.rows += xs.length;
              return {
                scene: __t.scene().scene.key,
                x: b64(X.buffer),
                y: b64(Uint8Array.from(ys.flat()).buffer),
                f: b64(Int32Array.from(fs).buffer),
                ...result,
              };
            },
            { walkStride, menuOnly },
          );
          chunks.x.push(Buffer.from(last.x, 'base64'));
          chunks.y.push(Buffer.from(last.y, 'base64'));
          chunks.f.push(Buffer.from(last.f, 'base64'));
          if (last.scene === 'Title') break;
        }
        const menu = await page.evaluate(() => menu);
        const meta = {
          seed, hero, skill, cleared: last.cleared, stage: last.stage, step: last.step,
          frames: last.frames, rows: last.rows, stalled: last.scene !== 'Title', wallMs: Date.now() - t0,
          menuDecisions: menu.length,
        };
        const out = {
          [`${seed}.x.f32`]: Buffer.concat(chunks.x),
          [`${seed}.y.u8`]: Buffer.concat(chunks.y),
          [`${seed}.f.i32`]: Buffer.concat(chunks.f),
          [`${seed}.menu.jsonl`]: Buffer.from(menu.map((m) => JSON.stringify(m)).join('\n') + (menu.length ? '\n' : '')),
          [`${seed}.meta.json`]: Buffer.from(JSON.stringify(meta, null, 2) + '\n'),
        };
        if (out[`${seed}.x.f32`].length !== meta.rows * spec.dim * 4 || out[`${seed}.y.u8`].length !== meta.rows * 8)
          throw Error(`${seed}: row/byte mismatch`);
        for (const [name, buf] of Object.entries(out)) {
          const file = path.join(dir, name);
          fs.writeFileSync(file, buf);
          files[name] = sha(file);
        }
        summary.push(meta);
        console.log(JSON.stringify(meta));
        if (errors.length) throw Error(errors.join('\n'));
      }
  } finally {
    const spec = await page
      .evaluate(async () => {
        const f = await import('/src/ai/features.ts');
        return { version: f.FEATURE_VERSION, dim: f.FEATURE_DIM, names: f.FEATURE_NAMES, actions: f.AI_ACTIONS };
      })
      .catch(() => null);
    const menuSpec = await page
      .evaluate(async () => {
        const m = await import('/src/ai/menu.ts');
        return { version: m.MENU_FEATURE_VERSION, dim: m.MENU_FEATURE_DIM, names: m.MENU_FEATURE_NAMES, slots: m.MENU_SLOTS };
      })
      .catch(() => null);
    const manifest = {
      schema: 'xia-teacher-export-v1',
      date: new Date().toISOString(),
      split: args.split,
      prefix: args.prefix,
      teacher: { player: 'mapAutoPlayer', skill, expert },
      walkStride,
      game: gitRev,
      features: spec,
      menuFeatures: menuSpec,
      menuOnly,
      runs: summary,
      cleared: summary.filter((r) => r.cleared).length,
      stalled: summary.filter((r) => r.stalled).length,
      errors,
      files,
    };
    const manifestFile = path.join(dir, `manifest-${args.prefix}-${start}-${start + runs - 1}.json`);
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
    console.log('MANIFEST', manifestFile, `cleared ${manifest.cleared}/${summary.length}`);
    await browser.close();
    if (errors.length || manifest.stalled) process.exitCode = 1;
  }
})();

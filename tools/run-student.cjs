/*
 * 让"学生"（训练出的小策略网络，src/ai/policy.ts 格式）在 fast 模式下打整局。
 *
 *   --mode eval    评测：学生操控主角，逐局记录通关、死亡位置、受击、决策计数
 *   --mode dagger  DAgger 数据：学生（或按 --beta 混入老师）操控，同时在学生实际到达的每一帧
 *                  记下老师会按的键作为标签；输出格式与 export-teacher-data.cjs 相同，另加执行来源
 *
 * 先启动 Vite（npm run dev），再：
 *   PLAYWRIGHT_MODULE=<playwright> node tools/run-student.cjs --mode eval --policy /abs/policy.json \
 *     --out /abs/dir --split dev --prefix xia-dev --runs 20 [--start 0] [--heroes wenShaohua]
 *   PLAYWRIGHT_MODULE=<playwright> node tools/run-student.cjs --mode dagger --policy /abs/policy.json \
 *     --out /abs/dir --split dagger1 --prefix xia-train-d1 --runs 50 [--beta 0]
 *
 * 大地图上可操控的每一帧都走正式的 AI 路径（aiControl → MapScene.updatePiloted），与上线一致。
 * 默认菜单（剧情翻页、升级面板、商店）由老师脚本操作，逐局计数为 scriptMenuFrames，报告写明"菜单由脚本选择"；
 * 给 --menu-policy <xia-menu-mlp-v1 权重> 时改由菜单头（src/ai/menu.ts 的 MenuPilot）操作，老师完全不参与，
 * 逐局记下 menuPicks。以下旧说明只适用于脚本菜单：
 * 报告中必须写明"菜单由脚本选择"，不能称为 100% 模型驱动。
 * --beta 1 时每帧都执行老师的键（仍经过 AI 路径），用于验证这条路径本身不损失通关率。
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execSync } = require('node:child_process');

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
for (const k of ['mode', 'policy', 'out', 'split', 'prefix', 'runs']) if (!args[k]) throw Error(`missing --${k}`);
if (!['eval', 'dagger'].includes(args.mode)) throw Error('--mode must be eval or dagger');
const mode = args.mode;
const runs = Number(args.runs);
const start = Number(args.start ?? 0);
const beta = Number(args.beta ?? 0);
// 老师默认 expert（见 src/debug/mapAutoPlayer.ts）；--expert 0 退回普通打法
const expert = (args.expert ?? '1') !== '0';
// --heroes wenShaohua 只跑指定主角（逗号分隔），默认两个都跑
const heroes = (args.heroes ?? 'wenShaohua,yuWuxia').split(',');
const policyFile = path.resolve(args.policy);
const policy = JSON.parse(fs.readFileSync(policyFile, 'utf8'));
const menuPolicyFile = args['menu-policy'] ? path.resolve(args['menu-policy']) : null;
const menuPolicy = menuPolicyFile ? JSON.parse(fs.readFileSync(menuPolicyFile, 'utf8')) : null;
if (menuPolicy && mode !== 'eval') throw Error('--menu-policy 只用于 --mode eval');
const dir = path.join(path.resolve(args.out), args.split);
fs.mkdirSync(dir, { recursive: true });
const sha = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const root = path.resolve(__dirname, '..');
const gitRev = (() => {
  try {
    return {
      rev: execSync('git rev-parse HEAD', { cwd: root }).toString().trim(),
      srcDirty: execSync('git status --porcelain -- src tools', { cwd: root }).toString().trim() !== '',
    };
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
  let spec = null;
  try {
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173');
    await page.waitForFunction(() => window.__t?.ready, {}, { timeout: 60000 });
    await page.evaluate(() => __t.keepAllArt());
    spec = await page.evaluate(async (policy) => {
      const f = await import('/src/ai/features.ts');
      const { HandPolicy } = await import('/src/ai/policy.ts');
      new HandPolicy(policy); // 先校验一次权重文件
      return { version: f.FEATURE_VERSION, dim: f.FEATURE_DIM, actions: f.AI_ACTIONS };
    }, policy);
    for (const hero of heroes)
      for (let trial = start; trial < start + runs; trial++) {
        const seed = `${args.prefix}-${hero}-${trial}`;
        const t0 = Date.now();
        await page.evaluate(
          async ({ hero, seed, policy, mode, beta, expert, menuPolicy }) => {
            const { startRun, getRun } = await import('/src/game/run.ts');
            const { HandPolicy } = await import('/src/ai/policy.ts');
            const { HandPilot, aiControl } = await import('/src/ai/pilot.ts');
            window.__feat = await import('/src/ai/features.ts');
            window.__getRun = getRun;
            aiControl.set(null);
            const r = startRun(hero);
            r.seed = seed;
            __t.go('Map');
            __t.wake();
            window.bot = __t.autoPlayer(1, seed, { expert });
            window.result = {
              seed, hero, cleared: false, stage: 0, step: 0, phase: 1, frames: 0,
              decisions: 0, idleFrames: 0, teacherExecuted: 0, scriptMenuFrames: 0,
              hitsTaken: 0, damageTaken: 0, minHpFrac: 1, rescued: false, cheat: false, checkpoints: [], saves: [], hitLog: [],
              decideMsMax: 0,
            };
            window.rows = { x: [], y: [], e: [], f: [] };
            // 种子化的混合随机数：同一 seed 同一 beta 结果可复现
            let h = 2166136261;
            for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
            window.mix = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296);
            const pilot = new HandPilot(new HandPolicy(policy));
            const studentDecide = pilot.decide.bind(pilot);
            pilot.decide = (s) => {
              const frame = pilot.frame;
              const t = performance.now();
              let held = studentDecide(s);
              const ms = performance.now() - t;
              if (ms > result.decideMsMax) result.decideMsMax = ms;
              const { extractFeatures, actionsToLabel } = window.__feat;
              if (mode === 'dagger' || beta > 0) {
                const teacher = bot(s, frame);
                if (beta > 0 && mix() < beta) {
                  held = teacher;
                  result.teacherExecuted++;
                }
                const x = mode === 'dagger' ? extractFeatures(s, frame) : null;
                if (x) {
                  rows.x.push(x);
                  rows.y.push(actionsToLabel(teacher));
                  rows.e.push(actionsToLabel(held));
                  rows.f.push(frame);
                }
              }
              return held;
            };
            window.pilot = pilot;
            window.lastHp = null;
            window.prevCharm = null;
            window.prevRescue = null;
            if (menuPolicy) {
              const { MenuPilot, MenuPolicy } = await import('/src/ai/menu.ts');
              window.menuPilot = new MenuPilot(new MenuPolicy(menuPolicy));
            } else window.menuPilot = null;
            aiControl.set(pilot, menuPilot);
          },
          { hero, seed, policy, mode, beta, expert, menuPolicy },
        );
        await page.waitForFunction(() => game.scene.isActive('Map'), {}, { timeout: 60000 });
        await page.evaluate(() => {
          __t.sleep();
          __t.fast = true;
        });
        const chunks = { x: [], y: [], e: [], f: [] };
        let last;
        for (let chunk = 0; chunk < 40; chunk++) {
          last = await page.evaluate(() => {
            const { FEATURE_DIM } = window.__feat;
            __t.drive(
              1200,
              (s, f) => {
                if (s.scene.key === 'Ending') result.cleared = true;
                const run = window.__getRun();
                if (run) {
                  result.stage = run.stage;
                  result.step = run.step;
                  if (run.cheat) result.cheat = true;
                  if (run.rescueUsed) result.rescued = true;
                  // 本该倒下却被救回：护心符抵挡致命一击、红熊救场（都只有一次），记下发生在哪
                  const at = `${run.stage}:${run.step}`;
                  if (window.prevCharm && !run.heartCharm) result.saves.push({ by: 'heartCharm', at, frame: result.frames, bossPhase: s.boss?.phase ?? null });
                  if (window.prevRescue === false && run.rescueUsed) result.saves.push({ by: 'rescue', at, frame: result.frames, bossPhase: s.boss?.phase ?? null });
                  window.prevCharm = !!run.heartCharm;
                  window.prevRescue = !!run.rescueUsed;
                  const key = `${run.stage}:${run.step}`;
                  if (!result.checkpoints.some((c) => c.key === key))
                    result.checkpoints.push({ key, frame: result.frames, level: run.level, hp: s.player?.hp ?? run.hp, coins: run.coins });
                }
                if (s.boss) result.phase = s.boss.phase ?? 1;
                const p = s.player;
                if (s.scene.key === 'Map' && p) {
                  if (lastHp !== null && p.hp < lastHp) {
                    result.hitsTaken++;
                    result.damageTaken += lastHp - p.hp;
                    // 受击来源：Boss 当前招式、最近的小怪招式、有没有敌方墨圈或飞行物
                    const b = s.boss;
                    const gd = (o) => Math.hypot(o.pos.x - p.pos.x, (o.pos.y - p.pos.y) / 0.7);
                    const near = (s.enemies ?? []).map((x) => x.enemy).filter((x) => !x.dead).sort((a, c) => gd(a) - gd(c))[0];
                    result.hitLog.push({
                      at: run ? `${run.stage}:${run.step}` : null, frame: result.frames, dmg: lastHp - p.hp, hpAfter: p.hp,
                      boss: b ? { phase: b.phase ?? 1, move: b.runner?.move?.id ?? null, mphase: b.runner?.phase ?? null, dist: Math.round(gd(b)) } : null,
                      foe: near ? { id: near.def?.id, move: near.runner?.move?.id ?? null, mphase: near.runner?.phase ?? null, dist: Math.round(gd(near)) } : null,
                      rings: (s.rings ?? []).filter((r) => r.alive && r.team === 'enemy').length,
                      shots: (s.projectiles ?? []).filter((r) => r.alive && r.team === 'enemy').length,
                    });
                  }
                  lastHp = p.hp;
                  result.minHpFrac = Math.min(result.minHpFrac, p.hp / Math.max(1, p.maxHp));
                } else lastHp = null;
                result.frames++;
                // 大地图可操控帧：什么都不按，交给 MapScene 里的 AI 路径；其余（剧情、面板、商店）由老师脚本处理
                const live = s.scene.key === 'Map' && p && !p.dead && !s.leaving && !s.pauses?.size;
                if (live) return [];
                // 有菜单头时暂停帧什么都不按：面板和剧情翻页由 MenuPilot 在场景里自己处理
                if (menuPilot) return [];
                result.scriptMenuFrames++;
                return bot(s, f);
              },
              (s) => s.scene.key === 'Title',
            );
            result.decisions = pilot.decisions;
            result.idleFrames = pilot.idleFrames;
            result.menuPicks = menuPilot ? menuPilot.log.slice() : null;
            const X = new Float32Array(rows.x.length * FEATURE_DIM);
            rows.x.forEach((x, k) => X.set(x, k * FEATURE_DIM));
            const b64 = (buf) => {
              const u = new Uint8Array(buf);
              let s = '';
              for (let k = 0; k < u.length; k += 0x8000) s += String.fromCharCode.apply(null, u.subarray(k, k + 0x8000));
              return btoa(s);
            };
            const out = {
              scene: __t.scene().scene.key,
              x: b64(X.buffer),
              y: b64(Uint8Array.from(rows.y.flat()).buffer),
              e: b64(Uint8Array.from(rows.e.flat()).buffer),
              f: b64(Int32Array.from(rows.f).buffer),
              ...result,
            };
            rows.x = [];
            rows.y = [];
            rows.e = [];
            rows.f = [];
            return out;
          });
          for (const k of ['x', 'y', 'e', 'f']) chunks[k].push(Buffer.from(last[k], 'base64'));
          if (last.scene === 'Title') break;
        }
        await page.evaluate(async () => (await import('/src/ai/pilot.ts')).aiControl.set(null));
        const meta = {
          seed, hero, mode, beta, policy: policy.version,
          cleared: last.cleared, stage: last.stage, step: last.step, phase: last.phase, frames: last.frames,
          stalled: last.scene !== 'Title', wallMs: Date.now() - t0,
          decisions: last.decisions, idleFrames: last.idleFrames, teacherExecuted: last.teacherExecuted,
          scriptMenuFrames: last.scriptMenuFrames, menuPicks: last.menuPicks, hitsTaken: last.hitsTaken, damageTaken: last.damageTaken,
          minHpFrac: Number(last.minHpFrac.toFixed(3)), rescued: last.rescued, cheat: last.cheat,
          decideMsMax: Number(last.decideMsMax.toFixed(3)), saves: last.saves, hitLog: last.hitLog, checkpoints: last.checkpoints,
        };
        summary.push(meta);
        console.log(JSON.stringify({ seed, cleared: meta.cleared, at: `${meta.stage}:${meta.step}`, hits: meta.hitsTaken, minHp: meta.minHpFrac, saves: meta.saves.map((v) => `${v.by}@${v.at}`), idle: meta.idleFrames, wallMs: meta.wallMs }));
        if (mode === 'dagger') {
          const x = Buffer.concat(chunks.x),
            y = Buffer.concat(chunks.y),
            e = Buffer.concat(chunks.e),
            f = Buffer.concat(chunks.f);
          const n = f.length / 4;
          if (x.length !== n * spec.dim * 4 || y.length !== n * 8 || e.length !== n * 8) throw Error(`${seed}: row/byte mismatch`);
          const out = {
            [`${seed}.x.f32`]: x,
            [`${seed}.y.u8`]: y,
            [`${seed}.exec.u8`]: e,
            [`${seed}.f.i32`]: f,
          };
          meta.rows = n;
          for (const [name, buf] of Object.entries(out)) {
            const file = path.join(dir, name);
            fs.writeFileSync(file, buf);
            files[name] = sha(file);
          }
        }
        const metaFile = path.join(dir, `${seed}.${mode}.meta.json`);
        fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2) + '\n');
        files[path.basename(metaFile)] = sha(metaFile);
        if (errors.length) throw Error(errors.join('\n'));
      }
  } finally {
    const byHero = (h) => summary.filter((r) => r.hero === h);
    const stat = (rs) => ({
      runs: rs.length,
      cleared: rs.filter((r) => r.cleared).length,
      stalled: rs.filter((r) => r.stalled).length,
      deaths: rs.filter((r) => !r.cleared && !r.stalled).map((r) => ({ seed: r.seed, at: `${r.stage}:${r.step}`, bossPhase: r.phase })),
      hitsTakenMean: rs.length ? +(rs.reduce((a, r) => a + r.hitsTaken, 0) / rs.length).toFixed(1) : null,
      minHpFracMin: rs.length ? Math.min(...rs.map((r) => r.minHpFrac)) : null,
      rescued: rs.filter((r) => r.rescued).length,
      charmSaved: rs.filter((r) => r.saves.some((v) => v.by === 'heartCharm')).length,
      savesAt: rs.flatMap((r) => r.saves.map((v) => `${v.by}@${v.at}${v.bossPhase ? '/p' + v.bossPhase : ''}`)),
    });
    const report = {
      schema: 'xia-student-run-v1',
      date: new Date().toISOString(),
      mode,
      beta,
      teacher: { player: 'mapAutoPlayer', skill: 1, expert },
      split: args.split,
      prefix: args.prefix,
      policy: { file: policyFile, version: policy.version, sha256: sha(policyFile) },
      game: gitRev,
      features: spec,
      menus: menuPolicy
        ? { by: 'model', file: menuPolicyFile, version: menuPolicy.version, sha256: sha(menuPolicyFile) }
        : 'script (menu head not used)',
      total: stat(summary),
      wenShaohua: stat(byHero('wenShaohua')),
      yuWuxia: stat(byHero('yuWuxia')),
      cheatRuns: summary.filter((r) => r.cheat).length,
      idleFramesTotal: summary.reduce((a, r) => a + r.idleFrames, 0),
      teacherExecutedTotal: summary.reduce((a, r) => a + r.teacherExecuted, 0),
      decisionsTotal: summary.reduce((a, r) => a + r.decisions, 0),
      decideMsMax: summary.length ? Math.max(...summary.map((r) => r.decideMsMax)) : null,
      errors,
      runs: summary,
      files,
    };
    const reportFile = path.join(dir, `report-${mode}-${args.prefix}-${start}-${start + runs - 1}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n');
    console.log('REPORT', reportFile, `cleared ${report.total.cleared}/${report.total.runs}`, `stalled ${report.total.stalled}`);
    await browser.close();
    if (errors.length || report.total.stalled || report.cheatRuns) process.exitCode = 1;
  }
})();

import type { Action } from '../input/Controls';
import { areaOf, groundDist, inArea } from '../map/combat/ground';

/**
 * AI 操控用的状态特征：把大地图场景的一帧换成定长数字向量。
 * 训练（导出老师数据）和上线推理都只调用这一个函数，保证两边输入完全一致。
 * 改动任何一项都必须升级 FEATURE_VERSION，旧权重不能直接沿用。
 */
export const FEATURE_VERSION = 'xia-features-v1';

/** 输出顺序固定，与 Controls 里的 Action 一一对应 */
export const AI_ACTIONS: readonly Action[] = ['left', 'right', 'up', 'down', 'attack', 'special', 'dodge', 'throw'];

const HEROES = ['wenShaohua', 'yuWuxia'];
const K_FOES = 6;
const K_RINGS = 4;
const K_SHOTS = 6;
/** 老师打法用帧号取模决定攻击/投掷/走路的节奏，策略需要同样的时钟 */
const CLOCKS = [6, 8, 10, 12];
const AIMED_MOVES = ['snare', 'vault', 'pounce'];

const names: string[] = [];
const add = (prefix: string, keys: string[]) => keys.forEach((k) => names.push(`${prefix}${k}`));
add('stage.', ['0', '1', '2', 'step']);
add('hero.', HEROES);
add('p.', ['hp', 'maxHp', 'ammo', 'evading', 'invuln', 'hurt', 'mercy', 'z', 'faceX', 'faceY', 'walking']);
add('p.move.', ['on', 'startup', 'active', 'recovery', 'frame', 'charge', 'held']);
add('route.', ['dx', 'dy', 'offPath', 'progress']);
add('shop.', ['on', 'dx', 'dy']);
add('foes.', ['count']);
for (const n of CLOCKS) add(`clock${n}.`, Array.from({ length: n }, (_, i) => `${i}`));
const FOE_KEYS = [
  'on', 'dx', 'dy', 'dist', 'faceX', 'faceY', 'hp', 'armor', 'boss',
  'move', 'startup', 'active', 'recovery', 'toActive', 'longActive', 'reach', 'arc', 'danger', 'aimed', 'aimDx', 'aimDy',
];
for (let i = 0; i < K_FOES; i++) add(`foe${i}.`, FOE_KEYS);
for (let i = 0; i < K_RINGS; i++) add(`ring${i}.`, ['on', 'dx', 'dy', 'gap', 'radius']);
for (let i = 0; i < K_SHOTS; i++) add(`shot${i}.`, ['on', 'dx', 'dy', 'dist', 'dirX', 'dirY', 'incoming']);

export const FEATURE_NAMES: readonly string[] = names;
export const FEATURE_DIM = names.length;

const clip = (v: number, lo = -4, hi = 4) => (v < lo ? lo : v > hi ? hi : v);

/** 和老师打法一样的路线目标点：投影到路线上，离得远就先回到路上 */
function routeTarget(map: any, p: { x: number; y: number }) {
  const path = [...map.path, map.boss];
  let best = Infinity,
    segment = 0,
    projected = { x: 0, y: 0 };
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i],
      b = path[i + 1],
      dx = b.x - a.x,
      dy = b.y - a.y;
    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
    const q = { x: a.x + t * dx, y: a.y + t * dy },
      d = Math.hypot(p.x - q.x, p.y - q.y);
    if (d < best) {
      best = d;
      segment = i;
      projected = q;
    }
  }
  let at = best > 75 ? projected : path[segment + 1];
  if (Math.hypot(at.x - p.x, at.y - p.y) < 45 && segment + 2 < path.length) at = path[segment + 2];
  return { at, offPath: best, progress: segment / Math.max(1, path.length - 1) };
}

/**
 * 大地图场景当前帧的特征。frame 是操控方自己的逻辑帧计数（导出和上线都从 0 开始逐帧加 1）。
 * 场景不是可操控状态（不在大地图、主角不存在或已倒下）时返回 null。
 */
export function extractFeatures(s: any, frame: number): Float32Array | null {
  const p = s?.player;
  if (!p || p.dead || !s.stage?.map || !s.run) return null;
  const out = new Float32Array(FEATURE_DIM);
  let i = 0;
  const put = (v: number | boolean) => (out[i++] = typeof v === 'boolean' ? (v ? 1 : 0) : Number.isFinite(v) ? v : 0);

  const stage = s.run.stage ?? 0;
  for (let k = 0; k < 3; k++) put(stage === k);
  put((s.run.step ?? 0) / 6);
  const hero = p.def?.id ?? s.run.hero;
  for (const h of HEROES) put(hero === h);

  put(p.hp / Math.max(1, p.maxHp));
  put(p.maxHp / 300);
  put((p.ammo ?? 0) / 6);
  put(!!p.evading);
  put(!!p.invulnerable);
  put((p.hurtFrames ?? 0) > 0);
  put(clip((p.mercyFrames ?? 0) / 60, 0, 2));
  put(clip((p.z ?? 0) / 100));
  put(p.facing?.x ?? 0);
  put(p.facing?.y ?? 0);
  put(!!p.walking);

  const pm = p.runner?.move;
  const pPhase = p.runner?.phase;
  put(!!pm);
  put(pPhase === 'startup');
  put(pPhase === 'active');
  put(pPhase === 'recovery');
  put(clip((p.runner?.frame ?? 0) / 60, 0, 4));
  put(p.runner?.charge ?? 0);
  put(clip((p.runner?.heldFrames ?? 0) / 60, 0, 4));

  const route = routeTarget(s.stage.map, p.pos);
  put(clip((route.at.x - p.pos.x) / 500));
  put(clip((route.at.y - p.pos.y) / 500));
  put(clip(route.offPath / 200));
  put(route.progress);

  const ren = s.stage.map.renXinye;
  const shopStep = s.run.step === 2 && ren;
  put(!!shopStep);
  put(shopStep ? clip((ren.x - p.pos.x) / 500) : 0);
  put(shopStep ? clip((ren.y - p.pos.y) / 500) : 0);

  const foes = [...(s.enemies ?? []).map((e: any) => e.enemy), ...(s.controller?.hitTargets?.() ?? [])].filter(
    (e: any) => !e.dead && !e.invulnerable,
  );
  const bosses = new Set(s.controller?.hitTargets?.() ?? []);
  put(foes.length / 10);

  for (const n of CLOCKS) for (let k = 0; k < n; k++) put(frame % n === k);

  foes.sort(
    (a: any, b: any) => groundDist(a.pos.x - p.pos.x, a.pos.y - p.pos.y) - groundDist(b.pos.x - p.pos.x, b.pos.y - p.pos.y),
  );
  for (let k = 0; k < K_FOES; k++) {
    const e = foes[k];
    if (!e) {
      i += FOE_KEYS.length;
      continue;
    }
    const dx = e.pos.x - p.pos.x,
      dy = e.pos.y - p.pos.y;
    put(1);
    put(clip(dx / 500));
    put(clip(dy / 500));
    put(clip(groundDist(dx, dy) / 500));
    put(e.facing?.x ?? 0);
    put(e.facing?.y ?? 0);
    put(e.hp / Math.max(1, e.maxHp));
    put(!!e.def?.superArmor);
    put(bosses.has(e));
    const m = e.runner?.move;
    const phase = e.runner?.phase;
    put(!!m);
    put(phase === 'startup');
    put(phase === 'active');
    put(phase === 'recovery');
    put(m ? clip((m.startup - e.runner.frame) / 60, -2, 4) : 0);
    put(!!m && phase === 'active' && m.active > 20);
    let reach = 0,
      arc = 0,
      danger = false,
      aimed = false,
      aim = e.pos;
    if (m?.hit) {
      const area = e.warningArea ?? areaOf(m.hit);
      aimed = AIMED_MOVES.includes(m.id);
      aim = aimed && e.aim ? e.aim : e.pos;
      const used = m.id === 'snare' ? { reach: 70, arc: 360 } : area;
      reach = used.reach;
      arc = used.arc;
      danger = inArea(aim, e.facing, used, p.pos, p.radius);
    }
    put(clip(reach / 300));
    put(arc / 360);
    put(danger);
    put(aimed);
    put(clip((aim.x - p.pos.x) / 500));
    put(clip((aim.y - p.pos.y) / 500));
  }

  const rings = (s.rings ?? [])
    .filter((r: any) => r.alive && r.team === 'enemy')
    .map((r: any) => {
      const dx = r.center.x - p.pos.x,
        dy = r.center.y - p.pos.y;
      return { dx, dy, gap: groundDist(dx, dy) - r.radius, radius: r.radius };
    })
    .sort((a: any, b: any) => Math.abs(a.gap) - Math.abs(b.gap));
  for (let k = 0; k < K_RINGS; k++) {
    const r = rings[k];
    if (!r) {
      i += 5;
      continue;
    }
    put(1);
    put(clip(r.dx / 500));
    put(clip(r.dy / 500));
    put(clip(r.gap / 200));
    put(clip(r.radius / 500));
  }

  const shots = (s.projectiles ?? [])
    .filter((pr: any) => pr.alive && pr.team === 'enemy')
    .map((pr: any) => {
      const dx = p.pos.x - pr.pos.x,
        dy = p.pos.y - pr.pos.y;
      const dir = pr.dir ?? { x: 0, y: 0 };
      return { dx, dy, dist: groundDist(dx, dy), dir, incoming: dx * dir.x + dy * dir.y > 0 };
    })
    .sort((a: any, b: any) => a.dist - b.dist);
  for (let k = 0; k < K_SHOTS; k++) {
    const sh = shots[k];
    if (!sh) {
      i += 7;
      continue;
    }
    put(1);
    put(clip(sh.dx / 500));
    put(clip(sh.dy / 500));
    put(clip(sh.dist / 300));
    put(sh.dir.x);
    put(sh.dir.y);
    put(sh.incoming);
  }

  if (i !== FEATURE_DIM) throw new Error(`feature size ${i} != ${FEATURE_DIM}`);
  return out;
}

/** 按键集合 → 8 维 0/1 标签（顺序同 AI_ACTIONS） */
export function actionsToLabel(actions: readonly Action[]): number[] {
  return AI_ACTIONS.map((a) => (actions.includes(a) ? 1 : 0));
}

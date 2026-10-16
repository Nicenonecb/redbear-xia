import Phaser from 'phaser';
import type { Actor } from '../entities/Actor';
import type { Action } from '../input/Controls';

/**
 * 开发用的自动打法，用来调难度：像一个会失手的普通玩家。
 * - 敌人出招前摇快结束、自己又在打击范围里时，按 skill 的概率闪避（每一招只掷一次骰子）；
 *   冲锋劈砍、虎啸这类只能穿过去的迎着闪，其他往后闪
 * - 贴地飞来的冲击波、飞刀跳过去；顶天立地的音波迎着闪
 * - 于无瑕离得远就扔飞镖，近了挥扇；温少华走近了连斩
 * skill = 1 几乎不挨打，0.5 大约是第一次玩的人。
 */
type S = Phaser.Scene & Record<string, any>;

/** 这些招只能从对手身上穿过去躲 */
const DODGE_THROUGH = new Set(['chargeChop']);

export function autoPlayer(skill = 0.75, seed = 'bot') {
  const rng = new Phaser.Math.RandomDataGenerator([seed]);
  /** 每个敌人当前这一招躲不躲；敌人两招之间会清掉，所以连出两次同一招也会各掷一次 */
  const decided = new Map<Actor, { move: string; react: boolean }>();
  const decidedShots = new WeakMap<object, boolean>();

  const foesOf = (s: S): Actor[] => {
    if (s.enemies) return s.enemies.map((e: { enemy: Actor }) => e.enemy).filter((e: Actor) => !e.dead);
    if (s.boss && !['defeated', 'yield', 'intro'].includes(s.boss.stage)) return [s.boss];
    return [];
  };

  /** 这一招该不该躲：同一次出招只决定一次 */
  const willReact = (foe: Actor) => {
    const move = foe.runner.move!;
    const d = decided.get(foe);
    if (d?.move === move.id) return d.react;
    const react = rng.frac() < skill;
    decided.set(foe, { move: move.id, react });
    return react;
  };

  return (s: S, f: number): Action[] => {
    const p = s.player;
    if (s.isPaused || p.dead) return [];
    const foes = foesOf(s);
    for (const foe of foes) if (!foe.runner.move) decided.delete(foe);

    // 1. 躲招
    for (const foe of foes) {
      const move = foe.runner.move;
      if (!move || foe.runner.phase !== 'startup') continue;
      const left = move.startup - foe.runner.frame;
      if (left > 8 || left < 1) continue;
      const dist = Math.abs(foe.x - p.x);
      const reach = move.id === 'chargeChop' ? 430 : move.id === 'pounce' ? 9999 : move.hit ? Math.abs(move.hit.box.x) + move.hit.box.w / 2 + 30 : 0;
      const inDanger = move.id === 'pounce' ? Math.abs(s.boss.aimX - p.x) < 110 : dist < reach;
      if (!inDanger || !willReact(foe)) continue;
      const toward = foe.x > p.x ? 'right' : 'left';
      const away = toward === 'right' ? 'left' : 'right';
      // 迎着闪要等对方冲到跟前；往后闪越早越好
      if (DODGE_THROUGH.has(move.id)) return dist < 260 ? [toward, 'dodge'] : [];
      return [away, 'dodge'];
    }

    // 2. 躲飞来的东西
    for (const shot of s.projectiles ?? []) {
      if (shot.team !== 'enemy') continue;
      const dx = shot.x - p.x;
      const coming = Math.sign(shot.dir) === -Math.sign(dx);
      if (!coming || Math.abs(dx) > 120) continue;
      if (!decidedShots.has(shot)) decidedShots.set(shot, rng.frac() < skill);
      if (!decidedShots.get(shot)) continue;
      const tall = shot.spec.hit.box.h > 150;
      if (tall) return Math.abs(dx) < 70 ? [dx > 0 ? 'right' : 'left', 'dodge'] : [];
      if (Math.abs(dx) < 100 && p.grounded) return ['jump'];
    }

    // 3. 打
    if (!foes.length) return s.exitOpen ? ['right'] : [];
    const near = foes.reduce((a, b) => (Math.abs(b.x - p.x) < Math.abs(a.x - p.x) ? b : a));
    const dx = near.x - p.x;
    const dir: Action = dx > 0 ? 'right' : 'left';
    const facingRight = p.facing === 1;
    if (p.def.ammo && p.ammo > 0 && Math.abs(dx) > 180 && Math.abs(dx) < 520) {
      if ((dir === 'right') !== facingRight) return [dir];
      return f % 6 < 2 ? ['throw'] : [];
    }
    if (Math.abs(dx) > 75) return [dir];
    if ((dir === 'right') !== facingRight) return [dir];
    return f % 4 < 2 ? ['attack'] : [];
  };
}

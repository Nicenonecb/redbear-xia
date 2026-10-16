import { byId, validateEnemy, type EnemyDef } from '../combat/moveTable';

/**
 * 第一章 · 竹林的敌人：胖虎手下的山贼。
 * 小怪两三刀就倒，前摇短、伤害低；大怪血厚、霸体，一招下去很疼，但前摇长、收招空当大。
 * 帧数按 60 帧/秒。
 */

/** 山贼喽啰：提刀冲上来砍，最常见的小怪 */
export const BANDIT: EnemyDef = validateEnemy({
  id: 'bandit',
  name: '山贼喽啰',
  tier: 'minion',
  hp: 30,
  body: { w: 30, h: 70 },
  walkSpeed: 140,
  superArmor: false,
  range: [50, 80],
  cooldown: { min: 50, max: 95 },
  exp: 10,
  coins: [4, 7],
  look: 'bandit',
  attacks: [{ move: 'slash', weight: 1, maxDist: 95 }],
  moves: byId([
    {
      id: 'slash',
      name: '劈砍',
      startup: 20,
      active: 4,
      recovery: 26,
      telegraph: 'glint',
      hit: { box: { x: 44, y: -40, w: 56, h: 56 }, damage: 8, hitstop: 4, hitstun: 14, knockback: { x: 220, y: 0 } },
      motion: [{ from: 16, to: 22, vx: 160 }],
      events: [{ frame: 20, type: 'sfx', name: 'swing-light' }],
    },
  ]),
});

/** 山贼飞刀手：远远站着扔飞刀，你一靠近就往后退 */
export const THROWER: EnemyDef = validateEnemy({
  id: 'thrower',
  name: '山贼飞刀手',
  tier: 'minion',
  hp: 22,
  body: { w: 28, h: 66 },
  walkSpeed: 130,
  superArmor: false,
  range: [260, 420],
  cooldown: { min: 70, max: 120 },
  exp: 12,
  coins: [5, 8],
  look: 'thrower',
  attacks: [{ move: 'throw', weight: 1, minDist: 120, maxDist: 560 }],
  projectile: {
    speed: 520,
    life: 90,
    pierce: false,
    hit: { box: { x: 0, y: 0, w: 26, h: 12 }, damage: 7, hitstop: 3, hitstun: 12, knockback: { x: 160, y: 0 } },
  },
  moves: byId([
    {
      id: 'throw',
      name: '飞刀',
      startup: 26,
      active: 2,
      recovery: 30,
      telegraph: 'glint',
      events: [
        { frame: 26, type: 'spawn', name: 'knife' },
        { frame: 26, type: 'sfx', name: 'knife' },
      ],
    },
  ]),
});

/** 山贼头目（大怪）：扛着狼牙大锤的壮汉，霸体，砸地前脚下出现红圈 */
export const CHIEF: EnemyDef = validateEnemy({
  id: 'chief',
  name: '山贼头目',
  tier: 'brute',
  hp: 190,
  body: { w: 52, h: 100 },
  walkSpeed: 90,
  superArmor: true,
  range: [70, 150],
  cooldown: { min: 40, max: 80 },
  exp: 60,
  coins: [35, 45],
  look: 'chief',
  attacks: [
    { move: 'hammer', weight: 2, maxDist: 190 },
    { move: 'sweep', weight: 1, maxDist: 150 },
  ],
  moves: byId([
    {
      // 抡起大锤往前砸，身前地上一片红
      id: 'hammer',
      name: '开山锤',
      startup: 44,
      active: 5,
      recovery: 46,
      telegraph: 'ground',
      hit: { box: { x: 90, y: -36, w: 130, h: 72 }, damage: 18, hitstop: 9, hitstun: 26, knockback: { x: 380, y: -300 } },
      events: [
        { frame: 0, type: 'sfx', name: 'heave' },
        { frame: 44, type: 'vfx', name: 'shake' },
        { frame: 44, type: 'sfx', name: 'slam' },
      ],
    },
    {
      // 横着抡一圈，前后都打得到；前摇短一些，但伤害也低一些
      id: 'sweep',
      name: '横扫千军',
      startup: 30,
      active: 8,
      recovery: 36,
      telegraph: 'ground',
      hit: { box: { x: 0, y: -50, w: 260, h: 70 }, damage: 13, hitstop: 7, hitstun: 20, knockback: { x: 320, y: -120 } },
      events: [{ frame: 30, type: 'sfx', name: 'swing-heavy' }],
    },
  ]),
});

export const ENEMIES = { bandit: BANDIT, thrower: THROWER, chief: CHIEF };
export type EnemyId = keyof typeof ENEMIES;

import { byId, validateCharacter, type CharacterDef, type ProjectileSpec } from '../combat/moveTable';

/**
 * 温少华 · 江南 · 剑。中速、高伤害、稳扎稳打。
 * 所有手感数值都在这里调。帧数按 60 帧/秒：6 帧 ≈ 100ms。
 *
 * 连段：流云一 → 流云二 → 流云三 →（收招时）少华一剑，把人打远了再用剑气补刀。
 * 每一式出手后都能闪避取消，保证随时有路可退。
 */
export const WEN_SHAOHUA: CharacterDef = validateCharacter({
  id: 'wenShaohua',
  name: '温少华',
  hp: 100,
  moveSpeed: 280,
  jumpSpeed: 680,
  body: { w: 28, h: 72 },
  neutral: { attack: 'liuyun1', special: 'shaohuaCharge', dodge: 'dodge' },
  moves: byId([
    {
      id: 'liuyun1',
      name: '流云·一',
      startup: 5,
      active: 3,
      recovery: 14,
      hit: {
        box: { x: 46, y: -44, w: 70, h: 50 },
        area: { reach: 105, arc: 120 },
        damage: 8,
        hitstop: 4,
        hitstun: 14,
        knockback: { x: 120, y: 0 },
      },
      motion: [{ from: 0, to: 6, vx: 150 }],
      cancels: [
        { from: 8, to: 21, action: 'attack', into: 'liuyun2' },
        { from: 8, to: 21, action: 'dodge', into: 'dodge' },
      ],
      events: [{ frame: 4, type: 'sfx', name: 'swing' }],
    },
    {
      id: 'liuyun2',
      name: '流云·二',
      startup: 5,
      active: 3,
      recovery: 15,
      hit: {
        box: { x: 50, y: -50, w: 74, h: 70 },
        area: { reach: 110, arc: 130 },
        damage: 9,
        hitstop: 4,
        hitstun: 16,
        knockback: { x: 140, y: 0 },
      },
      motion: [{ from: 0, to: 6, vx: 150 }],
      cancels: [
        { from: 8, to: 22, action: 'attack', into: 'liuyun3' },
        { from: 8, to: 22, action: 'dodge', into: 'dodge' },
      ],
      events: [{ frame: 4, type: 'sfx', name: 'swing' }],
    },
    {
      id: 'liuyun3',
      name: '流云·三',
      startup: 10,
      active: 4,
      recovery: 24,
      hit: {
        box: { x: 58, y: -40, w: 96, h: 80 },
        area: { reach: 135, arc: 150 },
        damage: 16,
        hitstop: 8,
        hitstun: 26,
        knockback: { x: 380, y: -200 },
      },
      // 踏前一步劈下
      motion: [{ from: 4, to: 12, vx: 420 }],
      cancels: [
        { from: 16, to: 37, action: 'dodge', into: 'dodge' },
        { from: 18, to: 37, action: 'special', into: 'shaohuaCharge' },
      ],
      events: [{ frame: 9, type: 'sfx', name: 'swing-heavy' }],
    },
    {
      id: 'shaohuaCharge',
      name: '少华一剑·蓄',
      startup: 8,
      active: 0,
      recovery: 0,
      hold: { action: 'special', fullFrames: 54, release: 'shaohuaRelease' },
      cancels: [{ from: 0, to: 7, action: 'dodge', into: 'dodge' }],
      events: [{ frame: 0, type: 'sfx', name: 'charge' }],
    },
    {
      id: 'shaohuaRelease',
      name: '少华一剑',
      startup: 4,
      active: 2,
      recovery: 16,
      // 剑气本身的判定见下面 SWORD_QI_LEVELS
      cancels: [{ from: 8, to: 21, action: 'dodge', into: 'dodge' }],
      events: [
        { frame: 4, type: 'spawn', name: 'swordQi' },
        { frame: 4, type: 'sfx', name: 'sword-qi' },
      ],
    },
    {
      id: 'dodge',
      name: '闪避',
      startup: 1,
      active: 14,
      recovery: 8,
      invuln: { from: 1, to: 14 },
      noGravity: { from: 0, to: 14 },
      motion: [{ from: 0, to: 14, vx: 660 }],
      oncePerAir: true,
      cancels: [
        { from: 17, to: 22, action: 'attack', into: 'liuyun1' },
        { from: 17, to: 22, action: 'special', into: 'shaohuaCharge' },
      ],
      events: [{ frame: 0, type: 'sfx', name: 'dodge' }],
    },
  ]),
});

/** 少华一剑放出的剑气，按蓄力程度分三档 */
export interface SwordQiLevel extends ProjectileSpec {
  /** 蓄力比例达到多少用这一档 */
  minCharge: number;
}

export const SWORD_QI_LEVELS: SwordQiLevel[] = [
  {
    minCharge: 0,
    speed: 900,
    life: 30,
    pierce: false,
    hit: { box: { x: 0, y: 0, w: 28, h: 44 }, damage: 10, hitstop: 3, hitstun: 12, knockback: { x: 160, y: 0 } },
  },
  {
    minCharge: 0.5,
    speed: 1000,
    life: 40,
    pierce: false,
    hit: { box: { x: 0, y: 0, w: 32, h: 64 }, damage: 18, hitstop: 5, hitstun: 18, knockback: { x: 260, y: 0 } },
  },
  {
    minCharge: 1,
    speed: 1100,
    life: 50,
    pierce: true,
    hit: { box: { x: 0, y: 0, w: 40, h: 96 }, damage: 32, hitstop: 8, hitstun: 26, knockback: { x: 420, y: 0 } },
  },
];

export function swordQiLevel(charge: number) {
  return [...SWORD_QI_LEVELS].reverse().find((l) => charge >= l.minCharge) ?? SWORD_QI_LEVELS[0];
}

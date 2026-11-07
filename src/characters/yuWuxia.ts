import { byId, validateCharacter, type CharacterDef, type ProjectileSpec } from '../combat/moveTable';

/**
 * 于无瑕 · 西南 · 扇与暗器。快节奏、高机动，动作干净利落，收招时合扇。
 * 帧数按 60 帧/秒。
 *
 * - 扇子横扫（J）：三段，比温少华快，单下伤害低；每打中一下回一支飞镖
 * - 掷扇（K，按住蓄力）：扇子飞出去再飞回来，去程、回程各打一次；扇子不在手上时不能挥扇、不能再掷
 * - 飞镖（I）：可以连发，有弹药上限；打光了就得贴上去用扇子把镖"挣"回来
 */
export const YU_WUXIA: CharacterDef = validateCharacter({
  id: 'yuWuxia',
  name: '于无瑕',
  hp: 100,
  moveSpeed: 320,
  body: { w: 26, h: 70 },
  neutral: { attack: 'fan1', special: 'fanCharge', dodge: 'dodge', throw: 'dart' },
  ammo: { action: 'throw', max: 6, refillOnMeleeHit: 1 },
  moves: byId([
    {
      id: 'fan1',
      name: '扇·拂',
      startup: 4,
      active: 3,
      recovery: 11,
      hit: { box: { x: 58, y: -44, w: 84, h: 52 }, damage: 6, hitstop: 3, hitstun: 12, knockback: { x: 110, y: 0 } },
      motion: [{ from: 0, to: 5, vx: 170 }],
      cancels: [
        { from: 6, to: 17, action: 'attack', into: 'fan2' },
        { from: 5, to: 17, action: 'dodge', into: 'dodge' },
        { from: 5, to: 17, action: 'throw', into: 'dart' },
      ],
      events: [{ frame: 3, type: 'sfx', name: 'fan' }],
    },
    {
      id: 'fan2',
      name: '扇·回',
      startup: 4,
      active: 3,
      recovery: 12,
      hit: { box: { x: 60, y: -50, w: 88, h: 64 }, damage: 6, hitstop: 3, hitstun: 13, knockback: { x: 130, y: 0 } },
      motion: [{ from: 0, to: 5, vx: 170 }],
      cancels: [
        { from: 6, to: 18, action: 'attack', into: 'fan3' },
        { from: 5, to: 18, action: 'dodge', into: 'dodge' },
        { from: 5, to: 18, action: 'throw', into: 'dart' },
      ],
      events: [{ frame: 3, type: 'sfx', name: 'fan' }],
    },
    {
      id: 'fan3',
      name: '扇·旋',
      startup: 7,
      active: 5,
      recovery: 18,
      hit: { box: { x: 50, y: -46, w: 120, h: 72 }, damage: 11, hitstop: 6, hitstun: 22, knockback: { x: 320, y: -160 } },
      motion: [{ from: 2, to: 10, vx: 260 }],
      cancels: [
        { from: 12, to: 29, action: 'dodge', into: 'dodge' },
        { from: 12, to: 29, action: 'throw', into: 'dart' },
        { from: 14, to: 29, action: 'special', into: 'fanCharge' },
      ],
      events: [{ frame: 6, type: 'sfx', name: 'fan-heavy' }],
    },
    {
      id: 'fanCharge',
      name: '掷扇·蓄',
      startup: 6,
      active: 0,
      recovery: 0,
      hold: { action: 'special', fullFrames: 40, release: 'fanThrow' },
      cancels: [{ from: 0, to: 5, action: 'dodge', into: 'dodge' }],
      events: [{ frame: 0, type: 'sfx', name: 'charge' }],
    },
    {
      id: 'fanThrow',
      name: '掷扇',
      startup: 3,
      active: 2,
      recovery: 12,
      cancels: [
        { from: 6, to: 16, action: 'dodge', into: 'dodge' },
        { from: 5, to: 16, action: 'throw', into: 'dart' },
      ],
      events: [
        { frame: 3, type: 'spawn', name: 'fan' },
        { frame: 3, type: 'sfx', name: 'fan-throw' },
      ],
    },
    {
      // 一抖手一支镖，连按就是连发
      id: 'dart',
      name: '飞镖',
      startup: 3,
      active: 1,
      recovery: 7,
      cancels: [
        { from: 5, to: 10, action: 'throw', into: 'dart' },
        { from: 4, to: 10, action: 'dodge', into: 'dodge' },
        { from: 6, to: 10, action: 'attack', into: 'fan1' },
      ],
      events: [
        { frame: 3, type: 'spawn', name: 'dart' },
        { frame: 3, type: 'sfx', name: 'dart' },
      ],
    },
    {
      // 比温少华的闪避更远、收招更短
      id: 'dodge',
      name: '闪避',
      startup: 1,
      active: 13,
      recovery: 6,
      invuln: { from: 1, to: 13 },
      motion: [{ from: 0, to: 13, vx: 740 }],
      cancels: [
        { from: 14, to: 19, action: 'attack', into: 'fan1' },
        { from: 14, to: 19, action: 'throw', into: 'dart' },
        { from: 14, to: 19, action: 'special', into: 'fanCharge' },
      ],
      events: [{ frame: 0, type: 'sfx', name: 'dodge' }],
    },
  ]),
});

/** 飞镖：快、伤害低、顿帧短 */
export const DART: ProjectileSpec = {
  speed: 960,
  life: 40,
  pierce: false,
  hit: { box: { x: 0, y: 0, w: 22, h: 10 }, damage: 4, hitstop: 2, hitstun: 8, knockback: { x: 60, y: 0 } },
};

/** 掷扇：蓄力越久飞得越远、打得越疼；去程回程各打一次 */
export const THROWN_FAN = {
  /** 蓄力 0 和蓄满时飞出去的最远距离 */
  range: [300, 520] as const,
  damage: [8, 14] as const,
  spec: {
    speed: 900,
    life: 240,
    pierce: true,
    hit: { box: { x: 0, y: 0, w: 46, h: 46 }, damage: 8, hitstop: 4, hitstun: 14, knockback: { x: 160, y: 0 } },
  } satisfies ProjectileSpec,
};

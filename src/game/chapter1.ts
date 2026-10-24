import type { ArtSlot } from '../art/slots';
import type { EnemyId } from '../characters/enemies';

/**
 * 第一章 · 竹林的关卡安排：一张大地图上，沿着石板路依次是
 * 入山（遭遇战）→ 深处（遭遇战）→ 任新野的茶摊 → 山寨前（遭遇战）→ 胖虎山寨（关底）。
 * 每场遭遇战分几波，上一波清完才刷下一波；side 是从哪个路口杀进来（right 前面、left 身后）。
 */
export interface SpawnDef {
  enemy: EnemyId;
  side: 'left' | 'right';
}

export interface RoomDef {
  name: string;
  /** 背景远山的随机种子，每间房的山形不一样（没有背景图时用代码画） */
  seed: string;
  /** 背景图槽位，有图就用图 */
  art: ArtSlot;
  waves: SpawnDef[][];
}

const R = (enemy: EnemyId): SpawnDef => ({ enemy, side: 'right' });
const L = (enemy: EnemyId): SpawnDef => ({ enemy, side: 'left' });

export const CHAPTER1_ROOMS: RoomDef[] = [
  {
    name: '竹林 · 入山',
    seed: 'bamboo-room-1',
    art: 'bg_room1',
    waves: [
      [R('bandit'), R('bandit')],
      [R('bandit'), R('thrower'), R('bandit')],
    ],
  },
  {
    name: '竹林 · 深处',
    seed: 'bamboo-room-2',
    art: 'bg_room2',
    waves: [
      [R('bandit'), R('thrower'), R('bandit')],
      [L('bandit'), R('bandit'), R('bandit')],
      [R('thrower'), L('thrower'), R('bandit')],
    ],
  },
  {
    name: '竹林 · 山寨前',
    seed: 'bamboo-room-3',
    art: 'bg_room3',
    waves: [
      [R('bandit'), L('bandit'), R('thrower')],
      [R('chief'), R('bandit')],
    ],
  },
];

/**
 * 第一章的流程：一步一个关口，按大地图上走过去的顺序。
 * 一局的 step 就是"走到了第几个关口"：前五步都在大地图上，过完一个关口就存一次档，
 * 读档时主角出现在上一个关口那里；最后一步是红熊的信
 */
export type ChapterStep = { kind: 'room'; room: number } | { kind: 'shop' } | { kind: 'boss' } | { kind: 'letter' };

export const CHAPTER1_STEPS: ChapterStep[] = [
  { kind: 'room', room: 0 },
  { kind: 'room', room: 1 },
  { kind: 'shop' },
  { kind: 'room', room: 2 },
  { kind: 'boss' },
  { kind: 'letter' },
];

/** 某一场遭遇战是第几步 */
export const roomStep = (room: number) => CHAPTER1_STEPS.findIndex((s) => s.kind === 'room' && s.room === room);
export const SHOP_STEP = CHAPTER1_STEPS.findIndex((s) => s.kind === 'shop');
export const BOSS_STEP = CHAPTER1_STEPS.findIndex((s) => s.kind === 'boss');

/** 任新野在第一章商店里说的话：先招呼，再透露胖虎的情报 */
export const CHAPTER1_SHOP_LINES = {
  greeting: '客官里边请——\n江湖上的事，没有我任新野不知道的。',
  intel: '前面那个胖虎啊，人其实挺好的，就是贪财好色。\n真打不过，不妨多塞点铜钱给他，\n说不定他就……嘿嘿，你懂的。',
  bought: ['好眼光！', '拿好，路上当心。', '这可是好东西。'],
  farewell: '慢走，前面山路滑。',
};

/** 红熊在第一章结束后写给徒弟的嘱咐 */
export const CHAPTER1_LETTERS = {
  wenShaohua:
    '少华，剑招已成，剑意未满。\n胖虎那一扑你躲得漂亮，可惜收剑早了半分。\n江湖上的老虎，不止竹林里这一只。',
  yuWuxia: '无瑕，你出手从不多一分，很好。\n只是暗器总有打完的时候。\n记住，近身也是你的路。',
};

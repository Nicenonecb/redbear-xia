import type { EnemyId } from '../characters/bandits';

/**
 * 第一章 · 竹林的关卡安排：战斗房 ×3 → 商店 → 关底胖虎。
 * 每个房间分几波，上一波清完才刷下一波；side 是从哪一边刷出来。
 */
export interface SpawnDef {
  enemy: EnemyId;
  side: 'left' | 'right';
}

export interface RoomDef {
  name: string;
  /** 背景远山的随机种子，每间房的山形不一样 */
  seed: string;
  waves: SpawnDef[][];
}

const R = (enemy: EnemyId): SpawnDef => ({ enemy, side: 'right' });
const L = (enemy: EnemyId): SpawnDef => ({ enemy, side: 'left' });

export const CHAPTER1_ROOMS: RoomDef[] = [
  {
    name: '竹林 · 入山',
    seed: 'bamboo-room-1',
    waves: [
      [R('bandit'), R('bandit')],
      [R('bandit'), R('thrower'), R('bandit')],
    ],
  },
  {
    name: '竹林 · 深处',
    seed: 'bamboo-room-2',
    waves: [
      [R('bandit'), R('thrower'), R('bandit')],
      [L('bandit'), R('bandit'), R('bandit')],
      [R('thrower'), L('thrower'), R('bandit')],
    ],
  },
  {
    name: '竹林 · 山寨前',
    seed: 'bamboo-room-3',
    waves: [
      [R('bandit'), L('bandit'), R('thrower')],
      [R('chief'), R('bandit')],
    ],
  },
];

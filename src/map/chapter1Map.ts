import type { ArtSlot } from '../art/slots';
import type { EnemyId } from '../characters/bandits';

/**
 * 第一章 · 竹林的大地图（斜俯视）。坐标是地面上的位置，单位和设计画面一样是像素，
 * x 往右、y 往"画面下方"（离镜头越近 y 越大）。
 *
 * 一条青石板路从左下的入山口蜿蜒到右上的山寨，沿路是几片空地（区域）：
 * 入山 → 深处 → 任新野的茶摊 → 山寨前 → 胖虎山寨。路两边是密密的竹林，走不进去。
 */

export interface Pt {
  x: number;
  y: number;
}

export interface MapArea {
  id: string;
  name: string;
  /** 走进这片区域时一闪而过的题卡用哪张画 */
  art: ArtSlot;
  /** 空地的中心和半径：竹子不长在这里面，走进来就算到了这片区域 */
  center: Pt;
  radius: number;
}

export const CHAPTER1_MAP = {
  width: 6400,
  height: 4400,
  /** 主角出场的位置 */
  start: { x: 640, y: 3960 },
  /** 石板路的走向（折线），路宽 */
  path: [
    { x: 520, y: 4200 },
    { x: 700, y: 3800 },
    { x: 1250, y: 3480 },
    { x: 1800, y: 3300 },
    { x: 2350, y: 2900 },
    { x: 2700, y: 2500 },
    { x: 3300, y: 2300 },
    { x: 3900, y: 2250 },
    { x: 4350, y: 1850 },
    { x: 4700, y: 1450 },
    { x: 5250, y: 1150 },
    { x: 5650, y: 820 },
  ] as Pt[],
  pathWidth: 200,
  areas: [
    { id: 'entrance', name: '竹林 · 入山', art: 'bg_room1', center: { x: 1250, y: 3480 }, radius: 420 },
    { id: 'deep', name: '竹林 · 深处', art: 'bg_room2', center: { x: 2650, y: 2580 }, radius: 460 },
    { id: 'teahouse', name: '任新野的茶摊', art: 'bg_shop', center: { x: 3700, y: 2230 }, radius: 340 },
    { id: 'campFront', name: '竹林 · 山寨前', art: 'bg_room3', center: { x: 4700, y: 1450 }, radius: 440 },
    { id: 'camp', name: '胖虎山寨', art: 'bg_boss', center: { x: 5600, y: 820 }, radius: 560 },
  ] as MapArea[],
  /**
   * 路上守着的山贼：主角走近了才动手。
   * （第 4 阶段改成走进空地两边合上竹篱、一波一波打）
   */
  guards: [
    { id: 'bandit', at: { x: 2570, y: 2500 } },
    { id: 'bandit', at: { x: 2730, y: 2530 } },
    { id: 'bandit', at: { x: 2640, y: 2690 } },
    { id: 'thrower', at: { x: 2820, y: 2400 } },
    { id: 'bandit', at: { x: 4600, y: 1420 } },
    { id: 'bandit', at: { x: 4800, y: 1520 } },
    { id: 'thrower', at: { x: 4880, y: 1320 } },
    { id: 'chief', at: { x: 4720, y: 1360 } },
  ] as { id: EnemyId; at: Pt }[],
  /** 胖虎守在山寨里 */
  boss: { x: 5640, y: 740 },
  /** 竹子长多密：每多少平方像素长一丛 */
  bambooDensity: 36000,
  seed: 'chapter1-bamboo',
};

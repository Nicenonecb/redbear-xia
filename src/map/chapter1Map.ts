import type { ArtSlot } from '../art/slots';

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
  /** 这片空地里打哪一场遭遇战（chapter1.ts 的 CHAPTER1_ROOMS 下标） */
  room?: number;
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
    { id: 'entrance', name: '竹林 · 入山', art: 'bg_room1', center: { x: 1250, y: 3480 }, radius: 420, room: 0 },
    { id: 'deep', name: '竹林 · 深处', art: 'bg_room2', center: { x: 2650, y: 2580 }, radius: 460, room: 1 },
    { id: 'teahouse', name: '任新野的茶摊', art: 'bg_shop', center: { x: 3700, y: 2230 }, radius: 340 },
    { id: 'campFront', name: '竹林 · 山寨前', art: 'bg_room3', center: { x: 4700, y: 1450 }, radius: 440, room: 2 },
    { id: 'camp', name: '胖虎山寨', art: 'bg_boss', center: { x: 5600, y: 820 }, radius: 560 },
  ] as MapArea[],
  /** 任新野站在茶摊右前方招呼客人 */
  renXinye: { x: 3800, y: 2200 },
  /** 读档时主角出现在哪儿：按一局走到第几步（chapter1.ts 的 CHAPTER1_STEPS） */
  respawn: [
    { x: 640, y: 3960 },
    { x: 1250, y: 3480 },
    { x: 2650, y: 2580 },
    { x: 3700, y: 2300 },
    { x: 4700, y: 1450 },
  ] as Pt[],
  /**
   * 地图上摆的大件（第三批的地图物件图）：落地点、画多宽、脚下有多大一块走不过去（r）。
   * flat 是铺在地上的（虎皮），永远画在人底下
   */
  decor: [
    // 入山口的路牌
    { slot: 'prop_signpost', at: { x: 840, y: 3960 }, width: 110 },
    // 任新野的茶摊
    { slot: 'prop_teastall', at: { x: 3660, y: 2150 }, width: 320, r: 85, solidAt: { x: 3660, y: 2100 } },
    // 山寨：寨门（两根门柱挡路）、聚义厅、火盆、旗、瞭望楼、兵器架、虎皮
    { slot: 'prop_camp_gate', at: { x: 5180, y: 1200 }, width: 380, solids: [{ x: 5010, y: 1195, r: 30 }, { x: 5350, y: 1195, r: 30 }] },
    { slot: 'prop_camp_hall', at: { x: 5640, y: 480 }, width: 600, r: 170, solidAt: { x: 5640, y: 330 } },
    { slot: 'prop_brazier', at: { x: 5420, y: 540 }, width: 90, r: 24 },
    { slot: 'prop_brazier', at: { x: 5860, y: 540 }, width: 90, r: 24 },
    { slot: 'prop_banner', at: { x: 5300, y: 880 }, width: 120, r: 12 },
    { slot: 'prop_banner', at: { x: 5990, y: 760 }, width: 120, r: 12 },
    { slot: 'prop_watchtower', at: { x: 5130, y: 900 }, width: 220, r: 45 },
    { slot: 'prop_watchtower', at: { x: 6060, y: 1000 }, width: 220, r: 45 },
    { slot: 'prop_weapon_rack', at: { x: 5920, y: 640 }, width: 170, r: 40 },
    { slot: 'prop_tiger_rug', at: { x: 5640, y: 600 }, width: 230, flat: true },
  ] as { slot: ArtSlot; at: Pt; width: number; r?: number; solidAt?: Pt; solids?: (Pt & { r: number })[]; flat?: boolean }[],
  /** 山寨南边一圈木栅寨墙：沿空地边缘从这个角度摆到那个角度（度，0 是正右、90 是正下），寨门那里空出来 */
  campWall: { from: 15, to: 170, gap: [125, 152] as [number, number], radius: 600, width: 300 },
  /** 胖虎守在山寨里 */
  boss: { x: 5640, y: 740 },
  /** 竹子长多密：每多少平方像素长一丛 */
  bambooDensity: 36000,
  seed: 'chapter1-bamboo',
};

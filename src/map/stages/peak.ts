import type { MapDef } from '../chapter1Map';

/**
 * 第三关 · 山峰：又窄又高的一张图。一条长长的石阶笔直往上，两边都是云海；
 * 半山横过一座斜着的云海栈桥，桥中间打一场；过了桥接着往上是破庙（任新野的茶摊）、
 * 宫门外，最后开阔成行宫前的大平台，彰化天站在正中。
 */
const STAIRS = 160;
const BRIDGE = 140;

/** 栈道图（prop_plank_road）远侧栏杆柱顶那条线，往上是画到图边的崖壁，剪掉 */
const PLANK_CLIP: [number, number, number, number] = [0.07, 0.07, 0.91, 0.55];

export const PEAK_MAP: MapDef = {
  width: 3600,
  height: 7000,
  start: { x: 2400, y: 6550 },
  path: [
    // 第一段石阶：从山门笔直往上
    { x: 2400, y: 6800, w: STAIRS, edge: 'mist' },
    { x: 2400, y: 6300, w: STAIRS, edge: 'mist' },
    { x: 2400, y: 5850, w: STAIRS, edge: 'mist' },
    { x: 2400, y: 5050, w: STAIRS, edge: 'mist' },
    // 云海栈桥：斜着横过去
    { x: 2350, y: 4800, w: BRIDGE, edge: 'mist' },
    { x: 1750, y: 4590, w: BRIDGE, edge: 'mist' },
    { x: 1150, y: 4380, w: STAIRS, edge: 'mist' },
    // 第二段石阶到破庙
    { x: 1150, y: 3500, w: STAIRS, edge: 'mist' },
    { x: 1150, y: 3100, w: STAIRS, edge: 'mist' },
    // 折向正中，第三段石阶到宫门外
    { x: 1800, y: 2700, w: STAIRS, edge: 'mist' },
    { x: 1800, y: 2300, w: STAIRS, edge: 'mist' },
    { x: 1800, y: 1700, w: STAIRS, edge: 'mist' },
    { x: 1800, y: 1000 },
  ],
  pathWidth: 200,
  areas: [
    { id: 'entrance', name: '山峰 · 石阶', art: 'bg_peak_palace', center: { x: 2400, y: 5850 }, radius: 400, room: 0 },
    { id: 'deep', name: '山峰 · 云海栈桥', art: 'bg_peak_palace', center: { x: 1750, y: 4590 }, radius: 360, room: 1 },
    { id: 'teahouse', name: '任新野的破庙', art: 'bg_peak_palace', center: { x: 1150, y: 3500 }, radius: 340 },
    { id: 'campFront', name: '山峰 · 宫门外', art: 'bg_peak_palace', center: { x: 1800, y: 2300 }, radius: 440, room: 2 },
    { id: 'camp', name: '山峰 · 行宫', art: 'bg_peak_palace', center: { x: 1800, y: 950 }, radius: 700 },
  ],
  renXinye: { x: 1250, y: 3470 },
  respawn: [
    { x: 2400, y: 6550 },
    { x: 2400, y: 5850 },
    { x: 1750, y: 4590 },
    { x: 1150, y: 3570 },
    { x: 1800, y: 2300 },
  ],
  decor: [
    { slot: 'prop_broken_stele', at: { x: 2610, y: 6450 }, width: 170, r: 30 },
    // 栈桥：木栈道的走向正好是这座桥的斜度
    { slot: 'prop_plank_road', at: { x: 2050, y: 4900 }, width: 720, flat: true, clipAbove: PLANK_CLIP },
    { slot: 'prop_plank_road', at: { x: 1450, y: 4690 }, width: 720, flat: true, clipAbove: PLANK_CLIP },
    // 破庙
    { slot: 'prop_temple_ruin', at: { x: 1060, y: 3330 }, width: 400, r: 90, solidAt: { x: 1060, y: 3250 } },
    { slot: 'prop_incense_burner', at: { x: 1330, y: 3380 }, width: 130, r: 30 },
    // 宫门外：残碑、龙旗
    { slot: 'prop_broken_stele', at: { x: 1460, y: 2020 }, width: 180, r: 35 },
    { slot: 'prop_old_dragon_banner', at: { x: 2130, y: 2020 }, width: 150, r: 15 },
    { slot: 'prop_old_dragon_banner', at: { x: 1470, y: 2560 }, width: 150, r: 15 },
    // 行宫前的大平台：宫门在最里面，石狮、香炉、龙旗分列两边
    { slot: 'prop_palace_gate', at: { x: 1800, y: 260 }, width: 650, r: 170, solidAt: { x: 1800, y: 130 } },
    { slot: 'prop_stone_lion', at: { x: 1330, y: 470 }, width: 180, r: 40 },
    { slot: 'prop_stone_lion', at: { x: 2270, y: 470 }, width: 180, r: 40, flip: true },
    { slot: 'prop_incense_burner', at: { x: 1540, y: 400 }, width: 120, r: 28 },
    { slot: 'prop_incense_burner', at: { x: 2060, y: 400 }, width: 120, r: 28 },
    { slot: 'prop_old_dragon_banner', at: { x: 1170, y: 1050 }, width: 150, r: 12 },
    { slot: 'prop_old_dragon_banner', at: { x: 2430, y: 1050 }, width: 150, r: 12 },
  ],
  campWall: { from: 1, to: 0, gap: [0, 0], radius: 600, width: 300 },
  boss: { x: 1800, y: 900 },
  bambooDensity: 65000,
  seed: 'peak-palace',
  // 石阶两边、栈桥上下的云海
  clouds: [
    { at: { x: 1700, y: 6500 }, width: 1000 },
    { at: { x: 3100, y: 6100 }, width: 900 },
    { at: { x: 1600, y: 5400 }, width: 900 },
    { at: { x: 3100, y: 5200 }, width: 800 },
    { at: { x: 2600, y: 4500 }, width: 1000 },
    { at: { x: 1000, y: 4950 }, width: 1000 },
    { at: { x: 400, y: 3900 }, width: 800 },
    { at: { x: 1900, y: 3700 }, width: 900 },
    { at: { x: 2600, y: 2900 }, width: 900 },
    { at: { x: 800, y: 2400 }, width: 900 },
    { at: { x: 2900, y: 1800 }, width: 900 },
    { at: { x: 500, y: 1500 }, width: 800 },
  ],
};

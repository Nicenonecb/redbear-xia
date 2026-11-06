import type { MapDef } from '../chapter1Map';

/**
 * 第二关 · 山腰：之字形盘山路，从山脚的林子口一路来回折三次爬上去。
 *
 *   第一折（最下面，往右）：松林入口的遭遇战，路宽平稳；
 *   第二折（往左回头）：中段是一截贴着崖壁的栈道——路只有 120 宽，画面下方那一侧是悬崖云海，
 *     栈道中间崖壁凹进去一块平台，就在那儿打第二场遭遇战；
 *   第三折（再往右）：任新野的驿站、兵营外的遭遇战；
 *   最后一小段折回来，上到山腰顶上平坦的演武场，鲍金梁在擂台上等着。
 *
 * 各折之间隔着八九百像素的松林，走不过去，只能顺着路绕。
 */
const NARROW = 120;

/** 栈道图（prop_plank_road）远侧栏杆柱顶那条线，往上是画到图边的崖壁，剪掉 */
const PLANK_CLIP: [number, number, number, number] = [0.07, 0.07, 0.91, 0.55];

export const WAIST_MAP: MapDef = {
  width: 5500,
  height: 5700,
  start: { x: 600, y: 5200 },
  path: [
    // 第一折
    { x: 450, y: 5480 },
    { x: 650, y: 5160 },
    { x: 1200, y: 4950 },
    { x: 2300, y: 4900 },
    { x: 3400, y: 4800 },
    { x: 4500, y: 4650 },
    { x: 5050, y: 4350 },
    // 拐回头
    { x: 5000, y: 3950 },
    // 第二折：栈道（窄、下方悬崖），中间一块崖边平台
    { x: 4500, y: 3800, w: NARROW, edge: 'cliff' },
    { x: 3800, y: 3550, w: NARROW, edge: 'cliff' },
    { x: 3150, y: 3330, w: NARROW, edge: 'cliff' },
    { x: 2450, y: 3080 },
    { x: 1650, y: 2980 },
    { x: 950, y: 2850 },
    // 第三折
    { x: 750, y: 2450 },
    { x: 1450, y: 2300 },
    { x: 2400, y: 2200 },
    { x: 3400, y: 2050 },
    { x: 4300, y: 1900 },
    { x: 4900, y: 1600 },
    // 最后一小段上演武场
    { x: 4850, y: 1150 },
    { x: 4300, y: 840 },
    { x: 3520, y: 820 },
  ],
  pathWidth: 200,
  areas: [
    { id: 'entrance', name: '山腰 · 松林入口', art: 'bg_waist_path', center: { x: 1200, y: 4950 }, radius: 420, room: 0 },
    { id: 'deep', name: '山腰 · 栈道', art: 'bg_waist_path', center: { x: 3150, y: 3330 }, radius: 330, room: 1 },
    { id: 'teahouse', name: '任新野的驿站', art: 'bg_waist_path', center: { x: 1450, y: 2300 }, radius: 340 },
    { id: 'campFront', name: '山腰 · 兵营外', art: 'bg_waist_duel', center: { x: 3400, y: 2050 }, radius: 440, room: 2 },
    { id: 'camp', name: '山腰 · 演武场', art: 'bg_waist_duel', center: { x: 3500, y: 800 }, radius: 620 },
  ],
  renXinye: { x: 1550, y: 2270 },
  respawn: [
    { x: 600, y: 5200 },
    { x: 1200, y: 4950 },
    { x: 3150, y: 3330 },
    { x: 1450, y: 2370 },
    { x: 3400, y: 2050 },
  ],
  decor: [
    { slot: 'prop_signpost', at: { x: 820, y: 5230 }, width: 110 },
    // 栈道：两截木栈道贴着崖壁，图上的走向正好是这两段路的斜度
    { slot: 'prop_plank_road', at: { x: 4150, y: 3880 }, width: 820, flat: true, clipAbove: PLANK_CLIP },
    { slot: 'prop_plank_road', at: { x: 2800, y: 3410 }, width: 820, flat: true, clipAbove: PLANK_CLIP },
    // 驿站
    { slot: 'prop_teastall', at: { x: 1410, y: 2220 }, width: 320, r: 85, solidAt: { x: 1410, y: 2170 } },
    { slot: 'prop_hitching_post', at: { x: 1710, y: 2180 }, width: 130, r: 25 },
    // 兵营外：空地北边一排军帐，路边旗和矛架
    { slot: 'prop_army_tent', at: { x: 3130, y: 1690 }, width: 340, r: 65 },
    { slot: 'prop_army_tent', at: { x: 3700, y: 1680 }, width: 320, r: 60 },
    { slot: 'prop_weapon_rack_spear', at: { x: 3420, y: 1640 }, width: 200, r: 35 },
    { slot: 'prop_war_banner', at: { x: 2980, y: 2330 }, width: 125, r: 12 },
    { slot: 'prop_war_banner', at: { x: 3840, y: 2320 }, width: 125, r: 12 },
    // 演武场：擂台后面是点将台，四角旗、矛架
    { slot: 'prop_command_stage', at: { x: 3500, y: 230 }, width: 510 },
    { slot: 'prop_war_banner', at: { x: 3020, y: 420 }, width: 135 },
    { slot: 'prop_war_banner', at: { x: 3980, y: 420 }, width: 135 },
    { slot: 'prop_weapon_rack_spear', at: { x: 4030, y: 780 }, width: 210 },
    { slot: 'prop_weapon_rack_spear', at: { x: 2960, y: 800 }, width: 210, flip: true },
  ],
  campWall: { from: 1, to: 0, gap: [0, 0], radius: 600, width: 300 },
  boss: { x: 3500, y: 760 },
  bambooDensity: 36000,
  seed: 'waist-pine',
  // 栈道下方的云海，还有山腰边上缠着的几缕
  clouds: [
    { at: { x: 4500, y: 4150 }, width: 900 },
    { at: { x: 3600, y: 3950 }, width: 1000 },
    { at: { x: 2700, y: 3700 }, width: 900 },
    { at: { x: 400, y: 3600 }, width: 700 },
    { at: { x: 5200, y: 2600 }, width: 700 },
    { at: { x: 600, y: 1300 }, width: 800 },
  ],
};

import { FOOT_MAP } from './foot';

export const PEAK_MAP = structuredClone(FOOT_MAP);
PEAK_MAP.seed = 'peak-palace';
PEAK_MAP.bambooDensity = 65000;
PEAK_MAP.areas.forEach((a, i) => {
  a.name = ['山峰 · 石阶', '山峰 · 云海栈桥', '任新野的破庙', '山峰 · 宫门外', '山峰 · 行宫'][i];
  a.art = 'bg_peak_palace';
});
PEAK_MAP.decor = [
  { slot: 'prop_broken_stele', at: { x: 930, y: 3700 }, width: 180 },
  { slot: 'prop_plank_road', at: { x: 2200, y: 3220 }, width: 780, flat: true },
  { slot: 'prop_temple_ruin', at: { x: 3550, y: 2110 }, width: 400, r: 90, solidAt: { x: 3550, y: 2030 } },
  { slot: 'prop_incense_burner', at: { x: 3900, y: 2050 }, width: 130, r: 30 },
  { slot: 'prop_broken_stele', at: { x: 4450, y: 1450 }, width: 180, r: 35 },
  { slot: 'prop_old_dragon_banner', at: { x: 4930, y: 1260 }, width: 150, r: 15 },
  { slot: 'prop_palace_gate', at: { x: 5640, y: 390 }, width: 650, r: 170, solidAt: { x: 5640, y: 260 } },
  { slot: 'prop_stone_lion', at: { x: 5210, y: 600 }, width: 180, r: 40 },
  { slot: 'prop_stone_lion', at: { x: 6060, y: 600 }, width: 180, r: 40 },
  { slot: 'prop_incense_burner', at: { x: 5400, y: 460 }, width: 120, r: 28 },
  { slot: 'prop_incense_burner', at: { x: 5880, y: 460 }, width: 120, r: 28 },
  { slot: 'prop_old_dragon_banner', at: { x: 5150, y: 960 }, width: 150, r: 12 },
  { slot: 'prop_old_dragon_banner', at: { x: 6130, y: 960 }, width: 150, r: 12 },
];
PEAK_MAP.campWall = { ...PEAK_MAP.campWall, from: 1, to: 0 };

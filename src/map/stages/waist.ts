import { FOOT_MAP } from './foot';

// Keep the validated encounter spaces; dress the mountain in pine, military tents and a dueling yard.
export const WAIST_MAP = structuredClone(FOOT_MAP);
WAIST_MAP.seed = 'waist-pine';
WAIST_MAP.areas.forEach((a, i) => {
  a.name = ['山腰 · 松林入口', '山腰 · 栈道', '任新野的驿站', '山腰 · 兵营外', '山腰 · 演武场'][i];
  a.art = ['bg_waist_path', 'bg_waist_path', 'bg_waist_path', 'bg_waist_duel', 'bg_waist_duel'][i] as typeof a.art;
});
WAIST_MAP.decor = [
  { slot: 'prop_signpost', at: { x: 840, y: 3960 }, width: 110 },
  { slot: 'prop_plank_road', at: { x: 2200, y: 3220 }, width: 780, flat: true },
  { slot: 'prop_teastall', at: { x: 3660, y: 2150 }, width: 320, r: 85, solidAt: { x: 3660, y: 2100 } },
  { slot: 'prop_hitching_post', at: { x: 3960, y: 2100 }, width: 130, r: 25 },
  { slot: 'prop_army_tent', at: { x: 4520, y: 1210 }, width: 350, r: 65 },
  { slot: 'prop_army_tent', at: { x: 4940, y: 1590 }, width: 310, r: 60 },
  { slot: 'prop_weapon_rack_spear', at: { x: 4750, y: 1140 }, width: 200, r: 35 },
  { slot: 'prop_war_banner', at: { x: 5000, y: 1500 }, width: 125, r: 12 },
  // Set the command platform behind the ring so its footprint cannot obstruct the duel.
  { slot: 'prop_command_stage', at: { x: 5640, y: 250 }, width: 510 },
  { slot: 'prop_war_banner', at: { x: 5190, y: 450 }, width: 135 },
  { slot: 'prop_war_banner', at: { x: 6120, y: 450 }, width: 135 },
  { slot: 'prop_weapon_rack_spear', at: { x: 6140, y: 800 }, width: 210 },
];
WAIST_MAP.campWall = { ...WAIST_MAP.campWall, from: 1, to: 0 };

import type { ArtSlot } from '../../art/slots';
import { FOOT_MAP } from './foot';
export const PEAK_MAP = structuredClone(FOOT_MAP);
PEAK_MAP.areas.forEach(a => a.name = '山峰 · ' + a.name.split(' · ').at(-1));

PEAK_MAP.seed='peak-palace';
PEAK_MAP.areas.forEach((a,i)=>a.name=['山峰 · 石阶','山峰 · 云海栈桥','任新野的破庙','山峰 · 宫门外','山峰 · 行宫'][i]);
PEAK_MAP.decor=PEAK_MAP.decor.map(d=>({...d,slot:({'prop_camp_hall':'prop_palace_gate','prop_banner':'prop_old_dragon_banner','prop_watchtower':'prop_stone_lion','prop_teastall':'prop_temple_ruin','prop_brazier':'prop_incense_burner'} as Record<string,ArtSlot>)[d.slot]??d.slot}));

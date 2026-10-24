import { FOOT_MAP } from './foot';
export const WAIST_MAP = structuredClone(FOOT_MAP);
WAIST_MAP.areas.forEach(a => a.name = '山腰 · ' + a.name.split(' · ').at(-1));

WAIST_MAP.seed='waist-pine';
WAIST_MAP.areas.forEach((a,i)=>a.name=['山腰 · 松林入口','山腰 · 栈道','任新野的驿站','山腰 · 兵营外','山腰 · 演武场'][i]);
WAIST_MAP.decor = WAIST_MAP.decor.filter(d=>!['prop_camp_hall','prop_tiger_rug'].includes(d.slot));

WAIST_MAP.decor.push({slot:'prop_army_tent' as typeof WAIST_MAP.decor[number]['slot'],at:{x:5400,y:470},width:260}, {slot:'prop_command_stage' as typeof WAIST_MAP.decor[number]['slot'],at:{x:5640,y:350},width:250}, {slot:'prop_war_banner' as typeof WAIST_MAP.decor[number]['slot'],at:{x:6000,y:550},width:110});

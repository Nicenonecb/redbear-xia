import { FOOT_MAP } from './foot';
export const WAIST_MAP = structuredClone(FOOT_MAP);
WAIST_MAP.areas.forEach(a => a.name = '山腰 · ' + a.name.split(' · ').at(-1));

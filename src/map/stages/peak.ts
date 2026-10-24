import { FOOT_MAP } from './foot';
export const PEAK_MAP = structuredClone(FOOT_MAP);
PEAK_MAP.areas.forEach(a => a.name = '山峰 · ' + a.name.split(' · ').at(-1));

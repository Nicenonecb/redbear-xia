import { CHAPTER1_ROOMS, CHAPTER1_STEPS, CHAPTER1_SHOP_LINES, CHAPTER1_LETTERS, type RoomDef, type ChapterStep } from './chapter1';
import type { HeroId } from './progression';
import { FOOT_MAP } from '../map/stages/foot';
import { WAIST_MAP } from '../map/stages/waist';
import { PEAK_MAP } from '../map/stages/peak';
export type StageId = 'foot' | 'waist' | 'peak';
export type BossId = 'pangHu' | 'baoJinliang' | 'zhangHuatian';
export type MapDef = typeof FOOT_MAP;
export type ShopLines = typeof CHAPTER1_SHOP_LINES;
export interface StageDef {
  id: StageId; name: string; map: MapDef; rooms: RoomDef[];
  steps: ChapterStep[]; boss: BossId; shopLines: ShopLines;
  letters: Record<HeroId, string>; ambient: string;
}
export const STAGES: StageDef[] = [
  { id: 'foot', name: '山脚 · 竹林', map: FOOT_MAP },
  { id: 'waist', name: '山腰 · 兵营', map: WAIST_MAP },
  { id: 'peak', name: '山峰 · 行宫', map: PEAK_MAP },
].map(s => ({ ...s, id: s.id as StageId, rooms: structuredClone(CHAPTER1_ROOMS), steps: CHAPTER1_STEPS.filter(s => s.kind !== 'letter'), boss: 'pangHu', shopLines: { ...CHAPTER1_SHOP_LINES }, letters: { ...CHAPTER1_LETTERS }, ambient: 'wind' }));
export const stageFor = (run: { stage: number }) => STAGES[run.stage];
export const stepOf = (stage: StageDef, kind: ChapterStep['kind']) => stage.steps.findIndex(s => s.kind === kind);
export const roomStepOf = (stage: StageDef, room: number) => stage.steps.findIndex(s => s.kind === 'room' && s.room === room);

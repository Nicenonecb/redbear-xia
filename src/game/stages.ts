import { CHAPTER1_ROOMS, CHAPTER1_STEPS, CHAPTER1_SHOP_LINES, type RoomDef, type ChapterStep } from './chapter1';
import { LETTERS } from './story';
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
  letters: Record<HeroId, { sword: string; bribe: string }>; ambient: string;
}
export const STAGES: StageDef[] = [
  { id: 'foot', name: '山脚 · 竹林', map: FOOT_MAP },
  { id: 'waist', name: '山腰 · 兵营', map: WAIST_MAP },
  { id: 'peak', name: '山峰 · 行宫', map: PEAK_MAP },
].map((s, i) => ({ ...s, id: s.id as StageId, rooms: structuredClone(CHAPTER1_ROOMS), steps: CHAPTER1_STEPS.filter(s => s.kind !== 'letter'), boss: 'pangHu', shopLines: { ...CHAPTER1_SHOP_LINES }, letters: { wenShaohua: LETTERS.wenShaohua[i], yuWuxia: LETTERS.yuWuxia[i] }, ambient: 'wind' }));
export const stageFor = (run: { stage: number }) => STAGES[run.stage];
export const stepOf = (stage: StageDef, kind: ChapterStep['kind']) => stage.steps.findIndex(s => s.kind === kind);
export const roomStepOf = (stage: StageDef, room: number) => stage.steps.findIndex(s => s.kind === 'room' && s.room === room);

STAGES[0].shopLines.intel = '胖虎后院关着抢来的姑娘。\n他还有两个结拜哥哥，粮草兵器一车车往山上送。';

STAGES[1].boss = 'baoJinliang';
STAGES[1].rooms.forEach((r,i)=> {r.name=['松林入口','栈道','兵营外'][i];r.waves.forEach(w=>w.forEach(s=>s.enemy=({bandit:'spearman',thrower:'archer',chief:'drillmaster'} as const)[s.enemy as 'bandit'|'thrower'|'chief']));});
STAGES[1].shopLines = {...CHAPTER1_SHOP_LINES,greeting:'又见面了！山腰驿站，还是任某先到。',intel:'鲍金梁原是武官，比武打死同僚才落草。\n他最爱单挑，可别以为他真讲规矩。'};

STAGES[2].boss='zhangHuatian';
STAGES[2].rooms.forEach((r,i)=>{r.name=['石阶','云海栈桥','宫门外'][i];r.waves.forEach(w=>w.forEach(s=>s.enemy=({bandit:'swordsman',thrower:'bannerman',chief:'captain'} as const)[s.enemy as 'bandit'|'thrower'|'chief']));});
STAGES[2].shopLines={...CHAPTER1_SHOP_LINES,greeting:'破庙也能开茶摊，少侠又慢了一步。',intel:'彰化天是前朝皇子，想借两个兄弟招兵买马。\n他明年要打杭州。护心符，或许能保你一命。'};

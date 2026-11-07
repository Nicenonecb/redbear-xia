import { ENEMIES as BANDITS, ENEMY_INTROS as BANDIT_INTROS } from './bandits';
import { LOYALISTS } from './loyalists';
import { SOLDIERS } from './soldiers';
import type { ArtSlot } from '../art/slots';
export const ENEMIES = { ...BANDITS, ...SOLDIERS, ...LOYALISTS };
export type EnemyId = keyof typeof ENEMIES;
export const ENEMY_INTROS: Record<EnemyId, { slot: ArtSlot; tier: string; tip: string }> = {
  ...BANDIT_INTROS,
  swordsman: { slot: 'portrait_bandit', tier: '小怪', tip: '快刺会后跳，等他落地再追。' },
  bannerman: { slot: 'portrait_bandit', tier: '小怪', tip: '举旗给同伴加速，先打旗手。' },
  captain: { slot: 'portrait_chief', tier: '大怪', tip: '双刀旋风，闪出红圈。' },
  spearman: { slot: 'portrait_bandit', tier: '小怪', tip: '长矛直刺，往侧面闪。' },
  archer: { slot: 'portrait_thrower', tier: '小怪', tip: '箭快伤轻，靠近打断。' },
  drillmaster: { slot: 'portrait_chief', tier: '大怪', tip: '霸体横扫，避开红圈。' },
};

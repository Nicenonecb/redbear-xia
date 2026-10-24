import { ENEMIES as BANDITS, ENEMY_INTROS as BANDIT_INTROS } from './bandits';
import { SOLDIERS } from './soldiers';
import type { ArtSlot } from '../art/slots';
export const ENEMIES={...BANDITS,...SOLDIERS};
export type EnemyId=keyof typeof ENEMIES;
export const ENEMY_INTROS: Record<EnemyId,{slot:ArtSlot;tier:string;tip:string}>={...BANDIT_INTROS,
 spearman:{slot:'portrait_bandit',tier:'小怪',tip:'长矛直刺，往侧面闪。'},
 archer:{slot:'portrait_thrower',tier:'小怪',tip:'箭快伤轻，靠近打断。'},
 drillmaster:{slot:'portrait_chief',tier:'大怪',tip:'霸体横扫，避开红圈。'}
};

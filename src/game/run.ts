import { PROGRESSION, WEAPONS, type HeroId, type StatId } from './progression';

/**
 * 一局的状态：选了谁、走到第几步、气血、等级、铜钱、武器。
 * 换场景时由场景读出来、离开时写回去；死了就整局作废（roguelike）。
 */
export interface RunState {
  hero: HeroId;
  /** 第一章流程走到第几步，见 chapter1.ts 的 CHAPTER1_STEPS */
  step: number;
  hp: number;
  level: number;
  exp: number;
  /** 攒着还没选的升级次数，清场后一次选完 */
  pendingLevelUps: number;
  coins: number;
  stats: Record<StatId, number>;
  weapon: { tier: number; refine: number };
  /** 这一章红熊是否已经救过场 */
  rescueUsed: boolean;
}

/** 主角的基础气血 */
const BASE_HP = 100;

let current: RunState | null = null;

export function startRun(hero: HeroId): RunState {
  current = {
    hero,
    step: 0,
    hp: BASE_HP,
    level: 1,
    exp: 0,
    pendingLevelUps: 0,
    coins: 0,
    stats: { attack: 0, vitality: 0, agility: 0 },
    weapon: { tier: 0, refine: 0 },
    rescueUsed: false,
  };
  return current;
}

export function getRun() {
  return current;
}

/** 读档时用 */
export function setRun(run: RunState | null) {
  current = run;
}

export function endRun() {
  current = null;
}

/** 由等级加点和武器算出来的实际属性 */
export function runStats(run: RunState) {
  const L = PROGRESSION.levelUp;
  const weapon = WEAPONS[run.hero][run.weapon.tier];
  return {
    maxHp: BASE_HP + run.stats.vitality * L.vitality.hp,
    damageScale:
      weapon.damage * (1 + run.weapon.refine * PROGRESSION.shop.refine.bonus) * (1 + run.stats.attack * L.attack.damage),
    speedScale: 1 + run.stats.agility * L.agility.speed,
    evadeBonus: run.stats.agility * L.agility.evadeFrames,
    weaponName: weapon.name + (run.weapon.refine ? ` +${run.weapon.refine}` : ''),
  };
}

/** 加经验，返回这次升了几级 */
export function gainExp(run: RunState, amount: number) {
  run.exp += amount;
  let gained = 0;
  while (run.exp >= PROGRESSION.expToNext(run.level)) {
    run.exp -= PROGRESSION.expToNext(run.level);
    run.level++;
    gained++;
  }
  run.pendingLevelUps += gained;
  return gained;
}

/** 加一点属性。气血加点顺带回的那 20 点由场景加到主角身上 */
export function applyLevelUp(run: RunState, stat: StatId) {
  run.stats[stat]++;
  run.pendingLevelUps = Math.max(0, run.pendingLevelUps - 1);
}

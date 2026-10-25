import { PROGRESSION, WEAPONS, type HeroId, type StatId } from './progression';
import { clearSave, saveRun } from './save';

/** 由一局成长计算的战斗属性。 */
export interface FighterStats {
  hp: number;
  maxHp: number;
  damageScale: number;
  speedScale: number;
  evadeBonus: number;
}

/**
 * 一局的状态：选了谁、走到第几步、气血、等级、铜钱、武器。
 * 换场景时由场景读出来、离开时写回去；死了就整局作废（roguelike）。
 */
export interface RunState {
  hero: HeroId;
  /** 自动验收可固定随机序列；正常游玩省略 */
  seed?: string;
  heartCharm?: boolean;
  charmBought?: boolean;
  paidOff?: boolean;
  /** 第几关，以及本关内的关口（均从 0 开始） */
  stage: number;
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
  /** 临时的一局（调试快捷键），不写存档 */
  temporary?: boolean;
  /** 这一局已经见过哪些敌人（第一次见才弹登场提示） */
  seenEnemies?: string[];
}

/** 主角的基础气血 */
const BASE_HP = 100;

let current: RunState | null = null;

/** persist 为 false 时不写存档：调试快捷键开的临时一局 */
export function startRun(hero: HeroId, persist = true): RunState {
  current = {
    hero,
    stage: 0,
    step: 0,
    hp: BASE_HP,
    level: 1,
    exp: 0,
    pendingLevelUps: 0,
    coins: 0,
    stats: { attack: 0, vitality: 0, agility: 0 },
    weapon: { tier: 0, refine: 0 },
    rescueUsed: false,
    temporary: !persist,
  };
  saveRun(current);
  return current;
}

export function getRun() {
  return current;
}

/** 读档时用 */
export function setRun(run: RunState | null) {
  current = run;
}

/**
 * 结束这一局。cleared 为 true（死了、通关）时连存档一起清掉；
 * 只是按 Esc 回标题就保留存档，标题画面可以【继续】
 */
export function endRun(cleared = true) {
  current = null;
  if (cleared) clearSave();
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

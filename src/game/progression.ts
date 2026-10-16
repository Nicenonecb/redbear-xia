/**
 * 成长和经济的全部数值：升级、武器、商店、给钱、红熊救场。调难度只改这里。
 * 第一章的铜钱大约能攒到 130～150 文，正好够在"买新武器"和"留着给胖虎"之间二选一。
 */

export type HeroId = 'wenShaohua' | 'yuWuxia';
export type StatId = 'attack' | 'vitality' | 'agility';

export const PROGRESSION = {
  /** 从 level 升到 level + 1 要多少经验 */
  expToNext: (level: number) => 30 + 20 * (level - 1),

  levelUp: {
    attack: { name: '攻击', detail: '伤害 +15%', damage: 0.15 },
    vitality: { name: '气血', detail: '气血上限 +20\n并回复 20', hp: 20 },
    agility: { name: '身法', detail: '移速 +8%\n闪避无敌 +2 帧', speed: 0.08, evadeFrames: 2 },
  },

  shop: {
    potion: { name: '金疮药', price: 40, heal: 0.5 },
    /** 强化当前武器：每次伤害 +10%，最多 3 次，价格逐次上涨 */
    refine: { prices: [60, 90, 120], bonus: 0.1 },
  },

  /** 胖虎的买路钱 */
  bribe: {
    small: 30,
    /** 给到这么多就放行，大约一次商店消费 */
    enough: 100,
    /** 给到这么多还会多一句意味深长的台词 */
    generous: 150,
  },

  /** 红熊救场：每章一次，气血掉到 below 以下（包括本来会被打死的那一下）时出手 */
  rescue: { below: 0.15, healTo: 0.5 },
};

/** 每位主角的三档武器，damage 是伤害倍率 */
export const WEAPONS: Record<HeroId, { name: string; damage: number; price: number }[]> = {
  wenShaohua: [
    { name: '铁剑', damage: 1, price: 0 },
    { name: '青锋', damage: 1.35, price: 110 },
    { name: '龙泉', damage: 1.75, price: 220 },
  ],
  yuWuxia: [
    { name: '竹扇', damage: 1, price: 0 },
    { name: '铁骨扇', damage: 1.35, price: 110 },
    { name: '玄羽扇', damage: 1.75, price: 220 },
  ],
};

/** 红熊濒死救场时随机说一句 */
export const RESCUE_LINES = ['徒儿，撑住。', '为师还在，倒不了。', '起来，这一课还没上完。'];

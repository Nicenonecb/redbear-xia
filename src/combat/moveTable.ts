import type { Action } from '../input/Controls';

/**
 * 招式表的数据结构。伤害、硬直、位移、无敌、可取消窗口全部写在这里，
 * 动画只读帧号做表现，所以换美术不用改逻辑。
 *
 * 约定：帧数按 60 帧/秒计；帧号从 0 开始，区间两端都包含。
 * 判定框以角色脚底中点为原点：x 沿角色面向为正，y 向上为负，x/y 是框中心。
 */

export type MoveId = string;

export interface FrameRange {
  from: number;
  to: number;
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface HitSpec {
  box: Box;
  damage: number;
  /** 顿帧：命中时攻防双方一起定住的帧数 */
  hitstop: number;
  /** 受击硬直帧数 */
  hitstun: number;
  /** 击退速度（像素/秒），x 沿攻击方向 */
  knockback: { x: number; y: number };
}

/** 在 [from, to] 帧内按下 action，就取消当前招式接 into */
export interface CancelWindow extends FrameRange {
  action: Action;
  into: MoveId;
}

export interface MotionSegment extends FrameRange {
  /** 水平速度（像素/秒），沿面向 */
  vx: number;
  vy?: number;
}

export interface MoveEvent {
  frame: number;
  type: 'sfx' | 'vfx' | 'spawn';
  name: string;
}

/** 蓄力招：起势帧放完后停在最后一帧，按住多久就蓄多久，松手接 release */
export interface HoldSpec {
  action: Action;
  /** 按住多少帧蓄满 */
  fullFrames: number;
  release: MoveId;
}

export interface MoveDef {
  id: MoveId;
  name: string;
  /** 前摇 */
  startup: number;
  /** 判定 */
  active: number;
  /** 收招 */
  recovery: number;
  hit?: HitSpec;
  cancels?: CancelWindow[];
  motion?: MotionSegment[];
  invuln?: FrameRange;
  noGravity?: FrameRange;
  hold?: HoldSpec;
  /** 一次滞空只能用一次（例如空中闪避） */
  oncePerAir?: boolean;
  /** 敌人用：收招结束后自动接这一招（连招） */
  followUp?: MoveId;
  /**
   * 敌人用：前摇提示怎么画。
   * glint：武器上闪一下光；ground：把判定框的横向范围画成地上的红色区域
   */
  telegraph?: 'glint' | 'ground';
  events?: MoveEvent[];
}

/** 飞行道具：剑气、冲击波 */
export interface ProjectileSpec {
  /** 判定框以道具中心为原点 */
  hit: HitSpec;
  speed: number;
  /** 存在多少帧 */
  life: number;
  /** 是否穿透（打中后不消失，同一目标仍只打一次） */
  pierce: boolean;
}

/** 敌人级别。精英这一级先留着，MVP 里还没有精英怪 */
export type EnemyTier = 'minion' | 'brute' | 'elite' | 'boss';

/** 敌人在攻击距离内会从这些招里按权重挑一招 */
export interface EnemyAttack {
  move: MoveId;
  weight: number;
  /** 离玩家在这个距离区间内才会用这招 */
  minDist?: number;
  maxDist: number;
}

/** 普通敌人（小怪、大怪）的数据；Boss 的行为太特殊，单独写 */
export interface EnemyDef {
  id: string;
  name: string;
  tier: EnemyTier;
  hp: number;
  body: { w: number; h: number };
  walkSpeed: number;
  /** 霸体：挨打只闪白、顿帧，不会被打断，也不会被击退 */
  superArmor: boolean;
  /** 想和玩家保持的距离 [最近, 最远]：太近就后退，太远就靠近 */
  range: [number, number];
  /** 两招之间歇多少帧 */
  cooldown: { min: number; max: number };
  moves: Record<MoveId, MoveDef>;
  attacks: EnemyAttack[];
  /** 招式事件 spawn 时放出的飞行道具 */
  projectile?: ProjectileSpec;
  /** 打倒后给的经验和铜钱 [最少, 最多] */
  exp: number;
  coins: [number, number];
  /** 用哪套剪影来画 */
  look: 'bandit' | 'thrower' | 'chief';
}

export interface CharacterDef {
  id: string;
  name: string;
  hp: number;
  moveSpeed: number;
  jumpSpeed: number;
  body: { w: number; h: number };
  moves: Record<MoveId, MoveDef>;
  /** 空闲时按键对应的起手招 */
  neutral: Partial<Record<Action, MoveId>>;
}

export type MovePhase = 'startup' | 'active' | 'recovery';

export const totalFrames = (m: MoveDef) => m.startup + m.active + m.recovery;

export const inRange = (frame: number, r?: FrameRange) => !!r && frame >= r.from && frame <= r.to;

export function byId(moves: MoveDef[]): Record<MoveId, MoveDef> {
  return Object.fromEntries(moves.map((m) => [m.id, m]));
}

/** 加载时检查招式表，写错招式名之类的问题直接报出来，不留到运行时才发现 */
export function validateMoves(owner: string, moves: Record<MoveId, MoveDef>) {
  const fail = (msg: string) => {
    throw new Error(`[招式表] ${owner}：${msg}`);
  };
  const exists = (id: MoveId | undefined, where: string) => {
    if (id && !moves[id]) fail(`${where}引用了不存在的招式 ${id}`);
  };

  for (const [key, m] of Object.entries(moves)) {
    if (m.id !== key) fail(`招式 ${key} 的 id 写成了 ${m.id}`);
    if (m.startup < 1) fail(`${m.id} 至少要有 1 帧前摇`);
    m.cancels?.forEach((c) => exists(c.into, `${m.id} 的取消窗口`));
    exists(m.followUp, `${m.id} 的连招`);
    if (m.hold) {
      exists(m.hold.release, `${m.id} 的松手招`);
      if (m.active || m.recovery) fail(`蓄力招 ${m.id} 只能有前摇帧，判定交给松手招`);
    }
  }
  return moves;
}

export function validateEnemy(def: EnemyDef) {
  validateMoves(def.name, def.moves);
  for (const a of def.attacks) {
    if (!def.moves[a.move]) throw new Error(`[招式表] ${def.name}：出招列表引用了不存在的招式 ${a.move}`);
  }
  return def;
}

export function validateCharacter(def: CharacterDef) {
  validateMoves(def.name, def.moves);
  for (const [action, id] of Object.entries(def.neutral)) {
    if (id && !def.moves[id]) throw new Error(`[招式表] ${def.name}：起手招 ${action} 引用了不存在的招式 ${id}`);
  }
  return def;
}

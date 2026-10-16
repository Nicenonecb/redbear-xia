import { byId, validateMoves, type ProjectileSpec } from '../combat/moveTable';

/**
 * 第一关 Boss 胖虎：满脸刀疤的山大王，身披虎皮，走搞笑路线。
 * 作用是教玩家闪避，所以每一招前摇都给得很长，收招也留了反打的空当。
 * 帧数按 60 帧/秒。
 */
export const PANGHU = {
  name: '胖虎',
  hp: 300,
  body: { w: 60, h: 112 },
  walkSpeed: 110,
  /** 气血降到这个比例时变身 */
  transformAt: 0.5,
  /** 两招之间歇多少帧 */
  cooldown: { min: 36, max: 72 },
  /** 离玩家超过这个距离就用冲锋劈砍，近了多半震地 */
  chargeRange: 260,
  /** 冲锋劈砍够得着的距离；比这远就先走过去 */
  attackRange: 380,

  moves: validateMoves(
    '胖虎',
    byId([
      {
        // 拖刀后撤一步，地上亮起红线，然后沿红线冲过来一刀劈下
        id: 'chargeChop',
        name: '冲锋劈砍',
        startup: 48,
        active: 22,
        recovery: 40,
        hit: {
          box: { x: 56, y: -56, w: 92, h: 110 },
          damage: 18,
          hitstop: 8,
          hitstun: 24,
          knockback: { x: 420, y: -240 },
        },
        motion: [
          { from: 0, to: 11, vx: -160 },
          { from: 48, to: 65, vx: 1000 },
        ],
        events: [
          { frame: 0, type: 'sfx', name: 'growl' },
          { frame: 48, type: 'sfx', name: 'dash' },
          { frame: 66, type: 'sfx', name: 'chop' },
          { frame: 66, type: 'vfx', name: 'shake' },
        ],
      },
      {
        // 举刀蓄力，刀身闪光，脚下出现红圈；砸地后冲击波向两边扩散
        id: 'slam',
        name: '震地',
        startup: 56,
        active: 4,
        recovery: 44,
        hit: {
          box: { x: 0, y: -32, w: 200, h: 64 },
          damage: 20,
          hitstop: 9,
          hitstun: 26,
          knockback: { x: 360, y: -320 },
        },
        events: [
          { frame: 0, type: 'sfx', name: 'heave' },
          { frame: 56, type: 'spawn', name: 'shockwave' },
          { frame: 56, type: 'vfx', name: 'shake' },
          { frame: 56, type: 'sfx', name: 'slam' },
        ],
      },
    ]),
  ),

  /** 震地的冲击波：贴地走，跳起来或者闪避都能躲 */
  shockwave: {
    speed: 480,
    life: 80,
    pierce: true,
    hit: { box: { x: 0, y: 0, w: 34, h: 40 }, damage: 12, hitstop: 5, hitstun: 18, knockback: { x: 300, y: -300 } },
  } satisfies ProjectileSpec,

  /** 变身演出的时间轴（帧），演出期间胖虎无敌 */
  transform: { roarAt: 24, wrapAt: 60, burstAt: 110, end: 170 },

  /** 猛虎形态的招式明天做，现在只会来回踱步 */
  tiger: { walkSpeed: 150 },

  lines: {
    intro: '此山是我开，此树是我栽……\n哎你先别动手，我还没念完！',
    transform: '你逼我的！\n胖虎不发威，你当我是病猫？！',
    defeated: '少侠果然厉害……',
  },
};

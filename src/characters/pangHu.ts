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

      // ---- 猛虎形态 ----
      {
        // 压低身子、尾巴一甩，玩家脚下出现红圈，然后跳起扑到红圈处。
        // 起跳的速度由 AI 按红圈位置现算，招式表只管帧数和判定
        id: 'pounce',
        name: '扑击',
        startup: 40,
        active: 44,
        recovery: 34,
        hit: {
          box: { x: 30, y: -45, w: 150, h: 76 },
          damage: 16,
          hitstop: 8,
          hitstun: 22,
          knockback: { x: 420, y: -260 },
        },
        events: [
          { frame: 0, type: 'sfx', name: 'growl' },
          { frame: 40, type: 'sfx', name: 'pounce' },
        ],
      },
      {
        // 贴近后连挥两爪：第一爪快，第二爪前有一下停顿，看准了再闪
        id: 'claw1',
        name: '虎爪·一',
        startup: 22,
        active: 5,
        recovery: 4,
        followUp: 'claw2',
        hit: {
          box: { x: 96, y: -52, w: 84, h: 72 },
          damage: 10,
          hitstop: 5,
          hitstun: 16,
          knockback: { x: 200, y: 0 },
        },
        motion: [{ from: 16, to: 26, vx: 260 }],
        events: [{ frame: 22, type: 'sfx', name: 'claw' }],
      },
      {
        id: 'claw2',
        name: '虎爪·二',
        startup: 20,
        active: 5,
        recovery: 38,
        hit: {
          box: { x: 100, y: -52, w: 90, h: 76 },
          damage: 14,
          hitstop: 8,
          hitstun: 22,
          knockback: { x: 380, y: -180 },
        },
        motion: [{ from: 14, to: 24, vx: 300 }],
        events: [{ frame: 20, type: 'sfx', name: 'claw' }],
      },
      {
        // 张口蓄力，放出一圈环形音波；音波顶天立地跳不过去，只能靠闪避的无敌帧穿过去
        id: 'roar',
        name: '虎啸',
        startup: 54,
        active: 2,
        recovery: 40,
        events: [
          { frame: 0, type: 'sfx', name: 'roar-charge' },
          { frame: 54, type: 'spawn', name: 'roarRing' },
          { frame: 54, type: 'vfx', name: 'shake' },
          { frame: 54, type: 'sfx', name: 'roar' },
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

  /** 猛虎形态：比人形快，出招更密，但前摇依然明显 */
  tiger: {
    walkSpeed: 170,
    cooldown: { min: 24, max: 52 },
    /** 离玩家超过这个距离就扑 */
    pounceRange: 300,
    /** 贴到这么近才挥爪 */
    clawRange: 180,
    /** 扑击起跳的竖直速度，水平速度按落点现算 */
    leapSpeed: 560,
    maxLeapSpeedX: 900,
  },

  /** 虎啸的音波：比人高得多，跳不过去 */
  roarRing: {
    speed: 620,
    life: 70,
    pierce: true,
    hit: { box: { x: 0, y: 0, w: 30, h: 300 }, damage: 16, hitstop: 6, hitstun: 20, knockback: { x: 340, y: -200 } },
  } satisfies ProjectileSpec,

  lines: {
    intro: '此山是我开，此树是我栽……\n哎你先别动手，我还没念完！',
    transform: '你逼我的！\n胖虎不发威，你当我是病猫？！',
    defeated: '少侠果然厉害……',
  },
};

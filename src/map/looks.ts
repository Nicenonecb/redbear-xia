import type { ArtSlot } from '../art/slots';
import type { MoveId } from '../combat/moveTable';

/**
 * 地图上每种人物长什么样：第三批精图叫什么名字、没有精图时拿哪张立绘顶着、画多高，
 * 还有每一招前摇、判定时各摆哪个姿势（姿势名就是出图清单里的 map_<名字>_<姿势>_<朝向>）。
 * 没写的招按默认：前摇 ready、判定 strike。
 */
export interface MapLook {
  mapName: string;
  fallback: ArtSlot;
  /** 画多高（设计像素）：脚底到头顶（地图精图按 map-anchors.json 里站姿的身高缩放） */
  height: number;
  /** 影子多宽 */
  shadow: number;
  poses?: Record<MoveId, [startup: string, active: string]>;
}

export const LOOKS: Record<string, MapLook> = {
  swordsman: { mapName: 'swordsman', fallback: 'portrait_swordsman', height: 170, shadow: 65 },
  bannerman: { mapName: 'bannerman', fallback: 'portrait_bannerman', height: 180, shadow: 65 },
  captain: {
    mapName: 'captain',
    fallback: 'portrait_captain',
    height: 210,
    shadow: 95,
    poses: { hammer: ['raise', 'smash'], sweep: ['raise', 'smash'] },
  },
  spearman: { mapName: 'spearman', fallback: 'portrait_spearman', height: 170, shadow: 65, poses: { slash: ['ready', 'strike'] } },
  archer: { mapName: 'archer', fallback: 'portrait_archer', height: 165, shadow: 60, poses: { throw: ['ready', 'throw'] } },
  drillmaster: {
    mapName: 'drillmaster',
    fallback: 'portrait_drillmaster',
    height: 205,
    shadow: 90,
    poses: { hammer: ['raise', 'smash'], sweep: ['raise', 'smash'] },
  },
  baoJinliang: {
    mapName: 'baoJinliang',
    fallback: 'portrait_baoJinliang',
    height: 230,
    shadow: 100,
    poses: {
      thrust: ['ready', 'thrust'],
      thrust3: ['ready', 'thrust'],
      thrustB: ['ready', 'thrust'],
      thrustC: ['ready', 'thrust'],
      sweep: ['ready', 'sweep'],
      vault: ['ready', 'vault'],
      charge: ['turn', 'thrust'],
    },
  },
  bandit: { mapName: 'bandit', fallback: 'portrait_bandit', height: 150, shadow: 64, poses: { slash: ['ready', 'strike'] } },
  thrower: { mapName: 'thrower', fallback: 'portrait_thrower', height: 145, shadow: 60, poses: { throw: ['ready', 'throw'] } },
  chief: {
    mapName: 'chief',
    fallback: 'portrait_chief',
    height: 205,
    shadow: 100,
    poses: { hammer: ['raise', 'smash'], sweep: ['raise', 'smash'] },
  },
  pangHu: {
    mapName: 'pangHu',
    fallback: 'portrait_pangHu',
    height: 230,
    shadow: 120,
    poses: { chargeChop: ['drag', 'chop'], slam: ['raise', 'chop'] },
  },
  tiger: {
    mapName: 'tiger',
    fallback: 'portrait_pangHuTiger',
    // 猛虎的图横着占满画布，按"脚底到背顶"量的身高给大一点，才比人形胖虎还威风
    height: 270,
    shadow: 240,
    poses: { pounce: ['crouch', 'leap'], claw1: ['claw', 'claw'], claw2: ['claw', 'claw'], roar: ['roar', 'roar'] },
  },
} satisfies Record<string, MapLook>;

import type Phaser from 'phaser';
import { drawDart, drawSwordQi, drawThrownFan } from '../art/projectiles';
import type { CharacterDef } from '../combat/moveTable';
import type { MapFighter } from '../map/combat/MapFighter';
import { MapProjectile } from '../map/combat/MapProjectile';
import type { HeroId } from '../game/progression';
import { SWORD_QI_LEVELS, WEN_SHAOHUA, swordQiLevel } from './wenShaohua';
import { DART, THROWN_FAN, YU_WUXIA } from './yuWuxia';

/** 大地图上放飞行道具时需要的东西 */
export interface MapSpawnContext {
  scene: Phaser.Scene;
  player: MapFighter;
  addProjectile(p: MapProjectile): void;
}

export interface HeroEntry {
  def: CharacterDef;
  /** 选角界面上的介绍 */
  region: string;
  weapon: string;
  blurb: string;
  /** 大地图上的操作提示 */
  mapHint: string;
  /** 大地图上的 spawn：飞行道具沿面向飞 */
  spawnOnMap(ctx: MapSpawnContext, name: string): void;
}

/** 飞行道具从人身前多远处放出来 */
const MUZZLE = 30;

export const HEROES: Record<HeroId, HeroEntry> = {
  wenShaohua: {
    def: WEN_SHAOHUA,
    region: '江南',
    weapon: '剑',
    blurb: '翩翩公子，中速、高伤害，稳扎稳打。\n流云三式连斩，少华一剑蓄力剑气远程补刀。',
    mapHint: 'WASD 走 · J 流云三式 · K 按住蓄力 少华一剑 · L/空格 闪避 · ` 判定 · Esc 返回标题',
    spawnOnMap({ scene, player: p, addProjectile }, name) {
      if (name !== 'swordQi') return;
      const level = swordQiLevel(p.runner.charge);
      const draw = drawSwordQi(SWORD_QI_LEVELS.indexOf(level), level.hit.box.h);
      const { x, y } = p.pos;
      const qi = new MapProjectile(scene, x + p.facing.x * MUZZLE, y + p.facing.y * MUZZLE, { ...p.facing }, level, 'player', draw, p.damageScale);
      // 剑气图：蓄得越满越大
      addProjectile(qi.useArt(scene, 'fx_sword_qi', 90 + level.hit.box.h * 1.4));
    },
  },
  yuWuxia: {
    def: YU_WUXIA,
    region: '西南',
    weapon: '扇与暗器',
    blurb: '清冷利落，快节奏、高机动。\n扇子横扫、掷扇往返两打，飞镖连发；\n镖打光了就贴上去，近战命中把镖挣回来。',
    mapHint: 'WASD 走 · J 扇子横扫 · K 按住蓄力 掷扇 · I 飞镖 · L/空格 闪避 · ` 判定 · Esc 返回标题',
    spawnOnMap({ scene, player: p, addProjectile }, name) {
      const { x, y } = p.pos;
      const at = (d: number) => [x + p.facing.x * d, y + p.facing.y * d] as const;
      if (name === 'dart') {
        addProjectile(new MapProjectile(scene, ...at(MUZZLE), { ...p.facing }, DART, 'player', drawDart(DART.hit.box.w), p.damageScale));
      }
      if (name === 'fan') {
        // 第 6 阶段再做成飞出去再飞回来；现在先直飞到最远处收回
        const c = p.runner.charge;
        const lerp = (r: readonly [number, number]) => r[0] + (r[1] - r[0]) * c;
        const range = lerp(THROWN_FAN.range);
        const spec = {
          ...THROWN_FAN.spec,
          life: Math.round((range / THROWN_FAN.spec.speed) * 60),
          hit: { ...THROWN_FAN.spec.hit, damage: Math.round(lerp(THROWN_FAN.damage)) },
        };
        p.lock('attack', true);
        p.lock('special', true);
        const fan = new MapProjectile(scene, ...at(MUZZLE), { ...p.facing }, spec, 'player', drawThrownFan(spec.hit.box.w / 2), p.damageScale);
        fan.onGone = () => {
          p.lock('attack', false);
          p.lock('special', false);
        };
        addProjectile(fan);
      }
    },
  },
};

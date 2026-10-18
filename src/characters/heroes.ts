import type Phaser from 'phaser';
import type { HeroView } from '../art/heroView';
import { drawDart, drawSwordQi, drawThrownFan } from '../art/projectiles';
import { WenShaohuaView } from '../art/wenShaohuaView';
import { YuWuxiaView } from '../art/yuWuxiaView';
import type { CharacterDef } from '../combat/moveTable';
import { Boomerang } from '../entities/Boomerang';
import type { Fighter } from '../entities/Fighter';
import { Projectile } from '../entities/Projectile';
import type { MapFighter } from '../map/combat/MapFighter';
import { MapProjectile } from '../map/combat/MapProjectile';
import type { HeroId } from '../game/progression';
import { SWORD_QI_LEVELS, WEN_SHAOHUA, swordQiLevel } from './wenShaohua';
import { DART, THROWN_FAN, YU_WUXIA } from './yuWuxia';

/** 主角放飞行道具时需要的东西 */
export interface SpawnContext {
  scene: Phaser.Scene;
  player: Fighter;
  addProjectile(p: Projectile): void;
}

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
  /** 战斗画面底部的操作提示 */
  hint: string;
  createView(scene: Phaser.Scene): HeroView;
  /** 招式事件里的 spawn：放剑气、掷扇、飞镖 */
  spawn(ctx: SpawnContext, name: string): void;
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
    hint: 'A/D 移动 · W/空格 跳跃 · J 流云三式 · K 按住蓄力 少华一剑 · L/Shift 闪避 · ` 判定框 · Esc 返回标题',
    createView: (scene) => new WenShaohuaView(scene),
    spawn({ scene, player: p, addProjectile }, name) {
      if (name !== 'swordQi') return;
      const level = swordQiLevel(p.runner.charge);
      const draw = drawSwordQi(SWORD_QI_LEVELS.indexOf(level), level.hit.box.h);
      addProjectile(new Projectile(scene, p.x + 36 * p.facing, p.feetY - 46, p.facing, level, 'player', draw, p.damageScale));
    },
    mapHint: 'WASD 走 · J 流云三式 · K 按住蓄力 少华一剑 · L/空格 闪避 · ` 判定 · Esc 返回标题',
    spawnOnMap({ scene, player: p, addProjectile }, name) {
      if (name !== 'swordQi') return;
      const level = swordQiLevel(p.runner.charge);
      const draw = drawSwordQi(SWORD_QI_LEVELS.indexOf(level), level.hit.box.h);
      const { x, y } = p.pos;
      addProjectile(new MapProjectile(scene, x + p.facing.x * MUZZLE, y + p.facing.y * MUZZLE, { ...p.facing }, level, 'player', draw, p.damageScale));
    },
  },
  yuWuxia: {
    def: YU_WUXIA,
    region: '西南',
    weapon: '扇与暗器',
    blurb: '清冷利落，快节奏、高机动。\n扇子横扫、掷扇往返两打，飞镖连发；\n镖打光了就贴上去，近战命中把镖挣回来。',
    hint: 'A/D 移动 · W/空格 跳跃 · J 扇子横扫 · K 按住蓄力 掷扇 · I 飞镖 · L/Shift 闪避 · ` 判定框 · Esc 返回标题',
    createView: (scene) => new YuWuxiaView(scene),
    spawn({ scene, player: p, addProjectile }, name) {
      const y = p.feetY - 44;
      if (name === 'dart') {
        addProjectile(new Projectile(scene, p.x + 20 * p.facing, y, p.facing, DART, 'player', drawDart(DART.hit.box.w), p.damageScale));
      }
      if (name === 'fan') {
        // 蓄力越久飞得越远、打得越疼；扇子不在手上时不能挥扇、不能再掷
        const c = p.runner.charge;
        const lerp = (r: readonly [number, number]) => r[0] + (r[1] - r[0]) * c;
        const spec = { ...THROWN_FAN.spec, hit: { ...THROWN_FAN.spec.hit, damage: Math.round(lerp(THROWN_FAN.damage)) } };
        p.lock('attack', true);
        p.lock('special', true);
        const release = () => {
          p.lock('attack', false);
          p.lock('special', false);
        };
        const draw = drawThrownFan(spec.hit.box.w / 2);
        addProjectile(new Boomerang(scene, p.x + 24 * p.facing, y, p.facing, spec, draw, p.damageScale, p, lerp(THROWN_FAN.range), release));
      }
    },
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

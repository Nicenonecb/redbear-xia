import type { Hurtable } from '../combat/hitbox';
import { TrainingDummy } from '../entities/TrainingDummy';
import { CombatScene, GROUND_Y } from './CombatScene';

/** 练功场：温少华对着木人桩试招，调手感用。 */
export class GameScene extends CombatScene {
  protected readonly stageName = '竹林 · 练功场';
  protected override backgroundArt = 'bg_training' as const;
  private dummy!: TrainingDummy;

  constructor() {
    super('Game');
  }

  protected setup() {
    this.dummy = new TrainingDummy(this, 820, GROUND_Y);
    // 闪避的无敌帧里可以穿身而过
    this.physics.add.collider(this.player.zone, this.dummy.blocker, undefined, () => !this.player.evading);
  }

  protected foes(): Hurtable[] {
    return [this.dummy];
  }

  protected tickWorld() {
    this.dummy.tick();
  }

  protected renderWorld() {
    this.dummy.draw();
  }

  protected override debugLines() {
    return [`木人桩：命中 ${this.dummy.hitCount} 次 · 累计伤害 ${this.dummy.totalDamage}`];
  }
}

import type Phaser from 'phaser';
import type { MapActor, MapHurtable } from '../combat/MapActor';
export interface BossController {
  readonly events: Phaser.Events.EventEmitter;
  readonly actor: MapActor | null;
  spawn(): void;
  tick(): void;
  render(delta: number): void;
  checkIntro(): void;
  hitTargets(): MapHurtable[];
  drawWarnings(g: Phaser.GameObjects.Graphics, gl: Phaser.GameObjects.Graphics): void;
  afterRescue(): void;
  dispose(): void;
}

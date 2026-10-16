import type Phaser from 'phaser';
import { CHAPTER1_STEPS } from './chapter1';
import { getRun } from './run';
import { saveRun } from './save';

/** 某一步对应哪个场景 */
export function sceneForStep(step: number): { key: string; data?: object } {
  const s = CHAPTER1_STEPS[step];
  if (!s) return { key: 'Title' };
  if (s.kind === 'room') return { key: 'Room', data: { room: s.room } };
  if (s.kind === 'shop') return { key: 'Shop' };
  if (s.kind === 'boss') return { key: 'PangHu' };
  return { key: 'Letter' };
}

/** 一局往前走一步：淡出，切到下一步的场景 */
export function advanceRun(scene: Phaser.Scene) {
  const run = getRun();
  const next = run ? sceneForStep(++run.step) : { key: 'Title' };
  // 走进下一步就自动存档；最后一步是红熊的信，看完整局就结束了
  if (run && next.key !== 'Title') saveRun(run);
  const cam = scene.cameras.main;
  cam.fadeOut(400, 239, 231, 214);
  cam.once('camerafadeoutcomplete', () => scene.scene.start(next.key, next.data));
}

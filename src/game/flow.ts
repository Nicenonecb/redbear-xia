import type Phaser from 'phaser';
import { STAGES, stageFor } from './stages';
import { getRun, endRun } from './run';
import { saveRun } from './save';
export function sceneForStep(step: number, stage = getRun()?.stage ?? 0): { key: string; data?: object } {
  const def = STAGES[stage];
  if (!def || step > def.steps.length) return { key: 'Title' };
  return { key: step === def.steps.length ? stage === 2 ? 'Ending' : 'Letter' : 'Map' };
}
export function advanceRun(scene: Phaser.Scene) {
  const run = getRun();
  let next = { key: 'Title' };
  if (run) {
    if (run.step === stageFor(run).steps.length) {
      run.stage++; run.step = 0; run.rescueUsed = false; run.paidOff = false;
      if (!STAGES[run.stage]) endRun();
    } else run.step++;
    next = sceneForStep(run.step, run.stage);
    if (next.key !== 'Title') saveRun(run);
  }
  const cam = scene.cameras.main;
  cam.fadeOut(400, 239, 231, 214);
  cam.once('camerafadeoutcomplete', () => scene.scene.start(next.key));
}

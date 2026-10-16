import Phaser from 'phaser';
import { COLORS } from '../config';

export interface InkMountainOptions {
  width: number;
  /** 最远一层山脊的大致高度 */
  horizon: number;
  /** 最近一层山脚的位置，山体填充到这里 */
  bottom: number;
  layers?: number;
  seed?: string;
}

/**
 * 程序生成的水墨远山：几层山脊由远到近、由淡到浓，
 * 每层山脚叠一道宣纸色的渐变雾气，营造留白感。
 */
export function drawInkMountains(scene: Phaser.Scene, opts: InkMountainOptions) {
  const { width, horizon, bottom, layers = 4, seed = 'redbear' } = opts;
  const rng = new Phaser.Math.RandomDataGenerator([seed]);
  const g = scene.add.graphics();
  const step = 8;

  for (let i = 0; i < layers; i++) {
    const t = layers === 1 ? 1 : i / (layers - 1);
    const baseY = Phaser.Math.Linear(horizon, bottom - 80, t);
    const amp = Phaser.Math.Linear(120, 50, t);
    // 叠几组不同频率的正弦，得到起伏自然的山脊
    const waves = [0.004, 0.011, 0.027].map((freq, k) => ({
      freq: freq * rng.realInRange(0.8, 1.2),
      phase: rng.realInRange(0, Math.PI * 2),
      amp: amp / (k + 1),
    }));

    const points: Phaser.Math.Vector2[] = [];
    for (let x = 0; x <= width + step; x += step) {
      const y = waves.reduce((sum, w) => sum - Math.abs(Math.sin(x * w.freq + w.phase)) * w.amp, baseY);
      points.push(new Phaser.Math.Vector2(x, y));
    }
    points.push(new Phaser.Math.Vector2(width + step, bottom), new Phaser.Math.Vector2(0, bottom));

    const color = Phaser.Display.Color.Interpolate.ColorWithColor(
      Phaser.Display.Color.ValueToColor(COLORS.inkLight),
      Phaser.Display.Color.ValueToColor(COLORS.ink),
      100,
      t * 100,
    );
    g.fillStyle(Phaser.Display.Color.GetColor(color.r, color.g, color.b), Phaser.Math.Linear(0.18, 0.75, t));
    g.fillPoints(points, true);

    // 山脚雾气
    const mistTop = baseY - amp * 0.2;
    g.fillGradientStyle(COLORS.paper, COLORS.paper, COLORS.paper, COLORS.paper, 0, 0, 0.9, 0.9);
    g.fillRect(0, mistTop, width, bottom - mistTop);
  }

  return g;
}

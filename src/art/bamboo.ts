import Phaser from 'phaser';
import { COLORS } from '../config';
import { drawInkMountains } from './inkMountains';

export interface BambooOptions {
  width: number;
  height: number;
  /** 地面的高度，竹子从这里长出来 */
  groundY: number;
  seed: string;
  /** 画几层背景竹子（0～3），越多越密；标题画面只要前景框和一层淡竹 */
  backLayers?: number;
  /** 是否画最远处的淡墨远山 */
  mountains?: boolean;
}

/**
 * 程序生成的水墨竹林：最远处是淡墨远山，往前是三层竹子，越近越浓、越粗、越稀；
 * 画面左右两侧再立几根最近的竹子做前景框住画面。竹竿有竹节，竿顶有几簇竹叶。
 * 返回前景那一层（要压在人物上面），其余都画在人物后面。
 */
export function drawBambooForest(scene: Phaser.Scene, opts: BambooOptions) {
  const { width, height, groundY, seed, backLayers = 3, mountains = true } = opts;
  const rng = new Phaser.Math.RandomDataGenerator([seed]);
  if (mountains) drawInkMountains(scene, { width, horizon: 260, bottom: groundY, layers: 2, seed });

  const layers = [
    { count: 16, alpha: 0.16, thick: [4, 7], color: COLORS.inkLight },
    { count: 11, alpha: 0.32, thick: [6, 10], color: COLORS.inkLight },
    { count: 7, alpha: 0.5, thick: [9, 14], color: COLORS.ink },
  ];
  for (const layer of layers.slice(0, backLayers)) {
    const g = scene.add.graphics();
    for (let i = 0; i < layer.count; i++) {
      const x = ((i + rng.realInRange(0.1, 0.9)) / layer.count) * width;
      drawStalk(g, rng, x, groundY + 4, rng.realInRange(layer.thick[0], layer.thick[1]), -rng.realInRange(groundY * 0.9, groundY + 40), layer.color, layer.alpha);
    }
    // 每一层脚下压一道雾，越远的层雾越重
    g.fillGradientStyle(COLORS.paper, COLORS.paper, COLORS.paper, COLORS.paper, 0, 0, 0.55, 0.55);
    g.fillRect(0, groundY - 120, width, 120);
  }

  // 前景：左右各两根粗竹，压在人物前面，只露出一截，画面更有纵深
  const front = scene.add.graphics().setDepth(20);
  for (const x of [rng.realInRange(-14, 0), rng.realInRange(20, 34), width - rng.realInRange(20, 34), width + rng.realInRange(0, 14)]) {
    drawStalk(front, rng, x, height + 20, rng.realInRange(18, 26), -height - 60, COLORS.ink, 0.9);
  }
  return front;
}

/** 一根竹子：微微弯的竿、一节一节的竹节、竿上斜伸出的细枝和几簇竹叶 */
function drawStalk(
  g: Phaser.GameObjects.Graphics,
  rng: Phaser.Math.RandomDataGenerator,
  x: number,
  bottom: number,
  thick: number,
  rise: number,
  color: number,
  alpha: number,
) {
  const top = bottom + rise;
  const lean = rng.realInRange(-0.06, 0.06);
  const xAt = (y: number) => x + (bottom - y) * lean;
  const segLen = rng.realInRange(48, 70);

  g.fillStyle(color, alpha);
  for (let y = bottom; y > top; y -= segLen) {
    const y2 = Math.max(top, y - segLen + 3);
    // 竹节之间稍细一点，节处鼓出一道
    g.fillPoints(
      [
        { x: xAt(y) - thick / 2, y },
        { x: xAt(y) + thick / 2, y },
        { x: xAt(y2) + thick * 0.45, y: y2 },
        { x: xAt(y2) - thick * 0.45, y: y2 },
      ],
      true,
    );
    g.fillRect(xAt(y2) - thick * 0.62, y2 - 2, thick * 1.24, 3);
  }

  // 竿上几处斜伸出细枝，枝头一簇竹叶
  const twigs = rng.between(2, 4);
  for (let k = 0; k < twigs; k++) {
    const y = Phaser.Math.Linear(top, bottom, rng.realInRange(0.05, 0.55));
    const side = rng.pick([-1, 1]);
    const len = rng.realInRange(30, 60) * (thick / 10);
    const ex = xAt(y) + side * len;
    const ey = y - len * 0.4;
    g.lineStyle(Math.max(1, thick * 0.15), color, alpha);
    g.lineBetween(xAt(y), y, ex, ey);
    drawLeafCluster(g, rng, ex, ey, side, thick / 10, color, alpha);
  }
}

/** 一簇竹叶：三四片细长的叶子从枝头散开往下垂 */
function drawLeafCluster(
  g: Phaser.GameObjects.Graphics,
  rng: Phaser.Math.RandomDataGenerator,
  x: number,
  y: number,
  side: number,
  scale: number,
  color: number,
  alpha: number,
) {
  const n = rng.between(3, 5);
  for (let i = 0; i < n; i++) {
    const a = Phaser.Math.DegToRad(side > 0 ? rng.realInRange(10, 80) : rng.realInRange(100, 170));
    drawLeaf(g, x, y, a, rng.realInRange(22, 36) * scale, rng.realInRange(4, 6) * scale, color, alpha);
  }
}

/** 一片竹叶：两头尖、中间宽的细长叶形 */
export function drawLeaf(g: Phaser.GameObjects.Graphics, x: number, y: number, angle: number, len: number, width: number, color: number, alpha: number) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const nx = -dy;
  const ny = dx;
  g.fillStyle(color, alpha);
  g.fillPoints(
    [
      { x, y },
      { x: x + dx * len * 0.4 + nx * width, y: y + dy * len * 0.4 + ny * width },
      { x: x + dx * len, y: y + dy * len },
      { x: x + dx * len * 0.4 - nx * width * 0.6, y: y + dy * len * 0.4 - ny * width * 0.6 },
    ],
    true,
  );
}

/** 飘落的竹叶：从画面上方慢慢转着落下，左右晃，落到地面就淡掉再从上面重新落 */
export class FallingLeaves {
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly leaves: { x: number; y: number; a: number; spin: number; sway: number; speed: number; len: number; front: boolean }[] = [];

  constructor(
    scene: Phaser.Scene,
    private readonly width: number,
    private readonly groundY: number,
    count = 14,
    depth = 19,
  ) {
    this.g = scene.add.graphics().setDepth(depth);
    for (let i = 0; i < count; i++) this.leaves.push(this.spawn(Math.random() * groundY));
  }

  update(delta: number) {
    const dt = delta / (1000 / 60);
    this.g.clear();
    for (const l of this.leaves) {
      l.y += l.speed * dt;
      l.sway += 0.03 * dt;
      l.x += Math.sin(l.sway) * 0.8 * dt - 0.25 * dt;
      l.a += l.spin * dt;
      if (l.y > this.groundY + 4 || l.x < -40) Object.assign(l, this.spawn(-20));
      const fade = Phaser.Math.Clamp((this.groundY - l.y) / 60, 0, 1);
      drawLeaf(this.g, l.x, l.y, l.a, l.len, l.len * 0.16, l.front ? COLORS.ink : COLORS.inkLight, (l.front ? 0.75 : 0.45) * fade);
    }
  }

  private spawn(y: number) {
    return {
      x: Math.random() * (this.width + 120),
      y,
      a: Math.random() * Math.PI * 2,
      spin: Phaser.Math.FloatBetween(-0.05, 0.05),
      sway: Math.random() * Math.PI * 2,
      speed: Phaser.Math.FloatBetween(0.5, 1.1),
      len: Phaser.Math.FloatBetween(12, 22),
      front: Math.random() < 0.35,
    };
  }
}

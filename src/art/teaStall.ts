import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH } from '../config';

/**
 * 任新野的茶摊：两根竹竿撑起草棚，檐下挂一盏写着"茶"的朱红灯笼，柜台上摆着算盘。
 * 任新野站在柜台后面，头戴软脚幞头、长衫，眉眼带笑，一副江湖百事通的样子。
 * 坐标以柜台前沿的地面中点为原点。
 */
export function drawTeaStall(scene: Phaser.Scene, x: number, groundY: number, withKeeper = true) {
  const g = scene.add.graphics().setDepth(2);
  const at = (px: number, py: number) => ({ x: x + px, y: groundY + py });
  const line = (a: { x: number; y: number }, b: { x: number; y: number }) => g.lineBetween(a.x, a.y, b.x, b.y);

  // 棚子：竹竿和草顶
  g.lineStyle(7, COLORS.ink);
  line(at(-170, 0), at(-170, -250));
  line(at(170, 0), at(170, -250));
  g.fillStyle(COLORS.ink);
  g.fillPoints([at(-215, -238), at(215, -238), at(185, -290), at(-185, -290)], true);
  g.fillStyle(COLORS.inkLight, 0.8);
  for (let i = -200; i <= 200; i += 22) g.fillTriangle(at(i, -238).x, at(i, -238).y, at(i + 11, -238).x, at(i + 11, -238).y, at(i + 6, -224).x, at(i + 6, -224).y);

  // 任新野本人（画在柜台后面，柜台挡住下半身）；有他的立绘图时就不画剪影了
  if (withKeeper) drawRenXinye(g, at(-10, -40).x, at(-10, -40).y, 1.35);

  // 柜台和算盘
  g.fillStyle(COLORS.ink);
  g.fillRect(at(-150, -82).x, at(-150, -82).y, 300, 82);
  g.fillStyle(COLORS.inkLight, 0.6);
  g.fillRect(at(-150, -82).x, at(-150, -82).y, 300, 6);
  g.lineStyle(2, COLORS.paper, 0.8);
  g.strokeRect(at(40, -104).x, at(40, -104).y, 70, 22);
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      g.fillStyle(r === 1 ? COLORS.red : COLORS.paper, 0.9);
      g.fillCircle(at(48 + c * 11, -98 + r * 6).x, at(48 + c * 11, -98 + r * 6).y, 2.4);
    }
  }
  // 茶碗
  g.fillStyle(COLORS.paper, 0.85);
  g.fillEllipse(at(-90, -88).x, at(-90, -88).y, 26, 10);

  // 檐下的朱红灯笼
  g.lineStyle(2, COLORS.ink);
  line(at(130, -238), at(130, -212));
  g.fillStyle(COLORS.red);
  g.fillEllipse(at(130, -186).x, at(130, -186).y, 40, 52);
  g.fillStyle(COLORS.ink);
  g.fillRect(at(118, -214).x, at(118, -214).y, 24, 5);
  g.fillRect(at(118, -164).x, at(118, -164).y, 24, 5);
  scene.add
    .text(at(130, -186).x, at(130, -186).y, '茶', { fontFamily: FONT_BRUSH, fontSize: '26px', color: CSS_COLORS.paper })
    .setOrigin(0.5)
    .setDepth(3);
  return g;
}

/** 任新野：软脚幞头、长衫、拱着手，眉眼弯弯在笑。x, y 是腰部（柜台台面）的位置 */
export function drawRenXinye(g: Phaser.GameObjects.Graphics, x: number, y: number, scale = 1) {
  const at = (px: number, py: number) => ({ x: x + px * scale, y: y + py * scale });
  g.fillStyle(COLORS.ink);
  // 长衫上身
  g.fillPoints([at(-24, -70), at(24, -70), at(30, 0), at(-30, 0)], true);
  // 拱手
  g.fillEllipse(at(0, -36).x, at(0, -36).y, 30 * scale, 16 * scale);
  // 头
  const head = at(0, -88);
  g.fillCircle(head.x, head.y, 16 * scale);
  // 幞头：顶上一块，两边垂下软脚
  g.fillRect(at(-14, -112).x, at(-14, -112).y, 28 * scale, 12 * scale);
  g.lineStyle(4 * scale, COLORS.ink);
  g.lineBetween(at(-14, -104).x, at(-14, -104).y, at(-30, -92).x, at(-30, -92).y);
  g.lineBetween(at(14, -104).x, at(14, -104).y, at(30, -92).x, at(30, -92).y);
  // 笑眼：两道向下弯的宣纸色细弧
  g.lineStyle(2 * scale, COLORS.paper, 0.95);
  for (const dx of [-6, 6]) {
    g.beginPath();
    g.arc(head.x + dx * scale, head.y - 2 * scale, 3.5 * scale, Math.PI * 1.1, Math.PI * 1.9, false);
    g.strokePath();
  }
  g.beginPath();
  g.arc(head.x, head.y + 4 * scale, 5 * scale, Math.PI * 0.15, Math.PI * 0.85, false);
  g.strokePath();
}

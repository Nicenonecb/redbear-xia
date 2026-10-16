import Phaser from 'phaser';
import { CSS_COLORS } from '../config';
import { totalFrames } from '../combat/moveTable';
import type { Fighter } from '../entities/Fighter';

const PHASE_NAMES = { startup: '前摇', active: '判定', recovery: '收招' } as const;

/** 调手感用的判定框和招式状态显示，按 ` 键开关。 */
export class CombatDebug {
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly text: Phaser.GameObjects.Text;
  private visible = false;

  constructor(scene: Phaser.Scene) {
    this.g = scene.add.graphics().setDepth(100);
    this.text = scene.add
      .text(24, 110, '', {
        fontFamily: 'Menlo, monospace',
        fontSize: '15px',
        color: CSS_COLORS.ink,
        backgroundColor: 'rgba(239, 231, 214, 0.85)',
        padding: { x: 8, y: 6 },
      })
      .setDepth(100);
    scene.input
      .keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK)
      .on('down', () => (this.visible = !this.visible));
  }

  /**
   * hurtboxes：敌方受击框（绿）；hitboxes：所有正在生效的攻击判定（红）；
   * lines：场景想额外显示的状态
   */
  draw(player: Fighter, hurtboxes: Phaser.Geom.Rectangle[], hitboxes: (Phaser.Geom.Rectangle | null)[], lines: string[]) {
    const g = this.g;
    g.clear();
    this.text.setVisible(this.visible);
    if (!this.visible) return;

    const stroke = (r: Phaser.Geom.Rectangle, color: number) => {
      g.lineStyle(2, color);
      g.strokeRectShape(r);
    };
    stroke(player.hurtbox(), player.invulnerable ? 0x2a6fdb : 0x2e7d32);
    for (const r of hurtboxes) stroke(r, 0x2e7d32);
    for (const r of [player.activeHitbox(), ...hitboxes]) {
      if (!r) continue;
      g.fillStyle(0xb3261e, 0.3);
      g.fillRectShape(r);
      stroke(r, 0xb3261e);
    }

    const { move, frame, phase } = player.runner;
    const moveLine = move
      ? `${move.name}（${move.id}） 第 ${frame}/${totalFrames(move) - 1} 帧 · ${PHASE_NAMES[phase!]}`
      : player.hurtFrames > 0
        ? `受击硬直 ${player.hurtFrames}`
        : '空闲';
    const pending = player.buffer.pending.map((e) => `${e.action}·${e.age}`).join(' ');
    this.text.setText(
      [
        `招式：${moveLine}`,
        move?.hold ? `蓄力：${Math.round(player.chargeRatio * 100)}%` : `蓄力：—`,
        `缓冲：${pending || '—'}`,
        `无敌：${player.evading ? '闪避' : player.mercyFrames > 0 ? '受击保护' : '否'} · 气血 ${player.hp}`,
        ...lines,
      ].join('\n'),
    );
  }
}

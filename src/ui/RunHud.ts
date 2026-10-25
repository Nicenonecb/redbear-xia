import Phaser from 'phaser';
import { COLORS, CSS_COLORS, FONT_BRUSH } from '../config';
import { PROGRESSION } from '../game/progression';
import type { CharacterDef } from '../combat/moveTable';
import { runStats, type RunState } from '../game/run';

const EXP_WIDTH = 240;

/** 血条下面的一局信息：等级和经验条、铜钱、兵器。 */
export class RunHud {
  private readonly g: Phaser.GameObjects.Graphics;
  private readonly text: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    private readonly x: number,
    private readonly y: number,
  ) {
    this.g = scene.add.graphics().setDepth(50);
    this.text = scene.add
      .text(x, y + 8, '', { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.ink })
      .setDepth(50);
  }

  /** player：只读招式表和剩余弹药 */
  draw(run: RunState, player: { def: CharacterDef; ammo: number }) {
    const ratio = run.exp / PROGRESSION.expToNext(run.level);
    this.g.clear();
    this.g.fillStyle(COLORS.ink, 0.2);
    this.g.fillRect(this.x, this.y, EXP_WIDTH, 4);
    this.g.fillStyle(COLORS.ink, 0.85);
    this.g.fillRect(this.x, this.y, EXP_WIDTH * ratio, 4);
    const ammo = player.def.ammo ? ` · 飞镖 ${player.ammo}/${player.def.ammo.max}` : '';
    this.text.setText(`第 ${run.level} 重 · 铜钱 ${run.coins} 文 · ${runStats(run).weaponName}${ammo}`);
  }
}

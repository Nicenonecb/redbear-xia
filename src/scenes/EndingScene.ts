import Phaser from 'phaser';
import { coverArt, placeArt, type ArtSlot } from '../art/slots';
import { drawInkMountains } from '../art/inkMountains';
import { drawRedBear } from '../art/redBear';
import { FONT_BRUSH, CSS_COLORS, GAME_WIDTH, GAME_HEIGHT } from '../config';
import { getRun, endRun } from '../game/run';
import { stageFor } from '../game/stages';
import { queueVoice, VoicePlayer } from '../audio/voice';
export class EndingScene extends Phaser.Scene {
  private ready = false;
  private leaving = false;
  private voice!: VoicePlayer;
  private alive = false;
  constructor() {
    super('Ending');
  }
  private id() {
    return `redBear_ending_${getRun()?.hero === 'yuWuxia' ? 'yu' : 'wen'}`;
  }
  preload() {
    queueVoice(this, [this.id()]);
  }
  create() {
    this.ready = false;
    this.leaving = false;
    this.alive = true;
    this.voice = new VoicePlayer(this);
    if (!coverArt(this, 'ending_final' as ArtSlot)) {
      drawInkMountains(this, { width: GAME_WIDTH, horizon: 350, bottom: GAME_HEIGHT, layers: 4, seed: 'ending-mountain' });
      if (!placeArt(this, 'portrait_redBear', 900, 620, 300, 460)) drawRedBear(this.add.graphics(), 900, 620, 1);
      placeArt(this, `portrait_${getRun()?.hero ?? 'wenShaohua'}` as ArtSlot, 400, 630, 250, 340);
    }
    this.add.rectangle(GAME_WIDTH / 2, 590, GAME_WIDTH, 150, 0xeee6d6, 0.87);
    const run = getRun()!;
    const line = stageFor(run).letters[run.hero].sword;
    this.add.text(90, 540, `红熊：${line}`, {
      fontFamily: FONT_BRUSH,
      fontSize: '30px',
      color: CSS_COLORS.ink,
      wordWrap: { width: 1100 },
      lineSpacing: 12,
    });
    this.cameras.main.fadeIn(1200, 239, 231, 214);
    this.voice.play(this.id(), line).then(() => {
      if (!this.alive) return;
      this.showCredits();
    });
    this.events.once('shutdown', () => {
      this.alive = false;
    });
    this.input.keyboard!.on('keydown', () => this.exit());
    this.input.on('pointerdown', () => this.exit());
  }
  private showCredits() {
    this.ready = true;
    endRun();
    this.add.text(GAME_WIDTH / 2, 95, '红熊大侠 · 完', { fontFamily: FONT_BRUSH, fontSize: '80px', color: CSS_COLORS.ink }).setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, 270, '三个结拜兄弟逃往杭州……', { fontFamily: FONT_BRUSH, fontSize: '28px', color: CSS_COLORS.ink })
      .setOrigin(0.5);
    this.add
      .text(GAME_WIDTH / 2, 680, '按任意键回到标题', { fontFamily: FONT_BRUSH, fontSize: '22px', color: CSS_COLORS.ink })
      .setOrigin(0.5);
  }
  private exit() {
    if (!this.ready || this.leaving) return;
    this.leaving = true;
    this.scene.start('Title');
  }
}

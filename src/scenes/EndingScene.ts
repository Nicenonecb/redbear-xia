import Phaser from 'phaser';
import { music } from '../audio/music';
import { coverArt, placeArt, type ArtSlot } from '../art/slots';
import { drawInkMountains } from '../art/inkMountains';
import { drawRedBear } from '../art/redBear';
import { FONT_BRUSH, CSS_COLORS, GAME_WIDTH, GAME_HEIGHT } from '../config';
import { getRun, endRun } from '../game/run';
import { stageFor } from '../game/stages';
import { queueVoice, VoicePlayer } from '../audio/voice';
import { viewRect } from '../render/sharp';
import { cjkWrap } from '../ui/cjkWrap';

/** 尾声：三兄弟没被抓住，坐船出海了（第二章的引子） */
const EPILOGUE = '胖虎、鲍金梁、彰化天三兄弟乘船出海，\n从此不知所踪……';
/** 谢幕：每项工作都是胖虎做的 */
const CREDITS = ['故事剧本', '关卡设计', '动作设计', '美术设计', '音乐音效', '代码编写'];
const AUTHOR = '胖虎';
/** 括号里是这个人在游戏里"演"的角色 */
const THANKS = [
  '感谢温总（温少华）和于姐（于无瑕）的认可与大力支持',
  '感谢 OPENBEAR 团队：产品小雨（彰化天）、',
  '后端开发刘荣梁（鲍金梁）、PE 刘上维，',
  '以及 UI 团队、前端开发部门的各位同事',
  '日常给予我的情绪价值',
];
const THANKS_LAST = '爱你们，笔芯！';
/** 字幕往上滚的速度（像素 / 秒） */
const SCROLL_SPEED = 55;
const PAPER = 0xeee6d6;
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
    music.play('ending');
    this.ready = false;
    this.leaving = false;
    this.alive = true;
    this.voice = new VoicePlayer(this);
    if (!coverArt(this, 'ending_final' as ArtSlot)) {
      drawInkMountains(this, { width: GAME_WIDTH, horizon: 350, bottom: GAME_HEIGHT, layers: 4, seed: 'ending-mountain' });
      if (!placeArt(this, 'portrait_redBear', 900, 620, 300, 460)) drawRedBear(this.add.graphics(), 900, 620, 1);
      placeArt(this, `portrait_${getRun()?.hero ?? 'wenShaohua'}` as ArtSlot, 400, 630, 250, 340);
    }
    const band = this.add.rectangle(GAME_WIDTH / 2, 590, GAME_WIDTH, 150, 0xeee6d6, 0.87);
    const run = getRun()!;
    const line = stageFor(run).letters[run.hero].sword;
    const said = this.add.text(90, 540, '', { fontFamily: FONT_BRUSH, fontSize: '30px', color: CSS_COLORS.ink, lineSpacing: 12 });
    said.setText(cjkWrap(said, `红熊：${line}`, 1100));
    this.subtitle = [band, said];
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
  /**
   * 谢幕：宣纸盖住画面（底下的结局图隐约透出来）→ 尾声一句（三兄弟出海）→ 制作名单和致谢慢慢往上滚，
   * 最后"第一章 · 完"停在画面正中。滚的时候按键直接跳到最后，停下以后再按键回标题。
   */
  /** 红熊那句台词和底下的衬条：谢幕开始时淡掉 */
  private subtitle: Phaser.GameObjects.GameObject[] = [];
  private credits?: { roll: Phaser.GameObjects.Container; epilogue: Phaser.GameObjects.Text; end: number };
  private showCredits() {
    endRun();
    const v = viewRect();
    const cx = GAME_WIDTH / 2;
    const ink = { fontFamily: FONT_BRUSH, color: CSS_COLORS.ink };
    const cover = this.add.rectangle(v.centerX, v.centerY, v.width, v.height, PAPER).setAlpha(0).setDepth(90);
    this.tweens.add({ targets: cover, alpha: 0.94, duration: 1400 });
    this.tweens.add({ targets: this.subtitle, alpha: 0, duration: 1000 });

    // 尾声：单独一页，淡入、停一会儿、淡出
    const epilogue = this.add
      .text(cx, GAME_HEIGHT / 2, EPILOGUE, { ...ink, fontSize: '32px', align: 'center', lineSpacing: 22 })
      .setOrigin(0.5)
      .setDepth(91)
      .setAlpha(0);
    this.tweens.chain({
      targets: epilogue,
      tweens: [
        { alpha: 1, duration: 1400, delay: 1000 },
        { alpha: 0, duration: 1200, delay: 3200 },
      ],
    });

    const roll = this.add.container(0, 0).setDepth(91);
    let y = GAME_HEIGHT + 40;
    const add = (t: Phaser.GameObjects.GameObject) => (roll.add(t), t);
    const divider = (at: number) => {
      const g = this.add.graphics();
      g.lineStyle(2, 0x1b1712, 0.35);
      g.lineBetween(cx - 70, at, cx + 70, at);
      g.fillStyle(0xb3261e, 0.8);
      g.fillCircle(cx, at, 3.5);
      add(g);
    };
    const label = (text: string, at: number) =>
      add(this.add.text(cx, at, text, { ...ink, fontSize: '22px', color: CSS_COLORS.red }).setOrigin(0.5, 0).setLetterSpacing(12));

    // 片名
    add(this.add.text(cx, y, '红熊大侠', { ...ink, fontSize: '68px' }).setOrigin(0.5, 0).setLetterSpacing(10));
    y += 96;
    add(this.add.text(cx, y, 'Red Bear · Way of the Xia', { ...ink, fontSize: '20px' }).setOrigin(0.5, 0).setAlpha(0.55));
    y += 90;
    divider(y);

    // 制作：一项一行，左边分工（大字）、右边名字（小字），最后盖一方朱印
    y += 70;
    label('制 作', y);
    y += 70;
    for (const role of CREDITS) {
      add(this.add.text(cx - 24, y, role, { ...ink, fontSize: '28px' }).setOrigin(1, 0).setLetterSpacing(3));
      add(this.add.text(cx + 24, y + 3, AUTHOR, { ...ink, fontSize: '24px' }).setOrigin(0, 0).setAlpha(0.92).setLetterSpacing(3));
      y += 56;
    }
    y += 24;
    const seal = this.add.container(cx, y + 28).setAngle(-8);
    const sealBox = this.add.graphics();
    sealBox.fillStyle(0xb3261e, 0.9);
    sealBox.fillRoundedRect(-28, -28, 56, 56, 6);
    seal.add([sealBox, this.add.text(0, 0, '胖\n虎', { ...ink, fontSize: '20px', color: CSS_COLORS.paper, align: 'center', lineSpacing: -2 }).setOrigin(0.5)]);
    add(seal);
    y += 56 + 90;
    divider(y);

    // 致谢
    y += 70;
    label('致 谢', y);
    y += 62;
    for (const line of THANKS) {
      add(this.add.text(cx, y, line, { ...ink, fontSize: '26px' }).setOrigin(0.5, 0).setAlpha(0.85));
      y += 50;
    }
    y += 22;
    add(this.add.text(cx, y, THANKS_LAST, { ...ink, fontSize: '32px', color: CSS_COLORS.red }).setOrigin(0.5, 0));
    y += 200;

    // 第一章 · 完
    const fin = add(this.add.text(cx, y, '第一章 · 完', { ...ink, fontSize: '60px' }).setOrigin(0.5, 0).setLetterSpacing(6)) as Phaser.GameObjects.Text;
    add(this.add.text(cx, y + fin.height + 24, '未完待续', { ...ink, fontSize: '22px' }).setOrigin(0.5, 0).setAlpha(0.55).setLetterSpacing(8));
    // 滚到"第一章 · 完"停在画面正中略偏上
    const end = -(y - GAME_HEIGHT / 2 + fin.height / 2 + 20);

    // 上下两条宣纸色的渐隐带：字从底下浮出来、到顶上慢慢淡掉，不会被画面边缘硬切
    const fade = this.add.graphics().setDepth(92);
    fade.fillGradientStyle(PAPER, PAPER, PAPER, PAPER, 1, 1, 0, 0);
    fade.fillRect(v.x, v.y, v.width, 150);
    fade.fillGradientStyle(PAPER, PAPER, PAPER, PAPER, 0, 0, 1, 1);
    fade.fillRect(v.x, v.bottom - 150, v.width, 150);
    fade.setAlpha(0);
    this.tweens.add({ targets: fade, alpha: 1, duration: 1400 });

    this.tweens.add({
      targets: roll,
      y: end,
      delay: 7200,
      duration: (-end / SCROLL_SPEED) * 1000,
      onComplete: () => this.creditsDone(),
    });
    this.credits = { roll, epilogue, end };
  }
  private creditsDone() {
    if (this.ready) return;
    this.ready = true;
    const hint = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 46, '按任意键回到标题', { fontFamily: FONT_BRUSH, fontSize: '20px', color: CSS_COLORS.ink })
      .setOrigin(0.5)
      .setDepth(93)
      .setAlpha(0);
    this.tweens.add({ targets: hint, alpha: 0.6, duration: 900, delay: 600 });
  }
  private exit() {
    // 字幕还在滚：按键直接滚到底
    if (this.credits && !this.ready) {
      this.tweens.killTweensOf([this.credits.roll, this.credits.epilogue]);
      this.credits.epilogue.setAlpha(0);
      this.credits.roll.setY(this.credits.end);
      this.creditsDone();
      return;
    }
    if (!this.ready || this.leaving) return;
    this.leaving = true;
    this.scene.start('Title');
  }
}

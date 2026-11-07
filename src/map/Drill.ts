import Phaser from 'phaser';
import { COLORS } from '../config';
import { hasArt } from '../art/slots';
import type { MapArea, Pt } from './chapter1Map';
import { placeMapArt } from './mapArt';
import { MapSprite } from './MapSprite';

/** 走到离新兵这么近，他们就聊起来（比遭遇战开打的距离远，走进空地前先听见） */
const TALK_RANGE = 760;
/** 一个刺击来回多长（毫秒）：先端着（ready），再刺出去（strike），收回来站一下 */
const THRUST_MS = 1100;
/** 新兵在练兵时说的两句 */
export const DRILL_LINES = ['新兵：听说明年要去打杭州？', '新兵：嘘——大哥的事少打听！'];

interface Recruit {
  sprite: MapSprite;
  at: Pt;
  /** 节拍错开一点，不像一个人 */
  phase: number;
  pose: string;
  alpha: number;
}

/**
 * 山腰兵营外在练兵：空地东北角一排木人桩，四五个新兵（矛手的样子）对着木人桩一下一下地刺，
 * 不打人。走近了听见他们聊天（明年打杭州）；这片空地的遭遇战一开打，新兵就散了（淡出）
 */
export class Drill {
  readonly at: Pt;
  readonly recruits: Recruit[] = [];
  /** 木人桩脚下挡路的圆 */
  readonly solids: { at: Pt; r: number }[] = [];
  talked = false;
  scattered = false;
  private time = 0;

  constructor(
    private readonly scene: Phaser.Scene,
    area: MapArea,
  ) {
    // 空地东北角
    this.at = { x: area.center.x + 200, y: area.center.y - 130 };
    const facing = { x: 0.45, y: -0.9 };
    for (let i = 0; i < 5; i++) {
      const x = this.at.x - 200 + i * 100;
      const dummy = { x: x + 45, y: this.at.y - 95 };
      this.placeDummy(dummy);
      this.solids.push({ at: dummy, r: 18 });
      const sprite = new MapSprite(scene, 'spearman', 'portrait_spearman', 160, 60);
      const r: Recruit = { sprite, at: { x, y: this.at.y }, phase: i * 170 + (i % 2) * 60, pose: 'idle', alpha: 1 };
      sprite.update({ ...r.at, facing, moving: false }, 0);
      this.recruits.push(r);
    }
  }

  /** 木人桩：有图用图，没有就画一根木桩、两根横木当胳膊 */
  private placeDummy(at: Pt) {
    if (hasArt(this.scene, 'prop_dummy')) {
      placeMapArt(this.scene, 'prop_dummy', at.x, at.y, 70);
      return;
    }
    const g = this.scene.add.graphics().setDepth(at.y);
    g.fillStyle(COLORS.ink, 0.2);
    g.fillEllipse(at.x, at.y, 46, 14);
    g.fillStyle(0x7a5c3b, 1);
    g.fillRect(at.x - 9, at.y - 120, 18, 120);
    g.fillRect(at.x - 30, at.y - 92, 60, 9);
    g.fillRect(at.x - 24, at.y - 60, 48, 8);
    g.lineStyle(2, COLORS.ink, 0.7);
    g.strokeRect(at.x - 9, at.y - 120, 18, 120);
  }

  /**
   * 每个画面帧：新兵按节拍换姿势；主角走近念对话；遭遇战开打就散。
   * talk 是场景的念台词（念的时候地图暂停），fighting 说这片空地是不是已经开打
   */
  update(delta: number, player: Pt, fighting: boolean, talk: (lines: string[], where: Pt) => void) {
    this.time += delta;
    if (fighting && !this.scattered) this.scatter();
    if (this.scattered) return;
    const facing = { x: 0.45, y: -0.9 };
    for (const r of this.recruits) {
      const t = (this.time + r.phase) % THRUST_MS;
      r.pose = t < THRUST_MS * 0.45 ? 'ready' : t < THRUST_MS * 0.75 ? 'strike' : 'idle';
      // 刺出去时身子往前送一点
      const lunge = r.pose === 'strike' ? 10 : 0;
      r.sprite.update({ x: r.at.x + facing.x * lunge, y: r.at.y + facing.y * lunge, facing, moving: false, pose: r.pose }, delta);
    }
    if (!this.talked && Phaser.Math.Distance.BetweenPoints(player, this.at) < TALK_RANGE) {
      this.talked = true;
      talk(DRILL_LINES, this.recruits[2].at);
    }
  }

  /** 遭遇战开打：新兵往后散开、淡出，然后收掉 */
  private scatter() {
    this.scattered = true;
    for (const r of this.recruits) {
      const from = { ...r.at };
      const away = { x: (r.at.x - this.at.x) * 0.6, y: -140 };
      const fade = { t: 0 };
      this.scene.tweens.add({
        targets: fade,
        t: 1,
        duration: 700,
        ease: 'Sine.easeIn',
        onUpdate: () => {
          r.alpha = 1 - fade.t;
          r.sprite.update(
            { x: from.x + away.x * fade.t, y: from.y + away.y * fade.t, facing: { x: away.x, y: away.y }, moving: true },
            16,
          );
          r.sprite.setAlpha(r.alpha);
        },
        onComplete: () => {
          r.alpha = 0;
          r.sprite.destroy();
        },
      });
    }
  }
}

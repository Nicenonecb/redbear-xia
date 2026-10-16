import Phaser from 'phaser';

/**
 * 立绘槽位：图片放进 public/art/，在 public/art/manifest.json 的 images 里登记一行，
 * 启动时就会加载，对应的地方自动换成图片；没登记的槽位继续用代码画的剪影。
 * 每个槽位的尺寸和出图提示词见 docs/art-prompts.md。
 */
export const ART_SLOTS = {
  title: '标题画面背景',
  portrait_wenShaohua: '温少华立绘（选角界面）',
  portrait_yuWuxia: '于无瑕立绘（选角界面）',
  portrait_pangHu: '胖虎立绘（说话时出现在右下角）',
  portrait_pangHuTiger: '胖虎猛虎形态立绘（变身后说话时）',
  portrait_redBear: '红熊立绘（嘱咐的信）',
  portrait_renXinye: '任新野立绘（茶摊）',
} as const;

export type ArtSlot = keyof typeof ART_SLOTS;

const textureKey = (slot: ArtSlot) => `art:${slot}`;

/** 在 Boot 场景里调用：读清单，把登记了的图片排进加载队列 */
export function queueArt(scene: Phaser.Scene) {
  const manifest = scene.cache.json.get('artManifest') as { images?: Record<string, string> } | undefined;
  for (const [slot, file] of Object.entries(manifest?.images ?? {})) {
    if (slot in ART_SLOTS && file) scene.load.image(textureKey(slot as ArtSlot), `art/${file}`);
  }
}

export function hasArt(scene: Phaser.Scene, slot: ArtSlot) {
  return scene.textures.exists(textureKey(slot));
}

/** 把一张图等比缩放塞进 maxW × maxH 的框里；没有这张图就返回 null */
export function placeArt(
  scene: Phaser.Scene,
  slot: ArtSlot,
  x: number,
  y: number,
  maxW: number,
  maxH: number,
  originX = 0.5,
  originY = 1,
) {
  if (!hasArt(scene, slot)) return null;
  const img = scene.add.image(x, y, textureKey(slot)).setOrigin(originX, originY);
  img.setScale(Math.min(maxW / img.width, maxH / img.height));
  return img;
}

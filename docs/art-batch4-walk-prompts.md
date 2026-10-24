# 第四批出图 · 走路帧（直接复制给 Codex）

> 现在地图上走路只有一张站姿图，靠代码上下颠、左右歪来"走"，腿不动，所以看着呆。
> 这一批给每个会走的人物、每个朝向补 **2 张走路帧**（左脚在前、右脚在前），游戏里按「左步 → 站姿 → 右步 → 站姿」循环，
> 就是一个完整的走路循环。站姿图本身当中间那一帧用，不用重出。
>
> 代码已经接好：哪张图到了就用哪张，没到的朝向照旧用站姿顶着，不用等齐。

## 先对 Codex 说这一段（每一批开头说一次）

```text
请按 docs/art-batch4-walk-prompts.md 里「第 N 批」的提示词逐张出图，要求：
1. 每张图按提示词里写的文件名保存到 public/art/，原尺寸 PNG，不要缩放、不要压缩、不要裁边。
2. 每张图都要是真透明背景，出完检查一下 alpha。
3. 提示词里写了「attached reference」的，把对应的参考图（都在 public/art/ 里）作为参考图一起给图像工具。
4. 走路帧和同一朝向的站姿图要一模一样大：画布大小、人物身高、脚底位置都一致；
   衣服、发型、兵器、配色、笔触也要一致（游戏里每秒会和站姿图来回切好几次，有一点不一样就会闪）。
   出完把走路帧和站姿图叠在一起对比一下，不一致就重出。
5. 出好一张就在 public/art/manifest.json 的 images 里加一行 "文件名不带后缀": "文件名.png"。
6. 实际用的提示词记到 docs/art-log/<文件名>.txt。
7. 全部出完后运行 python3 tools/map-anchors.py，更新脚底位置和裁边。
```

## 出图顺序

| 批 | 内容 | 张数 |
|---|---|---|
| 1 | 温少华 5 个朝向 × 2 | 10 |
| 2 | 于无瑕 5 个朝向 × 2 | 10 |
| 3 | 山贼喽啰、飞刀手、头目 | 30 |
| 4 | 胖虎人形、猛虎 | 20 |

一共 70 张。**每批先出 `walk1_s`、`walk2_s` 两张给我看**，我放进游戏里确认走起来顺、不闪，再出剩下的。
主角走得最多，最先出；山贼和胖虎走得少，排后面，实在不想出也行。

每个朝向先出 `walk1`，再拿 `walk1` 和站姿图一起当参考出 `walk2`，两步才对得上。

## 第 1 批 · 温少华 · `map_wenShaohua_walk1_*` / `map_wenShaohua_walk2_*`

### map_wenShaohua_walk1_s

温少华 · 走路 A：左脚在前 · 朝下（面向镜头）。附 `map_wenShaohua_s.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk1_s.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk2_s

温少华 · 走路 B：右脚在前 · 朝下（面向镜头）。附 `map_wenShaohua_s.png`、`map_wenShaohua_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk2_s.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_wenShaohua_walk1_s.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk1_se

温少华 · 走路 A：左脚在前 · 朝右下。附 `map_wenShaohua_se.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk1_se.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk2_se

温少华 · 走路 B：右脚在前 · 朝右下。附 `map_wenShaohua_se.png`、`map_wenShaohua_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk2_se.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_wenShaohua_walk1_se.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk1_e

温少华 · 走路 A：左脚在前 · 朝右。附 `map_wenShaohua_e.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk1_e.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk2_e

温少华 · 走路 B：右脚在前 · 朝右。附 `map_wenShaohua_e.png`、`map_wenShaohua_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk2_e.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_wenShaohua_walk1_e.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk1_ne

温少华 · 走路 A：左脚在前 · 朝右上（背影偏右）。附 `map_wenShaohua_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk1_ne.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk2_ne

温少华 · 走路 B：右脚在前 · 朝右上（背影偏右）。附 `map_wenShaohua_ne.png`、`map_wenShaohua_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk2_ne.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_wenShaohua_walk1_ne.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk1_n

温少华 · 走路 A：左脚在前 · 朝上（背影）。附 `map_wenShaohua_n.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk1_n.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_walk2_n

温少华 · 走路 B：右脚在前 · 朝上（背影）。附 `map_wenShaohua_n.png`、`map_wenShaohua_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_wenShaohua_walk2_n.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_wenShaohua_walk1_n.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 2 批 · 于无瑕 · `map_yuWuxia_walk1_*` / `map_yuWuxia_walk2_*`

### map_yuWuxia_walk1_s

于无瑕 · 走路 A：左脚在前 · 朝下（面向镜头）。附 `map_yuWuxia_s.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk1_s.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk2_s

于无瑕 · 走路 B：右脚在前 · 朝下（面向镜头）。附 `map_yuWuxia_s.png`、`map_yuWuxia_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk2_s.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_yuWuxia_walk1_s.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk1_se

于无瑕 · 走路 A：左脚在前 · 朝右下。附 `map_yuWuxia_se.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk1_se.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk2_se

于无瑕 · 走路 B：右脚在前 · 朝右下。附 `map_yuWuxia_se.png`、`map_yuWuxia_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk2_se.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_yuWuxia_walk1_se.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk1_e

于无瑕 · 走路 A：左脚在前 · 朝右。附 `map_yuWuxia_e.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk1_e.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk2_e

于无瑕 · 走路 B：右脚在前 · 朝右。附 `map_yuWuxia_e.png`、`map_yuWuxia_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk2_e.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_yuWuxia_walk1_e.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk1_ne

于无瑕 · 走路 A：左脚在前 · 朝右上（背影偏右）。附 `map_yuWuxia_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk1_ne.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk2_ne

于无瑕 · 走路 B：右脚在前 · 朝右上（背影偏右）。附 `map_yuWuxia_ne.png`、`map_yuWuxia_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk2_ne.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_yuWuxia_walk1_ne.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk1_n

于无瑕 · 走路 A：左脚在前 · 朝上（背影）。附 `map_yuWuxia_n.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk1_n.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_walk2_n

于无瑕 · 走路 B：右脚在前 · 朝上（背影）。附 `map_yuWuxia_n.png`、`map_yuWuxia_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_yuWuxia_walk2_n.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_yuWuxia_walk1_n.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 3 批 · 山贼喽啰 · `map_bandit_walk1_*` / `map_bandit_walk2_*`

### map_bandit_walk1_s

山贼喽啰 · 走路 A：左脚在前 · 朝下（面向镜头）。附 `map_bandit_s.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk1_s.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk2_s

山贼喽啰 · 走路 B：右脚在前 · 朝下（面向镜头）。附 `map_bandit_s.png`、`map_bandit_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk2_s.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_bandit_walk1_s.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk1_se

山贼喽啰 · 走路 A：左脚在前 · 朝右下。附 `map_bandit_se.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk1_se.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk2_se

山贼喽啰 · 走路 B：右脚在前 · 朝右下。附 `map_bandit_se.png`、`map_bandit_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk2_se.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_bandit_walk1_se.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk1_e

山贼喽啰 · 走路 A：左脚在前 · 朝右。附 `map_bandit_e.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk1_e.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk2_e

山贼喽啰 · 走路 B：右脚在前 · 朝右。附 `map_bandit_e.png`、`map_bandit_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk2_e.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_bandit_walk1_e.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk1_ne

山贼喽啰 · 走路 A：左脚在前 · 朝右上（背影偏右）。附 `map_bandit_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk1_ne.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk2_ne

山贼喽啰 · 走路 B：右脚在前 · 朝右上（背影偏右）。附 `map_bandit_ne.png`、`map_bandit_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk2_ne.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_bandit_walk1_ne.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk1_n

山贼喽啰 · 走路 A：左脚在前 · 朝上（背影）。附 `map_bandit_n.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk1_n.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_walk2_n

山贼喽啰 · 走路 B：右脚在前 · 朝上（背影）。附 `map_bandit_n.png`、`map_bandit_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_bandit_walk2_n.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_bandit_walk1_n.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 3 批 · 山贼飞刀手 · `map_thrower_walk1_*` / `map_thrower_walk2_*`

### map_thrower_walk1_s

山贼飞刀手 · 走路 A：左脚在前 · 朝下（面向镜头）。附 `map_thrower_s.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk1_s.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk2_s

山贼飞刀手 · 走路 B：右脚在前 · 朝下（面向镜头）。附 `map_thrower_s.png`、`map_thrower_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk2_s.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_thrower_walk1_s.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk1_se

山贼飞刀手 · 走路 A：左脚在前 · 朝右下。附 `map_thrower_se.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk1_se.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk2_se

山贼飞刀手 · 走路 B：右脚在前 · 朝右下。附 `map_thrower_se.png`、`map_thrower_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk2_se.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_thrower_walk1_se.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk1_e

山贼飞刀手 · 走路 A：左脚在前 · 朝右。附 `map_thrower_e.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk1_e.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk2_e

山贼飞刀手 · 走路 B：右脚在前 · 朝右。附 `map_thrower_e.png`、`map_thrower_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk2_e.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_thrower_walk1_e.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk1_ne

山贼飞刀手 · 走路 A：左脚在前 · 朝右上（背影偏右）。附 `map_thrower_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk1_ne.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk2_ne

山贼飞刀手 · 走路 B：右脚在前 · 朝右上（背影偏右）。附 `map_thrower_ne.png`、`map_thrower_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk2_ne.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_thrower_walk1_ne.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk1_n

山贼飞刀手 · 走路 A：左脚在前 · 朝上（背影）。附 `map_thrower_n.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk1_n.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame A (stride): mid-stride of a calm, natural walk — the character's LEFT leg is forward with the heel just touching down, the RIGHT leg is behind pushing off on the toes; arms swing opposite to the legs (RIGHT arm slightly forward, LEFT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_walk2_n

山贼飞刀手 · 走路 B：右脚在前 · 朝上（背影）。附 `map_thrower_n.png`、`map_thrower_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_thrower_walk2_n.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_thrower_walk1_n.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame B (stride, the mirror step of frame A): mid-stride of a calm, natural walk — the character's RIGHT leg is forward with the heel just touching down, the LEFT leg is behind pushing off on the toes; arms swing opposite to the legs (LEFT arm slightly forward, RIGHT arm slightly back). The weapon stays in the same hand and held the same way as in the reference, simply carried along with the arm swing. Robe hem, sleeves, hair and ribbons trail slightly backward from the motion. Upright posture, relaxed shoulders. Walking, NOT running, NOT attacking, NOT leaping.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 3 批 · 山贼头目 · `map_chief_walk1_*` / `map_chief_walk2_*`

### map_chief_walk1_s

山贼头目 · 走路 A：左脚在前 · 朝下（面向镜头）。附 `map_chief_s.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk1_s.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk2_s

山贼头目 · 走路 B：右脚在前 · 朝下（面向镜头）。附 `map_chief_s.png`、`map_chief_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk2_s.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_chief_walk1_s.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk1_se

山贼头目 · 走路 A：左脚在前 · 朝右下。附 `map_chief_se.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk1_se.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk2_se

山贼头目 · 走路 B：右脚在前 · 朝右下。附 `map_chief_se.png`、`map_chief_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk2_se.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_chief_walk1_se.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk1_e

山贼头目 · 走路 A：左脚在前 · 朝右。附 `map_chief_e.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk1_e.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk2_e

山贼头目 · 走路 B：右脚在前 · 朝右。附 `map_chief_e.png`、`map_chief_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk2_e.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_chief_walk1_e.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk1_ne

山贼头目 · 走路 A：左脚在前 · 朝右上（背影偏右）。附 `map_chief_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk1_ne.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk2_ne

山贼头目 · 走路 B：右脚在前 · 朝右上（背影偏右）。附 `map_chief_ne.png`、`map_chief_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk2_ne.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_chief_walk1_ne.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk1_n

山贼头目 · 走路 A：左脚在前 · 朝上（背影）。附 `map_chief_n.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk1_n.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_walk2_n

山贼头目 · 走路 B：右脚在前 · 朝上（背影）。附 `map_chief_n.png`、`map_chief_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_chief_walk2_n.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_chief_walk1_n.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 4 批 · 胖虎（人形） · `map_pangHu_walk1_*` / `map_pangHu_walk2_*`

### map_pangHu_walk1_s

胖虎（人形） · 走路 A：左脚在前 · 朝下（面向镜头）。附 `map_pangHu_s.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_s.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk2_s

胖虎（人形） · 走路 B：右脚在前 · 朝下（面向镜头）。附 `map_pangHu_s.png`、`map_pangHu_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_s.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_pangHu_walk1_s.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk1_se

胖虎（人形） · 走路 A：左脚在前 · 朝右下。附 `map_pangHu_se.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_se.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk2_se

胖虎（人形） · 走路 B：右脚在前 · 朝右下。附 `map_pangHu_se.png`、`map_pangHu_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_se.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_pangHu_walk1_se.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk1_e

胖虎（人形） · 走路 A：左脚在前 · 朝右。附 `map_pangHu_e.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_e.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk2_e

胖虎（人形） · 走路 B：右脚在前 · 朝右。附 `map_pangHu_e.png`、`map_pangHu_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_e.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_pangHu_walk1_e.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk1_ne

胖虎（人形） · 走路 A：左脚在前 · 朝右上（背影偏右）。附 `map_pangHu_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_ne.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk2_ne

胖虎（人形） · 走路 B：右脚在前 · 朝右上（背影偏右）。附 `map_pangHu_ne.png`、`map_pangHu_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_ne.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_pangHu_walk1_ne.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk1_n

胖虎（人形） · 走路 A：左脚在前 · 朝上（背影）。附 `map_pangHu_n.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_n.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame A (heavy stride): a slow, heavy, swaggering walk — the character's LEFT leg is forward with the heel planting down, the RIGHT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_walk2_n

胖虎（人形） · 走路 B：右脚在前 · 朝上（背影）。附 `map_pangHu_n.png`、`map_pangHu_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_n.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same height from soles to top of head) and the same foot anchor point: the midpoint between the two feet at horizontal center, 6% above the bottom edge. Keep the face, hair, costume, colors, weapon and every costume detail IDENTICAL to the reference — only the legs, arms and the swing of cloth change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_pangHu_walk1_n.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Walk frame B (heavy stride, the mirror step of frame A): a slow, heavy, swaggering walk — the character's RIGHT leg is forward with the heel planting down, the LEFT leg is behind pushing off; the big body rolls slightly toward the forward leg, the free arm swings a little. The weapon stays resting on the shoulder / in the hand exactly as in the reference. Clothes and pelt sway with the step. Walking, NOT running, NOT attacking.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 4 批 · 胖虎（猛虎） · `map_tiger_walk1_*` / `map_tiger_walk2_*`

### map_tiger_walk1_s

胖虎（猛虎） · 走路 A：左前爪 + 右后爪在前 · 朝下（面向镜头）。附 `map_tiger_s.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_s.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH toward the camera, head and chest toward the viewer, body extending back up the image.
Action: Walk frame A (prowl): a slow, powerful prowling walk — the FRONT-LEFT paw and the HIND-RIGHT paw are reaching forward, the FRONT-RIGHT and HIND-LEFT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk2_s

胖虎（猛虎） · 走路 B：右前爪 + 左后爪在前 · 朝下（面向镜头）。附 `map_tiger_s.png`、`map_tiger_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_s.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_tiger_walk1_s.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH toward the camera, head and chest toward the viewer, body extending back up the image.
Action: Walk frame B (prowl, the mirror step of frame A): a slow, powerful prowling walk — the FRONT-RIGHT paw and the HIND-LEFT paw are reaching forward, the FRONT-LEFT and HIND-RIGHT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve to the other side. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk1_se

胖虎（猛虎） · 走路 A：左前爪 + 右后爪在前 · 朝右下。附 `map_tiger_se.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_se.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body pointing toward the BOTTOM-RIGHT of the image, three-quarter front view.
Action: Walk frame A (prowl): a slow, powerful prowling walk — the FRONT-LEFT paw and the HIND-RIGHT paw are reaching forward, the FRONT-RIGHT and HIND-LEFT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk2_se

胖虎（猛虎） · 走路 B：右前爪 + 左后爪在前 · 朝右下。附 `map_tiger_se.png`、`map_tiger_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_se.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_tiger_walk1_se.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body pointing toward the BOTTOM-RIGHT of the image, three-quarter front view.
Action: Walk frame B (prowl, the mirror step of frame A): a slow, powerful prowling walk — the FRONT-RIGHT paw and the HIND-LEFT paw are reaching forward, the FRONT-LEFT and HIND-RIGHT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve to the other side. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk1_e

胖虎（猛虎） · 走路 A：左前爪 + 右后爪在前 · 朝右。附 `map_tiger_e.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_e.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile walking toward the RIGHT edge of the image.
Action: Walk frame A (prowl): a slow, powerful prowling walk — the FRONT-LEFT paw and the HIND-RIGHT paw are reaching forward, the FRONT-RIGHT and HIND-LEFT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk2_e

胖虎（猛虎） · 走路 B：右前爪 + 左后爪在前 · 朝右。附 `map_tiger_e.png`、`map_tiger_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_e.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_tiger_walk1_e.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile walking toward the RIGHT edge of the image.
Action: Walk frame B (prowl, the mirror step of frame A): a slow, powerful prowling walk — the FRONT-RIGHT paw and the HIND-LEFT paw are reaching forward, the FRONT-LEFT and HIND-RIGHT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve to the other side. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk1_ne

胖虎（猛虎） · 走路 A：左前爪 + 右后爪在前 · 朝右上（背影偏右）。附 `map_tiger_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_ne.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter back view, heading toward the UPPER-RIGHT of the image; hindquarters and tail toward the viewer.
Action: Walk frame A (prowl): a slow, powerful prowling walk — the FRONT-LEFT paw and the HIND-RIGHT paw are reaching forward, the FRONT-RIGHT and HIND-LEFT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk2_ne

胖虎（猛虎） · 走路 B：右前爪 + 左后爪在前 · 朝右上（背影偏右）。附 `map_tiger_ne.png`、`map_tiger_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_ne.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_tiger_walk1_ne.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter back view, heading toward the UPPER-RIGHT of the image; hindquarters and tail toward the viewer.
Action: Walk frame B (prowl, the mirror step of frame A): a slow, powerful prowling walk — the FRONT-RIGHT paw and the HIND-LEFT paw are reaching forward, the FRONT-LEFT and HIND-RIGHT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve to the other side. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk1_n

胖虎（猛虎） · 走路 A：左前爪 + 右后爪在前 · 朝上（背影）。附 `map_tiger_n.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_n.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, away from camera; we see the hindquarters, back and tail, head beyond.
Action: Walk frame A (prowl): a slow, powerful prowling walk — the FRONT-LEFT paw and the HIND-RIGHT paw are reaching forward, the FRONT-RIGHT and HIND-LEFT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_walk2_n

胖虎（猛虎） · 走路 B：右前爪 + 左后爪在前 · 朝上（背影）。附 `map_tiger_n.png`、`map_tiger_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_n.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size (same head size, same length from nose to tail base) and the same foot anchor point: the point on the ground under the middle of its body at horizontal center, 6% above the bottom edge. Keep the face, stripes, colors and every detail IDENTICAL to the reference — only the legs, shoulders and tail change. This frame will alternate with the reference in-game many times per second, so any difference in costume, proportions or brushwork will flicker. A second attached reference map_tiger_walk1_n.png is the opposite step of this same walk: match its size, line weight and level of detail exactly.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, away from camera; we see the hindquarters, back and tail, head beyond.
Action: Walk frame B (prowl, the mirror step of frame A): a slow, powerful prowling walk — the FRONT-RIGHT paw and the HIND-LEFT paw are reaching forward, the FRONT-LEFT and HIND-RIGHT paws are planted behind pushing off; shoulder blades rolling, head held low and level, tail swaying in a loose curve to the other side. Walking, NOT pouncing, NOT crouching to leap.
The whole body, weapon, sleeves, hair and tail must stay inside the canvas. Do NOT draw motion lines, dust, footprints or any effects.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


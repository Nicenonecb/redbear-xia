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
| 4 | 胖虎人形、猛虎（照着站姿图逐张细写的） | 20 |

一共 70 张。**每批先出 `walk1_s`、`walk2_s` 两张给我看**，我放进游戏里确认走起来顺、不闪，再出剩下的。
主角走得最多，最先出；胖虎是 Boss、镜头会推近看他，第 4 批写得最细，也可以提到第 2 批出。

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

> 胖虎这一批是照着现有五张站姿图一张张看过写的：大刀是**右手垂在腿边**（不是扛在肩上），
> 走法是胖子的慢步、肚子领路、身子左右晃，虎皮披风的毛穗和腰上两个铁铃铛跟着甩。
> 「图上左右」和「他自己的左右」都写清楚了，避免出成同一只脚。

### map_pangHu_walk1_s

胖虎（人形） · 走路 A · 朝下（面向镜头）。附 `map_pangHu_s.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_s.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_s.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: facing SOUTH, straight toward the camera, exactly like the reference: face, belly and both feet seen from the front, cape spread wide behind both arms, the cleaver hanging on the IMAGE-LEFT side (his right hand).
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step A: his LEFT foot (image-RIGHT) is forward — so it sits slightly LOWER on the image and a little larger, sole flat as weight lands; his RIGHT foot (image-left) is behind and slightly HIGHER on the image, heel lifted, only the toes touching. The belly and torso tilt a few degrees toward image-right over the landing foot. The cleaver (image-left) swings slightly FORWARD (its tip moves a little toward the bottom of the image); his left fist (image-right) swings slightly back. The cape tufts on the image-left side flare outward a little.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk2_s

胖虎（人形） · 走路 B · 朝下（面向镜头）。附 `map_pangHu_s.png`、`map_pangHu_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_s.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_s.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_pangHu_walk1_s.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: facing SOUTH, straight toward the camera, exactly like the reference: face, belly and both feet seen from the front, cape spread wide behind both arms, the cleaver hanging on the IMAGE-LEFT side (his right hand).
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step B (mirror of step A): his RIGHT foot (image-LEFT) is forward — slightly LOWER on the image and a little larger, sole flat as weight lands; his LEFT foot (image-right) is behind and slightly HIGHER on the image, heel lifted. The belly and torso tilt a few degrees toward image-left over the landing foot. The cleaver (image-left) swings slightly BACK (its tip moves a little up and toward image-left, behind his leg); his left fist (image-right) swings slightly forward. The cape tufts on the image-right side flare outward a little.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk1_se

胖虎（人形） · 走路 A · 朝右下。附 `map_pangHu_se.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_se.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_se.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter front view facing the BOTTOM-RIGHT, exactly like the reference: face turned toward the lower right, belly toward the viewer, the cleaver hanging on the IMAGE-LEFT side (nearest the viewer's left), left fist on the image-right.
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step A: his LEFT foot (the one on the image-right) steps forward toward the lower-right — it is lower on the image and planted flat; his RIGHT foot (image-left, nearer the cleaver) is behind toward the upper-left, heel lifted. Body weight rolls onto the forward foot, belly tilting slightly to image-right. The cleaver swings slightly forward toward the lower-right; the left fist swings slightly back.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk2_se

胖虎（人形） · 走路 B · 朝右下。附 `map_pangHu_se.png`、`map_pangHu_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_se.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_se.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_pangHu_walk1_se.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter front view facing the BOTTOM-RIGHT, exactly like the reference: face turned toward the lower right, belly toward the viewer, the cleaver hanging on the IMAGE-LEFT side (nearest the viewer's left), left fist on the image-right.
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step B (mirror of step A): his RIGHT foot (image-left, cleaver side) steps forward toward the lower-right and is planted flat; his LEFT foot (image-right) is behind, heel lifted. Body weight rolls onto the right leg, belly tilting slightly to image-left. The cleaver swings slightly back behind his right leg; the left fist swings slightly forward toward the lower-right.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk1_e

胖虎（人形） · 走路 A · 朝右。附 `map_pangHu_e.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_e.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_e.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: full side profile facing the RIGHT edge of the image, exactly like the reference: big belly in profile toward the right, the long tiger-pelt cape hanging down his back on the image-left, his RIGHT (cleaver) arm is the NEAR arm toward the viewer, the cleaver hanging down in front of his near leg with the blade pointing toward image-left-bottom.
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step A: the FAR leg (his left) is forward toward the image-right, heel planting down; the NEAR leg (his right) is behind toward the image-left, heel up and pushing off. Seen in profile the two legs make a short inverted V (short stride — he is fat). The near cleaver arm swings slightly BACK, so the cleaver tilts more toward image-left. The cape's lower tufts swing a little backward (image-left). Belly bounces slightly down over the forward leg.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk2_e

胖虎（人形） · 走路 B · 朝右。附 `map_pangHu_e.png`、`map_pangHu_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_e.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_e.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_pangHu_walk1_e.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: full side profile facing the RIGHT edge of the image, exactly like the reference: big belly in profile toward the right, the long tiger-pelt cape hanging down his back on the image-left, his RIGHT (cleaver) arm is the NEAR arm toward the viewer, the cleaver hanging down in front of his near leg with the blade pointing toward image-left-bottom.
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step B (mirror of step A): the NEAR leg (his right) is forward toward the image-right, heel planting down; the FAR leg (his left) is behind, heel up. Short inverted-V stride. The near cleaver arm swings slightly FORWARD, so the cleaver hangs more vertically / slightly toward image-right. The cape tufts swing a little backward. Belly bounces slightly down over the forward leg.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk1_ne

胖虎（人形） · 走路 A · 朝右上（背影偏右）。附 `map_pangHu_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_ne.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_ne.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter BACK view heading toward the UPPER-RIGHT, exactly like the reference: we see the back of the tiger-pelt cape and the tiger-head hood from behind, his muscular RIGHT arm on the image-right holding the cleaver out to the side, face mostly hidden (just the tiger muzzle in profile at the top).
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step A: his LEFT foot (image-left) steps forward toward the upper-right, so it is HIGHER on the image and slightly smaller, sole planting; his RIGHT foot (image-right) is behind and LOWER on the image, the sole of the sandal partly visible as the heel lifts. The cleaver arm (image-right) swings slightly back (cleaver lower and a bit toward the viewer). The cape's ragged hem swings toward the image-left.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk2_ne

胖虎（人形） · 走路 B · 朝右上（背影偏右）。附 `map_pangHu_ne.png`、`map_pangHu_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_ne.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_ne.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_pangHu_walk1_ne.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter BACK view heading toward the UPPER-RIGHT, exactly like the reference: we see the back of the tiger-pelt cape and the tiger-head hood from behind, his muscular RIGHT arm on the image-right holding the cleaver out to the side, face mostly hidden (just the tiger muzzle in profile at the top).
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step B (mirror of step A): his RIGHT foot (image-right) steps forward toward the upper-right — HIGHER on the image, sole planting; his LEFT foot (image-left) is behind and LOWER on the image, heel lifting so the sandal sole shows. The cleaver arm swings slightly forward (cleaver a bit higher and farther toward the upper-right). The cape's ragged hem swings toward the image-right.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk1_n

胖虎（人形） · 走路 A · 朝上（背影）。附 `map_pangHu_n.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk1_n.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_n.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: facing NORTH, back fully to the camera, exactly like the reference: the tiger-head hood and its ears seen from behind at the top, the pelt's black chevron stripes running down the spine, both arms visible at the sides, the cleaver on the IMAGE-RIGHT (his right hand).
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step A: his LEFT foot (image-LEFT) steps forward (away from the camera) — it is HIGHER on the image and a little smaller; his RIGHT foot (image-right) is behind, LOWER on the image, heel lifted so the bottom of the sandal shows. Hips and the pelt shift a few degrees toward image-left over the planted foot. The cleaver (image-right) swings slightly back toward the camera; the left fist swings slightly forward.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_pangHu_walk2_n

胖虎（人形） · 走路 B · 朝上（背影）。附 `map_pangHu_n.png`、`map_pangHu_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_pangHu_walk2_n.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_pangHu_n.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the character's head size and position, total height from sole to the tiger-head ears, the midpoint between the two feet at horizontal center about 6% above the bottom edge, the face, grin, scar, earrings, the tiger-head hood, every stripe pattern style, the belt, the bell weights, the bracers, the cleaver's shape and size. ONLY the legs, the swing of both arms, and the sway of cloth/pelt/tassels change. This frame alternates with the standing reference several times per second in game: any change in costume, proportions, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_pangHu_walk1_n.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu, the fat bandit king (identity must match the reference pixel-for-pixel in spirit): a huge, very fat man with an enormous round bare belly and bare chest; a WHITE TIGER PELT worn as a hood and long shaggy cape — the tiger's head (ears, orange-tan muzzle, fangs) sits on top of his own head, the pelt is ivory with bold black jagged chevron stripes and hangs in ragged pointed tufts down to his knees; a dark charcoal cross-wrapped strap over the chest; a thick twisted ivory rope belt over a vermilion sash at the waist, with two round dark-iron bell weights hanging from the rope; dark charcoal wide trousers; rope-bound straw sandals over dark wrappings; black wrist bracers wound with vermilion cord on both forearms; gold hoop earrings; short black goatee and moustache, a vermilion scar across one cheek, broad cheerful-menacing grin. Weapon: a huge broad CLEAVER-SABER (wide single-edged blade that flares at the tip, ivory blade blotched with black ink, short black grip wrapped in vermilion cord with a vermilion tassel). He carries it in his RIGHT hand, blade hanging DOWN beside his leg, tip pointing toward the ground and slightly outward — NOT on his shoulder.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: facing NORTH, back fully to the camera, exactly like the reference: the tiger-head hood and its ears seen from behind at the top, the pelt's black chevron stripes running down the spine, both arms visible at the sides, the cleaver on the IMAGE-RIGHT (his right hand).
Gait — this is a fat strongman's slow, heavy, swaggering walk, NOT a light stride: short steps (feet move only about one foot-length apart), knees slightly bent, the huge belly leads; the body weight rolls side to side over the planted leg; shoulders stay broad and squared. The cleaver arm swings only a little — the heavy blade swings like a pendulum by his leg, never lifted. The free (left) fist swings slightly opposite to the legs. The tiger-pelt cape's ragged tufts and the hanging tiger paws sway with the step (swinging AWAY from the forward leg), the two iron bell weights on the rope belt swing, the vermilion tassel and sash ends trail.
Step B (mirror of step A): his RIGHT foot (image-RIGHT) steps forward — HIGHER on the image and a little smaller; his LEFT foot (image-left) is behind, LOWER on the image, heel lifted so the bottom of the sandal shows. Hips and the pelt shift a few degrees toward image-right. The cleaver swings slightly forward (up the image); the left fist swings slightly back toward the camera.
Everything (cleaver, cape tufts, tail, claws) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

## 第 4 批 · 胖虎（猛虎） · `map_tiger_walk1_*` / `map_tiger_walk2_*`

> 猛虎走路是大猫潜行：头压低不动、肩胛骨一起一伏、对角的两条腿一起迈，尾巴高高卷着、尾尖两步之间换边甩。
> 不是小跑、不是扑。每个朝向写清楚了哪只爪在前、哪边肩胛高。

### map_tiger_walk1_s

胖虎（猛虎） · 走路 A · 朝下（面向镜头）。附 `map_tiger_s.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_s.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: coming straight toward the camera (SOUTH), exactly like the reference: head low at the front center with snarling face and red eyes, the two front legs spread on either side, the back and shoulders rising behind the head, hindquarters further up the image, the tail curling up high on the IMAGE-RIGHT.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step A: the tiger's LEFT front paw (image-RIGHT) is lifted slightly and reaching forward — a little LOWER on the image and larger; its RIGHT front paw (image-left) is planted, the leg straight and taking the weight, so the image-left shoulder rises up a bit. Of the hind legs, the RIGHT hind (image-left, behind) steps forward while the LEFT hind (image-right) is planted. The tail tip swings toward the image-right.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk2_s

胖虎（猛虎） · 走路 B · 朝下（面向镜头）。附 `map_tiger_s.png`、`map_tiger_walk1_s.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_s.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_tiger_walk1_s.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: coming straight toward the camera (SOUTH), exactly like the reference: head low at the front center with snarling face and red eyes, the two front legs spread on either side, the back and shoulders rising behind the head, hindquarters further up the image, the tail curling up high on the IMAGE-RIGHT.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step B (mirror of step A): the RIGHT front paw (image-LEFT) is lifted slightly and reaching forward — a little LOWER on the image and larger; the LEFT front paw (image-right) is planted and taking the weight, so the image-right shoulder rises up a bit. The LEFT hind (image-right) steps forward while the RIGHT hind (image-left) is planted. The tail tip swings toward the image-left (but the tail still curls up on the image-right side, just less far out).
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk1_se

胖虎（猛虎） · 走路 A · 朝右下。附 `map_tiger_se.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_se.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter front view prowling toward the BOTTOM-RIGHT, exactly like the reference: head low at the lower right with red eyes and bared fangs, body stretching diagonally up toward the upper-left, the tail curling high at the upper-left.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step A: the NEAR front leg (closest to the viewer, lower on the image) is reaching forward toward the lower-right with the paw just lifting off; the FAR front leg is planted under the chest. The FAR hind leg steps forward while the NEAR hind leg (lower-left on the image) is planted and pushing back. The near shoulder blade is low (reaching), the far shoulder blade high. Tail tip swings toward the upper-right.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk2_se

胖虎（猛虎） · 走路 B · 朝右下。附 `map_tiger_se.png`、`map_tiger_walk1_se.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_se.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_tiger_walk1_se.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter front view prowling toward the BOTTOM-RIGHT, exactly like the reference: head low at the lower right with red eyes and bared fangs, body stretching diagonally up toward the upper-left, the tail curling high at the upper-left.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step B (mirror of step A): the FAR front leg reaches forward toward the lower-right with the paw just lifting off, the NEAR front leg is planted under the chest. The NEAR hind leg steps forward while the FAR hind leg is planted and pushing back. The near shoulder blade rises high (taking weight). Tail tip swings toward the upper-left.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk1_e

胖虎（猛虎） · 走路 A · 朝右。附 `map_tiger_e.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_e.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: side view prowling toward the RIGHT edge, exactly like the reference: head low at the right with the snarl in profile, long level back, hindquarters on the left, tail rising from the rump and curling high over the upper-left.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step A (classic side-view prowl): the NEAR front leg reaches forward to the right, paw just above the ground; the FAR front leg is planted vertically under the shoulder. The FAR hind leg swings forward under the belly while the NEAR hind leg is extended back to the left, pushing off with the toes. The near shoulder blade dips, the far one rises. Tail tip swings slightly up.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk2_e

胖虎（猛虎） · 走路 B · 朝右。附 `map_tiger_e.png`、`map_tiger_walk1_e.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_e.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_tiger_walk1_e.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: side view prowling toward the RIGHT edge, exactly like the reference: head low at the right with the snarl in profile, long level back, hindquarters on the left, tail rising from the rump and curling high over the upper-left.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step B (mirror of step A): the FAR front leg reaches forward to the right, paw just above the ground; the NEAR front leg is planted vertically under the shoulder. The NEAR hind leg swings forward under the belly while the FAR hind leg is extended back, pushing off. The near shoulder blade rises (weight on it). Tail tip swings slightly down/back.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk1_ne

胖虎（猛虎） · 走路 A · 朝右上（背影偏右）。附 `map_tiger_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_ne.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter back view prowling toward the UPPER-RIGHT, exactly like the reference: we see the striped back and hindquarters, the head up at the far upper-right in profile, the tail curling high on the image-left.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step A: the NEAR front leg (image-lower, right side) reaches forward toward the upper-right; the FAR front leg is planted. The FAR hind leg steps forward; the NEAR hind leg (closest to the viewer, lower-left) is extended back with the paw pads partly visible as it pushes off. Tail tip swings toward the image-left.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk2_ne

胖虎（猛虎） · 走路 B · 朝右上（背影偏右）。附 `map_tiger_ne.png`、`map_tiger_walk1_ne.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_ne.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_tiger_walk1_ne.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: three-quarter back view prowling toward the UPPER-RIGHT, exactly like the reference: we see the striped back and hindquarters, the head up at the far upper-right in profile, the tail curling high on the image-left.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step B (mirror of step A): the FAR front leg reaches forward toward the upper-right; the NEAR front leg is planted. The NEAR hind leg steps forward under the body; the FAR hind leg is extended back pushing off. Tail tip swings toward the image-right / center.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk1_n

胖虎（猛虎） · 走路 A · 朝上（背影）。附 `map_tiger_n.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk1_n.png for a top-down wuxia game. It is frame A of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: walking straight AWAY from the camera (NORTH), exactly like the reference: we see the broad striped back with the spine stripe down the center, the ears at the top, the two hind legs at the bottom and the tail curling down and out to the IMAGE-LEFT.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step A: the LEFT hind leg (image-LEFT) is planted and straight; the RIGHT hind leg (image-right) is lifted, the paw pads visible from behind as it swings forward. At the front, the LEFT front paw (image-left, near the shoulder) reaches forward (up the image) while the RIGHT front paw is planted. Hips tilt slightly: the image-left hip higher. Tail swings a little further out to the image-left.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```

### map_tiger_walk2_n

胖虎（猛虎） · 走路 B · 朝上（背影）。附 `map_tiger_n.png`、`map_tiger_walk1_n.png`。

```text
Game map WALK-CYCLE FRAME named map_tiger_walk2_n.png for a top-down wuxia game. It is frame B of a 4-frame walk loop: step A → standing reference → step B → standing reference.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction — this is the master image. Keep IDENTICAL to the reference: canvas size (1254x1254), the tiger's overall size (same head size, same length from nose to tail base, same shoulder height), and the ground point under the middle of its body at horizontal center about 6% above the bottom edge; the same stripe style, fur texture, eye colour and claws. ONLY the legs, shoulder roll, head bob (very slight) and tail swing change. This frame alternates with the standing reference several times per second in game: any change in size, stripe density, line weight or colour will visibly flicker. Overlay-check against the reference before saving.
A second attached reference map_tiger_walk1_n.png is step A of this same walk: step B must be its MIRROR STEP (opposite legs forward, opposite arm/tail swing) with exactly the same size, line weight and level of detail.
Character: Pang Hu transformed into a giant TIGER, identical to the reference: thick shaggy ivory #efe7d6 fur painted with bold black ink-brush stripes (stripes follow the body's curves, chevrons down the spine), fluffy ink-tipped edges with tiny dry-brush ink flecks, massive shoulders, big paws with long black curved claws, glowing VERMILION eyes, snarling mouth showing fangs, long thick tail banded ivory-and-black ending in a solid black tuft, curling high in a loose hook.
Camera: IDENTICAL to the reference — true 45-degree oblique top-down game map view, camera elevated and looking down, same foreshortening, same viewing angle. Do not rotate or re-angle the character.
Orientation: walking straight AWAY from the camera (NORTH), exactly like the reference: we see the broad striped back with the spine stripe down the center, the ears at the top, the two hind legs at the bottom and the tail curling down and out to the IMAGE-LEFT.
Gait — a big cat's slow, menacing PROWL (stalking walk), NOT a trot, NOT a run, NOT a pounce: the head stays LOW and LEVEL, eyes locked forward; the shoulder blades roll up and down visibly under the fur as each front leg moves; the spine stays long and level; diagonal leg pairs move together (front-left with hind-right, front-right with hind-left); the paw that is lifted is only a little off the ground, claws partly drawn in; the planted paws are spread with claws touching the ground. The tail keeps its high curl but its tip swings to the opposite side between step A and step B.
Step B (mirror of step A): the RIGHT hind leg (image-RIGHT) is planted and straight; the LEFT hind leg (image-left) is lifted, paw pads visible from behind. At the front, the RIGHT front paw reaches forward (up the image) while the LEFT front paw is planted. Hips tilt slightly: the image-right hip higher. Tail swings back closer to the body.
Everything (tail, claws, fur tufts) must stay fully inside the canvas.
Style: EXACTLY match the reference's rendering — fine hand-inked linework with dry-brush ink-wash shading, ivory rice-paper #efe7d6 light areas, deep ink #1a1714 darks, vermilion #b3261e only where the reference already has it. Same line weight, same level of detail, same texture density as the reference. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO motion lines, NO dust, NO footprints, NO text, NO labels.
```


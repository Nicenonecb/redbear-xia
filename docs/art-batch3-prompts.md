# 第三批出图 · 提示词（直接复制给 Codex）

> 和 [art-batch3-topdown.md](art-batch3-topdown.md) 的清单一一对应。每条都是完整的，复制整段就行。
> 提示词用英文写：上次 Codex 出 `map_wenShaohua_s` 就是用英文提示词出的，效果好。每条上面的中文是给你看的说明。

## 先对 Codex 说这一段（每一批开头说一次）

```text
请按 docs/art-batch3-prompts.md 里「第 N 批」的提示词逐张出图，要求：
1. 每张图按提示词里写的文件名保存到 public/art/，原尺寸 PNG，不要缩放、不要压缩、不要裁边。
2. 每张图都要是真透明背景（地面贴图除外），出完检查一下 alpha。
3. 提示词里写了「attached reference」的，把对应的参考图（都在 public/art/ 里）作为参考图一起给图像工具。
4. 同一个人物的所有图：画布大小、人物大小、脚底位置必须和他的第一张图完全一致，不一致就重出。
5. 出好一张就在 public/art/manifest.json 的 images 里加一行 "文件名不带后缀": "文件名.png"。
6. 实际用的提示词记到 docs/art-log/<文件名>.txt。
```

## 出图顺序

| 批 | 内容 | 张数 |
|---|---|---|
| 1 | 温少华：站姿另外 4 个朝向 → 蓄势、出招各 5 个朝向 → 6 张招式特效 | 4 + 10 + 6 = 20 |
| 2 | 地面 4 张 + 竹丛、山石、灌木 6 张 | 10 |
| 3 | 胖虎人形站姿 5 + 姿势 15 → 猛虎站姿 5 + 姿势 20 → 变身 4 张 → 特效 3 张 | 52 |
| 4 | 山贼喽啰、飞刀手、头目：站姿 + 姿势 | 15 + 30 = 45 |
| 5 | 其余地图物件 17 张 + 任新野 2 张 + 红熊 1 张 | 20 |
| 6 | 于无瑕：站姿 5 + 姿势 10 | 15 |

**每批先出第一张给我看**（比如胖虎先出 `map_pangHu_s`），我放进游戏里确认大小和角度对了，再出剩下的，省得整批返工。


## 第 1 批 · 温少华 + 招式特效

参考图：`map_wenShaohua_s.png`（已经出好）和 `portrait_wenShaohua.png`。

### map_wenShaohua_se

站姿 · 朝右下。附 `map_wenShaohua_s.png`、`portrait_wenShaohua.png`。

```text
Game map character sprite named map_wenShaohua_se.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_wenShaohua_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position: the midpoint between the two boot soles at horizontal center, 6% above the bottom edge. Do not crop to content; keep the same transparent margins.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_e

站姿 · 朝右。附 `map_wenShaohua_s.png`、`portrait_wenShaohua.png`。

```text
Game map character sprite named map_wenShaohua_e.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_wenShaohua_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position: the midpoint between the two boot soles at horizontal center, 6% above the bottom edge. Do not crop to content; keep the same transparent margins.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_ne

站姿 · 朝右上（背影偏右）。附 `map_wenShaohua_s.png`、`portrait_wenShaohua.png`。

```text
Game map character sprite named map_wenShaohua_ne.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_wenShaohua_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position: the midpoint between the two boot soles at horizontal center, 6% above the bottom edge. Do not crop to content; keep the same transparent margins.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_n

站姿 · 朝上（背影）。附 `map_wenShaohua_s.png`、`portrait_wenShaohua.png`。

```text
Game map character sprite named map_wenShaohua_n.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_wenShaohua_s.png — same square canvas size (1254x1254), same character height on the canvas, same foot position: the midpoint between the two boot soles at horizontal center, 6% above the bottom edge. Do not crop to content; keep the same transparent margins.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_ready_s

蓄势：沉肩压步、剑收到身侧后方 · 朝下（面向镜头）。附 `map_wenShaohua_s.png`。

```text
Game map ACTION FRAME named map_wenShaohua_ready_s.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Wind-up: knees bent, weight sunk, shoulders dropped; the sword pulled back behind his body with the tip pointing backward; sleeves and hair ribbon swept back. A coiled spring about to strike.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_ready_se

蓄势：沉肩压步、剑收到身侧后方 · 朝右下。附 `map_wenShaohua_se.png`。

```text
Game map ACTION FRAME named map_wenShaohua_ready_se.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Wind-up: knees bent, weight sunk, shoulders dropped; the sword pulled back behind his body with the tip pointing backward; sleeves and hair ribbon swept back. A coiled spring about to strike.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_ready_e

蓄势：沉肩压步、剑收到身侧后方 · 朝右。附 `map_wenShaohua_e.png`。

```text
Game map ACTION FRAME named map_wenShaohua_ready_e.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Wind-up: knees bent, weight sunk, shoulders dropped; the sword pulled back behind his body with the tip pointing backward; sleeves and hair ribbon swept back. A coiled spring about to strike.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_ready_ne

蓄势：沉肩压步、剑收到身侧后方 · 朝右上（背影偏右）。附 `map_wenShaohua_ne.png`。

```text
Game map ACTION FRAME named map_wenShaohua_ready_ne.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Wind-up: knees bent, weight sunk, shoulders dropped; the sword pulled back behind his body with the tip pointing backward; sleeves and hair ribbon swept back. A coiled spring about to strike.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_ready_n

蓄势：沉肩压步、剑收到身侧后方 · 朝上（背影）。附 `map_wenShaohua_n.png`。

```text
Game map ACTION FRAME named map_wenShaohua_ready_n.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Wind-up: knees bent, weight sunk, shoulders dropped; the sword pulled back behind his body with the tip pointing backward; sleeves and hair ribbon swept back. A coiled spring about to strike.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_strike_s

出招：剑往面朝的方向横挥出去 · 朝下（面向镜头）。附 `map_wenShaohua_s.png`。

```text
Game map ACTION FRAME named map_wenShaohua_strike_s.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Strike: the instant the sword sweeps horizontally outward toward the direction he faces; sword arm fully extended, body leaning forward, robe hem and ribbon flung outward by the motion. Blade fully inside the canvas.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_strike_se

出招：剑往面朝的方向横挥出去 · 朝右下。附 `map_wenShaohua_se.png`。

```text
Game map ACTION FRAME named map_wenShaohua_strike_se.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Strike: the instant the sword sweeps horizontally outward toward the direction he faces; sword arm fully extended, body leaning forward, robe hem and ribbon flung outward by the motion. Blade fully inside the canvas.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_strike_e

出招：剑往面朝的方向横挥出去 · 朝右。附 `map_wenShaohua_e.png`。

```text
Game map ACTION FRAME named map_wenShaohua_strike_e.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Strike: the instant the sword sweeps horizontally outward toward the direction he faces; sword arm fully extended, body leaning forward, robe hem and ribbon flung outward by the motion. Blade fully inside the canvas.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_strike_ne

出招：剑往面朝的方向横挥出去 · 朝右上（背影偏右）。附 `map_wenShaohua_ne.png`。

```text
Game map ACTION FRAME named map_wenShaohua_strike_ne.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Strike: the instant the sword sweeps horizontally outward toward the direction he faces; sword arm fully extended, body leaning forward, robe hem and ribbon flung outward by the motion. Blade fully inside the canvas.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_wenShaohua_strike_n

出招：剑往面朝的方向横挥出去 · 朝上（背影）。附 `map_wenShaohua_n.png`。

```text
Game map ACTION FRAME named map_wenShaohua_strike_n.png for a top-down wuxia game.
Character: Wen Shaohua, a handsome young Chinese swordsman: long black hair tied up in an ornate silver crown with a vermilion hair ribbon, black-and-ivory wide-sleeved layered robe, dark laced boots, vermilion sword tassel and a round vermilion jade pendant at the waist. Calm, dignified expression. He holds a long straight Chinese jian sword in his right hand, blade angled downward beside his body, tip above the soles.
The attached reference map_wenShaohua_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Strike: the instant the sword sweeps horizontally outward toward the direction he faces; sword arm fully extended, body leaning forward, robe hem and ribbon flung outward by the motion. Blade fully inside the canvas.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### fx_slash_arc

流云三式的弧形剑光 · 1024x512。不用参考图。

```text
fx_slash_arc.png, 1024x512. A crescent sword-slash trail: one sweeping arc from upper-left curving to the right, thick and dense at the leading edge, breaking into dry-brush streaks toward the tail.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```

### fx_slash_heavy

重击刀光（第三剑、胖虎劈砍、头目横扫） · 1536x768。不用参考图。

```text
fx_slash_heavy.png, 1536x768. A wider, heavier crescent slash than a normal sword arc, a thin vermilion line along the leading edge, ink droplets flung off the outer rim.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```

### fx_sword_qi

少华一剑的剑气 · 1024x512。不用参考图。

```text
fx_sword_qi.png, 1024x512. A flying crescent blade of sword energy moving to the right: a sharp ink crescent with a thin vermilion edge on its front, trailing a fading ink streak behind it.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```

### fx_charge

蓄力聚墨（少华一剑、胖虎震地） · 1024x1024。不用参考图。

```text
fx_charge.png, 1024x1024. Seen from above: a swirl of ink wisps spiraling inward toward the center like a vortex, dense at the outer strokes, the center left empty paper-white. Circular, centered.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```

### fx_hit

命中爆墨 · 768x768。不用参考图。

```text
fx_hit.png, 768x768. An ink burst on impact: a splash of black ink exploding outward with droplets, a small vermilion spot in the center. Centered, roughly circular.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```

### fx_dash_trail

冲刺墨尘（闪避、冲锋、扑击） · 1024x512。不用参考图。

```text
fx_dash_trail.png, 1024x512. A dash trail: a horizontal streak of ink dust and wind lines, dense on the right end where the dash is heading, dispersing into dry-brush wisps to the left.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```


## 第 2 批 · 地面和竹子

### ground_forest

竹林泥地，散落枯竹叶 · 1024×1024，不透明，四边无缝。

```text
Seamless tileable ground texture named ground_forest.png, 1024x1024, fully OPAQUE (no transparency). Seen from a 45-degree top-down camera: packed earth of a bamboo forest floor with scattered dry fallen bamboo leaves, faint ink washes. All four edges must tile seamlessly. LOW contrast and even density, NO single prominent object, no distinct blotches or circles that would reveal repetition when tiled. Muted ivory-and-ink palette with only faint warm tints.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_grass

草地 · 1024×1024，不透明，四边无缝。

```text
Seamless tileable ground texture named ground_grass.png, 1024x1024, fully OPAQUE (no transparency). Seen from a 45-degree top-down camera: short grass meadow suggested by light ink dabs and small tufts. All four edges must tile seamlessly. LOW contrast and even density, NO single prominent object, no distinct blotches or circles that would reveal repetition when tiled. Muted ivory-and-ink palette with only faint warm tints.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_stone

青石板路面 · 1024×1024，不透明，四边无缝。

```text
Seamless tileable ground texture named ground_stone.png, 1024x1024, fully OPAQUE (no transparency). Seen from a 45-degree top-down camera: a paved road of flagstones with thin pale ink seams between the stones. All four edges must tile seamlessly. LOW contrast and even density, NO single prominent object, no distinct blotches or circles that would reveal repetition when tiled. Muted ivory-and-ink palette with only faint warm tints.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### ground_camp

山寨里踩实的黄土地 · 1024×1024，不透明，四边无缝。

```text
Seamless tileable ground texture named ground_camp.png, 1024x1024, fully OPAQUE (no transparency). Seen from a 45-degree top-down camera: hard-trampled yellow earth of a bandit camp with faint cart ruts and footprints. All four edges must tile seamlessly. LOW contrast and even density, NO single prominent object, no distinct blotches or circles that would reveal repetition when tiled. Muted ivory-and-ink palette with only faint warm tints.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_bamboo_big

一大丛竹子，挡路用 · 1024x1536。

```text
prop_bamboo_big.png, 1024x1536. A big dense clump of seven or eight tall bamboo stalks growing from one patch of ground, leafy tops, front stalks darker and back stalks paler.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_bamboo_mid

一丛中等竹子 · 768x1280。

```text
prop_bamboo_mid.png, 768x1280. A medium clump of four or five bamboo stalks growing from one patch of ground, leafy tops.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_bamboo_small

两三根竹子 · 512x1024。

```text
prop_bamboo_small.png, 512x1024. Two or three slender bamboo stalks with a few leaves.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_rock_big

大山石 · 1024x768。

```text
prop_rock_big.png, 1024x768. A large mountain boulder with mossy dots, sharp brush-stroke planes.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_rock_small

几块小石头 · 512x384。

```text
prop_rock_small.png, 512x384. A small cluster of two or three rocks.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_bush

灌木 / 蕨草 · 512x384。

```text
prop_bush.png, 512x384. A low clump of shrubs and ferns.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```


## 第 3 批 · 胖虎

先出 `map_pangHu_s` 给我看，对了再出其余。

### map_pangHu_s

胖虎（人形）站姿 · 朝下（面向镜头）。附 `portrait_pangHu.png`。

```text
Game map character sprite named map_pangHu_s.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_se

胖虎（人形）站姿 · 朝右下。附 `map_pangHu_s.png`、`portrait_pangHu.png`。

```text
Game map character sprite named map_pangHu_se.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_pangHu_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_e

胖虎（人形）站姿 · 朝右。附 `map_pangHu_s.png`、`portrait_pangHu.png`。

```text
Game map character sprite named map_pangHu_e.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_pangHu_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_ne

胖虎（人形）站姿 · 朝右上（背影偏右）。附 `map_pangHu_s.png`、`portrait_pangHu.png`。

```text
Game map character sprite named map_pangHu_ne.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_pangHu_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_n

胖虎（人形）站姿 · 朝上（背影）。附 `map_pangHu_s.png`、`portrait_pangHu.png`。

```text
Game map character sprite named map_pangHu_n.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_pangHu_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_raise_s

胖虎（人形） · 双手举刀过头、后仰怒吼 · 朝下（面向镜头）。附 `map_pangHu_s.png`。

```text
Game map ACTION FRAME named map_pangHu_raise_s.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Wind-up: the huge cleaver raised high over his head with both hands, body leaning back, mouth wide open shouting.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_raise_se

胖虎（人形） · 双手举刀过头、后仰怒吼 · 朝右下。附 `map_pangHu_se.png`。

```text
Game map ACTION FRAME named map_pangHu_raise_se.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Wind-up: the huge cleaver raised high over his head with both hands, body leaning back, mouth wide open shouting.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_raise_e

胖虎（人形） · 双手举刀过头、后仰怒吼 · 朝右。附 `map_pangHu_e.png`。

```text
Game map ACTION FRAME named map_pangHu_raise_e.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Wind-up: the huge cleaver raised high over his head with both hands, body leaning back, mouth wide open shouting.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_raise_ne

胖虎（人形） · 双手举刀过头、后仰怒吼 · 朝右上（背影偏右）。附 `map_pangHu_ne.png`。

```text
Game map ACTION FRAME named map_pangHu_raise_ne.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Wind-up: the huge cleaver raised high over his head with both hands, body leaning back, mouth wide open shouting.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_raise_n

胖虎（人形） · 双手举刀过头、后仰怒吼 · 朝上（背影）。附 `map_pangHu_n.png`。

```text
Game map ACTION FRAME named map_pangHu_raise_n.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Wind-up: the huge cleaver raised high over his head with both hands, body leaning back, mouth wide open shouting.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_drag_s

胖虎（人形） · 拖刀前冲 · 朝下（面向镜头）。附 `map_pangHu_s.png`。

```text
Game map ACTION FRAME named map_pangHu_drag_s.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Charge: body low and leaning hard forward as if dashing toward the direction he faces, the cleaver dragged behind him with its tip near the ground, tiger-pelt cape flying behind.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_drag_se

胖虎（人形） · 拖刀前冲 · 朝右下。附 `map_pangHu_se.png`。

```text
Game map ACTION FRAME named map_pangHu_drag_se.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Charge: body low and leaning hard forward as if dashing toward the direction he faces, the cleaver dragged behind him with its tip near the ground, tiger-pelt cape flying behind.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_drag_e

胖虎（人形） · 拖刀前冲 · 朝右。附 `map_pangHu_e.png`。

```text
Game map ACTION FRAME named map_pangHu_drag_e.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Charge: body low and leaning hard forward as if dashing toward the direction he faces, the cleaver dragged behind him with its tip near the ground, tiger-pelt cape flying behind.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_drag_ne

胖虎（人形） · 拖刀前冲 · 朝右上（背影偏右）。附 `map_pangHu_ne.png`。

```text
Game map ACTION FRAME named map_pangHu_drag_ne.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Charge: body low and leaning hard forward as if dashing toward the direction he faces, the cleaver dragged behind him with its tip near the ground, tiger-pelt cape flying behind.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_drag_n

胖虎（人形） · 拖刀前冲 · 朝上（背影）。附 `map_pangHu_n.png`。

```text
Game map ACTION FRAME named map_pangHu_drag_n.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Charge: body low and leaning hard forward as if dashing toward the direction he faces, the cleaver dragged behind him with its tip near the ground, tiger-pelt cape flying behind.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_chop_s

胖虎（人形） · 大刀劈到身前地上 · 朝下（面向镜头）。附 `map_pangHu_s.png`。

```text
Game map ACTION FRAME named map_pangHu_chop_s.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Chop: the cleaver smashed down onto the ground right in front of him toward the direction he faces, deep lunge, both arms extended down.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_chop_se

胖虎（人形） · 大刀劈到身前地上 · 朝右下。附 `map_pangHu_se.png`。

```text
Game map ACTION FRAME named map_pangHu_chop_se.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Chop: the cleaver smashed down onto the ground right in front of him toward the direction he faces, deep lunge, both arms extended down.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_chop_e

胖虎（人形） · 大刀劈到身前地上 · 朝右。附 `map_pangHu_e.png`。

```text
Game map ACTION FRAME named map_pangHu_chop_e.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Chop: the cleaver smashed down onto the ground right in front of him toward the direction he faces, deep lunge, both arms extended down.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_chop_ne

胖虎（人形） · 大刀劈到身前地上 · 朝右上（背影偏右）。附 `map_pangHu_ne.png`。

```text
Game map ACTION FRAME named map_pangHu_chop_ne.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Chop: the cleaver smashed down onto the ground right in front of him toward the direction he faces, deep lunge, both arms extended down.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_chop_n

胖虎（人形） · 大刀劈到身前地上 · 朝上（背影）。附 `map_pangHu_n.png`。

```text
Game map ACTION FRAME named map_pangHu_chop_n.png for a top-down wuxia game.
Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. He carries a huge broad cleaver-saber over his right shoulder.
The attached reference map_pangHu_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Chop: the cleaver smashed down onto the ground right in front of him toward the direction he faces, deep lunge, both arms extended down.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_s

胖虎（猛虎）站姿 · 朝下（面向镜头）。附 `portrait_pangHuTiger.png`。

```text
Game map character sprite named map_tiger_s.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH toward the camera, head and chest toward the viewer, body extending back up the image.
Pose: natural standing / prowling stance, all four paws on the implied ground, compact silhouette.
Framing: square transparent canvas 1024x1024. The tiger fills about 70% of the canvas WIDTH. The point on the ground under the middle of its body (between front and hind paws) is at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_se

胖虎（猛虎）站姿 · 朝右下。附 `map_tiger_s.png`、`portrait_pangHuTiger.png`。

```text
Game map character sprite named map_tiger_se.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body pointing toward the BOTTOM-RIGHT of the image, three-quarter front view.
Pose: natural standing / prowling stance, all four paws on the implied ground, compact silhouette.
Framing: EXACTLY match the attached reference map_tiger_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. The tiger fills about 70% of the canvas WIDTH. The point on the ground under the middle of its body (between front and hind paws) is at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_e

胖虎（猛虎）站姿 · 朝右。附 `map_tiger_s.png`、`portrait_pangHuTiger.png`。

```text
Game map character sprite named map_tiger_e.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile walking toward the RIGHT edge of the image.
Pose: natural standing / prowling stance, all four paws on the implied ground, compact silhouette.
Framing: EXACTLY match the attached reference map_tiger_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. The tiger fills about 70% of the canvas WIDTH. The point on the ground under the middle of its body (between front and hind paws) is at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_ne

胖虎（猛虎）站姿 · 朝右上（背影偏右）。附 `map_tiger_s.png`、`portrait_pangHuTiger.png`。

```text
Game map character sprite named map_tiger_ne.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter back view, heading toward the UPPER-RIGHT of the image; hindquarters and tail toward the viewer.
Pose: natural standing / prowling stance, all four paws on the implied ground, compact silhouette.
Framing: EXACTLY match the attached reference map_tiger_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. The tiger fills about 70% of the canvas WIDTH. The point on the ground under the middle of its body (between front and hind paws) is at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_n

胖虎（猛虎）站姿 · 朝上（背影）。附 `map_tiger_s.png`、`portrait_pangHuTiger.png`。

```text
Game map character sprite named map_tiger_n.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, away from camera; we see the hindquarters, back and tail, head beyond.
Pose: natural standing / prowling stance, all four paws on the implied ground, compact silhouette.
Framing: EXACTLY match the attached reference map_tiger_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. The tiger fills about 70% of the canvas WIDTH. The point on the ground under the middle of its body (between front and hind paws) is at horizontal center, 6% above the bottom edge.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_crouch_s

胖虎（猛虎） · 压低前身准备扑 · 朝下（面向镜头）。附 `map_tiger_s.png`。

```text
Game map ACTION FRAME named map_tiger_crouch_s.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH toward the camera, head and chest toward the viewer, body extending back up the image.
Action: Crouch: front body pressed low to the ground, hind legs coiled, tail raised high, eyes locked forward, about to pounce.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_crouch_se

胖虎（猛虎） · 压低前身准备扑 · 朝右下。附 `map_tiger_se.png`。

```text
Game map ACTION FRAME named map_tiger_crouch_se.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body pointing toward the BOTTOM-RIGHT of the image, three-quarter front view.
Action: Crouch: front body pressed low to the ground, hind legs coiled, tail raised high, eyes locked forward, about to pounce.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_crouch_e

胖虎（猛虎） · 压低前身准备扑 · 朝右。附 `map_tiger_e.png`。

```text
Game map ACTION FRAME named map_tiger_crouch_e.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile walking toward the RIGHT edge of the image.
Action: Crouch: front body pressed low to the ground, hind legs coiled, tail raised high, eyes locked forward, about to pounce.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_crouch_ne

胖虎（猛虎） · 压低前身准备扑 · 朝右上（背影偏右）。附 `map_tiger_ne.png`。

```text
Game map ACTION FRAME named map_tiger_crouch_ne.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter back view, heading toward the UPPER-RIGHT of the image; hindquarters and tail toward the viewer.
Action: Crouch: front body pressed low to the ground, hind legs coiled, tail raised high, eyes locked forward, about to pounce.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_crouch_n

胖虎（猛虎） · 压低前身准备扑 · 朝上（背影）。附 `map_tiger_n.png`。

```text
Game map ACTION FRAME named map_tiger_crouch_n.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, away from camera; we see the hindquarters, back and tail, head beyond.
Action: Crouch: front body pressed low to the ground, hind legs coiled, tail raised high, eyes locked forward, about to pounce.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_leap_s

胖虎（猛虎） · 腾空扑出 · 朝下（面向镜头）。附 `map_tiger_s.png`。

```text
Game map ACTION FRAME named map_tiger_leap_s.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH toward the camera, head and chest toward the viewer, body extending back up the image.
Action: Leap: airborne pounce toward the direction it faces, body stretched long, front paws reaching forward with claws spread, hind legs trailing. Feet are NOT on the ground in this pose, but keep the body centered over the same foot anchor point.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_leap_se

胖虎（猛虎） · 腾空扑出 · 朝右下。附 `map_tiger_se.png`。

```text
Game map ACTION FRAME named map_tiger_leap_se.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body pointing toward the BOTTOM-RIGHT of the image, three-quarter front view.
Action: Leap: airborne pounce toward the direction it faces, body stretched long, front paws reaching forward with claws spread, hind legs trailing. Feet are NOT on the ground in this pose, but keep the body centered over the same foot anchor point.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_leap_e

胖虎（猛虎） · 腾空扑出 · 朝右。附 `map_tiger_e.png`。

```text
Game map ACTION FRAME named map_tiger_leap_e.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile walking toward the RIGHT edge of the image.
Action: Leap: airborne pounce toward the direction it faces, body stretched long, front paws reaching forward with claws spread, hind legs trailing. Feet are NOT on the ground in this pose, but keep the body centered over the same foot anchor point.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_leap_ne

胖虎（猛虎） · 腾空扑出 · 朝右上（背影偏右）。附 `map_tiger_ne.png`。

```text
Game map ACTION FRAME named map_tiger_leap_ne.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter back view, heading toward the UPPER-RIGHT of the image; hindquarters and tail toward the viewer.
Action: Leap: airborne pounce toward the direction it faces, body stretched long, front paws reaching forward with claws spread, hind legs trailing. Feet are NOT on the ground in this pose, but keep the body centered over the same foot anchor point.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_leap_n

胖虎（猛虎） · 腾空扑出 · 朝上（背影）。附 `map_tiger_n.png`。

```text
Game map ACTION FRAME named map_tiger_leap_n.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, away from camera; we see the hindquarters, back and tail, head beyond.
Action: Leap: airborne pounce toward the direction it faces, body stretched long, front paws reaching forward with claws spread, hind legs trailing. Feet are NOT on the ground in this pose, but keep the body centered over the same foot anchor point.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_claw_s

胖虎（猛虎） · 一只前爪扬起挥下 · 朝下（面向镜头）。附 `map_tiger_s.png`。

```text
Game map ACTION FRAME named map_tiger_claw_s.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH toward the camera, head and chest toward the viewer, body extending back up the image.
Action: Claw: rearing slightly, one front paw raised high and swiping down toward the direction it faces, claws out, mouth open showing fangs.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_claw_se

胖虎（猛虎） · 一只前爪扬起挥下 · 朝右下。附 `map_tiger_se.png`。

```text
Game map ACTION FRAME named map_tiger_claw_se.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body pointing toward the BOTTOM-RIGHT of the image, three-quarter front view.
Action: Claw: rearing slightly, one front paw raised high and swiping down toward the direction it faces, claws out, mouth open showing fangs.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_claw_e

胖虎（猛虎） · 一只前爪扬起挥下 · 朝右。附 `map_tiger_e.png`。

```text
Game map ACTION FRAME named map_tiger_claw_e.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile walking toward the RIGHT edge of the image.
Action: Claw: rearing slightly, one front paw raised high and swiping down toward the direction it faces, claws out, mouth open showing fangs.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_claw_ne

胖虎（猛虎） · 一只前爪扬起挥下 · 朝右上（背影偏右）。附 `map_tiger_ne.png`。

```text
Game map ACTION FRAME named map_tiger_claw_ne.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter back view, heading toward the UPPER-RIGHT of the image; hindquarters and tail toward the viewer.
Action: Claw: rearing slightly, one front paw raised high and swiping down toward the direction it faces, claws out, mouth open showing fangs.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_claw_n

胖虎（猛虎） · 一只前爪扬起挥下 · 朝上（背影）。附 `map_tiger_n.png`。

```text
Game map ACTION FRAME named map_tiger_claw_n.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, away from camera; we see the hindquarters, back and tail, head beyond.
Action: Claw: rearing slightly, one front paw raised high and swiping down toward the direction it faces, claws out, mouth open showing fangs.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_roar_s

胖虎（猛虎） · 仰头咆哮 · 朝下（面向镜头）。附 `map_tiger_s.png`。

```text
Game map ACTION FRAME named map_tiger_roar_s.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH toward the camera, head and chest toward the viewer, body extending back up the image.
Action: Roar: front legs braced, head thrown back, mouth gaping wide in a roar, fur bristling outward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_roar_se

胖虎（猛虎） · 仰头咆哮 · 朝右下。附 `map_tiger_se.png`。

```text
Game map ACTION FRAME named map_tiger_roar_se.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body pointing toward the BOTTOM-RIGHT of the image, three-quarter front view.
Action: Roar: front legs braced, head thrown back, mouth gaping wide in a roar, fur bristling outward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_roar_e

胖虎（猛虎） · 仰头咆哮 · 朝右。附 `map_tiger_e.png`。

```text
Game map ACTION FRAME named map_tiger_roar_e.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile walking toward the RIGHT edge of the image.
Action: Roar: front legs braced, head thrown back, mouth gaping wide in a roar, fur bristling outward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_roar_ne

胖虎（猛虎） · 仰头咆哮 · 朝右上（背影偏右）。附 `map_tiger_ne.png`。

```text
Game map ACTION FRAME named map_tiger_roar_ne.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter back view, heading toward the UPPER-RIGHT of the image; hindquarters and tail toward the viewer.
Action: Roar: front legs braced, head thrown back, mouth gaping wide in a roar, fur bristling outward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_tiger_roar_n

胖虎（猛虎） · 仰头咆哮 · 朝上（背影）。附 `map_tiger_n.png`。

```text
Game map ACTION FRAME named map_tiger_roar_n.png for a top-down wuxia game.
Character: Pang Hu transformed into a giant tiger: ivory-white fur with bold black ink-brush stripes, on all four legs, muscular, long curling tail, fierce face with vermilion-tinged eyes.
The attached reference map_tiger_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, away from camera; we see the hindquarters, back and tail, head beyond.
Action: Roar: front legs braced, head thrown back, mouth gaping wide in a roar, fur bristling outward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


### 变身演出

### map_pangHu_transform_1

胖虎仰天怒吼、大刀插地、身上浮出虎纹 · 附 map_pangHu_s.png。

```text
Game map character sprite named map_pangHu_transform_1.png. Character: Pang Hu, the bandit king of the mountain: very fat and very big (bulkier than the bandit chief), wearing a white tiger pelt as a hood and cape with the tiger head on top of his own head, scarred grinning face, big belly, torn black-and-ivory clothes, vermilion sash. Menacing but a little comical. The attached reference map_pangHu_s.png is the same character standing facing the camera; keep EXACTLY the same canvas size, body size and foot anchor point.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: the moment he starts transforming into a tiger — head thrown back roaring at the sky, both arms flung wide, his huge cleaver dropped and stuck upright in the ground beside him, black ink tiger stripes beginning to bloom across his skin, clothes splitting at the seams, ink mist starting to rise from his body.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_pangHu_transform_2

半人半虎，被浓墨裹住 · 附 map_tiger_s.png 和 map_pangHu_s.png。

```text
Game map character sprite named map_pangHu_transform_2.png. The attached reference map_tiger_s.png is the tiger form facing the camera; keep EXACTLY its canvas size and foot anchor point.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Subject: Pang Hu half-way through transforming — his fat human body wrapped in swirling dense black ink, and out of the ink emerges the huge outline of a tiger's head and two front paws with claws; the human shape is still faintly visible inside. Facing the camera. Dramatic, violent energy.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### fx_ink_vortex

变身时地上卷起的墨气旋涡 · 1536x1536。

```text
Game visual effect, transparent PNG 1536x1536 with real alpha: seen from a 45-degree top-down angle, a vortex of ink rising from the ground — spiral bands of black ink curling upward and around an empty center, flying-white dry-brush edges, a few vermilion wisps, ink droplets flung outward. Circular-ish, centered. No characters, no ground, no text. Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### cutin_tiger_reveal

横幅特写：猛虎从墨里扑出来 · 1920x640（和 cutin_pangHu_roar 一样）。

```text
Wide cinematic cut-in banner 1920x640 for a wuxia game, same format as the attached cutin_pangHu_roar.png. Subject: dense black ink explodes outward and a giant tiger lunges out of it straight toward the viewer, mouth gaping in a roar, eyes glowing vermilion, claws spread. Ivory rice-paper background fading to transparent toward the left and right ends. Dramatic diagonal composition. Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### fx_shock_ring

冲击墨圈（震地、开山锤） · 1536x768。

```text
fx_shock_ring.png, 1536x768. A shockwave ring seen from a 45-degree top-down angle: a flat ELLIPSE (twice as wide as tall) of ink, dry-brush edges, chunks of ink flung outward, thin vermilion line on the outer rim, empty center.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```

### fx_claw

虎爪爪痕 · 1024x768。

```text
fx_claw.png, 1024x768. Three parallel claw-slash marks raking from upper-left to lower-right, torn ink texture, the tips ending in vermilion.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```

### fx_roar_ring

虎啸音波 · 1536x1536。

```text
fx_roar_ring.png, 1536x1536. A roar sound-wave seen from above: several concentric ink ripples, darker near the center ring and fading outward, one thin vermilion ripple. Circular, centered, empty center.
Game visual effect sprite, transparent background PNG with real alpha. The effect is drawn pointing to the RIGHT only (the game rotates it to any direction and squashes it onto the ground plane). No characters, no ground, no text. Chinese ink-wash look: dense black ink #1a1714 with dry-brush flying-white edges, ivory paper highlights, sparse vermilion #b3261e accents. Energy is expressed with ink density and white paper, NOT neon light or colored glow.
```


## 第 4 批 · 山贼

每种先出 `_s` 给我看。

### map_bandit_s

山贼喽啰站姿 · 朝下（面向镜头）。附 `portrait_bandit.png`。

```text
Game map character sprite named map_bandit_s.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_se

山贼喽啰站姿 · 朝右下。附 `map_bandit_s.png`、`portrait_bandit.png`。

```text
Game map character sprite named map_bandit_se.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bandit_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_e

山贼喽啰站姿 · 朝右。附 `map_bandit_s.png`、`portrait_bandit.png`。

```text
Game map character sprite named map_bandit_e.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bandit_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_ne

山贼喽啰站姿 · 朝右上（背影偏右）。附 `map_bandit_s.png`、`portrait_bandit.png`。

```text
Game map character sprite named map_bandit_ne.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bandit_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_n

山贼喽啰站姿 · 朝上（背影）。附 `map_bandit_s.png`、`portrait_bandit.png`。

```text
Game map character sprite named map_bandit_n.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_bandit_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_ready_s

山贼喽啰 · 举刀 · 朝下（面向镜头）。附 `map_bandit_s.png`。

```text
Game map ACTION FRAME named map_bandit_ready_s.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Wind-up: saber raised high behind his head, body twisted back, about to slash.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_ready_se

山贼喽啰 · 举刀 · 朝右下。附 `map_bandit_se.png`。

```text
Game map ACTION FRAME named map_bandit_ready_se.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Wind-up: saber raised high behind his head, body twisted back, about to slash.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_ready_e

山贼喽啰 · 举刀 · 朝右。附 `map_bandit_e.png`。

```text
Game map ACTION FRAME named map_bandit_ready_e.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Wind-up: saber raised high behind his head, body twisted back, about to slash.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_ready_ne

山贼喽啰 · 举刀 · 朝右上（背影偏右）。附 `map_bandit_ne.png`。

```text
Game map ACTION FRAME named map_bandit_ready_ne.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Wind-up: saber raised high behind his head, body twisted back, about to slash.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_ready_n

山贼喽啰 · 举刀 · 朝上（背影）。附 `map_bandit_n.png`。

```text
Game map ACTION FRAME named map_bandit_ready_n.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Wind-up: saber raised high behind his head, body twisted back, about to slash.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_strike_s

山贼喽啰 · 弯刀劈下 · 朝下（面向镜头）。附 `map_bandit_s.png`。

```text
Game map ACTION FRAME named map_bandit_strike_s.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Strike: the saber slashing down in front of him toward the direction he faces, arm extended, body lunging forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_strike_se

山贼喽啰 · 弯刀劈下 · 朝右下。附 `map_bandit_se.png`。

```text
Game map ACTION FRAME named map_bandit_strike_se.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Strike: the saber slashing down in front of him toward the direction he faces, arm extended, body lunging forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_strike_e

山贼喽啰 · 弯刀劈下 · 朝右。附 `map_bandit_e.png`。

```text
Game map ACTION FRAME named map_bandit_strike_e.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Strike: the saber slashing down in front of him toward the direction he faces, arm extended, body lunging forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_strike_ne

山贼喽啰 · 弯刀劈下 · 朝右上（背影偏右）。附 `map_bandit_ne.png`。

```text
Game map ACTION FRAME named map_bandit_strike_ne.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Strike: the saber slashing down in front of him toward the direction he faces, arm extended, body lunging forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_bandit_strike_n

山贼喽啰 · 弯刀劈下 · 朝上（背影）。附 `map_bandit_n.png`。

```text
Game map ACTION FRAME named map_bandit_strike_n.png for a top-down wuxia game.
Character: A scruffy mountain-bandit foot soldier: wild black hair under a vermilion headband with trailing ends, torn black-and-ivory clothes, vermilion sash, wrapped shins, cocky grin. He holds a curved broad saber (dao) in his right hand.
The attached reference map_bandit_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Strike: the saber slashing down in front of him toward the direction he faces, arm extended, body lunging forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_s

山贼飞刀手站姿 · 朝下（面向镜头）。附 `portrait_thrower.png`。

```text
Game map character sprite named map_thrower_s.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_se

山贼飞刀手站姿 · 朝右下。附 `map_thrower_s.png`、`portrait_thrower.png`。

```text
Game map character sprite named map_thrower_se.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_thrower_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_e

山贼飞刀手站姿 · 朝右。附 `map_thrower_s.png`、`portrait_thrower.png`。

```text
Game map character sprite named map_thrower_e.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_thrower_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_ne

山贼飞刀手站姿 · 朝右上（背影偏右）。附 `map_thrower_s.png`、`portrait_thrower.png`。

```text
Game map character sprite named map_thrower_ne.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_thrower_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_n

山贼飞刀手站姿 · 朝上（背影）。附 `map_thrower_s.png`、`portrait_thrower.png`。

```text
Game map character sprite named map_thrower_n.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_thrower_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_ready_s

山贼飞刀手 · 抬手瞄准 · 朝下（面向镜头）。附 `map_thrower_s.png`。

```text
Game map ACTION FRAME named map_thrower_ready_s.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Wind-up: throwing arm drawn back past his ear, knives between his fingers, other hand pointing forward to aim.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_ready_se

山贼飞刀手 · 抬手瞄准 · 朝右下。附 `map_thrower_se.png`。

```text
Game map ACTION FRAME named map_thrower_ready_se.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Wind-up: throwing arm drawn back past his ear, knives between his fingers, other hand pointing forward to aim.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_ready_e

山贼飞刀手 · 抬手瞄准 · 朝右。附 `map_thrower_e.png`。

```text
Game map ACTION FRAME named map_thrower_ready_e.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Wind-up: throwing arm drawn back past his ear, knives between his fingers, other hand pointing forward to aim.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_ready_ne

山贼飞刀手 · 抬手瞄准 · 朝右上（背影偏右）。附 `map_thrower_ne.png`。

```text
Game map ACTION FRAME named map_thrower_ready_ne.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Wind-up: throwing arm drawn back past his ear, knives between his fingers, other hand pointing forward to aim.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_ready_n

山贼飞刀手 · 抬手瞄准 · 朝上（背影）。附 `map_thrower_n.png`。

```text
Game map ACTION FRAME named map_thrower_ready_n.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Wind-up: throwing arm drawn back past his ear, knives between his fingers, other hand pointing forward to aim.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_throw_s

山贼飞刀手 · 飞刀刚脱手 · 朝下（面向镜头）。附 `map_thrower_s.png`。

```text
Game map ACTION FRAME named map_thrower_throw_s.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Throw: the throwing arm whipped fully forward toward the direction he faces, knives just leaving his fingers (knives may be partly visible near the hand), body twisted forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_throw_se

山贼飞刀手 · 飞刀刚脱手 · 朝右下。附 `map_thrower_se.png`。

```text
Game map ACTION FRAME named map_thrower_throw_se.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Throw: the throwing arm whipped fully forward toward the direction he faces, knives just leaving his fingers (knives may be partly visible near the hand), body twisted forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_throw_e

山贼飞刀手 · 飞刀刚脱手 · 朝右。附 `map_thrower_e.png`。

```text
Game map ACTION FRAME named map_thrower_throw_e.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Throw: the throwing arm whipped fully forward toward the direction he faces, knives just leaving his fingers (knives may be partly visible near the hand), body twisted forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_throw_ne

山贼飞刀手 · 飞刀刚脱手 · 朝右上（背影偏右）。附 `map_thrower_ne.png`。

```text
Game map ACTION FRAME named map_thrower_throw_ne.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Throw: the throwing arm whipped fully forward toward the direction he faces, knives just leaving his fingers (knives may be partly visible near the hand), body twisted forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_thrower_throw_n

山贼飞刀手 · 飞刀刚脱手 · 朝上（背影）。附 `map_thrower_n.png`。

```text
Game map ACTION FRAME named map_thrower_throw_n.png for a top-down wuxia game.
Character: A lean mountain-bandit knife thrower: messy black hair, vermilion face mask over nose and mouth with trailing ends, torn black-and-ivory robe, vermilion sash and arm wraps, alert crouching readiness. He holds three small throwing knives fanned between the fingers of his right hand.
The attached reference map_thrower_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Throw: the throwing arm whipped fully forward toward the direction he faces, knives just leaving his fingers (knives may be partly visible near the hand), body twisted forward.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_s

山贼头目站姿 · 朝下（面向镜头）。附 `portrait_chief.png`。

```text
Game map character sprite named map_chief_s.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_se

山贼头目站姿 · 朝右下。附 `map_chief_s.png`、`portrait_chief.png`。

```text
Game map character sprite named map_chief_se.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_chief_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_e

山贼头目站姿 · 朝右。附 `map_chief_s.png`、`portrait_chief.png`。

```text
Game map character sprite named map_chief_e.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_chief_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_ne

山贼头目站姿 · 朝右上（背影偏右）。附 `map_chief_s.png`、`portrait_chief.png`。

```text
Game map character sprite named map_chief_ne.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_chief_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_n

山贼头目站姿 · 朝上（背影）。附 `map_chief_s.png`、`portrait_chief.png`。

```text
Game map character sprite named map_chief_n.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_chief_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_raise_s

山贼头目 · 狼牙锤举过头 · 朝下（面向镜头）。附 `map_chief_s.png`。

```text
Game map ACTION FRAME named map_chief_raise_s.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Wind-up: the spiked mace raised high over his head with both hands, back arched, mouth open in a roar.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_raise_se

山贼头目 · 狼牙锤举过头 · 朝右下。附 `map_chief_se.png`。

```text
Game map ACTION FRAME named map_chief_raise_se.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Wind-up: the spiked mace raised high over his head with both hands, back arched, mouth open in a roar.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_raise_e

山贼头目 · 狼牙锤举过头 · 朝右。附 `map_chief_e.png`。

```text
Game map ACTION FRAME named map_chief_raise_e.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Wind-up: the spiked mace raised high over his head with both hands, back arched, mouth open in a roar.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_raise_ne

山贼头目 · 狼牙锤举过头 · 朝右上（背影偏右）。附 `map_chief_ne.png`。

```text
Game map ACTION FRAME named map_chief_raise_ne.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Wind-up: the spiked mace raised high over his head with both hands, back arched, mouth open in a roar.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_raise_n

山贼头目 · 狼牙锤举过头 · 朝上（背影）。附 `map_chief_n.png`。

```text
Game map ACTION FRAME named map_chief_raise_n.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Wind-up: the spiked mace raised high over his head with both hands, back arched, mouth open in a roar.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_smash_s

山贼头目 · 狼牙锤砸到身前地上 · 朝下（面向镜头）。附 `map_chief_s.png`。

```text
Game map ACTION FRAME named map_chief_smash_s.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Smash: the spiked mace slammed down onto the ground in front of him toward the direction he faces, deep lunge, both arms extended.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_smash_se

山贼头目 · 狼牙锤砸到身前地上 · 朝右下。附 `map_chief_se.png`。

```text
Game map ACTION FRAME named map_chief_smash_se.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Smash: the spiked mace slammed down onto the ground in front of him toward the direction he faces, deep lunge, both arms extended.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_smash_e

山贼头目 · 狼牙锤砸到身前地上 · 朝右。附 `map_chief_e.png`。

```text
Game map ACTION FRAME named map_chief_smash_e.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Smash: the spiked mace slammed down onto the ground in front of him toward the direction he faces, deep lunge, both arms extended.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_smash_ne

山贼头目 · 狼牙锤砸到身前地上 · 朝右上（背影偏右）。附 `map_chief_ne.png`。

```text
Game map ACTION FRAME named map_chief_smash_ne.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Smash: the spiked mace slammed down onto the ground in front of him toward the direction he faces, deep lunge, both arms extended.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_chief_smash_n

山贼头目 · 狼牙锤砸到身前地上 · 朝上（背影）。附 `map_chief_n.png`。

```text
Game map ACTION FRAME named map_chief_smash_n.png for a top-down wuxia game.
Character: A huge bald bandit chief, a head taller and much bulkier than a normal bandit: thick beard, bare barrel chest and belly, torn black-and-ivory clothes, vermilion sash and arm wraps, heavy boots. He rests a spiked wolf-tooth mace (langya bang) on his right shoulder.
The attached reference map_chief_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Smash: the spiked mace slammed down onto the ground in front of him toward the direction he faces, deep lunge, both arms extended.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 5 批 · 其余地图物件、任新野、红熊

### prop_pine

老松 · 1024x1536。

```text
prop_pine.png, 1024x1536. An old gnarled pine tree with a twisting trunk and flat layered needle clusters.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_fence_h

横着的竹篱笆 · 1024x512。

```text
prop_fence_h.png, 1024x512. A section of bamboo stake fence running left-to-right across the image: sharpened bamboo stakes lashed to two horizontal rails.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_fence_v

竖着往画面里延伸的竹篱笆 · 512x1024。

```text
prop_fence_v.png, 512x1024. A section of bamboo stake fence running away from the viewer up the image (seen in perspective from the top-down camera).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_stump

砍断的竹桩 · 512x384。

```text
prop_stump.png, 512x384. Several chopped-off bamboo stumps of different heights.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_bridge

木板桥 · 1536x1024。

```text
prop_bridge.png, 1536x1024. A small wooden plank bridge with rope railings crossing left-to-right over a gap (do not draw the water).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_stream

一段小溪，可首尾相接 · 1536x1024。

```text
prop_stream.png, 1536x1024. A stretch of a small stream flowing left-to-right: pale ink water with ripples and a few stones; the left and right ends must line up so copies can be chained.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_teastall

任新野的茶摊 · 1536x1536。

```text
prop_teastall.png, 1536x1536. A roadside tea stall: thatched roof on four bamboo poles, a wooden counter with an abacus and teapots and cups, a vermilion paper lantern hanging from the eaves (no writing on it), a bench in front.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_camp_wall

山寨木栅寨墙，可左右相接 · 1536x768。

```text
prop_camp_wall.png, 1536x768. A section of bandit-camp palisade wall: a row of sharpened logs bound together, running left-to-right; the left and right ends must line up so copies can be chained.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_camp_gate

山寨寨门 · 1536x1536。

```text
prop_camp_gate.png, 1536x1536. A bandit-camp gate: two thick log pillars, a log gatehouse on top, a torn vermilion banner flying from it.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_camp_hall

聚义厅 · 2048x2048。

```text
prop_camp_hall.png, 2048x2048. The bandit king's great hall: a big rough timber hall on a raised platform with wide steps, two fire braziers by the entrance, an ox skull over the door, a tiger pelt hung on the railing, a blank plaque above the door (no writing).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_watchtower

瞭望木楼 · 1024x1536。

```text
prop_watchtower.png, 1024x1536. A wooden lookout tower on tall log stilts with a ladder and a small roofed platform.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_brazier

火盆 · 512x768。

```text
prop_brazier.png, 512x768. An iron fire brazier on three legs with vermilion flames painted in ink-wash style.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_banner

破旗杆 · 512x1024。

```text
prop_banner.png, 512x1024. A pole stuck in the ground with a torn vermilion banner.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_tiger_rug

虎皮 · 1024x768。

```text
prop_tiger_rug.png, 1024x768. A tiger pelt draped over a wooden railing.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_dummy

木人桩 · 512x1024。

```text
prop_dummy.png, 512x1024. A wing-chun style wooden training dummy: a post with three wooden arms and one leg.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_weapon_rack

兵器架 · 768x768。

```text
prop_weapon_rack.png, 768x768. A wooden weapon rack holding spears, a halberd and a saber.
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### prop_signpost

路口木路牌 · 512x1024。

```text
prop_signpost.png, 512x1024. A wooden crossroads signpost with two blank arrow boards (no writing).
Game map object sprite, transparent background PNG with real alpha. Seen from the same 45-degree top-down camera as the characters, light coming from the upper-left. The bottom-center of the image is where the object touches the ground: center the object's base horizontally, close to the bottom edge. No shadow (the game adds one), no ground plane, no characters, no text.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
```

### map_renXinye_s

任新野 · 朝下（面向镜头）。附 `portrait_renXinye.png`。

```text
Game map character sprite named map_renXinye_s.png for a top-down wuxia game.
Character: Ren Xinye, a slick, smiling tea-stall keeper and information broker: slim build, small black scholar's cap, black-and-ivory wide-sleeved robe, sly friendly smile, one hand raised in greeting.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: standing relaxed behind an implied counter (do NOT draw the counter), one hand raised in a friendly greeting, the other tucked in the sleeve.
Framing: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_renXinye_se

任新野 · 朝右下。附 `map_renXinye_s.png`、`portrait_renXinye.png`。

```text
Game map character sprite named map_renXinye_se.png for a top-down wuxia game.
Character: Ren Xinye, a slick, smiling tea-stall keeper and information broker: slim build, small black scholar's cap, black-and-ivory wide-sleeved robe, sly friendly smile, one hand raised in greeting.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Pose: standing relaxed behind an implied counter (do NOT draw the counter), one hand raised in a friendly greeting, the other tucked in the sleeve.
Framing: EXACTLY match the attached reference map_renXinye_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_redBear_s

红熊大侠 · 朝下（面向镜头）。附 `portrait_redBear.png`。

```text
Game map character sprite named map_redBear_s.png for a top-down wuxia game.
Character: The Red Bear, a legendary masked hero: a large vermilion hooded cloak with small round bear ears on the hood, face hidden in shadow under the hood, black robes and wrapped boots underneath, a long sword strapped across the back. Imposing and calm.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: standing tall and still, arms inside the cloak, cloak hanging heavily. Imposing, protective presence.
Framing: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```


## 第 6 批 · 于无瑕

先出 `map_yuWuxia_s` 给我看。

### map_yuWuxia_s

站姿 · 朝下（面向镜头）。附 `portrait_yuWuxia.png`。

```text
Game map character sprite named map_yuWuxia_s.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_se

站姿 · 朝右下。附 `map_yuWuxia_s.png`、`portrait_yuWuxia.png`。

```text
Game map character sprite named map_yuWuxia_se.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_yuWuxia_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_e

站姿 · 朝右。附 `map_yuWuxia_s.png`、`portrait_yuWuxia.png`。

```text
Game map character sprite named map_yuWuxia_e.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_yuWuxia_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_ne

站姿 · 朝右上（背影偏右）。附 `map_yuWuxia_s.png`、`portrait_yuWuxia.png`。

```text
Game map character sprite named map_yuWuxia_ne.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_yuWuxia_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_n

站姿 · 朝上（背影）。附 `map_yuWuxia_s.png`、`portrait_yuWuxia.png`。

```text
Game map character sprite named map_yuWuxia_n.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
Use the attached reference image(s) ONLY for identity, costume, colors and brush style. Do NOT copy the reference pose or framing.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Pose: natural compact idle, combat-ready stance, feet about shoulder width, arms and weapon close to the body (nothing sticking far out — the game rotates and shakes the sprite).
Framing: EXACTLY match the attached reference map_yuWuxia_s.png (same canvas size, same body size, same foot position). Otherwise: square transparent canvas 1024x1024. Full body. Character height about 70% of the canvas height. The midpoint between the two foot soles is at horizontal center, 6% above the bottom edge (y=963). At least 8% empty space above the head. Do not crop to content.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_ready_s

蓄势：扇子收在胸前 · 朝下（面向镜头）。附 `map_yuWuxia_s.png`。

```text
Game map ACTION FRAME named map_yuWuxia_ready_s.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Wind-up: the closed fan drawn back to her chest, body coiled, weight on the back foot, sleeves gathered.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_ready_se

蓄势：扇子收在胸前 · 朝右下。附 `map_yuWuxia_se.png`。

```text
Game map ACTION FRAME named map_yuWuxia_ready_se.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Wind-up: the closed fan drawn back to her chest, body coiled, weight on the back foot, sleeves gathered.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_ready_e

蓄势：扇子收在胸前 · 朝右。附 `map_yuWuxia_e.png`。

```text
Game map ACTION FRAME named map_yuWuxia_ready_e.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Wind-up: the closed fan drawn back to her chest, body coiled, weight on the back foot, sleeves gathered.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_ready_ne

蓄势：扇子收在胸前 · 朝右上（背影偏右）。附 `map_yuWuxia_ne.png`。

```text
Game map ACTION FRAME named map_yuWuxia_ready_ne.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Wind-up: the closed fan drawn back to her chest, body coiled, weight on the back foot, sleeves gathered.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_ready_n

蓄势：扇子收在胸前 · 朝上（背影）。附 `map_yuWuxia_n.png`。

```text
Game map ACTION FRAME named map_yuWuxia_ready_n.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Wind-up: the closed fan drawn back to her chest, body coiled, weight on the back foot, sleeves gathered.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_strike_s

出招：扇子横扫出去 · 朝下（面向镜头）。附 `map_yuWuxia_s.png`。

```text
Game map ACTION FRAME named map_yuWuxia_strike_s.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_s.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing SOUTH, straight toward the camera / bottom of the image; face and chest seen from the front, both shoulders level.
Action: Strike: the fan snapped open and swept horizontally outward toward the direction she faces, arm extended, body leaning forward, ponytail and sleeves flung by the motion.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_strike_se

出招：扇子横扫出去 · 朝右下。附 `map_yuWuxia_se.png`。

```text
Game map ACTION FRAME named map_yuWuxia_strike_se.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_se.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: body turned toward the BOTTOM-RIGHT of the image, three-quarter front view; the character's RIGHT cheek and RIGHT shoulder are nearer the viewer (the weapon hand side).
Action: Strike: the fan snapped open and swept horizontally outward toward the direction she faces, arm extended, body leaning forward, ponytail and sleeves flung by the motion.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_strike_e

出招：扇子横扫出去 · 朝右。附 `map_yuWuxia_e.png`。

```text
Game map ACTION FRAME named map_yuWuxia_strike_e.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_e.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: full side profile facing the RIGHT edge of the image.
Action: Strike: the fan snapped open and swept horizontally outward toward the direction she faces, arm extended, body leaning forward, ponytail and sleeves flung by the motion.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_strike_ne

出招：扇子横扫出去 · 朝右上（背影偏右）。附 `map_yuWuxia_ne.png`。

```text
Game map ACTION FRAME named map_yuWuxia_strike_ne.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_ne.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: three-quarter BACK view, facing toward the UPPER-RIGHT of the image; back of the head and the right shoulder visible, face mostly hidden.
Action: Strike: the fan snapped open and swept horizontally outward toward the direction she faces, arm extended, body leaning forward, ponytail and sleeves flung by the motion.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

### map_yuWuxia_strike_n

出招：扇子横扫出去 · 朝上（背影）。附 `map_yuWuxia_n.png`。

```text
Game map ACTION FRAME named map_yuWuxia_strike_n.png for a top-down wuxia game.
Character: Yu Wuxia, a cool, composed young swordswoman from the southwest: very long black hair in a high ponytail tied with a vermilion ribbon, black-and-ivory layered robe with flowing sleeves, black knee boots, a row of small throwing darts on her belt. Calm, sharp gaze. She holds a closed black-and-vermilion folding fan in her right hand.
The attached reference map_yuWuxia_n.png is the SAME character standing in the SAME direction. Keep EXACTLY the same canvas size, the same body size and the same foot anchor point (horizontal center, 6% above the bottom); only change the pose. A short step forward is fine.
Camera: true 45-degree oblique TOP-DOWN game map view (like Legend of Mir / Fantasy Westward Journey): camera elevated and looking down, top of the head and shoulder tops clearly visible, slight foreshortening (head a little larger, feet a little smaller).
Orientation: facing NORTH, back fully to the camera; we see the back of the head, back and heels.
Action: Strike: the fan snapped open and swept horizontally outward toward the direction she faces, arm extended, body leaning forward, ponytail and sleeves flung by the motion.
The whole body, weapon, sleeves and hair must stay inside the canvas. Do NOT draw slash trails, speed lines, sword light or impact effects — the game adds those separately.
Style: Chinese hand-painted ink wash (shuimo), dry-brush flying-white texture and subtle ink bleed on edges, clean readable silhouette. Main ink #1a1714, rice-paper ivory #efe7d6 as the light color, only sparse vermilion accents #b3261e. Dignified wuxia game artwork. No anime cel shading, no photographic realism, no neon glow, no text, no seal stamps, no signatures.
Strict: genuine fully transparent background (real alpha, NOT a drawn checkerboard). NO ground, NO shadow, NO glow, NO paper rectangle, NO backdrop, NO floating ink splashes, NO text, NO labels.
```

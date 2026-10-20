#!/usr/bin/env python3
"""
给第三批地图人物图算"脚底在哪儿、人有多高"，写到 public/art/map-anchors.json，游戏按它对齐。
地图物件（prop_*）也记下落地的那个点和实际画了东西的左右范围。

Codex 出的图画布都一样大（同一个人的各张图是对着同一块画布画的），人大致站在画布正中，
但脚离底边的距离、人在画布里的高矮每个人物不完全一样。所以：
- 脚的水平位置：一律画布正中（同一个人换姿势时不会左右跳）
- 脚底的高度：按站姿图找"最下面一行够宽的不透明像素"（刀尖、扇尖只有一小撮，跳过）；
  同一朝向的姿势图沿用站姿图的高度（姿势图里刀、锤常常比脚低，找不准）
- 人有多高：这个人物几张站姿图"脚底到头顶"的中位数，游戏按它缩放，同一个人各张图一样大

用法：python3 tools/map-anchors.py   （需要 Pillow 和 numpy）
"""
import glob, json, os, re, statistics
import numpy as np
from PIL import Image

ART = os.path.join(os.path.dirname(__file__), '..', 'public', 'art')
DIRS = ['s', 'se', 'e', 'ne', 'n']


def measure(path):
    a = np.array(Image.open(path).convert('RGBA'))[:, :, 3] > 60
    rows = np.where(a.any(1))[0]
    top, bot = int(rows[0]), int(rows[-1])
    count = a.sum(1)
    foot = bot
    for y in range(bot, top + int((bot - top) * 0.6), -1):
        if count[y] >= 22:
            foot = y
            break
    return a.shape[1], a.shape[0], top, foot


images = {}
heights = {}
files = sorted(glob.glob(os.path.join(ART, 'map_*.png')))
names = [os.path.basename(f)[:-4] for f in files]
idle = {}
for f, name in zip(files, names):
    m = re.fullmatch(r'map_([A-Za-z]+)_(s|se|e|ne|n)', name)
    if m:
        w, h, top, foot = measure(f)
        idle[name] = (w, h, top, foot)
        heights.setdefault(m.group(1), []).append(foot - top)

for f, name in zip(files, names):
    if name in idle:
        w, h, top, foot = idle[name]
    else:
        w, h, top, foot = measure(f)
        m = re.fullmatch(r'map_([A-Za-z]+)_([a-z]+)_(s|se|e|ne|n)', name)
        if m and f'map_{m.group(1)}_{m.group(3)}' in idle:
            foot = idle[f'map_{m.group(1)}_{m.group(3)}'][3]
    images[name] = {'footX': round(w / 2), 'footY': foot}

# 地图物件：底边落地的那一行，和那一行附近的水平中心（物件的"脚"）；还有不透明部分的宽度
props = {}
for f in sorted(glob.glob(os.path.join(ART, 'prop_*.png'))):
    a = np.array(Image.open(f).convert('RGBA'))[:, :, 3] > 60
    rows = np.where(a.any(1))[0]
    cols = np.where(a.any(0))[0]
    top, bot = int(rows[0]), int(rows[-1])
    band = a[bot - max(8, (bot - top) // 12):bot + 1]
    xs = np.nonzero(band)[1]
    props[os.path.basename(f)[:-4]] = {
        'footX': round(float(xs.mean())),
        'footY': bot,
        'left': int(cols[0]),
        'right': int(cols[-1]),
        'top': top,
    }

out = {
    '说明': '由 tools/map-anchors.py 生成：每张地图人物图的脚底位置（画布像素），每个人物站姿"脚底到头顶"的高度',
    'images': images,
    'props': props,
    'bodyHeight': {k: round(statistics.median(v)) for k, v in heights.items()},
}
json.dump(out, open(os.path.join(ART, 'map-anchors.json'), 'w'), ensure_ascii=False, indent=1)
print(len(images), 'images;', out['bodyHeight'])

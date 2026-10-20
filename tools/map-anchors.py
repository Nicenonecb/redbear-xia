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
- trim：四周完全透明的边裁到哪儿（x, y, 宽, 高）。游戏加载完以后只把这一块送进显卡，
  省显存；原图文件不动，裁掉的只有透明边和边上几乎看不见的杂点
- 坐标一律是原图上的像素

用法：python3 tools/map-anchors.py   （需要 Pillow 和 numpy）
"""
import glob, json, os, re, statistics
import numpy as np
from PIL import Image

ART = os.path.join(os.path.dirname(__file__), '..', 'public', 'art')
DIRS = ['s', 'se', 'e', 'ne', 'n']


def trim_box(path):
    """
    四周透明的边裁到哪儿，再留 4 像素，免得缩放时边缘采样到外面。
    出图工具会在人物四周撒几百个几乎看不见的杂点（不透明度不到 10%，一个个孤零零的），
    按"完全透明"来裁几乎裁不掉什么，所以不透明度 24/255 以下的散点不算；人物本身一个像素都不动
    """
    a = np.array(Image.open(path).convert('RGBA'))[:, :, 3] > 24
    rows = np.where(a.any(1))[0]
    cols = np.where(a.any(0))[0]
    x0, y0 = max(0, int(cols[0]) - 4), max(0, int(rows[0]) - 4)
    x1, y1 = min(a.shape[1], int(cols[-1]) + 5), min(a.shape[0], int(rows[-1]) + 5)
    return [x0, y0, x1 - x0, y1 - y0]


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
    images[name] = {'footX': round(w / 2), 'footY': foot, 'trim': trim_box(f)}

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
        'trim': trim_box(f),
    }

out = {
    '说明': '由 tools/map-anchors.py 生成：每张地图人物图的脚底位置（画布像素），每个人物站姿"脚底到头顶"的高度',
    'images': images,
    'props': props,
    'bodyHeight': {k: round(statistics.median(v)) for k, v in heights.items()},
}
json.dump(out, open(os.path.join(ART, 'map-anchors.json'), 'w'), ensure_ascii=False, indent=1)
print(len(images), 'images;', out['bodyHeight'])

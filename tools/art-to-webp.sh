#!/bin/sh
# 把 art-source/ 里的原图（PNG）转成无损 WebP 放进 public/art/，逐张核对像素一模一样，再改 manifest。
# 无损：-lossless 不丢任何信息；-exact 连完全透明像素底下的颜色也原样保留。转完解码回来和原图逐像素比，
# 有一个像素不同就报错退出（magick compare 的 AE = 不同像素的个数，必须是 0）。
# 用法：sh tools/art-to-webp.sh [文件名...]   （不给文件名就转全部；需要 cwebp 和 ImageMagick）
set -eu
cd "$(dirname "$0")/.."
SRC=art-source
OUT=public/art
JOBS=${JOBS:-8}

convert_one() {
  f=$1
  name=${f%.png}
  out="$OUT/$name.webp"
  # 原图没改过、WebP 已经转好的跳过
  if [ -f "$out" ] && [ "$out" -nt "$SRC/$f" ]; then return 0; fi
  cwebp -quiet -lossless -exact -z 9 -metadata none "$SRC/$f" -o "$out.tmp"
  diff=$(magick compare -metric AE "$SRC/$f" "webp:$out.tmp" null: 2>&1 || true)
  case "$diff" in
    0 | "0 (0)") mv "$out.tmp" "$out" ;;
    *) rm -f "$out.tmp"; echo "像素不一致：$f ($diff)" >&2; exit 1 ;;
  esac
}
# xargs 并行时每张图调回本脚本：sh tools/art-to-webp.sh --one 文件名
if [ "${1:-}" = "--one" ]; then convert_one "$2"; exit 0; fi

if [ "$#" -gt 0 ]; then files="$*"; else files=$(cd "$SRC" && ls *.png); fi
printf '%s\n' $files | xargs -P "$JOBS" -n 1 sh "$0" --one

# manifest 里的文件名 .png → .webp（只改 art-source 里有原图、已经转好的）
node -e '
const fs = require("fs");
const p = "public/art/manifest.json";
const m = JSON.parse(fs.readFileSync(p, "utf8"));
for (const [k, f] of Object.entries(m.images)) {
  if (!f || !f.endsWith(".png")) continue;
  const webp = f.replace(/\.png$/, ".webp");
  if (fs.existsSync("public/art/" + webp)) m.images[k] = webp;
}
fs.writeFileSync(p, JSON.stringify(m, null, 2) + "\n");
'
echo "done: $(ls "$OUT"/*.webp | wc -l | tr -d ' ') webp"

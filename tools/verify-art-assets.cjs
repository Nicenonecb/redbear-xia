// 检查游戏用的图（public/art/ 里的无损 WebP）、manifest 和对齐数据；不改任何图。
// 原图在 art-source/（PNG），每张都要有对应的 WebP，尺寸一样。像素一致在 tools/art-to-webp.sh 转换时逐张比过。
const fs = require('node:fs');
const assert = require('node:assert/strict');
const images = JSON.parse(fs.readFileSync('public/art/manifest.json')).images;
const anchors = JSON.parse(fs.readFileSync('public/art/map-anchors.json'));

/** 读 WebP 的宽高（无损 VP8L / 有损 VP8 / 扩展 VP8X 三种头） */
function webpSize(buf, slot) {
  assert.equal(buf.subarray(0, 4).toString(), 'RIFF', slot);
  assert.equal(buf.subarray(8, 12).toString(), 'WEBP', slot);
  const chunk = buf.subarray(12, 16).toString();
  if (chunk === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1, lossless: true };
  }
  if (chunk === 'VP8X') return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1, lossless: false };
  if (chunk === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff, lossless: false };
  assert.fail(`unknown WebP chunk ${chunk}: ${slot}`);
}
function pngSize(file) {
  const png = fs.readFileSync(file);
  assert.equal(png.subarray(1, 4).toString(), 'PNG', file);
  return { w: png.readUInt32BE(16), h: png.readUInt32BE(20) };
}

let count = 0;
for (const [slot, file] of Object.entries(images)) {
  if (!file) continue;
  assert(file.endsWith('.webp'), `not converted: ${slot}`);
  const { w, h, lossless } = webpSize(fs.readFileSync(`public/art/${file}`), slot);
  assert(lossless, `not lossless: ${slot}`);
  const src = `art-source/${file.replace(/\.webp$/, '.png')}`;
  assert(fs.existsSync(src), `missing source PNG: ${src}`);
  const o = pngSize(src);
  assert(o.w === w && o.h === h, `size differs from source: ${slot}`);
  if (/^(map|prop)_/.test(slot)) {
    const a = (slot.startsWith('map_') ? anchors.images : anchors.props)[slot];
    assert(a, `missing anchor: ${slot}`);
    assert(a.footY >= 0 && a.footY <= h, `foot outside canvas: ${slot}`);
    assert(a.trim && a.trim[0] >= 0 && a.trim[1] >= 0 && a.trim[0] + a.trim[2] <= w && a.trim[1] + a.trim[3] <= h, `invalid trim: ${slot}`);
  }
  count++;
}
for (const file of fs.readdirSync('public/art').filter((f) => /\.(webp|png)$/.test(f))) {
  assert(Object.values(images).includes(file), `unregistered image: ${file}`);
}
console.log(`${count} lossless WebP: manifest, source PNG sizes and map/prop anchors verified`);

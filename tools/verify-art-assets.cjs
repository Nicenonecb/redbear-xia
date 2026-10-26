// Validate shipped PNGs and the anchor data without changing source images.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const images = JSON.parse(fs.readFileSync('public/art/manifest.json')).images;
const anchors = JSON.parse(fs.readFileSync('public/art/map-anchors.json'));
let count = 0;
for (const [slot, file] of Object.entries(images)) {
  if (!file) continue;
  const png = fs.readFileSync(`public/art/${file}`);
  assert.equal(png.subarray(1, 4).toString(), 'PNG', slot);
  const w = png.readUInt32BE(16), h = png.readUInt32BE(20);
  assert(w > 0 && h > 0, slot);
  if (/^(map|prop)_/.test(slot)) {
    const a = (slot.startsWith('map_') ? anchors.images : anchors.props)[slot];
    assert(a, `missing anchor: ${slot}`);
    assert(a.footY >= 0 && a.footY <= h, `foot outside canvas: ${slot}`);
    assert(a.trim && a.trim[0] >= 0 && a.trim[1] >= 0 && a.trim[0] + a.trim[2] <= w && a.trim[1] + a.trim[3] <= h, `invalid trim: ${slot}`);
  }
  count++;
}
for (const file of fs.readdirSync('public/art').filter(f => f.endsWith('.png'))) {
  assert(Object.values(images).includes(file), `unregistered PNG: ${file}`);
}
console.log(`${count} PNGs: manifest, dimensions and map/prop anchors verified`);

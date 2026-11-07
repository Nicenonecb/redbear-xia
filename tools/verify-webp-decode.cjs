// Vite 开着时运行。文件层面像素一致由 tools/art-to-webp.sh 逐张核对；这里再看浏览器里画出来的样子：
// Chrome 解 PNG 和解 WebP 时半透明像素的预乘取整不一样，叠到底色上最多差 1/255（肉眼看不出），超过就报错。
// 浏览器里把原图 PNG 和 WebP 各自叠到同一块不透明底色上（游戏里画出来就是这样），逐像素比
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage();
  await p.goto(process.env.TEST_URL || 'http://127.0.0.1:5173/');
  const res = await p.evaluate(async () => {
    const m = (await (await fetch('art/manifest.json')).json()).images;
    const files = Object.values(m).filter(Boolean);
    const load = (u) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = u; });
    const px = (img, bg) => { const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; const x = c.getContext('2d', { willReadFrequently: true }); x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
    let worst = 0, differing = 0, files1 = 0;
    for (const f of files) {
      const [a, w] = await Promise.all([load('art-source/' + f.replace('.webp', '.png')), load('art/' + f)]);
      let fileWorst = 0;
      for (const bg of ['#efe7d6', '#000000', '#ffffff']) {
        const A = px(a, bg), W = px(w, bg);
        for (let i = 0; i < A.length; i++) { const d = Math.abs(A[i] - W[i]); if (d) { differing++; if (d > fileWorst) fileWorst = d; } }
      }
      if (fileWorst) files1++;
      worst = Math.max(worst, fileWorst);
    }
    return { files: files.length, filesWithAnyDiff: files1, differingChannelValues: differing, worstDiffOutOf255: worst };
  });
  console.log(JSON.stringify(res));
  if (res.worstDiffOutOf255 > 1) process.exitCode = 1;
  await b.close();
})();

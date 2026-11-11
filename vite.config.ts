import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

/**
 * 本地 dev 时和线上一样：/ 是选游戏页，/openbear/ 是 OpenBear，红熊大侠在 /redbear/。
 * 这两页就是 site/ 下的静态 HTML，每次请求现读，改了刷新就能看到
 */
function sitePages(): Plugin {
  const pages: Record<string, string> = {
    '/': 'site/index.html',
    '/index.html': 'site/index.html',
    '/openbear/': 'site/openbear/index.html',
    '/openbear/index.html': 'site/openbear/index.html',
  };
  return {
    name: 'site-pages',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? '/').split('?')[0];
        if (path === '/openbear' || path === '/redbear') {
          res.writeHead(301, { Location: `${path}/` }).end();
          return;
        }
        const file = pages[path];
        if (!file) return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(readFileSync(file));
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  // build 用相对路径，Electron 用 file:// 加载打包产物时也能找到资源；
  // dev 时把红熊大侠挂在 /redbear/ 下，和线上路径一致，根目录留给选游戏页
  base: command === 'serve' ? '/redbear/' : './',
  plugins: [sitePages()],
  server: { port: 5173 },
  // 红熊大侠打到 dist/redbear/；根目录的选择页和 OpenBear 在 site/ 下，build 完原样拷进 dist/
  // Phaser 本体就有 1.2MB，单包是正常的
  build: { outDir: 'dist/redbear', chunkSizeWarningLimit: 1500 },
}));

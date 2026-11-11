import { defineConfig } from 'vite';

export default defineConfig({
  // 相对路径，Electron 用 file:// 加载打包产物时也能找到资源
  base: './',
  server: { port: 5173 },
  // Phaser 本体就有 1.2MB，单包是正常的
  // 红熊大侠打到 dist/redbear/；根目录的选择页和 OpenBear 在 site/ 下，build 完原样拷进 dist/
  build: { outDir: 'dist/redbear', chunkSizeWarningLimit: 1500 },
});

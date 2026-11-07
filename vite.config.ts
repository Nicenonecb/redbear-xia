import { defineConfig } from 'vite';

export default defineConfig({
  // 相对路径，Electron 用 file:// 加载打包产物时也能找到资源
  base: './',
  server: { port: 5173 },
  // Phaser 本体就有 1.2MB，单包是正常的
  build: { chunkSizeWarningLimit: 1500 },
});

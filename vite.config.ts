import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@attend': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        ch1:         resolve(__dirname, 'ui_kits/reader/ch1-dot-product.html'),
        ch2:         resolve(__dirname, 'ui_kits/reader/ch2-softmax.html'),
        ch3:         resolve(__dirname, 'ui_kits/reader/ch3-scale.html'),
        ch4_3:       resolve(__dirname, 'ui_kits/reader/index.html'),
        ch4_4:       resolve(__dirname, 'ui_kits/reader/ch4-multihead.html'),
        ch5:         resolve(__dirname, 'ui_kits/reader/ch5-positional.html'),
        ch6:         resolve(__dirname, 'ui_kits/reader/ch6-transformer.html'),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts'],
    },
  },
});

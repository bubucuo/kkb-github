import { defineConfig } from 'umi';

export default defineConfig({
  base: '/kkb',
  hash: true,
  layout: {},
  routes: [{ path: '/', component: '@/pages/index' }],
});

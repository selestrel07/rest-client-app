import { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  prerender: ['/'],
  ssr: true,
} satisfies Config;

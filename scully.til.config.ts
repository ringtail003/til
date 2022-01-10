import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'til',
  outDir: './dist/static',
  appPort: 4201,
  reloadPort: 4202,
  routes: {
    '/posts/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './posts',
      },
    },
  },
  guessParserOptions: {
    excludedFiles: [
      './src/app/pages/all-posts/all-posts-routing.module.ts',
      './src/app/pages/recent-posts/recent-posts-routing.module.ts',
      './src/app/pages/blog-post/blog-post-routing.module.ts',
    ],
  },
};

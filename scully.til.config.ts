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
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './posts',
      },
    },
  },
  guessParserOptions: {
    excludedFiles: ['./src/app/pages/list/list-routing.module.ts'],
  },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const scully_1 = require("@scullyio/scully");
require("@scullyio/scully-plugin-puppeteer");
(0, scully_1.setPluginConfig)('md', { enableSyntaxHighlighting: true });
exports.config = {
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
        excludedFiles: ['./src/app/pages/list/list-routing.module.ts'],
    },
};

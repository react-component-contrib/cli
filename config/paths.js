const path = require('path');
const context = process.env.CWD || process.cwd();
const join = (...args) => path.join(context, ...args);

module.exports = {
  context,
  src: join('src'),
  index: join('src/index.ts'),
  styles: join('styles'),
  styleIndex: join('styles/index.less'),
  lib: join('lib'),
  preview: join('preview'),
  tests: join('tests'),
  testsVisual: join('tests/visual'),
  packageJSON: join('package.json'),
  tsConfig: join('tsconfig.json'),
  babelConfig: join('babel.config'),
  jestConfig: join('jest.config.js'),
  jestE2EConfig: join('jest.e2e.config.js'),
  gulpfile: path.join(__dirname, './gulpfile.js'),
  jestPuppeteerConfig: path.join(__dirname, './jest-puppeteer.config.js'),
};

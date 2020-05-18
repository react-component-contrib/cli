const fs = require('fs');
const jest = require('../utils/jest');
const paths = require('../../config/paths');

module.exports = () => {
  jest(paths.jestConfig);
  if (!fs.existsSync(paths.jestE2EConfig)) {
    return;
  }
  process.env.JEST_PUPPETEER_CONFIG = require.resolve(paths.jestPuppeteerConfig);
  process.env.CWD = process.cwd();
  jest(paths.jestE2EConfig);
  process.env.CWD = undefined;
};

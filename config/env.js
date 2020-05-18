const paths = require('./paths');
const packageConfig = require(paths.packageJSON);

module.exports = {
  ...packageConfig.config,
  name: packageConfig.name,
  context: null,
  lib: null,
  webpackConfig: null,
}

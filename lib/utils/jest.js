const spawn = require('cross-spawn');
const paths = require('../../config/paths');

module.exports = function gulp(config) {
  return spawn.sync('npx', [
    'jest',
    '--config', config,
  ], {
    stdio: 'inherit',
    cwd: paths.context,
  })
}

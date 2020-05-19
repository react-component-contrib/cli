const spawn = require('cross-spawn');
const paths = require('../../config/paths');

module.exports = function gulp(task) {
  return spawn.sync('npx', [
    'gulp',
    '-f', paths.gulpfile,
    '--cwd', paths.context,
    task,
  ], {
    stdio: 'inherit',
    cwd: paths.context,
  })
}

const spawn = require('cross-spawn');
const paths = require('../../config/paths');

module.exports = function getLatestVersion(packageName) {
  const result = spawn.sync('npm', [
    'view',
    packageName,
    'version',
  ], {
    stdio: 'pipe',
  })
  try {
    return result.stdout.toString().trim();
  } catch (error) {}
  return null;
}

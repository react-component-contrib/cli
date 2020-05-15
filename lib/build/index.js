const action = require('./action');

module.exports = {
  command: 'build',
  description: 'bundles the app into static files for production',
  action,
};

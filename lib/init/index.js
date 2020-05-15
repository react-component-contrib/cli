const action = require('./action');
const error = require('./error');

module.exports = {
  command: 'init',
  arguments: '<component-project-directory>',
  description: 'init a project',
  action,
  error,
};

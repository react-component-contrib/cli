const action = require('./action');
const error = require('./error');

module.exports = {
  command: 'init',
  description: 'init a project',
  arguments: '<component-project-directory>',
  options: [
    ['--use-e2e', 'enable E2E test'],
  ],
  action,
  error,
};

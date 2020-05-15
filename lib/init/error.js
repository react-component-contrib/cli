const chalk = require('chalk');
const {program} = require('commander');

module.exports = error => {
  console.log('Please specify the project directory:');
  console.log(' ', chalk.cyan(program._name, 'init'), chalk.green('<component-project-directory>'));
  console.log();
  console.log('For example:');
  console.log(' ', chalk.cyan(program._name, 'init'), chalk.green('button'));
}

const chalk = require('chalk');
const {program} = require('commander');

module.exports = (error, config) => {
  console.log('Please specify the project directory:');
  console.log(' ', chalk.cyan(program._name, 'init'), chalk.green('<component-project-directory>'), '[options]');
  if (config.options && config.options.length) {
    console.log();
    console.log('Options:');
    config.options.forEach(option => console.log(option[0], option[1]));
  }
  console.log();
  console.log('Only', chalk.green('<component-project-directory>'), 'is required.');
  console.log();
  console.log('For example:');
  console.log(' ', chalk.cyan(program._name, 'init'), chalk.green('button'));
}

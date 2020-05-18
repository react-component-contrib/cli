const { program } = require('commander');
const chalk = require('chalk');
const package = require('../package.json');
const generateProcessError =require('./utils/process-error');
const init = require('./init');
const start = require('./start');
const build = require('./build');
const test = require('./test');

const commands = [init, start, build, test];
const processError = generateProcessError(commands);
const _consoleError = console.error;

console.error = () => {};

program.exitOverride(error => {
  console.error = _consoleError;
  if (error.code.includes('help')) {
    return;
  }
  processError(error);
});

program
  .name(chalk.cyan(Object.keys(package.bin)[0]))
  .version(package.version);

commands.forEach((item) => {
  let instance = program
    .command(item.command)
    .arguments(item.arguments || '')
    .description(item.description || '')
  if (item.options) {
    instance = item.options.reduce((program, option) => {
      return program.option(option[0], option[1]);
    }, instance);
  }
  instance.action((...args) => {
    console.error = _consoleError;
    item.action(...args);
  });
});

program.parse(process.argv);

console.error = _consoleError;

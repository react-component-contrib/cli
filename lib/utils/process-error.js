const { program } = require('commander');

function generate(commands) {
  return error => {
    const [ subCommand ] = program.args;
    const match = commands.find(command => command.command === subCommand);
    if (match && match.error) {
      match.error(error, match);
      return;
    }
    console.error(error.message);
  };
}

module.exports = generate;

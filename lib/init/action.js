const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const os = require('os');
const spawn = require('cross-spawn');
const cliPackage = require('../../package.json');
const validateProjectName = require('../utils/validate-project-name');

class Creator {
  context = null;

  name = null;

  package = null;

  options = {};

  constructor(projectDirectory, options) {
    this.context = path.resolve(projectDirectory);
    this.name = path.basename(this.context);
    this.options = options;
  }

  init() {
    validateProjectName(this.name);

    // create directory
    this.createDirectory();

    // copy template
    this.copyTemplate();

    // rewrite template
    this.rewriteTemplate();

    // install template packages
    this.installPackages();

    this.printGuide();
  }

  createDirectory() {
    const name = this.name;
    if (fs.existsSync(this.context)) {
      console.error(chalk.red('Error:'), chalk.green(`[${name}]`),'directory already exists');
      process.exit(1);
    }
    fs.mkdirSync(this.context);
    console.log('Creating a new React Component in', chalk.green(this.context));
  }

  copyTemplate() {
    const name = this.name;
    fs.copySync(path.join(__dirname, '../../template'), this.context);
    console.log('Copy template to',  chalk.green(name), 'folder');
    const componentPackagePath = path.join(this.context, 'package.json');
    const componentPackage = require(componentPackagePath);
    this.packagePath = componentPackagePath;
    this.package = componentPackage;
  }

  rewriteTemplate() {
    const name = this.name;
    const componentPackagePath = this.packagePath;
    const componentPackage = this.package;
    const bin = Object.keys(cliPackage.bin)[0];
    const [organization] = cliPackage.name.split('/');
    componentPackage.name = `${organization}/${name}`;
    componentPackage.scripts = {
      start: `${bin} start`,
      build: `${bin} build`,
      test: `${bin} test`,
    };
    componentPackage.devDependencies = {
      [cliPackage.name]: cliPackage.version,
      ...componentPackage.devDependencies,
    };
    if (!this.options.useE2E) {
      delete componentPackage.devDependencies.puppeteer;
      fs.removeSync(path.join(this.context, 'tests', 'functional'));
      fs.removeSync(path.join(this.context, 'tests', 'visual'));
      fs.removeSync(path.join(this.context, 'tests', 'setup-puppeteer.js'));
      fs.removeSync(path.join(this.context, 'jest.e2e.config.js'));
    }
    fs.writeFileSync(
      componentPackagePath,
      JSON.stringify(componentPackage, null, 2) + os.EOL
    );
    console.log('Rewrite',  chalk.green(name), 'package.json', 'successfully');
  }

  installPackages() {
    const command = 'npm';
    const args = ['install'];
    console.log(`Installing template dependencies using ${chalk.cyan(command)}...`);
    const result = spawn.sync(command, args, {
      stdio: 'inherit',
      cwd: this.context,
    });
    if (result.status !== 0) {
      console.log(`${chalk.cyan(command, args.join(' '))} ${chalk.red('failed')}`);
      return;
    }
  }

  printGuide() {
    const cdPath = path.relative(process.cwd(), this.context);
    console.log();
    console.log(`Success! Created ${chalk.cyan(this.package.name)} at ${chalk.green(this.context)}`);
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan(`  npm run start`));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan(`  npm run build`));
    console.log('    Bundles the app into static files for production.');
    console.log();
    console.log(chalk.cyan(`  npm run test`));
    console.log('    Starts the test runner.');
    console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log(chalk.cyan('  cd'), chalk.green(cdPath));
    console.log(chalk.cyan(`  npm run start`));
    console.log();
    console.log('Happy hacking!');
  }
}

module.exports = (projectDirectory, cmd) => {
  const creator = new Creator(projectDirectory, {
    useE2E: cmd.useE2e,
  });
  creator.init();
}

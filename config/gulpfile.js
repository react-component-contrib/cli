const path = require('path');
const fs = require('fs');
const { series, parallel, src, dest, watch, } = require('gulp');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackStream = require('webpack-stream');
const gutil = require("gulp-util");
const gulpClean = require('gulp-clean');
const gulpLess = require('gulp-less');
const webServer = require('gulp-webserver');
const paths = require('./paths');
const config = require('./env');
const webpackDevelopmentConfig = require('./webpack.config.development');
const webpackProductionConfig = require('./webpack.config.production');
const webpackE2EConfig = require('./webpack.config.e2e');
const webpackPreviewConfig = require('./webpack.config.preview');

function css() {
  return src(paths.styleIndex)
    .pipe(
      gulpLess({
        javascriptEnabled: true,
      })
    )
    .pipe(dest(config.lib));
}

function less(callback) {
  if (!fs.existsSync(config.lib)) {
    fs.mkdirSync(config.lib);
  }
  const relative = path.relative(
    path.join(config.lib),
    paths.styleIndex,
  );
  fs.writeFileSync(path.join(config.lib, 'index.less'), `@import '${relative}';`);
  callback();
}

function es() {
  return src(paths.index)
    .pipe(webpackStream(config.webpackConfig))
    .pipe(dest(config.lib));
}

function clean() {
  return src(config.clean, { allowEmpty: true })
    .pipe(gulpClean({ force: true }));
}

function preview(callback) {
  const compiler = webpack(webpackPreviewConfig);
  new WebpackDevServer(
    compiler,
    webpackPreviewConfig.devServer
  ).listen(webpackPreviewConfig.devServer.port, () => callback());
}

function e2e(callback) {
  webpack(webpackE2EConfig, (error, stats) => {
    if(error) throw new gutil.PluginError("e2e", error);
    gutil.log("[e2e]", stats.toString({
      colors: true,
    }));
    callback();
  });
}

function server() {
  return src(path.join(config.context, 'dist'))
    .pipe(
      webServer({
        port: config.e2e.port,
      })
    );
}

function buildEnvironment(callback) {
  config.context = paths.context;
  config.lib = paths.lib;
  config.webpackConfig = webpackProductionConfig;
  config.clean = [config.lib];
  callback();
}

function startEnvironment(callback) {
  config.context = paths.preview;
  config.lib = path.join(config.context, 'lib');
  config.webpackConfig = webpackDevelopmentConfig;
  config.clean = [config.lib, path.join(config.context, 'dist')];
  callback();
}

function e2eEnvironment(callback) {
  config.context = paths.testsVisual;
  config.lib = path.join(config.context, 'lib');
  config.webpackConfig = webpackProductionConfig;
  config.clean = [config.lib, path.join(config.context, 'dist')];
  callback();
}

const style = parallel(css, less);
const lib = series(clean, parallel(style, es));

function change(callback) {
  const options = {
    delay: 1000,
  };
  watch(
    paths.styles,
    options,
    style,
  );
  watch(
    paths.src,
    options,
    es,
  );
  callback();
}

exports.build = series(buildEnvironment, lib);

exports.start = series(startEnvironment, lib, change, preview);

exports.e2e = series(e2eEnvironment, lib, e2e, server);

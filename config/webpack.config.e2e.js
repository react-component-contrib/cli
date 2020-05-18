const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const config = require('./env');

function getEntries() {
  const root = 'tests/visual/src';
  const files = glob.sync(path.join(paths.context, root, '**/index.jsx'));
  return files.reduce((prev, current) => {
    const [, dirname] = new RegExp(`${root}\/(.*)\/index.jsx`).exec(current);
    if (dirname) {
      prev[dirname] = current;
    }
    return prev;
  }, {});
}

function join(...args) {
  return path.join(paths.testsVisual, ...args);
}

const entries = getEntries();

module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    filename: (file) => {
      if (file.chunk.name === '__manifest__') {
        return '__common__/manifest.[hash:6].js';
      }
      return '[name]/index.[hash:6].js';
    },
    chunkFilename: '[name]/index.[hash:6].js',
    path: join('dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: paths.babelConfig,
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    alias: {
      lib: join('lib'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.[hash:6].css',
    }),
    ...Object.keys(entries).map((entrie) => {
      return new HtmlWebpackPlugin({
        template: join('index.html'),
        filename: `${entrie}/index.html`,
        inject: true,
        chunks: ['__manifest__', '__common__', entrie],
        title: config.name,
      });
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          name: '__common__',
          test: /[\\/]node_modules[\\/]|[\\/]tests[\\/]visual[\\/]lib[\\/]/,
          priority: -10,
        },
      },
    },
    runtimeChunk: {
      name: '__manifest__',
    },
  },
};

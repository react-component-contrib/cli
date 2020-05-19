const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const config = require('./env');

function join(...args) {
  return path.join(paths.preview, ...args);
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: false,
    port: config.preview.port,
    publicPath: '/',
    open: true,
  },
  entry: join('src/index.jsx'),
  output: {
    filename: 'index.[hash:6].js',
    path: join('dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
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
      filename: 'index.[hash:6].css',
    }),
    new HtmlWebpackPlugin({
      template: join('index.html'),
      filename: 'index.html',
      inject: true,
      title: config.name,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

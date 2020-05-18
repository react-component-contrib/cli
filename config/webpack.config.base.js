const tsTransformPaths = require('@zerollup/ts-transform-paths');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const paths = require('./paths');
const config = require('./env');

module.exports = {
  entry: paths.index,
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: config.name,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: (program) => {
            const transformer = tsTransformPaths(program);

            return {
              before: [transformer.before],
              afterDeclarations: [transformer.afterDeclarations],
            };
          },
        },
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    '@react-component-contrib/util': '@react-component-contrib/util',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.tsConfig })],
  },
};

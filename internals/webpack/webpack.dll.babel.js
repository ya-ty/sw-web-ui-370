/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { resolve } = require('path');
const defaults = require('lodash/defaultsDeep');
const webpack = require('webpack');
const pkg = require(resolve(__dirname, '../../', 'package.json')); // eslint-disable-line
const { dllPlugin } = require('../config');

if (!pkg.dllPlugin) {
  process.exit(0);
}

const dllConfig = defaults(pkg.dllPlugin, dllPlugin.defaults);
const outputPath = resolve(__dirname, '../../', dllConfig.path);

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  context: resolve(__dirname, '../../'),
  entry: dllConfig.dlls ? dllConfig.dlls : dllPlugin.entry(pkg),
  optimization: {
    minimize: false,
  },
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve(outputPath, '[name].json'),
    }),
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
      if (!/\/moment\//.test(context.context)) {
        return;
      }
      // context needs to be modified in place
      Object.assign(context, {
      // include only CJK
        regExp: /^\.\/(ja|ko|zh)/,
        // point to the locale data folder relative to moment's src/lib/locale
        request: './locale'
      });
    })
  ],
  performance: {
    hints: false,
  },
});
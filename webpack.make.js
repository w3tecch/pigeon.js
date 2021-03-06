'use strict';

var webpack = require('webpack');
var yargs = require('yargs').argv;
var path = require('path');
var helpers = require(process.cwd() + '/webpack.helpers.js');

module.exports = function makeWebpackConfig(options) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  var BUILD = !!options.BUILD;
  var TEST = !!options.TEST;

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if (TEST) {
    config.entry = {}
  } else {
    config.entry = {
      'pigeon': ['./lib/index.ts'],
      'pigeon.min': ['./lib/index.ts']
    };
  }

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {}
  } else {
    config.output = {
      path: helpers.root('dist'),
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      // export itself to a global var
      libraryTarget: "umd"
    };
  }

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (TEST) {
    config.devtool = 'inline-source-map';
  } else if (BUILD) {
    config.debug = true;
    config.devtool = 'source-map';
  } else {
    config.debug = true;
    config.devtool = 'eval';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  // Initialize module
  config.module = {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint'
      }
    ],
    loaders: []
  };

  // TS-LOADER
  if (TEST) {
    config.module.loaders.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    );
  } else {
    config.module.loaders.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e|async)\.ts$/]
      }
    );
  }

  /**
   * TSLINT
   */
  // Other module loader config
  config.tslint = {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  };

  /**
   * Sinon
   * This two config items are needed to be able to use sinon in your tests
   */
  config.module.noParse = [
    /\/sinon.js/
  ];

  config.resolve = {
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  if (BUILD) {
    config.plugins.push(new webpack.BannerPlugin(helpers.getBanner()));
  }

  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        mangle: {
          // You can specify all variables that should not be mangled.
          // For example if your vendor dependency doesn't use modules
          // and relies on global variables. Most of angular modules relies on
          // angular global variable, so we should keep it unchanged
          except: ['exports', 'require']
        }
      })
    )
  }

  return config;
};
'use strict';

//pigeon.js

var webpack = require('webpack');
// var autoprefixer = require('autoprefixer');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
      'pigeon': './lib/pigeon.ts'
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
      sourceMapFilename: '[name].map'
    };
    //config.output = {
    //  // Absolute output directory
    //  path: __dirname + '/public',
    //
    //  // Output path from the view of the page
    //  // Uses webpack-dev-server in development
    //  publicPath: BUILD ? '/' : 'http://localhost:8080/',
    //
    //  // Filename for entry points
    //  // Only adds hash in build mode
    //  filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
    //
    //  // Filename for non-entry points
    //  // Only adds hash in build mode
    //  chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    //}
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
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  // // Automatically move all modules defined outside of application directory to vendor bundle.
  // // If you are using more complicated project structure, consider to specify common chunks manually.
  // if (!TEST) {
  //   config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     minChunks: function (module, count) {
  //       return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
  //     }
  //   }));
  // }

  if (BUILD) {
    config.plugins.push(new webpack.BannerPlugin(helpers.getBanner()));
  }

  // // Adds webpack HMR support. It act's like livereload,
  // // reloading page after webpack rebuilt modules.
  // // It also updates stylesheets and inline assets without page reloading.
  // if (!TEST && !BUILD) {
  //   config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // }

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

  // /**
  //  * Dev server configuration
  //  * Reference: http://webpack.github.io/docs/configuration.html#devserver
  //  * Reference: http://webpack.github.io/docs/webpack-dev-server.html
  //  */
  // config.devServer = {
  //   port: helpers.getMetadata().port,
  //   host: helpers.getMetadata().host,
  //   // contentBase: 'src/',
  //   historyApiFallback: true,
  //   watchOptions: {aggregateTimeout: 300, poll: 1000}
  // };

  return config;
};
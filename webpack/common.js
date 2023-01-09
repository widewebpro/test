// node modules
const path = require('path');
const { mergeWithCustomize, customizeObject } = require('webpack-merge');
const webpack = require('webpack');

// webpack plugins
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const Dotenv = require('dotenv-webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');

// config files
const pkg = require('../package.json');
const settings = require('./config');

const isDev = settings.env == 'dev' || settings.env == 'development';
const isStage = settings.env == 'staging';
const isShopify = process.env.SHOPIFY;

// Loaders
const babelLoader = require('./config/loaders/babel')

// Configure terser
const configureTerser = () => {
  return {
    parallel: true,
    extractComments: isStage || isDev ? false : true,
    terserOptions: { compress: { drop_console: isDev || isStage ? false : true } }
  };
};


// Configure Manifest
const configureManifest = (fileName) => {
  return {
      fileName: fileName,
      basePath: '',
      map: (file) => {
          file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
          return file;
      },
  };
};

// Configure optimization
const configureOptimization = (legacy) => {
  let optimization = {
    // runtimeChunk: 'single',
    minimizer: [new TerserPlugin(configureTerser())]
  };

  optimization.splitChunks = {
    chunks: 'all',
    automaticNameDelimiter: '-',
    cacheGroups: {}
  }

  return optimization
}

// The base webpack config
const baseConfig = (legacy) => {
  let legacyExtension = legacy ? '-legacy' : '';

  return {
    name: pkg.name,
    entry: settings.entries,
    cache: isDev ? false : true,
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : false,
    optimization: configureOptimization(legacy),
    stats: {
      children: true,
      errorDetails: true
    },
    output: {
      filename: path.join('', `[name]${legacyExtension}.js`),
      chunkFilename: path.join('', `[name]${legacyExtension}-[chunkhash:8].js`),
      path: path.resolve(__dirname, settings.paths.dist.base),
      publicPath: settings.urls.publicPath
    },
    module: {
      rules: [
        babelLoader(
          Object.values(settings.browserslist[legacy ? 'legacy' : 'modern']),
          settings
        ),
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        WEBPACK_DEV_BUILD: isDev ? true : false
      }),
      new Dotenv(),
      new WebpackNotifierPlugin({
          title: 'Webpack',
          excludeWarnings: true,
          alwaysNotify: true
      }),
      new WebpackManifestPlugin(
        configureManifest(`manifest${legacyExtension}.json`)
      )
    ]
  }
};

// Common module exports
// noinspection WebpackConfigHighlighting
let common = {}

common.modern = mergeWithCustomize({
  customizeObject: customizeObject({
    module: 'prepend',
    plugins: 'prepend',
  })
})(baseConfig(legacy = false))

if (settings.generateLegacy() == 'true') {
  common.legacy = mergeWithCustomize({
    customizeObject: customizeObject({
      module: 'prepend',
      plugins: 'prepend',
    })
  })(baseConfig(legacy = true))
}

module.exports = common

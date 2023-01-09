const glob = require('glob-all');
const moment = require('moment');
const webpack = require('webpack');
const pkg = require('../package.json')
const settings = require('./config');

// webpack plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CreateSymlinkPlugin = require('create-symlink-webpack-plugin');

// Dev & Prod plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Prod plugins
const zopfli = require('@gfx/zopfli');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// // const BrotliPlugin = require('brotli-webpack-plugin');

// Configure Workbox service worker
const configureWorkbox = () => {
  let config = settings.workbox;
  return config;
};

// Configure file banner
const configureBanner = () => {
  return {
    raw: true,
    banner: [
      '/*!',
      ' * @project        ' + settings.name,
      ' * @name           ' + '[base]',
      ' * @author         ' + pkg.author.name,
      ' * @build          ' + moment().format('YYYY-MM-DD HH:mm:ss') + ' ET',
      ' * @copyright      Copyright (c) ' + moment().format('YYYY') + ' ' + settings.copyright,
      ' * @hash           fullhash:[fullhash], chunkhash:[chunkhash]',
      ' *',
      ' */',
      ''
    ].join('\n')
  };
};

// Configure Bundle Analyzer
const configureBundleAnalyzer = (legacy) => {
  return {
    openAnalyzer: false,
    analyzerMode: 'static',
    reportFilename: `report${legacy ? '-legacy' : ''}.html`,
  };
};

// Configure Compression webpack plugin
const configureCompression = () => {
  return {
    filename: '[path][base].gz[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
    compressionOptions: {
      numiterations: 15,
      level: 9
    },
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback);
    }
  };
};

const configureCleanWebpack = () => {
  return {
    cleanOnceBeforeBuildPatterns: settings.paths.dist.clean,
    verbose: true,
    dry: false
  };
}

const configureSourceMaps = () => {
  return {
    filename: `maps/[file].map`,
    publicPath: settings.urls.publicPath,
    exclude: ['vendors.js']
  }
}

const prod = (isLegacy) => {
  let plugins = [
    new CleanWebpackPlugin(configureCleanWebpack()),
    new webpack.BannerPlugin(configureBanner()),
    new CompressionPlugin(configureCompression()),
    new WorkboxPlugin.GenerateSW(configureWorkbox()),
    new CreateSymlinkPlugin(settings.createSymlinkConfig,true),
    new BundleAnalyzerPlugin(configureBundleAnalyzer(legacy = false))
    // // new BrotliPlugin(configureBrotli(legacy = false)),
  ]

  if(isLegacy) {
    plugins = [
      new webpack.BannerPlugin(configureBanner()),
      new CompressionPlugin(configureCompression()),
      new BundleAnalyzerPlugin(configureBundleAnalyzer(legacy = true))
    ]
  }

  return plugins;
}

const dev = () => {
  let plugins = [
    new CleanWebpackPlugin(configureCleanWebpack()),
    new webpack.BannerPlugin(configureBanner()),
    new webpack.SourceMapDevToolPlugin(configureSourceMaps()),
  ];

  return plugins
}

module.exports = { dev: dev, prod: prod }

const workbox = require('./workbox')
const browserslist = require('./browserslist')
const paths = require('./paths')
const path = require('path');

require('dotenv').config();

const isShopify = process.env.SHOPIFY;

const base = {
  name: process.env.SITE_NAME,
  copyright: 'PaperTiger - https://www.papertiger.com',
  isDev: __filename.includes('dev.js'),
  env:  process.env.ENVIRONMENT,
  generateLegacy: () => process.env.GENERATE_LEGACY || false,

  // Css File Name
  vars: { cssName: 'app' },

  // JS File Name
  entries: {
    'app': path.resolve('./src/js/app.js')
  },

  paths: paths,

  urls: {
    live: '',
    stage: '',
    local: (process.env.PRIMARY_SITE_URL || 'locahost'),
    publicPath: isShopify ? '' : '/_compiled/',
    webRoot: ``
  },

  babelLoaderConfig: {
    exclude: [
      /(node_modules|bower_components)/
    ],
  },

  copyWebpackConfig: [
    {
      from: './src/js/workbox-catch-handler.js',
      to: 'js/[name].[ext]'
    }
  ],

  createSymlinkConfig: [
    {
      origin: `${process.env.WEB_ROOT}/assets/meta-icons/favicon.ico`,
      symlink: '../favicon.ico'
    }
  ]
}

module.exports = {
    ...base,
    // ...purge,
    // ...browsersync,
    ...workbox,
    ...browserslist,
    ...paths
}

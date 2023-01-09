const { merge } = require('webpack-merge');

const common = require('./common')
const plugins = require('./plugins')

module.exports = [
  merge(
    common.modern,
    { plugins: plugins.dev(legacy = false) }
  )
]

const { merge } = require('webpack-merge');

// config files
const settings = require('./config');
const common = require('./common');
const plugins = require('./plugins');

// Production module exports
let prod = []

if (settings.generateLegacy() == 'true') {
  console.log('---- Generating Legacy Build ----')
  prod.push(
    merge(
      common.legacy,
      { plugins: plugins.prod(legacy = true) }
    )
  )
}

prod.push(
  merge(
    common.modern,
    { plugins: plugins.prod(legacy = false) }
  )
)

module.exports = prod

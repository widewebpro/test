const purge = require('./tailwind/configs/purge')
const env = process.env.NODE_ENV;

module.exports = ctx => ({
  plugins: [
    require('postcss-partial-import')(),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-focus-visible'),
    require('autoprefixer'),
    // env === 'production' ? require('@fullhuman/postcss-purgecss')(purge) : null,
    env === 'production' ? require('cssnano')({preset: 'default' }) : null
  ]
})

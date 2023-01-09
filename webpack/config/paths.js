require('dotenv').config();
const isShopify = process.env.SHOPIFY;

module.exports = {
  src: {
    css: '../src/css/',
    js: '../src/js/'
  },
  dist: {
    base: isShopify ? `../${process.env.WEB_ROOT}` : `../${process.env.WEB_ROOT}/_compiled/`,
    css: isShopify ? `../${process.env.WEB_ROOT}` : `../${process.env.WEB_ROOT}/_compiled/*.css`,
    js: isShopify ? `../${process.env.WEB_ROOT}` : `../${process.env.WEB_ROOT}/_compiled/*.js`,
    clean: ['*.js', '*.json', '*.js.gz', '*.map', '*.html']
  },
  files: {
    templates: `../${process.env.TEMPLATE_DIR}/**/*.{twig,html,php,liquid}`,
    js: '../src/js/**/**/*.{js,jsx}'
  }
}

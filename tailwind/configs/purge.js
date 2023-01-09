module.exports = {
  content: [
    './theme/{sections,snippets,layout,templates}/*.liquid',
    './templates/**/*.{twig,html}',
    './src/js/**/*.{js,jsx,ts,tsx}'
  ],
  options: {
    keyframes: true
  },
  extensions: ['html', 'js', 'jsx', 'ts', 'tsx', 'twig', 'liquid', 'php'],
  whitelistPatterns: [
    /^js_/,
    /^is-/,
    /^has-/,
    /^wp-/,
    /^swiper-/
  ],
  extractors: [{
    extractor: (content) => {
      return content.match(/[A-Za-z0-9-_:\/[/\]]+/g) || [];
    },
    extensions: [ 'html', 'js', 'jsx', 'ts', 'tsx', 'twig', 'liquid', 'php']
  }]
}

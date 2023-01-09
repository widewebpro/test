module.exports = {
  workbox: {
    swDest: 'sw.js',
    // swSrc: './src/js/service-worker.js',
    exclude: [
      /\.(png|jpe?g|gif|svg|webp)$/i,
      /\.map$/,
      /\.LICENSE\.txt$/,
      /^manifest.*\\.js(?:on)?$/,
    ],
  },
}

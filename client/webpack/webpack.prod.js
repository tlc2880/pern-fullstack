const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map', // this is optional
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Production'),
    }),
  ],
}
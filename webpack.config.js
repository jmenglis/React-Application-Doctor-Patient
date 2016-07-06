var webpack = require('webpack')

module.exports = {
  entry: './source/main.jsx',

  output: {
    path: 'public/javascripts',
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=es2016&presets[]=react' }
    ]
  }
}

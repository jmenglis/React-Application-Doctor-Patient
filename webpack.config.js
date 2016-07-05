module.exports = {
  entry: './source/main.jsx',

  output: {
    path: 'public/javascripts',
    filename: 'main.jsx',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=es2016&presets[]=react' }
    ]
  }
}

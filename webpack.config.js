module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    library: 'redux-support-action-class',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }]
  }
};
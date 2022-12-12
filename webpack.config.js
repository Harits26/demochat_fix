var webpack = require('webpack');
var path = require('path');

var config = {
  entry: [
    './Client/css/index.css',
    './Client/index.js'
  ],
  output: {
    library: 'eChat',
    libraryTarget: 'var',
    path: path.resolve('./dist'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      moment: "moment",
    })
  ]
};

module.exports = config;
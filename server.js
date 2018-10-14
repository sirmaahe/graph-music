const express = require('express');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Serve the Relay app
var compiler = webpack({
  mode: 'development',
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets:["@babel/preset-env", "@babel/preset-react"],
          plugins: [["relay", { "schema": "./shared/schema.json" }]]
        }
      }
    }]
  },
  output: {filename: 'app.js', path: '/'}
});
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: {colors: true}
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

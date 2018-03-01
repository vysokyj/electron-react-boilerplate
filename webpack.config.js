var path = require('path');
var webpack = require('webpack');
var yargs = require('yargs');
var pjson = require('./package.json')

var args = yargs.alias('p', 'production').argv;
var environment = args.production ? 'production' : 'development';
var dev = (environment === 'development');
console.log('Environment: %s', environment);
console.log('Application: %s@%s', pjson.name, pjson.version);


var entry = dev ? [
  'react-hot-loader/patch',
  // activate HMR for React

  'webpack-dev-server/client?http://localhost:3000',
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint

  'webpack/hot/only-dev-server',
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates

  './src/index.js',
  // the entry point of our app
] : './src/index.js';

var output = dev ? {
  filename: 'bundle.js',
  // the output bundle
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/static/'
  // necessary for HMR to know where to load the hot update chunks
} : {
  filename: 'static/bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/'
};

var devtool = dev ? 'inline-source-map' : 'source-map';

var rules = [
  {
    test: /\.jsx?$/,
    use: [
      'babel-loader',
    ],
    exclude: /node_modules/,
  },
];

var plugins = dev ? [
  new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  new webpack.NoEmitOnErrorsPlugin() // do not emit compiled assets that include errors
] : [
];

var devServer = dev ? {
  host: 'localhost',
  port: 3000,

  historyApiFallback: true,
  // respond to 404s with index.html

  hot: true,
  // enable HMR on the server
} : {};

module.exports = {
  target: 'electron-main',
  entry: entry,
  output: output,
  devtool: devtool,
  module: {
    rules: rules
  },
  plugins: plugins,
  devServer: devServer
};

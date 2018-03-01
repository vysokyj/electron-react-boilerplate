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
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './src/index.js',
] : './src/index.js';

var output = dev ? {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/static/' // necessary for HMR
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
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
] : [
];

var devServer = dev ? {
  host: 'localhost',
  port: 3000,
  historyApiFallback: true,
  hot: true,
} : {};

module.exports = {
  //target: 'electron-main',
  entry: entry,
  output: output,
  devtool: devtool,
  module: {
    rules: rules
  },
  plugins: plugins,
  devServer: devServer
};

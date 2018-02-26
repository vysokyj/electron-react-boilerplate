const {app, BrowserWindow} = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;


const dev = (process.env.NODE_ENV != "production");

const mainUrl = dev ? "http://localhost:3000" : url.format({
  pathname: path.join(__dirname, 'index.html'),
  protocol: 'file:',
  slashes: true
});

console.log("Using url: %s", mainUrl);

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800
  });

  mainWindow.loadURL(mainUrl);
});


// Start Webpack development serverr
if (dev) {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const config = require('./webpack.config');
  console.log('Starting the dev web server...');
  const port = 3000;
  const path = require('path');

  const options = {
    publicPath: '/static/',
    hot: true,
    inline: true,
    //contentBase: 'www',
    stats: { colors: true }
  };

  const server = new WebpackDevServer(webpack(config), options);

  server.listen(port, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('WebpackDevServer listening at localhost:', port);
  });
}
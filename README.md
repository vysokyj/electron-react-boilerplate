electron-react-boilerplate
==========================

The minimal dev environment to enable live-editing React components.


### Usage

```
yarn install
yarn start
```

Now edit `src/components/App.js`.  
Your changes will appear without reloading the Electron app.

### Linting

This boilerplate project includes React-friendly ESLint configuration.

```
yarn run lint
```

### Building

A basic production script is included that builds your app to a `dist` folder

```
yarn run build
```

### WebStorm

Because the WebStorm IDE uses "safe writes" by default, Webpack's file-watcher won't recognize file changes, so hot-loading won't work. To fix this, disable "safe write" in WebStorm.

### Dependencies

* React
* Redux
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
// import 'semantic-ui-css/semantic.min.css';
// import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware }  from 'react-router-redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import rootReducer from './reducers';
import { setConfig } from 'react-hot-loader';
import App from './components/App';

setConfig({ logLevel: 'debug' })

const history = createBrowserHistory();
const router = routerMiddleware(history);
const saga = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(router,saga)(createStore);
const store = createStoreWithMiddleware(rootReducer);

saga.run(sagas);

const element = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  element
);


/*
if (module.hot) {
  module.hot.accept();
  
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      element)
  });
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer)
  });
  
}
*/
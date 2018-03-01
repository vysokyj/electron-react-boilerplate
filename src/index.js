// import 'semantic-ui-css/semantic.min.css';
// import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware }  from 'react-router-redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import entitiesReducer from './reducers/entities';
import collectionsReducer from './reducers/collections';
import apiReducer from './reducers/api';
import App from './components/App';

const rootReducer = combineReducers({
  api: apiReducer,
  entities: entitiesReducer,
  collections: collectionsReducer,
  router: routerReducer
});
const history = createBrowserHistory();
const router = routerMiddleware(history);
const saga = createSagaMiddleware();
let store;
if (process.env.NODE_ENV === 'production') {
  const createStoreWithMiddleware = applyMiddleware(router,saga)(createStore);
  store = createStoreWithMiddleware(rootReducer);
} else {
  const createStoreWithMiddleware = applyMiddleware(router,saga)(createStore);
  store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

saga.run(sagas);

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));


// import 'semantic-ui-css/semantic.min.css';
// import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

/* 

import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware }  from 'react-router-redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import entitiesReducer from './reducers/entities';
import collectionsReducer from './reducers/collections';
import apiReducer from './reducers/api';

const rootReducer = combineReducers({
  api: apiReducer,
  entities: entitiesReducer,
  collections: collectionsReducer,
  router: routerReducer
});
const history = createBrowserHistory();
const router = routerMiddleware(history);
const saga = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(router,saga)(createStore);
const store = createStoreWithMiddleware(rootReducer);

saga.run(sagas);

function render() {
  ReactDOM.render(
    <AppContainer>
      <App store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
} 

*/ 

ReactDOM.render(<App />, document.getElementById('root'));
 



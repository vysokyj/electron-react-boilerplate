// import "semantic-ui-css/semantic.min.css";
// import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore} from "redux";
import { routerMiddleware } from "react-router-redux";
import { createHashHistory } from "history";
import createSagaMiddleware from "redux-saga"
import reducers from "./reducers";
import sagas from "./sagas";

import App from "./components/App";

const history = createHashHistory();
const router = routerMiddleware(history);
const saga = createSagaMiddleware();

let store;
if (process.env.NODE_ENV === "production") {
    const createStoreWithMiddleware = applyMiddleware(router, saga)(createStore);
    store = createStoreWithMiddleware(reducers);
} else {
    const createStoreWithMiddleware = applyMiddleware(router, saga)(createStore);
    store = createStoreWithMiddleware(reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

saga.run(sagas);

ReactDOM.render(<App store={store} history={history} />, document.getElementById("root"));

if (module.hot) {
    module.hot.accept("./reducers", () =>
        store.replaceReducer(require("./reducers")) // eslint-disable-line global-require
    );
}




import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import entitiesReducer from "./entities";
import collectionsReducer from "./collections";
import apiReducer from "./api";
import uiReducer from "./ui";

const rootReducer = combineReducers({
    api: apiReducer,
    entities: entitiesReducer,
    collections: collectionsReducer,
    router: routerReducer,
    ui: uiReducer
});

export default rootReducer;
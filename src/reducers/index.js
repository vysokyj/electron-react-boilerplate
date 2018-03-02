import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import entitiesReducer from "./entities";
import collectionsReducer from "./collections";
import apiReducer from "./api";

const rootReducer = combineReducers({
    api: apiReducer,
    entities: entitiesReducer,
    collections: collectionsReducer,
    router: routerReducer
});

export default rootReducer;
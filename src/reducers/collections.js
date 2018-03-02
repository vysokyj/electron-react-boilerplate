import { REST_SUCCESS } from "../constants/ActionTypes";

const defaultState = {};

export default function reducer(state = defaultState, action) {
    if (!action.collection) return state;
    switch (action.type) {
    case REST_SUCCESS:
        let newState = { ...state };
        newState[action.collection] = action.payload.result;
        return newState;
    default:
        return state;
    }
}
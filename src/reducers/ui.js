import {SELECT_COMPUTER_LANGUAGE} from "../constants/ActionTypes";

const defaultState = {
    compouterLanguages: [
        "java",
        "javascript",
        "go"
    ],
    selectedCompouterLanguage: "go"    
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
    case SELECT_COMPUTER_LANGUAGE:
        return {...state, selectedCompouterLanguage: action.payload};
    default:
        return state;
    }
}
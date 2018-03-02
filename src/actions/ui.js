import {SELECT_COMPUTER_LANGUAGE} from "../constants/ActionTypes";

export function selectComputerLanguage(language) {
    return {
        type: SELECT_COMPUTER_LANGUAGE,
        payload: language
    }
}
import {REST_REQUEST} from "../constants/ActionTypes";
import {GET, POST, PUT, DELETE} from "../constants/HttpMethods"

export function getRepositories() {
    return {
        type: REST_REQUEST,
        request: "getRepositories",
        schema: "result",
        method: GET,
        url: "https://api.github.com/search/repositories?q=stars:>=10000+language:go&sort=stars&order=desc"
    }
}
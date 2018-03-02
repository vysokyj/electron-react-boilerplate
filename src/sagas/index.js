import "isomorphic-fetch";
import { takeEvery, select, put } from "redux-saga/effects";
import { denormalize, normalize } from "normalizr";
import {
    REST_REQUEST,
    REST_SUCCESS,
    REST_FAILURE,
} from "../constants/ActionTypes";
import {
    POST,
    PUT,
    PATCH
} from "../constants/HttpMethods"
import * as schemas from "../schemas";

function getSchema(action) {
    if (!action.schema) throw new Error("Schema is missing");
    const s = schemas[action.schema];
    if (!s) throw new Error(`Unable to find schema for entity ${action.schema}`);
    return s;
}

function* onRestRequest(action) {
    let tempId = null;

    try {
        let params = {
            method: action.method,
            headers: {
                "Accept": "application/json"
            }
        };
        if (action.method === POST || action.method === PATCH || action.method === PUT) {
            const state = yield select();
            const payload = denormalize(action.payload, getSchema(action), state.entities);
            if (action.method === POST) {
                tempId = payload.id;
                payload.id = null;
            } // remove temporary id

            const body = JSON.stringify(payload);
            params.headers["Content-Type"] = "application/json";
            params.headers["Content-Length"] = body.length;
            params.body = body;
        }
        const result = yield fetch(action.url, params);
        const json = yield result.json();
        const payload = normalize(json, getSchema(action));
        for (let header of result.headers.entries()) {
            if (header[0].toLowerCase() === "x-offset") payload.offset = parseInt(header[1], 10);
            if (header[0].toLowerCase() === "x-limit") payload.limit = parseInt(header[1], 10);
            if (header[0].toLowerCase() === "x-total-count") payload.totalCount = parseInt(header[1], 10);
        }
        yield put({
            type: REST_SUCCESS,
            request: action.request,
            schema: action.schema,
            collection: action.collection,
            method: action.method,
            url: action.url,
            payload: payload,
            tempId: tempId,
        })
    } catch (error) {
        yield put({
            type: REST_FAILURE,
            request: action.request,
            schema: action.schema,
            method: action.method,
            url: action.url,
            error: error,
            tempId: tempId
        })
    }
}

// use them in parallel
export default function* root() {
    yield takeEvery(REST_REQUEST, onRestRequest);
}

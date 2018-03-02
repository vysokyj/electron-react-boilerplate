import {REST_FAILURE, REST_REQUEST, REST_SUCCESS} from "../constants/ActionTypes";

const defaultState = {
  connections: 0,
  requests: {}
};

function requests(state, action) {
  if (!action.url) return state.requests;
  let requests = {...state.requests};

  const oldRequest = requests[action.request] || {};

  let request = {...oldRequest};
  request.loading = (action.type === REST_REQUEST);
  request.updated = new Date();
  request.method = action.method;
  request.url = action.url;
  if (action.type === REST_SUCCESS) request.result = action.payload.result;
  if (action.type === REST_FAILURE) request.error = action.error;
  if (action.tempId) request.tempId = action.tempId;
  if (action.payload && action.payload.page) request.page = action.payload.page;
  if (action.payload && action.payload.limit) request.limit = action.payload.limit;
  if (action.payload && action.payload.offset) request.offset = action.payload.offset;
  if (action.payload && action.payload.totalCount) request.totalCount = action.payload.totalCount;

  requests[action.request] = request;
  return requests;
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case REST_REQUEST:
    return {
      ...state,
      requests: requests(state, action),
      connections: ++state.connections
    };
  case REST_SUCCESS:
    return {
      ...state,
      requests: requests(state, action),
      connections: --state.connections
    };
  case REST_FAILURE:
    return {
      ...state,
      requests: requests(state, action),
      connections: --state.connections
    };
  default:
    return state;
  }
}

import { REST_SUCCESS } from '../constants/ActionTypes';
import lodash from 'lodash';

const defaultState = {
  transactions: {},
  labels: {}
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
  case REST_SUCCESS:
    return lodash.merge({}, state, action.payload.entities);
  default:
    return state;
  }
}

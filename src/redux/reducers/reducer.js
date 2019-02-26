import { ACTION_TYPE } from '../actions/types';

// Initial State
const initialState = {
  value: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE:
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
}
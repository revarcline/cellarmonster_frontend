import { LOADING_BOTTLES, GET_BOTTLES_SUCCESS, GET_BOTTLES_FAILURE } from '../actions/';

const bottlesReducer = (
  state = { bottles: [], loading: 'idle', resource: '', error: '' },
  action,
) => {
  switch (action.type) {
    case LOADING_BOTTLES:
      return {
        ...state,
        bottles: [...state.bottles],
        loading: 'loading',
      };
    case GET_BOTTLES_SUCCESS:
      return {
        ...state,
        bottles: action.payload.data,
        resource: action.payload.resource,
        loading: 'finished',
      };
    case GET_BOTTLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: 'failed',
      };
    default:
      return state;
  }
};

export default bottlesReducer;

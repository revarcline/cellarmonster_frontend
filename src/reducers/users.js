import { LOADING_USERS, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../actions/';

const usersReducer = (state = { data: [], error: '', loading: 'idle' }, action) => {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        loading: 'loading',
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: 'finished',
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: 'failed',
      };
    default:
      return state;
  }
};

export default usersReducer;

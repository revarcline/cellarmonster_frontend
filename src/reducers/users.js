import { LOADING_USERS, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../actions/';

const usersReducer = (state = { data: {}, error: '', loading: false }, action) => {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default usersReducer;

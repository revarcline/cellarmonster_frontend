import {
  LOADING_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  LOADING_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../actions/';

const usersReducer = (
  state = { users: [], user: {}, error: '', userListLoading: 'idle', userLoading: 'idle' },
  action,
) => {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        userListLoading: 'loading',
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        userListLoading: 'finished',
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        userListLoading: 'failed',
      };
    case LOADING_USER:
      return {
        ...state,
        userLoading: 'loading',
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        userLoading: 'finished',
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        userLoading: 'failed',
      };
    default:
      return state;
  }
};

export default usersReducer;

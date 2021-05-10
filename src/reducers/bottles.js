import {
  LOADING_BOTTLES,
  GET_BOTTLES_SUCCESS,
  GET_BOTTLES_FAILURE,
  POSTING_BOTTLE,
  POST_BOTTLE_SUCCESS,
  POST_BOTTLE_FAILURE,
  PATCHING_BOTTLE,
  PATCH_BOTTLE_SUCCESS,
  PATCH_BOTTLE_FAILURE,
  DELETING_BOTTLE,
  DELETE_BOTTLE_SUCCESS,
  DELETE_BOTTLE_FAILURE,
} from '../actions/';

const bottlesReducer = (
  state = {
    bottles: [],
    bottleLoading: 'idle',
    bottlePosting: 'idle',
    bottlePatching: 'idle',
    bottleDeleting: 'idle',
    resource: '',
    error: '',
  },
  action,
) => {
  switch (action.type) {
    case LOADING_BOTTLES:
      return {
        ...state,
        bottles: [...state.bottles],
        bottleLoading: 'loading',
      };
    case GET_BOTTLES_SUCCESS:
      return {
        ...state,
        bottles: action.payload.data,
        resource: action.payload.resource_name,
        bottleLoading: 'finished',
      };
    case GET_BOTTLES_FAILURE:
      return {
        ...state,
        error: action.payload,
        bottleLoading: 'failed',
      };
    case POSTING_BOTTLE:
      return {
        ...state,
        bottlePosting: 'posting',
      };
    case POST_BOTTLE_SUCCESS:
      return {
        ...state,
        bottlePosting: 'finished',
      };
    case POST_BOTTLE_FAILURE:
      return {
        ...state,
        bottlePosting: 'failed',
      };
    case PATCHING_BOTTLE:
      return {
        ...state,
        bottlePatching: 'patching',
      };
    case PATCH_BOTTLE_SUCCESS:
      return {
        ...state,
        bottlePatching: 'finished',
      };
    case PATCH_BOTTLE_FAILURE:
      return {
        ...state,
        bottlePatching: 'failed',
      };
    case DELETING_BOTTLE:
      return {
        ...state,
        bottleDeleting: 'deleting',
      };
    case DELETE_BOTTLE_SUCCESS:
      return {
        ...state,
        bottleDeleting: 'finished',
      };
    case DELETE_BOTTLE_FAILURE:
      return {
        ...state,
        bottleDeleting: 'failed',
      };
    default:
      return state;
  }
};

export default bottlesReducer;

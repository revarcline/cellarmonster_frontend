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
} from '../actions/';

const bottlesReducer = (
  state = {
    bottles: [],
    bottleLoading: 'idle',
    bottlePosting: 'idle',
    bottlePatching: 'idle',
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
    default:
      return state;
  }
};

export default bottlesReducer;

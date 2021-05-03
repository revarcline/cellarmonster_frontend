import { LOADING_BOTTLES, GET_BOTTLES, CHANGE_BOTTLES } from '../actions/';

const bottlesReducer = (
  state = { bottles: [], loading: false, resource: '', by: 'bottles', query: '' },
  action,
) => {
  switch (action.type) {
    case CHANGE_BOTTLES:
      return {
        ...state,
        by: action.by,
        query: action.query,
      };
    case LOADING_BOTTLES:
      return {
        ...state,
        bottles: [...state.bottles],
        loading: true,
      };
    case GET_BOTTLES:
      return {
        ...state,
        bottles: action.bottles,
        resource: action.resource,
        loading: false,
      };
    default:
      return state;
  }
};

export default bottlesReducer;

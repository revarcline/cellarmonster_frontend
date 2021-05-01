import { LOADING_BOTTLES, GET_BOTTLES } from '.';

const bottlesReducer = (state = { users: [], loading: false }, action) => {
  switch (action.type) {
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
        loading: false,
      };
    default:
      return state;
  }
};

export default bottlesReducer;

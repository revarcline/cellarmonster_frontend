import {
  LOADING_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  POSTING_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILURE,
} from '../actions';

const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ordersReducer;

import {
  LOADING_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  POSTING_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILURE,
} from '../actions';

const ordersReducer = (
  state = { orderLoading: 'idle', orderPosting: 'idle', orders: [], error: '' },
  action,
) => {
  switch (action.type) {
    case LOADING_ORDERS:
      return {
        ...state,
        orderLoading: 'loading',
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.data,
        orderLoading: 'finished',
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        orderLoading: 'failed',
      };
    case POSTING_ORDER:
      return {
        ...state,
        orderPosting: 'posting',
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...action.payload.data, ...state.orders],
        orderPosting: 'finished',
      };
    case POST_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        orderPosting: 'failed',
      };
    default:
      return state;
  }
};

export default ordersReducer;

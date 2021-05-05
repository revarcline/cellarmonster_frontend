import apiRoot from '../apiConfig';
import {
  LOADING_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  POSTING_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILURE,
} from '.';

export const loadingOrders = () => {
  return { type: LOADING_ORDERS };
};

export const getOrdersSuccess = (data) => {
  return { type: GET_ORDERS_SUCCESS, payload: data };
};

export const getOrdersFailure = (error) => {
  return { type: GET_ORDERS_FAILURE, payload: error };
};

export const getOrders = (id = '') => {
  return (dispatch) => {
    dispatch(loadingOrders());
    return fetch(`${apiRoot}/orders${id !== '' ? '/' : ''}${id}`).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getOrdersSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getOrdersSuccess(errors)));
      }
    });
  };
};

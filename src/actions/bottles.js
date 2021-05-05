import apiRoot from '../apiConfig';
import { LOADING_BOTTLES, GET_BOTTLES_SUCCESS, GET_BOTTLES_FAILURE } from '.';

export const loadingBottles = () => {
  return { type: LOADING_BOTTLES };
};

export const getBottlesSuccess = (data) => {
  return { type: GET_BOTTLES_SUCCESS, payload: data };
};

export const getBottlesFailure = (error) => {
  return { type: GET_BOTTLES_FAILURE, payload: error };
};

export const getBottles = (by = 'bottles', query = '') => {
  return (dispatch) => {
    dispatch(loadingBottles());
    // default: /bottles
    // example: /producers/jadot
    return fetch(`${apiRoot}/${by}${query !== '' ? '/' + query : ''}`, {
      method: 'GET',
      headers: {},
    }).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getBottlesSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getBottlesFailure(errors)));
      }
    });
  };
};

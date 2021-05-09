import apiRoot from '../apiConfig';
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

export const postingBottle = () => {
  return { type: POSTING_BOTTLE };
};

export const postBottleSuccess = (data) => {
  return { type: POST_BOTTLE_SUCCESS, payload: data };
};

export const postBottleFailure = (error) => {
  return { type: POST_BOTTLE_FAILURE, payload: error };
};

export const postBottle = (bottle) => {
  return (dispatch) => {
    dispatch(postingBottle());
    return fetch(`${apiRoot}/bottles`, {
      method: 'POST',
      body: JSON.stringify(bottle),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(postBottleSuccess(json)));
      } else {
        return res.json().then((error) => dispatch(postBottleFailure(error)));
      }
    });
  };
};

export const patchingBottle = () => {
  return { type: PATCHING_BOTTLE };
};

export const patchBottleSuccess = (data) => {
  return { type: PATCH_BOTTLE_SUCCESS, payload: data };
};

export const patchBottleFailure = (error) => {
  return { type: PATCH_BOTTLE_FAILURE, payload: error };
};

export const patchBottle = (bottle, id) => {
  return (dispatch) => {
    dispatch(patchingBottle());
    return fetch(`${apiRoot}/bottles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(bottle),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(patchBottleSuccess(json)));
      } else {
        return res.json().then((error) => dispatch(patchBottleFailure(json)));
      }
    });
  };
};

import apiRoot from '../apiConfig';
import { LOADING_BOTTLES, GET_BOTTLES } from '.';

export const getBottles = (by = 'bottles', query = '') => {
  return async (dispatch) => {
    dispatch({ type: LOADING_BOTTLES });
    // default: /bottles
    // example: /producers/jadot
    return fetch(`${apiRoot}/${by}${query !== '' ? '/' + query : ''}`, {
      method: 'GET',
      headers: {},
    }).then((res) => {
      if (res.ok) {
        return res.json().then((json) =>
          dispatch({
            type: GET_BOTTLES,
            payload: {
              bottles: json.data,
              resource: json.resource_name,
            },
          }),
        );
      } else {
        return res.json().then((errors) => {
          return Promise.reject(errors);
        });
      }
    });
  };
};

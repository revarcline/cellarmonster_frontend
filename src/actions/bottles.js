import apiRoot from '../apiConfig';
import { LOADING_BOTTLES, GET_BOTTLES, CHANGE_BOTTLES } from '.';
import store from '../store';

export const getBottles = () => {
  const by = store.getState().bottles.by;
  const query = store.getState().bottles.query;
  return (dispatch) => {
    dispatch({ type: LOADING_BOTTLES });
    // default: /bottles
    // example: /producers/jadot
    return fetch(`${apiRoot}/${by}${query !== '' ? '/' + query : ''}`, {
      method: 'GET',
      headers: {},
    }).then((res) => {
      if (res.ok) {
        return res
          .json()
          .then((json) =>
            dispatch({ type: GET_BOTTLES, bottles: json.data, resource: json.resource_name }),
          );
      } else {
        return res.json().then((errors) => {
          return Promise.reject(errors);
        });
      }
    });
  };
};

export const changeBottles = (by, query) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_BOTTLES, by: by, query: query });
  };
};

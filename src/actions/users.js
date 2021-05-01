import apiRoot from '../apiConfig';
import { LOADING_USERS, GET_USERS } from '.';

// get user list for login splash and admin user edit
export const getUsers = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_USERS });
    return fetch(`${apiRoot}/users`, {
      method: 'GET',
      headers: {},
    }).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch({ type: GET_USERS, users: json.data }));
      } else {
        return res.json().then((errors) => {
          return Promise.reject(errors);
        });
      }
    });
  };
};

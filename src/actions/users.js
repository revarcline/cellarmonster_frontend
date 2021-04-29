import { LOADING_USERS, ADD_USERS } from '.';

// get user list for login splash and admin user edit
export const getUsers = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_USERS });
    return fetch(`${apiRoot}/users`, {
      method: 'GET',
      headers: {},
    }).then((res) => {
      if (res.ok) {
        return res.json().then((users) => dispatch({ type: ADD_USERS, users: users }));
      } else {
        return res.json().then((errors) => {
          return Promise.reject(errors);
        });
      }
    });
  };
};
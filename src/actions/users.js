import apiRoot from '../apiConfig';
import {
  LOADING_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  LOADING_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '.';

export const loadingUsers = () => {
  return { type: LOADING_USERS };
};

export const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: data,
  };
};

export const getUsersFailure = (error) => {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
};

// get user list for login splash and admin user edit
export const getUsers = () => {
  return (dispatch) => {
    dispatch(loadingUsers());
    return fetch(`${apiRoot}/users`).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getUsersSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getUsersFailure(errors)));
      }
    });
  };
};
export const loadingUser = () => {
  return { type: LOADING_USER };
};

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data,
  };
};

export const getUserFailure = (error) => {
  return {
    type: GET_USER_FAILURE,
    payload: error,
  };
};

// get user list for login splash and admin user edit
export const getUser = (id) => {
  return (dispatch) => {
    dispatch(loadingUser());
    return fetch(`${apiRoot}/users/${id}`).then((res) => {
      if (res.ok) {
        return res.json().then((json) => dispatch(getUserSuccess(json)));
      } else {
        return res.json().then((errors) => dispatch(getUserFailure(errors)));
      }
    });
  };
};

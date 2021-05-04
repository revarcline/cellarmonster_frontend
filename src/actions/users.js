import apiRoot from '../apiConfig';
import { LOADING_USERS, GET_USERS_SUCCESS, GET_USERS_FAILURE } from '.';

export const loadingUsers = () => {
  return { type: LOADING_USERS };
};

export const getUsersSuccess = (data) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getUsersFailure = (error) => {
  return {
    type: GET_USERS_FAILURE,
    payload: {
      error,
    },
  };
};

// get user list for login splash and admin user edit
export const getUsers = () => {
  return async (dispatch) => {
    dispatch(loadingUsers());
    //try {
    const res = await fetch(`${apiRoot}/users`);
    const data = await res.json();
    dispatch(getUsersSuccess(data));
    //} catch (err) {
    //dispatch(getUsersFailure(err.message));
    //}
  };
};

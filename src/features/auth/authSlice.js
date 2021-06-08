import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  signup: { status: 'idle' },
  update: { status: 'idle' },
  authentication: {
    authChecked: false,
    loggedInloggedIn: false,
    currentUser: {},
    status: 'idle',
  },
};

const setToken = (token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime());
};

const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem('lastLoginTime');
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem('token');
  }
};

//setToken(response.headers.get('Authorization'));

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials) => await userAPI.signupUser(credentials),
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (credentials) => await userAPI.updateUser(credentials),
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => await userAPI.loginUser(credentials),
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => await userAPI.logoutUser(),
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (token) => await userAPI.checkAuth(getToken()),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // might do token stuff here? no!
    // all my damn reducers are async! deal with it scrubs
  },
  extraReducers: {
    // signup
    [signupUser.pending]: (state, action) => {
      state.signup = {
        ...state.signup,
        status: 'loading',
      };
    },
    [signupUser.fulfilled]: (state, action) => {
      state.signup = {
        ...state.signup,
        status: 'finished',
      };
    },
    [signupUser.rejected]: (state, action) => {
      state.signup = {
        ...state.signup,
        status: 'failed',
      };
    },

    // update
    [updateUser.pending]: (state, action) => {
      state.update = {
        ...state.update,
        status: 'loading',
      };
    },
    [updateUser.fulfilled]: (state, action) => {
      state.update = {
        ...state.update,
        status: 'finished',
      };
    },
    [updateUser.rejected]: (state, action) => {
      state.update = {
        ...state.update,
        status: 'failed',
      };
    },

    // login
    [loginUser.pending]: (state, action) => {
      state.authentication = {
        ...state.authentication,
        status: 'loading',
      };
    },
    [loginUser.fulfilled]: (state, action) => {
      setToken(action.payload.headers['Authorization']);
      state.authentication = {
        ...state.authentication,
        authChecked: true,
        loggedIn: true,
        currentUser: action.payload.pending,
        status: 'finished',
      };
    },
    [loginUser.rejected]: (state, action) => {
      state.authentication = {
        ...state.authentication,
        authChecked: true,
        loggedIn: false,
        currentUser: {},
        status: 'failed',
      };
    },

    //logout
    [logoutUser.pending]: (state, action) => {
      state.authentication = {
        ...state.authentication,
        status: 'loading',
      };
    },
    [logoutUser.fulfilled]: (state, action) => {
      setToken(action.payload.headers.get('Authorization'));
      state.authentication = {
        ...state.authentication,
        authChecked: false,
        loggedIn: false,
        currentUser: {},
        status: 'finished',
      };
    },

    [logoutUser.rejected]: (state, action) => {
      state.authentication = {
        ...state.authentication,
        status: 'failed',
      };
    },

    // checkAuth
    [checkAuth.pending]: (state, action) => {
      state.authentication = {
        ...state.authentication,
        status: 'loading',
      };
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.authentication = {
        ...state.authentication,
        authChecked: true,
        loggedInloggedIn: true,
        currentUser: action.payload,
        status: 'finished',
      };
    },
    [checkAuth.rejected]: (state, action) => {
      state.authentication = {
        ...state.authentication,
        authChecked: true,
        loggedIn: false,
        currentUser: {},
        status: 'failed',
      };
    },
  },
});

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  userList: { data: [], status: 'idle' },
  user: { data: {}, status: 'idle' },
};

export const getUsers = createAsyncThunk('users/getUsers', async () => await userAPI.getUsers());

export const getUser = createAsyncThunk('users/getUser', async (id) => await userAPI.getUser(id));

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // yee
  },
  extraReducers: {
    //users
    [getUsers.pending]: (state, action) => {
      state.userList = {
        ...state.userList,
        status: 'loading',
      };
    },
    [getUsers.fulfilled]: (state, action) => {
      state.userList = {
        ...state.userList,
        status: 'finished',
        data: action.payload.data,
      };
    },
    [getUsers.rejected]: (state, action) => {
      state.userList = {
        ...state.userList,
        status: 'failed',
        error: action.payload,
      };
    },

    //user
    [getUser.pending]: (state, action) => {
      state.user = {
        ...state.user,
        status: 'loading',
      };
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = {
        ...state.user,
        status: 'finished',
        data: action.payload.data,
      };
    },
    [getUser.rejected]: (state, action) => {
      state.user = {
        ...state.user,
        status: 'failed',
        error: action.payload,
      };
    },
  },
});

export default userSlice.reducer;

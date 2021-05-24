import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  bottleList: { status: 'idle', error: null },
  bottlePost: { status: 'idle', error: null },
  bottlePatch: { status: 'idle', error: null },
  bottleDelete: { status: 'idle', error: null },
};

export const getBottles = createAsyncThunk('bottles/getBottles', async ({ by, term }) => {
  if (!term) {
    return await userAPI.getAllBottles();
  } else if (by === 'bottle') {
    return await userAPI.getBottlesBy('bottles', term);
  } else {
    return await userAPI.getBottlesBy(by, term);
  }
});

export const postBottle = createAsyncThunk(
  'bottles/postBottle',
  async (data) => await userAPI.postBottle(data),
);

export const patchBottle = createAsyncThunk(
  'bottles/patchBottle',
  async ({ data, id }) => await userAPI.postBottle(data, id),
);

const bottleSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    // non async logic goes here
    // tho tbf i don't think there's any
  },
  extraReducers: {
    [getBottles.pending]: (state, action) => {
      state.bottleList = {
        ...state.bottleList,
        status: 'loading',
      };
    },
    [getBottles.fulfilled]: (state, action) => {
      state.bottleList = {
        ...state.bottleList,
        status: 'finished',
        data: action.payload.data,
        resource: action.payload.resource_name,
      };
    },
    [getBottles.rejected]: (state, action) => {
      state.bottleList = {
        ...state.bottleList,
        status: 'failed',
        error: action.payload,
      };
    },
    [postBottle.pending]: (state, action) => {
      state.bottlePost = {
        ...state.bottlePost,
        status: 'posting',
      };
    },
    [postBottle.fulfilled]: (state, action) => {
      state.bottlePost = {
        ...state.bottlePost,
        bottle: action.payload.data,
        status: 'finished',
      };
    },
    [postBottle.rejected]: (state, action) => {
      state.bottlePost = {
        ...state.bottlePost,
        error: action.payload,
        status: 'failed',
      };
    },
  },
});

export default bottleSlice.reducer;

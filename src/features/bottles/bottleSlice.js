import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  bottleList: { bottles: [], status: 'idle', error: null, resource: null },
  bottlePost: { bottle: {}, status: 'idle', error: null },
  bottlePatch: { bottle: {}, status: 'idle', error: null },
  bottleDelete: { status: 'idle', error: null },
};

export const getBottles = createAsyncThunk('bottles/getBottles', async ({ by, term }) => {
  if (!term) {
    return await userAPI.getAllBottles();
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
  name: 'bottleList',
  initialState,
  reducers: {
    // non async logic go here
  },
  extraReducers: {
    [getBottles.pending]: (state, action) => {
      state.bottleList = {
        ...state.bottleList,
        status: 'loading',
        resouce: null,
      };
    },
    [getBottles.fulfilled]: (state, action) => {
      state.bottleList = {
        ...state.bottleList,
        status: 'finished',
        data: action.payload.data,
        resource: action.payload.resouce_name,
      };
    },
    [getBottles.rejected]: (state, action) => {
      state.bottleList = {
        ...state.bottleList,
        status: 'failed',
        error: action.payload,
        resouce: null,
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

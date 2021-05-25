import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  bottleList: { status: 'idle' },
  bottlePost: { status: 'idle' },
  bottlePatch: { status: 'idle' },
  bottleDelete: { status: 'idle' },
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

export const deleteBottle = createAsyncThunk(
  'bottles/deleteBottle',
  async (id) => await userAPI.deleteBottle(id),
);

const bottleSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    // non async logic goes here
    // tho tbf i don't think there's any
  },
  extraReducers: {
    //READ
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

    //CREATE
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

    //UPDATE
    [patchBottle.pending]: (state, action) => {
      state.bottlePatch = {
        ...state.bottlePatch,
        status: 'updating',
      };
    },
    [patchBottle.fulfilled]: (state, action) => {
      state.bottlePost = {
        ...state.bottlePatch,
        bottle: action.payload.data,
        status: 'finished',
      };
    },
    [patchBottle.rejected]: (state, action) => {
      state.bottlePatch = {
        ...state.bottlePatch,
        error: action.payload,
        status: 'failed',
      };
    },

    //DELETE
    [deleteBottle.pending]: (state, action) => {
      state.bottleDelete = {
        ...state.bottleDelete,
        status: 'deleting',
      };
    },
    [deleteBottle.fulfilled]: (state, action) => {
      state.bottleDelete = {
        ...state.bottleDelete,
        bottle: action.payload.data,
        status: 'finished',
      };
    },
    [deleteBottle.rejected]: (state, action) => {
      state.bottleDelete = {
        ...state.bottleDelete,
        error: action.payload,
        status: 'failed',
      };
    },
  },
});

export default bottleSlice.reducer;

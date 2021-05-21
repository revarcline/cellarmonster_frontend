import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { bottles: [], loading: 'idle', error: null };

export const getBottles = createAsyncThunk('bottles/getBottles', async (resource, query) => {
  if (!resource || !query) {
    await userAPI.getAllBottles();
  } else {
    await userAPI.getBottlesBy(resource, query);
  }
});

const bottleSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    // non async logic go here
  },
  extraReducers: {
    [getBottles.pending]: (state, action) => {
      state.bottles = {
        status: 'loading',
        data: {},
        error: {},
      };
    },
    [getBottles.fulfilled]: (state, action) => {
      state.bottles = {
        status: 'finished',
        data: action.payload,
        error: {},
      };
    },
    [getBottles.fulfilled]: (state, action) => {
      state.bottles = {
        status: 'finished',
        data: {},
        error: action.payload,
      };
    },
  },
});

export default bottleSlice.reducer;

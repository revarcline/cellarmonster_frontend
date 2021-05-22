import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = { bottleList: { bottles: [], status: 'idle', error: null, resource: null } };

export const getBottles = createAsyncThunk('bottles/getBottles', async ({ by, term }) => {
  console.log(by);
  console.log(term);
  if (!term) {
    return await userAPI.getAllBottles();
  } else {
    return await userAPI.getBottlesBy(by, term);
  }
});

const bottleSlice = createSlice({
  name: 'bottleList',
  initialState,
  reducers: {
    // non async logic go here
  },
  extraReducers: {
    [getBottles.pending]: (state, action) => {
      state.bottleList = {
        status: 'loading',
        data: {},
        error: {},
        resouce: null,
      };
    },
    [getBottles.fulfilled]: (state, action) => {
      state.bottleList = {
        status: 'finished',
        data: action.payload.data,
        error: {},
        resource: action.payload.resouce_name,
      };
    },
    [getBottles.rejected]: (state, action) => {
      state.bottleList = {
        status: 'failed',
        data: {},
        error: action.payload,
        resouce: null,
      };
    },
  },
});

export default bottleSlice.reducer;

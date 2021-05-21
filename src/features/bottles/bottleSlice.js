import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRoot from '../../apiConfig';
const axios = require('axios');

const initialState = { bottles: [], loading: 'idle', error: null };

export const getBottles = createAsyncThunk('bottles/getBottles', async (resource, query) => {
  let params;
  if (query === '') {
    params = 'bottles';
  } else {
    params = `${resource}/${query}`;
  }
  axios
    .get(`${apiRoot}/${params}`)
    .then((response) => response.data)
    .catch((error) => error);
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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRoot from '../../apiConfig';

const initialState = [];

export const fetchBottles = createAsyncThunk('bottles/fetchBottles', async (resource, query) => {
  let params;
  if (query === '') {
    params = 'bottles';
  } else {
    params = `${resource}/${query}`;
  }
  const res = await client.get(`${apiRoot}/${params}`);
  return res.bottles;
});

const bottleSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    loadingBottles(state, action) {
      return {
        ...state,
        bottleLoading: 'loading',
      };
    },
  },
});

export default bottleSlice.reducer;

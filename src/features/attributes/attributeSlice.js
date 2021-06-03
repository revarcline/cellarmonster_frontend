import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  countries: { status: 'idle' },
  producers: { status: 'idle' },
  varietals: { status: 'idle' },
  bins: { status: 'idle' },
};

export const getCountries = createAsyncThunk(
  'attributes/getCountries',
  async () => await userAPI.getCountries(),
);

export const getVarietals = createAsyncThunk(
  'attributes/getVarietals',
  async () => await userAPI.getVarietals(),
);

export const getProducers = createAsyncThunk(
  'attributes/getProducers',
  async () => await userAPI.getProducers(),
);

export const getBins = createAsyncThunk('attributes/getBins', async () => await userAPI.getBins());

const attributeSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {
    // any non-async logic? feh
  },
  extraReducers: {
    // countries
    [getCountries.pending]: (state, action) => {
      state.countries = {
        ...state.countries,
        status: 'loading',
      };
    },
    [getCountries.fulfilled]: (state, action) => {
      state.countries = {
        ...state.countries,
        status: 'finished',
        data: action.payload.data,
      };
    },
    [getCountries.rejected]: (state, action) => {
      state.countries = {
        ...state.countries,
        status: 'failed',
        error: action.payload,
      };
    },

    // varietals
    [getVarietals.pending]: (state, action) => {
      state.varietals = {
        ...state.varietals,
        status: 'loading',
      };
    },
    [getVarietals.fulfilled]: (state, action) => {
      state.varietals = {
        ...state.varietals,
        status: 'finished',
        data: action.payload.data,
      };
    },
    [getVarietals.rejected]: (state, action) => {
      state.varietals = {
        ...state.varietals,
        status: 'failed',
        error: action.payload,
      };
    },

    // producers
    [getProducers.pending]: (state, action) => {
      state.producers = {
        ...state.producers,
        status: 'loading',
      };
    },
    [getProducers.fulfilled]: (state, action) => {
      state.producers = {
        ...state.producers,
        status: 'finished',
        data: action.payload.data,
      };
    },
    [getProducers.rejected]: (state, action) => {
      state.producers = {
        ...state.producers,
        status: 'failed',
        error: action.payload,
      };
    },

    // bins
    [getBins.pending]: (state, action) => {
      state.bins = {
        ...state.bins,
        status: 'loading',
      };
    },
    [getBins.fulfilled]: (state, action) => {
      state.bins = {
        ...state.bins,
        status: 'finished',
        data: action.payload.data,
      };
    },
    [getBins.rejected]: (state, action) => {
      state.bins = {
        ...state.bins,
        status: 'failed',
        error: action.payload,
      };
    },
  },
});

export default attributeSlice.reducer;

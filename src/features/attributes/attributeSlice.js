import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  countryList: { status: 'idle' },
  producerList: { status: 'idle' },
  varietalList: { status: 'idle' },
  binList: { status: 'idle' },
};

export const getAttributes = createAsyncThunk('attributes/getAttributes', async () => {
  // all dispatches
});

export const getCountries = createAsyncThunk(
  'attributes/getCountries',
  async () => await userAPI.getCountries(),
);

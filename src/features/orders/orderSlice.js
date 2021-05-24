import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  orderList: { data: [], status: 'idle', error: null },
  orderPost: { order: {}, status: 'idle', error: null },
};

export const getOrders = createAsyncThunk('orders/getOrders', async (user) => {
  if (!user) {
    return await userAPI.getAllOrders();
  } else {
    return await userAPI.getUserOrders(user);
  }
});

export const postOrder = createAsyncThunk(
  'orders/postOrder',
  async (data) => await userAPI.postOrder(id),
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // should i move some logic here? no
  },
  extraReducers: {
    [getOrders.pending]: (state, action) => {
      state.orderList = {
        ...state.orderList,
        status: 'loading',
      };
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orderList = {
        ...state.orderList,
        status: 'finished',
        data: action.payload.data,
      };
    },
    [getOrders.rejected]: (state, action) => {
      state.orderList = {
        ...state.orderList,
        status: 'failed',
        error: action.payload,
      };
    },
  },
});

export default orderSlice.reducer;

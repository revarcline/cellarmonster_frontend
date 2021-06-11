import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../userAPI';

const initialState = {
  orderList: { data: [], status: 'idle', error: null },
  orderPost: { data: {}, status: 'idle', error: null },
};

export const getOrders = createAsyncThunk('orders/getOrders', async (userId) => {
  if (!userId) {
    return await userAPI.getAllOrders();
  } else {
    return await userAPI.getUserOrders(userId);
  }
});

export const postOrder = createAsyncThunk(
  'orders/postOrder',
  async (data) => await userAPI.postOrder(data),
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // should i move some logic here? no
  },
  extraReducers: {
    //READ
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

    //CREATE
    [postOrder.pending]: (state, action) => {
      state.orderPost = {
        ...state.orderPost,
        status: 'loading',
      };
    },
    [postOrder.fulfilled]: (state, action) => {
      state.orderPost = {
        ...state.orderPost,
        data: action.payload.data,
        status: 'finished',
      };

      let newList = [state.orderPost.data, ...state.orderList.data];
      state.orderList = {
        ...state.orderList,
        data: newList,
      };
    },
    [postOrder.rejected]: (state, action) => {
      state.orderPost = {
        ...state.orderPost,
        status: 'failed',
        error: action.payload,
      };
    },
  },
});

export default orderSlice.reducer;

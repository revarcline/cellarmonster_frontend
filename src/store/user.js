import { createSlice } from '@reduxjs/toolkit';

//Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
  },
});

export default slice.reducer;

// Actions
const { loginSuccess, logoutSuccess } = slice.actions;
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const res = await api.post('/login', { email, password });
  } catch (e) {
    return console.error(e.message);
  }
};

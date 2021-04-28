import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  // root reducer !
});

const store = configureStore({ reducer });

export default store;

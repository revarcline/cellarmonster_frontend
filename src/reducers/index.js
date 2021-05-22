import { combineReducers } from 'redux';
import authReducer from './auth';
//import bottlesReducer from './bottles';
import bottleSlice from '../features/bottles/bottleSlice';
import usersReducer from './users';
import ordersReducer from './orders';
import attributesReducer from './attributes';

export default combineReducers({
  auth: authReducer,
  usersList: usersReducer,
  bottles: bottleSlice.reducer,
  orders: ordersReducer,
  attributes: attributesReducer,
});

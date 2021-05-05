import { combineReducers } from 'redux';
import authReducer from './auth';
import bottlesReducer from './bottles';
import usersReducer from './users';
import ordersReducer from './orders';

export default combineReducers({
  auth: authReducer,
  usersList: usersReducer,
  bottles: bottlesReducer,
  orders: ordersReducer,
});

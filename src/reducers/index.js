import { combineReducers } from 'redux';
import authReducer from './auth';
import bottlesReducer from './bottles';
import usersReducer from './users';

export default combineReducers({
  auth: authReducer,
  usersList: usersReducer,
  bottles: bottlesReducer,
  //orders: ordersReducer,
});

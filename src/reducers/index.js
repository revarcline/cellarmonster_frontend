import { combineReducers } from 'redux';
//import authReducer from './auth';
import authReducer from '../features/auth/authSlice';
import bottleReducer from '../features/bottles/bottleSlice';
import usersReducer from '../features/users/userSlice';
import orderReducer from '../features/orders/orderSlice';
import attributesReducer from '../features/attributes/attributeSlice';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  bottles: bottleReducer,
  orders: orderReducer,
  attributes: attributesReducer,
});

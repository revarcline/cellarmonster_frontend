import { combineReducers } from 'redux';
import authReducer from './auth';
//import bottlesReducer from './bottles';
import bottleReducer from '../features/bottles/bottleSlice';
import usersReducer from './users';
//import ordersReducer from './orders';
import orderReducer from '../features/orders/orderSlice';
//import attributesReducer from './attributes';
import attributesReducer from '../features/attributes/attributeSlice';

export default combineReducers({
  auth: authReducer,
  usersList: usersReducer,
  bottles: bottleReducer,
  orders: orderReducer,
  attributes: attributesReducer,
});

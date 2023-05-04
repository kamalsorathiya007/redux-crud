import { combineReducers } from 'redux';
import { productReducer } from './products/reducers';

export const rootReducer = combineReducers({
  data: productReducer,
});

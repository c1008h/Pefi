import { combineReducers } from 'redux';
import financeReducer from './financeReducer';

const rootReducer = combineReducers({
  finance: financeReducer,
  // Add other reducers here
});

export default rootReducer;
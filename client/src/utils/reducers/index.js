import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import your individual reducers
// import accountReducer from './accountReducer';
// import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  user: userReducer, 
  // accounts: accountReducer,
  // transactions: transactionReducer,
});

export default rootReducer;

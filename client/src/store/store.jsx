// store.js
import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './reducers/expensesReducer';
import incomeReducer from './reducers/incomeReducer';
import financeGroupReducer from './reducers/financeGroupReducer';

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    income: incomeReducer,
    financeGroup: financeGroupReducer,
  },
});

export default store;

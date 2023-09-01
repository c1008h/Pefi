import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import financeReducer from './slices/financeSlice';
import userReducer from './slices/userSlicer'
import goalReducer from './slices/goalSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: financeReducer,
    user: userReducer,
    goal: goalReducer
  },
});

export default store;

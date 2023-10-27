import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import transactionReducer from './features/transactions/transactionSlice'
import networthReducer from './features/networth/networthSlice'
import profileReducer from './features/profile/profileSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        networth: networthReducer,
        transactions: transactionReducer,
    }
})

export default store;
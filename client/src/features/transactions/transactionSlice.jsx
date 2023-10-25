import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        networth: null,
        cash: null,
        digital: null,
        saved: null,
        invested: null
    },
    reducers: {
        addIncome: (state, action) => {
            state.income += action.payload
        },
        addExpense: (state, action) => {
            state.expense -= action.payload
        },
        deleteIncome: (state, action) => {
            state.income -= action.payload
        },
        deleteExpense: (state, action) => {
            state.expense += action.payload
        }
    }
})

export const { addIncome, addExpense, deleteExpense, deleteIncome } = transactionSlice.actions;

export default transactionSlice.reducer;

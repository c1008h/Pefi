import { createSlice } from '@reduxjs/toolkit';

const financeSlice = createSlice({
  name: 'finance',
  initialState: {
    expenses: [],
    incomes: [],
    cash: 0,
    digital: 0,
    invested: 0,
    saved: 0,
    networth: 0,
  },
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setIncomes: (state, action) => {
      state.incomes = action.payload;
    },
    updateCash: (state, action) => {
        state.cash = action.payload;
    },
    updateDigital: (state, action) => {
        state.digital = action.payload;
    },
    updateInvested: (state, action) => {
        state.invested = action.payload;
    },
    updateSaved: (state, action) => {
        state.saved = action.payload;
    },
    updateNetworth: (state) => {
        const cashValue = state.cash;
        const digitalValue = state.digital;
        const investedValue = state.invested;
        const savedValue = state.saved;

        const networth = parseFloat(cashValue) + parseFloat(digitalValue) + parseFloat(investedValue) + parseFloat(savedValue)

        state.networth = networth;
    }

  },
});

export const { 
    setExpenses, 
    setIncomes,
    updateCash,
    updateDigital,
    updateInvested,
    updateSaved,
    updateNetworth 
} = financeSlice.actions;

export default financeSlice.reducer;
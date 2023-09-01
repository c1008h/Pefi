import { createSlice } from '@reduxjs/toolkit';

const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    goals: [],
    year: null,
    cash: 0,
    digital: 0,
    invested: 0,
    saved: 0,
    networth: 0,
  },
  reducers: {
    setGoal: (state, action) => {
      state.goals = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
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
    setGoal, 
    setYear,
    updateCash,
    updateDigital,
    updateInvested,
    updateSaved,
    updateNetworth 
} = goalSlice.actions;

export default goalSlice.reducer;
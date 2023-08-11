import { createSlice } from '@reduxjs/toolkit';

const incomeSlice = createSlice({
  name: 'income',
  initialState: [],
  reducers: {
    addIncome: (state, action) => {
      state.push(action.payload);
    },
    removeIncome: (state, action) => {
      return state.filter(income => income._id !== action.payload);
    },
  },
});

export const { addIncome, removeIncome } = incomeSlice.actions;
export default incomeSlice.reducer;

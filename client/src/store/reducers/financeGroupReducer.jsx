// financeGroupReducer.js
import { createSlice } from '@reduxjs/toolkit';

const financeGroupSlice = createSlice({
  name: 'financeGroup',
  initialState: {
    digital: 0,
    cash: 0,
    invested: 0,
    saved: 0,
  },
  reducers: {
    updateFinanceGroup: (state, action) => {
      // You might need to calculate the new values based on your app logic here
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFinanceGroup } = financeGroupSlice.actions;
export default financeGroupSlice.reducer;

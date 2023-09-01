import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    gender: null,
    incomeLevel: null,
    birthday: null

  },
  reducers: {
    setUserId: (state, action) => {
      state._id = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLocation: (state, action) => {
        state.location = action.payload;
    },
    setGender: (state, action) => {
        state.gender = action.payload;
    },
    setIncomeLevel: (state, action) => {
        state.incomeLevel = action.payload;
    },
    setBirthday: (state, action) => {
        state.birthday = action.payload;
    },
  },
});

export const { 
    setUserId, 
    setFirstName, 
    setLastName, 
    setEmail,
    setLocation,
    setGender,
    setIncomeLevel,
    setBirthday
} = userSlice.actions;

export default userSlice.reducer;
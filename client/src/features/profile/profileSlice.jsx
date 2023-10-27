import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        userProfile: null

    },
    reducers: {
        createProfile: (state, action) => {
            state.userProfile = action.payload
        },
        deleteProfile: (state) => {
            state.userProfile = null;
        }
    }
})

export const { createProfile, deleteProfile } = profileSlice.actions;

export default profileSlice.reducer;

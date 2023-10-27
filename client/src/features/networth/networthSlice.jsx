import { createSlice } from '@reduxjs/toolkit'

export const networthSlice = createSlice({
    name: 'networth',
    initialState: {
        networth: null,
        cash: null,
        digital: null,
        saved: null,
        invested: null
    },
    reducers: {
        addCash: (state, action) => {
            state.cash += action.payload,
            state.networth = calculateNetworth(state);
        },
        addDigital: (state, action) => {
            state.digital += action.payload,
            state.networth = calculateNetworth(state);
        },
        addSaved: (state, action) => {
            state.saved += action.payload,
            state.networth = calculateNetworth(state);
        },
        addInvested: (state, action) => {
            state.invested += action.payload,
            state.networth = calculateNetworth(state);
        },
        removeCash: (state, action) => {
            state.cash -= action.payload,
            state.networth = calculateNetworth(state);
        },
        removeDigital: (state, action) => {
            state.digital -= action.payload,
            state.networth = calculateNetworth(state);
        },
        removeSaved: (state, action) => {
            state.saved -= action.payload,
            state.networth = calculateNetworth(state);
        },
        removeInvested: (state, action) => {
            state.invested -= action.payload,
            state.networth = calculateNetworth(state);
        }
    }
})

const calculateNetworth = (state) => {
    return (state.cash || 0) + (state.digital || 0) + (state.saved || 0) + (state.invested || 0);
};

export const { 
    addCash, 
    addDigital, 
    addSaved, 
    addInvested, 
    removeCash, 
    removeDigital, 
    removeSaved, 
    removeInvested
} = networthSlice.actions;

export default networthSlice.reducer;

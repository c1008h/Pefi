// import { ADD_INCOME, DECREASE_INCOME } from '../actions/types';

const initialState = {
    isAuthenticated: true,
    user: null,
    settings: {},
};
  
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // case ADD_INCOME:
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         user: action.payload,
        //     };
        // case DECREASE_INCOME:
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         user: null,
        //     };
        default:
            return state;
    }
};

export default userReducer;
  
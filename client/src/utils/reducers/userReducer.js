// import { LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: null,
    settings: {},
};
  
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         user: action.payload,
        //     };
        // case LOGOUT:
        //     return {
        //         ...state,
        //         isAuthenticated: false,
        //         user: null,
        //     };
        default:
            return state;
    }
};

export default userReducer;
  
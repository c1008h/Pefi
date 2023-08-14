import { isAction } from '@reduxjs/toolkit';
import { 
    ADD_INCOME,
    DELETE_INCOME,
    ADD_EXPENSE,
    DELETE_EXPENSE,
    UPDATE_FINANCE  
} from './actions';

const initialState = {
    expenses: [],
    incomes: [],
    cash: 0,
    digital: 0,
    saved: 0,
    invested: 0
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INCOME:
            return {
                ...state,
                incomes: [...action.incomes]
            }
        case DELETE_INCOME:
            let newIncomeState = state.incomes.filter(income => {
                return income._id !== action._id;
            })
            return {
                ...state,
                incomes: newIncomeState
            }
        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [...action.expenses]
            }
        case DELETE_EXPENSE:
            let newExpenseState = state.expenses.filter(expense => {
                return expense._id!== action._id;
            })
            return {
                ...state,
                expenses: newExpenseState
            }
        case UPDATE_FINANCE:
            return {
                ...state,
                
            }

    }
}
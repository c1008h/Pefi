import { gql } from '@apollo/client';

export const ADD_EXPENSE = gql`
  mutation addExpense($input: ExpenseInput!) {
    addExpense(input: $input) {
        id
        userId
        amount
        frequency
        category
        type
        date
        note
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: ID!, $input: ExpenseInput!) {
    updateExpense(id: $id, input: $input) {
        id
        userId
        amount
        frequency
        category
        type
        date
        note
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id) {
        id
        userId
        amount
        frequency
        category
        type
        date
        note
    }
  }
`;

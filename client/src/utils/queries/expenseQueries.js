import { gql } from '@apollo/client';

export const QUERY_ALL_EXPENSES = gql`
  query QUERY_ALL_EXPENSES ($userId: ID!) {
    getAllExpenses(userId: $id) {
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

export const QUERY_EXPENSE_BY_YEAR = gql`
  query QUERY_EXPENSE_BY_YEAR ($userId: ID!, $year: Float) {
    getExpenseByYear(userId: $userId, year: $year) {
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
`
export const QUERY_EXPENSE_BY_MONTH = gql`
  query QUERY_EXPENSE_BY_MONTH ($userId: ID!, $year: Float, $month: Float) {
    getExpenseByMonth(userId: $userId, year: $year, month: $month) {
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
`

export const QUERY_EXPENSE_BY_DAY = gql`
  query QUERY_EXPENSE_BY_DAY ($userId: ID!, $year: Float, $month: Float, $day: Float) {
    getExpenseByDay(userId: $userId, year: $year, month: $month, day: $day) {
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
`

export const QUERY_EXPENSE_BY_ID = gql`
  query QUERY_EXPENSE_BY_ID ($id: ID!, $userId: ID!) {
    getExpenseById(id: $id, userId: $id) {
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
`
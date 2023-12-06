import { gql } from '@apollo/client';

export const QUERY_INCOME_BY_ID = gql`
  query QUERY_INCOME_BY_ID ($id: ID!, $userId: ID!) {
    getIncomeById (id: $id, userId: $userId) {
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

export const QUERY_INCOME_BY_YEAR = gql`
  query QUERY_INCOME_BY_YEAR ($id: ID!, $userId: ID!, $year: Float) {
    getIncomeByYear (id: $id, userId: $userId, year: $year) {
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

export const QUERY_INCOME_BY_MONTH = gql`
  query QUERY_INCOME_BY_MONTH ($id: ID!, $userId: ID!, $year: Float, $month: Float) {
    getIncomeByMonth (id: $id, userId: $userId, year: $year, month: $month) {
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

export const QUERY_INCOME_BY_DAY = gql`
  query QUERY_INCOME_BY_DAY ($id: ID!, $userId: ID!, $year: Float, $month: Float, $day: Float) {
    getIncomeByDay (id: $id, userId: $userId, year: $year, month: $month, day: $day) {
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

export const QUERY_ALL_INCOMES = gql`
  query QUERY_ALL_INCOMES ($userId: ID!) {
    getAllIncomes (userId: $userId) {
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
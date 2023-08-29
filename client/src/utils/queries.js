import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      _id
      firstName
      lastName
      email
      location
      gender
      incomeLevel
      birthday
      incomesGroup {
        _id
        amount
        frequency
        category
        type
        date
        note
      }
      expensesGroup {
        _id
        amount
        frequency
        category
        type
        date
      }
      goalsGroup {
        _id
        year
        invested
        saved
        cash
        digital
      }
      financeGroup {
        _id
        digital
        cash
        invested
        saved
      }
      networth {
        _id
        year
        networth
        totalIncome
        totalExpense
        digital
        cash
        invested
        saved
      }
    }
  }
`;

export const QUERY_FINANCIALDATA = gql`
  query QUERY_FINANCIALDATA ($_id: ID!) {
    financialData(_id: $_id) {
      financeGroup {
        digital
        cash
        invested
        saved
      }
      expensesGroup {
        amount
        frequency
        category
        type
        date
      }
      incomesGroup {
        amount
        frequency
        category
        type
        date
        note
      }
      networth
    }
  }
`

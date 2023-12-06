import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      id
      firstName
      lastName
      email
      location
      gender
      incomeLevel
      birthday
      incomesGroup {
        id
        amount
        frequency
        category
        type
        date
        note
      }
      expensesGroup {
        id
        amount
        frequency
        category
        type
        date
      }
      goalsGroup {
        id
        year
        invested
        saved
        cash
        digital
      }
      financeGroup {
        id
        digital
        cash
        invested
        saved
      }
      networthGroup {
        id
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
  query QUERY_FINANCIALDATA ($id: ID!) {
    financialData(id: $id) {
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

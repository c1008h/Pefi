import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      _id
      firstName
      lastName
      email
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
        oneYearGoal
        twoYearGoal
        threeYearGoal
        fourYearGoal
        fiveYearGoal
        oneYearYear
        twoYearYear
        threeYearYear
        fourYearYear
        fiveYearYear
      }
      financeGroup {
        _id
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

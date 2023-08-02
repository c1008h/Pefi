import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      _id
      firstName
      lastName
      email
      incomesGroup {
        amount
        frequency
        category
        type
        date
        note
      }
      expensesGroup {
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
        digital
        cash
        invested
        saved
      }
    }
  }
`;


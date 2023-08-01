import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      _id
      firstName
      lastName
      email
      incomeGroup {
        amount
        frequency
        source
        date
      }
      expensesGroup {
        amount
        frequency
        category
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


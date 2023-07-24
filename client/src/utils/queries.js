import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      _id
      firstName
      lastName
      email
      incomeGroup {
        id
        amount
        frequency
        source
        date
      }
      expensesGroup {
        id
        amount
        frequency
        category
        date
      }
      goalsGroup {
        id
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
        id
        digital
        cash
        invested
        saved
      }
    }
  }
`;


import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
      _id
      firstName
      lastName
      email
      income {
        id
        amount
        frequency
        source
        date
      }
      expense {
        id
        amount
        frequency
        category
        date
      }
      goals {
        id
        oneYearGoal
        twoYearGoal
        threeYearGoal
        fourYearGoal
        fiveYearGoal
        oYearYear
        twoYearYear
        threeYearYear
        fourYearYear
        fiveYearYear
      }
    }
  }
`;


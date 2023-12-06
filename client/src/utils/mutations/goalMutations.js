import { gql } from '@apollo/client';

export const CREATE_GOALS = gql`
  mutation createGoals($input: GoalInput!) {
    createGoals(input: $input) {
        id
        userId
        year
        invested
        saved
        cash
        digital
    }
  }
`;

export const UPDATE_GOALS = gql`
  mutation updateGoals($input: GoalInput!) {
    updateGoals(input: $input) {
        id
        userId
        year
        invested
        saved
        cash
        digital
    }
  }
`;
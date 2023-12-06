import { gql } from '@apollo/client';

export const QUERY_ONE_GOAL = gql`
  query QUERY_ONE_GOAL ($id: ID!, $userId: ID!) {
    getOneGoal (id: $id, userId: $userId) {
        year
        invested
        saved
        cash
        digital
    }
  }
`;

export const QUERY_FIVE_GOALS = gql`
  query QUERY_FIVE_GOALS ($id: ID!, $userId: ID!) {
    getFiveGoals (id: $id, userId: $userId) {
        year
        invested
        saved
        cash
        digital
    }
  }
`;

export const QUERY_TEN_GOALS = gql`
  query QUERY_TEN_GOALS ($id: ID!, $userId: ID!) {
    getTenGoals (id: $id, userId: $userId) {
        year
        invested
        saved
        cash
        digital
    }
  }
`;

import { gql } from '@apollo/client';

export const QUERY_YEARLY_NETWORTH = gql`
  query QUERY_YEARLY_NETWORTH ($id: ID!, $userId: ID!, $year: Float) {
    getYearlyNetworth (id: $id, userId: $userId, year: $year) {
        id
        userId
        month
        year
        digital
        cash
        saved
        invested
        networth
    }
  }
`;

export const QUERY_MONTHLY_NETWORTH = gql`
  query QUERY_MONTHLY_NETWORTH ($id: ID!, $userId: ID!, $year: Float, $month: Float) {
    getMonthlyNetworth (id: $id, userId: $userId, year: $year, month: $month) {
        id
        userId
        month
        year
        digital
        cash
        saved
        invested
        networth
    }
  }
`;
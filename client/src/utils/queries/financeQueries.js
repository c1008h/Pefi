import { gql } from '@apollo/client';

export const QUERY_FINANCIALDATA_BY_DATE = gql`
  query QUERY_FINANCIALDATA_BY_DATE ($userId: ID!, $order: String) {
    getFinancialDataByDate (userId: $userId, order: $order) {
        id
        userId
        amount
        frequency
        category
        type
        date
        note
    }
  }
`;


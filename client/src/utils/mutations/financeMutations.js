import { gql } from '@apollo/client';

export const ADD_FINANCE = gql`
  mutation addFinance($input: FinanceInput!) {
    addFinance(input: $input) {
        userId
        digital
        cash
        invested
        saved
    }
  }
`;

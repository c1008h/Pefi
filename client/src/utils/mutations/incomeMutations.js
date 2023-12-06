import { gql } from '@apollo/client';

export const ADD_INCOME = gql`
  mutation addIncome($input: NetworthInput!) {
    addIncome(input: $input) {
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

export const UPDATE_INCOME = gql`
  mutation updateIncome($input: NetworthInput!) {
    updateIncome(input: $input) {
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

export const DELETE_INCOME = gql`
  mutation deleteIncome($id: ID!) {
    deleteIncome(id: $id) {
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


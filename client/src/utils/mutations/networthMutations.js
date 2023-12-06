import { gql } from '@apollo/client';

export const UPDATE_NETWORTH = gql`
  mutation updateNetworth($input: NetworthInput!) {
    updateNetworth(input: $input) {
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

export const CREATE_NETWORTH = gql`
  mutation createNetworth($input: NetworthInput!) {
    createNetworth(input: $input) {
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

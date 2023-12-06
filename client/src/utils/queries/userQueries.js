import { gql } from '@apollo/client';

export const QUERY_USERS= gql`
  query QUERY_USERS {
    id
    firstName
    lastName
    email
    location
    gender
    incomeLevel
    birthday
  }
`;

export const QUERY_USER = gql`
  query QUERY_USER ($email: String) {
    user (email: $email) {
        id
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

export const QUERY_ME = gql`
  query QUERY_ME {
    me {
        id
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

export const QUERY_ALL_DELETED = gql`
  query QUERY_ALL_DELETED {
    getAllDelete {
        id
        email
        reason
        createdAccount
        deletedAccount
    }
  }
`;
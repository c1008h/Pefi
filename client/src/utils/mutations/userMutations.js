import { gql } from '@apollo/client';

export const LOGIN_A_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_A_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password,) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
export const UPDATE_A_USER = gql`
  mutation updateUser($email: String, $firstName: String, $lastName: String, $location: String, $gender: String, $incomeLevel: String, $birthday: String) {
    updateUser(email: $email, firstName: $firstName, lastName: $lastName, location: $location, gender: $gender, incomeLevel: $incomeLevel, birthday: $birthday) {
      id
      firstName
      lastName
      email
      location
      gender
      incomeLevel
      birthday
    }
  }
`;

export const CHECK_PASSWORD = gql`
  mutation checkPassword($id: ID!, $password:String!) {
    checkPassword(id: $id, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`

export const DELETE_A_USER = gql`
  mutation deleteUser($userId: ID!, $email: String!, $reason: String!, $createdAccount: String, $deletedAccount: String) {
    deleteUser(userId: $userId, email: $email, reason: $reason, createdAccount: $createdAccount, deletedAccount: $deletedAccount) {
      userId
      email
      reason
      createdAccount
      deletedAccount
    }
  }
`


import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
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

export const ADD_USER = gql`
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
export const UPDATE_USER = gql`
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

export const ADD_START_POINT = gql`
  mutation addStartPoint($input: StartInput!) {
    addStartPoint(input: $input) {
      userId
      digital
      cash
      invested
      saved
      createdDate
    }
  }
`

export const UPDATE_START_POINT = gql`
  mutation updateStartPoint($id: ID!, $input: StartInput!) {
    updateStartPoint(id: $id, input: $input) {
        userId
        digital
        cash
        invested
        saved
        createdDate
    }
  }
`


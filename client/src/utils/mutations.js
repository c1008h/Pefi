import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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
        _id
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
      _id
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
  mutation checkPassword($_id: ID!, $password:String!) {
    checkPassword(_id: $_id, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($user_id: ID!, $email: String!, $reason: String!) {
    deleteUser(user_id: $user_id, email: $email, reason: $reason) {
      user_id
      email
      reason
    }
  }
`

export const CREATE_INCOME = gql`
  mutation createIncome($input: IncomeInput!) {
    createIncome(input: $input) {
      incomesGroup {
        _id
        amount
        frequency
        category
        type
        date
        note
      }
    }
  }
`;
export const REMOVE_INCOME = gql`
  mutation removeIncome($_id: ID!) {
    removeIncome(_id: $_id) {
      _id
      firstName
      lastName
      email
      incomesGroup {
        _id
        amount
        frequency
        category
        type
        date
        note
      }
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation createExpense($input: ExpenseInput!) {
    createExpense(input: $input) {
      expensesGroup {
        _id
        amount
        frequency
        category
        type
        date
      }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation removeExpense($_id: ID!) {
    removeExpense(_id: $_id) {
      _id
      firstName
      lastName
      email
      expensesGroup {
        _id
        amount
        frequency
        category
        type
        date
      }
    }
  }
`;

export const CREATE_GOALS = gql`
    mutation createGoals($input: GoalInput!) {
        createGoals(input: $input) {
            email
            goalsGroup {
              year
              invested
              saved
              cash
              digital
            }
        }
    }
`
export const CREATE_FINANCE = gql`
  mutation createFinance($input: FinanceInput!) {
    createFinance(input: $input) {
      financeGroup {
        _id
        digital
        cash
        invested
        saved
      }
    }
  }
`

export const CREATE_NETWORTH = gql`
  mutation createNetworth($_id: ID, $year: Float, $digital: Float, $cash: Float, $invested: Float, $saved: Float, $networth: Float, $totalIncome: Float, $totalExpense: Float) {
    createNetworth(_id: $_id, year: $year, digital: $digital, cash: $cash, invested: $invested, saved: $saved, networth: $networth, totalIncome: $totalIncome, totalExpense: $totalExpense) {
      networthGroup {
        _id
        year
        digital
        cash
        invested
        saved
        networth
        totalIncome
        totalExpense
      }
    }
  }
`
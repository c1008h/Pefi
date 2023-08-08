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
  mutation updateUser($email: String!, $firstName: String!, $lastName: String!) {
    updateUser(email: $email, firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
      email
    }
  }
`;
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
        source
        date
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
    removeExpense(_id: $id) {
      _id
      firstName
      lastName
      email
      expensesGroup {
        _id
        amount
        frequency
        category
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
                oneYearGoal
                twoYearGoal
                threeYearGoal
                fourYearGoal
                fiveYearGoal
                oneYearYear
                twoYearYear
                threeYearYear
                fourYearYear
                fiveYearYear
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

export const UPDATE_FINANCE = gql`
  mutation updateFinance($input: FinanceInput!) {
    updateFinance(input: $input ) {
      financeGroup {
        _id
        digital
        cash
        invested
        saved
      }
    }
  }
`;

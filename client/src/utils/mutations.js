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
        amount
        frequency
        category
        date
        note
      }
    }
  }
`;
export const REMOVE_INCOME = gql`
  mutation removeIncome($id: String!) {
    removeIncome(id: $id) {
      _id
      firstName
      lastName
      email
      incomeGroup {
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
        amount
        frequency
        category
        date
      }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation removeExpense($id: String!) {
    removeExpense(id: $id) {
      _id
      firstName
      lastName
      email
      expensesGroup {
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
        digital
        cash
        invested
        saved
      }
    }
  }
`
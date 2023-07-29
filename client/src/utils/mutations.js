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

export const CREATE_INCOME = gql`
  mutation createIncome($input: IncomeInput!) {
    createIncome(input: $input) {
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

// export const REMOVE_FOOD_ITEM = gql`
//   mutation removeFoodItem($foodtype: String) {
//     removeFoodItem(foodtype: $foodtype) {
//       _id
//       username
//       email
//       savedFoods {
//         foodId
//         foodtype
//         name
//         image_url
//         is_closed
//         url
//         rating
//         price
//         display_phone
//         distance
//       }
//     }
//   }
// `;

export const CREATE_EXPENSE = gql`
  mutation createExpense($input: ExpenseInput!) {
    createExpense(input: $input) {
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
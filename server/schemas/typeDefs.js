const typeDefs = `
    type User {
        _id: ID!
        firstName: String
        lastName: String
        email: String!
        incomeGroup: [Income]
        expensesGroup: [Expenses]
        goalsGroup: [Goals]
        financeGroup: [Finance]
    }

    type Goals {
        oneYearGoal: Float
        twoYearGoal: Float
        threeYearGoal: Float
        fourYearGoal: Float
        fiveYearGoal: Float
        oneYearYear: Float
        twoYearYear: Float
        threeYearYear: Float
        fourYearYear: Float
        fiveYearYear: Float
    }

    input GoalInput {
        oneYearGoal: Float
        twoYearGoal: Float
        threeYearGoal: Float
        fourYearGoal: Float
        fiveYearGoal: Float
        oYearYear: Float
        twoYearYear: Float
        threeYearYear: Float
        fourYearYear: Float
        fiveYearYear: Float
    }
    type Finance {
        digital: String
        cash: String
        invested: String
        saved: String
    }
    input FinanceInput {
        digital: String
        cash: String
        invested: String
        saved: String
    }
    type Income {
        amount: String
        frequency: String
        source: String
        date: String
    }

    type Expenses {
        amount: String
        frequency: String
        category: String
        date: String
    }
    input IncomeInput {
        amount: String
        frequency: String
        source: String
        date: String
    }
      
    input ExpenseInput {
        amount: String
        frequency: String
        category: String
        date: String
    }
    type Auth {
        token: ID
        user: User
    }

    type Query {
        users: [User]
        user(email: String!): User 
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        updateUser(email: String!, firstName: String!, lastName: String!): User

        createGoals(input: GoalInput!): User
        updateGoals(input: GoalInput!): User

        createFinance(input: FinanceInput!): User
        updateFinance(input: FinanceInput!): User

        createIncome(input: IncomeInput!): User
        createExpense(input: ExpenseInput!): User

        updateIncome(input: IncomeInput!): User
        updateExpense(input: ExpenseInput!): User

    }
`;

module.exports = typeDefs;
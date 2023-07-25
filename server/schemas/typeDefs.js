const typeDefs = `
    type User {
        _id: ID!
        firstName: String
        lastName: String
        email: String!
        incomeGroup: [Income]
        expensesGroup: [Expenses]
        goalsGroup: [Goals]
        financeGroup: Finance
    }

    type Goals {
        id: ID!
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
        id: ID!
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
        id: ID!
        amount: String
        frequency: String
        source: String
        date: String
    }

    type Expenses {
        id: ID!
        amount: String
        frequency: String
        category: String
        date: String
    }
    input IncomeInput {
        id: ID!
        amount: String
        frequency: String
        source: String
        date: String
    }
      
    input ExpenseInput {
        id: ID!
        amount: Float
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

        updateUser(firstName: String, lastName: String, email: String, password: String): User

        createGoals(id: ID!, input: GoalInput!): User
        updateGoals(id: ID!, input: GoalInput!): User

        createFinance(input: FinanceInput!): User
        updateFinance(input: FinanceInput!): User

        createIncome(id: ID!, amount: Float, frequency: String, source: String, date: String): User
        createExpense(id: ID!, amount: Float, frequency: String, category: String, date: String): User

        updateIncome(id: ID!, input: IncomeInput!): User
        updateExpense(id: ID!, input: ExpenseInput!): User

    }
`;

module.exports = typeDefs;
const typeDefs = `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        income: [Income]
        expenses: [Expenses]
        goals: [Goals]
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

    type Income {
        id: ID!
        amount: Float
        frequency: String
        source: String
        date: String
    }

    type Expenses {
        id: ID!
        amount: Float
        frequency: String
        category: String
        date: String
    }
    input IncomeInput {
        id: ID!
        amount: Float
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
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth

        updateUser(firstName: String, lastName: String, email: String, password: String): User

        createGoals(id: ID!, input: GoalInput!): Goals
        updateGoals(id: ID!, input: GoalInput!): Goals

        createIncome(id: ID!, amount: Float, frequency: String, source: String, date: String): Income
        createExpense(id: ID!, amount: Float, frequency: String, category: String, date: String): Expenses

        updateIncome(id: ID!, input: IncomeInput!): Income
        updateExpense(id: ID!, input: ExpenseInput!): Expenses


    }
`;

module.exports = typeDefs;

        // deleteIncome(id: ID!): Boolean
        // deleteExpense(id: ID!): Boolean
        // deleteUser(id: ID!): Boolean
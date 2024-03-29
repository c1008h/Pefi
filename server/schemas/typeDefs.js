const typeDefs = `
    type User {
        _id: ID!
        firstName: String
        lastName: String
        email: String!
        location: String
        gender: String
        incomeLevel: String
        birthday: String
        incomesGroup: [Incomes]
        expensesGroup: [Expenses]
        goalsGroup: [Goals]
        financeGroup: Finance
        networthGroup: Networth
    }

    type Goals {
        _id: ID
        year: Float
        invested: Float
        saved: Float
        cash: Float
        digital: Float
    }

    input GoalInput {
        _id: ID
        year: Float
        invested: Float
        saved: Float
        cash: Float
        digital: Float
    }
    type Networth {
        _id: ID
        year: Float
        month: Float
        digital: Float
        cash: Float
        invested: Float
        saved: Float
        networth: Float
        totalIncome: Float
        totalExpense: Float
    }

    type Finance {
        _id: ID
        digital: Float
        cash: Float
        invested: Float
        saved: Float
    }
    input FinanceInput {
        _id: ID
        digital: Float
        cash: Float
        invested: Float
        saved: Float
        financeGroup: ID
    }
    type Incomes {
        _id: ID
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }

    type Expenses {
        _id: ID
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
    }
    input IncomeInput {
        _id: ID
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }
      
    input ExpenseInput {
        _id: ID
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
    }
    type Auth {
        token: ID
        user: User
    }
    type FinanceGroup {
        finances: [Finance]
    }
      
    type FinancialData {
        financeGroup: FinanceGroup
        expenses: [Expenses]
        incomes: [Incomes]
        networth: String
    }

    type Delete {
        user_id: ID!
        email: String!
        reason: String!
    }

    type Query {
        users: [User]
        user(email: String!): User 
        me: User
        financialData(_id: ID!): FinancialData
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        updateUser(email: String, firstName: String, lastName: String, location: String, gender: String, incomeLevel: String, birthday: String): User
        deleteUser(user_id: ID!, email: String!, reason: String!): Delete
        checkPassword(_id: ID!, password: String!): Auth


        createGoals(input: GoalInput!): User
        updateGoals(input: GoalInput!): User

        createFinance(input: FinanceInput!): User

        createIncome(input: IncomeInput!): User
        updateIncome(input: IncomeInput!): User
        removeIncome(_id: ID!): User

        createExpense(input: ExpenseInput!): User
        updateExpense(input: ExpenseInput!): User
        removeExpense(_id: ID!): User

        createNetworth(_id: ID, year: Float, digital: Float, cash: Float, invested: Float, saved: Float, networth: Float, totalIncome: Float, totalExpense: Float ): User
    }
`;

module.exports = typeDefs;
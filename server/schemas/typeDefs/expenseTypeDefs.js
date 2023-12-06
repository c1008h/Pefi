const expenseTypeDefs = `
    type Expenses {
        id: ID!
        userId: ID!
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }
      
    input ExpenseInput {
        userId: ID!
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }

    type Query {
        getAllExpenses(userId: ID!): [Expenses]
        getExpenseByYear(userId: ID!, year: Float): [Expenses]
        getExpenseByMonth(userId: ID!, year: Float, month: Float): [Expenses]
        getExpenseByDay(userId: ID!, year: Float, month: Float, day: Float): [Expenses]
        getExpenseById(userId: ID!, id: ID!): Expenses
    }

    type Mutation {
        addExpense(input: ExpenseInput!): Expenses
        updateExpense(id: ID!, input: ExpenseInput!): Expenses
        deleteExpense(id: ID!): Expenses
    }
`;

module.exports = expenseTypeDefs;
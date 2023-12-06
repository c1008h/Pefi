const typeDefs = `
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String!
        location: String
        gender: String
        incomeLevel: String
        birthday: String
    }

    type Start {
        id: ID!
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
        createDate: Date
    }

    type Finance {
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
    }

    type Goals {
        id: ID!
        userId: ID!
        year: Int
        invested: Float
        saved: Float
        cash: Float
        digital: Float
    }

    type Networth {
        id: ID!
        userId: ID!
        month: Int
        year: Int
        digital: Float
        cash: Float
        saved: Float
        invested: Float
        networth: Float
    }

    type Expenses {
        id: ID!
        user: ID!
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }

    type Incomes {
        id: ID!
        userId: ID!
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }

    type Delete {
        id: ID!
        user_id: ID!
        email: String!
        reason: String!
    }

    type Auth {
        token: ID
        user: User
    }

    type FinancialData {
        id: ID!
        userId: ID!
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }


    input IncomeInput {
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

    input GoalInput {
        userId: ID!
        year: Int
        invested: Float
        saved: Float
        cash: Float
        digital: Float
    }

    input NetworthInput {
        userId: ID!
        month: Int
        year: Int
        networth: Float
    }

    input FinanceInput {
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
    }

    input StartInput {
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
        createDate: Date
    }

    type Query {
        users: [User]
        user(email: String!): User 
        me: User

        getStart(id: ID!): Start
        getFinancialDataByDate(userId: ID!, order: String): [FinancialData]
        getAllExpenses(id: ID!): [Expenses]
        getExpenseByYear(id: ID!, year: Float): [Expenses]
        getExpenseByMonth(id: ID!, year: Float, month: Float): [Expenses]
        getExpenseByDay(id: ID!, year: Float, month: Float, day: Float): [Expenses]
        getExpenseById(id: ID!, expenseId: ID!): Expenses

        getOneGoal(id: ID!, year: Float!): [Goals]
        getFiveGoals(id: ID!, year: Float!): [Goals]
        getTenGoals(id: ID!, year: Float!): [Goals]

        getIncomeById(id: ID!, incomeId: ID!): Incomes
        getIncomeByYear(id: ID!, year: Float): [Incomes]
        getIncomeByMonth(id: ID!, year: Float, month: Float): [Incomes]
        getIncomeByDay(id: ID!, year: Float, month: Float, day: Float): [Incomes]
        getAllIncomes(id: ID!): [Incomes]

        getYearlyNetworth(id: ID!, year: Float!): [Networth]
        getMonthlyNetworth(id: ID!, year: Float!, month: Float!): Networth
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        updateUser(email: String, firstName: String, lastName: String, location: String, gender: String, incomeLevel: String, birthday: String): User
        deleteUser(user_id: ID!, email: String!, reason: String!): Delete
        checkPassword(id: ID!, password: String!): Auth

        addStartPoint(input: StartInput!): Start
        updateStartPoint(id: ID!, input: StartInput!): Start
        addFinance(input: FinanceInput!): Finance

        createGoals(input: GoalInput!): Goal
        updateGoals(id: ID!, input: GoalInput!): Goal


        addIncome(input: IncomeInput!): Income
        updateIncome(id: ID!, input: IncomeInput!): Income
        deleteIncome(id: ID!): Income

        addExpense(input: ExpenseInput!): Expense
        updateExpense(id: ID!, input: ExpenseInput!): Expense
        deleteExpense(id: ID!): Expense

        updateNetworth(input: NetworthInput): [Networth]
    }
`;

module.exports = typeDefs;
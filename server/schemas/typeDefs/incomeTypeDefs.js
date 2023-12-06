const incomeTypeDefs = `
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

    input IncomeInput {
        userId: ID!
        amount: Float
        frequency: String
        category: String
        type: String
        date: String
        note: String
    }

    type Query {
        getIncomeById(userId: ID!, id: ID!): Incomes
        getIncomeByYear(userId: ID!, year: Float): [Incomes]
        getIncomeByMonth(userId: ID!, year: Float, month: Float): [Incomes]
        getIncomeByDay(userId: ID!, year: Float, month: Float, day: Float): [Incomes]
        getAllIncomes(userId: ID!): [Incomes]
    }

    type Mutation {
        addIncome(input: IncomeInput!): Incomes
        updateIncome(id: ID!, input: IncomeInput!): Incomes
        deleteIncome(id: ID!): Incomes
    }
`;

module.exports = incomeTypeDefs;
const financeTypeDefs = `
    type Finance {
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
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

    input FinanceInput {
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
    }

    type Query {
        getFinancialDataByDate(userId: ID!, order: String): [FinancialData]
    }

    type Mutation {
        addFinance(input: FinanceInput!): Finance
    }
`;

module.exports = financeTypeDefs;
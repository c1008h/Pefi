const networthTypeDefs = `
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

    input NetworthInput {
        userId: ID!
        month: Int
        year: Int
        digital: Float
        cash: Float
        saved: Float
        invested: Float
        networth: Float
    }

    type Query {
        getYearlyNetworth(userId: ID!, year: Float!): [Networth]
        getMonthlyNetworth(userId: ID!, year: Float!, month: Float!): Networth
    }

    type Mutation {
        updateNetworth(input: NetworthInput): [Networth]
        createNetworth(input: NetworthInput): Networth
    }
`;

module.exports = networthTypeDefs;
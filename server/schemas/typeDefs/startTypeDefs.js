const startTypeDefs = `
    type Start {
        id: ID!
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
        createDate: String
    }

    input StartInput {
        userId: ID!
        digital: Float
        cash: Float
        invested: Float
        saved: Float
        createDate: String
    }

    type Query {
        getStart(id: ID!): Start
    }

    type Mutation {
        addStartPoint(input: StartInput!): Start
        updateStartPoint(id: ID!, input: StartInput!): Start
    }
`;

module.exports = startTypeDefs;
const goalTypeDefs = `
    type Goals {
        id: ID!
        userId: ID!
        year: Int
        invested: Float
        saved: Float
        cash: Float
        digital: Float
    }

    input GoalInput {
        userId: ID
        year: Int
        invested: Float
        saved: Float
        cash: Float
        digital: Float
    }

    type Query {
        getOneGoal(id: ID!, year: Float!): [Goals]
        getFiveGoals(id: ID!, year: Float!): [Goals]
        getTenGoals(id: ID!, year: Float!): [Goals]
    }

    type Mutation {
        createGoals(input: GoalInput!): Goals
        updateGoals(id: ID!, input: GoalInput!): Goals
    }
`;

module.exports = goalTypeDefs;
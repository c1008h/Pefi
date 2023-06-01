const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        firstname: String!
        lastname: String!

    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        users: [User]
        user(username:String!): User
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, firstname: String!, lastname: String!): Auth
        saveIncome
        removeIncome
        saveExpense
        removeExpense
        saveGoal
        removeGoal
    }
`
module.exports = typeDefs;
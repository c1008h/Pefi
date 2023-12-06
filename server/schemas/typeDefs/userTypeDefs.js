const userTypeDefs = `
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

    type Delete {
        id: ID!
        userId: ID!
        email: String!
        reason: String!
        createdAccount: String
        deletedAccount: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        users: [User]
        user(email: String!): User 
        me: User
        getAllDelete: [Delete]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!): Auth
        updateUser(email: String, firstName: String, lastName: String, location: String, gender: String, incomeLevel: String, birthday: String): User
        deleteUser(userId: ID!, email: String!, reason: String!, createdAccount: String, deletedAccount: String): Delete
        checkPassword(id: ID!, password: String!): Auth
    }
`;

module.exports = userTypeDefs;
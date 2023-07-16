const typeDefs = `
  type Goals {
    _id: ID
    name: String
  }

  type Income {
    _id: ID
    name: String
    description: String
    price: Float
    category: Category
  }

  type Frequency {
    daily: Boolean
    weekly: Boolean
    biweekly: Boolean
    monthly: Boolean
  }

  type Expenses {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Category {
    _id: ID
    name: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    income: [Income]
    expenses: [Expenses]
    goals: [Goals]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

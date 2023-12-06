const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');
const { signToken } = require('../../utils/auth');

const startResolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
      user: async (parent, { id }) => {
        return User.findOne({ id: id });
      },
      me: async (parent, args, context) => {
        // console.log(context.user)
        if (context.user) {
          try {
            const user = await User.findById(context.user._id)
            return user;
          } catch (error) {
            console.error('Error populating fields:', error)
            throw error;
          }
        }
        throw new AuthenticationError('You need to be logged in!')
      }
    },
    Mutation: {

    }
}

module.exports = startResolvers;


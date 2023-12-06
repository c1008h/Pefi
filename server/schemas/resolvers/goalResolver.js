const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');
const { signToken } = require('../../utils/auth');

const goalResolvers = {
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
      createGoals: async (parent, { input }, context) => {
        if (context.user) {
          
          console.log(input)

          try {
            const newGoal = new Goal({
              userId: context.user.id,
              year: input.year,
              saved: input.saved,
              invested: input.invested,
              cash: input.cash,
              digital: input.digital,
            });
            const savedGoal = await newGoal.save();

            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { goalsGroup: savedGoal._id } },
              { new: true }
            )

            console.log('successfully input goal')
            return updatedUser;

          } catch (error) {
            console.log('Error:', error);
            throw new Error('Something went wrong.');
          }
           
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
    }
}

module.exports = goalResolvers;
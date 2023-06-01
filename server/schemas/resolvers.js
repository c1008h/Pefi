const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },
      me: async (parent, args, context) => {
        console.log(context.user)
        if(context.user) {
            return User.findOne({ _id: context.user._id })
        }
        throw new AuthenticationError('You need to be logged in!')
      },
    },
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);

        return { token, user}
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Wrong email/password!');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        
        const token = signToken(user);
        return { token, user };
      },
      saveIncome: async (parent, { input }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { saveIncomes: input } },
            { new: true }
        )
        console.log('successfully saved the income')

        return updatedUser;
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
      removeIncome: async (parent, {foodId } , context) => {
        if (context.user) {
          
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedFoods: { incomeId : incomeId }} },
            { new: true }
          )
          console.log('successfully removed the income')
          return updatedUser;
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
    //   removeFoodItem: async (parent, {foodtype} , context) => {
    //     if (context.user) {
          
    //       const updatedUser = await User.findByIdAndUpdate(
    //         { _id: context.user._id },
    //         { $pull: { savedFoods: { foodtype : foodtype }} },
    //         { new: true }
    //       )
    //       console.log('successfully removed the food')
    //       return updatedUser;
    //     }
    //     throw new AuthenticationError ('You need to be logged in.');
    //   },
      saveExpense: async (parent, { input }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedExpenses: input } },
                { new: true }
            )
            console.log('successfully saved the expense')
            return updatedUser;
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
      removeExpense: async (parent, { expenseId } , context) => {
        if (context.user) {
          
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedExpenses: { expenseId : expenseId }} },
            { new: true }
          )
          console.log('successfully removed the expense')
          return updatedUser;
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
      saveGoal: async (parent, { input }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedGoals: input } },
                { new: true }
            )
            console.log('successfully saved the goal')
            return updatedUser;
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
      removeGoal: async (parent, { resturauntId } , context) => {
        if (context.user) {
          
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedGoals: { goalId : goalId }} },
            { new: true }
          )
          console.log('successfully removed the goal')
          return updatedUser;
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
    }
}
module.exports = resolvers;
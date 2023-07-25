const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
      user: async (parent, { _id }) => {
        return User.findOne({ _id: _id });
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
      addUser: async (parent, { email, password }) => {
        const user = await User.create({ email, password });
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



      createIncome: async (parent, { input }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { incomeGroup: input } },
            { new: true }
        )
        console.log('successfully input income')

        return updatedUser;
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
      // removeIncome: async (parent, { id } , context) => {
      //   if (context.user) {
          
      //     const updatedUser = await User.findByIdAndUpdate(
      //       { _id: context.user._id },
      //       { $pull: { income: { id : id }} },
      //       { new: true }
      //     )
      //     console.log('successfully removed income')
      //     return updatedUser;
      //   }
      //   throw new AuthenticationError ('You need to be logged in.');
      // },



      createExpense: async (parent, { input }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { expenseGroup: input } },
                { new: true }
            )
            console.log('successfully input expense')
            return updatedUser;
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
      // deleteExpense: async (parent, { id } , context) => {
      //   if (context.user) {
          
      //     const updatedUser = await User.findByIdAndUpdate(
      //       { _id: context.user._id },
      //       { $pull: { expense: { id : id }} },
      //       { new: true }
      //     )
      //     console.log('successfully removed expense')
      //     return updatedUser;
      //   }
      //   throw new AuthenticationError ('You need to be logged in.');
      // },

      createGoals: async (parent, { input }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { goalGroup: input } },
                { new: true }
            )
            console.log('successfully input goal')
            return updatedUser;
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
      // deleteGoal: async (parent, { id } , context) => {
      //   if (context.user) {
          
      //     const updatedUser = await User.findByIdAndUpdate(
      //       { _id: context.user._id },
      //       { $pull: { goal: { id : id }} },
      //       { new: true }
      //     )
      //     console.log('successfully removed goal')
      //     return updatedUser;
      //   }
      //   throw new AuthenticationError ('You need to be logged in.');
      // },
      createFinance: async (parent, { input }, context) => {
        if (context.user) {
          const { digital, cash, invested, saved } = input; // Destructure the input fields

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { 
                  "financeGroup.digital": digital,
                  "financeGroup.cash": cash,
                  "financeGroup.invested": invested,
                  "financeGroup.saved": saved,
                 } },
                { new: true }
            )
            console.log('successfully input finance')
            return updatedUser;
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
    }
}
module.exports = resolvers;

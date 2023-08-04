const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Finance } = require('../models');
const { signToken } = require('../utils/auth');
const {calculateNetworth} = require('../utils/financialCalculations');
// const Expenses = require('../models/Expenses');

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
            // return User.findOne({ _id: context.user._id })
            const user = await User.findById(context.user._id)
            .populate('incomesGroup')
            .populate('expensesGroup')
            .populate('goalsGroup')
            .populate('financeGroup');
          return user;
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

      updateUser: async (parent, { email, firstName, lastName }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { email, firstName, lastName },
            { new: true }
          );
          console.log('successfully updated user information')

          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in.');
      },

      createIncome: async (parent, { input }, context) => {
        if (context.user) {
          try {
            const newIncome = new Incomes({
              amount: input.amount, 
              category: input.category,
              date: input.date,
              frequency: input.frequency,
              type: input.type,
              note: input.note
            })
            const savedIncome = await newIncome.save();

            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { incomesGroup: savedIncome._id } },
              { new: true }
            )
            console.log('successfully input income')
            return updatedUser;
          } catch (error) {
            console.log('Error:', error);
            throw new Error('Something went wrong.');
          }
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
          try {
            const newExpense = new Expenses({
              amount: input.amount,
              frequency: input.frequency,
              category: input.category,
              type: input.type,
              date: input.date,
            });
            console.log(input)

            const savedExpense = await newExpense.save();

            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { expensesGroup: savedExpense._id } },
              { new: true }
            )
            console.log('successfully input expense')
            return updatedUser;

          } catch (erorr) {
            console.log('Error:', error);
            throw new Error('Something went wrong.');
          }
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
          try {
            const newExpense = new Expenses({
              amount: input.amount,
              frequency: input.frequency,
              category: input.category,
              type: input.type,
              date: input.date,
            });
            const savedExpense = await newExpense.save();

            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { goalGroup: savedExpense._id } },
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
          try {
            const updateFinance = new Finance({
              digital: input.digital,
              cash: input.cash,
              invested: input.invested,
              saved: input.saved
            });
            const saveFinance = await updateFinance.save();

            // console.log('finance', finance)
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { financeGroup: saveFinance._id }, // Set financeGroup to the finance object
              { new: true }
            )
            console.log(updatedUser)
            console.log('successfully input finance')
            return updatedUser;
          } catch (error) {

          }
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
    }
}
module.exports = resolvers;

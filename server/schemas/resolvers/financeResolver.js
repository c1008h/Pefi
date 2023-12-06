const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');
const { signToken } = require('../../utils/auth');

const financeResolvers = {
    Query: {
      getFinancialDataByDate: async (parent, { userId, order = 'desc' }, context) => {
        if (context.user) {
          try {
            const expenses = await Expenses.find({ userId }).sort({ date: order })
            const incomes = await Incomes.find({ userId }).sort({ date: order })

            const financialData = [...expenses, ...incomes].sort((a, b) => {
              const dateA = new Date(a.date)
              const dateB = new Date(b.date);

              return order === 'asc' ? dateA - dateB : dateB - dateA;
            })
            return financialData
          } catch (error) {
            console.error("Errors getting financial data by date: ", error)
            throw new EvalError("Error getting financial data by date!")
          }
        }
        throw new AuthenticationError("You need to be logged in!")
      },
    },
    Mutation: {
      addFinance: async (parent, { input }, context) => {
        console.log(context.user)
        console.log('input:', input)
        if (context.user) {
          try {
            // const updateFinance = new Finance({
            //   digital: input.digital,
            //   cash: input.cash,
            //   invested: input.invested,
            //   saved: input.saved
            // });
            // const saveFinance = await updateFinance.save();

            // console.log('finance', finance)
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              // { financeGroup: { input } }, // Set financeGroup to the finance object
              {
                $set: {
                    'financeGroup.cash': input.cash,
                    'financeGroup.digital': input.digital,
                    'financeGroup.invested': input.invested,
                    'financeGroup.saved': input.saved
                }
            },
              { new: true }
            )
            // console.log(updatedUser)
            console.log('successfully input finance')
            return updatedUser;
            // console.log(recalculateFinance(updatedUser))
            // await recalculateFinance(updatedUser)
          } catch (error) {
            console.log('Error:', error)
            throw new Error('Failed to create finance');
          }
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
    }
}

module.exports = financeResolvers;
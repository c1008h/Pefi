const { AuthenticationError } = require('apollo-server-express');
const { User, Start, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');
const { signToken } = require('../../utils/auth');

const calculateNetworth = (start, expenses, income) => {
  let digital = 0;
  let cash = 0;
  let saved = 0;
  let invested = 0;

  start.forEach((start) => {
    switch (start) {
      case 'digital':
        digital += start.digital;
        break;
      case 'cash':
        cash += start.cash;
        break;
      case 'saved':
        saved += start.saved;
        break;
      case 'invested':
        invested += start.invested;
        break;
      default:
        throw new Error("Issues adding starting point!")
    }
  })

  expenses.forEach((expense) => {
    switch (expense.type) {
      case 'digital':
        digital -= expense.amount;
        break;
      case 'cash':
        cash += expense.amount;
        break;
      case 'saved':
        saved += expense.amount;
        break;
      case 'invested':
        invested += expense.amount;
        break;
      default:
        throw new Error("Issues calculating expenses")
    }
  });

  income.forEach((income) => {
    switch(income.type) {
      case 'digital':
        digital += income.amount;
        break;
      case 'cash':
        cash += income.amount;
        break;
      case 'saved':
        saved += income.amount;
        break;
      case 'invested':
        invested += income.amount;
        break;
      default:
        throw new Error("Issues calculating income")
    }
  })

  const networth = digital + cash + saved + invested;

  return {
    digital,
    cash,
    saved,
    invested,
    networth,
  };
};

const networthResolvers = {
  Query: {
    getMonthlyNetworth: async (parent, { month, year }, context) => {
      if (context.user) {
        try {
          const start = await Start.findById(context.user.id)
          const expenses = await Expenses.find({
            userId: context.user.id
          })
          const incomes = await Incomes.find({
            userId: context.user.id
          })

          const { digital, cash, saved, invested, networth } = calculateNetworth(start, expenses, incomes)

          console.log("NETWORTH: ", networth)
          return {
            month, year, digital, cash, saved, invested, networth
          };

        } catch (error) {
          console.error("Error getting monthly networths")
          throw new Error("Error getting monthly networths")
        }
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    getYearlyNetworth: async (parent, { year }, context) => {
      if (context.user) {
        try {
          const start = await Start.findById(context.user.id);
          const expenses = await Expenses.find({
            userId: context.user.id
          })
          const incomes = await Incomes.find({
            userId: context.user.id
          })

          const { digital, cash, saved, invested, networth } = calculateNetworth(start, expenses, incomes)

          console.log("NETWORTH: ", networth)
          return {
            year, digital, cash, saved, invested, networth
          };

        } catch (error) {
          console.error("Error getting monthly networths")
          throw new Error("Error getting monthly networths")
        }
      }
      throw new AuthenticationError('You need to be logged in!')
    }
  },
  Mutation: {
    createNetworth: async (parent, { year, month, digital, cash, invested, saved, networth, totalIncome, totalExpense}, context) => {
      if (context.user) {
        console.log('testing create networth')
        try {
          const newNetworth = new Networth({
            year: year, 
            month: month,
            digital: digital,
            cash: cash,
            invested: invested,
            saved: saved,
            networth: networth,
            totalIncome: totalIncome,
            totalExpense: totalExpense
          })
          
          const saveNetworth = await newNetworth.save()

          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $push: {
                networthGroup: saveNetworth._id
              }
            },
            { new: true }
          )
          console.log('successfully input networth!')

          return updatedUser
        } catch (error) {
          console.log('Error:', error)
          throw new Error('Failed to create networth')
        }
      }
      throw new AuthenticationError ('You need to be log in first.');
    }
  }

}

module.exports = networthResolvers;
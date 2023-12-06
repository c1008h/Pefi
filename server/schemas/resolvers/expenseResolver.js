const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');

const calculateTotalExpense = async (userId, year, month, day) => {
  try {
    let dateQuery = {}

    if (year) {
      dateQuery.year = year;
    }

    if (month) {
      dateQuery.month = month
    }

    if (day) {
      dateQuery.day = day
    }

    const expenses = await Expenses.find({
      userId: userId,
      date: dateQuery,
    });

    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

    return totalExpense;
  } catch (error) {
    console.error("Error calculating total expense")
    throw new Error(error)
  }
}
const expenseResolvers = {
    Query: {
      getAllExpenses: async (parent, args, context) => {
        if (context.user) {
          try {
            return Expenses.find();

          } catch (error) {
            console.error('Error populating fields:', error)
            throw error;
          }
        }
        throw new AuthenticationError('You need to be logged in!')
      },
      getExpenseById: async (parent, { id }, context) => {
        if (context.user) {
          try {
            return Expenses.findOne({ id: id });

          } catch (error) {
            console.error('Error populating fields:', error)
            throw error;
          }
        }
        throw new AuthenticationError('You need to be logged in!')
      },
      getExpenseByYear: async (parent, args, context) => {
        // console.log(context.user)
        if (context.user) {
          try {
            const user = await User.findById(context.user.id)
            return user;
          } catch (error) {
            console.error('Error populating fields:', error)
            throw error;
          }
        }
        throw new AuthenticationError('You need to be logged in!')
      },
      getExpenseByMonth: async (parent, args, context) => {
        // console.log(context.user)
        if (context.user) {
          try {
            const user = await User.findById(context.user.id)
            return user;
          } catch (error) {
            console.error('Error populating fields:', error)
            throw error;
          }
        }
        throw new AuthenticationError('You need to be logged in!')
      },
      getExpenseByDay: async (parent, args, context) => {
        // console.log(context.user)
        if (context.user) {
          try {
            const user = await User.findById(context.user.id)
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
      addExpense: async (parent, { input }, context) => {
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

            return savedExpense;
          } catch (error) {
            console.log('Error:', error);
            throw new Error('Something went wrong.');
          }
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
      deleteExpense: async (parent, { _id } , context) => {
        console.log('expense id:', _id)
        if (context.user) {
          try {
            const deletedExpense = await Expenses.findByIdAndDelete(_id);
            if (!deletedExpense) {
              console.log('Expense not found');
              return null;
            }

            const [year, month] = deletedExpense.date.split('-');
            const financeFieldToUpdate = `financeGroup.${deletedExpense.type.toLowerCase()}`;

            let networth = await Networth.findOne({ year, month });

            if (!networth) {
              networth = new Networth({
                year,
                month,
                digital: 0, 
                cash: 0,
                saved: 0,
                invested: 0,
              })
            }
            networth.financeFieldToUpdate -= deletedExpense.amount;
            networth.financeFieldToUpdate -= deletedExpense.amount;
            await networth.save();

            const updateFields = {
              $pull: { expensesGroup: _id },
              $inc: {
                [financeFieldToUpdate]: +deletedExpense.amount,
              },
            };
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              updateFields,
              { new: true }
            )

            console.log('successfully removed expense')
            return updatedUser;
          } catch (error) {
            console.log("ERROR:", error);
            throw new Error ("failed to delete expense");
          }
      }
        throw new AuthenticationError ('You need to be logged in.');
      },
    }
}

module.exports = expenseResolvers;
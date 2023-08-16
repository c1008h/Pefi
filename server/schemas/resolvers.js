const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal } = require('../models');
const { signToken } = require('../utils/auth');
const { calculateNetworth, calculateMonthlyIncome, calculateMonthlyExpense } = require('../utils/calculations');
const recalculateFinance = async (user) => {
  const financeGroup = await Finance.findById(user.financeGroup);

  // Calculate the total expenses for the user
  const totalExpenses = await Expenses.aggregate([
    { $match: { _id: { $in: user.expensesGroup } } },
    { $group: { _id: null, totalAmount: { $sum: { $toDouble: "$amount" } } } },
  ]);

  // Calculate the total incomes for the user
  const totalIncomes = await Incomes.aggregate([
    { $match: { _id: { $in: user.incomesGroup } } },
    { $group: { _id: null, totalAmount: { $sum: { $toDouble: "$amount" } } } },
  ]);

  // Calculate the networth
  const networth = (totalIncomes[0]?.totalAmount || 0) - (totalExpenses[0]?.totalAmount || 0);

  // Update the Finance document
  financeGroup.digital = networth; // You can modify this as per your finance calculations
  financeGroup.cash = 0; // Reset cash value if needed
  financeGroup.invested = 0; // Reset invested value if needed
  financeGroup.saved = 0; // Reset saved value if needed

  await financeGroup.save();
};
const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
      user: async (parent, { _id }) => {
        return User.findOne({ _id: _id });
      },
      me: async (parent, args, context) => {
        // console.log(context.user)
        if (context.user) {

            // return User.findOne({ _id: context.user._id })
            const user = await User.findById(context.user._id)
            .populate('incomesGroup')
            .populate('expensesGroup')
            .populate('goalsGroup')
            // .populate('financeGroup');
          return user;
        }
        throw new AuthenticationError('You need to be logged in!')
      },
      financialData: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(_id)
          .populate('incomesGroup')
          .populate('expensesGroup')
          .populate('financeGroup');

          const networth = calculateNetworth(user);

          return {
            financeGroup: user.financeGroup,
            expenses: user.expensesGroup,
            incomes: user.incomesGroup,
            networth: networth.toString(), // Assuming the networth is a number, convert it to a string for GraphQL
          };
        }
        throw new AuthenticationError('You need to be logged in!');
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
              note: input.note,
            })
            const savedIncome = await newIncome.save();

            const financeFieldToUpdate = `financeGroup.${input.type.toLowerCase()}`;
            const updateFields = {
              $push: { incomesGroup: savedIncome._id }
            };
            updateFields.$inc = {
              [financeFieldToUpdate]: +input.amount,
            }

            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              // { $push: { incomesGroup: savedIncome._id } },
              updateFields,
              { new: true }
            )
            console.log('successfully input income')
            console.log('updated:', updatedUser.financeGroup)
            return updatedUser;
          } catch (error) {
            console.log('Error:', error);
            throw new Error('Something went wrong.');
          }
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
      removeIncome: async (parent, { _id } , context) => {
        console.log('income id:', _id)
        if (context.user) {
          try {
            const deletedIncome = await Incomes.findByIdAndDelete(_id);

            if (!deletedIncome) {
              console.log('Income not found');
              return null;
            }
            const financeFieldToUpdate = `financeGroup.${deletedIncome.type.toLowerCase()}`;
            const updateFields = {
              $pull: { incomesGroup: _id },
              $inc: {
                [financeFieldToUpdate]: -deletedIncome.amount,
              },
            };
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              updateFields,
              { new: true }
            )
            console.log('successfully removed income')
            return updatedUser;
          } catch (error) {
            console.log("ERROR:", error);
            throw new Error ("failed to delete income");
          }
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
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

            const financeFieldToUpdate = `financeGroup.${input.type.toLowerCase()}`;
            const updateFields = {
              $push: { expensesGroup: savedExpense._id }
            };
            updateFields.$inc = {
              [financeFieldToUpdate]: -input.amount,
            }
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              updateFields,
              { new: true }
            );

            console.log('successfully input expense')
            console.log('updated:', updatedUser.financeGroup)
            return updatedUser;

          } catch (erorr) {
            console.log('Error:', error);
            throw new Error('Something went wrong.');
          }
        }
        throw new AuthenticationError ('You need to be log in first.');
      },
      removeExpense: async (parent, { _id } , context) => {
        console.log('expense id:', _id)
        if (context.user) {
          try {
            const deletedExpense = await Expenses.findByIdAndDelete(_id);
            // console.log('deleteexpense:', deletedExpense)
            if (!deletedExpense) {
              console.log('Expense not found');
              return null;
            }
            const financeFieldToUpdate = `financeGroup.${deletedExpense.type.toLowerCase()}`;
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

      createGoals: async (parent, { input }, context) => {
        if (context.user) {
          try {
            const newGoal = new Goal({
              year: input.year,
              saved: input.saved,
              invested: input.invested,
              cash: input.cash,
              digital: input.digital,
            });
            const savedGoal = await newGoal.save();

            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { goalGroup: savedGoal._id } },
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
module.exports = resolvers;

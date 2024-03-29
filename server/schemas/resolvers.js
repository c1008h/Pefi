const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../models');
const { signToken } = require('../utils/auth');
const { calculateNetworth, calculateMonthlyIncome, calculateMonthlyExpense } = require('../utils/calculations');

const createOrUpdateNetworth = async (userId, year, month, cashChange, digitalChange, savedChange, investedChange) => {
  try {
    // Find the Networth document for the given year and month
    const networth = await Networth.findOne({ year, month });

    if (networth) {
      // If the Networth document exists for the given year and month, update the fields
      networth.cash += cashChange;
      networth.digital += digitalChange;
      networth.saved += savedChange;
      networth.invested += investedChange;
    } else {
      // If the Networth document does not exist, create a new one
      const newNetworth = new Networth({
        year,
        month,
        cash: cashChange,
        digital: digitalChange,
        saved: savedChange,
        invested: investedChange,
      });
      await newNetworth.save();
    }
  } catch (error) {
    // Handle errors...
  }
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
          try {
            // return User.findOne({ _id: context.user._id })
            const user = await User.findById(context.user._id)
            .populate('incomesGroup')
            .populate('expensesGroup')
            .populate('goalsGroup')
            .populate('networthGroup')
            // .populate('financeGroup');

            return user;
          } catch (error) {
            console.error('Error populating fields:', error)
            throw error;
          }
        }
        throw new AuthenticationError('You need to be logged in!')
      },
      financialData: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(_id)
          .populate('incomesGroup')
          .populate('expensesGroup')
          .populate('financeGroup')
          .populate('goalsGroup');

          const networth = calculateNetworth(user);

          return {
            financeGroup: user.financeGroup,
            expenses: user.expensesGroup,
            incomes: user.incomesGroup,
            networth: networth.toString()
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
      updateUser: async (parent, { email, firstName, lastName, location, gender, incomeLevel, birthday }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { email, firstName, lastName, location, gender, incomeLevel, birthday },
            { new: true }
          );
          console.log('successfully updated user information')

          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in.');
      },
      checkPassword: async (parent, { password, _id }) => {
        try {
          const user = await User.findById(_id)

          if (!user) {
            throw new AuthenticationError('User not found')
          }

          const validPassword = await user.isCorrectPassword(password)

          if (!validPassword) {
            throw new AuthenticationError('Incorrect password');
          }

          const token = signToken(user)
          console.log('correct password!')
          return { token, user }
        } catch (error) {
          console.log('Error: ', error)
          throw new AuthenticationError('Authentication failed')
        }
      },
      deleteUser: async (paernt, { user_id, email, reason }, context) => {
        if (context.user) {
          try {
            await User.findByIdAndDelete(user_id);
            // await Finances.deleteMany({ user_id }); 
            await Expenses.deleteMany({ user_id }); 
            await Incomes.deleteMany({ user_id }); 
            await Goal.deleteMany({ user_id })
            await Networth.deleteMany({ user_id })

            const deleteRecord = new Delete({
              user_id,
              email,
              reason,
              timestamp: new Date()
            })

            await deleteRecord.save()
            
            console.log('successfully deleted user')

            return deleteRecord
          } catch (err) {
            console.log('Error:', err)
            throw new Error ('failed to delete user')
          }
        }
        throw new AuthenticationError ('You need to be logged in.');
      },
      createIncome: async (parent, { input }, context) => {
        if (context.user) {
          try {
            const [year, month] = input.date.split('-');
            let categoryFieldToUpdate;
            console.log('input type', input.type)
            switch (input.type) {
              case 'cash':
                categoryFieldToUpdate = 'cash';
                break;
              case 'digital':
                categoryFieldToUpdate = 'digital';
                break;
              case 'invested':
                categoryFieldToUpdate = 'invested';
                break;
              case 'saved':
                categoryFieldToUpdate = 'saved';
                break;
              default:
                categoryFieldToUpdate = null;
            }
            if (categoryFieldToUpdate) {
              await createOrUpdateNetworth(
                context.user._id,
                year,
                month,
                input.amount,
                0,
                0,
                0,
              )
            }

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
            const [year, month] = input.date.split('-');
            let categoryFieldToUpdate;
            console.log('input type', input.type)
            switch (input.type) {
              case 'cash':
                categoryFieldToUpdate = 'cash';
                break;
              case 'digital':
                categoryFieldToUpdate = 'digital';
                break;
              case 'invested':
                categoryFieldToUpdate = 'invested';
                break;
              case 'saved':
                categoryFieldToUpdate = 'saved';
                break;
              default:
                categoryFieldToUpdate = null;
            }
            if (categoryFieldToUpdate) {
              await createOrUpdateNetworth(
                context.user._id,
                year,
                month,
                input.amount,
                0,
                0,
                0,
              )
              console.log('input expense')
            }

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

      createGoals: async (parent, { input }, context) => {
        if (context.user) {
          
          console.log(input)

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
module.exports = resolvers;

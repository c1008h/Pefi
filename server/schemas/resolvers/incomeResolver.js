const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');
const { signToken } = require('../../utils/auth');

const incomeResolvers = {
    Query: {
      me: async (parent, args, context) => {
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
      addIncome: async (parent, { input }, context) => {
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
      deleteIncome: async (parent, { _id } , context) => {
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
    }
}

module.exports = incomeResolvers;
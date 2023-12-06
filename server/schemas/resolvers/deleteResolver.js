const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');
const { signToken } = require('../../utils/auth');

const deleteResolvers = {
    Mutation: {
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
        deleteUser: async (parent, {userId, email, reason }, context) => {
            if (context.user) {
                try {
                    await User.findByIdAndDelete(userId);
                    await Goal.deleteMany({ userId })
                    await Networth.deleteMany({ userId })
                    await Incomes.deleteMany({ userId })
                    await Expenses.deleteMany({ userId })

                    const deleteRecord = new Delete({
                        userId, 
                        email, 
                        reason, 
                        timestamp: new Date()
                    })

                    await deleteRecord()
                    console.log("Successfully deleted account!")
                } catch (error) {
                    console.log("Error: ", error)
                    throw new Error("Failed to delete user!")
                }
            }
            throw new AuthenticationError("You need to be logged in!")
        }
    }
}

module.exports = deleteResolvers;
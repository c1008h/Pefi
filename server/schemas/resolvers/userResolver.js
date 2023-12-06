const { AuthenticationError } = require('apollo-server-express');
const { User, Expenses, Incomes, Goal, Delete, Networth } = require('../../models');
const { signToken } = require('../../utils/auth');

const userResolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { id }) => {
      return User.findOne({ id: id });
    },
    me: async (parent, args, context) => {
      // console.log(context.user)
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
    },
    getAllDelete: async () => {
      return Delete.find()
    }
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
        console.log("CONTEXT: ", email, firstName)
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
    }
  }
}

module.exports = userResolvers;

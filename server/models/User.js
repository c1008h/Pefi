const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        // username: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     trim: true
        // },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        goals: {
            type: Schema.Types.ObjectId,
            ref: 'Goal'
        },
        incomes: {
            type: Schema.Types.ObjectId,
            ref: 'Income'
        },
        expenses: {
            type: Schema.Types.ObjectId,
            ref: 'Expense'
        }
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
)

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});
  
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
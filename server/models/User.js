const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const financeSchema = require('./Finance')
const incomeSchema = require('./Income')
const expenseSchema = require('./Expenses')

const userSchema = new Schema(
    {
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
        goalsGroup: {
            type: Schema.Types.ObjectId,
            ref: 'Goal'
        },
        // financeGroup: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Finance'
        // },
        financeGroup: [financeSchema], // Change to an array of financeSchema
        incomesGroup: [incomeSchema],
        // incomesGroup: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Income'
        // },
        // expensesGroup: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Expense'
        // }
        expensesGroup: [expenseSchema]
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
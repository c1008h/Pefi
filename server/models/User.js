const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const Incomes = require('./Income');
const Expenses = require('./Expenses');
const financeSchema = require('./Finance');

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
        location: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            trim: true
        },
        incomeLevel: {
            type: String,
            trim: true
        },
        birthday: {
            type: Date,
            trim: true
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
        // financeGroup: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'Finance'
        // }],
        financeGroup: financeSchema,
        incomesGroup: [{
            type: Schema.Types.ObjectId,
            ref: 'Incomes'
        }],
        expensesGroup: [{
            type: Schema.Types.ObjectId,
            ref: 'Expenses'
        }]
        // expensesGroup: [Expenses]
    },
    { timestamps: true } ,
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

userSchema.pre('remove', async function(next) {
    const user = this;

    await Expenses.deleteMany({ _id: { $in: user.expensesGroup}})
    await Incomes.deleteMany({ _id: { $in: user.incomesGroup } })
})

const User = model('User', userSchema);

module.exports = User;
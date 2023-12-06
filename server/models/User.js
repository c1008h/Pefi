const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const Incomes = require('./Income');
const Expenses = require('./Expenses');
const financeSchema = require('./Finance');
const Networth = require('./Networth')
const Goal = require('./Goals')

const userSchema = new Schema({
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
    }
},
{ 
    timestamps: true 
},
{
    toJSON: {
        virtuals: true,
    },
})

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
    await Goal.deleteMany({ _id: { $in: user.goalsGroup }})
    await Networth.deleteMany({ _id: { $in: user.networthGroup }})
})

const User = model('User', userSchema);

module.exports = User;
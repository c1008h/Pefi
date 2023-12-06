const { Schema, model } = require('mongoose');
// const User = require('./User');

const expenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    amount: {
        type: Number,
        // required: true,
    },
    frequency: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        // required: true
    }, 
    type: {
        type: String, 
        // required: true
    },
    date: {
        type: String,
        // required: true
    },
    note: {
        type: String
    }
}, 
    { timestamps: true } 
)
// expenseSchema.pre('remove', async function (next) {
//     const expense = this;

//     const user = await User.findOne({ expensesGroup: expense._id })
    
//     if (user) {
//         user.expensesGroup.pull(expense._id)
//         await user.save()
//     }

//     next()
// })

const Expenses = model('Expenses', expenseSchema);

module.exports = Expenses;
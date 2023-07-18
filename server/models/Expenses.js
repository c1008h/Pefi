const { Schema } = require('mongoose');

const expenseSchema = new Schema({
    expenseId: {
        type: ID,
    },
    amount: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const Goal = model('Expenses', expenseSchema);
module.exports = Expenses;
const { Schema } = require('mongoose');

const expenseSchema = new Schema({
    expenseId: {
        type: ID,
    },
    expense_total: {
        type: Number,
        required: true,
    },
    expense_type: {
        
    },
    date: {
        type: String,
        required: true
    }
})

const Goal = model('Expenses', expenseSchema);
module.exports = Expenses;
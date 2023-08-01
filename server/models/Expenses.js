const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    amount: {
        type: String,
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
}, 
    { timestamps: true } 
)

// const Expenses = model('Expenses', expenseSchema);

module.exports = expenseSchema;
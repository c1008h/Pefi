const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    source: {
        type: String,
        required: true
        
    },
    frequency: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const Income = model('Income', incomeSchema);

module.exports = Income;
const { Schema } = require('mongoose');

const incomeSchema = new Schema({
    incomeId: {
        type: ID,
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

const Goal = model('Income', incomeSchema);
module.exports = Income;
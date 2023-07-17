const { Schema } = require('mongoose');

const incomeSchema = new Schema({
    incomeId: {
        type: ID,
    },
    income_total: {
        type: Number,
        required: true,
    },
    incomeType: {
        
    },
    date: {
        type: String,
        required: true
    }
})

const Goal = model('Income', incomeSchema);
module.exports = Income;
const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
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
        type: String,
    }
},
    { timestamps: true } 
)

const Incomes = model('Incomes', incomeSchema);

module.exports = Incomes;
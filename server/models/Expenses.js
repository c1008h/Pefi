const { Schema } = require('mongoose');

const expenseSchema = new Schema({
    expenseId: {
        type: String,
    },
    number: {
        type: Number,
        required: true,
    }
})
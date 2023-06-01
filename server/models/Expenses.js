const { Schema } = require('mongoose');

const expenseSchema = new Schema({
    expenseId: {
        type: String,
    }
})
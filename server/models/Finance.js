const { Schema, model } = require('mongoose');

const financeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    digital: {
        type: Number,
        required: true,
    },
    cash: {
        type: Number,
        required: true
        
    },
    invested: {
        type: Number,
        required: true
    },
    saved: {
        type: Number,
        required: true
    }
})

const Finance = model('Finance', financeSchema);

module.exports = Finance;
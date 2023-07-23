const { Schema, model } = require('mongoose');

const financeSchema = new Schema({
    id: {
        type: String,
    },
    digital: {
        type: Number,
    },
    cash: {
        type: Number,
        
    },
    invested: {
        type: Number,
    },
    saved: {
        type: Number,
    }
})

const Finance = model('Finance', financeSchema);

module.exports = Finance;
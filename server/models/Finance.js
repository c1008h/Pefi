const { Schema, model } = require('mongoose');

const financeSchema = new Schema({
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
}, 
    { timestamps: true } 
)

const Finance = model('Finance', financeSchema);

module.exports = Finance;
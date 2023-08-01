const { Schema } = require('mongoose');

const financeSchema = new Schema({
    digital: {
        type: String,
    },
    cash: {
        type: String,
    },
    invested: {
        type: String,
    },
    saved: {
        type: String,
    }
})

// const Finance = model('Finance', financeSchema);

module.exports = financeSchema;
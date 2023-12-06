const { Schema, model } = require('mongoose');
// const User = require('./User');

const startSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    digital: {
        type: Number,
        // required: true
    },
    cash: {
        type: Number,
        // required: true
    }, 
    invested: {
        type: Number, 
        // required: true
    },
    saved: {
        type: Number,
        // required: true
    },
    createDate: {
        type: Date
    }
}, 
    { timestamps: true } 
)


const Start = model('Start', startSchema);

module.exports = Start;
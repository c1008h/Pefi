const { Schema, model } = require('mongoose');

const networthSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    year: {
        type: Number,
    },
    month: {
        type: Number,
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
    },
    networth: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
}, 
    { timestamps: true } 
)

const Networth = model('Networth', networthSchema);

module.exports = Networth;
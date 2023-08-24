const { Schema, model } = require('mongoose');

const deleteSchema = new Schema({
    user_id : {
        type: ID,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],

    },
    reason: {
        type: String,
        required: true
    }
},
    { timestamps: true } 
)

const Delete = model('Delete', deleteSchema);

module.exports = Delete;

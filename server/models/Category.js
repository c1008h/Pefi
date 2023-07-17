const { Schema } = require('mongoose');

const categorySchema = new Schema({
    categoryId: {
        type: ID,
    },
    name: {
        type: String,
        required: true
    }

})

const Goal = model('Category', categorySchema);
module.exports = Category;
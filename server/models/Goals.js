const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {
      yearOneSavings: {
        type: Number,
        required: 'You need to leave a goal!'
      },
      yearTwoSavings:{
        type: Number,
        required: 'You need to leave a goal!'
      },
      yearThreeSavings:{
        type: Number,
        required: 'You need to leave a goal!'
      },
      yearFourSavings:{
        type: Number,
        required: 'You need to leave a goal!'
      },
      yearFiveSavings:{
        type: Number,
        required: 'You need to leave a goal!'
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      }
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
);

const Goal = model('Goal', goalSchema);

module.exports = Goal;
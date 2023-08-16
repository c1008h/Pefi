const { Schema, model } = require('mongoose');

const goalSchema = new Schema(
    {
      year: {
        type: Number,
        required: 'You need to leave a goal!'
      },
      invested:{
        type: Number,
        required: 'You need to leave a goal!'
      },
      saved:{
        type: Number,
        required: 'You need to leave a goal!'
      },
      cash:{
        type: Number,
        required: 'You need to leave a goal!'
      },
      digital:{
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
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pollOptionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imgs: { type: Array },
  votes: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        votes: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  poll: { type: mongoose.Types.ObjectId, required: true, ref: 'Poll' },
  highlight: {type: Number, default: 0}
});

module.exports = mongoose.model('PollOption', pollOptionSchema);

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  twitchId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  polls: {
    type: [
      {
        pollId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'Poll',
        },
        votes: { type: Number, required: true },
        voteCap: { type: Number, required: true },
      },
    ],
    required: true,
    default: []
  },
  subTier: {
    type: String,
    required: true,
    default: "Non Subscriber"
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

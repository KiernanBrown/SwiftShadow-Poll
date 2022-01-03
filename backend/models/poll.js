const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  options: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'PollOption' },
  ],
  phase: {
    type: String,
    enum: ['Open', 'Pending', 'Results'],
    default: 'Open',
    required: true,
  },
  voteCap: { type: Number, required: true },
  voteMultipliers: { type: Object, required: true },
});

module.exports = mongoose.model('Poll', pollSchema);

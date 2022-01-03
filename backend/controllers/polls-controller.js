const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Poll = require('../models/poll');
const PollOption = require('../models/poll-option');

// Method to add days to a date
const addDays = (date, days) => {
  let newDate = new Date(date);
  newDate.setTime(newDate.getTime() + days * 24 * 60 * 60 * 1000);
  return newDate;
};

const getPolls = async (req, res, next) => {
  let polls;
  try {
    polls = await Poll.find();
  } catch {
    return next(
      new HttpError('Something went wrong, could not find polls.', 500)
    );
  }

  res
    .status(201)
    .json({ polls: polls.map((poll) => poll.toObject({ getters: true })) });
};

const getPollById = async (req, res, next) => {
  const pollId = req.params.pid;

  let poll;
  try {
    poll = await Poll.findById(pollId);
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a poll.', 500)
    );
  }

  if (!poll) {
    return next(
      new HttpError('Could not find a poll with the provided id.', 404)
    );
  }

  res.json({ poll: poll.toObject({ getters: true }) });
};

const createPoll = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, subtitle, description, deadline, voteCap, voteMultipliers } = req.body;

  const createdPoll = new Poll({
    title,
    subtitle,
    description,
    options: [],
    voteCap,
    voteMultipliers: voteMultipliers || {
      'Tier 1': 2,
      'Tier 2': 3,
      'Tier 3': 6
    }
  });

  if (deadline instanceof Date) {
    createdPoll.deadline = deadline;
  } else if (typeof deadline === 'number') {
    createdPoll.deadline = addDays(Date.now(), deadline);
  } else {
    return next(
      new HttpError(
        'There is an error with the provided deadline, please check your data.',
        422
      )
    );
  }

  try {
    await createdPoll.save();
  } catch (err) {
    const error = new HttpError('Creating poll failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ poll: createdPoll });
};

const updatePoll = async (req, res, next) => {
  const pollId = req.params.pid;
  const { title, subtitle, description, phase } = req.body;

  let poll;
  try {
    poll = await Poll.findById(pollId);
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a poll.', 500)
    );
  }

  if (!poll) {
    return next(
      new HttpError('Could not find a poll with the provided id.', 404)
    );
  }

  poll.title = title || poll.title;
  poll.subtitle = subtitle || poll.subtitle;
  poll.description = description || poll.description;
  poll.phase = phase || poll.phase;

  try {
    await poll.save();
  } catch {
    return next(
      new HttpError('Something went wrong, could not update poll.', 500)
    );
  }

  res.status(200).json({ poll: poll.toObject({ getters: true }) });
};

const deletePoll = async (req, res, next) => {
  const pollId = req.params.pid;

  let poll;
  try {
    poll = await Poll.findById(pollId);
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a poll.', 500)
    );
  }

  if (!poll) {
    return next(
      new HttpError('Could not find a poll with the provided id.', 404)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await poll.remove({ session });
    await PollOption.deleteMany({ _id: poll.options }).session(
      session
    );
    await session.commitTransaction();
    session.endSession();
  } catch {
    return next(
      new HttpError('Something went wrong, could not delete a poll.', 500)
    );
  }

  res.status(200).json({ message: 'Delted poll.' });
};

exports.getPolls = getPolls;
exports.getPollById = getPollById;
exports.createPoll = createPoll;
exports.updatePoll = updatePoll;
exports.deletePoll = deletePoll;

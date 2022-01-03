const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Poll = require('../models/poll');
const PollOption = require('../models/poll-option');
const User = require('../models/user');

const getPollOptionById = async (req, res, next) => {
  const pollOptionId = req.params.poid;

  let pollOption;
  try {
    pollOption = await PollOption.findById(pollOptionId);
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a poll option.', 500)
    );
  }

  if (!pollOption) {
    return next(
      new HttpError('Could not find a poll option with the provided id.', 404)
    );
  }

  res.json({ pollOption: pollOption.toObject({ getters: true }) });
};

const getPollOptionsByPollId = async (req, res, next) => {
  const pollId = req.params.pid;

  let poll;
  try {
    poll = await Poll.findById(pollId).populate('options');
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a poll.', 500)
    );
  }

  if (!poll || poll.options.length === 0) {
    return next(
      new HttpError(
        'Could not find any options for a poll with the provided id.',
        404
      )
    );
  }

  res.status(201).json({
    options: poll.options.map((option) => option.toObject({ getters: true })),
  });
};

const createPollOption = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, description, imgs, votes, poll } = req.body;

  const createdPollOption = new PollOption({
    name,
    description,
    imgs: imgs || [],
    votes: votes || [],
    poll,
  });

  let parentPoll;

  try {
    parentPoll = await Poll.findById(poll);
  } catch (err) {
    return next(
      new HttpError('Creating poll option failed, please try again.', 500)
    );
  }

  if (!parentPoll) {
    return next(
      new HttpError('Could not find a poll with the provided id.', 404)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPollOption.save({ session });
    parentPoll.options.push(createdPollOption);
    await parentPoll.save({ session });
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.dir(err);
    return next(
      new HttpError('Creating poll option failed, please try again.', 500)
    );
  }

  res.status(201).json({ pollOption: createdPollOption });
};

const updatePollOption = async (req, res, next) => {
  const pollOptionId = req.params.poid;
  const { name, description, imgs, votes, poll } = req.body;

  let pollOption;
  try {
    pollOption = await PollOption.findById(pollOptionId);
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a poll option.', 500)
    );
  }

  if (!pollOption) {
    return next(
      new HttpError('Could not find a poll option with the provided id.', 404)
    );
  }

  pollOption.name = name || pollOption.name;
  pollOption.description = description || pollOption.description;
  pollOption.imgs = imgs || pollOption.imgs;
  pollOption.votes = votes || pollOption.votes;
  pollOption.poll = poll || pollOption.poll;

  try {
    await pollOption.save();
  } catch {
    return next(
      new HttpError('Something went wrong, could not update poll option.', 500)
    );
  }

  res.status(200).json({ pollOption: pollOption.toObject({ getters: true }) });
};

const deletePollOption = async (req, res, next) => {
  const pollOptionId = req.params.poid;

  let pollOption;
  try {
    pollOption = await PollOption.findById(pollOptionId).populate('poll');
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a poll option.', 500)
    );
  }

  if (!pollOption) {
    return next(
      new HttpError('Could not find a poll option with the provided id.', 404)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await pollOption.remove({ session });
    pollOption.poll.options.pull(pollOption);
    await pollOption.poll.save({ session });
    await session.commitTransaction();
    session.endSession();
  } catch {
    return next(
      new HttpError(
        'Something went wrong, could not delete a poll option.',
        500
      )
    );
  }

  res.status(200).json({ message: 'Delted poll option.' });
};

const votePollOption = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { userId, pollId, votes } = req.body;

  // Get the user that is voting
  let user;
  try {
    user = await User.findById(userId);
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a user.', 500)
    );
  }

  if (!user) {
    return next(
      new HttpError('Could not find a user with the provided id.', 404)
    );
  }

  let userPoll = user.polls.find((poll) => {
    return poll.pollId.toString() === pollId;
  });

  let initPoll = false;

  // Initialize the poll on the User if it is unitizialized
  if (!userPoll) {
    let poll;
    try {
      poll = await Poll.findById(pollId);
    } catch {
      return next(
        new HttpError(
          'Something went wrong, could not initialize user voting.',
          500
        )
      );
    }

    userPoll = {
      pollId: poll,
      votes: 0,
      voteCap:
        user.subTier === 'Non Subscriber'
          ? poll.voteCap
          : poll.voteCap * poll.voteMultipliers[user.subTier],
    };

    initPoll = true;
  }

  let totalVotes = 0;
  let pendingVotes = [];

  // Initialize information for each option
  for (const el of votes) {
    const { optionId } = el;
    const optionVotes = el.votes;
    let initVoteObj = false;

    let pollOption;
    try {
      pollOption = await PollOption.findById(optionId);
    } catch {
      return next(
        new HttpError(
          'Something went wrong, could not find a poll option.',
          500
        )
      );
    }

    if (!pollOption) {
      return next(
        new HttpError('Could not find a poll option with the provided id.', 404)
      );
    }

    let userVoteObj = pollOption.votes.find((v) => {
      return v.user.toString() === userId;
    });

    // Initialize the user on the Poll Option if it is uninitialized
    if (!userVoteObj) {
      userVoteObj = {
        user,
        votes: 0,
      };
      initVoteObj = true;
    }

    totalVotes += optionVotes;

    if (userVoteObj.votes + optionVotes >= 0) {
      userVoteObj.votes += optionVotes;
      pendingVotes.push({
        pollOption,
        votes: userVoteObj,
        initialized: initVoteObj,
      });
    } else {
      return next(
        new HttpError('Could not apply the specified number of votes.', 422)
      );
    }
  }

  // This following conditional is bugged
  if (
    userPoll.votes + totalVotes <= userPoll.voteCap &&
    userPoll.votes + totalVotes >= 0 
  ) {
    userPoll.votes += totalVotes;
    try {
      if (initPoll) user.polls.push(userPoll);
      const session = await mongoose.startSession();
      session.startTransaction();
      await user.save({ session });
      for (const pendingVote of pendingVotes) {
        if (pendingVote.initialized) {
          pendingVote.pollOption.votes.push(pendingVote.votes);
        }

        if (pendingVote.votes.votes === 0) {
          pendingVote.pollOption.votes.splice(
            pendingVote.pollOption.votes.indexOf(pendingVote),
            1
          );
        }
        await pendingVote.pollOption.save({ session });
      }

      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      console.dir(err);
      return next(new HttpError('Voting failed, please try again.', 500));
    }
  } else {
    return next(
      new HttpError('Could not apply the specified number of votes.', 422)
    );
  }

  res.status(200).json({ message: 'Votes applied.' });
};

exports.getPollOptionById = getPollOptionById;
exports.getPollOptionsByPollId = getPollOptionsByPollId;
exports.createPollOption = createPollOption;
exports.updatePollOption = updatePollOption;
exports.deletePollOption = deletePollOption;
exports.votePollOption = votePollOption;

const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch {
    return next(
      new HttpError('Something went wrong, could not find users.', 500)
    );
  }

  res.status(201).json({ users: users.map((user) => user.toObject({ getters: true})) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

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

  res.json({ user: user.toObject({ getters: true }) });
};

const getUserByTwitchId = async (req, res, next) => {
  const twitchId = req.params.tid;

  let user;
  try {
    user = await User.findOne({ twitchId: twitchId });
  } catch {
    return next(
      new HttpError('Something went wrong, could not find a user.', 500)
    );
  }

  if (!user) {
    return next(
      new HttpError('Could not find a user with the provided twitch id.', 404)
    );
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.dir(errors);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { username, twitchId, image } = req.body;

  const createdUser = new User({
    username,
    twitchId,
    image,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.dir(err);
    const error = new HttpError('Creating user failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

const updateUser = async (req, res, next) => {
  const userId = req.params.uid;
  const { username, twitchId, image, subTier, polls } = req.body;

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

  user.username = username || user.username;
  user.twitchId = twitchId || user.twitchId;
  user.image = image || user.image;
  user.subTier = subTier || user.subTier;
  user.polls = polls || user.polls;

  try {
    await user.save();
  } catch {
    return next(
      new HttpError('Something went wrong, could not update user.', 500)
    );
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

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

  try {
    await user.remove();
  } catch {
    return next(
      new HttpError('Something went wrong, could not delete a user.', 500)
    );
  }

  res.status(200).json({ message: 'Delted user.' });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUserByTwitchId = getUserByTwitchId;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

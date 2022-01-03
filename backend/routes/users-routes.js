const { Router } = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:uid', usersController.getUserById);

router.post(
  '/',
  [
    check('username').notEmpty(),
    check('twitchId').notEmpty()
  ],
  usersController.createUser
);

router.patch('/:uid', usersController.updateUser);

router.delete('/:uid', usersController.deleteUser);

module.exports = router;
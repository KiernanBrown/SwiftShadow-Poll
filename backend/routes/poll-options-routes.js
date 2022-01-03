const { Router } = require('express');
const { check } = require('express-validator');

const pollOptionsController = require('../controllers/poll-options-controller');

const router = Router();
router.get('/:poid', pollOptionsController.getPollOptionById);

router.get('/poll/:pid', pollOptionsController.getPollOptionsByPollId);

router.post(
  '/',
  [
    check('name').notEmpty(),
    check('description').isLength({ min: 5 }),
    check('poll').notEmpty(),
  ],
  pollOptionsController.createPollOption
);

router.post(
  '/vote',
  [
    check('userId').notEmpty(),
    check('pollId').notEmpty(),
    check('votes').isArray({min: 1})
  ],
  pollOptionsController.votePollOption
);

router.patch('/:poid', pollOptionsController.updatePollOption);

router.delete('/:poid', pollOptionsController.deletePollOption);

module.exports = router;

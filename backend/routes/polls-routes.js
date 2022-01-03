const { Router } = require('express');
const { check } = require('express-validator');

const pollsController = require('../controllers/polls-controller');

const router = Router();

router.get('/', pollsController.getPolls);

router.get('/:pid', pollsController.getPollById);

router.post(
  '/',
  [
    check('title').notEmpty(),
    check('subtitle').isLength({ min: 5 }),
    check('deadline').exists(),
  ],
  pollsController.createPoll
);

router.patch('/:pid', pollsController.updatePoll);

router.delete('/:pid', pollsController.deletePoll);

module.exports = router;

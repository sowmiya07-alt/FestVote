const express = require('express');
const router = express.Router();
const { castVote, getMyVotes, getVoteStatus } = require('../controllers/voteController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, castVote);
router.get('/my-votes', protect, getMyVotes);
router.get('/status/:categoryId', protect, getVoteStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getNominees, getNomineesByCategory, getNomineeById, createNominee, updateNominee, deleteNominee } = require('../controllers/nomineeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getNominees)
    .post(protect, admin, createNominee);

router.get('/category/:categoryId', protect, getNomineesByCategory);

router.route('/:id')
    .get(protect, getNomineeById)
    .put(protect, admin, updateNominee)
    .delete(protect, admin, deleteNominee);

module.exports = router;

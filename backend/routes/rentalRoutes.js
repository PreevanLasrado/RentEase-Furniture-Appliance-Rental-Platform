const express = require('express');
const router = express.Router();
const {
  createRental,
  getMyRentals,
  updateRental,
} = require('../controllers/rentalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createRental);
router.route('/my').get(protect, getMyRentals);
router.route('/:id').put(protect, updateRental);

module.exports = router;

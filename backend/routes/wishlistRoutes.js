const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// Protect all wishlist routes
router.use(protect);

router.route('/')
  .get(getWishlist);

router.route('/add')
  .post(addToWishlist);

router.route('/remove/:productId')
  .delete(removeFromWishlist);

module.exports = router;

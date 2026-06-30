const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Protect all cart routes
router.use(protect);

router.route('/')
  .get(getCart);

router.route('/add')
  .post(addToCart);

router.route('/update/:id')
  .put(updateCartItem);

router.route('/remove/:id')
  .delete(removeCartItem);

router.route('/clear')
  .delete(clearCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, cancelOrder, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Protect all routes
router.use(protect);

router.post('/', createOrder);
router.get('/my', getMyOrders);
router.put('/:id/cancel', cancelOrder);
router.put('/:id/status', admin, updateOrderStatus);

module.exports = router;

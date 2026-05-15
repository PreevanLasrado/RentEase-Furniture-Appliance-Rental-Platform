const express = require('express');
const router = express.Router();
const {
  createMaintenanceRequest,
  getMyMaintenanceRequests,
  updateMaintenanceStatus,
} = require('../controllers/maintenanceController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/').post(protect, createMaintenanceRequest);
router.route('/my').get(protect, getMyMaintenanceRequests);
router.route('/:id').put(protect, admin, updateMaintenanceStatus);

module.exports = router;

const Maintenance = require('../models/Maintenance');

// @desc    Create a maintenance request
// @route   POST /api/maintenance
// @access  Private
const createMaintenanceRequest = async (req, res, next) => {
  try {
    const { rentalId, issue } = req.body;

    const maintenance = new Maintenance({
      user: req.user._id,
      rentalId,
      issue,
    });

    const createdRequest = await maintenance.save();
    res.status(201).json(createdRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user maintenance requests
// @route   GET /api/maintenance/my
// @access  Private
const getMyMaintenanceRequests = async (req, res, next) => {
  try {
    const requests = await Maintenance.find({ user: req.user._id }).populate('rentalId');
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Update maintenance request status
// @route   PUT /api/maintenance/:id
// @access  Private/Admin
const updateMaintenanceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const request = await Maintenance.findById(req.params.id);

    if (request) {
      request.status = status || request.status;
      const updatedRequest = await request.save();
      res.json(updatedRequest);
    } else {
      res.status(404);
      throw new Error('Maintenance request not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMaintenanceRequest,
  getMyMaintenanceRequests,
  updateMaintenanceStatus,
};

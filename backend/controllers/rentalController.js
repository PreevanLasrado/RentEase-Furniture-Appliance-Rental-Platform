const Rental = require('../models/Rental');

// @desc    Create new rental
// @route   POST /api/rentals
// @access  Private
const createRental = async (req, res, next) => {
  try {
    const {
      products,
      startDate,
      endDate,
      deliveryAddress,
      totalAmount,
    } = req.body;

    if (products && products.length === 0) {
      res.status(400);
      throw new Error('No products provided for rental');
    } else {
      const rental = new Rental({
        user: req.user._id,
        products,
        startDate,
        endDate,
        deliveryAddress,
        totalAmount,
      });

      const createdRental = await rental.save();
      res.status(201).json(createdRental);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user rentals
// @route   GET /api/rentals/my
// @access  Private
const getMyRentals = async (req, res, next) => {
  try {
    const rentals = await Rental.find({ user: req.user._id }).populate('products.product', 'name images');
    res.json(rentals);
  } catch (error) {
    next(error);
  }
};

// @desc    Update rental status
// @route   PUT /api/rentals/:id
// @access  Private
const updateRental = async (req, res, next) => {
  try {
    const { rentalStatus, paymentStatus } = req.body;
    const rental = await Rental.findById(req.params.id);

    if (rental) {
      // Check if user is admin or the owner of the rental
      if (req.user.role !== 'admin' && rental.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this rental');
      }

      rental.rentalStatus = rentalStatus || rental.rentalStatus;
      rental.paymentStatus = paymentStatus || rental.paymentStatus;

      const updatedRental = await rental.save();
      res.json(updatedRental);
    } else {
      res.status(404);
      throw new Error('Rental not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRental,
  getMyRentals,
  updateRental,
};

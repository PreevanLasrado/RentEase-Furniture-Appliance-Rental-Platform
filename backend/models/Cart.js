const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, 'Quantity cannot be less than 1'],
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Explicitly define collection name as 'carts'
const Cart = mongoose.model('Cart', cartSchema, 'carts');

module.exports = Cart;

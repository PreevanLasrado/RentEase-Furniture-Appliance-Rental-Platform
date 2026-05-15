const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        monthlyRent: {
          type: Number,
          required: true,
        },
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    rentalStatus: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;

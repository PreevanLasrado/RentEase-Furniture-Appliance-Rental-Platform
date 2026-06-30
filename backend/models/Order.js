const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
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
        rent: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      houseFlat: { type: String, required: true },
      street: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Pending',
    },
    rentalDuration: {
      type: Number, // 3, 6, 9, 12 months
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    deliveryTime: {
      type: String,
      enum: ['Morning', 'Afternoon', 'Evening'],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    securityDeposit: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['Confirmed', 'Processing', 'Delivered', 'Cancelled', 'Completed', 'Returned'],
      default: 'Confirmed',
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('validate', async function () {
  if (!this.orderId) {
    try {
      const count = await mongoose.model('Order').countDocuments();
      const year = new Date().getFullYear();
      const sequence = String(count + 1).padStart(6, '0');
      this.orderId = `RENT-${year}-${sequence}`;
    } catch (err) {
      throw err;
    }
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: {
      type: String,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    securityDeposit: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

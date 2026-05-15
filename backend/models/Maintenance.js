const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rentalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rental',
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;

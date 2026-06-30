const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    const adminEmail = 'rentease@admin.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const adminUser = new User({
        fullName: 'RentEase Admin',
        email: adminEmail,
        password: 'rentease@admin', // Model pre-save hook will hash this
        phone: '+91 54654 23854',
        role: 'admin',
      });

      await adminUser.save();
      console.log('Default Admin Created');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

module.exports = createAdmin;

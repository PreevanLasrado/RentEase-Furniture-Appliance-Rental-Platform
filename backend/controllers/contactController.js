const Contact = require('../models/Contact');

// @desc    Create new contact enquiry
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, city, subject, message } = req.body;

    // Simple sanitization & validation
    if (!name || !email || !phone || !city || !subject || !message) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    // Additional validations
    if (name.length < 3) {
      res.status(400);
      throw new Error('Name must be at least 3 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error('Please provide a valid email address');
    }

    if (phone.length !== 10 || isNaN(phone)) {
      res.status(400);
      throw new Error('Phone number must be exactly 10 digits');
    }

    if (message.length < 20) {
      res.status(400);
      throw new Error('Message must be at least 20 characters');
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      city,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact enquiries
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getContacts,
};

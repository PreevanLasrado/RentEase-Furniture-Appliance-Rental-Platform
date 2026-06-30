const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const outOfStockProducts = await Product.countDocuments({ stockStatus: 'Out of Stock' });

    const orders = await Order.find({ paymentStatus: 'Paid' });
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Fetch all orders and products
    const allOrders = await Order.find({})
      .populate('user', 'fullName email')
      .populate('products.product', 'name category images monthlyRent')
      .sort({ createdAt: -1 });
      
    const allProducts = await Product.find({})
      .populate('category', 'categoryName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        totalUsers,
        outOfStockProducts,
        totalRevenue,
      },
      orders: allOrders,
      products: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};

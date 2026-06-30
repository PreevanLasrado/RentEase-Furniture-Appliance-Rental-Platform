const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const {
      products,
      address,
      paymentMethod,
      paymentStatus = 'Paid',
      rentalDuration,
      deliveryDate,
      deliveryTime,
      totalAmount,
      monthlyRent,
      securityDeposit,
      saveAddress = false,
    } = req.body;

    if (!products || products.length === 0) {
      res.status(400);
      throw new Error('No items in order');
    }

    // Attempt to atomically lock each product in the order to prevent race conditions / double bookings
    const lockedProducts = [];
    for (const item of products) {
      const qty = item.quantity || 1;
      const updatedProduct = await Product.findOneAndUpdate(
        { 
          _id: item.product, 
          stock: { $gte: qty } 
        },
        { 
          $inc: { stock: -qty } 
        },
        { new: true }
      );

      if (!updatedProduct) {
        // If update fails, product is already rented or out of stock. Rollback locks on other products!
        for (const rollback of lockedProducts) {
          const prod = await Product.findByIdAndUpdate(
            rollback.id,
            { $inc: { stock: rollback.qty } },
            { new: true }
          );
          if (prod) {
            prod.availability = prod.stock > 0;
            prod.stockStatus = prod.stock > 0 ? 'In Stock' : 'Out of Stock';
            await prod.save();
          }
        }
        res.status(400);
        throw new Error('One or more products in your cart have gone out of stock. Please update your cart.');
      }

      // Sync status
      updatedProduct.availability = updatedProduct.stock > 0;
      updatedProduct.stockStatus = updatedProduct.stock > 0 ? 'In Stock' : 'Out of Stock';
      await updatedProduct.save();

      lockedProducts.push({ id: item.product, qty });
    }

    // Create the order
    let order;
    try {
      order = await Order.create({
        user: req.user._id,
        products,
        address,
        paymentMethod,
        paymentStatus,
        rentalDuration,
        deliveryDate,
        deliveryTime,
        totalAmount,
        monthlyRent,
        securityDeposit,
      });
    } catch (createError) {
      // If order creation fails, rollback the locks!
      for (const rollback of lockedProducts) {
        const prod = await Product.findByIdAndUpdate(
          rollback.id,
          { $inc: { stock: rollback.qty } },
          { new: true }
        );
        if (prod) {
          prod.availability = prod.stock > 0;
          prod.stockStatus = prod.stock > 0 ? 'In Stock' : 'Out of Stock';
          await prod.save();
        }
      }
      throw createError;
    }

    // If the user wants to save this address, update user document
    if (saveAddress && address) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.address = {
          street: `${address.houseFlat ? address.houseFlat + ', ' : ''}${address.street}${address.area ? ', ' + address.area : ''}`,
          city: address.city,
          state: address.state,
          zipCode: address.pincode,
          country: 'India',
        };
        if (address.phone) {
          user.phone = address.phone;
        }
        await user.save();
      }
    }

    // Clear user's cart in backend
    await Cart.deleteMany({ user: req.user._id });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: 'products.product',
        select: 'name category subCategory images availability stock description specifications deliveryTime badge monthlyRent',
      })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    if (order.orderStatus === 'Delivered') {
      res.status(400);
      throw new Error('Cannot cancel a delivered order');
    }

    if (order.orderStatus === 'Cancelled') {
      res.status(400);
      throw new Error('Order is already cancelled');
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    // Release locks on products
    for (const item of order.products) {
      const qty = item.quantity || 1;
      const prod = await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: qty } },
        { new: true }
      );
      if (prod) {
        prod.availability = prod.stock > 0;
        prod.stockStatus = prod.stock > 0 ? 'In Stock' : 'Out of Stock';
        await prod.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    const oldStatus = order.orderStatus;
    order.orderStatus = orderStatus;
    await order.save();

    // If order is cancelled, completed, or returned, restock the products
    if (
      (orderStatus === 'Cancelled' && oldStatus !== 'Cancelled') ||
      (orderStatus === 'Completed' && oldStatus !== 'Completed') ||
      (orderStatus === 'Returned' && oldStatus !== 'Returned')
    ) {
      for (const item of order.products) {
        const qty = item.quantity || 1;
        const prod = await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: qty } },
          { new: true }
        );
        if (prod) {
          prod.availability = prod.stock > 0;
          prod.stockStatus = prod.stock > 0 ? 'In Stock' : 'Out of Stock';
          await prod.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${orderStatus}`,
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  cancelOrder,
  updateOrderStatus,
};

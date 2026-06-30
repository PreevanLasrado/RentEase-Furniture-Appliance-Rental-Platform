const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get logged-in user's cart items
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id })
      .populate({
        path: 'product',
        select: 'name category subCategory monthlyRent securityDeposit images availability stock description specifications tenureOptions deliveryTime badge',
      })
      .sort({ createdAt: -1 });

    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart (increase quantity if exists)
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, monthlyRent } = req.body;

    if (!productId) {
      res.status(400);
      throw new Error('Product ID is required');
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Check if item already exists in user's cart
    let cartItem = await Cart.findOne({ user: req.user._id, product: productId });

    if (cartItem) {
      cartItem.quantity += Number(quantity);
      if (monthlyRent) {
        cartItem.monthlyRent = Number(monthlyRent);
      }
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user._id,
        product: productId,
        quantity: Number(quantity),
        monthlyRent: monthlyRent || product.monthlyRent,
      });
    }

    // Populate product details for the response
    await cartItem.populate({
      path: 'product',
      select: 'name category subCategory monthlyRent securityDeposit images availability stock description specifications tenureOptions deliveryTime badge',
    });

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:id
// @access  Private
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity, monthlyRent } = req.body;
    const cartItemId = req.params.id;

    if (quantity === undefined && monthlyRent === undefined) {
      res.status(400);
      throw new Error('Quantity or Monthly Rent is required');
    }

    const cartItem = await Cart.findOne({ _id: cartItemId, user: req.user._id });

    if (!cartItem) {
      res.status(404);
      throw new Error('Cart item not found');
    }

    if (quantity !== undefined) {
      const qtyNum = Number(quantity);
      if (qtyNum <= 0) {
        await Cart.findByIdAndDelete(cartItemId);
        return res.status(200).json({
          success: true,
          message: 'Item removed from cart',
          removed: true,
        });
      }
      cartItem.quantity = qtyNum;
    }

    if (monthlyRent !== undefined) {
      cartItem.monthlyRent = Number(monthlyRent);
    }

    await cartItem.save();

    await cartItem.populate({
      path: 'product',
      select: 'name category subCategory monthlyRent securityDeposit images availability stock description specifications tenureOptions deliveryTime badge',
    });

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:id
// @access  Private
const removeCartItem = async (req, res, next) => {
  try {
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!cartItem) {
      res.status(404);
      throw new Error('Cart item not found');
    }

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart for the logged-in user
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = async (req, res, next) => {
  try {
    await Cart.deleteMany({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};

const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get logged-in user's wishlist items
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res, next) => {
  try {
    const wishlistItems = await Wishlist.find({ user: req.user._id })
      .populate({
        path: 'product',
        populate: {
          path: 'category',
          select: 'categoryName',
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(wishlistItems);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a product to user's wishlist
// @route   POST /api/wishlist/add
// @access  Private
const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

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

    // Check if product already exists in user's wishlist
    let wishlistItem = await Wishlist.findOne({ user: req.user._id, product: productId });

    if (wishlistItem) {
      await wishlistItem.populate({
        path: 'product',
        populate: {
          path: 'category',
          select: 'categoryName',
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Product already in wishlist',
        wishlistItem,
      });
    }

    wishlistItem = await Wishlist.create({
      user: req.user._id,
      product: productId,
    });

    // Populate product details for the response
    await wishlistItem.populate({
      path: 'product',
      populate: {
        path: 'category',
        select: 'categoryName',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Added to Wishlist',
      wishlistItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a product from user's wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      res.status(400);
      throw new Error('Product ID is required');
    }

    const wishlistItem = await Wishlist.findOneAndDelete({
      user: req.user._id,
      product: productId,
    });

    if (!wishlistItem) {
      res.status(404);
      throw new Error('Product not found in wishlist');
    }

    res.status(200).json({
      success: true,
      message: 'Removed from Wishlist',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

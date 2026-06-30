const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate('category', 'categoryName');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'categoryName');

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subCategory,
      monthlyRent,
      securityDeposit,
      stock,
      images,
      description,
    } = req.body;

    const product = new Product({
      name,
      category,
      subCategory,
      monthlyRent,
      securityDeposit,
      stock,
      images,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subCategory,
      monthlyRent,
      securityDeposit,
      stock,
      images,
      description,
      availability,
      stockStatus,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.monthlyRent = monthlyRent || product.monthlyRent;
      product.securityDeposit = securityDeposit || product.securityDeposit;
      product.images = images || product.images;
      product.description = description || product.description;
      if (stock !== undefined) {
        product.stock = Number(stock);
        product.availability = Number(stock) > 0;
        product.stockStatus = Number(stock) > 0 ? 'In Stock' : 'Out of Stock';
      } else if (stockStatus !== undefined) {
        product.stockStatus = stockStatus;
        if (stockStatus === 'Out of Stock') {
          product.availability = false;
          product.stock = 0;
        } else if (stockStatus === 'In Stock') {
          product.availability = true;
          if (product.stock <= 0) {
            product.stock = 1;
          }
        }
      } else if (availability !== undefined) {
        product.availability = availability;
        product.stockStatus = availability ? 'In Stock' : 'Out of Stock';
        if (availability && product.stock <= 0) {
          product.stock = 1;
        } else if (!availability) {
          product.stock = 0;
        }
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

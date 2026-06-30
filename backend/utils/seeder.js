const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Category = require('../models/Category');
const Product = require('../models/Product');

// Load environment variables from the parent backend folder
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in your backend/.env file');
    }

    console.log('Connecting to database...');
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully!');

    // Read and parse mock data from frontend
    const frontendDataPath = path.join(__dirname, '../../frontend/src/data/furnitureAppliancesData.js');
    if (!fs.existsSync(frontendDataPath)) {
      throw new Error(`Mock data file not found at: ${frontendDataPath}`);
    }

    console.log('Reading mock data from frontend...');
    let content = fs.readFileSync(frontendDataPath, 'utf8');

    // Convert ES Modules to CommonJS format
    content = content.replace(/export const categories =/g, 'const categories =');
    content = content.replace(/export const products =/g, 'const products =');
    content += '\nmodule.exports = { categories, products };';

    const tempFilePath = path.join(__dirname, 'tempData.js');
    fs.writeFileSync(tempFilePath, content);
    
    const { categories: mockCategories, products: mockProducts } = require(tempFilePath);
    
    // Clean up temp file
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    console.log(`Loaded ${mockCategories.length} categories and ${mockProducts.length} products from mock file.`);

    // 1. Clear existing collections
    console.log('Clearing existing products and categories from database...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Collections cleared.');

    // 2. Seed Categories
    console.log('Seeding categories...');
    const categoryMap = {};
    for (const cat of mockCategories) {
      // Avoid duplicate categories in database
      if (!categoryMap[cat.name]) {
        const createdCategory = await Category.create({
          categoryName: cat.name,
          image: cat.image,
        });
        categoryMap[cat.name] = createdCategory._id;
        console.log(`Seeded Category: ${cat.name}`);
      }
    }

    // 3. Seed Products
    console.log('Seeding products...');
    const productsToInsert = mockProducts.map((prod) => {
      // Find category ID from seeded categories
      const categoryId = categoryMap[prod.category];
      if (!categoryId) {
        console.warn(`Warning: Category "${prod.category}" not found for product "${prod.name}". Defaulting to a newly created category or first available.`);
      }

      return {
        name: prod.name,
        category: categoryId || Object.values(categoryMap)[0],
        subCategory: prod.category, // e.g. "Sofas"
        material: prod.material,
        monthlyRent: prod.monthlyRent,
        securityDeposit: prod.securityDeposit,
        rating: prod.rating,
        reviewsCount: prod.reviewsCount,
        stock: prod.stock,
        deliveryTime: prod.deliveryTime,
        badge: prod.badge,
        images: prod.images && prod.images.length > 0 ? prod.images : [prod.image],
        description: prod.description,
        specifications: prod.specifications || {},
        tenureOptions: prod.tenureOptions || [],
        availability: prod.stock > 0,
      };
    });

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`Seeded ${insertedProducts.length} products successfully!`);

    mongoose.connection.close();
    console.log('Database connection closed. Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed with error:', error);
    process.exit(1);
  }
};

seedDB();

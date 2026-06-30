const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryURI = process.env.MONGO_URI;
  const fallbackURI = 'mongodb://127.0.0.1:27017/RentEase';
  
  try {
    console.log('Connecting to primary MongoDB (Atlas)...');
    const conn = await mongoose.connect(primaryURI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Primary MongoDB connection failed: ${error.message}`);
    console.log(`Attempting fallback to local MongoDB (${fallbackURI})...`);
    try {
      const conn = await mongoose.connect(fallbackURI, {
        serverSelectionTimeoutMS: 5000 // 5 seconds timeout
      });
      console.log(`MongoDB Connected (Local): ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`Local MongoDB connection also failed: ${fallbackError.message}`);
      console.error('Server will run without a database connection. Database operations will fail.');
    }
  }
};

module.exports = connectDB;

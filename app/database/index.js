const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to the database");
  } catch (err) {
    console.log("Error while connecting to the database", err);
  }
};

module.exports = connectDB;

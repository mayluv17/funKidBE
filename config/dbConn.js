const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Wait for the connection to be established and assign to a variable
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log the connection host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;

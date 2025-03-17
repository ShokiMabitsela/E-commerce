import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables from the .env file

// Export environment variables
export const MONGODB_URI = process.env.MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const FRONTEND_URL = process.env.FRONTEND_URL;
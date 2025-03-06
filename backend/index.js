import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';  // Ensure the userRouter is correctly imported
import productRouter from './routes/productRouter.js';
import User from "./models/userModel.js";  // User Model

// App config
const app = express();
const port = process.env.PORT || 8080;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// API endpoints
app.use('/api/user', userRouter);  
app.use('/api/product', productRouter);

// Ensure the /api/users route exists
app.get('/api/user', async (req, res) => {
  try {
    const users = await User.find().limit(10);  
    return res.json({ users });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => console.log('Server started on PORT:' + port));

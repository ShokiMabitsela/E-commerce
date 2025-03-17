import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const productRouter = Router();

// Add Product route
productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth, // Only admins should be able to add a product
  async (req, res) => {
    try {
      await createProduct(req, res); // Ensure createProduct is awaited here
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// List all products (admin access)
productRouter.get("/list", adminAuth, async (req, res) => {
  try {
    await getAllProducts(req, res); // Ensure async function is properly handled
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove Product (admin access)
productRouter.delete("/remove/:id", adminAuth, async (req, res) => {
  try {
    await deleteProduct(req, res); // Ensure async function is properly handled
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Single Product (admin access)
productRouter.get("/single/:id", adminAuth, async (req, res) => {
  try {
    await getSingleProduct(req, res); // Ensure async function is properly handled
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Product (admin access)
productRouter.put("/update/:id", adminAuth, async (req, res) => {
  try {
    await updateProduct(req, res); // Ensure async function is properly handled
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default productRouter;

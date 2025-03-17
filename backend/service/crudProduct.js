import asyncHandler from "express-async-handler";
import HttpError from "../utils/httpError.js";
import { NOT_FOUND, OK } from "../constants/http.codes.js";
import Product from "../models/productModel.js";

// Create Product
const create = asyncHandler(async (req, res, next) => {
  const { name, description, price, image, category } = req.body;

  if (!name || !description || !price || !image || !category) {
    return next(new HttpError("All fields are required", NOT_FOUND));
  }

  const product = await Product.create({
    name,
    description,
    price,
    image,
    category,
  });

  res.status(OK).json({
    status: "Product created successfully",
    data: product,
  });
});

// Get All Products
const getAll = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(OK).json({
    status: "success",
    result: products.length,
    data: products,
  });
});

//  Get Single Product by ID
const getSingle = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HttpError("No product found with that ID", NOT_FOUND));
  }

  res.status(OK).json({
    status: "success",
    data: product,
  });
});

//  Update Product
const update = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return updated document
    runValidators: true, // Ensure data follows schema rules
  });

  if (!product) {
    return next(new HttpError("No product found with that ID", NOT_FOUND));
  }

  res.status(OK).json({
    status: "Product updated successfully",
    data: product,
  });
});

//  Delete Product
const remove = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new HttpError("No product found with that ID", NOT_FOUND));
  }

  res.status(OK).json({
    status: "Product deleted successfully",
  });
});

export {
  create,
  getAll,
  getSingle,
  update,
  remove,
};

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true, // Trim whitespace
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
      trim: true, // Trim whitespace
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: [0, "Price must be a positive number"], // Ensure price is not negative
    },
    image: {
      type: [String], // Store array of image URLs
      required: [true, "Please provide product images"],
      validate: {
        validator: function (value) {
          return value.length > 0; // Ensure at least one image is provided
        },
        message: "At least one image is required",
      },
    },
    category: {
      type: String,
      required: [true, "Please select a product category"],
      trim: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt timestamps
  }
);

// Method to omit specified fields from the product object
productSchema.methods.omitField = function (fields) {
  const product = this.toObject(); // Convert Mongoose document to plain JavaScript object

  // Ensure fields is an array
  const fieldsToOmit = Array.isArray(fields) ? fields : [fields];

  fieldsToOmit.forEach((field) => {
    delete product[field]; // Delete each specified field
  });

  return product; // Return the modified object without the omitted fields
};

// Method to update product fields
productSchema.methods.updateProduct = async function (updates) {
  Object.keys(updates).forEach((key) => {
    this[key] = updates[key]; // Update each specified field
  });
  await this.save(); // Save updated product
};

const Product = mongoose.model("Product", productSchema);

export default Product;

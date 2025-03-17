import { z } from "zod";

const updateProductSchema = z
  .object({
    name: z.string().min(1, "Product name is required").optional(), // Name must be a non-empty string, optional
    description: z.string().min(1, "Product description is required").optional(), // Description must be a non-empty string, optional
    price: z
      .number()
      .positive("Price must be a positive number")
      .optional(), // Price must be a positive number, optional
    image: z
      .array(z.string().url("Image must be a valid URL"))
      .min(1, "At least one image is required")
      .optional(), // Must be an array of valid URLs, optional
    category: z.string().min(1, "Category is required").optional(), // Category must be a non-empty string, optional
  })
  .strict();

export default updateProductSchema;

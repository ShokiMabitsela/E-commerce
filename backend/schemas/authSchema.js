import { z } from "zod";
import User from "../models/userModel.js";

export const emailSchema = z.string().email("Invalid email");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters, got it!");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: passwordSchema,
    role: z.enum(["User", "Admin"]).default("User"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

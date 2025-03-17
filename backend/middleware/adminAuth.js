import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

import HttpError from "../utils/httpError.js";
import {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../constants/http.codes.js";

const adminAuth = asyncHandler(async (req, res, next) => {
  const Token = req.cookies.accessToken;

  if (!Token) {
    return next(new HttpError("Not Authorized. Please login again", UNAUTHORIZED));
  }

  // Decode the token (no verification yet)
  const token_decode = jwt.decode(Token);

  if (!token_decode || !token_decode.id) {
    return next(new HttpError("Not Authorized. Please login again", UNAUTHORIZED));
  }

  // Find user based on decoded token
  const user = await User.findById(token_decode.id).select("-password");

  if (!user) {
    return next(new HttpError("Not authorized, user not found", NOT_FOUND));
  }

  // Retrieve user's current jwt_secret from the database
  const currentJwtSecret = user.jwt_secret;

  if (!currentJwtSecret) {
    return next(
      new HttpError(
        "Server error: User jwt_secret missing",
        INTERNAL_SERVER_ERROR
      )
    );
  }

  // Verify the access token against the user's current jwt_secret
  try {
    jwt.verify(Token, currentJwtSecret); // Use user's jwt_secret for verification
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (verificationError) {
    return next(new HttpError("Not authorized, invalid token", UNAUTHORIZED));
  }
});

// Middleware to authorize based on user roles
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new HttpError("Not authorized", FORBIDDEN));
    }
    next(); // Proceed to the next middleware or route handler
  };
};

export { adminAuth, authorizeRoles };
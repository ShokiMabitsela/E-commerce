import { NODE_ENV } from "../constants/env.const.js";
import { after90Days } from "../constants/date.const.js";
import generateAccessToken from "./generateAccessToken.js";
import generateRefreshToken from "./generateRefreshToken.js";

const generateToken = async (user, res) => {
  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // Store refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Failed to generate tokens"); // Ensure errors are propagated
  }
};


const setAuthCookies = (res, accessToken, refreshToken) => {
  if (!res.headersSent) {
    res.cookie("accessToken", accessToken, accessCookieOptions());
    res.cookie("refreshToken", refreshToken, refreshCookieOptions());
  } else {
    console.error("Headers already sent; cannot set cookies.");
  }
};


const accessCookieOptions = () => ({
  httpOnly: true,
  sameSite: "strict",
  secure: NODE_ENV === "production", // Use secure cookies only in production
  expires: after90Days(), // This should match the JWT expiration
  //domain: ".your-domain.com", // Did not work
  path: "/api", // Adjust as needed
  //priority: "medium",
});

const refreshCookieOptions = () => ({
  httpOnly: true,
  sameSite: "strict",
  secure: NODE_ENV === "production", // Use secure cookies only in production
  expires: after90Days(), // Long-lived refresh token
  path: "/api/refresh", // Adjust as needed, separate endpoint for refresh
});

export default generateToken;


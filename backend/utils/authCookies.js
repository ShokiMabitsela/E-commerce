
export const clearAuthCookies = (res) => {
  res.clearCookie("jwt_token"); // Clear the access token cookie (adjust name if needed)
  res.clearCookie("refreshToken"); // Clear the refresh token cookie (if used)
};

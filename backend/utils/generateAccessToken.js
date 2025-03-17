import jwt from "jsonwebtoken";


const generateAccessToken = (user) => {
  const jwtOptions = {
    expiresIn: "15m", // Short-lived access token
    issuer: "csb.com",
    audience: "API",
  };
  return jwt.sign(
    {
      id: user._id,
    },
    user.jwt_secret,
    jwtOptions
  );
};

export default generateAccessToken;

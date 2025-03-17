import crypto from "crypto";


const generateRefreshToken = async (user) => {
  const random = crypto.randomBytes(64);
  const refreshToken = random.toString("hex");

  // TODO: Store the refreshToken in a database associated with the user
  return refreshToken;
};

export default generateRefreshToken;

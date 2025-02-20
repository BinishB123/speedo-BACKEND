import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
dotenvConfig()

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET
  return jwt.sign({ id: userId }, secretKey, { expiresIn: "2h" });
};

export {generateToken}

import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT ;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_OPTIONS = {
  expiresIn: 60,
};

export default {
  JWT_SECRET,
  PORT,
};

import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGO_CONNECT: process.env.MONGO_CONNECT,
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
};

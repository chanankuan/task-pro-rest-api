import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGO_CONNECT: process.env.MONGO_CONNECT,
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  CLOUDINARY_ClOUD_NAME: process.env.CLOUDINARY_ClOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
};

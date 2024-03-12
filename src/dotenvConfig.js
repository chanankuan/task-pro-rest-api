import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGO_CONNECT: process.env.MONGO_CONNECT,
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  KEY_ACCESS: process.env.KEY_ACCESS,
  KEY_REFRESH: process.env.KEY_REFRESH,
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  CLOUDINARY_ClOUD_NAME: process.env.CLOUDINARY_ClOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

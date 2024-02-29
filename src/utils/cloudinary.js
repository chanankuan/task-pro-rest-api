import { v2 as cloudinary } from 'cloudinary';
import dotenvConfig from '../dotenvConfig.js';

cloudinary.config({
  cloud_name: dotenvConfig.CLOUDINARY_ClOUD_NAME,
  api_key: dotenvConfig.CLOUDINARY_API_KEY,
  api_secret: dotenvConfig.CLOUDINARY_SECRET_KEY,
});

export { cloudinary };

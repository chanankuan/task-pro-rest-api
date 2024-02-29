import jwt from 'jsonwebtoken';
import { User } from '../model/index.js';
import dotenvConfig from '../dotenvConfig.js';
import { cloudinary } from '../utils/cloudinary.js';
import { HttpError } from '../helpers/HttpError.js';

const { SECRET_KEY } = dotenvConfig;

const registerUser = async formData => {
  // Create user in db
};

const loginUser = async userId => {
  // Sign token and update it in db
};

const logoutUser = async userId => {
  // Remove token from db
};

const updateUser = async (formData, formFile) => {
  // Update user info in db

  // TODO configure logic to save updated user with image url to DB

  const avatarURL = await saveUserAvatarToCloud(formFile.path);

  return { avatarURL };
};

const saveUserAvatarToCloud = async filePath => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'task-pro-avatars',
    });

    return result.url;
  } catch (error) {
    throw HttpError(400);
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
};

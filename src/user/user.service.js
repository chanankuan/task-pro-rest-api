import { User } from './user.model.js';
import { cloudinary } from '../../utils/cloudinary.js';
import { HttpError } from '../../helpers/index.js';

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

export default { updateUser, saveUserAvatarToCloud };

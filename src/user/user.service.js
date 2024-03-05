import { User } from './user.model.js';
import { cloudinary } from '../utils/cloudinary.js';
import { HttpError } from '../helpers/index.js';
import { CLOUDINARY_FOLDER } from '../constants/CloudinaryFolderConstants.js';
import { ImageAvatarService } from '../image/image-avatar.service.js';

const updateUser = async (formData, formFile) => {
  // Update user info in db

  if (!formFile) {
    // TODO configure logic without user avatar
    return;
  }

  // TODO configure logic to save updated user with image url to DB

  await ImageAvatarService.processAvatarImage({ width: 68, height: 68 });
  const avatarURL = await ImageAvatarService.saveImageToCloud(
    CLOUDINARY_FOLDER.AVATARS
  );

  return { avatarURL };
};

const updateTheme = async (userId, theme) => {
  return User.findByIdAndUpdate({ _id: userId }, { theme }, { new: true });
};

export default { updateUser, updateTheme };

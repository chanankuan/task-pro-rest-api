import bcrypt from 'bcryptjs';
import { User } from './user.model.js';
import { CLOUDINARY_FOLDER } from '../constants/CloudinaryFolderConstants.js';
import { ImageAvatarService } from '../image/image-avatar.service.js';

const updateUser = async (userId, formData, formFile) => {
  if (formData.password) {
    formData.password = await bcrypt.hash(formData.password, 10);
  }

  if (!formFile) {
    return User.findByIdAndUpdate({ _id: userId }, formData, {
      new: true,
    }).select({
      name: 1,
      email: 1,
      avatar_url: 1,
      theme: 1,
    });
  }

  await ImageAvatarService.processAvatarImage({ width: 68, height: 68 });
  const avatarURL = await ImageAvatarService.saveImageToCloud(
    CLOUDINARY_FOLDER.AVATARS
  );

  return User.findByIdAndUpdate(
    userId,
    { ...formData, avatar_url: avatarURL },
    { new: true }
  ).select({
    name: 1,
    email: 1,
    avatar_url: 1,
    theme: 1,
  });
};

const updateTheme = async (userId, theme) => {
  return User.findByIdAndUpdate({ _id: userId }, { theme }, { new: true });
};

export default { updateUser, updateTheme };

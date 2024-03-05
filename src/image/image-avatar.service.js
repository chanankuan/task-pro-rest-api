import Jimp from 'jimp';
import fse from 'fs-extra';
import { cloudinary } from '../utils/cloudinary.js';
import { HttpError } from '../helpers/index.js';
import { ImageService } from './image.service.js';

export class ImageAvatarService extends ImageService {
  static async saveImageToCloud(folder) {
    try {
      const result = await cloudinary.uploader.upload(
        super._temporaryFilePath,
        {
          folder,
        }
      );

      await fse.remove(super._temporaryFilePath);

      return result.url;
    } catch (error) {
      throw HttpError(400, 'Cloud connection error');
    }
  }

  static async processAvatarImage(options) {
    const image = await Jimp.read(super._temporaryFilePath);

    return image
      .cover(options?.width ?? 68, options?.height ?? 68)
      .writeAsync(super._temporaryFilePath);
  }
}

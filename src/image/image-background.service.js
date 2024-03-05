import path from 'path';
import Jimp from 'jimp';
import fse from 'fs-extra';
import { cloudinary } from '../utils/cloudinary.js';
import { HttpError } from '../helpers/index.js';
import { ImageService } from './image.service.js';

export class ImageBackgroundService extends ImageService {
  static _temporaryBackgrounds = {
    backgroundDesktopURL: '',
    backgroundDesktop2xURL: '',
    backgroundTabletURL: '',
    backgroundTablet2xURL: '',
    backgroundMobileURL: '',
    backgroundMobile2xURL: '',
    backgroundMinURL: '',
    backgroundMin2xURL: '',
  };

  static async saveBackgroundToCloud(folder) {
    const background = {};
    const uploadPromises = [];

    const uploadImage = async key => {
      try {
        const result = await cloudinary.uploader.upload(
          this._temporaryBackgrounds[key],
          { folder }
        );

        background[key] = result.url;
        await fse.remove(this._temporaryBackgrounds[key]);
      } catch {
        throw HttpError(400, 'Failed to upload image');
      }
    };

    Object.keys(this._temporaryBackgrounds).forEach(key =>
      uploadPromises.push(uploadImage(key))
    );

    try {
      await Promise.all(uploadPromises);
      await fse.remove(super._temporaryFilePath);

      return background;
    } catch {
      throw HttpError(400, 'Cloud connection error');
    }
  }

  static async processBackgroundImages(options) {
    const image = await Jimp.read(super._temporaryFilePath);

    Object.keys(this._temporaryBackgrounds).forEach(key => {
      this._temporaryBackgrounds[key] = image;

      const temporaryCurrentBackgroundPath =
        path.join(super._temporaryDirPath, key) +
        '-' +
        super._temporaryFileName;

      this._temporaryBackgrounds[key]
        .cover(options[key]?.width ?? 200, options[key]?.height ?? 200)
        .writeAsync(temporaryCurrentBackgroundPath);

      this._temporaryBackgrounds[key] = temporaryCurrentBackgroundPath;
    });
  }
}

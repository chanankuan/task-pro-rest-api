import multer from 'multer';
import path from 'path';
import Jimp from 'jimp';
import fse from 'fs-extra';
import { cloudinary } from '../utils/cloudinary.js';
import { HttpError } from '../helpers/index.js';

export class ImageService {
  static #temporaryDirPath;
  static #temporaryFilePath;
  static #temporaryFileName;
  static #temporaryBackgrounds = {
    backgroundDesktopURL: '',
    backgroundDesktop2xURL: '',
    backgroundTabletURL: '',
    backgroundTablet2xURL: '',
    backgroundMobileURL: '',
    backgroundMobile2xURL: '',
    backgroundMinURL: '',
    backgroundMin2xURL: '',
  };

  static saveOriginalTemporaryFile(name, folder) {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        try {
          this.#temporaryDirPath = path.resolve('tmp', folder);

          callback(null, this.#temporaryDirPath);
        } catch ({ message }) {
          throw HttpError(400, message);
        }
      },
      filename: (req, file, callback) => {
        this.#temporaryFilePath = path.join(
          this.#temporaryDirPath,
          file.originalname
        );

        this.#temporaryFileName = file.originalname;
        callback(null, file.originalname);
      },
    });

    const fileFilter = (req, file, callback) => {
      if (!file.mimetype.startsWith('image')) {
        callback(HttpError(400, 'Invalid file format'), false);
        return;
      }

      callback(null, true);
    };

    const multerUpload = multer({
      storage,
      fileFilter,
    });

    return multerUpload.single(name);
  }

  static async saveImageToCloud(folder, options) {
    try {
      const result = await cloudinary.uploader.upload(this.#temporaryFilePath, {
        folder,
      });

      await fse.remove(this.#temporaryFilePath);

      return result.url;
    } catch (error) {
      throw HttpError(400, 'Cloud connection error');
    }
  }

  static async saveBackgroundToCloud(folder, options) {
    const background = {};
    const uploadPromises = [];

    const uploadImage = async key => {
      try {
        const result = await cloudinary.uploader.upload(
          this.#temporaryBackgrounds[key],
          { folder }
        );

        background[key] = result.url;
        await fse.remove(this.#temporaryBackgrounds[key]);
      } catch {
        throw HttpError(400, 'Failed to upload image');
      }
    };

    Object.keys(this.#temporaryBackgrounds).forEach(key =>
      uploadPromises.push(uploadImage(key))
    );

    try {
      await Promise.all(uploadPromises);
      await fse.remove(this.#temporaryFilePath);

      return background;
    } catch {
      throw HttpError(400, 'Cloud connection error');
    }
  }

  static async processAvatarImage(options) {
    const image = await Jimp.read(this.#temporaryFilePath);

    return image
      .cover(options?.width ?? 68, options?.height ?? 68)
      .writeAsync(this.#temporaryFilePath);
  }

  static async processBackgroundImages(options) {
    const image = await Jimp.read(this.#temporaryFilePath);

    Object.keys(this.#temporaryBackgrounds).forEach(key => {
      this.#temporaryBackgrounds[key] = image;

      const temporaryCurrentBackgroundPath =
        path.join(this.#temporaryDirPath, key) + '-' + this.#temporaryFileName;

      this.#temporaryBackgrounds[key]
        .cover(options[key]?.width ?? 200, options[key]?.height ?? 200)
        .writeAsync(temporaryCurrentBackgroundPath);

      this.#temporaryBackgrounds[key] = temporaryCurrentBackgroundPath;
    });
  }
}

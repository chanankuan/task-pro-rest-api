import multer from 'multer';
import path from 'path';
import { HttpError } from '../helpers/index.js';

export class ImageService {
  static _temporaryDirPath;
  static _temporaryFilePath;
  static _temporaryFileName;

  static saveOriginalTemporaryFile(name, folder) {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        try {
          this._temporaryDirPath = path.resolve('tmp', folder);

          callback(null, this._temporaryDirPath);
        } catch ({ message }) {
          throw HttpError(400, message);
        }
      },
      filename: (req, file, callback) => {
        this._temporaryFilePath = path.join(
          this._temporaryDirPath,
          file.originalname
        );

        this._temporaryFileName = file.originalname;
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
}

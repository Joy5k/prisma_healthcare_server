import multer from "multer";
import path from "path";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ICLoudinaryResponse } from "../app/interfaces/file";

cloudinary.config({
  cloud_name: "djicb6wqc",
  api_key: "582291275478236",
  api_secret: "-yONUwsylmN9Jdsf_4gWBqkqvrs",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IFil
): Promise<ICLoudinaryResponse | undefined> => {
  console.log(file);
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICLoudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};

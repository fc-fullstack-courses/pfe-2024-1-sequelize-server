const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { PUBLIC_FOLDER_PATH } = require('../../constants');

const imagesPath = path.resolve(PUBLIC_FOLDER_PATH, 'images');

const documentsPath = path.resolve(PUBLIC_FOLDER_PATH, 'documents');

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

if (!fs.existsSync(documentsPath)) {
  fs.mkdirSync(documentsPath, { recursive: true });
}

const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const documentsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const imagesUpload = multer({ storage: imagesStorage });
const documentsUpload = multer({ storage: documentsStorage });

module.exports.imagesUpload = imagesUpload;
module.exports.documentsUpload = documentsUpload;

const fs = require('fs');
const path = require('path');
const groupRouter = require('express').Router();
const GroupController = require('../controllers/groupController');
const multer = require('multer');

const imagesPath = path.resolve(__dirname, '..', 'public', 'images');

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

groupRouter.post('/', upload.single('pic'), GroupController.createGroup);
groupRouter.get('/', GroupController.getGroups);

groupRouter.get('/:groupId', GroupController.getGroup);

groupRouter.post('/:groupId/users/:userId', GroupController.addUserToGroup);

module.exports = groupRouter;

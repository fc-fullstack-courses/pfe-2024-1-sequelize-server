const groupRouter = require('express').Router();
const GroupController = require('../controllers/groupController');
const { imagesUpload } = require('../utils/multer');

groupRouter.post('/', imagesUpload.single('pic'), GroupController.createGroup);
groupRouter.get('/', GroupController.getGroups);

groupRouter.get('/:groupId', GroupController.getGroup);

groupRouter.post('/:groupId/users/:userId', GroupController.addUserToGroup);

module.exports = groupRouter;

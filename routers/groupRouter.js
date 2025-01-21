const groupRouter = require('express').Router();
const GroupController = require('../controllers/groupController');

groupRouter.post('/', GroupController.createGroup);

groupRouter.post('/:groupId/users/:userId', GroupController.addUserToGroup);

module.exports = groupRouter;
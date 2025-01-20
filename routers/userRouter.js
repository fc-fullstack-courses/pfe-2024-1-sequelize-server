const userRouter = require('express').Router();
const UserController = require('../controllers/userController');
const { findUserById } = require('../middlewares/usersMW');

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getUsers);

userRouter.get('/:userId', findUserById, UserController.getUser);
userRouter.put('/:userId', findUserById, UserController.updateUser);
userRouter.delete('/:userId', findUserById, UserController.deleteUser);

module.exports = userRouter;

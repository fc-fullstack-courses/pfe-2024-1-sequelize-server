const userRouter = require('express').Router();
const todoRouter = require('./todoRouter');
const UserController = require('../controllers/userController');
const { findUserById } = require('../middlewares/usersMW');
const paginate = require('../middlewares/paginate');

userRouter.post('/', UserController.createUser);
userRouter.get('/', paginate, UserController.getUsers);

userRouter.get('/:userId', findUserById, UserController.getUser);
userRouter.put('/:userId', findUserById, UserController.updateUser);
userRouter.delete('/:userId', findUserById, UserController.deleteUser);

userRouter.use('/:userId/todos', findUserById, todoRouter);

module.exports = userRouter;

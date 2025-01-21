const userRouter = require('express').Router();
const UserController = require('../controllers/userController');
const TodoController = require('../controllers/todoController');
const { findUserById } = require('../middlewares/usersMW');

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getUsers);

userRouter.get('/:userId', findUserById, UserController.getUser);
userRouter.put('/:userId', findUserById, UserController.updateUser);
userRouter.delete('/:userId', findUserById, UserController.deleteUser);

userRouter.post('/:userId/todos', findUserById, TodoController.createTodo);
userRouter.get('/:userId/todos', findUserById, TodoController.getTodos);

userRouter.get('/:userId/todos/:todoId', findUserById, TodoController.getTodo);
userRouter.put('/:userId/todos/:todoId', findUserById, TodoController.updateTodo);
userRouter.delete('/:userId/todos/:todoId', findUserById, TodoController.deleteTodo);

module.exports = userRouter;

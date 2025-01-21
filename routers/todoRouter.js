const todoRouter = require('express').Router();
const TodoController = require('../controllers/todoController');

todoRouter.post('/', TodoController.createTodo);
todoRouter.get('/', TodoController.getTodos);

todoRouter.get('/:todoId', TodoController.getTodo);
todoRouter.put('/:todoId', TodoController.updateTodo);
todoRouter.delete('/:todoId', TodoController.deleteTodo);

module.exports = todoRouter;

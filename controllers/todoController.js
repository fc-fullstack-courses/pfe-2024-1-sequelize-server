const NotFoundError = require('../errors/NotFound');
const { Todo } = require('../models');

module.exports.createTodo = async (req, res, next) => {
  try {
    const {
      body,
      user,
      // params: { userId },
    } = req;

    // класичний спосіб створення запису
    // const todo = await Todo.create({
    //   userId,
    //   ...body,
    // });

    // магічний метод секвалайза
    const todo = await user.createTodo(body);

    res.status(201).send({ data: todo });
  } catch (error) {
    next(error);
  }
};

module.exports.getTodos = async (req, res, next) => {
  try {
    const {
      user,
      // params: { userId },
    } = req;

    // const todos = await Todo.findAll({
    //   where: {
    //     userId,
    //   },
    // });

    const todos = await user.getTodos();

    res.status(200).send({ data: todos });
  } catch (error) {
    next(error);
  }
};

module.exports.getTodo = async (req, res, next) => {
  try {
    const {
      user,
      params: { userId, todoId },
    } = req;

    const todo = await Todo.findOne({
      where: {
        id: todoId,
        userId,
      },
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    res.status(200).send({ data: todo });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTodo = async (req, res, next) => {
  try {
    const {
      // user,
      params: { userId, todoId },
      body,
    } = req;

    const [todosUpdated, [todo]] = await Todo.update(body, {
      where: {
        id: todoId,
        userId,
      },
      returning: true,
    });

    if (todosUpdated !== 1) {
      throw new NotFoundError('Todo not found');
    }

    res.status(200).send({ data: todo });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTodo = async (req, res, next) => {
  try {
    const {
      user,
      params: { userId, todoId },
    } = req;

    const todo = await Todo.findOne({
      where: {
        id: todoId,
        userId,
      },
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    // не видаляє а відв'язує від юзера
    // await user.removeTodo(todo);

    await todo.destroy();

    res.status(200).send({ data: todo });
  } catch (error) {
    next(error);
  }
};

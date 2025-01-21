const { Todo } = require('../models');

module.exports.createTodo = async (req, res, next) => {
  try {
    const {
      body,
      user
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


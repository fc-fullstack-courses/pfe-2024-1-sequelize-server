const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  const { body: userData } = req;

  // створення 1 запису (INSERT)
  const user = await User.create(userData);

  // створення багатьох  записів (INSERT)
  // const users = await User.bulkCreate([userData1, userData2]);

  res.status(201).send(user);
};

module.exports.deleteUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  // DELETE from user;
  // await User.destroy();

  // DELETE from user WHERE id = 2;
  // await User.destroy({
  //   where: {
  //     id : 2
  //   }
  // });
  
  // deletedUser - кількість видаленних рядків завжди
  const deletedUser = await User.destroy({
    where: {
      id : userId
    }
  });

  res.status(200).send(`User with id ${userId} deleted`);
};

module.exports.updateUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  res.status(200).send('User updated');
};

module.exports.getUsers = async (req, res, next) => {
  res.status(200).send('All Users returned');
};

module.exports.getUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  res.status(200).send('User returned');
};

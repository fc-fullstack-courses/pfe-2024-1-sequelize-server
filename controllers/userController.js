const { User, Group, Todo } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;

    // створення 1 запису (INSERT)
    const user = await User.create(userData);

    // створення багатьох  записів (INSERT)
    // const users = await User.bulkCreate([userData1, userData2]);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { user } = req;

    // DELETE from user;
    // await User.destroy();

    // DELETE from user WHERE id = 2;
    // await User.destroy({
    //   where: {
    //     id : 2
    //   }
    // });

    // deletedUser - кількість видаленних рядків завжди
    // const deletedUser = await User.destroy({
    //   where: {
    //     id: userId,
    //   },
    // });

    // const user = await User.findByPk(userId);

    // if(!user) {
    //   // якось обробити ситуацію і звершити запит
    // }

    // видалення конкретного екземпляру
    await user.destroy();

    // res.status(200).send(`User with id ${userId} deleted`);
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { user, body: newUserData } = req;

    // UPDATE users SET ... WHERE id = 1;
    // const result = await User.update(newUserData, {
    //   where: {
    //     id: userId,
    //   },
    //   // RETURNING *
    //   returning: true,
    //   // RETURNING first_name, last_name
    //   // returning: ['first_name', 'last_name']
    // });

    // const [rowsUpdated, [updatedUser]] = result;

    // const user = await User.findByPk(userId);

    const updatedUser = await user.update(newUserData, {
      returning: true,
    });

    res.status(200).send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    // SELECT * FROM users;
    // const users = await User.findAll();

    // SELECT id, email, is_male FROM users;
    // const users = await User.findAll({
    //   attributes: ['id', 'email', 'isMale'],
    // });

    // SELECT id, email, is_male AS gender FROM users;
    // const users = await User.findAll({
    //   attributes: ['id', 'email', ['is_male', 'gender']],
    // });

    // SELECT все окрім паролю AS gender FROM users;
    // const users = await User.findAll({
    //   attributes: {
    //     exclude: ['password', 'email'],
    //   },
    // });

    // SELECT *  FROM users WHERE first_name = "User";
    // const users = await User.findAll({
    //   where: {
    //     firstName: 'User'
    //   }
    // });

    // SELECT *  FROM users WHERE first_name = "User" AND lastName = 'Userenko';
    const users = await User.findAll({
      // where: {
      //   firstName: 'User',
      //   lastName: 'Userenko',
      // },
      // якщо до батьківської моделі треба приджойнити декілька інших моделей 
      // одночаасно то кидаємо їх у массиві
      include: [
        {
          model: Group,
          required: true,
          through: {
            attributes: [['created_at', 'created']],
            // перейменування зв'язуючої таблиці у резульаті запиту
            as: 'groupDataOfUser'
          },
          as: 'groups',
        },
        {
          model: Todo,
          required: true,
          // вказую що під'єдную тудушки по ассоціації таск
          as: 'tasks'
        }
      ]
    });

    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const { user } = req;

    // SELECT * FROM users WHERE id = 1;
    // const [user] = await User.findAll({
    //   where: {
    //     id: userId
    //   }
    // });

    // через первинний ключ
    // const user = await User.findByPk(userId);

    // SELECT * FROM users WHERE email = 'admin@gmail.com';
    // повернути перший підходящий запис
    // const user = await User.findOne({
    //   where: {
    //     email: 'admin@gmail.com'
    //   }
    // });

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

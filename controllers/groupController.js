const NotFoundError = require('../errors/NotFound');
const { Group, User, Todo } = require('../db/models');
const GroupService = require('../services/groups.service');

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;

    const group = await GroupService.createGroup(body);

    res.status(201).send({ data: group });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToGroup = async (req, res, next) => {
  try {
    const {
      params: { userId, groupId },
    } = req;

    const group = await Group.findByPk(groupId);

    if (!group) {
      throw new NotFoundError('Group not found');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    await group.addUser(user);

    res.status(200).send({
      data: {
        user,
        group,
      },
    });
  } catch (error) {
    next(error);
  }
  include;
};

module.exports.getGroups = async (req, res, next) => {
  try {
    const {} = req;

    const groups = await Group.findAll({
      include: {
        model: User,
        required: true,
      },
    });

    res.status(200).send({ data: groups });
  } catch (error) {
    next(error);
  }
};

module.exports.getGroup = async (req, res, next) => {
  try {
    const {
      params: { groupId },
    } = req;

    /*
      Отримання даних з асоціацій у секвалайзі:
        - ледаче завантаження (Lazy loading)
        - нетерпеливе завантаження (Eager loading)
    */

    /*
      ледаче завантаження (Lazy loading) - додаткові дані отримають пізніше через окремі запити
      по факту магічні методи секвалайза
    */
    // const group = await Group.findByPk(groupId);

    // const usersInGroup = await group.getUsers();

    // res.status(200).send({ data: { group, usersInGroup } });

    /*
      Нетерпляче завантаження - додаткові дані завантажуються одразу у одному запиті (через JOIN)
    */

    // ліва таблиця
    const group = await Group.findOne({
      where: {
        id: groupId,
      },
      // LEFT JOIN
      // include: User,
      // INNER JOIN
      include: {
        model: User,
        required: true,
        attributes: ['firstName', 'lastName'], // поля які треба дістати з джоінящоїся таблиці
        //  налаштавання для зв'язуючої таблиці
        through: {
          attributes: [], // список атриубтів зі зв'язуючої таблиці (залишайте пустою якщо не хочете її бачити взагалі)
        },
        // джоін на основі юзерів
        // include: {
        //   model: Todo,
        //   required: true,
        //   as: 'tasks',
        // },
      },
      // RIGHT JOIN
      // include: {
      //   model: User,
      //   right: true
      // }
    });

    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};

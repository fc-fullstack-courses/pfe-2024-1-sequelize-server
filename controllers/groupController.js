const NotFoundError = require('../errors/NotFound');
const { Group, User } = require('../models');

module.exports.createGroup = async (req, res, next) => {
  try {
    const {
      body: { userId, ...groupData },
    } = req;

    const group = await Group.create(groupData);

    if (userId) {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      // тут треба додати юзера у группу
      await user.addGroup(group);
      // await group.addUser(user);
    }

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
};

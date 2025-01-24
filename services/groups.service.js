const { Op } = require('sequelize');
const NotFoundError = require('../errors/NotFound');
const { Group, User, Todo } = require('../db/models');

module.exports.createGroup = async (groupData) => {
  const {
    userId,
    userIds,
    file: { filename },
    ...restGroupData
  } = groupData;

  const group = await Group.create({
    ...restGroupData,
    imagePath: filename ? filename : null,
  });

  if (userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // тут треба додати юзера у группу
    await user.addGroup(group);
    // await group.addUser(user);
  }

  console.log(userIds)

  if (userIds) {
    // SELECT * FROM users WHERE id IN (1,11,13)

    const userIdsToFind = Array.isArray(userIds) ? userIds : userIds.split(',');

    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: userIdsToFind,
        },
      },
    });

    await group.addUsers(users);
  }

  const groupWithUsers = await Group.findByPk(group.id, {
    include: {
      model: User,
      // required: true,
      attributes: ['firstName', 'lastName'],
      through: {
        attributes: [],
      },
    },
  });

  return groupWithUsers;
};

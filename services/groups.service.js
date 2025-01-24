const {Op} = require('sequelize'); 
const NotFoundError = require('../errors/NotFound');
const { Group, User, Todo } = require('../db/models');

module.exports.createGroup = async (groupData) => {

  const {userId, userIds, ...restGroupData} = groupData;

  const group = await Group.create(restGroupData);

  if (userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // тут треба додати юзера у группу
    await user.addGroup(group);
    // await group.addUser(user);
  }

  if(userIds) {
    // SELECT * FROM users WHERE id IN (1,11,13)
    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: userIds
        }
      }
    });

    await group.addUsers(users);
  }

  const groupWithUsers = await Group.findByPk(group.id, {
    include: {
      model: User,
      required: true,
      attributes: ['firstName', 'lastName'],
      through: {
        attributes: []
      }
    }
  });

  return groupWithUsers;
}

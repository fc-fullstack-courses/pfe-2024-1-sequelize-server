const { User } = require('../models');

module.exports.findUserById = async (req, res, next) => {
  const { params: {userId}} = req;

  const user = await User.findByPk(userId);

  if(!user) {
    //TODO : написати краще
    return res.status(404).send('User is not found');
  }

  req.user = user;

  next();
}
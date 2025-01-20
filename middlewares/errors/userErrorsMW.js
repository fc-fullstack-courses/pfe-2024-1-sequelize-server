const { UniqueConstraintError } = require('sequelize');

module.exports.sequelizeUniqueErrorMW = async (err, req, res, next) => {
  if(err instanceof UniqueConstraintError) {
    return res.status(409).send(err.errors[0].message);
  }

  next(err);
}
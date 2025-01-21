'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.init(
    {
      name: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        field: 'is_private'
      },
      imagePath: {
        type: DataTypes.STRING,
        field: 'image_path',
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      underscored: true,
    }
  );
  return Group;
};

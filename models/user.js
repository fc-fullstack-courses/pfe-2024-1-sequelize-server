'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    // схема атрибутів нашої сутності в БД
    {
      // описи атрибутів += однакові з описами у міграціях
      firstName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: 'last_name',
      },
      email: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isMale: {
        type: DataTypes.BOOLEAN,
        field: 'is_male',
      },
      balance: {
        type: DataTypes.DECIMAL(9, 2),
        defaultValue: 0
      },
      birthday: {
        type: DataTypes.DATEONLY,
      },
    },
    //налаштування
    {
      sequelize,
      modelName: 'User',
      tableName: 'users', // ручне встановлення назви таблиі
      underscored: true
      // timestamps: false - вимкнути таймштампи
      // createdAt: 'created_at',
      // updatedAt: 'updated_at'
    }
  );
  return User;
};

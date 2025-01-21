'use strict';
const { Model } = require('sequelize');
const { isAfter, addYears } = require("date-fns");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      User.belongsToMany(models.Group, {
        through: 'users_to_groups',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
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
        // валідація на рівні моделі (до запиту в БД)
        validate: {
          notEmpty: true,
          notNull: true,
        }
      },
      lastName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: 'last_name',
        validate: {
          notEmpty: true,
          notNull: true,
        }
      },
      email: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true
        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        }
      },
      isMale: {
        type: DataTypes.BOOLEAN,
        field: 'is_male',
      },
      balance: {
        type: DataTypes.DECIMAL(9, 2),
        defaultValue: 0,
        validate: {
          isNumeric: true,
          min: 0
        }
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          // користувацький валідатор
          isAdultUser (userBirthday) {
            if(isAfter(new Date(userBirthday), addYears(new Date(), -18))) {
              throw new Error('User must be adult')
            }
          }
        }
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

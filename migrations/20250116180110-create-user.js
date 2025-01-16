'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(128),
        // NOT NULL 
        allowNull: false,
        // вказати іншу назву поля у БД
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: Sequelize.STRING(300),
        allowNull: false,
        // обмеження унікальності
        unique: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isMale: {
        type: Sequelize.BOOLEAN,
        field: 'is_male',
      },
      balance: {
        type: Sequelize.DECIMAL(9, 2),
        // DEFAULT у SQL
        defaultValue: 0
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
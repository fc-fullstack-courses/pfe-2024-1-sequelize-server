'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Admin',
        last_name: 'Tiranovich',
        email: 'adminmail@gmail.com',
        password: '21345admin',
        is_male: true,
        birthday: new Date(1980, 3, 24),
        created_at: new Date(),
        updated_at: new Date(),
      },
      // {
      //   first_name: 'Admin',
      //   last_name: 'Tiranovich',
      //   email: 'adminmail@gmail.com',
      //   password: '21345admin',
      //   is_male: true,
      //   birthday: new Date(1980, 3, 24),
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'adminmail@gmail.com'
    });
  },
};

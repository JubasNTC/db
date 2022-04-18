'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'departments',
      [
        {
          name: 'Администрация',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Бухгалтерия',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ИТ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  },
};

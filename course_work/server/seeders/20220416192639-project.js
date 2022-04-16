'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'projects',
      [
        {
          departmentId: 3,
          name: 'Разработка клона Redis',
          cost: 500000,
          startDate: new Date('2021-02-17'),
          planedEndDate: new Date('2022-01-17'),
          realEndDate: new Date('2022-01-17'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 3,
          name: 'Разработка чат-бота',
          cost: 150000,
          startDate: new Date('2022-02-21'),
          planedEndDate: new Date('2022-09-23'),
          realEndDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 3,
          name: 'Разработка СУБД',
          cost: 1200000,
          startDate: new Date('2020-12-15'),
          planedEndDate: new Date('2023-05-11'),
          realEndDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 3,
          name: 'Разработка сайт интернет магазина',
          cost: 70000,
          startDate: new Date('2022-01-10'),
          planedEndDate: new Date('2022-03-05'),
          realEndDate: new Date('2022-03-05'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};

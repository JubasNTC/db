'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'employees',
      [
        {
          id: 1,
          lastName: 'Иванов',
          firstName: 'Иван',
          middleName: 'Иванович',
          position: 'Директор',
          salary: 300000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          lastName: 'Сидоров',
          firstName: 'Сидор',
          middleName: 'Сидорович',
          position: 'Бухгалтер',
          salary: 50000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          lastName: 'Петров',
          firstName: 'Петр',
          middleName: 'Петрович',
          position: 'Программист',
          salary: 120000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          lastName: 'Ветров',
          firstName: 'Илья',
          middleName: 'Мракович',
          position: 'Старший программист',
          salary: 180000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          lastName: 'Изломов',
          firstName: 'Иван',
          middleName: 'Сидорович',
          position: 'Бухгалтер',
          salary: 30000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          lastName: 'Бугров',
          firstName: 'Федр',
          middleName: 'Мракович',
          position: 'Менеджер проектов',
          salary: 80000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  },
};

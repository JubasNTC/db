'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'departmentsEmployees',
      [
        {
          departmentId: 1,
          employeeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 2,
          employeeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 3,
          employeeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 3,
          employeeId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 2,
          employeeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departmentId: 1,
          employeeId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departmentsEmployees', null, {});
  },
};

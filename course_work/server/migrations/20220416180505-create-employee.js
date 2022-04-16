'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      middleName: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      salary: {
        allowNull: false,
        type: Sequelize.DECIMAL(18, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  },
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'departments',
          key: 'id',
        },
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(200),
      },
      cost: {
        allowNull: false,
        type: Sequelize.DECIMAL(18, 2),
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      planedEndDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      realEndDate: {
        allowNull: true,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('projects');
  },
};

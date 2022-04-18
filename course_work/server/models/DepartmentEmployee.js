'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DepartmentEmployee extends Model {
    static associate(models) {
      DepartmentEmployee.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        onDelete: 'CASCADE',
      });
      DepartmentEmployee.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
        onDelete: 'CASCADE',
      });
    }
  }

  DepartmentEmployee.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      departmentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      employeeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    },
    {
      sequelize,
      tableName: 'departmentsEmployees',
      timestamps: true,
    }
  );

  return DepartmentEmployee;
};

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DepartmentEmployee extends Model {
    static associate(models) {
      DepartmentEmployee.belongsTo(models.Department, {
        foreignKey: 'departmentId',
      });
      DepartmentEmployee.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
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
    },
    {
      sequelize,
      tableName: 'departmentEmployees',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'createdAt',
    }
  );

  return DepartmentEmployee;
};

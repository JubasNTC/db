'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.DepartmentEmployee, {
        foreignKey: 'employeeId',
      });
    }
  }

  Employee.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      middleName: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      position: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      salary: {
        allowNull: false,
        type: DataTypes.DECIMAL(18, 2),
      },
    },
    {
      sequelize,
      tableName: 'employees',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'createdAt',
    }
  );

  return Employee;
};

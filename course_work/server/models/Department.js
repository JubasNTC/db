'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.DepartmentEmployee, {
        foreignKey: 'departmentId',
      });
    }
  }

  Department.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      tableName: 'departments',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'createdAt',
    }
  );

  return Department;
};

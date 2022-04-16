'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Department, {
        foreignKey: 'departmentId',
      });
    }
  }

  Project.init(
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
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(200),
      },
      cost: {
        allowNull: false,
        type: DataTypes.DECIMAL(18, 2),
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      planedEndDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      realEndDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      validate: {
        projectDates() {
          if (
            this.startDate > this.planedEndDate ||
            this.startDate > this.realEndDate
          ) {
            throw new Error(
              'The project start date must be less than the completion date',
            );
          }
        },
      },
      tableName: 'projects',
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'createdAt',
    },
  );

  return Project;
};

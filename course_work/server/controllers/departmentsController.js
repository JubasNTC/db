'use strict';

const { Department } = require('models');

const getDepartments = async () => {
  return Department.findAll();
};

const createDepartment = async (departmentData) => {
  const { dataValues } = await Department.create(departmentData);

  return dataValues;
};

const updateDepartment = async (id, departmentData) => {
  return Department.update(departmentData, {
    where: {
      id,
    },
  });
};

const removeDepartment = async (id) => {
  return Department.destroy({ where: { id } });
};

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  removeDepartment,
};

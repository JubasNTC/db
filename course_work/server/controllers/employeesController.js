'use strict';

const { Employee } = require('models');

const getEmployees = async () => {
  return Employee.findAll();
};

const createEmployee = async (employeeData) => {
  const { dataValues } = await Employee.create(employeeData);

  return dataValues;
};

const updateEmployee = async (id, employeeData) => {
  return Employee.update(employeeData, {
    where: {
      id,
    },
  });
};

const removeEmployee = async (id) => {
  return Employee.destroy({ where: { id } });
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  removeEmployee,
};

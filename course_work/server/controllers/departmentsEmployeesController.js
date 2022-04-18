'use strict';

const { Department, DepartmentEmployee, sequelize } = require('models');
const { QueryTypes } = require('sequelize');

const getDepartmentIdByName = async (name) => {
  const department = await Department.findOne({
    attributes: ['id'],
    where: { name },
  });

  return department?.dataValues?.id ?? null;
};

const getDepartmentsEmployees = async () => {
  return sequelize.query(
    `SELECT
       e."id" AS "employeeId",
       de."departmentId",
       de."name" AS "departmentName",
       CONCAT(e."lastName", ' ', e."firstName", ' ', e."lastName") AS "fullName"
     FROM public."employees" e
     LEFT JOIN (
       SELECT
         dee.*,
         d."name"
       FROM public."departmentsEmployees" AS dee
       INNER JOIN public."departments" AS d
       ON d."id" = dee."departmentId"
     ) AS de
     ON e."id" = de."employeeId"`,
    {
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    }
  );
};

const updateDepartmentEmployee = async (departmentEmployeeData) => {
  const { employeeId, departmentName } = departmentEmployeeData;
  const departmentId = await getDepartmentIdByName(departmentName);

  if (!departmentId) {
    throw new Error('Not found department');
  }

  const isExisted = await DepartmentEmployee.findOne({ where: { employeeId } });

  if (isExisted) {
    return DepartmentEmployee.update(
      {
        employeeId,
        departmentId,
      },
      {
        where: {
          employeeId,
        },
      }
    );
  }

  return DepartmentEmployee.create({ employeeId, departmentId });
};

module.exports = {
  getDepartmentsEmployees,
  updateDepartmentEmployee,
};

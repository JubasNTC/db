'use strict';

const { Project, Department, sequelize } = require('models');
const { QueryTypes } = require('sequelize');

const getDepartmentIdByName = async (name) => {
  const department = await Department.findOne({
    attributes: ['id'],
    where: { name },
  });

  return department?.dataValues?.id ?? null;
};

const getProjectsInWork = async () => {
  return sequelize.query(
    `SELECT
       p."id",
       p."name",
       p."cost",
       (
         p."cost" - DATE_PART(
           'month',
           AGE(p."planedEndDate", p."startDate")
         ) * dee."departmentMonthSalary"
       ) AS "predictedProfit"
     FROM public."projects" AS p
     INNER JOIN (
       SELECT de."departmentId",
         SUM(
           e."salary"
         ) as "departmentMonthSalary"
       FROM public."departmentsEmployees" de
       INNER JOIN public."employees" AS e
       ON de."employeeId" = e."id"
       GROUP BY de."departmentId"
     ) AS dee
     ON p."departmentId" = dee."departmentId"
     WHERE p."realEndDate" IS NULL;`,
    {
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    }
  );
};

const getProjects = async () => {
  return Project.findAll({
    include: {
      model: Department,
      required: true,
    },
  });
};

const createProject = async (projectData) => {
  const { name, cost, startDate, planedEndDate, realEndDate, Department } =
    projectData;
  const newDepartmentId = await getDepartmentIdByName(Department.name);

  const { dataValues } = await Project.create({
    departmentId: newDepartmentId,
    name,
    cost,
    startDate,
    planedEndDate,
    realEndDate,
  });

  return { ...dataValues, Department: { ...Department, id: newDepartmentId } };
};

const updateProject = async (id, projectData) => {
  const {
    name,
    cost,
    startDate,
    planedEndDate,
    realEndDate,
    Department: { name: newDepartmentName },
  } = projectData;
  const newDepartmentId = await getDepartmentIdByName(newDepartmentName);

  return Project.update(
    {
      departmentId: newDepartmentId,
      name,
      cost,
      startDate,
      planedEndDate,
      realEndDate,
    },
    {
      where: {
        id,
      },
    }
  );
};

const removeProject = async (id) => {
  return Project.destroy({ where: { id } });
};

module.exports = {
  getProjects,
  getProjectsInWork,
  createProject,
  updateProject,
  removeProject,
};

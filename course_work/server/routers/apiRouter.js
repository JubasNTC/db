'use strict';

const express = require('express');

const departmentsController = require('controllers/departmentsController');
const employeesController = require('controllers/employeesController');
const projectsController = require('controllers/projectsController');
const departmentsEmployeesController = require('controllers/departmentsEmployeesController');
const { departmentSchema } = require('validators/departmentsValidator');
const { employeeSchema } = require('validators/employeeValidator');
const { projectSchema } = require('../validators/projectValidator');
const {
  departmentEmployeeSchema,
} = require('../validators/departmentEmployeeValidator');

const { asyncHandler } = require('../utils');

const router = express.Router();

router.get(
  '/departments',
  asyncHandler(async (req, res) => {
    const departments = await departmentsController.getDepartments();

    res.send({
      departments,
    });
  })
);

router.post(
  '/departments',
  asyncHandler(async (req, res) => {
    const { body } = req;
    const departmentData = departmentSchema.validateSync(body);
    const department = await departmentsController.createDepartment(
      departmentData
    );

    res.send(department);
  })
);

router.put(
  '/departments/:id',
  asyncHandler(async (req, res) => {
    const { body, params } = req;
    const id = Number(params.id);
    const departmentData = departmentSchema.validateSync(body);

    await departmentsController.updateDepartment(id, departmentData);

    res.sendStatus(200);
  })
);

router.delete(
  '/departments/:id',
  asyncHandler(async (req, res) => {
    const {
      params: { id },
    } = req;

    await departmentsController.removeDepartment(id);

    res.sendStatus(200);
  })
);

router.get(
  '/employees',
  asyncHandler(async (req, res) => {
    const employees = await employeesController.getEmployees();

    res.send({
      employees,
    });
  })
);

router.post(
  '/employees',
  asyncHandler(async (req, res) => {
    const { body } = req;
    const employeeData = employeeSchema.validateSync(body);
    const employee = await employeesController.createEmployee(employeeData);

    res.send(employee);
  })
);

router.put(
  '/employees/:id',
  asyncHandler(async (req, res) => {
    const { body, params } = req;
    const id = Number(params.id);
    const employeeData = employeeSchema.validateSync(body);

    await employeesController.updateEmployee(id, employeeData);

    res.sendStatus(200);
  })
);

router.delete(
  '/employees/:id',
  asyncHandler(async (req, res) => {
    const {
      params: { id },
    } = req;

    await employeesController.removeEmployee(id);

    res.sendStatus(200);
  })
);

router.get(
  '/projects',
  asyncHandler(async (req, res) => {
    const projects = await projectsController.getProjects();

    res.send({
      projects,
    });
  })
);

router.get(
  '/projects/work',
  asyncHandler(async (req, res) => {
    const projects = await projectsController.getProjectsInWork();

    res.send({
      projects,
    });
  })
);

router.post(
  '/projects',
  asyncHandler(async (req, res) => {
    const { body } = req;
    const projectData = projectSchema.validateSync(body);
    const project = await projectsController.createProject(projectData);

    res.send(project);
  })
);

router.put(
  '/projects/:id',
  asyncHandler(async (req, res) => {
    const { body, params } = req;
    const id = Number(params.id);
    const projectData = projectSchema.validateSync(body);

    await projectsController.updateProject(id, projectData);

    res.sendStatus(200);
  })
);

router.delete(
  '/projects/:id',
  asyncHandler(async (req, res) => {
    const {
      params: { id },
    } = req;

    await projectsController.removeProject(id);

    res.sendStatus(200);
  })
);

router.get(
  '/departments-employees',
  asyncHandler(async (req, res) => {
    const departmentsEmployees =
      await departmentsEmployeesController.getDepartmentsEmployees();

    res.send({
      departmentsEmployees,
    });
  })
);

router.put(
  '/departments-employees',
  asyncHandler(async (req, res) => {
    const { body } = req;
    const departmentEmployeeData = departmentEmployeeSchema.validateSync(body);

    await departmentsEmployeesController.updateDepartmentEmployee(
      departmentEmployeeData
    );

    res.sendStatus(200);
  })
);

module.exports = router;

'use strict';

const express = require('express');

const departmentsController = require('controllers/departmentsController');
const employeesController = require('controllers/employeesController');
const projectsController = require('controllers/projectsController');
const { departmentSchema } = require('validators/departmentsValidator');
const { employeeSchema } = require('validators/employeeValidator');
const { projectSchema } = require('../validators/projectValidator');

const router = express.Router();

router.get('/departments', async (req, res) => {
  const departments = await departmentsController.getDepartments();

  res.send({
    departments,
  });
});

router.post('/departments', async (req, res) => {
  const { body } = req;
  const departmentData = departmentSchema.validateSync(body);
  const department = await departmentsController.createDepartment(
    departmentData
  );

  res.send(department);
});

router.put('/departments/:id', async (req, res) => {
  const { body, params } = req;
  const id = Number(params.id);
  const departmentData = departmentSchema.validateSync(body);

  await departmentsController.updateDepartment(id, departmentData);

  res.sendStatus(200);
});

router.delete('/departments/:id', async (req, res) => {
  const {
    params: { id },
  } = req;

  await departmentsController.removeDepartment(id);

  res.sendStatus(200);
});

router.get('/employees', async (req, res) => {
  const employees = await employeesController.getEmployees();

  res.send({
    employees,
  });
});

router.post('/employees', async (req, res) => {
  const { body } = req;
  const employeeData = employeeSchema.validateSync(body);
  const employee = await employeesController.createEmployee(employeeData);

  res.send(employee);
});

router.put('/employees/:id', async (req, res) => {
  const { body, params } = req;
  const id = Number(params.id);
  const employeeData = employeeSchema.validateSync(body);

  await employeesController.updateEmployee(id, employeeData);

  res.sendStatus(200);
});

router.delete('/employees/:id', async (req, res) => {
  const {
    params: { id },
  } = req;

  await employeesController.removeEmployee(id);

  res.sendStatus(200);
});

router.get('/projects', async (req, res) => {
  const projects = await projectsController.getProjects();

  res.send({
    projects,
  });
});

router.post('/projects', async (req, res) => {
  const { body } = req;
  const projectData = projectSchema.validateSync(body);
  const project = await projectsController.createProject(projectData);

  res.send(project);
});

router.put('/projects/:id', async (req, res) => {
  const { body, params } = req;
  const id = Number(params.id);
  const projectData = projectSchema.validateSync(body);

  await projectsController.updateProject(id, projectData);

  res.sendStatus(200);
});

router.delete('/projects/:id', async (req, res) => {
  const {
    params: { id },
  } = req;

  await projectsController.removeProject(id);

  res.sendStatus(200);
});

module.exports = router;

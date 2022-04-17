'use strict';

const { Project } = require('models');

const getProjects = async () => {
  return Project.findAll();
};

const createProject = async (projectData) => {
  const { dataValues } = await Project.create(projectData);

  return dataValues;
};

const updateProject = async (id, projectData) => {
  return Project.update(projectData, {
    where: {
      id,
    },
  });
};

const removeProject = async (id) => {
  return Project.destroy({ where: { id } });
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  removeProject,
};

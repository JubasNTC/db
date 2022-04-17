import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '../components/DataGrid';
import { Layout } from '../components/Layout';
import {
  createProjectByAPI,
  loadProjectsByAPI,
  removeProjectByAPI,
  updateProjectByAPI,
} from '../actions/app';

const columns = [
  { title: 'ID', field: 'id', editable: 'never' },
  {
    title: 'Department id',
    field: 'departmentId',
  },
  { title: 'Name', field: 'name' },
  { title: 'Cost', field: 'cost' },
  { title: 'Start date', field: 'startDate' },
  { title: 'Planed end date', field: 'planedEndDate' },
  { title: 'Real end date', field: 'realEndDate' },
  {
    title: 'Created at',
    field: 'createdAt',
    editable: 'never',
  },
  {
    title: 'Updated at',
    field: 'updatedAt',
    editable: 'never',
  },
];

const ProjectsPage = () => {
  const dispatch = useDispatch();

  const handleCreating = async (departmentData) =>
    createProjectByAPI(dispatch, departmentData);

  const handleUpdating = async (id, departmentData) =>
    updateProjectByAPI(dispatch, id, departmentData);

  const handleRemoving = async (id) => removeProjectByAPI(dispatch, id);

  useEffect(() => {
    loadProjectsByAPI(dispatch);
  }, [dispatch]);

  const isLoading = useSelector(({ app: { isLoading } }) => isLoading);
  const projects = useSelector(({ app: { projects } }) => projects);

  return (
    <Layout>
      <DataGrid
        title={'Projects'}
        columns={columns}
        data={projects}
        isLoading={isLoading}
        handleCreating={handleCreating}
        handleUpdating={handleUpdating}
        handleRemoving={handleRemoving}
      />
    </Layout>
  );
};

export { ProjectsPage };

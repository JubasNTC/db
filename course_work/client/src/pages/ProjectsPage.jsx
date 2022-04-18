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
    title: 'Department',
    field: 'Department.name',
  },
  { title: 'Name', field: 'name' },
  {
    title: 'Cost',
    field: 'cost',
    type: 'currency',
    currencySetting: {
      locale: 'ru',
      currencyCode: 'rub',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
  { title: 'Start date', field: 'startDate', type: 'datetime' },
  { title: 'Planed end date', field: 'planedEndDate', type: 'datetime' },
  { title: 'Real end date', field: 'realEndDate', type: 'datetime' },
  {
    title: 'Created at',
    field: 'createdAt',
    type: 'datetime',
    editable: 'never',
  },
  {
    title: 'Updated at',
    field: 'updatedAt',
    type: 'datetime',
    defaultSort: 'desc',
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

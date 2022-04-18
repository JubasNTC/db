import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '../components/DataGrid';
import {
  createDepartmentByAPI,
  loadDepartmentsByAPI,
  removeDepartmentByAPI,
  updateDepartmentByAPI,
} from '../actions/app';
import { Layout } from '../components/Layout';
import { Alert } from 'react-bootstrap';

const columns = [
  { title: 'ID', field: 'id', editable: 'never' },
  { title: 'Name', field: 'name' },
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

const DepartmentsPage = () => {
  const dispatch = useDispatch();

  const handleCreating = async (departmentData) =>
    createDepartmentByAPI(dispatch, departmentData);

  const handleUpdating = async (id, departmentData) =>
    updateDepartmentByAPI(dispatch, id, departmentData);

  const handleRemoving = async (id) => removeDepartmentByAPI(dispatch, id);

  useEffect(() => {
    loadDepartmentsByAPI(dispatch);
  }, [dispatch]);

  const isLoading = useSelector(({ app: { isLoading } }) => isLoading);
  const errorMessage = useSelector(({ app: { errorMessage } }) => errorMessage);
  const departments = useSelector(({ app: { departments } }) => departments);

  return (
    <Layout>
      {errorMessage && (
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
      <DataGrid
        title={'Departments'}
        columns={columns}
        data={departments}
        isLoading={isLoading}
        handleCreating={handleCreating}
        handleUpdating={handleUpdating}
        handleRemoving={handleRemoving}
      />
    </Layout>
  );
};

export { DepartmentsPage };

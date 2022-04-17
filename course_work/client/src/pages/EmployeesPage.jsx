import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '../components/DataGrid';
import { Layout } from '../components/Layout';
import {
  createEmployeeByAPI,
  loadEmployeesByAPI,
  removeEmployeeByAPI,
  updateEmployeeByAPI,
} from '../actions/app';

const columns = [
  { title: 'ID', field: 'id', editable: 'never' },
  { title: 'Last name', field: 'lastName' },
  { title: 'Middle name', field: 'middleName' },
  { title: 'First name', field: 'firstName' },
  { title: 'Position', field: 'position' },
  { title: 'Salary', field: 'salary' },
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

const EmployeesPage = () => {
  const dispatch = useDispatch();

  const handleCreating = async (departmentData) =>
    createEmployeeByAPI(dispatch, departmentData);

  const handleUpdating = async (id, departmentData) =>
    updateEmployeeByAPI(dispatch, id, departmentData);

  const handleRemoving = async (id) => removeEmployeeByAPI(dispatch, id);

  useEffect(() => {
    loadEmployeesByAPI(dispatch);
  }, [dispatch]);

  const isLoading = useSelector(({ app: { isLoading } }) => isLoading);
  const employees = useSelector(({ app: { employees } }) => employees);

  return (
    <Layout>
      <DataGrid
        title={'Employees'}
        columns={columns}
        data={employees}
        isLoading={isLoading}
        handleCreating={handleCreating}
        handleUpdating={handleUpdating}
        handleRemoving={handleRemoving}
      />
    </Layout>
  );
};

export { EmployeesPage };

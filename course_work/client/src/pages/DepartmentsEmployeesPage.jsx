import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../components/Layout';
import { DataGrid } from '../components/DataGrid';
import {
  loadDepartmentsEmployeesByAPI,
  updateDepartmentEmployeeByAPI,
} from '../actions/app';
import { Alert } from 'react-bootstrap';

const columns = [
  { title: 'Full name', field: 'fullName', editable: 'never' },
  {
    title: 'Department name',
    field: 'departmentName',
  },
];

const DepartmentsEmployeesPage = () => {
  const dispatch = useDispatch();

  const handleCreating = async () => {};

  const handleUpdating = async (id, departmentsEmployeeData) => {
    updateDepartmentEmployeeByAPI(dispatch, departmentsEmployeeData);
  };

  const handleRemoving = async () => {};

  useEffect(() => {
    loadDepartmentsEmployeesByAPI(dispatch);
  }, [dispatch]);

  const isLoading = useSelector(({ app: { isLoading } }) => isLoading);
  const errorMessage = useSelector(({ app: { errorMessage } }) => errorMessage);
  const departmentsEmployees = useSelector(
    ({ app: { departmentsEmployees } }) => departmentsEmployees
  );

  return (
    <Layout>
      {errorMessage && (
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
      <DataGrid
        title={'Departments Employees'}
        columns={columns}
        data={departmentsEmployees}
        isLoading={isLoading}
        handleCreating={handleCreating}
        handleUpdating={handleUpdating}
        handleRemoving={handleRemoving}
      />
    </Layout>
  );
};

export { DepartmentsEmployeesPage };

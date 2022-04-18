import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '../components/DataGrid';
import { Layout } from '../components/Layout';
import { loadProjectsInWorksByAPI } from '../actions/app';

const columns = [
  { title: 'ID', field: 'id', editable: 'never' },
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
  {
    title: 'Predicted profit',
    field: 'predictedProfit',
    type: 'currency',
    currencySetting: {
      locale: 'ru',
      currencyCode: 'rub',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  },
];

const ProjectsInWorkPage = () => {
  const dispatch = useDispatch();

  const handleCreating = async () => {};

  const handleUpdating = async () => {};

  const handleRemoving = async () => {};

  useEffect(() => {
    loadProjectsInWorksByAPI(dispatch);
  }, [dispatch]);

  const isLoading = useSelector(({ app: { isLoading } }) => isLoading);
  const projectsInWork = useSelector(
    ({ app: { projectsInWork } }) => projectsInWork
  );

  return (
    <Layout>
      <DataGrid
        title={'ProjectsInWork'}
        columns={columns}
        data={projectsInWork}
        isLoading={isLoading}
        handleCreating={handleCreating}
        handleUpdating={handleUpdating}
        handleRemoving={handleRemoving}
      />
    </Layout>
  );
};

export { ProjectsInWorkPage };

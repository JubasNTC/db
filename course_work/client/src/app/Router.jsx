import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { DepartmentsPage } from '../pages/DepartmentsPage';
import { EmployeesPage } from '../pages/EmployeesPage';
import { ProjectsPage } from '../pages/ProjectsPage';

const Router = () => (
  <Routes>
    <Route path="/" exact element={<DepartmentsPage />} />
    <Route path="/employees" exact element={<EmployeesPage />} />
    <Route path="/projects" exact element={<ProjectsPage />} />

    {/* <Route path="/pokemon/:id" component={PokemonPage} /> */}
    {/* <Route component={NotFoundPage} /> */}
  </Routes>
);

export { Router };


import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';

const Router = () => (
  <Routes>
    <Route path="/" exact c element={<HomePage/>} />
    {/* <Route path="/pokemon/:id" component={PokemonPage} /> */}
    {/* <Route component={NotFoundPage} /> */}
  </Routes>
);

export { Router };
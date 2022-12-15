import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';
import Write from '../pages/Write';
import Update from '../pages/Update';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        {/* <Route path="details/:id" element={<Details />} /> */}
        <Route path="write/:id" element={<Write />} />
        <Route path="details/:id/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

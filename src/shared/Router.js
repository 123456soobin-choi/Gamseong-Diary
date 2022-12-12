import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';
import Write from '../pages/Write';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details" element={<Details />} />
        {/* <Route path="details/:id" element={<Details />} /> */}
        <Route path="write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

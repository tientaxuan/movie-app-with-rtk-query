import React from 'react';

import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import 'swiper/css';

import Layout from './config/Layout';

import { Home, Catalog, Detail } from './pages/index';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

document.title = 'movie app';

function App() {
  return (
    <BrowserRouter basename='movie-app-with-rtk-query'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=':category/search/:keyword' element={<Catalog />} />
          <Route path=':category/:id' element={<Detail />} />
          <Route path=':category' element={<Catalog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

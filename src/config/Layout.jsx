import { Outlet } from 'react-router-dom';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

import React from 'react';

const Layout = (props) => {
  return (
    <>
      <Header {...props} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

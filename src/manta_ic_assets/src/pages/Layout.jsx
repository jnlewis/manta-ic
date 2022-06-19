import React, { useState } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Home from "./Home";
import Documents from "./Documents";
import NoPage from "./NoPage";

const Layout = () => {

  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {currentPage === 'home' && (
        <>
          <Navigation onMenuSelected={(menu) => setCurrentPage(menu)} />
          <Home onMenuSelected={(menu) => setCurrentPage(menu)} />
        </>
      )}
      {currentPage === 'documents' && (
        <>
          <Documents />
        </>
      )}
    </div>
  )
};

export default Layout;

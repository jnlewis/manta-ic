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
          <Navigation currentUser={null} onMenuSelected={(menu) => setCurrentPage(menu)} />
          <Home />
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

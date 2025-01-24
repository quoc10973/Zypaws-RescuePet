import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import Slogan from './component/Slogan';

const App = () => {
  return (
    <>
      <Slogan />
      <Header />
      <div>
        {/* Children output */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import Slogan from './component/Slogan';
import Information from './component/Information';

const App = () => {
  return (
    <>
      <Slogan />
      <Header />
      <Information />
      <div>
        {/* Children output */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;

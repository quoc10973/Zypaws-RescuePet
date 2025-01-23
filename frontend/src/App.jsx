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
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]">
        {/* Children output */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;

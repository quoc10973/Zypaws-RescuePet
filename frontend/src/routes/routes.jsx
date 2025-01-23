import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import DogPage from '../pages/DogPage';
import CatPage from '../pages/CatPage';


const AppRoutes = () => {
    return (
        <Routes>
            {/* Layout chính */}
            <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dog" element={<DogPage />} />
                <Route path="/cat" element={<CatPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

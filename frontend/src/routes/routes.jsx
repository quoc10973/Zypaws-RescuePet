import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import PetPage from '../pages/PetPage';
import SafeSoundProgramPage from '../pages/SafeSoundProgramPage';


const AppRoutes = () => {
    return (
        <Routes>
            {/* Layout chính */}
            <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/pet/:id" element={<PetPage />} />
                <Route path="/about-the-safe-sound-pets-program" element={<SafeSoundProgramPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

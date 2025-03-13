import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import PetPage from '../pages/PetPage';
import SafeSoundProgramPage from '../pages/SafeSoundProgramPage';
import ListingPage from '../pages/ListingPage';
import DonationPage from '../pages/DonationPage';
import DonationResult from '../pages/DonationResult';
import EnquirePet from '../pages/EnquirePet';
import FavoritePage from '../pages/FavoritePage';
import MyInquiryPage from '../pages/MyInquiryPage';
import AdminPage from '../pages/AdminPage';
import ManagementPage from '../pages/ManagementPage';
import UserManagement from '../pages/UserManagement';
import PetManagement from '../pages/PetManagement';
import DonationManagement from '../pages/DonationManagement';
const AppRoutes = () => {
    return (
        <Routes>
            {/* Layout chính */}
            <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/pet/:id" element={<PetPage />} />
                <Route path="/pet/:id/enquire" element={<EnquirePet />} />
                <Route path="/about-the-safe-sound-pets-program" element={<SafeSoundProgramPage />} />
                <Route path="/listing" element={<ListingPage />} />
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/donation/success" element={<DonationResult />} />
                <Route path="/donation/cancel" element={<DonationResult />} />
                <Route path="favorite" element={<FavoritePage />} />
                <Route path="/my-inquiry" element={<MyInquiryPage />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} >
                <Route index element={<ManagementPage />} />
                <Route path="/admin/users-management" element={<UserManagement />} />
                <Route path="/admin/pets-management" element={<PetManagement />} />
                <Route path="/admin/donations-management" element={<DonationManagement />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

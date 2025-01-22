import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import { assets } from '../assets/assets';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { UserIcon, LockClosedIcon, HeartIcon } from '@heroicons/react/24/solid'; // Import các icon từ Heroicons

const Slogan = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Handler for toggling sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-wrap justify-between items-center p-2 sm:p-4 bg-gray-100 relative font-quicksand">
            {/* Donate Button */}
            <button className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-5 md:py-1.5 md:px-4 lg:py-2 lg:px-5 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl text-sm sm:text-base md:text-sm">
                <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white" />
                Donate
            </button>


            {/* Logo and Decorations */}
            <div className="flex gap-5 items-center ml-0 sm:ml-16 sm:mt-0">
                <img src={assets.decorate1} alt="Decorate 1" className="w-12 sm:w-24 md:w-36 lg:w-48 p-2" />
                <img src={assets.logo} alt="Logo" className="w-16 sm:w-24 md:w-36 lg:w-48 p-2" />
                <img src={assets.decorate2} alt="Decorate 2" className="w-12 sm:w-24 md:w-36 lg:w-48 p-2" />
            </div>

            {/* Login and Sign Up Buttons */}
            <div className="hidden sm:flex gap-3 items-center mt-2 sm:mt-0">
                <Link
                    to="/login"
                    className="flex items-center gap-2 bg-slate-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-slate-600 transition duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                    <UserIcon className="h-4 w-4" />
                    Login
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <Link
                    to="/signup"
                    className="flex items-center gap-2 bg-slate-500 text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-slate-600 transition duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                    <LockClosedIcon className="h-4 w-4" />
                    Sign Up
                </Link>
            </div>

            {/* Menu Icon for Small Screens */}
            <div className="sm:hidden mt-2">
                <Bars3Icon className="h-8 w-8 text-gray-700 cursor-pointer" onClick={toggleSidebar} />
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 bg-gray-800 bg-opacity-75 w-64 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
            >
                <div className="flex justify-end p-4">
                    <button className="text-white" onClick={toggleSidebar}>X</button>
                </div>
                <div className="flex flex-col items-center text-white space-y-4">
                    <Link
                        to="/login"
                        className="flex items-center gap-2 bg-slate-500 py-2 px-4 rounded-lg hover:bg-slate-600 transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        <UserIcon className="h-5 w-5" />
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="flex items-center gap-2 bg-slate-500 py-2 px-4 rounded-lg hover:bg-slate-600 transition duration-300 shadow-lg hover:shadow-xl"
                    >
                        <LockClosedIcon className="h-5 w-5" />
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Slogan;

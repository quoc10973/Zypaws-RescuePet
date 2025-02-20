import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserIcon, UserPlusIcon, HeartIcon, LifebuoyIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../context/AuthContext';

const Slogan = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        setAuth({ isAuthenticated: false, user: { id: '', email: '', name: '', role: '' } });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-zinc-50 font-quicksand relative">
            {/* Donate Button */}
            <Link to="/donation" className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-semibold py-1 px-3 sm:py-2 sm:px-4 rounded-md sm:rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                Donate
            </Link>

            {/* Logo and Decorations */}
            <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
                <img src={assets.decorate7} alt="Decorate" className="hidden sm:block w-16 sm:w-24" />
                <Link to="/">
                    <img src={assets.logo} alt="Logo" className="w-24 sm:w-36" />
                </Link>
                <img src={assets.decorate7} alt="Decorate" className="hidden sm:block w-16 sm:w-24 scale-x-[-1]" />
            </div>

            {/* User Authentication */}
            <div className="flex items-center gap-2 sm:gap-3">
                {auth.isAuthenticated ? (
                    <>
                        <Link to="/favorite" className="text-red-500 hover:text-red-600">
                            <HeartIcon className="h-5 w-5 sm:h-7 sm:w-7" />
                        </Link>
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center justify-center bg-gray-300 text-gray-800 font-semibold rounded-full h-6 w-6 sm:h-8 sm:w-8 hover:bg-gray-400 text-xs sm:text-base"
                            >
                                {auth.user.name.charAt(0).toUpperCase()}
                            </button>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 sm:w-64 bg-white border rounded-lg shadow-lg z-50"
                                >
                                    <p className="px-4 py-2 text-gray-700 font-semibold">Hi, {auth.user.name}!</p>
                                    <hr />
                                    <ul className="space-y-2">
                                        <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link></li>
                                        <li><Link to="/change-password" className="block px-4 py-2 hover:bg-gray-100">Change Password</Link></li>
                                    </ul>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100">Logout</button>
                                </motion.div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="hidden sm:flex gap-3">
                        <Link to="/login" className="flex items-center gap-1 text-black font-quicksand py-1 sm:py-2 rounded-lg transition text-sm sm:text-md">
                            <UserIcon className="h-4 w-4 sm:h-5 sm:w-8" /> Login
                        </Link>
                    </div>
                )}

                {/* Menu Icon for Small Screens */}
                {!auth.isAuthenticated && (
                    <div className="sm:hidden">
                        <Bars3Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700 cursor-pointer" onClick={toggleSidebar} />
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isSidebarOpen ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-0 right-0 w-48 sm:w-64 h-full bg-gray-800 text-white z-50 shadow-lg`}
            >
                <div className="flex justify-end p-4">
                    <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" onClick={toggleSidebar} />
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <Link to="/login" className="flex items-center gap-2 bg-slate-500 py-1 px-3 sm:py-2 sm:px-4 rounded-md sm:rounded-lg hover:bg-slate-600">
                        <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Login
                    </Link>
                    <Link to="/signup" className="flex items-center gap-2 bg-slate-500 py-1 px-3 sm:py-2 sm:px-4 rounded-md sm:rounded-lg hover:bg-slate-600">
                        <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Sign Up
                    </Link>
                </div>
                <div className="mt-4 px-4">
                    <h3 className="font-semibold text-md sm:text-lg mb-3 sm:mb-4 border-b border-gray-600 pb-2">Explore More</h3>
                    <ul className="space-y-2 sm:space-y-3">
                        <li><Link to="/how-you-can-help" className="flex items-center gap-2 hover:text-yellow-400"><HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" /> How you can help</Link></li>
                        <li><Link to="/get-support" className="flex items-center gap-2 hover:text-blue-400"><LifebuoyIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" /> Get support</Link></li>
                        <li><Link to="/about" className="flex items-center gap-2 hover:text-green-400"><UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" /> About Us</Link></li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export default Slogan;

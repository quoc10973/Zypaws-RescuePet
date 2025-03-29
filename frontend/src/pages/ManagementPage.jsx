import { UserIcon, HomeIcon, BanknotesIcon, BellIcon } from '@heroicons/react/24/solid';
import { FaPaw } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ManagementPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Zypaws Rescue Home</h2>
                    <p className="mb-6 text-gray-700 text-center">
                        Zypaws Rescue Pet Home is a non-profit organization dedicated to helping abandoned pets
                        find a new home. Admins can manage user accounts, pet listings, and track donations.
                    </p>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {/* Card: Manage Pets */}
                        <NavLink to="/admin/pets-management" className=" bg-white p-4 md:p-6 rounded-lg shadow-md flex items-start gap-4 hover:bg-gray-50">
                            <FaPaw className="h-10 w-10 text-green-500 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold">📋 Manage Pets</h3>
                                <p className="mt-2 text-gray-600 text-sm md:text-base">
                                    Update the list of pets available for adoption. Add, edit, or remove pet information.
                                </p>
                            </div>
                        </NavLink>

                        {/* Card: Manage Users */}
                        <NavLink to="/admin/users-management" className=" bg-white p-4 md:p-6 rounded-lg shadow-md flex items-start gap-4 hover:bg-gray-50">
                            <UserIcon className="h-10 w-10 text-blue-500 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold">👥 Manage Users</h3>
                                <p className="mt-2 text-gray-600 text-sm md:text-base">
                                    View the list of registered users, approve adoption requests, and provide customer support when needed.
                                </p>
                            </div>
                        </NavLink>

                        {/* Card: Check Donations */}
                        <NavLink to="/admin/donations-management" className=" bg-white p-4 md:p-6 rounded-lg shadow-md flex items-start gap-4 hover:bg-gray-50">
                            <BanknotesIcon className="h-10 w-10 text-yellow-500 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold">💰 Check Donations</h3>
                                <p className="mt-2 text-gray-600 text-sm md:text-base">
                                    Track and manage community donations to support pet care.
                                </p>
                            </div>
                        </NavLink>

                        {/* Card: Adoption Requests */}
                        <NavLink to="/admin/adoptions-management" className=" bg-white p-4 md:p-6 rounded-lg shadow-md flex items-start gap-4 hover:bg-gray-50">
                            <BellIcon className="h-10 w-10 text-purple-500 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold">🔔 Adoption Requests</h3>
                                <p className="mt-2 text-gray-600 text-sm md:text-base">
                                    Manage and review adoption requests from users. Approve or decline applications efficiently.
                                </p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagementPage;

import { UserIcon, HomeIcon, ArrowRightOnRectangleIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import { FaPaw } from "react-icons/fa";

const ManagementPage = () => {
    return (
        <div className="flex h-screen">

            {/* Main Content */}
            <main className="flex-1 p-10 bg-gray-100">
                <h2 className="text-2xl font-bold mb-4">Welcome to Zypaws Rescue Home</h2>
                <p className="mb-6">
                    Zypaws Rescue Pet Home is a non-profit organization dedicated to helping abandoned pets
                    find a new home. Admins can manage user accounts, pet listings, and track donations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                        <FaPaw className="h-10 w-10 text-green-500" />
                        <div>
                            <h3 className="text-xl font-semibold">📋 Manage Pets</h3>
                            <p className="mt-2 text-gray-600">
                                Update the list of pets available for adoption. Add, edit, or remove pet information.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                        <UserIcon className="h-10 w-10 text-blue-500" />
                        <div>
                            <h3 className="text-xl font-semibold">👥 Manage Users</h3>
                            <p className="mt-2 text-gray-600">
                                View the list of registered users, approve adoption requests, and provide customer support when needed.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                        <BanknotesIcon className="h-10 w-10 text-yellow-500" />
                        <div>
                            <h3 className="text-xl font-semibold">💰 Check Donations</h3>
                            <p className="mt-2 text-gray-600">
                                Track and manage community donations to support pet care.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                        <HomeIcon className="h-10 w-10 text-red-500" />
                        <div>
                            <h3 className="text-xl font-semibold">📊 Reports & Statistics</h3>
                            <p className="mt-2 text-gray-600">
                                View reports on the number of pets adopted, total donations received, and user activities.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagementPage;

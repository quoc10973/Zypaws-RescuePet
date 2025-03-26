import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UserIcon, HomeIcon, ArrowRightOnRectangleIcon, BanknotesIcon, BellIcon } from '@heroicons/react/24/solid';
import { FaPaw } from "react-icons/fa";
import AdminHeader from '../component/AdminHeader';

const AdminLayout = () => {
    return (

        <>
            <AdminHeader />
            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className="w-64 h-full bg-gray-800 text-white p-5 space-y-6">
                    <h1 className="text-xl font-bold">Zypaws Admin</h1>
                    <nav className="space-y-4">
                        <NavLink to="/admin" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                            <HomeIcon className="h-5 w-5" /> Dashboard
                        </NavLink>
                        <NavLink to="/admin/users-management" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                            <UserIcon className="h-5 w-5" /> Manage Users
                        </NavLink>
                        <NavLink to="/admin/pets-management" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                            <FaPaw className="h-5 w-5" /> Manage Pets
                        </NavLink>
                        <NavLink to="/admin/donations-management" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                            <BanknotesIcon className="h-5 w-5" /> Donations
                        </NavLink>
                        <NavLink to="/admin/adoptions-management" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                            <BellIcon className="h-5 w-5" /> Adoption Request
                        </NavLink>
                        <button className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded w-full">
                            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10 bg-gray-100">
                    <Outlet />  {/* ⬅️ Nội dung sẽ thay đổi khi chuyển route */}
                </main>
            </div>
        </>
    );
};

export default AdminLayout;

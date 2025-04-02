import { useContext, useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { UserIcon, HomeIcon, ArrowRightOnRectangleIcon, BanknotesIcon, BellIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { FaPaw } from "react-icons/fa";
import AdminHeader from "../component/AdminHeader";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!auth?.isAuthenticated) {
            navigate("/login", { replace: true });
        } else if (auth.user.role !== "ADMIN") {
            navigate("/", { replace: true });
        }
    }, [auth, navigate, location]);

    const handleLogout = () => {
        setAuth({ isAuthenticated: false, user: { id: '', email: '', name: '', role: '' } });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <>
            <AdminHeader />
            <div className="flex min-h-screen bg-gray-100">
                <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:block`}>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bars3Icon
                                className="h-6 w-6 cursor-pointer md:hidden"
                                onClick={() => setSidebarOpen(true)}
                            />
                            <h1 className="text-xl font-bold">Zypaws Admin</h1>
                        </div>
                    </div>

                    <nav className="space-y-4 mt-6">
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
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded w-full">
                            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                        </button>
                    </nav>
                </aside>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <main className="flex-1 p-4 md:p-5 lg:p-10">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default AdminLayout;

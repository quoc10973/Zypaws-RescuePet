import { useContext, useEffect, useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { getCurrentUserAPI } from "../axios/axios.api";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../context/AuthContext";

const AdminHeader = () => {
    const [adminName, setAdminName] = useState("Admin");
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook điều hướng trang

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await getCurrentUserAPI();
                setAdminName(response.lastName || "Admin");
            } catch (error) {
                console.error("Failed to fetch admin info:", error);
            }
        };

        fetchAdmin();
    }, []);

    const handleLogout = () => {
        setAuth({ isAuthenticated: false, user: { id: '', email: '', name: '', role: '' } });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/'); // Điều hướng về trang chủ thay vì dùng window.location.href
    };

    return (
        <header className="bg-gray-600 text-white p-4 flex justify-between items-center shadow-md">
            {/* Logo */}
            <Link to='/admin' className="text-xl font-bold font-lora">Zypaws Admin Panel</Link>

            {/* Admin Info & Logout */}
            <div className="flex items-center gap-4 font-lora">
                <span className="text-sm">Welcome, {adminName}</span>
                <button
                    onClick={handleLogout} // Gọi hàm logout khi bấm nút
                    className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-700 rounded">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;

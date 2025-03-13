import { useEffect, useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { getCurrentUserAPI } from "../axios/axios.api";

const AdminHeader = () => {
    const [adminName, setAdminName] = useState("Admin");

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await getCurrentUserAPI();  // Gọi API để lấy thông tin admin
                setAdminName(response.lastName || "Admin"); // Lấy tên admin từ API, fallback là "Admin"
            } catch (error) {
                console.error("Failed to fetch admin info:", error);
            }
        };

        fetchAdmin();
    }, []);

    return (
        <header className="bg-gray-600 text-white p-4  flex justify-between items-center shadow-md">
            {/* Logo */}
            <h1 className="text-xl font-bold font-lora">Zypaws Admin Panel</h1>

            {/* Admin Info & Logout */}
            <div className="flex items-center gap-4 font-lora">
                <span className="text-sm">Welcome, {adminName}</span>
                <button className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-700 rounded">
                    <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;

import { useContext, useEffect, useState } from "react";
import { getAllUserAPI } from "../axios/axios.api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const { setLoading } = useContext(AuthContext);

    // Fetch all users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUserAPI();
            setUsers(response);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUserAPI(id);
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user.");
            }
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg text-sm shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3">ID</th>
                        <th className="border p-3">First Name</th>
                        <th className="border p-3">Last Name</th>
                        <th className="border p-3">Email</th>
                        <th className="border p-3">Phone</th>
                        <th className="border p-3">Age</th>
                        <th className="border p-3">Address</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="text-center hover:bg-gray-50">
                                <td className="border p-3">{user.id}</td>
                                <td className="border p-3">{user.firstName}</td>
                                <td className="border p-3">{user.lastName}</td>
                                <td className="border p-3">{user.email}</td>
                                <td className="border p-3">{user.phone}</td>
                                <td className="border p-3">{user.age}</td>
                                <td className="border p-3">{user.address}</td>
                                <td className="border p-3 flex justify-center gap-2">
                                    {/* Edit Button */}
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                                        <PencilIcon className="h-5 w-5 inline" />
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <TrashIcon className="h-5 w-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border p-3 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;

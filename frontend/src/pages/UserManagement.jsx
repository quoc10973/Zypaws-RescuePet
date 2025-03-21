import { useContext, useEffect, useState } from "react";
import { getAllUserAPI, updateUserAPI, deleteUserAPI, createUserAPI } from "../axios/axios.api";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [editableUserId, setEditableUserId] = useState(null); // id user is being edited
    const [editedUser, setEditedUser] = useState({});
    const { setLoading } = useContext(AuthContext);

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        avatar: "",
        phone: "",
        age: "",
        address: "",
    });

    // create user
    const handleCreateUser = async () => {
        try {
            const createdUser = await createUserAPI(newUser);
            setUsers([...users, createdUser]); // Cập nhật danh sách
            setNewUser({ firstName: "", lastName: "", email: "", password: "", avatar: "", phone: "", age: "", address: "" });
            alert("User created successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user.");
        }
    };

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
            alert("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    // handleEdit: 
    const handleEdit = (user) => {
        setEditableUserId(user.id);
        setEditedUser(user); // set user data to be edited
    };

    // cancel edit
    const handleCancelEdit = () => {
        setEditableUserId(null);
        setEditedUser({});
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUserAPI(userId);
            setUsers(users.filter(user => user.id !== userId)); // update list of users
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };


    const handleChange = (e, field) => {
        setEditedUser({ ...editedUser, [field]: e.target.value });
    };

    // save user
    const handleSave = async () => {
        try {
            await updateUserAPI(editableUserId, editedUser);
            setUsers(users.map(user => (user.id === editableUserId ? editedUser : user)));
            setEditableUserId(null);
            alert("User updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg text-sm shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>

            {/* Form tạo user */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Create New User</h3>
                <div className="grid grid-cols-3 gap-3">
                    <input type="text" placeholder="First Name" className="border px-2 py-1"
                        value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                    <input type="text" placeholder="Last Name" className="border px-2 py-1"
                        value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                    <input type="email" placeholder="Email" className="border px-2 py-1"
                        value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    <input type="password" placeholder="Password" className="border px-2 py-1"
                        value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                    <input type="text" placeholder="Avatar URL" className="border px-2 py-1"
                        value={newUser.avatar} onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })} />
                    <input type="text" placeholder="Phone" className="border px-2 py-1"
                        value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
                    <input type="number" placeholder="Age" className="border px-2 py-1"
                        value={newUser.age} onChange={(e) => setNewUser({ ...newUser, age: e.target.value })} />
                    <input type="text" placeholder="Address" className="border px-2 py-1"
                        value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                </div>
                <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
                    onClick={handleCreateUser}>
                    <PlusCircleIcon className="h-5 w-5 mr-2" /> Create User
                </button>
            </div>

            <div className="max-h-[340px] overflow-y-auto border border-gray-300 rounded-lg">
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

                                    {/* input place when editing*/}
                                    {editableUserId === user.id ? (
                                        <>
                                            <td className="border p-3">
                                                <input
                                                    type="text"
                                                    value={editedUser.firstName}
                                                    onChange={(e) => handleChange(e, "firstName")}
                                                    className="w-full border px-2 py-1"
                                                />
                                            </td>
                                            <td className="border p-3">
                                                <input
                                                    type="text"
                                                    value={editedUser.lastName}
                                                    onChange={(e) => handleChange(e, "lastName")}
                                                    className="w-full border px-2 py-1"
                                                />
                                            </td>
                                            <td className="border p-3">
                                                <input
                                                    type="email"
                                                    value={editedUser.email}
                                                    onChange={(e) => handleChange(e, "email")}
                                                    className="w-full border px-2 py-1"
                                                />
                                            </td>
                                            <td className="border p-3">
                                                <input
                                                    type="text"
                                                    value={editedUser.phone}
                                                    onChange={(e) => handleChange(e, "phone")}
                                                    className="w-full border px-2 py-1"
                                                />
                                            </td>
                                            <td className="border p-3">
                                                <input
                                                    type="number"
                                                    value={editedUser.age}
                                                    onChange={(e) => handleChange(e, "age")}
                                                    className="w-full border px-2 py-1"
                                                />
                                            </td>
                                            <td className="border p-3">
                                                <input
                                                    type="text"
                                                    value={editedUser.address}
                                                    onChange={(e) => handleChange(e, "address")}
                                                    className="w-full border px-2 py-1"
                                                />
                                            </td>
                                        </>
                                    ) : (
                                        // static data if not being edited
                                        <>
                                            <td className="border p-3">{user.firstName}</td>
                                            <td className="border p-3">{user.lastName}</td>
                                            <td className="border p-3">{user.email}</td>
                                            <td className="border p-3">{user.phone}</td>
                                            <td className="border p-3">{user.age}</td>
                                            <td className="border p-3">{user.address}</td>
                                        </>
                                    )}

                                    {/* Actions */}
                                    <td className="border p-3 flex justify-center gap-2">
                                        {editableUserId === user.id ? (
                                            <>
                                                {/* Save */}
                                                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700" onClick={handleSave}>
                                                    <CheckIcon className="h-5 w-5 inline" />
                                                </button>
                                                {/* Cancel */}
                                                <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700" onClick={handleCancelEdit}>
                                                    <XMarkIcon className="h-5 w-5 inline" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {/* Edit */}
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => handleEdit(user)}>
                                                    <PencilIcon className="h-5 w-5 inline" />
                                                </button>
                                                {/* Delete */}
                                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(user.id)}>
                                                    <TrashIcon className="h-5 w-5 inline" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="border p-3 text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserManagement;

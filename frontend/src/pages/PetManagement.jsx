import { useContext, useEffect, useState } from "react";
import { getAllPetAPI } from "../axios/axios.api";
import { CheckIcon, XMarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";

const PetManagement = () => {
    const [pets, setPets] = useState([]);
    const [editablePetId, setEditablePetId] = useState(null);
    const [editedPet, setEditedPet] = useState({});
    const { setLoading } = useContext(AuthContext);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        setLoading(true);
        try {
            const response = await getAllPetAPI();
            setPets(response);
        } catch (error) {
            console.error("Error fetching pets:", error);
            alert("Failed to fetch pets.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (pet) => {
        setEditablePetId(pet.id);
        setEditedPet({ ...pet });
    };

    const handleCancelEdit = () => {
        setEditablePetId(null);
        setEditedPet({});
    };

    const handleChange = (e, field) => {
        setEditedPet({ ...editedPet, [field]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await updatePetAPI(editablePetId, editedPet);
            setPets(pets.map(pet => (pet.id === editablePetId ? editedPet : pet)));
            setEditablePetId(null);
            alert("Pet updated successfully!");
        } catch (error) {
            console.error("Error updating pet:", error);
            alert("Failed to update pet.");
        }
    };

    const handleDelete = async (petId) => {
        if (!window.confirm("Are you sure you want to delete this pet?")) return;

        try {
            await deletePetAPI(petId);
            setPets(pets.filter(pet => pet.id !== petId));
            alert("Pet deleted successfully!");
        } catch (error) {
            console.error("Error deleting pet:", error);
            alert("Failed to delete pet.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg text-sm shadow-md">
            <h2 className="text-2xl font-bold mb-4">Pet Management</h2>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3">ID</th>
                        <th className="border p-3">Name</th>
                        <th className="border p-3">Species</th>
                        <th className="border p-3">Image</th>
                        <th className="border p-3">Age</th>
                        <th className="border p-3">Weight</th>
                        <th className="border p-3">Gender</th>
                        <th className="border p-3">Status</th>
                        <th className="border p-3">Description</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.length > 0 ? (
                        pets.map((pet) => (
                            <tr key={pet.id} className="text-center hover:bg-gray-50">
                                <td className="border p-3">{pet.id}</td>
                                {editablePetId === pet.id ? (
                                    <>
                                        <td className="border p-3"><input type="text" value={editedPet.name} onChange={(e) => handleChange(e, "name")} className="w-full border px-2 py-1" /></td>
                                        <td className="border p-3"><input type="text" value={editedPet.species} onChange={(e) => handleChange(e, "species")} className="w-full border px-2 py-1" /></td>
                                        <td className="border p-3"><input type="text" value={editedPet.image} onChange={(e) => handleChange(e, "imgUrl")} className="w-full border px-2 py-1" /></td>
                                        <td className="border p-3"><input type="number" value={editedPet.age} onChange={(e) => handleChange(e, "age")} className="w-full border px-2 py-1" /></td>
                                        <td className="border p-3"><input type="number" value={editedPet.weight} onChange={(e) => handleChange(e, "weight")} className="w-full border px-2 py-1" /></td>
                                        <td className="border p-3"><input type="text" value={editedPet.gender} onChange={(e) => handleChange(e, "gender")} className="w-full border px-2 py-1" /></td>
                                        <td className="border p-3"><input type="text" value={editedPet.status} onChange={(e) => handleChange(e, "status")} className="w-full border px-2 py-1" /></td>
                                        <td className="border p-3"><input type="text" value={editedPet.description} onChange={(e) => handleChange(e, "description")} className="w-full border px-2 py-1" /></td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border p-3">{pet.name}</td>
                                        <td className="border p-3">{pet.species}</td>
                                        <td className="border p-3">
                                            <img src={pet.image} alt={pet.name} className="w-16 h-16 object-cover rounded-md mx-auto" />
                                        </td>
                                        <td className="border p-3">{pet.age}</td>
                                        <td className="border p-3">{pet.weight}</td>
                                        <td className="border p-3">{pet.gender}</td>
                                        <td className="border p-3">{pet.status}</td>
                                        <td className="border p-3">{pet.description}</td>
                                    </>
                                )}
                                <td className="border p-3 flex justify-center gap-2">
                                    {editablePetId === pet.id ? (
                                        <>
                                            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700" onClick={handleSave}><CheckIcon className="h-5 w-5 inline" /></button>
                                            <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700" onClick={handleCancelEdit}><XMarkIcon className="h-5 w-5 inline" /></button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => handleEdit(pet)}><PencilIcon className="h-5 w-5 inline" /></button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(pet.id)}><TrashIcon className="h-5 w-5 inline" /></button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : <tr><td colSpan="10" className="border p-3 text-center text-gray-500">No pets available</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default PetManagement;

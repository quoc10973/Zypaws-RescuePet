import { useContext, useEffect, useState } from "react";
import { getAllPetAPI, deletePetAPI, updatePetAPI, createPetAPI } from "../axios/axios.api";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";

const PetManagement = () => {
    const [pets, setPets] = useState([]);
    const [editablePetId, setEditablePetId] = useState(null);
    const [editedPet, setEditedPet] = useState({});
    const { setLoading } = useContext(AuthContext);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newPet, setNewPet] = useState(
        {
            name: "",
            species: "DOG",
            age: "",
            weight: "",
            gender: "MALE",
            status: "AVAILABLE",
            description: "",
            image: null
        });


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
        setEditedPet(prev => ({
            ...prev,
            [field]: e.target.value
        }));
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

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Thay bằng upload_preset của bạn
        formData.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER);

        try {
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            };

            const data = await response.json();
            return data.secure_url; // URL ảnh sau khi upload
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
            return null;
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // set temp file
        }
    };

    const handleCreatePet = async () => {
        try {
            let imageUrl = "";
            if (selectedFile) {
                imageUrl = await uploadImage(selectedFile); // Chỉ upload nếu có file ảnh
                if (!imageUrl) {
                    alert("Please upload a image.");
                    return;
                }
            }
            const createdPet = await createPetAPI({ ...newPet, image: imageUrl });
            setPets([...pets, createdPet]);
            setIsCreating(false);
            setNewPet({ name: "", species: "DOG", age: "", weight: "", gender: "MALE", status: "AVAILABLE", description: "", image: "" });
            alert("Pet created successfully!");
        } catch (error) {
            console.error("Error creating pet:", error);
            alert("Failed to create pet.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg text-sm shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-4">Pet Management</h2>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                    onClick={() => setIsCreating(true)}
                >
                    <PlusIcon className="h-5 w-5 inline" />
                    Create Pet
                </button>
            </div>

            {isCreating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h3 className="text-xl font-bold mb-2">Create New Pet</h3>
                        <input type="text" placeholder="Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} className="border p-2 w-full mb-2" />
                        <select value={newPet.species} onChange={(e) => setNewPet({ ...newPet, species: e.target.value })} className="border p-2 w-full mb-2">
                            <option value="DOG">Dog</option>
                            <option value="CAT">Cat</option>
                            <option value="RABBIT">Rabbit</option>
                            <option value="RODENT">Rodent</option>
                            <option value="SHEEP">Sheep</option>
                        </select>
                        <div>
                            <input type="text" placeholder="Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} />
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            {newPet.image && <img src={newPet.image} alt="Preview" className="w-24 h-24 object-cover" />}
                        </div>
                        <input type="number" placeholder="Age" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: Number(e.target.value) || "" })} className="border p-2 w-full mb-2" />
                        <input type="number" placeholder="Weight" value={newPet.weight} onChange={(e) => setNewPet({ ...newPet, weight: Number(e.target.value) || "" })} className="border p-2 w-full mb-2" />
                        <textarea placeholder="Description" value={newPet.description} onChange={(e) => setNewPet({ ...newPet, description: e.target.value })} className="border p-2 w-full mb-2"></textarea>
                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={() => setIsCreating(false)}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleCreatePet}>Create</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-h-[550px] overflow-y-auto border border-gray-300 rounded-lg">
                <table className="w-full table-auto border-collapse">
                    <thead className=" top-0 bg-white shadow-sm">
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
                                    <td className="border p-3">
                                        {editablePetId === pet.id ? (
                                            <input type="text" value={editedPet.name || ""} onChange={(e) => handleChange(e, "name")} className="border p-1 w-full" />
                                        ) : (
                                            pet.name
                                        )}
                                    </td>
                                    <td className="border p-3">
                                        {editablePetId === pet.id ? (
                                            <input type="text" value={editedPet.species || ""} onChange={(e) => handleChange(e, "species")} className="border p-1 w-full" />
                                        ) : (
                                            pet.species
                                        )}
                                    </td>
                                    <td className="border p-3">
                                        <img src={pet.image} alt={pet.name} className="w-16 h-16 object-cover rounded-md mx-auto" />
                                    </td>
                                    <td className="border p-3">
                                        {editablePetId === pet.id ? (
                                            <input type="number" value={editedPet.age || ""} onChange={(e) => handleChange(e, "age")} className="border p-1 w-full" />
                                        ) : (
                                            pet.age
                                        )}
                                    </td>
                                    <td className="border p-3">
                                        {editablePetId === pet.id ? (
                                            <input type="number" value={editedPet.weight || ""} onChange={(e) => handleChange(e, "weight")} className="border p-1 w-full" />
                                        ) : (
                                            pet.weight
                                        )}
                                    </td>
                                    <td className="border p-3">
                                        {editablePetId === pet.id ? (
                                            <select value={editedPet.gender || ""} onChange={(e) => handleChange(e, "gender")} className="border p-1 w-full">
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                            </select>
                                        ) : (
                                            pet.gender
                                        )}
                                    </td>
                                    <td className="border p-3">
                                        {editablePetId === pet.id ? (
                                            <select value={editedPet.status || ""} onChange={(e) => handleChange(e, "status")} className="border p-1 w-full">
                                                <option value="AVAILABLE">Available</option>
                                                <option value="PENDING">Pending</option>
                                                <option value="ADOPTED">Adopted</option>
                                            </select>
                                        ) : (
                                            pet.status
                                        )}
                                    </td>
                                    <td className="border p-3">
                                        {editablePetId === pet.id ? (
                                            <textarea value={editedPet.description || ""} onChange={(e) => handleChange(e, "description")} className="border p-1 w-full" />
                                        ) : (
                                            pet.description
                                        )}
                                    </td>
                                    <td className="border p-3 flex justify-center gap-2">
                                        {editablePetId === pet.id ? (
                                            <>
                                                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1" onClick={handleSave}>
                                                    <CheckIcon className="h-5 w-5 inline" />
                                                </button>
                                                <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 flex items-center gap-1" onClick={handleCancelEdit}>
                                                    <XMarkIcon className="h-5 w-5 inline" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1" onClick={() => handleEdit(pet)}>
                                                    <PencilIcon className="h-5 w-5 inline" />
                                                </button>
                                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1" onClick={() => handleDelete(pet.id)}>
                                                    <TrashIcon className="h-5 w-5 inline" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="border p-3 text-center text-gray-500">No pets available</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
            {isCreating && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                    <h3 className="text-xl font-bold mb-2">Create New Pet</h3>
                    <input type="text" placeholder="Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} className="border p-2 w-full mb-2" />
                    <select value={newPet.species} onChange={(e) => setNewPet({ ...newPet, species: e.target.value })} className="border p-2 w-full mb-2">
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="rodent">Rodent</option>
                        <option value="sheep">Sheep</option>
                    </select>
                    <input type="number" placeholder="Age" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} className="border p-2 w-full mb-2" />
                    <input type="number" placeholder="Weight" value={newPet.weight} onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })} className="border p-2 w-full mb-2" />
                    <div className="flex justify-end gap-2">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={() => setIsCreating(false)}>Cancel</button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleCreatePet}>Create</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetManagement;

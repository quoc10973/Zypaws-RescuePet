import { useContext, useEffect, useState } from "react";
import { getUserFavoritesAPI, removePetFromFavoriteAPI } from "../axios/axios.api"
import { AuthContext } from "../context/AuthContext";
import MobileTopBar from "../component/MobileTopBar";
import { motion } from "framer-motion";
import { pets as petImages } from '../assets/assets';
import { Link } from "react-router-dom";
import { HeartIcon } from '@heroicons/react/20/solid';

const FavoritePage = () => {
    const [pets, setPets] = useState([]);
    const { setLoading } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPets, setFilteredPets] = useState([]);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 12;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const response = await getUserFavoritesAPI();
                console.log('Favorite pets:', response);
                setPets(response || []);
            } catch (error) {
                console.error('Error fetching pet favorites:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        let results = pets.filter(pet =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (statusFilter === 'AVAILABLE') {
            results = results.filter(pet => pet.status === 'AVAILABLE');
        }

        setFilteredPets(results);

        // if search term or status filter changes, reset to page 1
        if (searchTerm || statusFilter !== 'ALL') {
            setCurrentPage(1);
        }
    }, [searchTerm, statusFilter, pets]);

    const handleRemoveFavorite = async (petId) => {
        try {
            setLoading(true);
            console.log(petId);
            await removePetFromFavoriteAPI(petId);
            const updatedPets = pets.filter(pet => pet.id !== petId);
            setPets(updatedPets);
        } catch (error) {
            console.error('Error removing favorite pet:', error);
        } finally {
            setLoading(false);
        }
    }

    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

    return (
        <div>
            <MobileTopBar />
            <div className='text-center text-4xl font-lora italic font-semibold p-8 md:p-5'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='mt-0 md:mt-8'
                >
                    My Favorites 🐾🐾
                </motion.div>
            </div>

            {/* Sidebar filter */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 px-5 mx-auto">

                <div className="sm:w-1/5 flex-shrink-0 px-3">
                    {/* Search bar */}
                    <div className="text-xl font-semibold">Your lovely pets: {filteredPets.length} pets</div>
                    <input
                        type="text"
                        placeholder="Search for a pet..."
                        className="border rounded-md p-2 w-full mt-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filter by Status Available and All */}
                    <div className="mt-4">
                        <div className="text-lg font-semibold mb-2">Status</div>
                        <div className="flex items-center gap-3">
                            {/* All Pets */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="ALL"
                                    checked={statusFilter === 'ALL'}
                                    onChange={() => setStatusFilter('ALL')}
                                    className="hidden"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 ${statusFilter === 'ALL' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`} />
                                All
                            </label>

                            {/* Available Pets */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="AVAILABLE"
                                    checked={statusFilter === 'AVAILABLE'}
                                    onChange={() => setStatusFilter('AVAILABLE')}
                                    className="hidden"
                                />
                                <div className={`w-5 h-5 rounded-full border-2 ${statusFilter === 'AVAILABLE' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`} />
                                Available
                            </label>
                        </div>
                    </div>


                    {/* Clear Filters */}
                    <button
                        className="mt-4 w-full bg-slate-700 text-white py-2 rounded-md hover:bg-slate-800 transition"
                        onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('ALL');
                        }}
                    >
                        Clear Filters
                    </button>

                </div>

                {/* Pet Listing */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[300px] items-start">
                    {currentPets.map((pet) => {
                        const petImage = petImages[pet.image] || '/default-image.jpg';
                        return (
                            <div key={pet.id} className="border rounded-lg shadow-md p-3 relative transition-transform transform hover:-translate-y-2 duration-300">
                                <div className="absolute top-5 right-5 bg-zinc-800 rounded-full p-3 group">
                                    <div
                                        className="text-red-500 hover:text-white cursor-pointer relative"
                                        onClick={() => handleRemoveFavorite((pet.id))} // call remove favorite function
                                    >
                                        <HeartIcon className="h-5 w-5" />
                                        {/* Tooltip show when hover */}
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Unfavorite
                                        </span>
                                    </div>
                                </div>


                                <img alt={pet.name} src={petImage} className="h-72 w-full object-cover rounded-md" />
                                <h2 className="text-lg font-semibold mt-2">{pet.name}</h2>
                                <p className="text-gray-500">{pet.age} month</p>
                                <Link to={`/pet/${pet.id}`} className="text-blue-500 hover:underline">View Details</Link>
                            </div>
                        );
                    })}
                </div>

            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 mb-10 gap-2">
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>

                <span className="px-4 py-2 bg-gray-200 rounded-md">
                    Page {currentPage} of {Math.ceil(filteredPets.length / petsPerPage)}
                </span>

                <button
                    className={`px-4 py-2 rounded-md ${indexOfLastPet >= filteredPets.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    disabled={indexOfLastPet >= filteredPets.length}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default FavoritePage
import React, { useEffect, useState } from 'react';
import { getAllPetAPI } from '../axios/axios.api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { pets as petImages } from '../assets/assets';
import { assets } from '../assets/assets';
import { HeartIcon } from '@heroicons/react/20/solid';
import MobileTopBar from '../component/MobileTopBar';
import { motion } from 'framer-motion';

const ListingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const petTypeFromURL = searchParams.get('petType') || '';

    // Get the current page from session storage or URL
    const storedPage = sessionStorage.getItem("currentPage");
    const initialPage = storedPage ? parseInt(storedPage) : parseInt(searchParams.get("page")) || 1;

    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPets, setFilteredPets] = useState([]);
    const [speciesFilter, setSpeciesFilter] = useState(petTypeFromURL.toUpperCase());
    const [genderFilter, setGenderFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(initialPage);
    const petsPerPage = 12;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle pagination
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        sessionStorage.setItem("currentPage", newPage);
        navigate(`/listing?page=${newPage}`);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getAllPetAPI();
                setPets(response);
                setFilteredPets(response);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        if (pets.length === 0) {
            fetchPets();
        }
    }, []);

    useEffect(() => {
        setSpeciesFilter(petTypeFromURL.toUpperCase());
    }, [petTypeFromURL]);

    useEffect(() => {
        const results = pets.filter(pet =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (speciesFilter ? pet.species === speciesFilter : true) &&
            (genderFilter ? pet.gender === genderFilter : true)
        );
        setFilteredPets(results);

        // If any filter is applied, reset the page to 1
        if (searchTerm || speciesFilter || genderFilter) {
            setCurrentPage(1);
        }
    }, [searchTerm, speciesFilter, genderFilter, pets]);

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
                    Graww !! Finding new friends for you 🐾🐾
                </motion.div>
                <div className='flex justify-center mt-5 md:mt-0'>
                    <img src={assets.decorate3} alt='Decorate 3' className='block sm:hidden w-12 h-44 mb-[-50px]' />
                </div>
            </div>


            {/* Sidebar filter */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 px-5 mx-auto">

                <div className="sm:w-1/5 flex-shrink-0 px-3">
                    {/* Search bar */}
                    <div className="text-xl font-semibold">Search results: {filteredPets.length} pets</div>
                    <input
                        type="text"
                        placeholder="Search for a pet..."
                        className="border rounded-md p-2 w-full mt-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filter by species */}
                    <div className="mt-4">
                        <label className="block font-semibold">Species</label>
                        <select
                            className="border rounded-md p-2 w-full mt-1"
                            value={speciesFilter}
                            onChange={(e) => setSpeciesFilter(e.target.value)}
                        >
                            <option value="">All Species</option>
                            <option value="DOG">Dog</option>
                            <option value="CAT">Cat</option>
                            <option value="RABBIT">Rabbit</option>
                        </select>
                    </div>

                    {/* Filter by gender */}
                    <div className="mt-4">
                        <label className="block font-semibold">Gender</label>
                        <select
                            className="border rounded-md p-2 w-full mt-1"
                            value={genderFilter}
                            onChange={(e) => setGenderFilter(e.target.value)}
                        >
                            <option value="">All Genders</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>

                    {/* Clear Filters */}
                    <button
                        className="mt-4 w-full bg-slate-700 text-white py-2 rounded-md hover:bg-slate-800 transition"
                        onClick={() => {
                            setSearchTerm('');
                            setSpeciesFilter('');
                            setGenderFilter('');
                        }}
                    >
                        Clear Filters
                    </button>

                    {/* Information */}
                    <div className="hidden sm:block mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800">About Zypaws</h3>
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                            Zypaws Home Pet Rescue is a dedicated non-profit organization committed to rescuing, rehabilitating,
                            and rehoming abandoned pets. Our mission is to provide compassionate care, medical treatment, and
                            foster support to ensure every pet finds a safe and loving forever home.
                        </p>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            We work closely with local shelters, veterinary clinics, and caring volunteers to rescue animals in need,
                            offering them a second chance at life. Through adoption services, community outreach, and educational programs,
                            we strive to promote responsible pet ownership and reduce the number of homeless animals.
                        </p>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            Whether you're looking to adopt, foster, volunteer, or donate, your support helps us continue our mission
                            of saving lives and creating happy endings for pets in need.
                        </p>
                        <Link to="/about" className="text-blue-500 hover:underline mt-3 block text-sm font-medium">
                            Learn More About Our Mission
                        </Link>
                    </div>
                </div>

                {/* Pet Listing */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[300px] items-start">
                    {currentPets.map((pet) => {
                        const petImage = petImages[pet.image] || '/default-image.jpg';
                        return (
                            <div key={pet.id} className="border rounded-lg shadow-md p-3 relative transition-transform transform hover:-translate-y-2 duration-300">
                                <div className="absolute top-5 right-5 bg-zinc-800 rounded-full p-3">
                                    <Link to={`/favorite/${pet.id}`} className="text-white hover:text-red-500">
                                        <HeartIcon className="h-5 w-5" />
                                    </Link>
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
    );
};

export default ListingPage;

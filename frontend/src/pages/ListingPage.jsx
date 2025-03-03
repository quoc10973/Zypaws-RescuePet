import React, { useEffect, useState } from 'react';
import { getAllPetAPI } from '../axios/axios.api';
import { Link } from 'react-router-dom';
import { pets as petImages } from '../assets/assets';
import { assets } from '../assets/assets';
import { HeartIcon } from '@heroicons/react/20/solid';
import MobileTopBar from '../component/MobileTopBar';

const ListingPage = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getAllPetAPI();
                setPets(response);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };
        fetchPets();
    }, []);

    return (
        <div>
            <MobileTopBar />
            <div className='text-center text-4xl font-lora italic font-semibold p-8 md:p-14'>
                Graww !! Finding new friends for you 🐾🐾
                <div className='flex justify-center mt-5 md:mt-0'>
                    <img src={assets.decorate3} alt='Decorate 3' className='block sm:hidden w-12 h-44 mb-[-50px]' />
                </div>
            </div>



            <div className="flex flex-col sm:flex-row gap-4 p-4 px-5 mx-auto">
                <div>
                    Search results: {pets.length} pets
                </div>
                {/* Pet listing */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pets.map((pet) => {
                        const petImage = petImages[pet.image] || '/default-image.jpg';
                        return (
                            <div key={pet.id} className="border rounded-lg shadow-md p-3 relative transition-transform transform hover:-translate-y-2 duration-300 cursor-pointer">
                                <div className="absolute top-5 right-5 bg-zinc-800 rounded-full p-3 flex items-center justify-center hover:scale-110 transition-transform duration-200">
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
        </div>
    );
};

export default ListingPage;

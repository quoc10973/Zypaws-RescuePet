import React, { useEffect, useState, useRef } from 'react';
import { getAllPetsAPI } from '../axios/axios.api';
import { pets as petImages } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PetAvailable = () => {
    const [pets, setPets] = useState([]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getAllPetsAPI();
                setPets(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPets();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center p-10 space-y-10 my-4 relative'>
            <h1 className='text-4xl text-slate-800 font-lora font-semibold'>Pets Available for Adoption</h1>

            <div className="relative w-full max-w-4xl">
                {/* Nút điều hướng trái */}
                <button
                    ref={prevRef}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-200"
                >
                    <FaChevronLeft className="text-xl text-gray-700" />
                </button>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }} // Thêm autoplay
                    onSwiper={(swiper) => {
                        setTimeout(() => {
                            if (swiper && swiper.params.navigation) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className='w-full flex justify-center'
                >
                    {pets.map((pet) => {
                        const petImage = petImages[pet.image] || '/default-image.jpg';

                        return (
                            <SwiperSlide key={pet.id} className='flex justify-center items-center'>
                                <motion.div
                                    className='bg-white shadow-md rounded-lg p-3 w-80 sm:w-96 relative overflow-hidden cursor-pointer'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(`/pet/${pet.id}`)}
                                >
                                    <img
                                        src={petImage}
                                        alt={pet.name}
                                        className='w-full h-64 object-cover rounded-md transition-all duration-300'
                                    />
                                    <h2 className='text-xl font-lora font-semibold mt-3'>{pet.name}</h2>
                                    <p className='text-gray-600 text-sm font-poppins'>{pet.status}</p>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* Bọc nút điều hướng trong div để căn chỉnh đẹp hơn */}
                <div className="absolute inset-y-0 left-0 flex items-center z-10">
                    <button ref={prevRef} className="bg-white shadow-md p-3 rounded-full hover:bg-gray-200">
                        <FaChevronLeft className="text-xl text-gray-700" />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                    <button ref={nextRef} className="bg-white shadow-md p-3 rounded-full hover:bg-gray-200">
                        <FaChevronRight className="text-xl text-gray-700" />
                    </button>
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate('/all-pets')}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Meet more friends
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PetAvailable;

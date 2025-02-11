import React, { useEffect, useState, useRef } from 'react';
import { getAllPetsAPI } from '../axios/axios.api';
import { pets as petImages } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
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
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    pagination={{ clickable: true }}
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
                    className='w-full'
                >
                    {pets.map((pet) => {
                        const petImage = petImages[pet.image] || '/default-image.jpg';

                        return (
                            <SwiperSlide key={pet.id} className='flex justify-center'>
                                <motion.div
                                    className='bg-white shadow-md rounded-lg p-5 w-80 relative overflow-hidden cursor-pointer'
                                    whileHover={{ scale: 1.05 }} // Chỉ phóng to khi hover
                                    whileTap={{ scale: 0.95 }} // Nhấn vào thì thu nhỏ nhẹ
                                    onClick={() => navigate(`/pet/${pet.id}`)}
                                >
                                    <img
                                        src={petImage}
                                        alt={pet.name}
                                        className='w-full h-48 object-cover rounded-md transition-all duration-300'
                                    />
                                    <h2 className='text-xl font-semibold mt-3'>{pet.name}</h2>
                                    <p className='text-gray-600'>{pet.status}</p>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* Nút điều hướng phải */}
                <button
                    ref={nextRef}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-200"
                >
                    <FaChevronRight className="text-xl text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default PetAvailable;

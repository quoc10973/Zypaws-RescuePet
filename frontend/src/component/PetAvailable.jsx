import React, { useEffect, useState, useRef } from 'react';
import { getPetAvailable, getPetAPI } from '../axios/axios.api';
import { pets as petImages } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const PetAvailable = () => {
    const [pets, setPets] = useState([]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const navigate = useNavigate();

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getPetAvailable();
                const shuffledPets = shuffleArray(response);
                setPets(shuffledPets);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPets();
    }, []);

    const handlePetClick = async (id) => {
        try {
            const petDetails = await getPetAPI(id); // Gọi API lấy thông tin pet
            if (petDetails) {
                navigate(`/pet/${id}`, { state: { petDetails } }); // Điều hướng kèm dữ liệu
            }
        } catch (error) {
            console.error('Failed to fetch pet details:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center p-10 space-y-10 my-4 relative'>
            <h1 className='text-4xl text-slate-800 font-lora font-semibold'>Pets Available for Adoption</h1>

            <div className="relative w-full max-w-6xl">
                {/* Nút điều hướng trái */}
                <button
                    ref={prevRef}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hover:bg-gray-200"
                >
                    <FaChevronLeft className="text-xl text-gray-700" />
                </button>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={40}
                    slidesPerView={1}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }} // Thêm autoplay
                    onSwiper={(swiper) => {
                        setTimeout(() => {
                            if (swiper && swiper.params.navigation && prevRef.current && nextRef.current) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation?.init(); // Dùng optional chaining để tránh lỗi nếu navigation chưa sẵn sàng
                                swiper.navigation?.update();
                            }
                        }, 0); // Đảm bảo chạy sau khi component render xong
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
                                    onClick={() => handlePetClick(pet.id)} // Gọi API khi click vào pet
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
                    <motion.div
                        whileHover={{ scale: 1.05 }} // Phóng to nhẹ khi hover
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <Link
                            to="/all-pets"
                            className="text-lg text-slate-800 font-signika underline hover:text-slate-600 transition-all duration-300 flex items-center gap-1"
                        >
                            Meet more friends
                            <motion.div
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }} // Dịch sang phải khi hover
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default PetAvailable;

import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getPetAPI } from '../axios/axios.api';
import { pets as petImages } from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import PetAvailable from '../component/PetAvailable';
import Partners from '../component/Partners';
import DonatetionBanner from '../component/DonatetionBanner';
import { assets } from '../assets/assets';
import MobileTopBar from '../component/MobileTopBar';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PetDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [pet, setPet] = useState(location.state?.petDetails || null);
    const { setLoading } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        setPet(null);
        setLoading(true);

        const fetchPet = async () => {
            try {
                const petDetails = await getPetAPI(id);
                setPet(petDetails);
            } catch (error) {
                console.error('Error fetching pet details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    if (!pet) {
        return <p className="text-center text-lg font-medium">Loading pet details...</p>;
    }

    const petImage = petImages[pet.image] || '/default-image.jpg';

    return (
        <>
            <MobileTopBar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto text-center py-6"
            >
                <h1 className="text-xl mt-0 mb-[-30px] md:mb-0 md:mt-5 md:text-4xl font-lora font-bold text-gray-900 shadow-sm">
                    Will you give <span className="text-purple-700">{pet.name}</span> a forever home? 🏡
                </h1>
            </motion.div>
            <div className="max-w-7xl mx-auto mb-10 p-6 md:p-10 shadow-lg rounded-lg bg-white flex flex-col md:flex-row gap-10">
                <div className="flex-1 flex justify-center">
                    <img src={petImage} alt={pet.name} className="w-full max-w-md h-auto object-cover rounded-lg shadow-md cursor-pointer" onClick={() => setIsModalOpen(true)} />
                </div>

                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">{pet.name}</h1>
                    <p className="text-lg text-gray-700">Age: <span className="font-semibold">{pet.age} months</span></p>
                    <p className="text-lg text-gray-700">Gender: <span className="font-semibold">{pet.gender}</span></p>
                    <p className="text-gray-600">{pet.description}</p>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800">About</h2>
                        <p className="text-sm text-gray-600">Vaccinations: {pet.vaccinated ? 'Up to date' : 'Not vaccinated'}</p>
                    </div>
                </div>

                <div className="flex-1 bg-purple-700 p-6 rounded-lg text-white space-y-4">
                    <h2 className="text-xl font-semibold">Considering {pet.name} for adoption?</h2>

                    <Link to="/inquiry" className="w-full block text-center bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-gray-100">
                        Start Your Inquiry
                    </Link>

                    <Link to="/faqs" className="w-full block text-center border border-white py-2 rounded-lg hover:bg-white hover:text-purple-700">
                        Read FAQs
                    </Link>

                    <div className="flex justify-center gap-7 mt-4">
                        <Link to="/donation" className="flex items-center mt-5 gap-2 bg-white text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                            🎗 Sponsor
                        </Link>
                        <Link to="/favorite" className="flex items-center mt-5 gap-2 bg-white text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
                            ❤️ Favorite
                        </Link>
                    </div>
                </div>
            </div>

            {/* Google Map & More About Us */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mb-10">
                {/* Google Map - Bên trái */}
                <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Google Map</h2>
                    <iframe
                        className="w-full h-64 rounded-lg shadow-md"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530477!2d106.80730807427238!3d10.841132857998423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1740490888381!5m2!1svi!2s"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>

                {/* More About Us - Bên phải */}
                <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-500 p-4 rounded-full">
                            <img src={assets.pawlogo} alt="Logo" className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-semibold">Zypaws Animals In Need</h2>
                    </div>
                    <div className='mt-6'>
                        <p className="text-gray-700 mt-4">FPTU, VN</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-600">📍 Location Address:</span>
                            <p className="text-gray-900 font-medium">Ho Chi Minh, VN</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-600">📞 Phone:</span>
                            <a href="tel:+16716534246" className="text-purple-700 font-medium">(+84) 838699817</a>
                        </div>
                    </div>
                    <Link
                        to="/about"
                        className="block text-center bg-purple-600 text-white font-semibold py-2 rounded-lg mt-11 hover:bg-purple-800"
                    >
                        More About Us
                    </Link>
                </div>
            </div>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative bg-white p-4 rounded-lg shadow-lg">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                            onClick={() => setIsModalOpen(false)}
                        >✖</button>
                        <img src={petImage} alt={pet.name} className="w-full h-auto max-w-2xl rounded-lg" />
                    </div>
                </motion.div>
            )}
            <PetAvailable />
            <Partners />
            <DonatetionBanner />
        </>
    );
};

export default PetDetail;

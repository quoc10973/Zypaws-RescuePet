import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getPetAPI } from '../axios/axios.api';
import { getPetImage } from '../assets/assets';
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
    const [isChecked, setIsChecked] = useState(false);

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

    return (
        <>
            <MobileTopBar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto text-center py-6"
            >
                <h1 className="text-lg mt-0 mb-[-30px] md:mb-0 md:mt-5 md:text-4xl font-lora font-bold text-gray-900">
                    Will you give <span className="text-green-800 text-2xl md:text-6xl font-dancing">{pet.name}</span> a forever home? 🏡
                </h1>
            </motion.div>
            <div className="max-w-7xl mx-auto mb-10 p-6 md:p-10 shadow-lg rounded-lg bg-white flex flex-col md:flex-row gap-10">
                <div className="flex-1 flex justify-center">
                    <img
                        src={getPetImage(pet.image)}
                        alt={pet.name}
                        className="w-full max-w-md h-auto object-cover rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">🐾{pet.name}🐾</h1>
                    <p className="text-lg text-gray-700">Age: <span className="font-semibold">{pet.age} months</span></p>
                    <p className="text-lg text-gray-700">Gender: <span className="font-semibold">{pet.gender}</span></p>
                    <p className="text-lg text-gray-700">Weight: <span className="font-semibold">{pet.weight || "Not available"} kg</span></p>
                    <p className="text-gray-600">{pet.description}</p>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800">About</h2>
                        <p className="text-sm text-gray-600">Vaccinations: {pet.vaccinated ? 'Up to date' : 'Not vaccinated'}</p>
                    </div>
                </div>

                <div className="flex-1 bg-cyan-800 p-6 rounded-lg text-white space-y-4">
                    <h2 className="text-xl font-semibold">Considering {pet.name} for adoption?</h2>

                    <Link
                        to={`/pet/${pet.id}/enquire`}
                        className={`w-full block text-center font-semibold py-2 rounded-lg ${isChecked ? "bg-white text-purple-700 hover:bg-gray-100" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                        onClick={(e) => !isChecked && e.preventDefault()}
                    >
                        Start Your Inquiry
                    </Link>
                    <Link to="/faqs" className="w-full block text-center border border-white py-2 rounded-lg hover:bg-white hover:text-purple-700">
                        Read FAQs
                    </Link>

                    {/* Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="adopt-agreement"
                            className="w-5 h-5 cursor-pointer"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="adopt-agreement" className="text-sm">
                            I confirm that I have read and agree to the adoption details.
                        </label>
                    </div>


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

            <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Adoption Details</h2>
                <p className="text-gray-700 mb-4">
                    From here, <span className="font-semibold">Zypaws Home</span> will be in touch to learn more about you and chat with you about the pet.
                    It’s a great opportunity for you to ask any questions you may have about the pet, including its likes and dislikes, needs, and how it may fit into your lifestyle and family.
                </p>
                <p className="text-gray-700 mb-4">
                    If your home and lifestyle match the pet's needs, the next step will be arranging a <span className="font-semibold">meet-and-greet</span> to make sure everyone is happy to proceed with a formal adoption.
                    This session allows you to interact with the pet in a comfortable environment, observe its behavior, and ensure that it is the right fit for you and your household.
                </p>
                <p className="text-gray-700 mb-4">
                    Our team will also provide essential guidance on the pet's diet, exercise needs, training requirements, and medical history.
                    If needed, we will arrange for follow-up consultations to assist you in ensuring a smooth transition for your new companion.
                </p>
                <p className="text-gray-700 mb-4">
                    Once both parties are satisfied, we will proceed with the official adoption process.
                    This includes signing an <span className="font-semibold">adoption agreement</span> that outlines the responsibilities of pet ownership, as well as receiving a detailed adoption packet that contains useful resources on pet care, training tips, and emergency contacts.
                </p>
                <p className="text-gray-700 mb-4">
                    Following the adoption, change of ownership paperwork will be completed, and proof of vaccination, microchipping, and desexing (if applicable, as indicated on the listing) will be provided.
                    You will also receive records of the pet's past medical history and any recommended future treatments or check-ups.
                </p>
                <p className="text-gray-700">
                    At <span className="font-semibold">Zypaws Home</span>, we believe that adopting a pet is a lifelong commitment, and we are here to support you every step of the way.
                    We offer post-adoption support, including training resources, behavioral advice, and connections to veterinary services to help ensure a happy and fulfilling life for both you and your new furry friend.
                </p>
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

                {/* More About Us - Right */}
                <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-cyan-500 p-4 rounded-full">
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
                        className="block text-center bg-cyan-700 text-white font-semibold py-2 rounded-lg mt-11 hover:bg-cyan-800"
                    >
                        More About Us
                    </Link>
                </div>

            </div>
            <div className="bg-cyan-800 font-quicksand text-white text-center py-8 px-4">
                {/* Pet + Detail */}
                <div className="flex flex-col items-center">
                    <img
                        src={getPetImage(pet.image)}
                        alt="pet-name"
                        className="h-24 w-24 rounded-full border-4 border-white mb-4"
                    />
                    <h2 className="text-2xl font-semibold">Ask About {pet.name}</h2>
                    <p className="text-sm text-gray-200">Baby •  {pet.species
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")}
                        {" "}• {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1).toLowerCase()}</p>
                </div>

                {/* Split*/}
                <div className="border-t border-gray-300 my-6 w-3/4 mx-auto"></div>

                {/* Infor */}
                <div className="text-sm">
                    <p className="mb-2">
                        Please note that Zypaws is not able to answer inquiries via email through Petfinder at this time.
                    </p>
                    <p className="mb-2">
                        You may call them with your inquiry at: <span className="font-bold">(+84) 38699817</span>
                    </p>
                    <p>
                        You may also find more information about the organization on homepage: <span className="font-bold">zypaws.com</span>
                    </p>
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
                        <img src={getPetImage(pet.image)} alt={pet.name} className="w-full h-auto max-w-2xl rounded-lg" />
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

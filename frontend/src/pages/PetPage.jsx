import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getPetAPI } from '../axios/axios.api';
import { pets as petImages } from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import PetAvailable from '../component/PetAvailable';
import Partners from '../component/Partners';
import DonatetionBanner from '../component/DonatetionBanner';

const PetDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [pet, setPet] = useState(location.state?.petDetails || null);
    const { setLoading } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        setPet(null); // Reset pet về null khi ID thay đổi
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
    }, [id]); // Khi id thay đổi, fetch dữ liệu mới


    if (!pet) {
        return <p className="text-center text-lg font-medium">Loading pet details...</p>;
    }

    const petImage = petImages[pet.image] || '/default-image.jpg';

    return (
        <>
            <div className="max-w-7xl mx-auto mt-7 mb-10 p-6 md:p-10 shadow-lg rounded-lg bg-white flex flex-col md:flex-row gap-10">
                {/* Hình ảnh thú cưng */}
                <div className="flex-1 flex justify-center">
                    <img src={petImage} alt={pet.name} className="w-full max-w-md h-auto object-cover rounded-lg shadow-md" />
                </div>

                {/* Thông tin thú cưng */}
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">{pet.name}</h1>
                    <p className="text-lg text-gray-700">Age: <span className="font-semibold">{pet.age} month</span></p>
                    <p className="text-lg text-gray-700">Gender: <span className="font-semibold">{pet.gender}</span></p>
                    <p className="text-gray-600">{pet.description}</p>

                    {/* About Section */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800">About</h2>
                        <p className="text-sm text-gray-600">Vaccinations: {pet.vaccinated ? 'Up to date' : 'Not vaccinated'}</p>
                    </div>
                </div>

                {/* Hành động */}
                <div className="flex-1 bg-purple-700 p-6 rounded-lg text-white space-y-4">
                    <h2 className="text-xl font-semibold">Considering {pet.name} for adoption?</h2>
                    <button className="w-full bg-white text-purple-700 font-semibold py-2 rounded-lg hover:bg-gray-100">Start Your Inquiry</button>
                    <button className="w-full border border-white py-2 rounded-lg hover:bg-white hover:text-purple-700">Read FAQs</button>
                    <div className="flex justify-between mt-4">
                        <button className="text-white font-semibold">Sponsor</button>
                        <button className="text-white font-semibold">❤️ Favorite</button>
                    </div>
                </div>

            </div>
            <PetAvailable />
            <Partners />
            <DonatetionBanner />
        </>
    );
};

export default PetDetail;
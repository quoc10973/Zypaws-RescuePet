import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getPetAPI } from '../axios/axios.api';
import { pets as petImages } from '../assets/assets';
import { AuthContext } from '../context/AuthContext';

const PetDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const location = useLocation();
    const [pet, setPet] = useState(location.state?.petDetails || null); // Lưu dữ liệu pet
    const { setLoading } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (!pet) {
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
        }
    }, [id]);

    // Di chuyển kiểm tra pet trước khi sử dụng pet.image
    if (!pet) {
        return <p>Loading pet details...</p>;
    }

    const petImage = petImages[pet.image] || '/default-image.jpg';

    return (
        <div>
            <img src={petImage} alt={pet.name} />
            <p>{pet.description}</p>
        </div>
    );
};

export default PetDetail;

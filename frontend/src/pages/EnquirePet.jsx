import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getPetAPI } from "../axios/axios.api";
import MobileTopBar from "../component/MobileTopBar";
import { motion } from "framer-motion";
import { pets as PetImage } from "../assets/assets";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { createAdoptionAPI } from "../axios/axios.api";



const EnquirePet = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth, setLoading } = useContext(AuthContext);
    const [pet, setPet] = useState(null);
    const [formData, setFormData] = useState({
        name: auth?.user?.name || "",
        email: auth?.user?.email || "",
        phone: auth?.user?.phone || "",
        message: "",
        enquireForSomeoneElse: false,
        emailUpdates: false
    });
    const [errors, setErrors] = useState({});
    const userId = auth?.user?.id || null;
    const [captchaVerified, setCaptchaVerified] = useState(false); // State to store the captcha verification status

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY; // Get the site key from the environment variables

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) { // Check if there are any errors
            window.scrollTo({
                top: window.innerHeight / 2,  // Scroll to 1/2 of the screen height
                left: 0,  // Keep the horizontal scroll at the top
                behavior: "smooth", // Smooth scroll
            });
        }
    }, [errors]);

    useEffect(() => {
        setLoading(true);
        const fetchPet = async () => {
            try {
                const response = await getPetAPI(id);
                setPet(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPet();
    }, [id]);

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.trim())) {
            newErrors.phone = "Phone number in VN must be exactly 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaVerify = (token) => {
        if (token) {
            setCaptchaVerified(true); // ✅ Captcha verified
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!captchaVerified) {
            toast.error("Please verify that you are not a robot!");
            return;
        }

        if (validateForm()) {
            try {
                const createAdoptionDTO = {
                    petId: pet.id,
                    userId: userId,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    enquireForSomeoneElse: formData.enquireForSomeoneElse,
                    emailUpdates: formData.emailUpdates
                }
                const response = await createAdoptionAPI(createAdoptionDTO);
                console.log(response)
                // Check if the response has the name or petId property -> Success 201 or 200
                if (response?.name || response?.petId) {
                    toast.success("Your enquiry has been submitted successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

                    // Reset the form data
                    setFormData({ ...formData, message: "" });

                    setTimeout(() => {
                        navigate("/my-inquiry");
                    }, 700); // Redirect to My Inquiry page after 2 seconds

                }
            } catch (error) {
                console.error("Error submitting adoption enquiry:", error);
                toast.error(error.response?.data?.message || "Failed to submit enquiry!");
            }
        }
    };


    if (!pet) {
        return <div>Loading...</div>
    }

    if (!userId) {
        return (
            <div className="py-52 mx-[30%] text-center font-lora">
                <h2 className="text-2xl font-bold text-red-600">Please login before enquire this Pet 😢</h2>
                <p className="text-gray-700 mt-4">Something went wrong. Please try again.</p>
                <a
                    href="/"
                    className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition inline-block text-center"
                >
                    Go to Homepage
                </a>
            </div>
        );
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
                    Enquire about <span className="text-green-800 text-2xl md:text-6xl font-dancing">{pet.name}🐾</span>
                </h1>
            </motion.div>
            <div className="max-w-4xl mx-auto py-6 mb-6 px-10">
                <div className="flex justify-center items-center">
                    <img
                        src={PetImage[pet.image]}
                        alt={pet.name}
                        className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] mt-0 md:mt-[-15px] object-cover rounded-full"
                    />
                </div>
                <p className="text-center text-lg font-signika italic py-7"> "They will be happy to know that they have found a new home." 😺😺 </p>

                <div className="mx-auto max-w-2xl">
                    {/* Enquiry Form */}
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg space-y-6 shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-900 text-lg font-bold font-lora mb-2">Your Name</label>
                            <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-900 text-lg font-bold font-lora mb-2">Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="blocktext-gray-900 text-lg font-bold font-lora mb-1">Phone Number</label>
                            <p className="block text-sm text-gray-700 font-medium mt-2 font-signika italic"> We require this to be able to send you communications regarding your pet enquiry.</p>
                            <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-900 text-lg font-bold font-lora mb-2">Your Enquiry Message</label>
                            <p className="block text-sm text-gray-700 font-medium font-signika italic mb-1">We use this information to assess your living conditions, inquire about your pet care experience, and determine whether your children are compatible with the pet.</p>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full h-72 p-2 border rounded"
                                placeholder={`Share a bit about yourself and your home.\n\nE.g. Hello!\n\nI'm excited about adopting ${pet.name}. We have a spacious home with a secure backyard, plenty of room to play, and a cozy indoor space. My partner and I work from home, so Bella will always have company. We love outdoor activities like hiking and going to the park, and Bella would be a perfect companion for our weekend adventures. We also have a friendly cat who gets along well with dogs!`}>
                            </textarea>
                        </div>
                        {/* Checkbox: Enquiring on behalf of someone else */}
                        <div className="mb-1">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="enquireForSomeoneElse"
                                    checked={formData.enquireForSomeoneElse || false}
                                    onChange={(e) => setFormData({ ...formData, enquireForSomeoneElse: e.target.checked })}
                                    className="w-4 h-4 mt-1"
                                />
                                <span className="text-gray-900 text-md font-semibold font-lora">
                                    I am enquiring on behalf of someone else (optional)
                                </span>
                            </label>
                        </div>

                        {/* Checkbox: Receive email updates */}
                        <div className="mb-1">
                            <label className="flex mt-[-10px] items-start space-x-2">
                                <input
                                    type="checkbox"
                                    name="emailUpdates"
                                    checked={formData.emailUpdates || false}
                                    onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })}
                                    className="w-4 h-4 mt-1"
                                />
                                <span className="text-gray-900 text-md font-semibold font-lora">
                                    I'd like to receive email updates from Zypaws. (optional) <br />

                                </span>
                            </label>
                            <p className="text-gray-600 text-sm">
                                You'll be the first to receive valuable resources for pet guardians, heart-warming happy tails of adoption, updates on PetRescue's impact, as well as exclusive offers from PetRescue partners.
                            </p>
                        </div>

                        {/* reCAPTCHA */}
                        <div className="flex justify-center">
                            <ReCAPTCHA
                                sitekey={siteKey}
                                onChange={handleCaptchaVerify}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button type="submit" className="bg-green-700 text-white px-20 mt-3 py-2 rounded">Submit</button>
                        </div>
                        <p className="text-gray-600 text-sm italic text-center">
                            By enquiring about {pet.name}, <br /> I agree to be bound by the Terms of Use and accept PetRescue's Privacy Policy.
                        </p>

                    </form>

                </div>
            </div>
        </>
    );
};

export default EnquirePet;
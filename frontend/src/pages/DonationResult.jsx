import { useEffect, useRef, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { captureSuccessDonationAPI } from "../axios/axios.api";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { assets } from "../assets/assets";

const DonationResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const { setLoading } = useContext(AuthContext);
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        if (hasFetched.current) return; // mark as fetched to prevent multiple calls
        hasFetched.current = true;

        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if (!token) {
            navigate("/");
            return;
        }

        if (sessionStorage.getItem(`donation_${token}`) === "done") {
            setStatus("success");
            return;
        }

        const captureDonation = async () => {
            setLoading(true);
            try {
                const response = await captureSuccessDonationAPI(token);
                if (response?.message === "Donation successful") {
                    setStatus("success");
                    sessionStorage.setItem(`donation_${token}`, "done");
                } else {
                    setStatus("failed");
                    setTimeout(() => {
                        navigate("/");
                    }, 5000); // redirect to homepage after 5 seconds
                }
            } catch (error) {
                console.error("Capture Error:", error);
                setStatus("failed");
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            } finally {
                setLoading(false);
            }
        };

        captureDonation();
    }, [location, navigate, setLoading]);

    return (
        <div className="text-center px-20">
            {status === "pending" ? (
                <div className="py-52">
                    <h2 className="text-2xl font-bold text-gray-700">Processing your donation...</h2>
                    <p className="text-gray-600 mt-4">
                        Please wait while we verify your transaction. This may take a few seconds.
                    </p>
                </div>
            ) : status === "success" ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="flex items-center justify-center p-4 bg-gray-300 rounded-full w-[300px] h-[250px] md:w-[390px] md:h-[350px] shadow-lg">
                        <img
                            className="w-50 h-50 md:w-96 md:h-72 object-cover rounded-lg animate-tilt"
                            src={assets.successdonatecat}
                            alt="donate-banner"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-green-600 mt-6">Donation Successful! 🎉</h2>
                    <p className="text-gray-700 mt-4 text-center max-w-lg">
                        Thank you for your generous support! Your kindness helps provide shelter, food, and medical care
                        for rescued pets. Your donation truly makes a difference. 🐾
                    </p>
                    <button
                        className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                        onClick={() => navigate("/")}
                    >
                        Go to Homepage
                    </button>
                </div>
            ) : (
                <div className="py-52">
                    <h2 className="text-2xl font-bold text-red-600">Donation Failed 😢</h2>
                    <p className="text-gray-700 mt-4">Something went wrong. Please try again.</p>
                    <p className="text-gray-500 mt-4">You will be redirected to the homepage after 5 seconds...</p>
                    <button
                        className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
                        onClick={() => navigate("/")}
                    >
                        Go to Homepage
                    </button>
                </div>
            )}
        </div>
    );
};

export default DonationResult;

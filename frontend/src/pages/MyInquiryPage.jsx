import { useContext, useEffect, useState } from "react";
import { getUserInquiriesAPI } from "../axios/axios.api";
import { AuthContext } from "../context/AuthContext";
import MobileTopBar from "../component/MobileTopBar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const statusColors = {
    PENDING: "bg-yellow-500",
    APPROVED: "bg-green-500",
    REJECTED: "bg-red-500",
};

const MAX_MESSAGE_LENGTH = 150; // Max length of message to show before "View More"

const MyInquiryPage = () => {
    const { setLoading } = useContext(AuthContext);
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchInquiries = async () => {
            setLoading(true);
            try {
                const response = await getUserInquiriesAPI();
                setInquiries(response);
            } catch (error) {
                console.error("Error fetching inquiries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInquiries();
    }, [setLoading]);

    return (
        <>
            <MobileTopBar />
            <div className="max-w-5xl mx-auto p-6 font-signika">
                <div className="text-center text-4xl font-lora italic font-semibold p-6 md:p-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-0 mb-0 md:mt-3 md:mb-3"
                    >
                        My Inquiries
                    </motion.div>
                </div>
                <p className="text-gray-500 mb-5 text-lg">
                    <span className="font-semibold">Total Inquiry:</span> {inquiries.length}
                </p>

                {inquiries.length === 0 ? (
                    <p className="text-gray-500 py-32 text-center text-lg ">You have no inquiries.</p>
                ) : (
                    [...inquiries].reverse().map((inquiry) => (
                        <InquiryCard key={inquiry.id} inquiry={inquiry} />
                    ))
                )}
            </div>
        </>
    );
};

// Component render each inquiry
const InquiryCard = ({ inquiry }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="border rounded-lg p-6 mb-5 shadow-lg bg-white"
        >
            <div className="grid grid-cols-2 gap-6">
                {/* Left: Main Info */}
                <div>
                    {/* Status & Pet Name */}
                    <div className="flex justify-between items-center">
                        <span
                            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${statusColors[inquiry.status] || "bg-gray-500"}`}
                        >
                            {inquiry.status}
                        </span>
                        <Link
                            to={`/pet/${inquiry.pet.id}`}
                            className="text-md text-green-800 font-semibold hover:underline"
                        >
                            {inquiry.pet.name} ({inquiry.pet.species.charAt(0).toUpperCase() + inquiry.pet.species.slice(1).toLowerCase()}) 🐾
                        </Link>
                    </div>

                    {/* Your Name */}
                    <h3 className="text-lg font-semibold mt-4">Your Name:</h3>
                    <p className="text-gray-700 text-md">{inquiry.name}</p>

                    {/* Your Message */}
                    <h3 className="text-lg font-semibold mt-4">Your Message:</h3>
                    <p className="text-gray-600 text-md">
                        {expanded || inquiry.message.length <= MAX_MESSAGE_LENGTH
                            ? inquiry.message
                            : `${inquiry.message.substring(0, MAX_MESSAGE_LENGTH)}...`}
                    </p>

                    {/*  View More */}
                    {inquiry.message.length > MAX_MESSAGE_LENGTH && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-blue-500 font-semibold mt-2 underline"
                        >
                            {expanded ? "View Less" : "View More"}
                        </button>
                    )}

                    {/* Contact Info */}
                    <h3 className="text-lg font-semibold mt-4">Contact Info:</h3>
                    <p className="text-gray-500 text-md">
                        📞 {inquiry.phoneNumber} | 📧 {inquiry.email}
                    </p>
                </div>

                {/* Right: Email Updates & Enquiring for Someone Else */}
                <div className="border-l pl-6">
                    {/* Email Updates */}
                    <h3 className="text-lg font-semibold">Receive Email Updates:</h3>
                    <p className="text-gray-700 text-md">{inquiry.emailUpdates ? "✅ Yes" : "❌ No"}</p>

                    {/* Enquiring for Someone Else */}
                    <h3 className="text-lg font-semibold mt-4">Enquiring for Someone Else:</h3>
                    <p className="text-gray-700 text-md">{inquiry.enquireForSomeoneElse ? "✅ Yes" : "❌ No"}</p>

                    <h3 className="text-lg font-semibold mt-4">Reply Message</h3>
                    <p className="text-gray-700 text-md">{inquiry.replyMessage}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default MyInquiryPage;

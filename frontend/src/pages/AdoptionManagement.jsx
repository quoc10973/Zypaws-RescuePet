import { useContext, useEffect, useState } from "react";
import { getPendingAdoptionAPI, getApprovedAdoptionAPI, getRejectedAdoptionAPI, approveAdoptionAPI, rejectAdoptionAPI } from "../axios/axios.api";
import { AuthContext } from "../context/AuthContext";

const AdoptionManagement = () => {
    const [adoptions, setAdoptions] = useState([]);
    const { setLoading } = useContext(AuthContext);
    const [messages, setMessages] = useState({});
    const [activeTab, setActiveTab] = useState("pending"); // pending, approved, rejected

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
        fetchAdoptions();
    }, [activeTab]); // Call fetchAdoptions when activeTab changes

    const fetchAdoptions = async () => {
        try {
            setLoading(true);
            let response = [];
            if (activeTab === "pending") response = await getPendingAdoptionAPI();
            if (activeTab === "approved") response = await getApprovedAdoptionAPI();
            if (activeTab === "rejected") response = await getRejectedAdoptionAPI();
            setAdoptions(response);
        } catch (error) {
            console.error("Error fetching adoptions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            setLoading(true);
            const message = String(messages[id] || "");
            await approveAdoptionAPI(id, message);
            setAdoptions((prev) => prev.filter((adoption) => adoption.id !== id));
            alert("Adoption request approved successfully!");
        } catch (error) {
            console.error("Error approving adoption:", error);
            alert("Failed to approve adoption request.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id) => {
        try {
            setLoading(true);
            const message = String(messages[id] || "");
            await rejectAdoptionAPI(id, message);
            setAdoptions((prev) => prev.filter((adoption) => adoption.id !== id));
            alert("Adoption request rejected successfully!");
        } catch (error) {
            console.error("Error rejecting adoption:", error);
            alert("Failed to reject adoption request.");
        } finally {
            setLoading(false);
        }
    };


    const handleMessageChange = (id, value) => {
        setMessages((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 font-lora">Adoption Management</h2>

            {/* 📌 Tabs */}
            <div className="flex gap-4 mb-4">
                <button
                    className={`px-4 py-2 rounded ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("pending")}
                >
                    Pending
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "approved" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("approved")}
                >
                    Approved
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "rejected" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("rejected")}
                >
                    Rejected
                </button>
            </div>

            {/* 📌 Hiển thị danh sách theo tab */}
            {adoptions.length === 0 ? (
                <p>No {activeTab} requests found.</p>
            ) : (
                <AdoptionList
                    adoptions={adoptions}
                    onApprove={activeTab === "pending" ? handleApprove : null}
                    onReject={activeTab === "pending" ? handleReject : null}
                    messages={messages}
                    handleMessageChange={handleMessageChange}
                />
            )}
        </div>
    );
};

const AdoptionList = ({ adoptions, onApprove, onReject, messages, handleMessageChange }) => {
    return (
        <div className="space-y-4 text-sm max-h-[70vh] overflow-y-auto">
            {adoptions.map((adoption) => (
                <div key={adoption.id} className="border p-4 rounded-lg shadow flex justify-between items-center">
                    <div>
                        <p><strong>Adopter:</strong> {adoption.name}</p>
                        <p><strong>Email:</strong> {adoption.email}</p>
                        <p><strong>Phone Number:</strong> {adoption.phoneNumber}</p>
                        <p><strong>Status:</strong> {adoption.status}</p>
                        <p><strong>Pet:</strong> {adoption.pet.name} ({adoption.pet.species})</p>
                        <p><strong>Email Updates:</strong> {adoption.emailUpdates ? 'Yes' : 'No'}</p>
                        <p><strong>Enquiry For Someone Else:</strong> {adoption.enquireForSomeoneElse ? 'Yes' : 'No'}</p>
                        <p><strong>Requested by:</strong> {adoption.user.email}</p>
                    </div>
                    {onApprove && onReject ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <button
                                    className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600"
                                    onClick={() => onApprove(adoption.id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600"
                                    onClick={() => onReject(adoption.id)}
                                >
                                    Reject
                                </button>
                            </div>
                            <textarea
                                className="border rounded p-2 w-64"
                                placeholder="Leave a message (optional)"
                                value={messages?.[adoption.id] || ""}
                                onChange={(e) => handleMessageChange(adoption.id, e.target.value)}
                            />
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default AdoptionManagement;

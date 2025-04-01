import { useEffect, useState } from "react";
import { getDonationStatisticsAPI } from "../axios/axios.api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DonationManagement = () => {
    const [stats, setStats] = useState(null);
    const { setLoading } = useContext(AuthContext);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await getDonationStatisticsAPI();
                setStats(response);
            } catch (error) {
                console.error("Error fetching donation statistics", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <motion.div
            className="p-4 bg-white rounded-xl shadow-md max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-lg font-bold mb-4 text-center">Donation Dashboard</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div
                    className="p-3 bg-blue-100 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <p className="text-sm font-semibold text-gray-700">Total Amount</p>
                    <p className="text-xl font-bold">${stats.totalAmount}</p>
                </motion.div>
                <motion.div
                    className="p-3 bg-green-100 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <p className="text-sm font-semibold text-gray-700">Total Donations</p>
                    <p className="text-xl font-bold">{stats.totalDonations}</p>
                </motion.div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.avgAmountByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Bar dataKey="avgAmount" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default DonationManagement;
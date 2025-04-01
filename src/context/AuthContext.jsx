import { createContext, useState, useEffect } from "react";
import { getCurrentUserAPI } from "../axios/axios.api";
import { ClipLoader } from "react-spinners";

export const AuthContext = createContext();

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: { id: "", email: "", name: "", role: "" }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        // Nếu có accessToken trong localStorage thì gọi API lấy thông tin user
        if (accessToken) {
            setLoading(true); // Hiển thị loading khi gọi API
            getCurrentUserAPI(accessToken)
                .then(response => {
                    setAuth({
                        isAuthenticated: true,
                        user: {
                            id: response.id,
                            email: response.email,
                            name: response.firstName,
                            role: response.role
                        }
                    });
                    localStorage.setItem("user", JSON.stringify(response));
                })
                .catch(error => {
                    console.error("Failed to fetch user info:", error);
                    localStorage.removeItem("accessToken");
                    setAuth({ isAuthenticated: false, user: { id: "", email: "", name: "", role: "" } });
                })
                .finally(() => {
                    setLoading(false); // Ẩn loading khi API hoàn thành
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
            {/* Hiển thị hiệu ứng loading */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <ClipLoader color="#ffffff" size={50} />
                </div>
            )}
            {props.children}
        </AuthContext.Provider>
    );
};

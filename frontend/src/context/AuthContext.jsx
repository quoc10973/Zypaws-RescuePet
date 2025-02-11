import { createContext, useState } from "react";

export const AuthContext = createContext(
    {
        isAuthenticated: false,
        user: {
            id: '',
            email: '',
            name: '',
            role: ''
        }
    }
); // Initialize context with parameter

export const AuthWrapper = (props) => {

    // Initialize auth state
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            id: '',
            email: '',
            name: '',
            role: ''
        }
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [role,setRole] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () => {
        axios
            .get("http://10.50.50.2:8000/auth/", { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setIsAuth(true);
                    setRole(response.data.role)
                }
            })
            .catch(() => {
                setIsAuth(false);
                setRole("")
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading, setIsLoading, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

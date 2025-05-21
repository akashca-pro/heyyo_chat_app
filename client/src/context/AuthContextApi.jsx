import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

    const login = (userId) => {
      const userData = { id: userId, isAuthenticated: true };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };

       // Monitor JWT Token in cookies
    useEffect(() => {
        const token = Cookies.get("userToken");

        if (!token) {
            logout(); // Auto logout if token is missing
        }
    }, []);
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login')
    };

    return (
        <AuthContext.Provider value={{user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);
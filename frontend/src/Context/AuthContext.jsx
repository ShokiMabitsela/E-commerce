import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkAuthStatus(); // Run this on mount
  }, []);

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// PropTypes for AuthContextProvider
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Define children as a React node
};

export default AuthContextProvider;

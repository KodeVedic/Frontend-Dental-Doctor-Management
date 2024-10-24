import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To show loading until we verify the token


  // Check for token and user data in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Rehydrate user state
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);


    const decodedToken = jwtDecode(token);
    console.log("decodedToken: ",decodedToken)

    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
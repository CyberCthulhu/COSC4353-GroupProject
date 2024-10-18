import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            try {
                const decoded = jwtDecode(storedToken);
                setDecodedToken(decoded);
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        try {
            const decoded = jwtDecode(newToken);
            setDecodedToken(decoded);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setDecodedToken(null);
        console.log('Logged out')
    };

    return (
        <AuthContext.Provider value={{ token, decodedToken, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
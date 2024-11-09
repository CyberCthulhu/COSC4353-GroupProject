import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
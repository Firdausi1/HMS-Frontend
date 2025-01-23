import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        // Check local storage for doctor's information
        const storedDoctor = localStorage.getItem('doctor');
        if (storedDoctor) {
            setDoctor(JSON.parse(storedDoctor).firstName); // Set the doctor's name from local storage
        }
    }, []);

    const logout = () => {
        setDoctor(null); // Clear the doctor's name from context
        localStorage.removeItem('doctor'); // Remove doctor's information from local storage
    };

    return (
        <UserContext.Provider value={{ doctor, setDoctor, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};

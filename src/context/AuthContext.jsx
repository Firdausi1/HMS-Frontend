import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user's information
    const getUser = localStorage.getItem("user");
    if (getUser && getUser !== "undefined") {
      setUser(JSON.parse(getUser));
    }
  }, []);

  const logout = () => {
    setUser(null); // Clear the user from context
    localStorage.removeItem("user"); // Remove user's information from local storage
    window.location.href = "/";
  };
  
  return (
    <AuthContext.Provider value={{ logout, setUser, user }}>
      
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

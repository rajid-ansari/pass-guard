import React, { Children, createContext, useContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    if(loading) {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user ? user : null);
        setLoading(false);
    }

    return (
        <userContext.Provider value={{ user, setUser, showPassword, setShowPassword }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContextProvider;

export const useAuth = () => {
    return useContext(userContext);
}
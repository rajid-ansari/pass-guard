import React, { Children, createContext, useEffect, useState } from "react";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        storedUser ? storedUser : null
    })

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContextProvider;

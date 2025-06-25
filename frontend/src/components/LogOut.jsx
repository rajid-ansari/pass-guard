import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContextProvider";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const LogOut = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${BASE_URI}/user/logout`, {
                withCredentials: true,
            });

            if (res.status === 200) {
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }
        } catch (error) {
            console.log(`logout errr :: ${error}`);
            navigate("/login");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 mg:py-2 lg:py-2 py-1 text-center text-wrap px-3 rounded-md border-1 border-white shadow-2xl font-medium font-poppins text-light cursor-pointer hover:bg-red-700 transition-all"
        >
            Log out
        </button>
    );
};

export default LogOut;

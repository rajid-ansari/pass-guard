import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContextProvider"

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        if (user === null) {
            navigate("/login");
            return;
        } else {
            setLoading(false)
        }
    }, [navigate]);

    if (loading)
        return (
            <div className="h-10 w-10 rounded-full border-accent border-t-white border-2 animate-spin absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                
            </div>
        );
    return <main>{children}</main>;
};

export default ProtectedRoute;

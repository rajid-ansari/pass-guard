import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user === null) {
            navigate("/login");
        } else {
            setLoading(false)
        }
    }, [navigate]);

    if(loading) return (<div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">loading...</div>)
    return <main>{children}</main>;
};

export default ProtectedRoute;

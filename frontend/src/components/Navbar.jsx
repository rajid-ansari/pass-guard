import React from "react";

const Navbar = () => {
    return (
        <nav className="h-14 border-b border-green-400 flex items-center ">
            <div className="flex items-center ">
                <span>&lt;</span>
                <h2 className="text-2xl font-semibold font-mono">
                    Pass<span className="text-green-700">Guard</span>{" "}
                </h2>
                <span>&gt;</span>
            </div>
        </nav>
    );
};

export default Navbar;

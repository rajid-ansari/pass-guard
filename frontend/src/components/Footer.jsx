import React from "react";

const Footer = () => {
    return (
        <footer className="mt-20 bg-dark flex items-center justify-center h-44 sm:h-40 md:h-36 lg:h-[32vh] transition-all duration-300">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="logo h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                        src={"pass_guard.png"}
                        alt="PassGuard Logo"
                        className="h-full w-full object-cover"
                    />
                </div>
                <h2
                    draggable={true}
                    className=" xs:block text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-light font-semibold tracking-tight cursor-default select-none custom-glow shadow-2xl transition-all duration-300"
                >
                    PassGuard
                </h2>
            </div>
        </footer>
    );
};

export default Footer;

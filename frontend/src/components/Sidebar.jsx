import React, { useState } from "react";
import { IoIosArrowForward, IoMdMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Menu Icon for small devices */}
            {!open && (
                <button
                    className="fixed top-15 right-4 z-50 lg:hidden"
                    onClick={() => setOpen(true)}
                    aria-label="Open sidebar"
                >
                    <IoMdMenu size={28} />
                </button>
            )}
            <section
                className={`
                    fixed top-0 left-0 h-full lg:h-[92.3vh] w-64 md:w-72 bg-light shadow-2xl font-poppins text-nowrap overflow-hidden z-40
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:w-full lg:static lg:shadow-none
                `}
            >
                {/* Close Icon for small devices */}
                <div className="flex items-center justify-between px-3 h-14 lg:hidden">
                    <p className="text-gray-500"></p>
                    <button
                        className="text-gray-700"
                        onClick={() => setOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <IoMdClose size={28} />
                    </button>
                </div>
                <div className="h-[1px] w-full bg-gray-400 lg:bg-light"></div>
                <div className="links w-full my-3 pl-4">
                    <div className="flex flex-col gap-2 h-[83vh] lg:h-[83vh]">
                        <Link
                            to={"/dashboard"}
                            className="text-gray-800 active:text-primary w-fit cursor-pointer flex items-center select-none"
                            onClick={() => setOpen(false)}
                        >
                            <span>
                                <IoIosArrowForward />
                            </span>
                            Dashboard
                        </Link>
                        <Link
                            to={"/voult"}
                            className="text-gray-800 active:text-primary w-fit cursor-pointer flex items-center select-none"
                            onClick={() => setOpen(false)}
                        >
                            <span>
                                <IoIosArrowForward />
                            </span>
                            Voult
                        </Link>
                        <h2 className="text-gray-800 active:text-primary w-fit cursor-pointer flex items-center select-none">
                            <span>
                                <IoIosArrowForward />
                            </span>
                            Generate Password
                        </h2>
                    </div>
                    <div>
                        <LogOut className={`text-nowrap`} />
                    </div>
                </div>
            </section>

            {/* Overlay for small devices */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 bg-opacity-30 z-30 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;

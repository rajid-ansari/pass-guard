import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";

const Sidebar = () => {
    return (
        <section
            className="absolute top-0 left-0 h-full w-full bg-light shadow-2xl font-poppins text-nowrap overflow-hidden"
        >
            <div className="flex items-end px-3 justify-end h-14">
                <p className="text-gray-500">Actions</p>
            </div>
            <div className="h-[1px] w-full bg-gray-400"></div>
            <div className="links h-full w-full my-3 pl-4">
                <div className="flex flex-col gap-2 h-[80%]">
                    <Link
                        to={"/dashboard"}
                        className="text-gray-800 active:text-primary w-fit"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to={"/voult"}
                        className="text-gray-800 active:text-primary w-fit"
                    >
                        Voult
                    </Link>
                    <Link
                        to={"/generate-password"}
                        className="text-gray-800 active:text-primary w-fit"
                    >
                        Generate Password
                    </Link>
                </div>
				<div>
                        <LogOut className={`text-nowrap`} />
                    </div>
            </div>
        </section>
    );
};

export default Sidebar;

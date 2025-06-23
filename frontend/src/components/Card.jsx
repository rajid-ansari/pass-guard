import React from "react";

const Card = ({ icon, heading, content }) => {
    return (
        <div className="py-3 px-15 max-w-sm w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg text-wrap transition-all duration-300">
            <div className="icon h-14 w-14 sm:h-16 sm:w-16 md:h-15 md:w-15 rounded-full flex items-center justify-center bg-gray-300 mb-3 transition-all duration-300">
                <img src={icon} alt="" width={35} />
            </div>
            <h2 className="font-montserrat font-medium mb-1 text-base sm:text-lg md:text-xl transition-all duration-300">
                {heading}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-5">
                {content}
            </p>
        </div>
    );
};

export default Card;

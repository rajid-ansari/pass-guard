import React from "react";
import LinkBtn from "./LinkBtn";
import hero from "../assets/hero.png";

const Hero = () => {
    return (
        <div className="min-h-[60vh] h-[89vh] w-full flex flex-col-reverse md:flex-row bg-[#0a1625] font-poppins shadow-xl transition-all duration-300">
            <div className="w-full md:w-1/2 flex items-center justify-center md:pl-24 px-6 py-8 md:py-0">
                <div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight md:leading-[2.6rem] font-semibold transition-all duration-300">
                        No more forgotten logins. <br />
                        No more worries.
                    </h1>
                    <p className="my-4 md:my-6 text-slate-300 text-sm md:text-lg transition-all duration-300">
                        Save once ~ and access anywhere, anytime. <br /> Whether
                        you're at home, at work, or on the go — your passwords
                        are always just a click away. Stored securely, encrypted
                        end to end, and accessible only to you. No syncing
                        stress, no forgotten logins, no compromises.
                    </p>
                    <LinkBtn path={"/login"}>Try it now</LinkBtn>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex items-end justify-center md:pl-20 px-6 md:px-0 -mb-7 md:mb-0 h-[55%] md:h-[100%]">
                <img
                    src={hero}
                    alt=""
                    className="h-[100%] md:h-[80%] lg:h-[90%] rounded-t-3xl object-cover transition-all duration-300"
                />
            </div>
        </div>
    );
};

export default Hero;

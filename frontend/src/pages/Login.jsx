import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import LinkBtn from "../components/LinkBtn";

const Login = () => {
    return (
        <div className="h-screen w-full  flex items-center justify-center">
            <div className="h-2/3 w-1/4 py-10 px-5 rounded-md">
                <div className="mb-15">
                    <h1 className="text-2xl text-dark font-outfit font-semibold">
                        Login & Secure your Digital Life.
                    </h1>
                </div>
                <form>
                    <div className="mb-3">
                        <Input
                            type={"email"}
                            placeHolder={"Enter your Email"}
                        />
                    </div>
                    <div>
                        <Input
                            type={"password"}
                            placeHolder={"Enter your Password"}
                        />
                    </div>
                </form>
                <div className="mt-5 flex text-sm text-gray-600 font-semibold">
                    <p>New here ?</p>
                    <Link to={"/signup"} className="text-primary underline">
                        Create account
                    </Link>
                </div>
                <div className="mt-10 h-10">
                    <button
                        className={`px-10  w-full bg-primary text-light py-2 rounded-md hover:bg-secondary cursor-pointer text-center `}
                    >
                        Start <span className="">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

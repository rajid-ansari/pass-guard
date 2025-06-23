import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const Signup = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(!fullname || !email || !password) {
            return setError("All fields are required.");
        }

        if(password.length < 8) {
            return setError("Password must should be atleast 8 characters");
        }

        // email verification toh hona hi chahiye is passGuard me---------

        const newUser = {
            fullname,
            email,
            password
        }

        const response = await axios.post(`${BASE_URI}/user/register`, newUser, {withCredentials: true});

        if(response.status == 201) {
            console.log(response.data);
            navigate("/dashboard")
        }

        // reseting inputs
        setFullname("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="h-screen w-full  flex items-center justify-center">
            <div className="h-2/3 w-1/4 py-10 px-5 rounded-md">
                <div className="mb-15 text-center">
                    <h1 className="text-2xl text-dark font-poppins font-semibold">
                        Sign up & Start{" "}
                        <span className="text-primary">Encrypting</span> your
                        Passwords. 🔒
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Input
                            value={fullname}
                            setValue={setFullname}
                            type={"text"}
                            placeHolder={"Enter your Full Name"}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            value={email}
                            setValue={setEmail}
                            type={"email"}
                            placeHolder={"Enter your Email"}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            value={password}
                            setValue={setPassword}
                            type={"password"}
                            placeHolder={"Enter your Password"}
                        />
                    </div>
                    <div className="mt-5 flex text-sm text-gray-600 font-semibold">
                        <p>Already have an account ?</p>
                        <Link to={"/login"} className="text-primary underline">
                            sign In
                        </Link>
                    </div>
                    <div className="mt-10 h-10">
                        <button
                            className={`px-10 w-full bg-primary text-light py-2 rounded-md hover:bg-secondary cursor-pointer text-center relative font-outfit`}
                        >
                            Start Securing <span className="">→</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

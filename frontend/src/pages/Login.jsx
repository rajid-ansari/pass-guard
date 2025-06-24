import React, { useContext, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../contexts/UserContextProvider";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { _, setUser} = useContext(userContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true)

        if (!email || !password) {
            return setError("Both fields are required.");
        }

        const user = {
            email,
            password,
        };

        try {
            const response = await axios.post(`${BASE_URI}/user/sign-in`, user, {
                withCredentials: true,
            });

            if(response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(response.data.user);
                navigate("/dashboard");
            }
        } catch (error) {
            setError("Invalid email or passowrd.");
            console.log(`sign-in error :: ${error}`);
        } finally {
            setLoading(false);
            // reset inputs
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="h-screen w-full  flex items-center justify-center bg-slate-100">
            <div className="h-2/3 w-1/4 py-10 px-5 rounded-md shadow-2xl bg-light">
                <div className="mb-15 flex flex-col items-center">
                    <img
                        src="pass_guard.png"
                        alt=""
                        width={45}
                        className="rounded-md"
                    />
                    <h1 className="text-2xl text-dark font-outfit font-semibold ">
                        Welcome back to PassGuard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Log in to access your encrypted vault.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Input
                            type={"email"}
                            value={email}
                            setValue={setEmail}
                            placeHolder={"Enter your Email"}
                            required={true}
                        />
                    </div>
                    <div>
                        <Input
                            type={"password"}
                            value={password}
                            setValue={setPassword}
                            placeHolder={"Enter your Password"}
                            required={true}
                        />
                    </div>
                    <div className="mt-5 flex text-sm text-gray-600 font-semibold">
                        <p>New here ?</p>
                        <Link to={"/signup"} className="text-primary underline">
                            Create account
                        </Link>
                    </div>
                    <div className="mt-10 h-10">
                        <div className="text-red-500 text-sm text-center my-2">
                            {error ? error : null}
                        </div>
                        <button
                            className={`px-10  w-full bg-primary text-light py-2 rounded-md hover:bg-secondary cursor-pointer text-center `}
                        >
                            Start <span className="">→</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

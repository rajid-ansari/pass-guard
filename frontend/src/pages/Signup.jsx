import React, { useState, useContext } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContextProvider";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const Signup = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {_, setUser} = useContext(userContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true)

        if (!fullname || !email || !password) {
            setLoading(false)
            return setError("All fields are required.");
        }

        if (password.length < 8) {
            setLoading(false)
            return setError("Password must should be atleast 8 characters");
        }

        // have to add email verification

        const newUser = {
            fullname,
            email,
            password,
        };

        try {
            const response = await axios.post(
                `${BASE_URI}/user/register`,
                newUser,
                { withCredentials: true }
            );

            if (response.status === 201) {
                console.log(response.data.message)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(response.data.user);
                navigate("/dashboard");
            } else {
                setError("Email is already registered");
            }
        } catch (error) {
            console.log(`signup :: ${error}`);
        } finally {   
            setLoading(false);
            // reseting inputs
            setFullname("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="h-screen w-full  flex items-center justify-center bg-slate-100">
            <div className="min-h-2/3 w-1/4 py-10 px-5 rounded-md shadow-2xl bg-light">
                <div className="mb-15 text-center flex flex-col items-center">
                    <img src="pass_guard.png" alt="" width={45} className="rounded-md" />
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
                        <div className="text-red-500 text-sm text-center my-2">
                            {error ? error : null}
                        </div>
                        <button
                            className={`px-10 w-full bg-primary text-light py-2 rounded-md hover:bg-secondary cursor-pointer text-center relative font-outfit`}
                        >
                            {loading ? (<span className="loader"></span>) : (`Start Securing`)}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

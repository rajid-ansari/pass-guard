import React, { useState } from "react";
import { useAuth } from "../contexts/UserContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import generatePassword from "../../utils/generatePassword";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const AddPassword = React.forwardRef(
    ({ showAddPasswordPanel, setShowAddPasswordPanel }, ref) => {
        const [site, setSite] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        const {showPassword, setShowPassword} = useAuth();

        const savePassword = async (e) => {
            e.preventDefault();
            setError("");

            if (!site || !password) {
                setError("site and password field are required.");
				toast(error);
				return;
            }

            const voultData = {
                site,
                username,
                password,
            };

            try {
                const response = await axios.post(
                    `${BASE_URI}/password/save`,
                    voultData,
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    toast("Password saved");
                    setShowAddPasswordPanel(false);
                }
            } catch (error) {
                console.error(`password save error ${error}`);
            } finally {
                setLoading(false);
                setSite("");
                setUsername("");
                setPassword("");
            }
        };

        const handlePasswordGenerate = () => {
            const password = generatePassword();
            setPassword(password);
        }

        return (
            <>
                <ToastContainer />
                <div
                    ref={ref}
                    className="absolute h-4/7 w-2/5 scale-0 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-100 rounded-md overflow-hidden z-10 border-[1px] border-gray-300 shadow"
                >
                    <div className="flex items-center justify-center">
                        <div className="w-2/3 my-5 mx-8">
                            <h1 className="text-center text-primary text-3xl font-semibold font-poppins mb-4">
                                Secure Your Password with PassGuard
                            </h1>
                            <form onSubmit={savePassword}>
                                <label
                                    htmlFor="site"
                                    className="text-gray-700 font-outfit"
                                >
                                    Site{" "}
                                    <span className="text-accent text-sm">
                                        *
                                    </span>
                                </label>
                                <div className="bg-light mb-3">
                                    <input
                                        type="text"
										value={site}
										onChange={(e) => setSite(e.target.value)}
                                        placeholder="e.g. - LinkedIn"
                                        id="site"
                                        name="site"
                                        required={true}
                                        className="h-full w-full px-4 py-2 rounded-md outline-none border-[1px] border-gray-400 text-gray-700 font-poppins"
                                    />
                                </div>

                                <label
                                    htmlFor="username"
                                    className="text-gray-700 font-outfit"
                                >
                                    Username
                                </label>
                                <div className="bg-light mb-3">
                                    <input
                                        type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
                                        placeholder="e.g. - jhon_doe"
                                        id="username"
                                        name="username"
                                        className="h-full w-full px-4 py-2 rounded-md outline-none border-[1px] border-gray-400 text-gray-700 font-poppins"
                                    />
                                </div>

                                <label
                                    htmlFor="password"
                                    className="text-gray-700 font-outfit"
                                >
                                    Password{" "}
                                    <span className="text-accent text-sm">
                                        *
                                    </span>
                                </label>
                                <div className="bg-light mb-3 relative">
                                    <input
                                        type={showPassword ? "text" : "password" }
										value={password}
										onChange={(e) => setPassword(e.target.value)}
                                        placeholder="*********"
                                        id="password"
                                        name="password"
                                        required={true}
                                        className="h-full w-full px-4 py-2 rounded-md outline-none border-[1px] border-gray-400 text-gray-700 font-poppins"
                                    />
                                    <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-[8px] right-[86px] text-xl cursor-pointer z-10 font-outfit"
                                    >{showPassword ? '🫣' : '😴'}</span>
                                    <span
                                        onClick={handlePasswordGenerate}
                                        className="absolute top-[5px] right-[5px] bg-accent active:bg-accent/90 text-light p-1 cursor-pointer rounded-md font-outfit"
                                    >
                                        {" "}
                                        Generate{" "}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 flex-wrap items-center">
                                    <button className="min-w-24 py-1 rounded-md bg-green-600 text-light text-lg cursor-pointer font-poppins font-semibold tracking-wide">
                                        Save
                                    </button>
                                    <p
                                        onClick={() =>
                                            setShowAddPasswordPanel(false)
                                        }
                                        className="text-xs underline text-primary font-montserrat cursor-pointer"
                                    >
                                        Close
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
);

export default AddPassword;

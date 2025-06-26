import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/UserContextProvider";
import { VscAdd } from "react-icons/vsc";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const Dashboard = () => {
    const [voults, setVoults] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const getPasswords = async () => {
        try {
            const response = await axios.get(
                `${BASE_URI}/password/my-passwords`,
                { withCredentials: true }
            );

            if (response.status === 200) {
                setVoults(response.data);
            }
        } catch (error) {
            console.log(`Error while password fetching ${error}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getPasswords();
    }, []);

    return (
        <main className="h-screen w-full">
            <div>
                <nav className="px-3 md:px-18 h-14 shadow font-outfit transition-all duration-100 ease-linear">
                    <div className="h-full w-full  flex items-center justify-between">
                        <div className="flex items-center gap-1 ">
                            <div className="logo h-14 w-14 md:h-9 md:w-9 rounded-lg overflow-hidden">
                                <img src={"pass_guard.png"} alt="" />
                            </div>
                            <h2
                                draggable={true}
                                className="hidden sm:block md:block  text-[25px] text-primary font-semibold tracking-tight cursor-default select-none "
                            >
                                PassGuard
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div>
                                <h2>
                                    Hii,{" "}
                                    <span className="text-primary font-semibold font-poppins">
                                        {user.fullname}
                                    </span>{" "}
                                </h2>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="h-[92.3%] w-2/12 relative">
                <Sidebar />
            </div>
            <div
                className={`h-[92.3%] w-10/12 absolute top-14 right-0 border-l-2 border-light shadow-2xl z-1 py-2 px-7`}
            >
                <div className="mt-3 ml-5">
                    <button className="py-2 px-3 rounded-md bg-emarGreen text-white font-semibold font-outfit flex items-center gap-2 cursor-pointer active:bg-emerald-600 transition-all text-wrap">
                        Add New{" "}
                        <span>
                            <VscAdd className="font-bold h-5 w-5" />
                        </span>
                    </button>
                </div>
                <div className="mt-10 flex gap-3 flex-wrap">
                    {voults.length > 0 ? (
                        voults.map((voult) => (
                            <div key={voult._id} className="min-h-28 w-[16vw] py-1 px-3 rounded-md bg-light shadow text-wrap">
                                <h2
                                className="block text-center mb-2 font-semibold font-poppins text-primary underline">
                                    {voult.site}
                                </h2>
                                <p className="text-gray-600 font-outfit">
                                    username ~ 
                                    <span className="text-gray-800 font-semibold">
                                        {" "}{voult.username}
                                    </span>
                                </p>
                                <p className="text-gray-600 font-outfit">
                                    Password ~
                                    <span className="text-gray-800 font-semibold">
                                        {" "}{voult.password}
                                    </span>
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No voults</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;

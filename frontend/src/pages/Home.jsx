import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import lock from "../assets/lock.png";
import global_security from "../assets/global_security.png";
import easy_solution from "../assets/easy-solution.png";
import voult from "../assets/voult-ui.png";
import LinkBtn from "../components/LinkBtn";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Home = () => {
    const cards = [
        {
            icon: global_security,
            heading: "Easy access from anywhere",
            content: `Save unlimited passwords and log in on any device or browser -
                ensuring you can access whatever you need, when you need it.`,
        },
        {
            icon: lock,
            heading: "Smart & Secure Storage",
            content: `All your passwords are encrypted before being stored. You stay protected with strong backend security practices and authenticated access.`,
        },
        {
            icon: easy_solution,
            heading: "Easy-to-use Solution",
            content: `Generate strong passwords, store account info, share credentials and more with one easy-to-use solution.`,
        },
    ];

    return (
        <>
            {/* seo content */}
            <Helmet>
                <title>PassGuard | Manage your passwords effortlessly</title>
                <meta
                    name="description"
                    content="Store and manage all your passwords securely with PassGuard. Fast, safe, and accessible from anywhere."
                />
            </Helmet>
            <div className="min-h-screen w-full overflow-hidden">
                <Navbar />
                <Hero />
                <section className="py-16 overflow-hidden font-outfit">
                    <h1 className="text-3xl font-semibold mb-12 font-poppins text-center">
                        Why PassGuard ?
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center gap-8 md:mt-10 items-center">
                        {cards.length > 0 &&
                            cards.map((card, index) => (
                                <Card
                                    key={index}
                                    icon={card.icon}
                                    heading={card.heading}
                                    content={card.content}
                                />
                            ))}
                    </div>
                </section>

                <div className="mt-6 py-16">
                    <h1 className="text-3xl font-semibold mb-12 font-poppins text-center">
                        Strong Password Generator
                    </h1>
                    <div className="flex flex-col lg:flex-row  py-4 mx-2 max-w-full lg:mx-20 bg-[#262626] rounded-2xl font-outfit overflow-hidden shadow-lg transition-all duration-300">
                        <div className="w-full lg:w-1/2 h-[40vh] lg:h-[55vh] flex items-end justify-center lg:justify-end ">
                            <img
                                src={voult}
                                alt=""
                                className="h-[60%] lg:h-[75%] rounded-t-2xl lg:rounded-tl-[15vh] object-contain transition-all duration-300"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 h-auto lg:h-[55vh] px-5 pt-8 lg:pt-10 text-start flex flex-col justify-center">
                            <h2 className="text-2xl lg:text-3xl mb-4 lg:mb-5 text-gray-50">
                                Tired of reusing the same weak password
                                everywhere?
                            </h2>
                            <p className="text-gray-200 text-base lg:text-lg mb-8 lg:mb-10">
                                PassGuard lets you generate strong,
                                unpredictable passwords in seconds. <br /> No
                                need to memorize them all — just generate, save,
                                and access anytime, <br /> all in one place.
                            </p>
                            <div className="flex">
                                <LinkBtn path={"/signup"}>
                                    Generate Password
                                </LinkBtn>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="py-16">
                    <h1 className="text-3xl font-semibold mb-12 font-poppins text-center">
                        Ready to Take Control of Your Digital Life?
                    </h1>
                    <div className="text-center text-wrap">
                        <p className="text-xl text-gray-700">
                            With PassGuard, managing passwords becomes
                            effortless, secure, and accessible — no more sticky
                            notes or reused credentials.
                        </p>
                        <h3 className="text-2xl text-primary font-semibold">
                            Start protecting what matters, in seconds.
                        </h3>
                    </div>

                    <div className="mt-20 mx-4 text-center flex justify-center">
                        <LinkBtn path={"/login"} classname={`md:w-1/3 w-full`}>
                            Get Started ~ It's Free
                        </LinkBtn>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;

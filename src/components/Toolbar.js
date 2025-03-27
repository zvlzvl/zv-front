import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useStore from "../store/main";
import neon from "../assets/neon.png"; // Import image
import messageIcon from "../assets/message.png";

const Toolbar = ({socket}) => {
    const navigate = useNavigate();
    const {loggedUser, loggUser, messages} = useStore((state) => state);
    const [open, setOpen] = useState(false);

    function logout() {
        setTimeout(() => {
            loggUser(null);
            socket.emit("restart");
            navigate("/login");
        }, 50);
    }

    return (
        <div className="fixed top-0 w-full z-50">
            {loggedUser && (
                <>
                    <div className="bg-gray-700 text-center text-white py-1 shadow-lg">
                        <Link to={`/user/${loggedUser._id}`}> {loggedUser?.username} |{" "} </Link>
                        <Link to={"/logout"} className="text-secondary hover:underline" onClick={logout}>
                            Log out
                        </Link>
                    </div>


                    <div className="backdrop-blur-xl bg-gray-700/50 border border-white/20 shadow-lg  px-6">
                        <div className="container lg:w-2/3 mx-auto">
                            <nav className="py-4 flex items-center justify-between">
                                {/* Logo Section */}
                                <Link to="/">
                                    <img
                                        className="w-12 transition-transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
                                        src={neon}
                                        alt="Logo"
                                    />
                                </Link>

                                {/* Desktop */}
                                <div className="hidden md:flex space-x-6 text-white">
                                    <Link to="/"
                                          className="relative text-lg font-medium transition-all duration-300 group">
                                        Home
                                        <span
                                            className="absolute left-0 bottom-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/add-post"
                                          className="relative text-lg font-medium transition-all duration-300 group">
                                        Create Post
                                        <span
                                            className="absolute left-0 bottom-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/favorites"
                                          className="relative text-lg font-medium transition-all duration-300 group">
                                        Favorites
                                        <span
                                            className="absolute left-0 bottom-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/messages"
                                          className="relative text-lg font-medium transition-all duration-300 group">
                                        <img className="w-7 h-auto" src={messageIcon} alt=""/>
                                        <div className="relative">
                                    <span
                                        className="absolute bottom-4 left-6 text-white text-[15px] p-0 h-[20px] w-[20px] center rounded-full">{messages.length}</span>
                                        </div>
                                    </Link>
                                    <Link to="/profile"
                                          className="relative text-lg font-medium transition-all duration-300 group">
                                        <img className="w-8 h-8 rounded-full" src={loggedUser?.image} alt=""/>
                                    </Link>
                                </div>

                                {/* Mobile */}
                                <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white">
                                    {open ? (
                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                        </svg>
                                    )}
                                </button>
                            </nav>

                            {/* Mobile Dropdown Menu */}
                            {open && (
                                <div className="md:hidden rounded-b-2xl p-4 space-y-3">

                                    <Link to="/"
                                          className="relative m-1 font-medium block text-white    rounded-sm pb-2 md:p-0 group">
                                        Home
                                        <span
                                            className="absolute left-0 bottom-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/profile"
                                          className="relative m-1 font-medium block text-white   rounded-sm pb-2 md:p-0 group">
                                        Profile
                                        <span
                                            className="absolute left-0 bottom-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/add-post"
                                          className="relative m-1 block font-medium text-white  rounded-sm pb-2 md:p-0 group">
                                        Create post
                                        <span
                                            className="absolute left-0 bottom-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/messages"
                                          className="relative m-1 block font-medium text-white  rounded-sm pb-2 md:p-0 group">
                                        Messages
                                        <span
                                            className="absolute left-0 bottom-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/favorites"
                                          className="relative m-1 block font-medium text-white  rounded-sm pb-2 md:p-0 group">
                                        Favorites
                                        <span
                                            className="absolute left-0 bottom-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
                                    </Link>

                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Toolbar;

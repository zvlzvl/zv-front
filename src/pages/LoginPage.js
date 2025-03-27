import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/main";
import http from "../plugins/http";

const LoginPage = ( {socket }) => {
    const { loggUser, setMessages } = useStore((state) => state);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();

    async function login() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        const data = await http.post("http://localhost:2008/login", user);

        if (data.error) {
            setError(data.error);
        } else {
            loggUser(data.user);
            setMessages(data.messages);
            socket.emit("login", { userId: data.user._id });
            navigate("/");
        }
    }

    return (
        <div className="max-w-md mx-auto -mt-20 p-8 bg-gray-900 text-white shadow-2xl rounded-2xl border border-gray-700">
            <h1 className="text-3xl font-bold text-center mb-6">Log in</h1>

            {/* Username Input */}
            <div className="mb-5">
                <label htmlFor="login-username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                </label>
                <input
                    ref={usernameRef}
                    type="text"
                    id="login-username"
                    className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 transition-all"
                    placeholder="Enter your username"
                    required
                />
            </div>

            {/* Password Input */}
            <div className="mb-5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                </label>
                <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 transition-all"
                    placeholder="Enter your password"
                    required
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center p-4 text-sm border border-red-800 bg-red-900 text-red-400 rounded-lg mb-5">
                    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    {error}
                </div>
            )}

            {/* Login Button */}
            <button
                onClick={login}
                className="w-full p-3 mt-4 uppercase rounded-lg border-2 text-purple-200  border-purple-600 hover:bg-purple-700 transition-transform transform hover:scale-105"
            >
                Log in
            </button>

            {/* Divider */}
            <hr className="my-6 border-gray-700" />

            {/* Register Link */}
            <div className="text-center">
                <p className="text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-400 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../store/main";
import http from "../plugins/http";
import deleteAccount from "../assets/delete-account.png";


const ProfilePage = () => {
    let imageRef = useRef(null);
    const [user, setUser] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [imageError, setImageError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const {loggedUser, loggUser} = useStore(state => state);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const password2Ref = useRef(null);
    const passwordOldRef = useRef(null);

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login");
        } else {
            console.log(loggedUser);
            fetch(`http://localhost:2008/profile/${loggedUser.username}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data.user);
                })
        }
    }, [loggedUser, navigate]);

    async function changePassword() {
        removeError();
        let oldPassword = passwordOldRef.current.value;
        let newPassword = passwordRef.current.value;
        let new2Password = password2Ref.current.value;
        if (oldPassword === "" || newPassword === "" || new2Password === "") {
            setPasswordError("Please fill passwords");
        } else {
            let user = {
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "new2Password": new2Password,
            }
            const data = await http.postToken("http://localhost:2008/change-password", user, loggedUser.token);
            if (data.error) {
                setPasswordError(data.error);
            } else {
                setUser(data.user);
                passwordOldRef.current.value = "";
                passwordRef.current.value = "";
                password2Ref.current.value = "";
                setPasswordSuccess(true);
            }
        }
    }

    async function update(key) {
        removeError();

        let updateFields = {};
        if (key === "image") {
            let newImageUrl = imageRef.current.value;
            if (newImageUrl === "") {
                setImageError("Please add image url.");
            } else {
                updateFields = {image: newImageUrl}
            }

        } else if (key === "username") {
            let newUsername = usernameRef.current.value;
            if (newUsername === "") {
                setUsernameError("Please add new username.");
            } else {
                updateFields = {username: newUsername}
            }
        }

        const data = await http.postToken("http://localhost:2008/update", {
            _id: user._id,
            updateFields: updateFields
        }, loggedUser.token)

        if (data.error) {
            if (key === "username") setUsernameError(data.error);
            else if (key === "image") setImageError(data.error);
        } else {
            setUser(data.user);
            //change loggedUser data
            let newUserData = data.user;
            newUserData.token = loggedUser.token;
            loggUser(newUserData);
            if (key === "username") {
                usernameRef.current.value = "";
                setSuccess(true);
            }
            if (key === "image") imageRef.current.value = "";
        }
    }

    function removeError() {
        setUsernameError("");
        setImageError("");
        setSuccess(false);
        setPasswordSuccess(false);
        setDeleteError("");
        setPasswordError("");
    }

    async function deleteProfile() {
        removeError();
        const data = await http.postToken("http://localhost:2008/delete", {password: passwordRef.current.value}, loggedUser.token);
        if (data.error) {
            setDeleteError(data.error);
        } else {
            loggUser(null);
        }
    }


    return (
        <div
            className="flex flex-col w-full md:flex-row gap-2 max-w-5xl mx-auto p-8 bg-opacity-80 backdrop-blur-lg bg-gray-900 shadow-2xl rounded-3xl border border-gray-700">
            {/* Left: Profile Info */}
            <div
                className="flex mx-0 sm:mx-6 md:mx-0 flex-col md:items-center md:justify-between md:w-2/5 bg-opacity-60 rounded-xl shadow-inner">
                <div className="flex flex-col ">
                    <img
                        src={loggedUser?.image}
                        alt="Profile"
                        className="w-56 h-auto border-4 self-center  border-purple-400 shadow-lg transition-transform transform hover:scale-105 hover:-rotate-6"
                    />
                    <h1 className="my-4 text-2xl self-center font-extrabold text-white">{loggedUser?.username}</h1>
                </div>
                <div className="p-4 bg-gray-800 bg-opacity-60 rounded-xl shadow-inner">
                    <h4 className="font-semibold text-white">Change Profile Image</h4>
                    <input
                        ref={imageRef}
                        type="text"
                        placeholder="Enter image URL"
                        className="input input-bordered w-full mt-2 bg-gray-700 text-white placeholder-gray-400 my-2"
                    />

                    {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                    <button onClick={() => update("image")} className="btn mt-3 w-full">Save</button>
                </div>
            </div>

            {/* Middle: Edit Profile */}
            <div className="flex flex-col mx-0 sm:mx-6 md:mx-0 md:w-2/5 md:justify-between">

                {/* Change Username */}
                <div className="mt-4 md:mt-0 p-4 bg-gray-800 bg-opacity-60 rounded-xl shadow-inner">
                    <h4 className="font-semibold text-white">Change Username</h4>
                    <input
                        ref={usernameRef}
                        type="text"
                        placeholder="Enter new username"
                        className="input input-bordered w-full mt-2 bg-gray-700 text-white placeholder-gray-400 my-2"
                    />
                    {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    {success && <p className="text-green-400 text-sm">Username changed successfully!</p>}
                    <button onClick={() => update("username")} className="btn mt-3 w-full">Save</button>
                </div>
                {/* Change Password  */}
                <div className="mt-6 p-4 bg-gray-800 bg-opacity-60 rounded-xl shadow-inner">
                    <h4 className="font-semibold text-white">Change Password</h4>
                    <input
                        ref={passwordOldRef}
                        type="text"
                        placeholder="Enter old password"
                        className="input input-bordered w-full mt-2 bg-gray-700 text-white placeholder-gray-400 my-2"
                    />
                    <input
                        ref={passwordRef}
                        type="text"
                        placeholder="Enter new password"
                        className="input input-bordered w-full mt-2 bg-gray-700 text-white placeholder-gray-400 my-2"
                    />
                    <input
                        ref={password2Ref}
                        type="text"
                        placeholder="Repeat new password"
                        className="input input-bordered w-full mt-2 bg-gray-700 text-white placeholder-gray-400 my-2"
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    {passwordSuccess && <p className="text-green-400 text-sm">Password changed successfully!</p>}
                    <button onClick={changePassword} className="btn mt-3 w-full">Save</button>
                </div>
            </div>

            {/* Right: Delete Profile */}
            <div className="flex flex-col items-center md:w-1/5  justify-start shadow-inner">
                <img
                    src={deleteAccount}
                    alt="Delete"
                    onClick={() => setDeleteModal(true)}
                    className="w-52 md:w-32 md:h-32 rounded-full transition-transform transform cursor-pointer hover:scale-110 "
                />
            </div>

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-96">
                        <h2 className="text-xl font-bold text-white">Are you sure?</h2>
                        <p className="text-gray-400 mt-2">Enter your password to confirm deletion:</p>
                        <input
                            ref={passwordRef}
                            type="password"
                            className="input input-bordered w-full mt-2 bg-gray-700 text-white placeholder-gray-400 my-2"
                            placeholder="Enter password"
                        />
                        {deleteError && <p className="text-red-500 text-sm">{deleteError}</p>}
                        <div className="flex gap-4 mt-4">
                            <button onClick={deleteProfile}
                                    className="rounded-lg border-2 w-[50%] uppercase text-sm font-medium text-red-600 py-3 hover:text-gray-900  border-red-600 hover:bg-red-600 flex-1 transition-transform transform hover:scale-105">Confirm
                            </button>
                            <button onClick={() => setDeleteModal(false)}
                                    className="rounded-lg border-2 w-[50%] uppercase text-sm font-medium py-3 text-secondary hover:text-gray-900  border-secondary hover:bg-secondary flex-1 transition-transform transform hover:scale-105">Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

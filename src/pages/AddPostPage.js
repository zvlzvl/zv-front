import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";
import useStore from "../store/main";

const AddPostPage = () => {
    const {loggedUser} = useStore(state => state)
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const descriptionRef = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loggedUser) navigate("/login");
    }, [loggedUser, navigate])

    function create() {
        let newPost = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            image: imageRef.current.value,
        }
        http.postToken("http://localhost:2008/add-post", newPost, loggedUser.token)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    navigate("/")
                }
            })
    }

    return (
        <div className="max-w-md mx-auto p-8 bg-gray-900 text-white shadow-2xl rounded-2xl border border-gray-700">
            <h1 className="text-3xl font-bold text-center mb-6">Create post</h1>
            <div className="mb-5">
                <label htmlFor="title"
                       className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input ref={titleRef} type="text"
                       className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 transition-all"
                       placeholder="Enter title" id="title"/>

            </div>
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="image">Image</label>
                <input ref={imageRef} type="text"
                       className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 transition-all"
                       placeholder="Enter image url" id="image"/>

            </div>
            <div className="mb-5 flex flex-col">
                <label htmlFor="block text-sm font-medium text-gray-300 mb-2">Description</label>

                <textarea ref={descriptionRef} id="description" placeholder="Enter description"
                          className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 transition-all"
                          rows="4"></textarea>
            </div>
            {error && <div
                className="flex items-center p-4 mb-4 text-sm border rounded-lg text-red-400 border-red-800"
                role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div>
                    {error}
                </div>
            </div>}
            <button type="button" onClick={create}
                    className="w-full p-3 mt-4 uppercase rounded-lg border-2 text-purple-200  border-purple-600 hover:bg-purple-700 transition-transform transform hover:scale-105"
                >Upload post</button>
        </div>



        //         <div className="form-group flex d-column">
        //             <label htmlFor="description">Description</label>
        //             <textarea ref={descriptionRef} id="description" placeholder="Enter description" rows="4"></textarea>
        //         </div>

    );
};

export default AddPostPage;
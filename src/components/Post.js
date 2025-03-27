import React, {useEffect, useState} from 'react';
import star from '../assets/star.png';
import starWhite from '../assets/star-white.png';
import {Link, useNavigate} from "react-router-dom";
import http from "../plugins/http";
import useStore from "../store/main";


const Post = ({post}) => {
    const {loggedUser, setFavorites} = useStore(state => state);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        // Check if the post is already in the favorites list
        const isFavorite = loggedUser?.favorites?.some(id => id === post?._id);
        setFavorite(isFavorite);
    }, [loggedUser]);

    function addToFavorite() {
        http.getToken(`http://localhost:2008/favorite/${post._id}`, loggedUser?.token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setFavorites(data.user.favorites);
                }
            })
    }

    return (
        <div
            key={post._id}
            className="relative backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white/20"
        >
            {/* Post Image with Zoom Effect */}
            <figure className="relative">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105 rounded-t-lg"
                />
            </figure>

            {/* Card Content */}
            <div className="p-4 text-white">
                {/* Post Title with Favorite Button */}
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold  w-[85%]">{post.title}</h2>

                    {/* Favorite Button with Rotation Animation */}
                    <button onClick={addToFavorite} className="transition-transform duration-300 hover:rotate-12">
                        <img className="w-6 h-auto" src={favorite ? star : starWhite} alt="Favorite Icon" />
                    </button>
                </div>

                {/* Read More Link */}
                <p className="mt-2">
                    <Link to={`/post/${post._id}`} className="text-secondary hover:underline text-sm">
                        Read More
                    </Link>
                </p>

                {/* Footer with Timestamp & Author */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                    <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                    <Link
                        to={`/user/${post.createdBy?._id}`}
                        className="badge bg-purple-600 text-white py-1 px-3 rounded-full transition-transform duration-300 hover:scale-105"
                    >
                        {post.createdBy?.username}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Post;

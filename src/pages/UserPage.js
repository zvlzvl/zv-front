import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/http";
import Post from "../components/Post";
import useStore from "../store/main";
import SendMessage from "../components/SendMessage";

const UserPage = () => {
    const {userId} = useParams();
    const {loggedUser} = useStore(state => state);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login");
        } else {
            http.get(`http://localhost:2008/user/${userId}`)
                .then((res) => {
                    if (!res.error) {
                        setUser(res.user);
                        setPosts(res.posts);
                    }
                });
        }
    }, [loggedUser, userId]);

    if (!user) {
        return <div className="text-center text-lg font-bold mt-10">Loading...</div>;
    }

    return (
        <div className="w-full p-5 ">
            {/* User Profile Section */}
            <div
                className="flex flex-col sm:flex-row items-center justify-between  gap-4 max-w-5xl mx-auto p-5 bg-opacity-80 backdrop-blur-lg bg-gray-900 shadow-2xl rounded-3xl border border-gray-700">
                <img src={user.image} alt="User"
                     className="w-36 h-36 border-2 shadow-[0px_0px_1200px_rgba(0,0,0,0)] shadow-secondary border-secondary transition transform -rotate-3"/>

                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold min-w-[300px]">{user?.username}</h2>
                    {/* Message Input */}
                    {userId !== loggedUser?._id && (

                        <div className="mt-4 flex flex-col xs:flex-row gap-2 items-center">
                            <SendMessage getterId={userId}/>
                        </div>
                    )}
                </div>
            </div>

            {/* User Posts */}

            <div className="mt-6 ">
                <h3 className="text-xl font-bold mb-3">User's Posts</h3>
                <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-6">
                    {posts.length === 0 ? (
                        <p className="text-gray-500">No posts yet.</p>
                    ) : (
                        posts.map((post, index) => (
                            <Post key={index} post={post} setPosts={setPosts}/>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
};

export default UserPage;

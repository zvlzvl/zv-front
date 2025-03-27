import React, {useEffect, useRef, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import http from "../plugins/http";
import useStore from "../store/main";
import star from "../assets/star.png";
import starBlack from "../assets/starBlack.png";

const SinglePostPage = () => {
    const colors = [
        "border-pink-500/50",
        "border-cyan-400/50",
        "border-orange-500/50",
        "border-green-400/50",
        "border-pink-600/50",
        "border-green-300/50",
        "border-yellow-400/50",
        "border-red-500/50",
        "border-purple-500/50",
        "border-blue-400/50"
    ]
    const {id} = useParams();
    const {loggedUser, setFavorites} = useStore(state => state);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const commentTextRef = useRef("");
    const [favorite, setFavorite] = useState(false);
    const [showAllComments, setShowAllComments] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login");
        } else {
            const isFavorite = loggedUser?.favorites?.some(id => id === post?._id);
            setFavorite(isFavorite);
            http.get(`http://localhost:2008/post/${id}`).then(data => {
                if (!data.error) {
                    setPost(data);
                    const reversedComments = [...data.comments].reverse(); // Create a copy and reverse
                    setComments(reversedComments);  // Set reversed comments
                }
            });
        }
    }, [id, loggedUser, post?._id]);

    const addComment = () => {
        if (commentTextRef.current.value.trim() === "") return;

        http.postToken(`http://localhost:2008/post/${id}/comment`, {
            content: commentTextRef.current.value,
            sender: loggedUser._id
        }, loggedUser?.token)
            .then(data => {
                if (!data.error) {
                    const reversedComments = [...data.post.comments].reverse(); // Create a copy and reverse
                    setComments(reversedComments);  // Set reversed comments
                    commentTextRef.current.value = "";
                }
            });
    };

    const addToFavorite = () => {
        http.getToken(`http://localhost:2008/favorite/${id}`, loggedUser?.token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setFavorites(data.user.favorites);
                }
            })
    };


    if (!post) return <div className="text-center text-lg">Loading...</div>;
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            {/* Post Image with Favorite Button */}
            <div
                className="relative backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-xl overflow-hidden">
                <img src={post.image} alt="Post"
                     className="w-full rounded-lg transition-transform duration-300 hover:scale-105"/>
                <button onClick={addToFavorite}
                        className="absolute top-4 right-4 transition-transform duration-300 hover:scale-110">
                    <img className="w-8 h-8" src={favorite ? star : starBlack} alt="Favorite"/>
                </button>
            </div>

            {/* Post Content */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-6 rounded-xl text-white">
                <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-200">{post.description}</p>

                {/* Author & Timestamp */}
                <div className="flex justify-between items-center mt-4 text-gray-300">
                    <Link to={`/user/${post.createdBy?._id}`}
                          className="bg-purple-600 text-white py-1 px-3 rounded-full transition-transform duration-300 hover:scale-110">
                        {post.createdBy?.username}
                    </Link>
                    {new Date(post.created_at).toLocaleDateString()} {new Date(post.created_at).toLocaleTimeString()}

                </div>
            </div>

            {/* Comments Section */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4 text-white">Comments {comments.length}</h2>

                {/* Comment Input */}
                {loggedUser && (
                    <div className="flex flex-col gap-2 sm:flex-row items-center mb-4">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="input input-bordered w-full sm:w-[75%] bg-white/20 text-white placeholder-gray-300"
                            ref={commentTextRef}
                        />
                        <button onClick={addComment}
                                className="p-2.5 uppercase rounded-lg border-2 text-purple-200  border-purple-600 w-full sm:w-[25%] hover:bg-purple-700">
                            Post
                        </button>
                    </div>
                )}

                {/* Comment List - Show Only First 3 Initially */}
                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments
                            .slice(0, showAllComments ? comments.length : 3)
                            .map((comment, index) => (
                                <div key={index}
                                     className={`bg-white/20 p-3 border ${colors[index % 10]} rounded-lg shadow-sm text-white`}>
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">{comment.sender.username}</p>
                                        <span className="ml-2 text-sm text-gray-400">
                                            {new Date(comment.created_at).toLocaleDateString()} {new Date(comment.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-300">{comment.content}</p>
                                </div>
                            ))
                    ) : (
                        <p className="text-gray-400">No comments yet.</p>
                    )}

                    {/* "See More" Button */}
                    {comments.length > 3 && (
                        <button
                            onClick={() => setShowAllComments(!showAllComments)}
                            className="mt-4 block text-center w-full text-purple-400 hover:text-purple-300 transition duration-300"
                        >
                            {showAllComments ? "See Less" : "See More..."}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SinglePostPage;
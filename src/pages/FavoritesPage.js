import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../store/main";
import http from "../plugins/http";
import Post from "../components/Post";

const IndexPage = ({socket}) => {

    const navigate = useNavigate();
    const {loggedUser} = useStore(state => state);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login");
        } else {
            http.getToken("http://localhost:2008/posts/favorite", loggedUser.token)
                .then(data => setPosts(data));
        }
    }, [loggedUser, navigate])

    return (

        <div className="mt-6">
            <h1 className="text-xl font-bold my-6">MY FAVORITES</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {posts.length > 0 &&
                    posts.map((post) => (
                        <Post key={post._id} post={post} setPosts={setPosts}/>
                    ))
                }
            </div>
        </div>
    );
};

export default IndexPage;

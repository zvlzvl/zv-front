import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from "../store/main";
import http from "../plugins/http";
import SendMessage from "../components/SendMessage";

const MessagesPage = ({socket}) => {
    const {loggedUser, setMessages, messages} = useStore(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login");
        } else {
            http.getToken("http://localhost:2008/messages", loggedUser.token)
                .then(res => {
                    setMessages(res)
                })
        }
    }, [loggedUser, navigate, setMessages, messages]);


    function deleteMessage(id) {
        http.getToken(`http://localhost:2008/delete-message/${id}`, loggedUser.token)
            .then(res => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    setMessages(res.messages)
                    console.log("message deleted successfully");
                }
            })
    }

    return (
        // bg-gradient-to-b from-gray-800 via-purple-900 to-black p-8
        <div className="min-h-screen ">
            <div
                className="max-w-5xl mx-auto bg-opacity-60  p-6 rounded-3xl ">
                <h1 className="text-3xl font-bold text-white mb-6">Messages</h1>

                <div className="space-y-6">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div key={index}
                                 className="bg-opacity-40 border border-gray-500 rounded-xl p-4 space-y-2 shadow-lg hover:scale-105 transform transition-transform duration-300">
                                <div className="flex justify-between items-center text-white">
                                    <div className="flex flex-col sm:flex-row items-center">
                                        <div className="flex items-center">
                                            <img className="w-10 h-10 rounded-full mr-2" src={message.sender.image}
                                                 alt=""/>
                                            <div
                                                className="text-lg font-semibold">
                                                {message.sender.username}
                                            </div>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-400">
                                            {new Date(message.created_at).toLocaleDateString()} {new Date(message.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteMessage(message._id)}
                                        className="transition-transform duration-300 transform hover:scale-110"
                                    >
                                        🗑️
                                    </button>

                                </div>
                                <p className="text-white">{message.message}</p>

                                {/* Reply Section */}
                                <div className="">
                                    <SendMessage getterId={message.sender._id}/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No messages yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;

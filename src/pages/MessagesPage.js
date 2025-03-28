import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useStore from "../store/main";
import http from "../plugins/http";

import SendMessage from "../components/SendMessage";
import UserTalk from "../components/UserTalk";
import AnswerTalk from "../components/AnswerTalk";

const MessagesPage = ({socket}) => {
    const {
        loggedUser,
        chatUsers,
        setChatUsers,
        conversation,
        setConversation,
        selectedUser,
        setSelectedUser
    } = useStore((state) => state);
    const navigate = useNavigate();
    const chatWindowRef = useRef(null)
    const [yellow, setYellow] = useState([]);

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login");
        } else {
            http.getToken("http://localhost:2008/get-conversation-users", loggedUser.token)
                .then(res => {
                    setChatUsers(res.chatUsers)
                })
        }
    }, [loggedUser, navigate]);

    useEffect(() => {

        socket.on("conversation", (data) => {
            if (selectedUser._id === data.sender) {
                setConversation(data.conversation);
            } else {
                setYellow((prevYellow) => {
                    if (!prevYellow.includes(data.sender)) {
                        return [...prevYellow, data.sender];
                    }
                    return prevYellow;
                });
            }
        })
        socket.on("chatUsers", (data) => {
            setChatUsers(data.chatUsers);
        })
        return () => {
            socket.off("conversation");
            socket.off("chatUsers");
        };

    }, [socket, selectedUser]);


    function openChat(user) {
        console.log("Before setting selectedUser:", selectedUser);
        setSelectedUser(user);
        // Remove user ID from yellow list
        setYellow((prevYellow) => prevYellow.filter((id) => id !== user._id));
        console.log("After setting selectedUser:", user);
        http.getToken(`http://localhost:2008/messages/${user._id}`, loggedUser.token).then((res) => {
            setConversation(res);
        });
    }

    function deleteMessage(id) {

        http.getToken(`http://localhost:2008/delete-message/${id}`, loggedUser.token)
            .then(res => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    console.log(res)
                    setChatUsers(res.chatUsers);
                    setConversation(res.conversation)
                    console.log("message deleted successfully");
                }
            })
    }

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom(); // Automatically scroll to the bottom when the component mounts or updates
    });

    return (
        <div className="min-h-screen flex">
            {/* Sidebar - Chat List */}
            <div className="w-1/3 bg-gray-900 p-6 rounded-r-3xl">
                <h1 className="text-2xl font-bold text-white mb-4">Friends</h1>
                <div className="space-y-4">
                    {chatUsers.length > 0 ? (
                        chatUsers.map((user, index) => (
                            <div
                                key={index}
                                className={`p-3 flex items-center gap-3 rounded-lg cursor-pointer transition-transform duration-300  ${yellow.includes(user._id) && " shadow-md shadow-yellow-300/60" } ${
                                    selectedUser?._id === user._id ? "bg-gray-700 scale-105" : "bg-gray-800"
                                }`}
                                onClick={() => openChat(user)}
                            >
                                <img className="w-10 h-10 rounded-full" src={user.image} alt="User"/>
                                <span className="text-white font-semibold">{user.username}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No messages yet.</p>
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className="w-2/3 bg-opacity-40 border border-secondary/30 shadow-lg p-6 rounded-l-3xl flex flex-col h-[500px]">
                {selectedUser ? (
                    <>
                        <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-4">
                            <img className="w-12 h-12 rounded-full" src={selectedUser.image} alt="User"/>
                            <h2 className="text-white text-xl font-bold">{selectedUser.username}</h2>
                        </div>
                        <div ref={chatWindowRef} className="flex-grow overflow-y-auto">
                            <div className="space-y-4 flex flex-col ">
                                {conversation?.map((message, index) =>
                                    message.sender._id === loggedUser._id ? (
                                        <UserTalk key={index} message={message} user={message.sender}
                                                  deleteMessage={deleteMessage}/>
                                    ) : (
                                        <AnswerTalk key={index} message={message} opponentObj={message.sender}
                                                    deleteMessage={deleteMessage}/>
                                    )
                                )}
                            </div>
                        </div>
                        <SendMessage getterId={selectedUser._id} setConversation={() => setConversation}/>
                    </>
                ) : (
                    <p className="text-gray-400 text-center mt-20">Select a conversation to start chatting</p>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
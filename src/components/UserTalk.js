import React from "react";

const UserTalk = ({message, user, deleteMessage}) => {
    const date = new Date(message.created_at);
    const formattedTime = date.toLocaleTimeString();

    return (
        <div className="flex justify-end items-center gap-3 my-1 mr-2">

            <div className="border border-purple-500 text-white px-4 py-2 rounded-xl max-w-xs">
                {message.message}
                <div className="flex justify-end items-center gap-2">
                    <div className="text-xs text-gray-300 text-right">{formattedTime}</div>
                    <button
                        onClick={() => deleteMessage(message._id)}
                        className="transition-transform duration-300 transform hover:scale-110"
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <img className="w-8 h-8 rounded-full" src={user?.image} alt="User"/>
            </div>
        </div>
    );
};

export default UserTalk;
import React from "react";

const AnswerTalk = ({message, opponentObj, deleteMessage}) => {
    const date = new Date(message.created_at);
    const formattedTime = date.toLocaleTimeString();

    return (
        <div className="flex items-center gap-3 my-1">
            <img className="w-8 h-8 rounded-full" src={opponentObj.image} alt="User"/>

            <div className="bg-gray-700 text-white px-4 py-2 rounded-xl max-w-xs">
                {message.message}
                <div className="flex justify-start items-center gap-2">
                    <button
                        onClick={() => deleteMessage(message._id)}
                        className="transition-transform duration-300 transform hover:scale-110"
                    >
                        🗑️
                    </button>
                    <div className="text-xs text-gray-300">{formattedTime}</div>
                </div>
            </div>
        </div>
    );
};

export default AnswerTalk;

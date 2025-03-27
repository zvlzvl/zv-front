import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import useStore from "../store/main";

const SendMessage = ({getterId}) => {

    const {loggedUser} = useStore(state => state);
    const messageRef = useRef(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function sendMessage() {
        setError("");
        setSuccess(false);
        if (messageRef.current.value.trim() === "") setError("Message required");
        const message = {
            message: messageRef.current.value,
            sender: loggedUser._id,
            getter: getterId,
        }
        http.postToken(`http://localhost:2008/send-message`, message, loggedUser.token)
            .then((res) => {
                if (res.error) {
                    setError(res.error);
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                } else {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 3000);
                    messageRef.current.value = "";
                }
            })
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="mt-4 flex flex-col sm:flex-row gap-1">
            <input
                type="text"
                ref={messageRef}
                placeholder="Send a message..."
                className="input input-bordered w-full sm:w-[75%] bg-opacity-60  border border-gray-500 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600"
            />
            <button
                onClick={sendMessage}
                className="p-2.5 uppercase rounded-lg border-2 text-purple-200  border-purple-600 w-full sm:w-[25%]  hover:bg-purple-700"
            >
                Send
            </button>
            </div>
            <div className="px-2">
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-400 text-sm mt-2 ">message send successfully!</p>}
            </div>
        </div>

    );
};

export default SendMessage;
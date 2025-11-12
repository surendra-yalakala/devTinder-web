import React from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const user = useSelector((store) => store.user);
  const targetUserId = useParams();
  const userId = user?._id;

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="max-w-1/2 border mx-auto my-10 p-5 border-gray-300 rounded-lg min-h-[75vh] flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="chat chat-start">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Surendra Yalakala
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble font-sans text-sm">
          You were the Chosen One!
        </div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      <div className="flex justify-around items-center mt-5">
        <input
          type="text"
          placeholder="Type your message here..."
          className="input input-bordered w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-success mx-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

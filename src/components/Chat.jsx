import React, { useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { formatTime } from "../utils/utility";

const Chat = () => {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const user = useSelector((store) => store.user);
  const { targetUserId } = useParams();
  const messagesEndRef = React.useRef(null);
  const userId = user?._id;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // fetch all chat messages between logged in user and target user
  const fetchMessages = async () => {
    try {
      const chatRes = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
        withCredentials: true,
      });

      console.log(chatRes.data.messages);

      const chatMsgs = chatRes.data.messages.map((msg) => {
        return {
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          text: msg.text,
          sentAt: formatTime(msg.createdAt),
        };
      });
      console.log(chatMsgs);

      setMessages(chatMsgs);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("joinRoom", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      const sentAt = createdAt ? formatTime(createdAt) : formatTime(Date.now());

      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, sentAt },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

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
    // optimistic update with sentAt
    // const optimisticMsg = {
    //   firstName: user?.firstName,
    //   lastName: user?.lastName,
    //   text: newMessage,
    //   sentAt: formatTime(Date.now()),
    // };
    // setMessages((msgs) => [...msgs, optimisticMsg]);

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">
                Seen
                <time className="text-xs opacity-50"> {msg.sentAt}</time>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

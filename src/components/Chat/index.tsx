import { useState, useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Message from "./Message";
import MessageModal from "./MessageModal";
// import ReactionsModal from "./ReactionsModal";
import { lineSpinner } from "ldrs";
import axios from "axios";
import ConnectButton from "../Profile/connect";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/users";

const socket = io("http://localhost:8000");
interface MessageType {
  username: any;
  message: string;
  profilePic: string;
}

const Chat = () => {
  const { publicKey } = useWallet();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<MessageType[]>([]);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const user = useRecoilValue(userState);
  // const [showReactionsModal, setShowReactionsModal] = useState(false);
  // const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  // const [reactionMessage, setReactionMessage] = useState<MessageType | null>(
  //   null
  // );
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  lineSpinner.register();

  useEffect(() => {
    fetchInitialMessages();
    const handleNewMessage = (msg: MessageType) => {
      setNewMessage((prevMessages: MessageType[]) => {
        return [...prevMessages, msg];
      });
    };
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("initialMessages");
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, newMessage]);

  const fetchInitialMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/initialMessages"
      );
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (currentUserMessage.length <= 500) {
      if (currentUserMessage.trim()) {
        socket.emit("sendMessage", {
          username:
            user.username.toString().length > 15
              ? `${user.username?.toString().slice(0, 4)}...${user.username
                  ?.toString()
                  .slice(-4)}`
              : user.username,
          message: currentUserMessage,
          profilePic: user.profilePic,
        });
        setCurrentUserMessage("");
      }
    } else {
      alert("Character count exceeds 500");
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenModal = (msg: MessageType) => {
    setSelectedMessage(msg);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  // const handleReactionClick = (reaction: string) => {
  //   if (reactionMessage) {
  //     console.log(`Reacted with ${reaction} to message:`, reactionMessage);
  //   }
  //   // setShowReactionsModal(false);
  // };

  // const handleLongPressStart = (e: React.TouchEvent, msg: MessageType) => {
  //   e.preventDefault();
  //   setReactionMessage(msg);

  //   const touch = e.touches[0];
  //   // setModalPosition({ x: touch.clientX, y: touch.clientY });
  //   // setShowReactionsModal(true);
  // };

  // const handleHover = (e: React.MouseEvent, msg: MessageType) => {
  //   setReactionMessage(msg);
  //   // setModalPosition({ x: e.clientX, y: e.clientY });
  //   // setShowReactionsModal(true);
  // };

  // const handleMouseLeave = () => {
  //   setShowReactionsModal(false);
  // };

  return (
    <div className="h-full w-[100%] mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-[500px] w-[90%]">
          <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="black"
          ></l-line-spinner>
        </div>
      ) : (
        <>
          {messages.map((msg, index) => (
            <div
              key={index}
              onClick={() => handleOpenModal(msg)}
              // onTouchStart={(e) => handleLongPressStart(e, msg)}
              // onMouseEnter={(e) => handleHover(e, msg)}
              // onMouseLeave={handleMouseLeave}
              className="cursor-pointer w-[90%] md:w-full mx-auto"
            >
              <Message
                username={msg.username}
                text={msg.message}
                sender_pfp={msg.profilePic}
              />
              {index !== messages.length - 1 && (
                <div className="w-[80%] md:w-[50%] md:mx-auto bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
              )}
            </div>
          ))}
          {newMessage.map((msg, index) => (
            <div
              key={index}
              onClick={() => handleOpenModal(msg)}
              // onTouchStart={(e) => handleLongPressStart(e, msg)}
              // onMouseEnter={(e) => handleHover(e, msg)}
              // onMouseLeave={handleMouseLeave}
              className="cursor-pointer w-[90%] md:w-full mx-auto"
            >
              <div className="w-[80%] md:w-[50%] md:mx-auto bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
              <Message
                username={msg.username}
                text={msg.message}
                sender_pfp={msg.profilePic}
              />
            </div>
          ))}

          <div ref={endOfMessagesRef} />

          {publicKey ? (
            <div className=" md:w-[50%] w-[90%] mb-[20px] mx-auto border-[1px] sm:border-[2px] border-[#4EAB5E] rounded-[8px] h-[45px] sm:h-[65px] mt-[20px] flex items-center p-[2px]">
              <input
                type="text"
                placeholder="Type your message"
                value={currentUserMessage}
                onChange={(e) => setCurrentUserMessage(e.target.value)}
                className="flex-grow h-full p-[2px] sm:text-[20px] rounded-[8px] border-none outline-none font-sofia-regular font-semibold px-[20px]"
                style={{ backgroundColor: "transparent", color: "#000" }}
              />
              <button
                className="bg-[#4EAB5E] h-full w-[35px] sm:w-[55px] rounded-[8px] flex justify-center items-center cursor-pointer"
                onClick={handleSendMessage}
              >
                <svg
                  width="11"
                  height="20"
                  viewBox="0 0 11 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.6667 10L0 0V20L10.6667 10Z" fill="white" />
                </svg>
              </button>
            </div>
          ) : (
            <ConnectButton> Connect to chat </ConnectButton>
          )}

          <MessageModal
            toggleModal={handleCloseModal}
            message={selectedMessage}
          />

          {/* <ReactionsModal
            visible={showReactionsModal}
            position={modalPosition}
            onReactionClick={handleReactionClick}
          /> */}
        </>
      )}
    </div>
  );
};

export default Chat;

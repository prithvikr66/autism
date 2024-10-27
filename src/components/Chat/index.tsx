import { useState, useEffect, useRef } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
import WalletConnect from "../../utils/wallet-connect";
import Message from "./Message";
import MessageModal from "./modal";
import { messages as mockMessages } from "./data";
import { lineSpinner } from "ldrs";

interface MessageType {
  username: string;
  message: string;
  profilePic: string;
}

const Chat = () => {
  // const { connected } = useWallet();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  lineSpinner.register();

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleOpenModal = (msg: MessageType) => {
    setSelectedMessage(msg);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="h-full w-[90%] mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-[500px] ">
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
              className="cursor-pointer"
            >
              <Message
                username={msg.username}
                message={msg.message}
                pfp={msg.profilePic}
              />
              {index !== messages.length - 1 && (
                <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
              )}
            </div>
          ))}

          <div ref={endOfMessagesRef} />

          {1 ? (
            <div className="w-full mb-[20px] mx-auto border-[1px] sm:border-[2px] border-[#4EAB5E] rounded-[8px] h-[45px] sm:h-[65px] mt-[20px]  flex items-center p-[2px]">
              <input
                type="text"
                placeholder="Type your message"
                className="flex-grow h-full p-[2px] sm:text-[20px] rounded-[8px] border-none outline-none font-sofia-regular font-semibold px-[20px]"
                style={{ backgroundColor: "transparent", color: "#000" }}
              />
              <button className="bg-[#4EAB5E] h-full w-[35px] sm:w-[55px] rounded-[8px] flex justify-center items-center cursor-pointer">
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
            <WalletConnect />
          )}

          <MessageModal
            toggleModal={handleCloseModal}
            message={selectedMessage}
          />
        </>
      )}
    </div>
  );
};

export default Chat;

import { useState, useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Message from "./Message";
import MessageModal from "./modal";
import { lineSpinner } from "ldrs";
import axios from "axios";
import ConnectButton from "../Profile/connect";

interface MessageType {
  username: any;
  text: string;
  sender_pfp: string;
}

const Chat = () => {
  const { publicKey } = useWallet();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  lineSpinner.register();

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // if (!ws.current) {
    //   ws.current = new WebSocket(
    //     "wss://i7n8t598il.execute-api.ap-south-1.amazonaws.com/dev/"
    //   );

    //   ws.current.onopen = () => {
    //     console.log("WebSocket connected");
    //     // fetchInitialMessages();
    //   };

    //   ws.current.onmessage = (event) => {
    //     const messageData = JSON.parse(event.data);
    //     handleIncomingMessage(messageData);
    //   };

    //   ws.current.onclose = () => {
    //     console.log("WebSocket closed");
    //   };
    // }
    // fetchInitialMessages();

    // return () => {
    //   ws.current?.close();
    // };
    fetchInitialMessages();
  }, []);

  const fetchInitialMessages = async () => {
    try {
      const response = await axios.get(
        "https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/?method=get_messages&room=public"
      );
      const data = response.data;
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // const handleSendMessage = () => {
  //   if (newMessage.trim() === "" || !ws.current) return;

  //   const messagePayload = JSON.stringify({
  //     action: "sendMessage",
  //     walletAddress: "temp",
  //     text: newMessage,
  //     alpha: false,
  //   });

  //   ws.current.send(messagePayload);
  //   setNewMessage("");
  // };

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

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     // Prevent newline insertion
  //     e.preventDefault();
  //     handleSendMessage();
  //   } else if (e.key === "Enter" && e.shiftKey) {
  //     // Allow newline insertion
  //     setNewMessage((prev) => prev + "\n");
  //   }
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
              className="cursor-pointer w-[90%] md:w-full mx-auto"
            >
              <Message
                username={msg.username}
                text={msg.text}
                sender_pfp={msg.sender_pfp}
              />
              {index !== messages.length - 1 && (
                <div className="w-[80%] md:w-[50%] md:mx-auto bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
              )}
            </div>
          ))}

          <div ref={endOfMessagesRef} />

          {publicKey ? (
            <div className=" md:w-[50%] w-[90%] mb-[20px] mx-auto border-[1px] sm:border-[2px] border-[#4EAB5E] rounded-[8px] h-[45px] sm:h-[65px] mt-[20px] flex items-center p-[2px]">
              <input
                type="text"
                placeholder="Type your message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow h-full p-[2px] sm:text-[20px] rounded-[8px] border-none outline-none font-sofia-regular font-semibold px-[20px]"
                style={{ backgroundColor: "transparent", color: "#000" }}
              />
              <button
                // onClick={handleSendMessage}
                className="bg-[#4EAB5E] h-full w-[35px] sm:w-[55px] rounded-[8px] flex justify-center items-center cursor-pointer"
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
            <ConnectButton > COnnect to chat </ConnectButton>
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

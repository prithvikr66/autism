import { useState, useEffect, useRef, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Message from "./Message";
import MessageModal from "./MessageModal";
import { lineSpinner } from "ldrs";
import axios from "axios";
import ConnectButton from "../Profile/connect";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/users";

interface MessageType {
  username: any;
  text: string;
  sender_pfp: string;
  walletAddress: string;
}

const Chat = () => {
  const { publicKey } = useWallet();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessages, setNewMessages] = useState<MessageType[]>([]);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const user = useRecoilValue(userState);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  lineSpinner.register();

  useEffect(() => {
    fetchInitialMessages();
  }, []);

  useEffect(() => {
    setupWebSocket();

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, newMessages]);

  const setupWebSocket = () => {
    websocketRef.current = new WebSocket(
      "wss://q1qqf9y8gb.execute-api.ap-south-1.amazonaws.com/dev/"
    );
  
    websocketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      pingIntervalRef.current = setInterval(() => {
        if (websocketRef.current?.readyState === WebSocket.OPEN) {
          websocketRef.current.send(JSON.stringify({ type: "ping" }));
        }
      }, 30000);
    };
  
    websocketRef.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
  
      // Ensure the message has all the necessary fields
      if (receivedMessage.type === "pong") {
        console.log("Received pong from server");
        return;
      }
  
      // Add message to the list if it has a username and message text
      if (
        receivedMessage.sender_username &&
        receivedMessage.message &&
        receivedMessage.sender_pfp &&
        receivedMessage.sender_wallet_address
      ) {
        setNewMessages((prevMessages) => [
          ...prevMessages,
          {
            username: receivedMessage.sender_username,
            text: receivedMessage.message,
            sender_pfp: receivedMessage.sender_pfp,
            walletAddress: receivedMessage.sender_wallet_address,
          },
        ]);
      } else {
        console.error("Received message has missing data:", receivedMessage);
      }
    };
  
    websocketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
  
      // Try to reconnect after 5 seconds
      setTimeout(() => {
        console.log("Reconnecting WebSocket...");
        setupWebSocket();
      }, 5000);
    };
  
    websocketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };
  const fetchInitialMessages = async () => {
    try {
      const response = await axios.get(
        "https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/",
        {
          params: {
            method: "get_messages",
            room: "public",
          },
        }
      );
      setMessages(response.data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (currentUserMessage.length <= 500) {
      if (
        currentUserMessage.trim() &&
        websocketRef.current?.readyState === WebSocket.OPEN
      ) {
        const messageData = {
          action: "sendMessage",
          walletAddress: user.walletAddress,
          text: currentUserMessage,
          alpha: false,
        };

        websocketRef.current.send(JSON.stringify(messageData));
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

  const initialMessages = useMemo(() => messages, [messages]);

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
          {initialMessages.map((msg, index) => (
            <div
              key={`initial-${index}`}
              onClick={() => handleOpenModal(msg)}
              className="cursor-pointer w-[90%] md:w-full mx-auto"
            >
              <Message
                username={msg.username}
                text={msg.text}
                sender_pfp={msg.sender_pfp}
              />
              {index !== initialMessages.length - 1 && (
                <div className="w-[80%] md:w-[50%] md:mx-auto bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
              )}
            </div>
          ))}
          {newMessages.map((msg, index) => (
            <div
              key={`new-${index}`}
              onClick={() => handleOpenModal(msg)}
              className="cursor-pointer w-[90%] md:w-full mx-auto"
            >
              <div className="w-[80%] md:w-[50%] md:mx-auto bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
              <Message
                username={msg.username}
                text={msg.text}
                sender_pfp={msg.sender_pfp}
              />
            </div>
          ))}

          <div ref={endOfMessagesRef} />

          {publicKey ? (
            <div className="md:w-[50%] w-[90%] mb-[20px] mx-auto border-[1px] sm:border-[2px] border-[#4EAB5E] rounded-[8px] h-[45px] sm:h-[65px] mt-[20px] flex items-center p-[2px]">
              <input
                type="text"
                placeholder="Type your message"
                value={currentUserMessage}
                onChange={(e) => setCurrentUserMessage(e.target.value)}
                className="flex-grow h-full p-[2px] sm:text-[20px] rounded-[8px] border-none outline-none font-sofia-regular font-semibold px-[20px]"
                style={{ backgroundColor: "transparent", color: "#000" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
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
        </>
      )}
    </div>
  );
};

export default Chat;

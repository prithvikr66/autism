import { useState, useEffect, useRef, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import MessageModal from "./MessageModal";
import { lineSpinner } from "ldrs";
import axios from "axios";
import ConnectButton from "../Profile/connect";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/users";
import { isLink, isSolanaContractAddress } from "../../utils/validations";
import messageTone from "../../assets/audios/new-message.mp3";
import pointsTone from "../../assets/audios/points.mp3";
import Message from "./Message";
interface ReactionsType {
  floor_rolling_laugh: number;
  fire: number;
  crying_face: number;
  angry_sad_unhappy: number;
  poop: number;
  clown: number;
}
interface MessageType {
  _id: string;
  username: any;
  text: string;
  sender_pfp: string;
  walletAddress: string;
  reactions: ReactionsType;
  timestamp?: string;
}

const Default = () => {
  const { publicKey } = useWallet();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [reactions, setReactions] = useState<Record<string, ReactionsType>>({});
  const [newMessages, setNewMessages] = useState<MessageType[]>([]);
  const [showLinkOrCaError, setShowLinkOrCaError] = useState(false);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const user = useRecoilValue(userState);
  const websocketRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  lineSpinner.register();

  useEffect(() => {
    fetchInitialMessages();
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

  const setupWebSocket = () => {
    websocketRef.current = new WebSocket(
      "wss://q1qqf9y8gb.execute-api.ap-south-1.amazonaws.com/dev/"
    );

    websocketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      // pingIntervalRef.current = setInterval(() => {
      //   if (websocketRef.current?.readyState === WebSocket.OPEN) {
      //     websocketRef.current.send(JSON.stringify({ type: "ping" }));
      //   }
      // }, 30000);
    };

    websocketRef.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage.type === "pong") {
        console.log("Received pong from server");
        return;
      }

      if (receivedMessage.reaction_type && receivedMessage.message_id) {
        setReactions((prevReactions) => ({
          ...prevReactions,
          [receivedMessage.message_id]: {
            ...prevReactions[receivedMessage.message_id],
            [receivedMessage.reaction_type]: receivedMessage.reaction_count,
          },
        }));
        return;
      }
      if (
        receivedMessage.sender_username &&
        receivedMessage.message &&
        receivedMessage.sender_pfp &&
        receivedMessage.sender_wallet_address
      ) {
        if (receivedMessage.sender_wallet_address !== user.walletAddress) {
          const audio = new Audio(messageTone);
          audio
            .play()
            .catch((error) => console.log("Audio playback failed:", error));
        } else {
          const audio = new Audio(pointsTone);
          audio
            .play()
            .catch((error) => console.log("Audio playback failed:", error));
        }

        setNewMessages((prevMessages) => [
          ...prevMessages,
          {
            _id: receivedMessage.id,
            username: receivedMessage.sender_username,
            text: receivedMessage.message,
            sender_pfp: receivedMessage.sender_pfp,
            walletAddress: receivedMessage.sender_wallet_address,
            reactions: receivedMessage.reactions || {},
          },
        ]);
      }
    };

    websocketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }

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
    if (
      isLink(currentUserMessage) ||
      isSolanaContractAddress(currentUserMessage)
    ) {
      setCurrentUserMessage("");
      setShowLinkOrCaError(true);
      setTimeout(() => {
        setShowLinkOrCaError(false);
      }, 2000);
      return;
    }
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

  const handleSendReaction = (messageId: string, reaction: string) => {
    try {
      console.log(`sending reaction:${reaction} for msg_id:${messageId}`);
      const reactionDate = {
        action: "sendReaction",
        messageId: messageId,
        reactionType: reaction,
      };
      const r = websocketRef.current?.send(JSON.stringify(reactionDate));
      console.log("sent", r);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = (msg: MessageType) => {
    setSelectedMessage(msg);
  };
  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const initialMessages = useMemo(() => messages, [messages]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [initialMessages, newMessages]);
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="h-full w-[100%] mx-auto">
      {loading ? (
        <div className=" h-full flex justify-center items-center ">
          <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="black"
          ></l-line-spinner>
        </div>
      ) : (
        <>
          <div className=" h-[88%] sm:h-[85%] overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={msg._id}
                onClick={() => handleOpenModal(msg)}
                className="cursor-pointer w-[90%] md:w-full mx-auto"
              >
                <Message
                  username={msg.username}
                  text={msg.text}
                  sender_pfp={msg.sender_pfp}
                  reactions={reactions[msg._id] || msg.reactions || {}}
                />

                {index !== messages.length - 1 && (
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
                  reactions={reactions[msg._id] || msg.reactions || {}}
                />
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>

          {publicKey ? (
            showLinkOrCaError ? (
              <div className="md:w-[50%] w-[90%] mb-[20px] mx-auto border-[1px] sm:border-[2px] border-[#F27360]  rounded-[8px] h-[45px] sm:h-[65px] mt-[20px] flex items-center p-[2px]">
                <input
                  type="text"
                  disabled
                  placeholder="🚫 No CAs or Links here please!"
                  value={currentUserMessage}
                  onChange={(e) => setCurrentUserMessage(e.target.value)}
                  className={` text-[#F27360] flex-grow h-full p-[2px] sm:text-[20px] rounded-[8px] border-none outline-none font-sofia-regular font-semibold px-[20px] placeholder:text-[#F27360]`}
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button className="bg-[#F27360] h-full w-[35px] sm:w-[55px] rounded-[8px] flex justify-center items-center cursor-pointer">
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
              <div className="md:w-[50%] w-[90%] mb-[20px] mx-auto border-[1px] sm:border-[2px] border-[#4EAB5E] rounded-[8px] h-[45px] sm:h-[65px] mt-[20px] flex items-center p-[2px]">
                <input
                  type="text"
                  placeholder="Type your message"
                  value={currentUserMessage}
                  onChange={(e) => setCurrentUserMessage(e.target.value)}
                  className={`flex-grow h-full p-[2px] sm:text-[20px] rounded-[8px] border-none outline-none font-sofia-regular font-semibold px-[20px]`}
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
            )
          ) : (
            <div className=" md:w-[60%] w-[100%] flex justify-center items-center mx-auto">
              <ConnectButton> Connect to chat </ConnectButton>
            </div>
          )}

          <MessageModal
            handleSendReaction={handleSendReaction}
            toggleModal={handleCloseModal}
            message={selectedMessage}
          />
        </>
      )}
    </div>
  );
};

export default Default;

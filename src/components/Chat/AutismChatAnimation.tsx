import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import MessageShowModal from "./MessageShowModal";
import { IconButton, useMediaQuery } from "@mui/material";
import messageAudio from "../../assets/audios/new-message.mp3";
import axios from "axios";
import { formatName } from "../../utils/format";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectButton from "../Profile/connect";
import { isLink, isSolanaContractAddress } from "../../utils/validations";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/users";

export interface Message {
  _id: any;
  message: string;
  username: string;
  profilePic: string;
  position?: {
    x: number;
    y: number;
    // width: number
  };
}
interface MessageItem extends Message {
  _id: string;
  message: string;
  username: string;
  profilePic: string;
  timestamp: number;
  marginClass?: string;
  textClampClass?: string;
  isEmpty: boolean;
  rowSpanClass?: string;
  colSpanClass?: string;
}

const random_profile_image_url = import.meta.env.VITE_RANDOM_PROFILE_URL;
const initial_chat_messages_url = import.meta.env.VITE_CHAT_SERVER_URL;
const websocket_url = import.meta.env.VITE_WEBSOCKET_URL;

const getGridDimensions = () => {
  if (window.innerWidth >= 1200) {
    return { numColumns: 5, numRowsPerColumn: 4, totalSlots: 20 };
  } else if (window.innerWidth >= 600) {
    return { numColumns: 4, numRowsPerColumn: 5, totalSlots: 9 };
  } else {
    return { numColumns: 2, numRowsPerColumn: 6, totalSlots: 8 };
  }
};

const generateRandomStyles = () => {
  return {
    marginClass: `px-${Math.floor(Math.random() * 10) + 1}`,
    colSpanClass: [
      "col-span-1 w-[80%] max-sm:w-[100%]",
      "col-span-1",
      "col-span-2 w-[62.5%] max-sm:w-[100%]",
      "col-span-1 w-[90.5%] max-sm:w-[100%]",
    ][Math.floor(Math.random() * 3)],
    rowSpanClass: ["row-span-1", "row-span-1", "row-span-1", "row-span-2"][
      Math.floor(Math.random() * 3)
    ],
    textClampClass: [
      "line-clamp-3",
      "line-clamp-3",
      "line-clamp-2",
      "line-clamp-2",
    ][Math.floor(Math.random() * 3)],
  };
};

const Autism: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [gridData, setGridData] = useState<MessageItem[]>([]);
  const [gridConfig, setGridConfig] = useState(getGridDimensions);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const [showLinkOrCaError, setShowLinkOrCaError] = useState(false);
  const user = useRecoilValue(userState);
  const { publicKey } = useWallet();
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: {} as MessageItem,
  });
  const socketRef = useRef<WebSocket | null>(null);

  const updateGridWithNewMessage = useCallback((newMsg: MessageItem) => {
    const audio = new Audio(messageAudio);
    audio.play().catch((error) => console.error("Error playing audio:", error));

    const { totalSlots } = getGridDimensions();
    setGridData((prevData) => {
      if (prevData.length >= totalSlots) {
        const randomIndex = Math.floor(Math.random() * totalSlots);
        const temp = [...prevData];
        temp.splice(randomIndex, 1, newMsg);
        return temp;
      } else {
        return [...prevData, newMsg];
      }
    });
  }, []);

  const debouncedHandleResize = useCallback(
    () =>
      debounce(() => {
        const newConfig = getGridDimensions();
        setGridConfig(newConfig);
      }, 300),
    []
  );

  const openModal = (message: MessageItem) => {
    setMessageModal({
      isOpen: true,
      message,
    });
  };

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(initial_chat_messages_url, {
        params: {
          method: "get_messages",
          room: "public",
        },
      });

      let fetchedMessages = response.data.map((msg: any) => {
        const { marginClass, textClampClass, colSpanClass, rowSpanClass } =
          generateRandomStyles();

        return {
          _id: msg._id,
          message: msg.text,
          username:
            msg.username == "Unknown" || msg.username == ""
              ? msg.walletAddress
              : msg.username,
          profilePic: msg.sender_pfp?.length
            ? msg.sender_pfp
            : `${random_profile_image_url}/${Math.floor(
                Math.random() * 50
              )}.jpg`,
          timestamp: new Date(msg.timestamp).getTime(),
          isEmpty: false,
          marginClass,
          textClampClass,
          colSpanClass,
          rowSpanClass,
        };
      });

      fetchedMessages = [...fetchedMessages].sort((messageA, messageB) => {
        return messageB.timestamp - messageA.timestamp;
      });

      const { totalSlots } = getGridDimensions();

      setGridData(fetchedMessages.slice(0, totalSlots));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  const setupWebSocket = useCallback(() => {
    
    socketRef.current = new WebSocket(websocket_url);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socketRef.current.onmessage = (event) => {
     
      const receivedMessage = JSON.parse(event.data);
      if (receivedMessage.type === "pong") {
        console.log("Received pong from server");
        return;
      }
      const { marginClass, textClampClass, colSpanClass, rowSpanClass } =
        generateRandomStyles();
      const messageItem: MessageItem = {
        _id: receivedMessage._id || "",
        message: receivedMessage.message,
        username:
          receivedMessage.sender_username == "Unknown" ||
          receivedMessage.sender_username == ""
            ? receivedMessage.sender_wallet_address ||
              receivedMessage.walletAddress
            : receivedMessage.sender_username,
        profilePic: receivedMessage.sender_pfp?.length
          ? receivedMessage.sender_pfp
          : `${random_profile_image_url}/${Math.floor(Math.random() * 50)}.jpg`,
        timestamp: new Date(receivedMessage.timestamp).getTime(),
        isEmpty: false,
        marginClass,
        textClampClass,
        colSpanClass,
        rowSpanClass,
      };

      updateGridWithNewMessage(messageItem);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason);
      if (!event.wasClean) {
          setTimeout(() => {
              console.log("Attempting WebSocket reconnection...");
              setupWebSocket();
          }, 5000);
      }
  };
    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [updateGridWithNewMessage]);

  useEffect(() => {
    fetchMessages();
    setupWebSocket();

    window.addEventListener("resize", debouncedHandleResize);

    const pingInterval = setInterval(() => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(JSON.stringify({ type: "ping" }));
      }
    }, 30000);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      if (socketRef.current) {
        socketRef.current.close();
      }
      clearInterval(pingInterval);
    };
  }, [debouncedHandleResize, fetchMessages, setupWebSocket]);

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
        socketRef.current?.readyState === WebSocket.OPEN
      ) {
        const messageData = {
          action: "sendMessage",
          walletAddress: user.walletAddress,
          text: currentUserMessage,
          alpha: false,
        };

        socketRef.current.send(JSON.stringify(messageData));
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
      socketRef.current?.send(JSON.stringify(reactionDate));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <MessageShowModal
        {...messageModal}
        handleSendReaction={handleSendReaction}
        onRequestClose={() =>
          setMessageModal({ isOpen: false, message: {} as MessageItem })
        }
      />
      {/* <MessageModal
        handleSendReaction={handleSendReaction}
        toggleModal={handleCloseModal}
        message={selectedMessage}
      /> */}
      <div
        className={`grid grid-cols-${gridConfig.numColumns} gap-4 flex-1 overflow-hidden`}
      >
        {gridData.map((message, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`flex items-center ${message.rowSpanClass} ${message.colSpanClass} cursor-pointer`}
            onClick={() => openModal(message)}
          >
            {message.message ? (
              <motion.div
                className={`flex flex-col ${message.marginClass}  m-auto`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-2 overflow-hidden items-start">
                  <IconButton sx={{ padding: 0 }}>
                    <img
                      src={message.profilePic}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </IconButton>
                  <div className="flex-1 flex flex-col justify-start ">
                    <p
                      className=" font-sofia-bold uppercase font-semibold text-[14px] sm:text-[20px] text-[#3d3d3d]"
                      //   className={`font-bold max-w-48 text-wrap break-all ${
                      //     isMobile ? "text-[10px]" : "text-[12px]"
                      //   }`}
                    >
                      {formatName(message.username)}
                    </p>
                    <div
                      className={`font-sofia-regular text-[#3D3D3D] font-black ${
                        message.textClampClass
                      } ${
                        isMobile
                          ? "text-[18px] max-w-48 text-wrap break-all"
                          : "block text-[22px] max-w-48 text-wrap break-all"
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <p className={`${message.textClampClass}`}>&nbsp;</p>
            )}
          </motion.div>
        ))}
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
    </div>
  );
};

export default Autism;

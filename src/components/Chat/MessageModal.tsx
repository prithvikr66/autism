import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmileEmoji from "../../assets/Emojis/Smile.svg";
import SadEmoji from "../../assets/Emojis/Sad.svg";
import AngryEmoji from "../../assets/Emojis/Angry.svg";
import FireEmoji from "../../assets/Emojis/Fire.svg";
import HitEmoji from "../../assets/Emojis/Shit.svg";
import JokerEmoji from "../../assets/Emojis/Joker.svg";
import { lineSpinner } from "ldrs";
import DefaultProfilePic from "../../assets/degen-logo.svg";
import { formatTimestamp } from "../../utils/format-time";
import { TipSVG } from "./icons";
import Tip from "./Tip";
import { useWallet } from "@solana/wallet-adapter-react";
import DeleteSVG from "../../assets/DeleteSVG.svg";

interface MessageType {
  _id: string;
  username: any;
  text: string;
  sender_pfp: string;
  walletAddress: string;
  timestamp?: string;
}

interface MessageModalProps {
  toggleModal: () => void;
  message: MessageType | null;
  handleSendReaction: any;
}

const MessageModal = ({
  toggleModal,
  message,
  handleSendReaction,
}: MessageModalProps) => {
  const [allEmojisLoaded, setAllEmojisLoaded] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const { publicKey } = useWallet();
  const emojis = [
    SmileEmoji,
    FireEmoji,
    SadEmoji,
    AngryEmoji,
    HitEmoji,
    JokerEmoji,
  ];
  lineSpinner.register();

  useEffect(() => {
    let loadedCount = 0;
    emojis.forEach((emojiSrc) => {
      const img = new Image();
      img.src = emojiSrc;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === emojis.length) {
          setAllEmojisLoaded(true);
        }
      };
    });
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        duration: 0.1,
      },
    },
    exit: { opacity: 0, scale: 0.7, transition: { duration: 0.1 } },
  };

  if (!message) return null;

  const handleEmojiClick = (messageId: string, emoji: number) => {
    switch (emoji) {
      case 0:
        handleSendReaction(messageId, "floor_rolling_laugh");
        break;
      case 1:
        handleSendReaction(messageId, "fire");
        break;
      case 2:
        handleSendReaction(messageId, "crying_face");
        break;
      case 3:
        handleSendReaction(messageId, "angry_sad_unhappy");
        break;
      case 4:
        handleSendReaction(messageId, "poop");
        break;
      case 5:
        handleSendReaction(messageId, "clown");
        break;
    }
    toggleModal();
    return;
  };
  const handleDeletedMessage = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_CHAT_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "delete_message",
          messageId: message._id,
          walletAddress: publicKey?.toString(),
        }),
      });

      // const data = await response.json();

      if (response.ok) {
        toggleModal();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-white bg-opacity-70 backdrop-filter"
          onClick={() => {
            toggleModal();
            setShowTip(false);
          }}
        ></div>
        <motion.div
          className="relative w-[90vw] sm:w-[50vw] max-w-md z-30"
          onClick={(e) => e.stopPropagation()}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ zIndex: 30 }}
        >
          <div
            className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full bg-black"
            style={{ zIndex: -1 }}
          ></div>
          <div className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px]">
            {showTip ? (
              <div>
                <Tip
                  pfp={message.sender_pfp}
                  username={message.username}
                  walletAddress={message.walletAddress}
                />
              </div>
            ) : (
              <>
                {!allEmojisLoaded ? (
                  <div className="flex justify-center items-center h-[500px] ">
                    <l-line-spinner
                      size="40"
                      stroke="3"
                      speed="1"
                      color="black"
                    ></l-line-spinner>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-[10px]">
                        <div
                          className={`h-[50px] w-[50px] rounded-full overflow-hidden flex-shrink-0 ${
                            !message.sender_pfp ? "border border-black" : ""
                          }`}
                        >
                          <img
                            src={
                              message.sender_pfp
                                ? message.sender_pfp
                                : DefaultProfilePic
                            }
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="font-sofia-bold uppercase text-[20px] text-[#3d3d3d]">
                            {message.username}
                          </p>
                          <p className="font-sofia-regular text-[16px] uppercase text-[#8F95B2] font-black">
                            {message.timestamp &&
                              formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                      {message.walletAddress === publicKey?.toString() ? (
                        <motion.button
                          onClick={handleDeletedMessage}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <img src={DeleteSVG} />
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={() => setShowTip(true)}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className=" border-[3px] border-[#3d3d3d] rounded-[4px] flex gap-[10px] p-[10px] uppercase font-sofia-bold text-[16px]"
                        >
                          <TipSVG color="#3d3d3d" /> Tip
                        </motion.button>
                      )}
                    </div>
                    <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
                    <div className="max-h-[300px] overflow-y-auto">
                      <p className="font-sofia-regular text-[20px] text-[#3D3D3D]">
                        {message.text}
                      </p>
                    </div>
                    <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
                    <div className="flex items-center justify-between">
                      {emojis.map((emoji, index) => (
                        <motion.div
                          key={index}
                          onClick={() => handleEmojiClick(message._id, index)}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          style={{ display: "flex", cursor: "pointer" }}
                        >
                          <img src={emoji} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MessageModal;

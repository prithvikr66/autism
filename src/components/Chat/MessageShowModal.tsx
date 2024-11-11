import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmileEmoji from "../../assets/Emojis/Smile.svg";
import SadEmoji from "../../assets/Emojis/Sad.svg";
import AngryEmoji from "../../assets/Emojis/Angry.svg";
import FireEmoji from "../../assets/Emojis/Fire.svg";
import HitEmoji from "../../assets/Emojis/Shit.svg";
import JokerEmoji from "../../assets/Emojis/Joker.svg";
import DegenLogo from "../../assets/degen-logo.svg";

interface Message {
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

interface MessageShowModalProps {
  message: Message;
  isOpen: boolean;
  onRequestClose: (state: boolean) => void;
  handleSendReaction: any;
}

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

const MessageShowModal: React.FC<MessageShowModalProps> = ({
  message,
  isOpen,
  onRequestClose,
  handleSendReaction,
}) => {
  console.log(message);
  const emojis = [
    SmileEmoji,
    FireEmoji,
    SadEmoji,
    AngryEmoji,
    HitEmoji,
    JokerEmoji,
  ];
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

    return;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-white bg-opacity-70 backdrop-filter"
            onClick={() => onRequestClose(false)}
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
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[10px]">
                  <div className="h-[40px] w-[40px] rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={message.profilePic ? message.profilePic : DegenLogo}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <p className="font-sofia-bold uppercase text-[20px] text-[#3d3d3d]">
                      {message.username}
                    </p>
                    <p className="font-sofia-regular text-[16px] uppercase text-[#8F95B2] font-black">
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
              <div className="max-h-[300px] overflow-y-auto">
                <p className="font-sofia-regular text-[20px] text-[#3D3D3D]">
                  {message.message}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MessageShowModal;

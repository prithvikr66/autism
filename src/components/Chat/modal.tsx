import { AnimatePresence, motion } from "framer-motion";
import { TipSVG } from "./icons";
import SmileEmoji from "../../assets/Emojis/Smile.svg";
import SadEmohi from "../../assets/Emojis/Sad.svg";
import AngryEmoji from "../../assets/Emojis/Angry.svg";
import FireEmoji from "../../assets/Emojis/Fire.svg";
import HitEmoji from "../../assets/Emojis/Shit.svg";
import JokerEmoji from "../../assets/Emojis/Joker.svg";

const MessageModal = ({
  toggleModal,
  message,
}: {
  toggleModal: any;
  message: any;
}) => {
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-20 flex items-center justify-center ">
        <div
          className="fixed inset-0 bg-white bg-opacity-70 backdrop-filter"
          onClick={toggleModal}
        ></div>
        <motion.div
          className="relative w-[90vw] sm:w-[50vw] max-w-md z-30 "
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
          <div
            className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px]"
            style={{ zIndex: 30 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[20px]">
                <div className="h-[40px] w-[40px] rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={message.profilePic}
                    className="w-full h-full object-cover object-center"
                    alt="Profile"
                  />
                </div>
                <div>
                  <p className="font-sofia-bold uppercase text-[20px] text-[#F2A7B0]">
                    {message.username}
                  </p>
                  <p className="font-sofia-regular text-[16px] uppercase text-[#8F95B2] font-black">
                    10:11 PM
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <TipSVG />
              </motion.button>
            </div>
            <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
            <div className="max-h-[300px] overflow-y-auto">
              <p className="font-sofia-regular text-[20px] text-[#3D3D3D]">
                {message.message}
              </p>
            </div>
            <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
            <div className="flex items-center justify-between">
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src={SmileEmoji} alt="Smile Emoji" />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src={FireEmoji} alt="Fire Emoji" />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src={SadEmohi} alt="Sad Emoji" />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src={AngryEmoji} alt="Angry Emoji" />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src={HitEmoji} alt="Hit Emoji" />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src={JokerEmoji} alt="Joker Emoji" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MessageModal;

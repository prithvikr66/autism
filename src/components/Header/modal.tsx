import { AnimatePresence, motion } from "framer-motion";
import ModalSVG from "../../assets/grass.svg";
import {
  AutismSVG,
  AutismSelectedSVG,
  DefaultSVG,
  DefaultSelectedSVG,
} from "./svgs";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { animationState } from "../../atoms/messageAnimations";

const Modal = ({ toggleModal }: { toggleModal: any }) => {
  const [, setAnimationState] = useRecoilState(animationState);
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

  const getuserPreferences = () => {
    const savedPreferences = localStorage.getItem("userPreferences");
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : {
          reaction: false,
          message: true,
          ambience: true,
          chatAnimation: "default",
        };
  };

  const [preferences, setPreferences] = useState(getuserPreferences);

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const toggleAudioSetting = (setting: "reaction" | "message" | "ambience") => {
    setPreferences((prev: any) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const toggleAnimation = (type: string) => {
    setAnimationState(type);
    setPreferences((prev: any) => ({
      ...prev,
      chatAnimation: type,
    }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-white bg-opacity-70 backdrop-filter"
          onClick={toggleModal}
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

          <div
            className="relative rounded-[4px] border-black border-[2px] bg-white text-black p-[20px]"
            style={{ zIndex: 30 }}
          >
            <div className="flex items-center gap-[15px]">
              <img src={ModalSVG} alt="Modal Icon" />
              <p className="font-suisse-regular font-black text-[20px]">
                Experience Settings
              </p>
            </div>

            <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />

            <div className="flex items-center flex-nowrap gap-[30px]">
              <p className="font-sofia-regular uppercase text-[#3D3D3D] text-[16px] font-black whitespace-nowrap">
                Chat Mode
              </p>
              <div className="flex items-center w-full ml-2 space-x-[30px]">
                <motion.button
                  onClick={() => toggleAnimation("autism")}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {preferences.chatAnimation === "autism" ? (
                    <AutismSelectedSVG />
                  ) : (
                    <AutismSVG />
                  )}
                </motion.button>
                <motion.button
                  onClick={() => toggleAnimation("default")}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {preferences.chatAnimation === "default" ? (
                    <DefaultSelectedSVG />
                  ) : (
                    <DefaultSVG />
                  )}
                </motion.button>
              </div>
            </div>

            <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />

            <div className="flex items-center gap-[30px]">
              <p className="font-sofia-regular uppercase text-[#3D3D3D] text-[16px] font-black">
                Audio
              </p>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center gap-[8px]">
                  <button
                    onClick={() => toggleAudioSetting("reaction")}
                    className={`relative w-14 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                      preferences.reaction ? "bg-[#7DB993]" : "bg-[#F2A7B0]"
                    }`}
                    type="button"
                    role="switch"
                    aria-checked={preferences.reaction}
                  >
                    <span
                      className={`absolute left-0 top-[-2px] w-7 h-7 ${
                        preferences.reaction ? "bg-[#4EAB5E]" : "bg-[#F27360]"
                      } rounded-full transition-transform duration-200 ease-in-out ${
                        preferences.reaction ? "translate-x-8" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <p className="font-sofia-regular font-black text-[14px]">
                    reactions
                  </p>
                </div>
                <div className="flex flex-col items-center gap-[8px]">
                  <button
                    onClick={() => toggleAudioSetting("message")}
                    className={`relative w-14 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                      preferences.message ? "bg-[#7DB993]" : "bg-[#F2A7B0]"
                    }`}
                    type="button"
                    role="switch"
                    aria-checked={preferences.message}
                  >
                    <span
                      className={`absolute left-0 top-[-2px] w-7 h-7 ${
                        preferences.message ? "bg-[#4EAB5E]" : "bg-[#F27360]"
                      } rounded-full transition-transform duration-200 ease-in-out ${
                        preferences.message ? "translate-x-8" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <p className="font-sofia-regular font-black text-[14px]">
                    msg
                  </p>
                </div>
                <div className="flex flex-col items-center gap-[8px]">
                  <button
                    onClick={() => toggleAudioSetting("ambience")}
                    className={`relative w-14 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                      preferences.ambience ? "bg-[#7DB993]" : "bg-[#F2A7B0]"
                    }`}
                    type="button"
                    role="switch"
                    aria-checked={preferences.ambience}
                  >
                    <span
                      className={`absolute left-0 top-[-2px] w-7 h-7 ${
                        preferences.ambience ? "bg-[#4EAB5E]" : "bg-[#F27360]"
                      } rounded-full transition-transform duration-200 ease-in-out ${
                        preferences.ambience ? "translate-x-8" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <p className="font-sofia-regular font-black text-[14px]">
                    ambience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;

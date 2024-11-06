import { AnimatePresence, motion } from "framer-motion";
import ModalSVG from "../../assets/grass.svg";
import { AutismSVG, DefaultSVG } from "./svgs";
import { useState, useEffect } from "react";

const Modal = ({ toggleModal }: { toggleModal: any }) => {
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

  const getAudioPreferences = () => {
    const savedPreferences = localStorage.getItem("audioPreferences");
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : { reaction: true, message: true, ambience: true };
  };

  const [audio, setAudio] = useState(getAudioPreferences);

  useEffect(() => {
    localStorage.setItem("audioPreferences", JSON.stringify(audio));
  }, [audio]);

  const toggleAudioSetting = (setting: "reaction" | "message" | "ambience") => {
    setAudio((prevAudio: any) => ({
      ...prevAudio,
      [setting]: !prevAudio[setting],
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
              <div className="flex items-center w-full  ml-2 space-x-[30px]">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <AutismSVG />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <DefaultSVG />
                </motion.div>
              </div>
            </div>

            <div className="w-[80%] bg-gradient-to-r from-[#3D3D3D] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />

            <div className=" flex items-center gap-[30px]">
              <p className="font-sofia-regular uppercase text-[#3D3D3D] text-[16px] font-black">
                Audio
              </p>
              <div className=" flex items-center justify-between w-full">
                <div className=" flex flex-col items-center gap-[8px]">
                  <button
                    onClick={() => toggleAudioSetting("reaction")}
                    className={`relative w-14 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-[#7DB993]`}
                    type="button"
                    role="switch"
                    aria-checked={audio.reaction}
                  >
                    <span
                      className={`absolute left-0 top-[-2px] w-7 h-7 bg-[#4EAB5E] rounded-full transition-transform duration-200 ease-in-out ${
                        audio.reaction ? "translate-x-8" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <p className="  font-sofia-regular font-black text-[14px]">
                    reactions
                  </p>
                </div>
                <div className=" flex flex-col items-center gap-[8px]">
                  <button
                    onClick={() => toggleAudioSetting("message")}
                    className={`relative w-14 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-[#7DB993]`}
                    type="button"
                    role="switch"
                    aria-checked={audio.message}
                  >
                    <span
                      className={`absolute left-0 top-[-2px] w-7 h-7 bg-[#4EAB5E] rounded-full transition-transform duration-200 ease-in-out ${
                        audio.message ? "translate-x-8" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <p className="  font-sofia-regular font-black text-[14px]">
                    msg
                  </p>
                </div>
                <div className=" flex flex-col items-center gap-[8px]">
                  <button
                    onClick={() => toggleAudioSetting("ambience")}
                    className={`relative w-14 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-[#F2A7B0]`}
                    type="button"
                    role="switch"
                    aria-checked={audio.ambience}
                  >
                    <span
                      className={`absolute left-0 top-[-2px] w-7 h-7 bg-[#F27360] rounded-full transition-transform duration-200 ease-in-out ${
                        audio.ambience ? "translate-x-8" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <p className="  font-sofia-regular font-black text-[14px]">
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

import { TipSVG } from "../Chat/icons";
import { motion } from "framer-motion";
import { CopyIcon } from "./icons";
interface MessageProps {
  username: string;
  pfp: string;
  ca: string;
}

const Message: React.FC<MessageProps> = ({ ca, username, pfp }) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(ca);
  };
  return (
    <div className="mx-auto w-[90%]">
      <div className="flex items-center gap-[10px]">
        <div className="h-[40px] w-[40px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={pfp}
            className="w-full h-full object-cover object-center"
            alt="Profile"
          />
        </div>
        <div className="flex-1">
          <p className="uppercase font-abzee-italic text-[16px] text-[#F2A7B0] font-black">
            {username}
          </p>
          <div className="flex justify-between items-center">
            <div className="bg-black p-[5px] rounded-[10px] uppercase flex items-center text-white w-[73%]">
              <p className="break-all line-clamp-3 text-[12px] font-sofia-bold uppercase">
                {ca}
              </p>
              <motion.button
                onClick={copyText}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CopyIcon />
              </motion.button>
            </div>
            <motion.button
              className="w-[25%]"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* <button> */}
              <TipSVG />
              {/* </button> */}
            </motion.button>
          </div>
        </div>
      </div>
      <div className="relative w-full rounded-[4px] border-[1px] sm:border-[2px] border-[#F2A7B0] h-[400px] mt-[20px] bg-white" style={{ position: 'relative' }}>
      <div
      className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full"
      style={{
        backgroundColor: '#F2A7B0',
        position: 'absolute',
        zIndex: -1
      }}
    ></div>
      </div>
    </div>
  );
};

export default Message;



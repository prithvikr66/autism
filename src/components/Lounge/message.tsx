import { TipSVG } from "../Chat/icons";
import { motion } from "framer-motion";
import { CopyIcon, RefreshIcon } from "./icons";
import RugcheckLogo from "../../assets/rugcheck.png";
import { ApeButton, ChartIcon } from "./buttons";
import { useNavigate } from "react-router-dom";
interface MessageProps {
  username: string;
  pfp: string;
  ca: string;
}

const Message: React.FC<MessageProps> = ({ ca, username, pfp }) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(ca);
  };
  const navigate = useNavigate();
  return (
    <div className=" w-full mt-[20px]">
      <div className="flex items-center gap-[10px] mx-auto w-[90%]">
        <div className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={pfp}
            className="w-full h-full object-cover object-center"
            alt="Profile"
          />
        </div>
        <div className="flex-1">
          <p className="uppercase font-abzee-italic text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] text-[#F2A7B0] font-black">
            {username}
          </p>
          <div className="flex justify-between items-center">
            <div className="bg-black p-[5px] sm:p-[9px] md:p-[11px] lg:p-[13px] xl:p-[15px] 2xl:p-[17px] rounded-[10px] justify-between uppercase flex items-center text-white w-[73%]">
              <p className="break-all line-clamp-3 text-[12px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[22px] 2xl:text-[24px] font-sofia-bold uppercase">
                {ca}
              </p>
              <motion.button
                onClick={copyText}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CopyIcon color="#FFFFFF" />
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
      <div
        className=" w-[90%]  sm:w-[70%] md:w-[60%] mx-auto relative  rounded-[4px] border-[1px] sm:border-[2px] border-[#F2A7B0] mt-[20px] bg-white"
        style={{ position: "relative" }}
      >
        <div
          className="absolute top-[5px] left-[5px] rounded-[4px] border-[2px] border-transparent w-full h-full"
          style={{
            backgroundColor: "#F2A7B0",
            position: "absolute",
            zIndex: -1,
          }}
        ></div>
        <div className=" p-[10px] sm:p-[15px] lg:p-[20px] xl:p-[25px] ">
          <div className=" flex justify-between items-center">
            <div className=" flex items-center gap-[20px]">
              <div className="h-[50px] w-[50px] rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://wallpapers.com/images/hd/shadow-boy-white-eyes-unique-cool-pfp-nft-13yuypusuweug9xn.jpg"
                  className="w-full h-full object-cover object-center"
                  alt="Profile"
                />
              </div>
              <div className=" flex flex-col  ">
                <p className=" uppercase font-abzee-italic text-[20px] sm:text-[22px] lg:text-[24px] xl:text-[26px] text-[#3D3D3D]">
                  Fwog
                </p>
                <p className=" font-sofia-regular font-black text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] text-[#3D3D3D]">
                  just a lil fwog in a big pond
                </p>
              </div>
            </div>
            <div>
              <RefreshIcon />
            </div>
          </div>
          <div className=" flex justify-between mt-[20px]">
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                mcap
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                $18.8M
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                holders
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                $18.8M
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                liquidity
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                $18.8M
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                volume
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                $18.8M
              </p>
            </div>
          </div>
          <div className="w-[80%] bg-gradient-to-r from-[#F2A7B0] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
          <div className=" flex justify-between">
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                ATH
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                $300.5M
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                Top 10
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                23%
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                Lp Burnt
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                $96
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                mint
              </p>
              <p className=" font-abzee-italic font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                disabled
              </p>
            </div>
          </div>
          <div className="w-[80%] bg-gradient-to-r from-[#F2A7B0] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
          <div className=" flex justify-between items-center">
            <div className=" flex gap-[5px] items-center">
              <img src={RugcheckLogo} />
              <p className=" font-vt232 uppercase text-[20px] text-[#3D3D3D]">
                RUGCHECK RISK SCORE
              </p>
            </div>
            <p className=" font-vt232 uppercase text-[32px] text-[#4EAB5E]">
              GOOD
            </p>
          </div>
          <div className="w-[80%] bg-gradient-to-r from-[#F2A7B0] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
          <div className=" flex justify-between mb-[10px]">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => navigate(`/lounge/${ca}`)}
            >
              <ChartIcon />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ApeButton />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

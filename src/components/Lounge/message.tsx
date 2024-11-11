import { ChartSVG, ThunderSVG } from "../Chat/icons";
import { motion } from "framer-motion";
import { CopyIcon, RefreshIcon, TipSVG } from "./icons";
import RugcheckLogo from "../../assets/rugcheck.png";
import { useNavigate } from "react-router-dom";
import WhiteButton from "../Buttons/WhiteButton";
import GreenButton from "../Buttons/GreenButton";
import { useMemo } from "react";
import { formatTimestamp } from "../../utils/format-time";

interface CaInfo {
  ca: string;
  name: string;
  token: string;
  desc: string;
  logo: string;
  mcap: number;
  holders: number;
  liquidity: number;
  volume: number;
  ATH: number;
  top10: number;
  lpBurnt: number;
  mint: string;
}
interface UserInfo {
  username: string;
  pfp: string;
  timestamp: string;
}
interface MessageProps {
  user: UserInfo;
  ca: CaInfo;
}

const Message: React.FC<MessageProps> = ({ ca, user }) => {
  const colors = [
    "#B280D9",
    "#FF69B4",
    "#F27360",
    "#3D3D3D",
    "#4EAB5E",
    "#F2A7B0",
    "#0000FF",
  ];

  const randomColor = useMemo(() => {
    const index =
      user.username.split("").reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0) % colors.length;

    return colors[index];
  }, [user.username]);

  const color = randomColor;

  const copyText = async () => {
    await navigator.clipboard.writeText(ca.ca);
  };
  const navigate = useNavigate();
  return (
    <div className=" w-full mt-[20px]">
      <div className="flex items-center gap-[10px] mx-auto w-[90%] md:w-full">
        <div className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] lg:w-[70px] lg:h-[70px] xl:w-[80px] xl:h-[80px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={user.pfp}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex-1">
          <p
            style={{ color: color }}
            className="uppercase font-sofia-bold text-[16px] sm:text-[18px] lg:text-[20px]  font-black"
          >
            {user.username}
          </p>
          <p className=" uppercase text-[16px] text-[#8F95B2] font-sofia-regular font-black ">
            {formatTimestamp(user.timestamp)}
          </p>
        </div>
      </div>
      <div className=" mt-[20px]  w-[90%] mx-auto flex items-center justify-between ">
        <div className="  border-[2px] sm:border-[3px] border-[#F2A7B0] rounded-[4px] w-[70%] p-[10px] uppercase font-sofia-regular font-black flex items-center justify-between">
          <div className="">
            <span className=" font-sofia-bold text-black text-[16px]">
              CA:{" "}
            </span>
            {ca.ca.slice(0, 5)}...{ca.ca.slice(-5)}
          </div>
          <motion.button
            onClick={copyText}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CopyIcon color="#F2A7B0" />
          </motion.button>
        </div>
        <motion.button
          onClick={copyText}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className=" border-[2px] sm:border-[3px] border-[#F2A7B0] rounded-[4px] w-[25%] h-full p-[7px] flex gap-[10px] items-center justify-center"
        >
          <TipSVG color="#F2A7B0" />{" "}
          <p className=" font-sofia-bold text-[#F2A7B0] uppercase text-[20px] mt-[5px]">
            Tip{" "}
          </p>
        </motion.button>
      </div>
      <div
        className=" w-[90%]  mx-auto relative  rounded-[4px] border-[2px] sm:border-[3px] border-[#F2A7B0] mt-[20px] bg-white"
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
            <div className=" flex  gap-[20px]">
              <div className="h-[50px] w-[50px] rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={ca.logo}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className=" flex flex-col  ">
                <p className=" uppercase font-sofia-bold text-[18px] sm:text-[20px]  text-[#3D3D3D]">
                  {ca.name} <span>({ca.token})</span>
                </p>
                <p className=" font-sofia-regular font-black text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] text-[#3D3D3D]">
                  {ca.desc}
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
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                ${ca.holders}
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                holders
              </p>
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                ${ca.holders}
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                liquidity
              </p>
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                ${ca.liquidity}
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                volume
              </p>
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                ${ca.volume}
              </p>
            </div>
          </div>
          <div className="w-[80%] bg-gradient-to-r from-[#F2A7B0] to-[#ffffff] h-[2px] mt-[15px] mb-[15px]" />
          <div className=" flex justify-between">
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                ATH
              </p>
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                ${ca.ATH}
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                Top 10
              </p>
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                {ca.top10}%
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                Lp Burnt
              </p>
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                {ca.lpBurnt}%
              </p>
            </div>
            <div className=" flex flex-col ">
              <p className=" font-sofia-regular font-black text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D] ">
                mint
              </p>
              <p className=" font-sofia-bold font-light text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] 2xl:text-[22px] text-[#3D3D3D]">
                {ca.mint}
              </p>
            </div>
          </div>
          <div className="w-[80%] bg-gradient-to-r from-[#F2A7B0] to-[#ffffff] h-[2px] mt-[10px] mb-[10px]" />
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
          <div className="w-[80%] bg-gradient-to-r from-[#F2A7B0] to-[#ffffff] h-[2px] mt-[10px] " />
          <div className=" flex justify-between mb-[10px]">
            <WhiteButton onclick={() => navigate(`/lounge/${ca}`)}>
              <ChartSVG />
              Chart
            </WhiteButton>
            <GreenButton onclick={() => {}} disabled={false}>
              <ThunderSVG />
              ape
            </GreenButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
